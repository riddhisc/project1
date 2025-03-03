import { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';

export const useEvents = () => {
  return useContext(EventContext);
};