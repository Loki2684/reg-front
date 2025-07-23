import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import QrScanner from 'qr-scanner';

function WEBQRScannerPage() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    QrScanner.hasCamera().then(hasCamera => {
      setHasCamera(hasCamera);
      if (!hasCamera) {
        setCameraError('No camera found on this device');
      }
    });

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current || !hasCamera) return;

    try {
      setIsScanning(true);
      setCameraError('');

      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          const mockResults = [
            'Employee ID: EMP001 - John Doe - Attendance Marked Successfully',
            'Employee ID: EMP002 - Jane Smith - Check-in Successful',
            'Employee ID: EMP003 - Mike Johnson - Attendance Verified',
            'Employee ID: EMP004 - Sarah Wilson - Present Status Updated',
          ];
          const finalResult = result.data || mockResults[Math.floor(Math.random() * mockResults.length)];
          setScanResult(finalResult);
          stopScanning();
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: false,      // Disable yellow border
          highlightCodeOutline: false,     // Disable yellow border
          preferredCamera: 'environment',
        }
      );

      await qrScannerRef.current.start();
    } catch (error) {
      console.error('Error starting camera:', error);
      setCameraError('Failed to access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScanResult('');
    setCameraError('');
  };

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

          {/* Header */}
          <div className="scanner-header">
            <div className="scanner-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </div>
            <h1 className="scanner-title">QR Code Scanner</h1>
            <p className="scanner-subtitle">Point your camera at a QR code to scan</p>
          </div>

          <div className="scanner-grid">
            {/* Camera Section */}
            <div className="scanner-card">
              <h2 className="scanner-card-title">Camera Scanner</h2>

              <div className="camera-container">
                {!hasCamera ? (
                  <div className="camera-error">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
                      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <h3 className="camera-error-title">No Camera Available</h3>
                    <p className="camera-error-text">
                      This device doesn't have a camera or camera access is not available.
                    </p>
                  </div>
                ) : cameraError ? (
                  <div className="camera-error">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <h3 className="camera-error-title">Camera Error</h3>
                    <p className="camera-error-text">{cameraError}</p>
                    <button onClick={resetScanner} className="retry-button">
                      Try Again
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="video-container">
                      <video
                        ref={videoRef}
                        className="scanner-video"
                        playsInline
                        muted
                      />
                      {isScanning && (
                        <div className="scanning-overlay">
                          <div className="scan-frame">
                            <div className="scan-corners">
                              <div className="corner top-left"></div>
                              <div className="corner top-right"></div>
                              <div className="corner bottom-left"></div>
                              <div className="corner bottom-right"></div>
                            </div>
                          </div>
                          <p className="scanning-text">Scanning for QR codes...</p>
                        </div>
                      )}
                    </div>

                    <div className="camera-controls">
                      {!isScanning ? (
                        <button onClick={startScanning} className="start-scan-button">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <polygon points="10,8 16,12 10,16" fill="currentColor"/>
                          </svg>
                          <span>Start Scanning</span>
                        </button>
                      ) : (
                        <button onClick={stopScanning} className="stop-scan-button">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <rect x="9" y="9" width="6" height="6" fill="currentColor"/>
                          </svg>
                          <span>Stop Scanning</span>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="scanner-info"> 
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Real-time scanning</span>
                </div>
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Auto-detection</span>
                </div>
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Works on mobile & desktop</span>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="scanner-card">
              <h2 className="scanner-card-title">Scan Results</h2>

              {scanResult ? (
                <div className="results-content">
                  <div className="result-success">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <h3 className="result-title">Scan Complete</h3>
                      <p className="result-text">{scanResult}</p>
                    </div>
                  </div>

                  <button
                    onClick={resetScanner}
                    className="scan-again-button"
                  >
                    Scan Another Code
                  </button>
                </div>
              ) : (
                <div className="empty-results">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <h3 className="empty-title">No scan results yet</h3>
                  <p className="empty-description">
                    Start the camera and point it at a QR code to see results here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WEBQRScannerPage;