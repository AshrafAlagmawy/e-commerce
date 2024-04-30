import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actAuthRegister, resetUI } from '@store/auth/authSlice';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signUpType } from '@validations/signUpSchema';
import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import { Input } from '@components/forms';
import { Heading } from '@components/common';

const Register = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { loading, error, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
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

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              register={register}
              error={errors.firstName?.message}
              name="firstName"
            />
            <Input
              label="Last Name"
              register={register}
              error={errors.lastName?.message}
              name="lastName"
            />
            <Input
              label="Email Address"
              register={register}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === 'notAvailable'
                  ? 'This email is already in use'
                  : emailAvailabilityStatus === 'failed'
                  ? 'Error from the server'
                  : ''
              }
              name="email"
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === 'checking'
                  ? "We're Currently checking the availability of this email address. Please wait a moment ."
                  : ''
              }
              success={
                emailAvailabilityStatus === 'available'
                  ? 'This email is available for use'
                  : ''
              }
              disabled={emailAvailabilityStatus === 'checking' ? true : false}
            />
            <Input
              type="password"
              label="Password"
              register={register}
              error={errors.password?.message}
              name="password"
            />
            <Input
              type="password"
              label="Confirm Password"
              register={register}
              error={errors.confirmPassword?.message}
              name="confirmPassword"
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: 'White' }}
              disabled={
                emailAvailabilityStatus === 'checking'
                  ? true
                  : false || loading === 'pending'
              }
            >
              {loading === 'pending' ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading ...
                </>
              ) : (
                'Submit'
              )}
            </Button>

            {error && (
              <p style={{ color: '#DC3545', marginTop: '10px' }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
