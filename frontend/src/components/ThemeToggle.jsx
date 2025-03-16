import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;