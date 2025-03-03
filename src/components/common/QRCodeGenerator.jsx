import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ data }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Convert the data object to a JSON string
        const contactInfo = JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
          title: data.title,
          department: data.department
        });
        
        // Generate QR code as a data URL
        const url = await QRCode.toDataURL(contactInfo, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 250,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
        
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };
    
    if (data) {
      generateQRCode();
    }
  }, [data]);
  
  if (!data || !qrCodeUrl) {
    return <div className="qr-loading">Generating QR Code...</div>;
  }
  
  return (
    <div className="qrcode-container">
      <img 
        src={qrCodeUrl} 
        alt={`QR code for ${data.name}`} 
        className="qrcode-image" 
      />
      <div className="qrcode-info">
        <h3>{data.name}</h3>
        <p>{data.title}</p>
        <p>{data.department}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;