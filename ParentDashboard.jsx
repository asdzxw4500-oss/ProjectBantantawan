import { useState } from 'react';
import { useData } from '../data/DataContext';

export default function ParentDashboard({ onViewChange }) {
  const { rates, childrenList, setChildrenList, currentUser, attendances } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAllergies, setNewChildAllergies] = useState('');
  
  const myChildren = childrenList.filter(c => c.parentId && currentUser?.linkId && String(c.parentId) === String(currentUser.linkId));
  const myChildIds = myChildren.map(c => c.id);
  
  const today = new Date().toLocaleDateString('th-TH');
  const todayAttendances = attendances.filter(a => myChildIds.includes(a.childId) && a.time.includes(today));
  todayAttendances.sort((a,b) => b.id - a.id);
  const latestAttendance = todayAttendances[0];

  let statusText = 'ยังไม่มาถึงศูนย์ฯ / ยังไม่มีการบันทึก';
  let statusColor = '#475569';
  let statusBg = '#f8fafc';
  let statusBorder = '#e2e8f0';

  if (latestAttendance) {
      if (latestAttendance.type === 'in') {
          statusText = `อยู่ที่ศูนย์ฯ (เข้าเมื่อ ${latestAttendance.time.split(' ')[1]} น.)`;
          statusColor = '#15803d';
          statusBg = '#dcfce7';
          statusBorder = '#bbf7d0';
      } else {
          statusText = `รับกลับแล้ว (เมื่อ ${latestAttendance.time.split(' ')[1]} น.)`;
          statusColor = '#0369a1';
          statusBg = '#e0f2fe';
          statusBorder = '#bae6fd';
      }
  }

  const amountToPay = rates?.monthly || 0;

  const handleAddChild = () => {
    if (!newChildName) return alert('กรุณาระบุชื่อบุตรหลาน');
    const newChild = {
      id: 'c' + Date.now(),
      name: newChildName,
      allergies: newChildAllergies,
      parentId: currentUser.linkId
    };
    setChildrenList([...childrenList, newChild]);
    setNewChildName('');
    setNewChildAllergies('');
    setIsAdding(false);
  };

  return (
    <>
        {myChildren.length === 0 && !isAdding ? (
            <div className="card" style={{textAlign: 'center', background: '#fef2f2', borderColor: '#fca5a5'}}>
                <i className="fa-solid fa-child" style={{fontSize: '48px', color: '#ef4444', marginBottom: '15px'}}></i>
                <h3 style={{color: '#991b1b'}}>ยังไม่มีข้อมูลบุตรหลาน</h3>
                <p style={{color: '#b91c1c', marginTop: '10px'}}>คลิกปุ่มด้านล่างเพื่อเพิ่มรายชื่อบุตรหลานของคุณเข้าสู่ระบบครับ</p>
                <button className="btn btn-primary" style={{marginTop: '15px'}} onClick={() => setIsAdding(true)}>
                    <i className="fa-solid fa-plus"></i> เพิ่มข้อมูลบุตรหลาน
                </button>
            </div>
        ) : (
            myChildren.map(child => (
                <div key={child.id} className="card" style={{textAlign: 'center', marginBottom: '15px'}}>
                    <img src={`https://ui-avatars.com/api/?name=${child.name}&background=fcd34d&color=334155`} alt="Profile" style={{width: '80px', borderRadius: '50%', marginBottom: '10px'}} />
                    <h3 style={{fontSize: '24px'}}>{child.name}</h3>
                    <p style={{color: 'var(--text-light)', fontSize: '16px'}}>รหัสประจำตัว: {child.id}</p>
                    {child.allergies && <p style={{color: '#b91c1c', fontSize: '14px', marginTop: '5px'}}>แพ้: {child.allergies}</p>}
                </div>
            ))
        )}

        {isAdding && (
            <div className="card" style={{marginBottom: '15px', border: '2px dashed var(--primary-color)'}}>
                <h3 className="card-title"><i className="fa-solid fa-user-plus"></i> เพิ่มข้อมูลบุตรหลาน</h3>
                <div className="form-group">
                    <input className="form-control" placeholder="ชื่อ-นามสกุล บุตรหลาน" value={newChildName} onChange={e => setNewChildName(e.target.value)} />
                    <input className="form-control" style={{marginTop: '10px'}} placeholder="แพ้อาหาร/ยา (ถ้ามี)" value={newChildAllergies} onChange={e => setNewChildAllergies(e.target.value)} />
                    <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                        <button className="btn btn-primary" style={{flex: 1}} onClick={handleAddChild}>บันทึกข้อมูล</button>
                        <button className="btn btn-danger" style={{flex: 1}} onClick={() => setIsAdding(false)}>ยกเลิก</button>
                    </div>
                </div>
            </div>
        )}

        {myChildren.length > 0 && !isAdding && (
             <button className="btn btn-primary" style={{width: '100%', marginBottom: '15px', background: 'white', color: 'var(--primary-color)', border: '1px solid var(--primary-color)'}} onClick={() => setIsAdding(true)}>
                <i className="fa-solid fa-plus"></i> เพิ่มข้อมูลบุตรหลานอีกคน
             </button>
        )}
        
        {myChildren.length > 0 && (
            <div className="card" style={{background: statusBg, borderColor: statusBorder}}>
                <div className="card-title" style={{color: statusColor}}><i className="fa-solid fa-clock"></i> สถานะล่าสุดวันนี้</div>
                <p style={{fontSize: '18px', color: statusColor}}>{statusText}</p>
            </div>
        )}

        <button className="btn btn-primary btn-large" style={{background: 'var(--tertiary-color)', color: 'var(--text-main)'}} onClick={() => onViewChange('payment')}>
            <i className="fa-solid fa-file-invoice"></i> แจ้งชำระค่าบริการ (รายเดือน: {amountToPay.toLocaleString()} ฿)
        </button>

        <div className="card">
            <h3 className="card-title"><i className="fa-solid fa-bell"></i> ประกาศจากศูนย์ฯ</h3>
            <div className="list-item">
                <div className="list-item-info">
                    <h4>ยินดีต้อนรับสู่ระบบ Daycare</h4>
                    <p>ระบบพร้อมใช้งานจริง 100% แล้ว</p>
                </div>
            </div>
        </div>
    </>
  )
}
