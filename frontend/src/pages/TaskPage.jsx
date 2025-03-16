// src/pages/TaskPage.jsx
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TaskPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskPage;
