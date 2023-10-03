import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from "./component/pages/todolist";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <Todolist/>
      <ToastContainer />

    </div>
  );
}

export default App;
