import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QRGenerator from '../components/QRGenerator';
import QRScanner from '../components/QRScanner';
import StudentProfile from '../components/StudentProfile';
import logo from '../images/logo.png';

const Verificador = () => {
  const [mode, setMode] = useState('generate');
  const [qrCode, setQrCode] = useState('');
  const [studentProfile, setStudentProfile] = useState(null);

  useEffect(() => {
    if (mode === 'generate') {
      generateQR();
    }
  }, [mode]);

  const generateQR = () => {
    const randomCode = Math.random().toString(36).substring(7);
    setQrCode(randomCode);
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    fetchStudentProfile(decodedText);
  };

  const onScanError = (error) => {
    console.warn(error);
  };

  const fetchStudentProfile = (code) => {
    // Simulación de datos del estudiante
    const mockProfile = {
      name: "Juan Pérez",
      band: "Los Rockeros",
      hasRehearsalToday: Math.random() < 0.5,
      rehearsalTime: "15:00 - 17:00"
    };
    setStudentProfile(mockProfile);
  };

  const headerNavItems = [
    { title: "Login", url: "/iniciar-sesion" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Bandas UDP", url: "/bandas-udp" },
    { title: "Verificador Integrante", url: "/verificador-integrante" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={headerNavItems} logo={logo} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Verificador de Integrantes</h1>
        <div className="flex justify-center mb-4">
          <button
            className={`mx-2 px-4 py-2 rounded ${mode === 'generate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('generate')}
          >
            Generar QR
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded ${mode === 'scan' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('scan')}
          >
            Escanear QR
          </button>
        </div>
        {mode === 'generate' && <QRGenerator qrCode={qrCode} />}
        {mode === 'scan' && <QRScanner onScanSuccess={onScanSuccess} onScanError={onScanError} />}
        {studentProfile && <StudentProfile profile={studentProfile} />}
      </main>
      <Footer />
    </div>
  );
};

export default Verificador;