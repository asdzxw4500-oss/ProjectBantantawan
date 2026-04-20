import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const loadLocal = (key, defaultVal) => JSON.parse(localStorage.getItem(key)) || defaultVal;
  const saveLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  const [sheetsUrl, setSheetsUrl] = useState(() => loadLocal('daycare_sheets_url', 'https://script.google.com/macros/s/AKfycbyRvoFyMiVn9bpTJirqwenfHjnrhKLvFMuoups0457BHqweR1pVLXTt7_DURtjXuFyO/exec'));
  const [isSyncing, setIsSyncing] = useState(false);

  const [personnel, _setPersonnel] = useState([]);
  const [parents, _setParents] = useState([]);
  const [childrenList, _setChildrenList] = useState([]);
  const [rates, _setRates] = useState({ monthly: 0, activity: 0 });
  const [schedules, _setSchedules] = useState([]);
  const [attendances, _setAttendances] = useState([]);
  const [payments, _setPayments] = useState([]);
  const [users, _setUsers] = useState([]);
  
  const [currentUser, setCurrentUser] = useState(() => loadLocal('daycare_current_user', null));

  // Persist current user to localStorage so refresh doesn't logout
  useEffect(() => {
    saveLocal('daycare_current_user', currentUser);
  }, [currentUser]);

  const syncToSheets = (sheetName, data) => {
    if (!sheetsUrl) return;
    fetch(sheetsUrl, {
      method: 'POST',
      body: JSON.stringify({ action: 'write', sheet: sheetName, data })
    }).catch(e => console.error('Sync error', e));
  };

  const setPersonnel = (data) => { _setPersonnel(data); syncToSheets('Personnel', data); };
  const setParents = (data) => { _setParents(data); syncToSheets('Parents', data); };
  const setChildrenList = (data) => { _setChildrenList(data); syncToSheets('Children', data); };
  const setRates = (data) => { _setRates(data); syncToSheets('Rates', [data]); };
  const setSchedules = (data) => { _setSchedules(data); syncToSheets('Schedules', data); };
  const setAttendances = (data) => { _setAttendances(data); syncToSheets('Attendances', data); };
  const setPayments = (data) => { _setPayments(data); syncToSheets('Payments', data); };
  const setUsers = (data) => { _setUsers(data); syncToSheets('Users', data); };

  useEffect(() => { saveLocal('daycare_sheets_url', sheetsUrl); }, [sheetsUrl]);

  // Load from Sheets on mount or when URL changes
  useEffect(() => {
    if (sheetsUrl) {
      setIsSyncing(true);
      fetch(sheetsUrl + '?action=read')
        .then(res => res.json())
        .then(data => {
           if (data.Personnel?.length > 0) _setPersonnel(data.Personnel);
           if (data.Parents?.length > 0) _setParents(data.Parents);
           if (data.Children?.length > 0) _setChildrenList(data.Children);
           if (data.Rates?.length > 0) _setRates(data.Rates[0]);
           if (data.Schedules?.length > 0) _setSchedules(data.Schedules);
           if (data.Attendances?.length > 0) _setAttendances(data.Attendances);
           if (data.Payments?.length > 0) _setPayments(data.Payments);
           if (data.Users?.length > 0) _setUsers(data.Users);
           setIsSyncing(false);
        })
        .catch(err => {
           console.error("Fetch Error:", err);
           setIsSyncing(false);
        });
    }
  }, [sheetsUrl]);

  return (
    <DataContext.Provider value={{
      personnel, setPersonnel,
      parents, setParents,
      childrenList, setChildrenList,
      rates, setRates,
      schedules, setSchedules,
      attendances, setAttendances,
      payments, setPayments,
      users, setUsers,
      currentUser, setCurrentUser,
      sheetsUrl, setSheetsUrl,
      isSyncing
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
