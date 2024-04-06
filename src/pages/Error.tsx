import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Error = () => {
  return (
    <Container className="notFound">
      <h1>Error 404</h1>
      <p>Page Not Found</p>
      <Link to="/" replace={true}>
        Looks like you've reached to non-existent page.
        <br /> How about going back to safety ?
      </Link>
    </Container>
  );
};

export default Error;
