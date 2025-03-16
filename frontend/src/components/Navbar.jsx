// src/components/Navbar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info('Logged out successfully.');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className={`p-4 ${mode === 'dark' ? 'bg-gray-800' : 'bg-blue-500'}`}>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme ({mode})
      </button>
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
