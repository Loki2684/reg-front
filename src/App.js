import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import QRScannerPage from './pages/QRScannerPage';
import WEBQRScannerPage from './pages/ORWebScannerPage';


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetailPage />} />
          <Route path="/scanner" element={<QRScannerPage />} />
          <Route path="/Webscanner" element={<WEBQRScannerPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;