// Remember to replace fetch with axios > DRY CODE

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { addTodo, deleteTodo, loadtodo, markAsCompleted } from "./todoSlice";

const initialState = {
  user:{

  },
  isLoggedIn: false,
  token: null,
  error: null
}


// Fetch Data from backend

// TODO - Use axios (dry code)

export const checkUser = createAsyncThunk("auth/checkUser", async (state, {dispatch}) => {
  const token = Cookies.get('token');
  if (!token) throw new Error("Unauthorized: Please login again")
  const response = await fetch(`https://jwt-todo-7c942bb57d7b.herokuapp.com/verify/user`, {
    method: "POST",
    credentials: 'include',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    }
  });
  const data = await response.json();
  if(response.ok){
    const userData = JSON.parse(data.message);
    console.log()
    dispatch(setUser(userData))
  } else {
    throw new Error(data.error);
  }
})


export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await fetch("https://jwt-todo-7c942bb57d7b.herokuapp.com/signup", {
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

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await fetch("https://jwt-todo-7c942bb57d7b.herokuapp.com/login", {
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
  return data;
});


// Support Function

const successLogin = (state, action) => {

  Cookies.set('token', action.payload.token, {
    expires: 1,
    secure: true,
    sameSite: 'None',
  });

  state.user = JSON.parse(action.payload.user);
  state.error = null;
  state.isLoggedIn = true;
  state.token = action.payload.token;
}

const handleAuthError = (state, action) => {
  if (!(action.type === "auth/checkUser/rejected")){
    state.error = action.error.message
  }
  state.user = {};
  state.isLoggedIn = false;
  state.token = null;
  Cookies.remove('token');

};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state){
      state.user = {}
      state.isLoggedIn = false
      state.token = null
      state.error = ""
      Cookies.remove('token');
    },
    setUser(state, action){
      state.isLoggedIn = true;
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadtodo.rejected, handleAuthError)
      .addCase(addTodo.rejected, handleAuthError)
      .addCase(deleteTodo.rejected, handleAuthError)
      .addCase(markAsCompleted.rejected, handleAuthError)
      .addCase(checkUser.rejected, handleAuthError)
      .addCase(login.fulfilled, successLogin)
      .addCase(signup.fulfilled, successLogin)
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
  },
);

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
