import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';


const initialState = {
  user:{

  },
  isLoggedIn: false,
  token: null, // Add token to state
  status: 'idle', // Add status for async operations
  error: null
}


export const checkUser = createAsyncThunk('auth/checkUser', (_, {dispatch}) => {
  const token =  Cookies.get('token');
  console.log("inside")
  if (token){
      fetch("http://localhost:3000/verify/user", {
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
      }).then(response => {
        console.log("hello")
        if (response.ok){
          return response.json()
        } else {
          dispatch(logout())
        }
      })
      .then(data => {
        console.log("In the data")
        data = JSON.parse(data.message);
        dispatch(setUser(data));
      })
  }
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  console.log(userData)
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
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state){
      state.isLoggedIn = false;
      state.token = null;
      Cookies.remove('token');
    },
    setUser(state, action){
      state.isLoggedIn = true;
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.status = 'idle';
        console.log("Login successful", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
