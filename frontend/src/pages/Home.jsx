import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Home = () => {
  const { mode } = useSelector((state) => state.theme);

  // Animation variants for the container and its items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      zIndex: -11111,
      height: '100vh', // Full viewport height
      transition: {
        duration: 0.8,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center h-screen px-6 text-center transition-colors duration-300 ${
        mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-5xl font-extrabold mb-6"
        variants={itemVariants}
        style={{
          color: mode === 'dark' ? 'white' : 'black', // Fixed color for title
        }}
      >
        Organize Your Life with TaskFlow
      </motion.h1>
      <motion.p
        className="text-lg mb-8 max-w-md text-gray-600 dark:text-gray-400"
        variants={itemVariants}
      >
        Effortlessly manage your tasks, deadlines, and goals in one intuitive platform.
        Sign up today and experience the flow!
      </motion.p>
      <motion.div className="flex gap-6" variants={itemVariants}>
        <Link
          to="/register"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
        >
          Sign Up for Free
        </Link>
        <Link
          to="/login"
          className="bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-gray-700 transition duration-300"
        >
          Log In
        </Link>
      </motion.div>
      <motion.div
        className="mt-12 text-sm text-gray-500 dark:text-gray-400"
        variants={itemVariants}
      >
        Powered by cutting-edge technology to keep you on track.
      </motion.div>
    </motion.div>
  );
};

export default Home;
