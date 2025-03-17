import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ onThemeToggle, isDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          📝 To-Do App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/tasks" className="hover:text-blue-400 transition">Tasks</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-400 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
            </>
          )}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-300" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-3 mt-3 px-6 py-4 bg-gray-800 rounded">
          {user ? (
            <>
              <Link to="/tasks" className="hover:text-blue-400 transition">Tasks</Link>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-400 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
            </>
          )}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-300" />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
