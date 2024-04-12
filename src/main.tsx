import ReactDOM from 'react-dom/client';
// Import App Routes
import AppRouter from '@routes/AppRouter';
// Redux
import { Provider } from 'react-redux';
import { store, persistor } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
// AXIOS
import './services/axios-global.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
