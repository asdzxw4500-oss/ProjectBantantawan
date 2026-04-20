import { useState } from 'react'
import { useData } from '../data/DataContext'

export default function Login({ onLogin }) {
  const { users, setUsers, parents, setParents, setCurrentUser } = useData()
  const [isRegistering, setIsRegistering] = useState(false)
  
  // Login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Register states
  const [regUser, setRegUser] = useState('')
  const [regPass, setRegPass] = useState('')
  const [regName, setRegName] = useState('')
  const [regPhone, setRegPhone] = useState('')

  const doLogin = () => {
    const userObj = users.find(u => u.username === username.trim() && String(u.password) === password.trim())
    if (userObj) {
      setCurrentUser(userObj)
      onLogin()
    } else {
      setError('ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง')
    }
  }

  const doRegister = () => {
    if (!regUser || !regPass || !regName || !regPhone) {
      return setError('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
    if (users.find(u => u.username === regUser)) {
      return setError('ชื่อผู้ใช้นี้มีคนใช้แล้ว')
    }

    // 1. Create Parent Record
    const newParentId = 'p' + Date.now()
    const newParent = {
        id: newParentId,
        name: regName,
        phone: regPhone,
        lineId: '',
        authorized: ''
    }
    setParents([...parents, newParent])

    // 2. Create User Record
    const newUser = {
        id: 'u' + Date.now(),
        username: regUser,
        password: regPass,
        role: 'parent',
        linkId: newParentId
    }
    setUsers([...users, newUser])
    
    // Auto login
    setCurrentUser(newUser)
    onLogin()
  }

  return (
    <div className="login-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="logo-area">
            <i className="fa-solid fa-child-reaching text-primary" style={{ fontSize: '64px' }}></i>
            <h2>{isRegistering ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</h2>
            <p>{isRegistering ? 'สำหรับผู้ปกครอง' : 'กรุณาระบุตัวตนของคุณ'}</p>
        </div>
        
        <div className="card" style={{ marginTop: '20px' }}>
            {!isRegistering ? (
               <>
                  <div className="form-group">
                      <label>ชื่อผู้ใช้งาน</label>
                      <input 
                        type="text" className="form-control" placeholder="Username" 
                        value={username} onChange={e => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && doLogin()}
                      />
                  </div>
                  <div className="form-group">
                      <label>รหัสผ่าน</label>
                      <input 
                        type="password" className="form-control" placeholder="Password" 
                        value={password} onChange={e => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && doLogin()}
                      />
                  </div>
                  {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                  <button className="btn btn-primary btn-large" onClick={doLogin}>
                      <i className="fa-solid fa-right-to-bracket"></i> เข้าสู่ระบบ
                  </button>
                  <p style={{textAlign:'center', marginTop:'15px', color:'var(--primary-dark)', cursor:'pointer', textDecoration:'underline'}} onClick={() => {setIsRegistering(true); setError('');}}>
                      สำหรับผู้ปกครอง: สมัครสมาชิกใหม่
                  </p>
               </>
            ) : (
               <>
                  <div className="form-group">
                      <label>ชื่อ-นามสกุล ผู้ปกครอง</label>
                      <input type="text" className="form-control" value={regName} onChange={e => setRegName(e.target.value)} />
                  </div>
                  <div className="form-group">
                      <label>เบอร์โทรศัพท์</label>
                      <input type="text" className="form-control" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                  </div>
                  <hr style={{margin: '15px 0'}}/>
                  <div className="form-group">
                      <label>ตั้งชื่อผู้ใช้งาน (Username)</label>
                      <input type="text" className="form-control" value={regUser} onChange={e => setRegUser(e.target.value)} />
                  </div>
                  <div className="form-group">
                      <label>ตั้งรหัสผ่าน (Password)</label>
                      <input type="password" className="form-control" value={regPass} onChange={e => setRegPass(e.target.value)} />
                  </div>
                  {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                  <button className="btn btn-primary btn-large" style={{background:'var(--secondary-color)'}} onClick={doRegister}>
                      <i className="fa-solid fa-user-plus"></i> สมัครสมาชิก
                  </button>
                  <p style={{textAlign:'center', marginTop:'15px', color:'var(--text-light)', cursor:'pointer', textDecoration:'underline'}} onClick={() => {setIsRegistering(false); setError('');}}>
                      กลับไปหน้าเข้าสู่ระบบ
                  </p>
               </>
            )}
        </div>
    </div>
  )
}
