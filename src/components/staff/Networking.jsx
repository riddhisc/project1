import React, { useState, useEffect } from 'react';
import { fetchNetworkingSuggestions } from '../../services/eventService';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import NetworkingMatch from '../../components/staff/NetworkingMatch';
import QRCodeGenerator from '../../components/common/QRCodeGenerator';
import Loader from '../../components/common/Loader';

const Networking = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const data = await fetchNetworkingSuggestions();
        setSuggestions(data);
      } catch (err) {
        setError('Failed to load networking suggestions');
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, []);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  if (loading) return <Loader />;

  return (
    <div className="staff-layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar type="staff" />
        <main className="content">
          <h1>Networking</h1>
          
          <div className="networking-container">
            <div className="suggestions-section">
              <h2>Suggested Connections</h2>
              
              {error ? (
                <div className="error-container">
                  <p>{error}</p>
                  <button onClick={() => window.location.reload()}>Retry</button>
                </div>
              ) : (
                <div className="networking-matches">
                  {suggestions.length > 0 ? (
                    suggestions.map(suggestion => (
                      <NetworkingMatch 
                        key={suggestion._id}
                        suggestion={suggestion}
                        onSelect={() => handleContactSelect(suggestion)}
                        isSelected={selectedContact && selectedContact._id === suggestion._id}
                      />
                    ))
                  ) : (
                    <p className="no-suggestions">No networking suggestions available</p>
                  )}
                </div>
              )}
            </div>
            
            {selectedContact && (
              <div className="qrcode-section">
                <h2>Share Your Contact</h2>
                <QRCodeGenerator data={selectedContact} />
                <p className="qr-instructions">
                  Scan this code to quickly connect during events
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Networking;