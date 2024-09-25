import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define admin and user credentials
    const credentials = {
      admin: {
        username: 'admin',
        password: 'admin123'
      },
      user: {
        username: 'user',
        password: 'user123'
      }
    };

    if (username === credentials.admin.username && password === credentials.admin.password) {
      onLogin('admin');
      navigate('/admin-home');
    } else if (username === credentials.user.username && password === credentials.user.password) {
      onLogin('user');
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
