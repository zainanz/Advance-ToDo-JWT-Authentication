import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
  isLoggedIn: false,
  token: null, // Add token to state
  status: 'idle', // Add status for async operations
  error: null
}

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await fetch("http://localhost:3000/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }

  const data = await response.json();
  Cookies.set('token', data.token);
  return data.token; // Return the token to the fulfilled action
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state){
      state.isLoggedIn = false;
      state.token = null; // Clear the token when logging out
      Cookies.remove('token'); // Optionally remove the token from cookies
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log(state);
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action)
        state.isLoggedIn = true;
        state.token = action.payload; // Set the token from the fulfilled action payload
        state.status = 'idle'; // Reset the status
        console.log("Login successful", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
