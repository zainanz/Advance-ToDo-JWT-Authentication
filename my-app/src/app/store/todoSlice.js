import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


export const loadtodo = createAsyncThunk( "todo/loadtodo", async (_, {dispatch}) => {
  // request backend for current user's todo list.
  const token =  Cookies.get('token');
  const response = await fetch("http://localhost:3000/gettodo", {
    method: "GET",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    }
  })
  const data = await response.json()
  console.log(data);
  dispatch(setUserTodo(data))
})

const initialState = {
  isRendering: true,
  todos: [

  ]
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUserTodo(state, action){
      console.log("WORK")
      action.payload.todos.forEach(todo => state.todos.push(todo.content))
    }
  },
  extraReducers: {

  }
})

export const { setUserTodo } = todoSlice.actions;
export default todoSlice.reducer;
