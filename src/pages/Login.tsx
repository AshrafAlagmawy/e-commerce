import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actAuthLogin, resetUI } from '@store/auth/authSlice';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, signInType } from '@validations/signInSchema';
import { Heading } from '@components/common';
import { Input } from '@components/forms';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { error, loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get('message') === 'account_created' && (
            <Alert variant="success">
              Your Account Successfully Created, Please Login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              label="Email Address"
              register={register}
              error={errors.email?.message}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: 'white' }}>
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

export default Login;
