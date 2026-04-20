import { useData } from '../data/DataContext';

export default function AdminDashboard({ onViewChange }) {
  const { childrenList, attendances, personnel, schedules } = useData();
  
  const todayStr = new Date().toLocaleDateString('th-TH');
  const todayISO = new Date().toISOString().split('T')[0];
  
  const childrenPresent = new Set(attendances.filter(a => a.type === 'in' && a.time.includes(todayStr)).map(a => a.childId)).size;
  const staffOnDuty = schedules.filter(s => s.date === todayISO).length;

  return (
    <>
        <div className="card">
            <div className="card-title"><i className="fa-solid fa-chart-pie"></i> ภาพรวมวันนี้</div>
            <p>จำนวนเด็กที่มา: <strong className="text-primary" style={{fontSize: '24px'}}>{childrenPresent}/{childrenList.length}</strong></p>
            <p>บุคลากรเข้าเวร: <strong style={{fontSize: '18px'}}>{staffOnDuty} คน</strong> <span style={{fontSize: '14px', color: 'var(--text-light)'}}>(จากทั้งหมด {personnel.length} คน)</span></p>
        </div>
        <div className="dashboard-grid">
            <div className="grid-item" onClick={() => onViewChange('personnel')}>
                <i className="fa-solid fa-user-nurse"></i>
                <span>บุคลากร</span>
            </div>
            <div className="grid-item" onClick={() => onViewChange('schedule')}>
                <i className="fa-solid fa-calendar-days"></i>
                <span>จัดตารางงาน</span>
            </div>
            <div className="grid-item" onClick={() => onViewChange('rates_manage')}>
                <i className="fa-solid fa-tags"></i>
                <span>ค่าบริการรายเดือน</span>
            </div>
            <div className="grid-item" onClick={() => onViewChange('payment')}>
                <i className="fa-solid fa-file-invoice-dollar"></i>
                <span>ตรวจสอบสลิป</span>
            </div>
            <div className="grid-item" onClick={() => onViewChange('parents_manage')}>
                <i className="fa-solid fa-users"></i>
                <span>ผู้ปกครอง</span>
            </div>
            <div className="grid-item" onClick={() => onViewChange('children_manage')}>
                <i className="fa-solid fa-children"></i>
                <span>ข้อมูลเด็ก</span>
            </div>
            <div className="grid-item" onClick={() => onViewChange('reports')}>
                <i className="fa-solid fa-file-invoice"></i>
                <span>รายงาน</span>
            </div>
            <div className="grid-item" onClick={() => onViewChange('settings')}>
                <i className="fa-solid fa-cloud"></i>
                <span>ตั้งค่าฐานข้อมูล</span>
            </div>
        </div>
    </>
  )
}
