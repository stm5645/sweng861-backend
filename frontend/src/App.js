import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DataSubmissionForm from './pages/DataSubmissionForm';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState(''); // Store JWT token after login

  const handleLogin = async (name, token) => {
    setIsLoggedIn(true);
    setUserName(name);
    setToken(token); // Save token for future requests

    // Fetch submissions after login
    try {
      const response = await fetch('http://localhost:5001/api/submissions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleSuccessfulRegistration = () => {
    setIsRegistering(false);
  };

  const handleDataSubmission = async (data) => {
    try {
      const response = await fetch('http://localhost:5001/api/submissions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const newSubmission = await response.json();
      setSubmissions([...submissions, newSubmission]);
      setShowForm(false);  // Redirect to dashboard after submission
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setSubmissions([]);
    setShowForm(false);
    setToken(''); // Clear token on logout
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        showForm ? (
          <DataSubmissionForm onSubmit={handleDataSubmission} />
        ) : (
          <Dashboard 
            userName={userName} 
            submissions={submissions} 
            onShowForm={handleShowForm} 
            onLogout={handleLogout} 
          />
        )
      ) : isRegistering ? (
        <Register onRegister={handleSuccessfulRegistration} />
      ) : (
        <Login 
          onLogin={handleLogin} 
          onRegister={handleRegister} // Ensure this is correctly set
          setUserName={setUserName} 
        />
      )}
    </div>
  );
};

export default App;

