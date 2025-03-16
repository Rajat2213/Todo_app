import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Home;