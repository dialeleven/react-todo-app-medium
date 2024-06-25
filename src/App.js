/*
https://medium.com/@worachote/building-a-todo-list-app-with-reactjs-a-step-by-step-guide-2c58b9b6c0f5
*/
import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="app-header">TODO LIST</h1>
      <TodoList />
    </div>
  );
}

export default App;
