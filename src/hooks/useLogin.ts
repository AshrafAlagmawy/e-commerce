import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actAuthLogin, resetUI } from '@store/auth/authSlice';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signInType } from '@validations/signInSchema';

const useLogin = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    if (searchParams.get('message')) {
      setSearchParams('/');
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate('/'));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    error,
    loading,
    register,
    handleSubmit,
    submitForm,
    accessToken,
    formErrors,
    searchParams,
  };
};

export default useLogin;
