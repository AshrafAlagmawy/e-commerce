import { Container } from 'react-bootstrap';

// Components
import { Header, Footer } from '../../components/common';

import styles from './styles.module.css';

const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}></div>
      <Footer />
    </Container>
  );
};

export default MainLayout;
