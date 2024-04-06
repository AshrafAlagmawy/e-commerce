import ReactDOM from 'react-dom/client';
// Import App Routes
import AppRouter from '@routes/AppRouter';
// Bootstrap Styles Link 🔗
import 'bootstrap/dist/css/bootstrap.min.css';
// Global CSS
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<AppRouter />);
