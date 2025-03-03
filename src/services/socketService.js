import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
let socket = null;

export const initializeSocket = (token) => {
  socket = io(SOCKET_URL, {
    auth: {
      token
    }
  });
  
  return socket;
};

export const initializeChat = (eventId) => {
  if (!socket) {
    const token = localStorage.getItem('token');
    socket = initializeSocket(token);
  }
  
  socket.emit('join_room', { roomId: `event_${eventId}` });
  return socket;
};

export const disconnectChat = (socket) => {
  if (socket) {
    socket.disconnect();
  }
};

export const sendMessage = (messageData) => {
  if (socket) {
    socket.emit('send_message', messageData);
  }
};

export const listenForNotifications = (callback) => {
  if (!socket) {
    const token = localStorage.getItem('token');
    socket = initializeSocket(token);
  }
  
  socket.on('notification', (data) => {
    callback(data);
  });
  
  return socket;
};