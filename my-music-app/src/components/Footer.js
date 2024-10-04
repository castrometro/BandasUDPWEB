import React from 'react'

const Footer = () => (
  <footer className="bg-black text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="/path-to-udp-logo.png" alt="UDP Logo" className="mb-4" />
        </div>
        <div>
          <img src="/path-to-acreditacion-logo.png" alt="Acreditación Logo" className="mb-4" />
        </div>
        <div>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
          </div>
          <p>2024 © UNIVERSIDAD DIEGO PORTALES</p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer