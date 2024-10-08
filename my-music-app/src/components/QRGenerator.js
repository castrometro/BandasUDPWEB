import React from 'react';
import QRCode from 'react-qr-code';

const QRGenerator = ({ qrCode }) => {
  return (
    <div className="text-center">
      <QRCode value={qrCode} size={256} />
      <p className="mt-4">Muestra este código QR al estudiante para verificar</p>
    </div>
  );
};

export default QRGenerator;