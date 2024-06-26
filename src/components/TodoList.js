import React, { useState } from "react";
import TodoItem from './TodoItem';
import TodoAddItemModal from './TodoAddItemModal';

function TodoList() {
   /*
   useState is a React hook that allows us to manage state in a functional component.

   The hook takes an initial state as an argument. For example:
      const [count, setCount] = useState(0);

   In this case the hook's initial state is set to an array of task objects, each with
   an `id`, `text`, and `completed` property.      

   It returns an array with two elements: the current state and a function to update it.
      The current state (tasks) is stored in the first element of the array.
      The function to update the state (setTasks) is stored in the second element of the array.
   */
   const [tasks, setTasks] = useState([
      {
         id: 1,
         text: "Edit item  - watch out for long text lines that wrap)",
         duedate: "2099-01-01 12:00",
         completed: true
      },
      {
         id: 2,
         text: "Adjust date/time format on add action",
         completed: false
      },
      {
         id: 3,
         text: "Edit date/time",
         completed: false
      },
      {
         id: 4,
         text: "Reorder with drag and drop",
         duedate: "2099-01-01 12:00",
         completed: false
      },
      {
         id: 5,
         text: "Store todo list in local storage",
         completed: false
      }
   ]);

   // State variable  'text' is used to store the current value of the input field
   const [text, setText] = useState('');

   // State variable 'filter' is used to store the current value of the task filter menu (default is 'All')
   const [filter, setFilter] = useState('All');

   // state variable for "add todo" modal window
   const [showModal, setShowModal] = useState(false);
   const [dateTime, setDateTime] = useState('');


   // Helper function (addTask) - creates a new task object with a unique `id`, `text`, and `completed` property.
   // The new task object is added to the `tasks` array using the `setTasks` function.
   // Resets the `text` state to an empty string.  
   function addTask({ text, dateTime }) {
      // if text is not empty, create a new task object
      if (text !== '') {
         const newTask = {
            id: Date.now(),
            text,
            duedate: dateTime,
            completed: false
         };
         setTasks([...tasks, newTask]);
         // setText(''); ? used with older "add todo" text input and button combo below the todo list
      }
      else {
         // alert('Please enter some text');
      }
   }

   /*
   Helper function (deleteTask) - deletes a task by `id` from the `tasks` array using the `setTasks` function.
   The `tasks` array is filtered to remove the task with the matching `id` being marked for deletion.
   When deleting a task, we return a list that EXCLUDES the task we want to delete.
   The `tasks` array uses an arrow function.
   */
   function deleteTask(id) {
      setTasks(tasks.filter(task => task.id !== id));

      // ? the above is equivalent to the following which uses the older function() callback syntax:
      /*
      setTasks(tasks.filter(function(task) {
          return task.id !== id;
      }));
      */
   }

   // Helper function (toggleCompleted) - toggles the `completed` property of a task by `id` using the `setTasks` function.
   function toggleCompleted(id) {
      setTasks(
         tasks.map(task => {
            if (task.id === id) {
               return { ...task, completed: !task.completed };
            } else {
               return task;
            }
         })
      );
   }

   // Helper function (updateTask) - updates the `text` property of a task by `id` using the `setTasks` function.
   function updateTask(id, newText) {
      setTasks(
         tasks.map(task => {
            if (task.id === id) {
               return { ...task, text: newText };
            } else {
               return task;
            }
         })
      );
   }

   // Helper function - updates the `filter` state variable with the current value of the filter todo select menu
   function handleFilterChange(event) {
      // alert(event.target.value);
      setFilter(event.target.value);
   }

   // helper function - returns filtered tasks based on the current value of the filter todo select menu
   function getFilteredTasks(event) {
      switch (filter) {
         case 'tasks-checked':
           return tasks.filter(task => task.completed);
         case 'tasks-unchecked':
           return tasks.filter(task => !task.completed);
         default:
           return tasks;
       }
   }

   const handleClose = () => {
      setShowModal(false);
      setText('');
      setDateTime('');
   };

   return (
      <div className="container">
         <div className="header">
            <button className="top-add-todo-button" onClick={() => setShowModal(true)}>Add Todo</button>
            <div className="filter-container">
               <select className="filter-select" onChange={handleFilterChange}>
                  <option value="tasks-all">All</option>
                  <option value="tasks-checked">Checked</option>
                  <option value="tasks-unchecked">Unchecked</option>
               </select>
            </div>
         </div>
         
         <div className="todo-list">
            {getFilteredTasks().map(task => (
                  <TodoItem
                     key={task.id}
                     task={task}
                     deleteTask={deleteTask}
                     toggleCompleted={toggleCompleted}
                     updateTask={updateTask}
                  />
            ))}
            {/* original output of tasks array with no filtering
            {tasks.map(task => (
               <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                  updateTask={updateTask}
               />
            ))} */}
            {/*
            // original "add todo" text input and button combo
            <input type="text" value={text} className="add-task-input" onChange={e => setText(e.target.value)} />
            <button className="bottom-add-todo-button" onClick={() => addTask(text)}>Add Todo</button>
            */}
            <button className="add-todo-button-footer" onClick={() => setShowModal(true)}>Add Todo</button>
         </div>

         <TodoAddItemModal
            showModal={showModal}
            handleClose={handleClose}
            addTask={addTask}
         />
      </div>
   );
}

export default TodoList;