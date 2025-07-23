import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employees } from '../data';
import Header from '../components/Header';

function EmployeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emp = employees.find(e => e.id === parseInt(id));

  const [present, setPresent] = useState(emp?.present ?? false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAttendanceChange = async (newStatus) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPresent(newStatus);
      setIsLoading(false);
    }, 1000);
  };

  const handleResendQR = () => {
    // Simulate QR resend
    alert('QR code has been sent to the employee\'s email!');
  };

  if (!emp) {
    return (
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="error-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h2 className="error-title">Employee Not Found</h2>
              <p className="error-description">
                The employee you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/')}
                className="back-button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back to Employee List</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <div className="container">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="back-nav"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Employee List</span>
          </button>

          <h2 className="detail-page-title">Employee Detail</h2>

          {/* Employee Header Card */}
          <div className="detail-card employee-header">
            <div className="employee-header-content">
              <div className="employee-main-info">
                <div className="employee-large-avatar">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h1 className="employee-detail-name">{emp.name}</h1>
                  <p className="employee-detail-id">Employee ID: {emp.id}</p>
                </div>
              </div>

              <div className={`status-badge large ${present ? 'present' : 'absent'}`}>
                {present ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                <span>{present ? 'Present Today' : 'Absent Today'}</span>
              </div>
            </div>

            {/* Employee Details Grid */}
            <div className="employee-details-grid">
              <div className="detail-section">
                <div className="detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <div>
                    <p className="detail-label">Email</p>
                    <p className="detail-value">{emp.email}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="detail-label">Department</p>
                    <p className="detail-value">{emp.department}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <div>
                    <p className="detail-label">Join Date</p>
                    <p className="detail-value">
                      {new Date(emp.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Aadhar Document */}
              <div className="document-section">
                {/* <h3 className="document-title">Identity Document</h3> */}
                <div className="document-container">
                  <img
                    src={emp.aadhar}
                    alt="Employee Aadhar"
                    className="document-image"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="detail-card actions-card">
            <h2 className="actions-title">Quick Actions</h2>
            
            <div className="button-group modern-buttons">
              <button
                onClick={() => handleAttendanceChange(true)}
                disabled={isLoading || present}
                className="mark-attendance modern-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{isLoading ? 'Updating...' : 'Mark Present'}</span>
              </button>

              <button
                onClick={() => handleAttendanceChange(false)}
                disabled={isLoading || !present}
                className="remove-attendance modern-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>{isLoading ? 'Updating...' : 'Mark Absent'}</span>
              </button>

              <button
                onClick={handleResendQR}
                className="new-button modern-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
                  <rect x="16" y="3" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="16" width="5" height="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 16h-3a2 2 0 0 0-2 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7v3a2 2 0 0 1-2 2H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 12h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Resend QR</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDetailPage;