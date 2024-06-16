  import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeDisplay from "../components/QRCodeDisplay";

function QRCodeScanner() {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await fetch("http://localhost:4002/qr");
        const data = await response.json();
        if (response.ok) {
          setQrCode(data.qrCode);
          setLoading(false);
        } else {
          console.error("Failed to fetch QR code:", data.error);
        }
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQrCode();

    const interval = setInterval(fetchQrCode, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;

    const checkClientStatus = async () => {
      try {
        const response = await fetch("http://localhost:4002/client/ready");
        const data = await response.json();
        setClientReady(data.ready);
      } catch (error) {
        console.error("Error checking client status:", error);
      }
    };

    if (!loading && qrCode) {
      checkClientStatus();
      interval = setInterval(checkClientStatus, 3000);
    }

    return () => clearInterval(interval);
  }, [loading, qrCode]);

  useEffect(() => {
    if (clientReady) {
      navigate("/send-message");
    }
  }, [clientReady, navigate]);

  return (
      <div className="App">
        <div className="container">
          <h1>WhatsApp Web QR Code</h1>
          {loading ? (
            <div className="loading">Loading QR Code...</div>
          ) : (
            qrCode && <QRCodeDisplay qrCode={qrCode} />
          )}
        </div>
    </div>
  );
}

export default QRCodeScanner;
