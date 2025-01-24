import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add a new task with a priority
    addTask: (state, action) => {
      const newTask = {
        ...action.payload, // Ensure that the task contains all data
        priority: action.payload.priority || 'Medium', // Set default priority to 'Medium'
      };
      state.tasks.push(newTask);
    },

    // Delete a task by its id
    deleteTask: (state, action) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        state.tasks.splice(taskIndex, 1);
      }
    },

    // Set tasks (e.g., when fetching tasks from local storage or API)
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    // Update the priority of a task
    updatePriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.priority = priority;
      }
    },
  },
});

export const { addTask, deleteTask, setTasks, updatePriority } = tasksSlice.actions;
export default tasksSlice.reducer;
