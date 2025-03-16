import axios from 'axios';
import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTask,
  updateTask,
  deleteTask,
} from './taskSlice';

const API_URL = 'http://localhost:5000/api/tasks';

// Fetch tasks
export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksStart());
  try {
    const response = await axios.get(API_URL);
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksFailure(error.message));
  }
};

// Add task
export const createTask = (taskData) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, taskData);
    dispatch(addTask(response.data));
  } catch (error) {
    console.error('Failed to create task:', error);
  }
};