import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actAuthRegister, resetUI } from '@store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signUpType } from '@validations/signUpSchema';
import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability';

const useRegister = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: formErrors },
  } = useForm<signUpType>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  });

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const submitForm: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate('/login?message=account_created');
      });
  };

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger('email');
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState('email');
    if (isDirty && !invalid && enteredEmail !== value) {
      // Checking using - useCheckEmailAvailability Hook
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    register,
    handleSubmit,
    formErrors,
    submitForm,
    loading,
    error,
    accessToken,
    emailAvailabilityStatus,
    emailOnBlurHandler,
  };
};

export default useRegister;
