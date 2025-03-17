import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';  // ✅ Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // ✅ Import Toastify styles
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskPage from './pages/TaskPage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { toggleTheme } from './features/theme/themeSlice';

function App() {
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className={`${mode === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <Router>
        <Navbar onThemeToggle={() => dispatch(toggleTheme())} isDarkMode={mode === 'dark'} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/tasks" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={user ? <TaskPage /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;
