import axios from 'axios';
import { useState } from 'react';

type TStatus = 'idle' | 'checking' | 'available' | 'notAvailable' | 'failed';

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>('idle');

  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus('checking');

    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvailabilityStatus('available');
      } else {
        setEmailAvailabilityStatus('notAvailable');
      }
    } catch (error) {
      setEmailAvailabilityStatus('failed');
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus('idle');
    setEnteredEmail(null);
  };

  return {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};

export default useCheckEmailAvailability;
