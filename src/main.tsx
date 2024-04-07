import ReactDOM from 'react-dom/client';
// Import App Routes
import AppRouter from '@routes/AppRouter';
// Redux
import { Provider } from 'react-redux';
import store from '@store/index';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
