import QRCode from "qrcode.react";

const QRCodeDisplay = ({ qrCode }) => {
  // Create a data URL from the decoded binary data

  return (
    <div>
      <QRCode size={265} value={qrCode} />
    </div>
  );
};

export default QRCodeDisplay;
