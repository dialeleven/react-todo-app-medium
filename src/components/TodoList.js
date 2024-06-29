import React, { useState, createContext } from "react";
import TodoItem from './TodoItem';
import TodoAddItemModal from './TodoAddItemModal';
import TodoHero from "./TodoHero";

const TodoListContext = createContext();

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
   const [tasks, setTasks] = useState([]);

   const [defaultTasks, ] = useState([
      {
         id: 1,
         text: "Edit item  - watch out for long text lines that wrap)",
         duedate: "2099-01-01 12:00",
         completed: true
      },
      {
         id: 2,
         text: "Reorder with drag and drop",
         duedate: "2024-12-31 09:00",
         completed: false
      },
      {
         id: 4,
         text: "Store todo list in local storage",
         completed: true
      }
   ]);
   

   // State variable 'filter' is used to store the current value of the task filter menu (default is 'All')
   const [filter, setFilter] = useState('All');

   /*
   useState accepts an initial state and returns two values:
   1. The current state (showModal)
   2. A function that updates the state (setShowModal).

   State variable (showModal) for "add todo" modal window is set to false to hide the modal by default
   when the <TodoAddItemModal /> component is initially rendered from TodoAddItemModal.js.

   The second parameter (setShowModal) is the function used to update the value of 'showModal' which
   will show/hide the modal component.
   */
   const [showModal, setShowModal] = useState(false);

   // State var to adjust modal window heading (e.g. "Add Todo" or "Edit Todo") - default "Add"
   const [addEditMode, setAddEditMode] = useState('Add');

   // State var to store current task id being edited when a user clicks the edit button
   const [currentTaskId, setCurrentTaskId] = useState(null);

   const completedTasks = tasks.filter(task => task.completed).length;
   const totalTasks = tasks.length;


   // Retrieve tasks from localStorage when the component mounts
   React.useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
         setTasks(JSON.parse(storedTasks));
      }
   }, []);


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

         // update `tasks` state with new task
         setTasks([...tasks, newTask]);
         
         // store updated tasks in local storage converting the tasks array of objects to a JSON string
         const updatedTasksList = JSON.stringify([...tasks, newTask]);
         localStorage.setItem('tasks', updatedTasksList);
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

      // update localStorage after deleting item (convert tasks array to JSON string)
      const updatedTasksList = JSON.stringify(tasks.filter(task => task.id !== id));
      localStorage.setItem('tasks', updatedTasksList);
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

      // update localStorage after marking item completed
      const updatedTasksList = JSON.stringify(tasks);
      localStorage.setItem('tasks', updatedTasksList);
   }

   // Helper function (updateTask) - updates the `text` property of a task by `id` using the `setTasks` function.
   function updateTask(id, newText, formattedDateTime) {
      setTasks(
         tasks.map(task => {
            if (task.id === id) {
               return { ...task, text: newText, duedate: formattedDateTime };
            } else {
               return task;
            }
         })
      );

      // update localStorage after updating item
      const updatedTasksList = JSON.stringify(tasks);
      localStorage.setItem('tasks', updatedTasksList);
   }

   // Helper function - updates the `filter` state variable with the current value of the filter todo select menu
   function handleFilterChange(event) {
      console.log(event.target.value);
      setFilter(event.target.value);
   }

   // helper function - returns filtered tasks based on the current value of the filter todo select menu
   function getFilteredTasks() {
      //console.log(event);

      switch (filter) {
         case 'tasks-checked':
            return tasks.filter(task => task.completed);

         case 'tasks-unchecked':
            return tasks.filter(task => !task.completed);

         default:
            return tasks;
       }
   }

   /*
   const handleCloseOld = () => {
      setShowModal(false);
      setText('');
      setDateTime('');
   };
   */

   // handle closing modal window
   function handleClose() {
      setShowModal(false);
      //setText('');
      //setDateTime('');
      setAddEditMode('Add'); // reset label to 'Add' for modal window
      setCurrentTaskId(null); // Reset current task ID
   }

   // show modal window
   function handleShow() {
      setShowModal(true);
   }


   // display the edit todo modal window passing the current task selected for editing
   function editItemModal(task_id) {
      // alert(task_id);
      setAddEditMode('Edit'); // set add/edit label to 'Edit' for modal window
      setCurrentTaskId(task_id); // Reset current task ID
      setShowModal(true);
   }

   function loadDefaultTasks(defaultTasks) {
      setTasks(defaultTasks);

      // store updated tasks in local storage converting the tasks array of objects to a JSON string
      const updatedTasksList = JSON.stringify(defaultTasks);
      localStorage.setItem('tasks', updatedTasksList);
   }

   return (
      <TodoListContext.Provider value={ tasks }>
      <div className="container">
         <div className="header">
            <button className="top-add-todo-button" onClick={handleShow}>Add Todo</button>
            <TodoHero completedTasks={completedTasks} totalTasks={totalTasks} />
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
                     editItemModal={editItemModal}
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
            <div className="footerButtonContainer">
               <div className="footerButtonContainerLeft">
                  <button className="add-todo-button-footer" onClick={() => setShowModal(true)}>Add Todo</button>
               </div>
               <div className="footerButtonContainerRight">
                  <button className="load-default-todos-button" onClick={() => loadDefaultTasks(defaultTasks)}>Load Default Tasks (Reset LocalStorage)</button>
               </div>
            </div>
         </div>

         {/* 
         The <TodoAddItemModal> component is being used in the TodoList component. Here's an explanation of the props being passed to <TodoAddItemModal>:

         1. showModal: This prop is passing the showModal state variable to the [TodoAddItemModal] (/src/components/TodoAddItemModal.js component. It allows the modal window to know whether it should be displayed or not based on the value of showModal.

         2. handleClose: This prop is passing the handleClose function to the [TodoAddItemModal] (/src/components/TodoAddItemModal.js) component. It enables the modal window to call the handleClose function when needed, typically to close the modal window.

         3. addTask: This prop is passing the [addTask] (\src\components\TodoList.js) function to the [TodoAddItemModal] (/src/components/TodoAddItemModal.js) component. It allows the modal window to call the [addTask] (\src\components\TodoList.js) function when a new task needs to be added based on user input within the modal.
         */}
         <TodoAddItemModal
            showModal={showModal}
            handleClose={handleClose}
            addTask={addTask}
            updateTask={updateTask}
            addEditMode={addEditMode}
            currentTaskId={currentTaskId}
         />
      </div>
      </TodoListContext.Provider>
   );
}

export default TodoList;
export { TodoListContext };