// src/App.jsx
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { store } from './store';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskPage from './pages/TaskPage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
  
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/tasks" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={user ? <TaskPage /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  
  );
}

export default App;
