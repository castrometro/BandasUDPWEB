import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onScanSuccess, onScanError }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { 
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    
    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear().catch(error => {
        console.error('Failed to clear scanner', error);
      });
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="text-center">
      <div id="reader" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}></div>
      <p className="mt-4">Escanea el código QR generado por el guardia</p>
    </div>
  );
};

export default QRScanner;