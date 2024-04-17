import styles from './styles.module.css';
const { footerContainer } = styles;

const Footer = () => {
  return (
    <div className={footerContainer}>
      &copy; 2024 Our eCom All Rights Reserved - Developed By{' '}
      <span>Ashraf Alagmawy</span>
    </div>
  );
};

export default Footer;
