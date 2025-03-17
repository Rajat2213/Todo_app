import axios from "axios";
import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTask,
  updateTask,
  deleteTask as deleteTaskAction,
} from "./taskSlice";

const API_URL = "http://localhost:5000/api/tasks";

// Fetch tasks
export const fetchTasks = () => async (dispatch, getState) => {
  const { tasks } = getState().tasks;

  // Prevent redundant API calls if tasks are already loaded
  if (tasks.length > 0) return;

  dispatch(fetchTasksStart());
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    // Ensure the response data is an array
    dispatch(fetchTasksSuccess(Array.isArray(response.data.tasks) ? response.data.tasks : []));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    dispatch(fetchTasksFailure(error.response?.data?.message || "Failed to fetch tasks"));
  }
};

// Create a new task
export const createTask = (taskData) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, taskData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    // Dispatch the nested `task` object from the response
    dispatch(addTask(response.data));
    return response.data; // Return the created task for further use
  } catch (error) {
    console.error("Failed to create task:", error);
    throw new Error(error.response?.data?.message || "Failed to create task");
  }
};

// Update a task (e.g., mark as completed)
export const updateTaskStatus = (task) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${task.id}`, task, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log("updateTaskStatus API Response:", response.data); // Add this line
    dispatch(updateTask(response.data));
  } catch (error) {
    console.error("Failed to update task:", error);
    throw new Error(error.response?.data?.message || "Failed to update task");
  }
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`, { withCredentials: true });
    dispatch(deleteTaskAction(taskId));
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};