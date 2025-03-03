export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:${minutes} ${ampm}`;
};

export const formatParticipants = (count, capacity) => {
  if (capacity) {
    return `${count}/${capacity}`;
  }
  return count.toString();
};

export const formatRSVPStatus = (status) => {
  switch (status) {
    case 'attending':
      return 'Going';
    case 'maybe':
      return 'Maybe';
    case 'declined':
      return 'Not Going';
    default:
      return 'Not Responded';
  }
};
