import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { AuthContext } from '../AuthContext';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/login', form, { withCredentials: true });
      await new Promise(resolve => setTimeout(resolve, 300));
      const res = await axios.get('/user/verify', { withCredentials: true }); 
      setUser(res.data.user);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-background">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Log in to continue</p>

        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="login-button" type="submit">Log In</button>
        {msg && <p className="login-error">{msg}</p>}
      </form>
    </div>
  );
}
