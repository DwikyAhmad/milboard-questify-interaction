
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import QRScanner from "@/components/qr-scanner/QRScanner";

const Scan = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Add animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  return (
    <Layout>
      <div className={`space-y-6 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Pindai Kode QR</h1>
          <p className="text-muted-foreground mt-1">
            Pindai kode QR MILBoard untuk mengakses materi pembelajaran
          </p>
        </div>
        
        <QRScanner />
        
        <div className="bg-primary/5 rounded-lg p-4 mt-8 text-sm">
          <h3 className="font-medium mb-2">Cara menggunakan pemindai QR</h3>
          <ol className="space-y-2 pl-4 list-decimal">
            <li>Klik "Mulai Kamera" untuk mengaktifkan kamera perangkat Anda</li>
            <li>Arahkan kamera ke kode QR MILBoard</li>
            <li>Tahan dengan stabil hingga kode dikenali</li>
            <li>Anda akan otomatis diarahkan ke konten yang relevan</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
