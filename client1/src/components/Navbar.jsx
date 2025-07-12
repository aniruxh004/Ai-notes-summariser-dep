import { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from '../axios';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout', {}, { withCredentials: true });
      setUser(null); // Clear user context
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Try again.');
    }
  };


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-highlight">AI</span> Notes Summarizer
        </Link>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/home" className="nav-link">Home</Link></li>
          <li><Link to="/summary" className="nav-link">Summary</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>

          <li>
            <span onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
