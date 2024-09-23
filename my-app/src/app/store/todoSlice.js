import { createSlice, createAsyncThunk, createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


export const loadtodo = createAsyncThunk( "todo/loadtodo", async (_, {dispatch}) => {
  const token =  Cookies.get('token');
  const response = await fetch("http://localhost:3000/gettodo", {
    method: "GET",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    }
  })
  const data = await response.json()
  if(response.ok) {
    dispatch(setUserTodo(data))
    return
  } else {
    throw new Error("Unauthorized: Please login again.");
  }
})


export const markAsCompleted = createAsyncThunk("todo/markAsCompleted", async (id, {dispatch}) => {
const token =  Cookies.get('token');

  const response = await fetch(`http://localhost:3000/markascompleted/${id}`, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    }
  });
  if(response.ok) {
    return id
  } else {
    throw new Error("Unauthorized: Please login again.");
  }
})


export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id, {dispatch}) => {
  const token =  Cookies.get('token');

    const response = await fetch(`http://localhost:3000/deletetodo/${id}`, {
      method: "delete",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      }
    });
    if(response.ok) {
      return id
    } else {
      throw new Error("Unauthorized: Please login again.");
    }
  })


export const addTodo = createAsyncThunk("todo/addTodo", async (content, {dispatch}) => {
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
  if (!response.ok) {
    throw new Error(data.error)
  }
  return data
})


const initialState = {
  todos: [

  ]
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUserTodo(state, action){
      let temp_todos = []
      action.payload.todos.forEach(todo => temp_todos.push(todo))
      state.todos = temp_todos
    },
    addTodo(state, action){
      state.todos.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        todoSlice.caseReducers.addTodo(state, { payload: action.payload });
      })
      .addCase(markAsCompleted.fulfilled, (state, action) => {
        console.log(state)
        const t = state.todos.find(todo => todo.id === action.payload)
        t.completed = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        console.log(state)
        const t = state.todos.find(todo => todo.id === action.payload)
        t.completed = true;
        state.todos = state.todos.filter(todo => todo !== t)
      })
  }
})

export const { setUserTodo } = todoSlice.actions;
export default todoSlice.reducer;
