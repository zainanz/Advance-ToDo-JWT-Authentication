import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import {store} from './app/store/store.js'


// personal
import App from './App';
import Form from './components/form/form';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Todo from "./components/todo/todo.js"


const container = document.getElementById('root');
const root = createRoot(container);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Form />} />
      <Route path="todos" element={<Todo/>} />
    </Route>
  )
);



root.render( // Dont forgoet to uncomment StrictMode for production
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
  // </React.StrictMode>
);


reportWebVitals();
