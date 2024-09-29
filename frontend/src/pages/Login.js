import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onRegister, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');  // Add username field

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Set the entered username
        setUserName(username);  // Set the username from the form
        const { token, userId } = data;
        onLogin(username, userId, token);  // Pass the userId and token to App.js
      } else {
        alert(data.msg || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      alert('Error logging in');
    }
  };

  return (
    <div className="outer-container">
      <div className="login-container">
        <img src={`${process.env.PUBLIC_URL}/welcome_pic.png`} alt="Welcome Logo" className="login-logo" />
        <h2>We're glad to see you!</h2>
        <p>Please log in to your account.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label> {/* Username input field */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <span onClick={onRegister} className="create-account-link" style={{ color: 'blue', cursor: 'pointer' }}>
            Create one now!
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;





















