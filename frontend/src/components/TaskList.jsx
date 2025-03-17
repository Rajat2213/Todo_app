import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  updateTaskStatus,
} from "../features/tasks/taskService";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

Modal.setAppElement("#root");

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector(
    (state) => state.tasks || { tasks: [] }
  );
  const { user } = useSelector((state) => state.auth);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks()).catch(() => {
      toast.error("Failed to fetch tasks ❌");
    });
  }, [dispatch]);

  const handleDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      toast.success("Task deleted successfully ✅");
      dispatch(fetchTasks());
    } catch (error) {
      toast.error(`Failed to delete task ❌: ${error.message || error}`);
    }
  };

  const handleComplete = async (task) => {
    try {
      const updatedTask = { 
        id: task.id, 
        completed: !task.completed, 
        title: task.title, // Optional, in case other fields need to be updated
        description: task.description 
      };
      
      const response = await dispatch(updateTaskStatus(updatedTask));
      
      // Check if the task was updated successfully
      if (response) {
        toast.success(
          `Task marked as ${updatedTask.completed ? "completed ✅" : "incomplete ⏳"}`
        );
      }
    } catch (error) {
      toast.error(`Failed to update task ❌: ${error.message || error}`);
    }
  };
  

  const openUpdateModal = (task) => {
    setCurrentTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setModalIsOpen(false);
    setCurrentTask(null);
    setUpdatedTitle("");
    setUpdatedDescription("");
  };

  const handleUpdateSubmit = async () => {
    try {
      const updatedTask = {
        id: currentTask.id,
        title: updatedTitle,
        description: updatedDescription,
      };
      await dispatch(updateTaskStatus(updatedTask)); // Call to update the task in the backend
      toast.success("Task updated successfully ✅");
      closeUpdateModal();
      // No need to refetch here if the reducer is updating correctly
    } catch (error) {
      toast.error("Failed to update task ❌");
    }
  };

  const userTasks = tasks.filter((task) => task.user_id === user?.id);
  const incompleteTasks = userTasks.filter((task) => !task.completed);
  const completedTasks = userTasks.filter((task) => task.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        📋 Your Tasks
      </h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setShowCompleted(false)}
          className={`py-2 px-4 rounded ${
            !showCompleted ? "bg-blue-500 text-black" : "bg-gray-300 text-black"
          }`}
        >
          Incomplete Tasks
        </button>
        <button
          onClick={() => setShowCompleted(true)}
          className={`py-2 px-4 rounded ${
            showCompleted ? "bg-blue-500 text-black" : "bg-gray-300 text-black"
          }`}
        >
          Completed Tasks
        </button>
      </div>
      <div>
        <AnimatePresence>
          {!showCompleted &&
            incompleteTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="p-4 mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <p className="text-gray-700 dark:text-white">
                  {task.description}
                </p>
                <div className="mt-4 flex space-x-4 gap-2 ">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded"
                    onClick={() => openUpdateModal(task)}
                  >
                    ✏️ Update
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded"
                    onClick={() => handleComplete(task)}
                  >
                    ⏳ Mark as Completed
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="bg-red-500  hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                    onClick={() => handleDelete(task.id)}
                  >
                    🗑️ Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        <AnimatePresence>
          {showCompleted &&
            completedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="p-4 mb-2 bg-green-100 dark:bg-green-700 rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {task.title}
                </h3>
                <p className="text-gray-700 dark:text-white">
                  {task.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-gray-500 mt-3 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded"
                  onClick={() => handleComplete(task)}
                >
                  ⏳ Mark as Incomplete
                </motion.button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeUpdateModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "500px",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Update Task</h2>
        {currentTask && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="updatedTitle"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                id="updatedTitle"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="updatedDescription"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description:
              </label>
              <textarea
                id="updatedDescription"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={closeUpdateModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdateSubmit}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default TaskList;
