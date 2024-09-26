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

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setIsRegistering(false);
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

  const handleDataSubmission = (data) => {
    setSubmissions([...submissions, data]);
    setShowForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setSubmissions([]);
    setShowForm(false);
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
        <Login onLogin={handleLogin} onRegister={handleRegister} setUserName={setUserName} />
      )}
    </div>
  );
};

export default App;

