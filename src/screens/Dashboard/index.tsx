import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Dashboard.css';

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container" id="dashboard">
      <header className="dashboard-header" id="dashboard-header">
        <h1>Dashboard</h1>
        <button 
          onClick={logout}
          className="logout-button"
          id="logout-btn"
        >
          Logout
        </button>
      </header>
      <main className="dashboard-content" id="dashboard-content">
        <h2>Welcome to your Dashboard</h2>
        <p>You have successfully logged in with GitHub!</p>
      </main>
    </div>
  );
};