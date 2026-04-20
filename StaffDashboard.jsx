import { useData } from '../data/DataContext';

export default function StaffDashboard({ onViewChange }) {
  const { currentUser, childrenList } = useData();
  const childrenWithAllergies = childrenList.filter(c => c.allergies && c.allergies.trim() !== '');

  return (
    <>
        <div className="card" style={{background: 'var(--tertiary-color)', color: 'var(--text-main)'}}>
            <div className="card-title" style={{color: 'var(--text-main)'}}><i className="fa-solid fa-sun"></i> สวัสดีคุณครู {currentUser?.username || ''}</div>
            <p>ยินดีต้อนรับเข้าสู่ระบบปฏิบัติงาน</p>
        </div>
        <button className="btn btn-primary btn-large" onClick={() => onViewChange('attendance')}>
            <i className="fa-solid fa-qrcode"></i> สแกนรับ-ส่งเด็ก
        </button>
        <button className="btn btn-secondary btn-large" onClick={() => onViewChange('payment')}>
            <i className="fa-solid fa-money-bill-wave"></i> รับชำระเงิน
        </button>
        <div className="card">
            <h3 className="card-title"><i className="fa-solid fa-triangle-exclamation"></i> เด็กที่ต้องดูแลพิเศษ</h3>
            {childrenWithAllergies.length === 0 ? <p style={{color: 'var(--text-light)'}}>ไม่มีเด็กที่มีประวัติแพ้อาหารหรือโรคประจำตัว</p> : null}
            {childrenWithAllergies.map(c => (
                <div key={c.id} className="list-item">
                    <div className="list-item-info">
                        <h4>{c.name}</h4>
                        <p style={{color: '#b91c1c'}}>ข้อมูล: {c.allergies}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}
