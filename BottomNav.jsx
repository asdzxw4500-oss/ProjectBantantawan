export default function BottomNav({ role, currentView, onViewChange }) {
  
  const isActive = (views) => views.includes(currentView) ? 'active' : ''

  if (role === 'admin') {
    return (
      <nav id="bottom-nav">
          <a className={`nav-item ${isActive(['dashboard', 'rates_manage', 'parents_manage', 'children_manage', 'schedule'])}`} onClick={() => onViewChange('dashboard')}><i className="fa-solid fa-house"></i> หน้าแรก</a>
          <a className={`nav-item ${isActive(['personnel'])}`} onClick={() => onViewChange('personnel')}><i className="fa-solid fa-users"></i> บุคลากร</a>
          <a className={`nav-item ${isActive(['reports'])}`} onClick={() => onViewChange('reports')}><i className="fa-solid fa-chart-bar"></i> รายงาน</a>
      </nav>
    )
  }

  if (role === 'staff') {
    return (
      <nav id="bottom-nav">
          <a className={`nav-item ${isActive(['dashboard', 'payment'])}`} onClick={() => onViewChange('dashboard')}><i className="fa-solid fa-house"></i> หน้าแรก</a>
          <a className={`nav-item ${isActive(['attendance'])}`} onClick={() => onViewChange('attendance')}><i className="fa-solid fa-clock"></i> รับ-ส่ง</a>
          <a className={`nav-item ${isActive(['schedule'])}`} onClick={() => onViewChange('schedule')}><i className="fa-solid fa-calendar-alt"></i> ตารางงาน</a>
      </nav>
    )
  }

  if (role === 'parent') {
    return (
      <nav id="bottom-nav">
          <a className={`nav-item ${isActive(['dashboard'])}`} onClick={() => onViewChange('dashboard')}><i className="fa-solid fa-house"></i> หน้าแรก</a>
          <a className={`nav-item ${isActive(['history'])}`} onClick={() => onViewChange('history')}><i className="fa-solid fa-clock-rotate-left"></i> ประวัติ</a>
          <a className={`nav-item ${isActive(['payment'])}`} onClick={() => onViewChange('payment')}><i className="fa-solid fa-file-invoice-dollar"></i> ชำระเงิน</a>
          <a className={`nav-item ${isActive(['schedule'])}`} onClick={() => onViewChange('schedule')}><i className="fa-solid fa-calendar-alt"></i> ปฏิทิน</a>
      </nav>
    )
  }

  return null
}
