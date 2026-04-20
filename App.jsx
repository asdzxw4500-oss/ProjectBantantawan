import { useState, useEffect } from 'react'
import { useData } from './data/DataContext'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import ParentDashboard from './pages/ParentDashboard'

// Views
import AdminPersonnel from './pages/views/AdminPersonnel'
import AdminParents from './pages/views/AdminParents'
import AdminChildren from './pages/views/AdminChildren'
import AdminRates from './pages/views/AdminRates'
import AdminSchedule from './pages/views/AdminSchedule'
import AdminReports from './pages/views/AdminReports'
import AdminSettings from './pages/views/AdminSettings'
import StaffAttendance from './pages/views/StaffAttendance'
import StaffPayment from './pages/views/StaffPayment'
import StaffSchedule from './pages/views/StaffSchedule'
import ParentHistory from './pages/views/ParentHistory'
import ParentPayment from './pages/views/ParentPayment'
import ParentSchedule from './pages/views/ParentSchedule'

function App() {
  const { currentUser, setCurrentUser } = useData()
  const [currentView, setCurrentView] = useState('dashboard')

  const userRole = currentUser ? currentUser.role : null;

  // ลบพาธใน URL เช่น /login ออกให้เหลือแค่ / เพื่อความสะอาดตา
  useEffect(() => {
     if (window.location.pathname !== '/') {
         window.history.replaceState(null, '', '/');
     }
  }, []);

  const handleLogin = () => {
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('dashboard')
  }

  // Define Title
  let title = "ศูนย์รับเลี้ยงเด็ก"
  if (userRole) {
     if (currentView !== 'dashboard') {
         const titles = {
            'personnel': 'จัดการบุคลากร',
            'reports': 'รายงานสรุป',
            'attendance': 'บันทึกรับ-ส่ง',
            'schedule': 'ตารางปฏิบัติงาน',
            'history': 'ประวัติรับ-ส่ง',
            'payment': 'ชำระค่าบริการ',
            'parents_manage': 'จัดการข้อมูลผู้ปกครอง',
            'children_manage': 'จัดการข้อมูลเด็ก',
            'rates_manage': 'อัตราค่าบริการ',
            'settings': 'ตั้งค่าฐานข้อมูล'
         }
         title = titles[currentView] || "ศูนย์รับเลี้ยงเด็ก"
     } else {
         title = userRole === 'admin' ? "ผู้ดูแลระบบ" : userRole === 'staff' ? "ครูพี่เลี้ยง" : "ผู้ปกครอง"
     }
  }

  return (
    <div id="app-container">
      <Header title={title} showLogout={!!userRole} onLogout={handleLogout} />
      
      <main id="main-content" style={{ display: !userRole ? 'flex' : 'block', alignItems: !userRole ? 'center' : 'initial' }}>
        {!userRole ? (
          <Login onLogin={handleLogin} />
        ) : currentView === 'dashboard' ? (
          <>
            {userRole === 'admin' && <AdminDashboard onViewChange={setCurrentView} />}
            {userRole === 'staff' && <StaffDashboard onViewChange={setCurrentView} />}
            {userRole === 'parent' && <ParentDashboard onViewChange={setCurrentView} />}
          </>
        ) : (
          <>
            {currentView === 'personnel' && <AdminPersonnel />}
            {currentView === 'parents_manage' && <AdminParents />}
            {currentView === 'children_manage' && <AdminChildren />}
            {currentView === 'rates_manage' && <AdminRates />}
            {currentView === 'schedule' && userRole === 'admin' && <AdminSchedule />}
            {currentView === 'reports' && <AdminReports />}
            {currentView === 'settings' && userRole === 'admin' && <AdminSettings />}
            
            {currentView === 'attendance' && <StaffAttendance />}
            {currentView === 'payment' && (userRole === 'staff' || userRole === 'admin') && <StaffPayment />}
            {currentView === 'schedule' && userRole === 'staff' && <StaffSchedule />}

            {currentView === 'history' && <ParentHistory />}
            {currentView === 'payment' && userRole === 'parent' && <ParentPayment />}
            {currentView === 'schedule' && userRole === 'parent' && <ParentSchedule />}
          </>
        )}
      </main>

      {userRole && <BottomNav role={userRole} currentView={currentView} onViewChange={setCurrentView} />}
    </div>
  )
}

export default App
