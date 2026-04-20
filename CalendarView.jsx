import React from 'react';

export default function CalendarView({ schedules, personnel }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const formatDate = (d) => `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  return (
    <div style={{marginTop: '20px'}}>
       <div style={{textAlign: 'center', marginBottom: '10px', fontWeight: 'bold', fontSize: '18px'}}>
          เดือน {today.toLocaleString('th-TH', {month: 'long', year: 'numeric'})}
       </div>
       <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center'}}>
          {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(d => <div key={d} style={{fontWeight:'bold', color:'var(--primary-dark)', fontSize: '14px'}}>{d}</div>)}
          {days.map((d, i) => {
             if (!d) return <div key={`empty-${i}`} style={{padding: '5px', background: '#f8fafc', borderRadius: '5px', border: '1px dashed #e2e8f0'}}></div>;
             
             const dateStr = formatDate(d);
             const daySchedules = schedules.filter(s => s.date === dateStr);
             
             return (
               <div key={d} style={{padding: '5px', background: daySchedules.length ? '#fef08a' : '#fff', border: '1px solid #e2e8f0', borderRadius: '5px', minHeight: '70px', display: 'flex', flexDirection: 'column'}}>
                  <div style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', textAlign: 'right', color: daySchedules.length ? '#854d0e' : '#64748b'}}>{d}</div>
                  <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '2px'}}>
                    {daySchedules.map(s => {
                        const st = personnel.find(p => p.id === s.staffId);
                        // แสดงแค่คำแรกของชื่อเพื่อประหยัดพื้นที่
                        const shortName = st ? st.name.split(' ')[0].replace('คุณครู', 'ครู') : 'ครู';
                        return (
                          <div key={s.id} style={{fontSize: '11px', background: 'var(--primary-color)', color: '#fff', padding: '2px', borderRadius: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {shortName}
                          </div>
                        )
                    })}
                  </div>
               </div>
             )
          })}
       </div>
    </div>
  )
}
