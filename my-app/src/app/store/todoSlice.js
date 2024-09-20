import { createSlice, createAsyncThunk, createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";
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
  dispatch(setUserTodo(data))
})


export const addTodo = createAsyncThunk("", async (content, {dispatch}) => {
  console.log(JSON.stringify(content))
  const token =  Cookies.get('token');
  const response = await fetch("http://localhost:3000/addtodo", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
    body: JSON.stringify({
      todo: content
    })
  })
  const data = await response.json();
  return {response: data, text: content }
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
      action.payload.todos.forEach(todo => state.todos.push(todo.content))
    },
    addTodo(state, action){
      state.todos.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        todoSlice.caseReducers.addTodo(state, { payload: action.payload.text });
        state.todos.push("working")
      })
      .addCase(addTodo.rejected, (state) => {
        state.status = 'pending';
      })

  }
})

export const { setUserTodo } = todoSlice.actions;
export default todoSlice.reducer;
