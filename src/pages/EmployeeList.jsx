import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employees } from '../data';
import Footer from '../components/Footer';
import Header from '../components/Header';

function EmployeeList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6;

  // Filter employees by name

const filteredEmployees = employees.filter(emp =>
  emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  emp.id.toString().includes(searchQuery)
);


  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const start = (currentPage - 1) * employeesPerPage;
  const end = start + employeesPerPage;
  const paginatedEmployees = filteredEmployees.slice(start, end);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const presentCount = filteredEmployees.filter(emp => emp.present).length;
  const absentCount = filteredEmployees.length - presentCount;

  // Pagination helper function
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages > 1 ? getVisiblePages() : [];

  return (
    <div className="app-layout">
      {/* Header with logo and search */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="main-content">
        <div className="container">
          {/* Header Section */}
          <div className="page-header">
            <div className="page-title-section">
              <div className="page-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="page-title">Admin Dashboard</h1>
                <p className="page-subtitle">Manage and track your team members</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <p className="stat-label">Total Employees</p>
                    <p className="stat-value">{filteredEmployees.length}</p>
                  </div>
                  <div className="stat-icon total">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <p className="stat-label">Present Today</p>
                    <p className="stat-value present">{presentCount}</p>
                  </div>
                  <div className="stat-icon present">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <p className="stat-label">Absent Today</p>
                    <p className="stat-value absent">{absentCount}</p>
                  </div>
                  <div className="stat-icon absent">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Grid */}
          {paginatedEmployees.length > 0 ? (
            <>
              <div className="employee-grid">
                {paginatedEmployees.map(emp => (
                  <div
                    key={emp.id}
                    className="card employee-card"
                    onClick={() => navigate(`/employee/${emp.id}`)}
                  >
                    <div className="card-header">
                      <div className="employee-info">
                        <div className="employee-avatar">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="employee-name">{emp.name}</h3>
                          <p className="employee-id">ID: {emp.id}</p>
                        </div>
                      </div>

                      <div className={`status-badge ${emp.present ? 'present' : 'absent'}`}>
                        {emp.present ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        )}
                        <span>{emp.present ? 'Present' : 'Absent'}</span>
                      </div>
                    </div>

                    <div className="card-content">
                      <div className="employee-detail">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>{emp.email}</span>
                      </div>
                      <div className="employee-detail">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Joined {new Date(emp.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <span className="department-tag">{emp.department}</span>
                      <div className="view-details">
                        Click to view details →
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modern Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-nav"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="pagination-nav-text">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="pagination-numbers">
                    {visiblePages.map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`dots-${index}`} className="pagination-dots">
                            ...
                          </span>
                        );
                      }

                      const pageNumber = page;
                      const isActive = pageNumber === currentPage;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`pagination-number ${isActive ? 'active-page' : ''}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-nav"
                  >
                    <span className="pagination-nav-text">Next</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="empty-title">No employees found</h3>
              <p className="empty-description">
                {searchQuery
                  ? `No employees match "${searchQuery}". Try adjusting your search.`
                  : "No employees in the system yet."}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EmployeeList;