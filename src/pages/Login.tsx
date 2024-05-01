import useLogin from '@hooks/useLogin';
import { Navigate } from 'react-router-dom';
import { Heading } from '@components/common';
import { Input } from '@components/forms';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const {
    error,
    loading,
    register,
    handleSubmit,
    submitForm,
    accessToken,
    searchParams,
    formErrors,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get('message') === 'login_required' && (
            <Alert variant="warning">
              Your need to login to view this content
            </Alert>
          )}

          {searchParams.get('message') === 'account_created' && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              label="Email Address"
              register={register}
              error={formErrors.email?.message}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={formErrors.password?.message}
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
