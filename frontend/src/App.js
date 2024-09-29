import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DataSubmissionForm from './pages/DataSubmissionForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState('');

  const handleLogin = async (name, id, token) => {

    setIsLoggedIn(true);
    setUserName(name);
    setUserId(id);
    setToken(token);

    console.log("Received token:", token); // Add this line to debug
    console.log("Received userId:", id); // Add this line to debug

    try {
      const response = await fetch('http://localhost:5001/api/submissions', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setSubmissions(data);
      } else {
        throw new Error('Failed to fetch submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      alert('Failed to load submissions.');
    }
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleSuccessfulRegistration = () => {
    setIsRegistering(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleDataSubmission = async (data) => {
    try {
      const response = await fetch('http://localhost:5001/api/submissions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const newSubmission = await response.json();
      if (response.ok) {
        setSubmissions([...submissions, newSubmission]);
        setShowForm(false); // Redirect to dashboard after submission
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserId(null);
    setSubmissions([]);
    setShowForm(false);
    setToken('');
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
          onRegister={handleRegister}
          setUserName={setUserName}
        />
      )}
    </div>
  );
};

export default App;
