
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QRScanner = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

  // Mock function to handle QR code detection
  const mockDetectQRCode = (stream: MediaStream) => {
    // In a real implementation, this would use a library like jsQR or a similar solution
    // to analyze video frames from the camera and detect QR codes
    
    // For demo purposes, we'll just simulate finding a QR code after a few seconds
    setTimeout(() => {
      const mockModuleId = "module-1";
      setResult(mockModuleId);
      setIsScanning(false);
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      toast({
        title: "Kode QR terdeteksi!",
        description: `Membuka modul pembelajaran: "Pengantar Literasi Media"`,
      });
      
      // In a real app, this would navigate to the specific module
      setTimeout(() => {
        window.location.href = `/modules/${mockModuleId}`;
      }, 1500);
    }, 3000);
  };

  const startScanner = async () => {
    try {
      setIsScanning(true);
      setResult(null);
      
      const constraints = { video: { facingMode: "environment" } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setHasPermissions(true);
        
        // Start the mock QR detection
        mockDetectQRCode(stream);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasPermissions(false);
      setIsScanning(false);
      toast({
        title: "Akses kamera ditolak",
        description: "Harap izinkan akses kamera untuk memindai kode QR.",
        variant: "destructive",
      });
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      // Clean up on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="overflow-hidden border-none shadow-lg">
        <CardContent className="p-0">
          {isScanning ? (
            <div className="relative">
              <div className="aspect-square w-full relative overflow-hidden rounded-lg">
                <video
                  ref={videoRef}
                  className="absolute w-full h-full object-cover"
                  playsInline
                ></video>
                <canvas ref={canvasRef} className="absolute w-full h-full"></canvas>
                
                {/* Scanning overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-2 border-unesco-blue rounded-lg relative animate-pulse">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-unesco-blue rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-unesco-blue rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-unesco-blue rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-unesco-blue rounded-br-lg"></div>
                  </div>
                </div>
                
                {/* Close button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full shadow-md bg-white text-primary hover:bg-white/90"
                  onClick={stopScanner}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-6 text-center">
                <p className="font-medium">Memindai Kode QR...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Posisikan kode QR dalam bingkai
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              {hasPermissions === false ? (
                <div className="space-y-4">
                  <p className="text-destructive font-medium">Akses kamera ditolak</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Harap izinkan akses kamera di pengaturan browser Anda dan coba lagi.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 py-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Pindai Kode QR</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pindai kode QR MILBoard untuk mengakses materi pembelajaran
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={startScanner} 
                    className="w-full button-hover"
                  >
                    Mulai Kamera
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
