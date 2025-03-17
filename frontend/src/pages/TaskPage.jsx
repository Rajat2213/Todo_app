import { useSelector } from "react-redux";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TaskPage = () => {
  const { mode } = useSelector((state) => state.theme); // Get theme mode

  return (
    <div
      className={`min-h-screen p-4 max-w-2xl mx-auto transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Task Management 📝</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TaskPage;
