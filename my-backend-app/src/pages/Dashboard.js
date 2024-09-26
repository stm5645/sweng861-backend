import React from 'react';
import './Dashboard.css';

const Dashboard = ({ userName, submissions, onShowForm, onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome {userName} to Your Dashboard!</h1>
      </div>
      <div className="logout-container">
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
      <div className="card">
        <h3>Data Submission</h3>
        <p>Fill out the form to submit your data.</p>
        <button onClick={onShowForm} className="card-button">Go to Data Submission Form</button>
      </div>
      <div className="submissions">
        <h3>Submissions</h3>
        <ul className="submission-list">
          {submissions.map((submission, index) => (
            <li key={index} className="submission-item">
              <strong>Name:</strong> {submission.name} <br />
              <strong>Email:</strong> {submission.email} <br />
              <strong>Age:</strong> {submission.age} <br />
              <strong>Phone:</strong> {submission.phone} <br />
              <strong>Address:</strong> {submission.address} <br />
              <strong>Course:</strong> {submission.course} <br />
              <strong>Semester:</strong> {submission.semester} <br />
              <strong>Comments:</strong> {submission.comments}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;








