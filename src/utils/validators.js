export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateEventForm = (eventData) => {
  const errors = {};
  
  if (!eventData.name) {
    errors.name = 'Event name is required';
  }
  
  if (!eventData.date) {
    errors.date = 'Date is required';
  }
  
  if (!eventData.startTime) {
    errors.startTime = 'Start time is required';
  }
  
  if (!eventData.endTime) {
    errors.endTime = 'End time is required';
  } else if (eventData.startTime && eventData.endTime <= eventData.startTime) {
    errors.endTime = 'End time must be after start time';
  }
  
  if (!eventData.location) {
    errors.location = 'Location is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};