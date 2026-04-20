export default function Header({ title, showLogout, onLogout }) {
  return (
    <header id="app-header">
        <h1 id="header-title">{title}</h1>
        {showLogout && (
          <button id="logout-btn" onClick={onLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        )}
    </header>
  )
}
