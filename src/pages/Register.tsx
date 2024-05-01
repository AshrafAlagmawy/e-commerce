import useRegister from '@hooks/useRegister';
import { Navigate } from 'react-router-dom';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import { Input } from '@components/forms';
import { Heading } from '@components/common';

const Register = () => {
  const {
    register,
    handleSubmit,
    formErrors,
    submitForm,
    loading,
    error,
    accessToken,
    emailAvailabilityStatus,
    emailOnBlurHandler,
  } = useRegister();

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
              error={formErrors.firstName?.message}
              name="firstName"
            />
            <Input
              label="Last Name"
              register={register}
              error={formErrors.lastName?.message}
              name="lastName"
            />
            <Input
              label="Email Address"
              register={register}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
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
              error={formErrors.password?.message}
              name="password"
            />
            <Input
              type="password"
              label="Confirm Password"
              register={register}
              error={formErrors.confirmPassword?.message}
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
