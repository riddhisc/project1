export const formatDateTime = (dateString, timeString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (timeString) {
    const [hours, minutes] = timeString.split(':');
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
  }
  
  return date;
};

export const isUpcoming = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return date > today;
};

export const isPast = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return date < today;
};

export const daysUntil = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const eventDate = new Date(dateString);
  eventDate.setHours(0, 0, 0, 0);
  
  const differenceInTime = eventDate.getTime() - today.getTime();
  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};

export const getMonthName = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return months[date.getMonth()];
};