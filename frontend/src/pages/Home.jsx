import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { mode } = useSelector((state) => state.theme); // Get theme mode

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 text-center transition-colors duration-300 ${
        mode === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-white text-gray-900'
      }`}
    >
      <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">Welcome to To-Do App</h1>
      <p className="text-lg mb-6 max-w-md">
        Organize your tasks efficiently and boost productivity. Sign up now to get started!
      </p>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
