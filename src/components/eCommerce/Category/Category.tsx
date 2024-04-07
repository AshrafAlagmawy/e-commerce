import { TCategory } from '@customTypes/category';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ title, prefix, img }: TCategory) => {
  return (
    <div className={category}>
      <Link to={prefix}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
