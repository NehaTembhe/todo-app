import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Retrieve login status from localStorage
  username: localStorage.getItem('username') || '', // Retrieve username from localStorage
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload;
      // Save login status and username to localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = '';
      // Remove user data from localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
