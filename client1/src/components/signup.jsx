import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axios';
import './Signup.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      await axios.post('/user/signup', form, { withCredentials: true });

      setMsg('Signup successful!');
      setTimeout(() => navigate('/login'), 1000); // Redirect to login
    } catch (err) {
      console.error("Signup error:", err);
      setMsg(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-background">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us to summarize smarter ✨</p>

        <input
          className="signup-input"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="signup-button" type="submit">Sign Up</button>

        {msg && <p className="signup-error">{msg}</p>}

        <p className="signup-login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
