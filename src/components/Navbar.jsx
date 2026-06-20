import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../storage';

export const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav className="navbar glass" style={{ margin: '1rem', borderRadius: '30px' }}>
      <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="logo text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Sparkles size={24} color="var(--primary-color)" />
          MAKE U READY
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {!user ? (
            <Link to="/login" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontWeight: 600 }}>Login / Register</Link>
          ) : (
            <>
              {user.role === 'BRIDE' && (
                <Link to="/search" style={{ fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Find Artists
                </Link>
              )}
              
              <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--primary-color) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name.split(' ')[0]}</span>
                </div>

                <Link to={user.role === 'ARTIST' ? '/artist' : '/bride'} className="btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  Dashboard
                </Link>

                <button 
                  onClick={handleLogout} 
                  style={{ 
                    padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: '#e74c3c', background: 'rgba(231, 76, 60, 0.1)', border: 'none', borderRadius: '10px',
                    cursor: 'pointer', transition: 'all 0.3s ease'
                  }} 
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
