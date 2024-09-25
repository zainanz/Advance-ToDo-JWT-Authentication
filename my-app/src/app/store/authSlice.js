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



export const checkUser = createAsyncThunk("auth/checkUser", async (_, {dispatch}) => {
  const token = Cookies.get('token');
  if (token.length < 1) throw new Error("Invalid User Session")
  const response = await fetch(`https://jwt-todo-7c942bb57d7b.herokuapp.com/verify/user`, {
    method: "POST",
    credentials: 'include',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    }
  });

  const data = await response.json();
  console.log(data)
  console.log(response)
  if(response.ok){
    const userData = JSON.parse(data.message);
    dispatch(setUser(userData))
  } else {
    throw new Error(data.error);
  }
})


const successLogin = (state, action) => {

  Cookies.set('token', action.payload.token, {
    expires: 1,
    secure: true,
    sameSite: 'None',
  });

  console.log(state, action)
  state.user = JSON.parse(action.payload.user);
  state.error = null;
  state.isLoggedIn = true;
  state.token = action.payload.token;
  console.log("Login successful", action.payload);
}

const handleAuthError = (state, action) => {
  if (!(action.error.message === "token is undefined")){

    state.error = action.error.message || 'An error occurred';
  }
  state.user = {};
  state.isLoggedIn = false;
  state.token = null;
  Cookies.remove('token');

};


export const signup = createAsyncThunk('auth/signup', async (userData) => {
  console.log(userData)
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
  console.log(userData)
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
