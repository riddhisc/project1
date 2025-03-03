import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { initializeChat, sendMessage, disconnectChat } from '../../services/socketService';

const LiveChat = ({ eventId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    const setupChat = async () => {
      try {
        const socket = await initializeChat(eventId);
        
        socket.on('connect', () => {
          setIsConnected(true);
        });
        
        socket.on('disconnect', () => {
          setIsConnected(false);
        });
        
        socket.on('message', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
        
        socket.on('chat_history', (history) => {
          setMessages(history);
        });
        
        return () => {
          disconnectChat(socket);
        };
      } catch (error) {
        console.error('Error setting up chat:', error);
      }
    };
    
    if (eventId) {
      setupChat();
    }
  }, [eventId]);
  
  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() && isConnected) {
      const messageData = {
        eventId,
        text: newMessage,
        senderId: currentUser._id,
        senderName: currentUser.name
      };
      
      sendMessage(messageData);
      setNewMessage('');
    }
  };
  
  return (
    <div className="live-chat">
      <div className="chat-header">
        <h3>Live Chat</h3>
        <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div 
              key={index}
              className={`chat-message ${message.senderId === currentUser._id ? 'own-message' : ''}`}
            >
              <div className="message-sender">{message.senderName}</div>
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        ) : (
          <div className="no-messages">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={!isConnected}
        />
        <button type="submit" disabled={!isConnected || !newMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;