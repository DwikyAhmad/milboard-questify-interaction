
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
          <h1 className="text-2xl font-bold">Scan QR Code</h1>
          <p className="text-muted-foreground mt-1">
            Scan a MILBoard QR code to access learning materials
          </p>
        </div>
        
        <QRScanner />
        
        <div className="bg-primary/5 rounded-lg p-4 mt-8 text-sm">
          <h3 className="font-medium mb-2">How to use the QR scanner</h3>
          <ol className="space-y-2 pl-4 list-decimal">
            <li>Click "Start Camera" to activate your device's camera</li>
            <li>Point the camera at a MILBoard QR code</li>
            <li>Hold steady until the code is recognized</li>
            <li>You'll be automatically directed to the relevant content</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
