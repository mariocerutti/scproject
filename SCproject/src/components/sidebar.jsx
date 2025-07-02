import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`sidebar ${open ? 'open' : ''}`}
      style={{
        width: open ? '200px' : '60px',
        background: '#2c3e50',
        color: 'white',
        height: '100vh',
        transition: 'width 0.3s',
        position: 'fixed',
        paddingTop: '10px',
        zIndex: 10
      }}
    >
      <div
        className="toggle-btn"
        onClick={toggleSidebar}
        style={{ cursor: 'pointer', padding: '10px', textAlign: 'right' }}
      >
        {open ? '◀' : '▶'}
      </div>

      {open && (
        <ul style={{ listStyle: 'none', padding: '10px' }}>
          <li><Link to="/" style={{ color: 'white' }}>Início</Link></li>
          <li><Link to="/tickets" style={{ color: 'white' }}>Tickets</Link></li>
          <li><Link to="/perfil" style={{ color: 'white' }}>Perfil</Link></li>
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
