import React, { useState, createContext } from "react";
import TodoItem from './TodoItem';
import TodoAddItemModal from './TodoAddItemModal';
import TodoHero from "./TodoHero";

import {
   DndContext,
   closestCenter,
 } from '@dnd-kit/core';
 import {
   arrayMove,
   SortableContext,
   // sortableKeyboardCoordinates,
   // useSortable,
   verticalListSortingStrategy,
 } from '@dnd-kit/sortable';
 //import { CSS } from '@dnd-kit/utilities';
 import { restrictToVerticalAxis } from '@dnd-kit/modifiers';


// Create context for the tasks to be used in child components
const TodoListContext = createContext();


/**
 * A React component that manages a todo list.
 */
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

   // set default tasks
   const [defaultTasks] = useState([
      {
         id: 1,
         text: "Edit item  - watch out for long text lines that wrap",
         duedate: "2099-01-01 12:00",
         completed: true,
         position: 1
      },
      {
         id: 2,
         text: "Reorder with drag and drop",
         duedate: "2024-12-31 09:00",
         completed: false,
         position: 2
      },
      {
         id: 3,
         text: "Redux state management(?)",
         duedate: "",
         completed: false,
         position: 3
      },
      {
         id: 4,
         text: "Store todo list in local storage",
         completed: true,
         position: 4
      }
   ]);


   // handle dnd kit drag end event when reordering and update the task positions
   const handleDragEnd = (event) => {
      const { active, over } = event;
   
      // Check if 'over' is not null before proceeding
      if (over && active.id !== over.id) {
         setTasks((tasks) => {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);

            // Move the task within the array
            const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);

            // Update the position based on the new index
            const updatedTasks = reorderedTasks.map((task, index) => ({
               ...task,
               position: index + 1,
            }));

            // Update localStorage with the new positions
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            return updatedTasks;
         });
      }
   };

/* eslint-disable no-unused-vars */
   const handleDragEndORIGINAL = (event) => {
      const { active, over } = event;
   
      // Check if 'over' is not null before proceeding
      if (over && active.id !== over.id) {
         setTasks((tasks) => {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);

            console.table('tasks after:', tasks);
   
            return arrayMove(tasks, oldIndex, newIndex);
         });
      }
   };
/* eslint-enable no-unused-vars */

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


   /*
   Retrieve tasks from localStorage when the component mounts passing the 
   defaultTasks array as a dependency to control when the effect runs.
   
   The effect runs when the defaultTasks array changes. Since the defaultTasks
   array shouldn't change, it's passed to avoid running the effect on every render
   when no dependency array is passed. An empty array could be used to run the effect
   once after the initial render though ESLint doesn't like that, so it's to satisfy 
   ESLint when we run `npm run build`.
   */
   React.useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
         setTasks(JSON.parse(storedTasks));
      }
      else {
         setTasks(defaultTasks);
      }
   }, [defaultTasks]);


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
            completed: false,
            // get highest position + 1
            position: tasks.reduce((maxPos, task) => (task.position > maxPos ? task.position : maxPos), 0) + 1
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


/* eslint-disable no-unused-vars */

   // Helper function (toggleCompleted) - toggles the `completed` property of a task by `id` using the `setTasks` function.
   function toggleCompletedOld(id)
   {
      // This works without using LocalStorage, but when we toggle an item, 
      // the tasks array isn't updated using setTasks() due to looping through
      // the array
      setTasks(
         tasks.map(task => {
            if (task.id === id) {
               return { ...task, completed: !task.completed };
            } else {
               return task;
            }
         })
      );

      // When viewing the tasks array in the console, we can see the toggled task value
      // is not updated in the array with the correct value. If we click the toggle again
      // the completed property does change, but not the correct value again.
      console.log('tasks array in toggleCompletedOld', tasks);

      // trying to update localStorage after marking item completed which will not work
      const updatedTasksList = JSON.stringify(tasks);
      localStorage.setItem('tasks', updatedTasksList);
   }


   // Helper function (toggleCompleted) - toggles the `completed` property of a task by `id` using the `setTasks` function.
   function toggleCompleted(id)
   {
      // tasks.map() returns the tasks array with a task with an updated completed property
      // so we will save the mapped array to a new array with the correct/current`completed` property 
      const updatedTasksArray = tasks.map(task => {
         if (task.id === id) {
            return { ...task, completed: !task.completed };
         } else {
            return task;
         }
      });
      
      // console.log('tasks array value (BAD completed):', tasks );
      // console.log('updated tasks array after array map (GOOD completed?):', updatedTasksArray );

      setTasks(updatedTasksArray);

      // update localStorage after marking item completed
      const completedTasksList = JSON.stringify(updatedTasksArray);
      localStorage.setItem('tasks', completedTasksList);
   }
   
   function arrowAndAnonFunctionExamples() {
      /*
      Some arrow and anonymous function examples
      */

      /*
      First a simple callback function (hello) with a parameter (val)
         - Function name: 'hello'
         - Parameter: (val)
      */
      const hello = (val) => "Hello " + val;
      console.log( hello('[WORLD]') );

      // Arrow function with no parameters
      //    Function name: 'hello2'
      //    Parameters: none
      const hello2 = () => {
         return "Hello World from hello2!";
      }

      console.log(hello2());

      // arrow function with 2 parameters
      const multiply = (a, b) => {
         return a * b;
      }

      console.log('multiply(5, 10): ', multiply(5, 10));


      // arrow function with no parameters, we define a variable named 'greet'
      var greet = () =>  
      { 
         console.log("An anonymous arrow function named 'greet' with no parameters"); 
      }

      // call the function using the variable name 'greet'
      greet(); 

      //  arrow function with a parameter
      var greet2 = (name) =>  
      { 
         console.log("An anonymous arrow function named 'greet' with a parameter named 'name'. Hi, " + name); 
      }

      greet2('Sally'); 

      // simple anonymous function which is invoked (called) using the variable name
      const x = function (a, b) {return a * b};
      console.log( x(2, 10) );

      /*
      A self-executing anonymous function (without the name itself) and will see how we may declare it as well as how we may call it in order to print the resultant value (ref: https://www.geeksforgeeks.org/javascript-anonymous-functions/).
      */
      (() => { 
         console.log("a self-executing anonymous function"); 
      })();

      /*
      Now with the above example in mind, now...

      * We're going to use an anonymous function in setTasks() like toggleCompletedAnonFunc() for
      * some of the more tricky cases like ones that use the map() function.

      We don't need all the extra parentheses like above. What we do need is:

      () => {
         // your code here

         return yourReturnValue;
      }

      For our purposes, we will use the anonymous function like above in setTasks() in the
      function toggleCompletedAnonFunc().

      setTasks(
         () => {
            // your code here
            return yourReturnValue;
         }
      );
      */
   }

/* eslint-enable no-unused-vars */
   function toggleCompletedAnonFunc(id) {
      /*
      Arrow/anonymous functions can be a bit confusing for people who aren't familiar with ES6.
      */

      // update `tasks` state using the `setTasks` function
      setTasks(
         // anonymous function in order to `return` the `updatedTasksArray` within the setTasks() function
         () => {
            // store the most recent tasks array after calling the map() function otherwise
            // we get a stale value for the completed property being toggled
            const updatedTasksArray = tasks.map(task => {
               if (task.id === id) {
                  return { ...task, completed: !task.completed };
               } else {
                  return task;
               }
            });

            // update localStorage after marking item completed
            const completedTasksList = JSON.stringify(updatedTasksArray);
            localStorage.setItem('tasks', completedTasksList);

            return updatedTasksArray;
      });
   }

/* eslint-disable no-unused-vars */

   function toggleCompletedAnonFuncOld(id) {
      /*
      Update the `tasks` array using the `setTasks` function.
      
      1. State Snapshot (prevTasks): prevTasks contains the current tasks array when setTasks is called.

      2. Updating Tasks: Using map, you create updatedTasks, modifying the 
         task with the specified id to toggle its completed status.
      
      3. Local Storage Update: Convert updatedTasks to a JSON string (updatedTasksList) and store it in localStorage.

      4. Returning Updated State: Finally, updatedTasks is returned from the function, setting it as the new state for tasks.
      */
      // ? arrow function version using an anonymous function
      setTasks(
         // `prevTasks` is the parameter of an anonymous function (arrow function) passed to `setTasks`
         (prevTasks) => {
            // Assign updated tasks (updatedTasks) from the current state of tasks (prevTasks)
            // that uses the `map` function to iterate through each task in the `tasks` array
            // and mark the current task as completed if the id matches the id toggled.
            const updatedTasks = prevTasks.map(task => {
            if (task.id === id) {
               return { ...task, completed: !task.completed };
            } else {
               return task;
            }
         });

         //console.log('updatedTasks: ', updatedTasks);

         // update localStorage after marking item completed
         const completedTasksList = JSON.stringify(updatedTasks);
         localStorage.setItem('tasks', completedTasksList);

         /*
         // debugging output
         const storedTasks = localStorage.getItem('tasks');
         if (storedTasks) {
            console.log(JSON.parse(storedTasks));
         }
         */

         // Return the updated tasks array to set it as the new state
         return updatedTasks;
      });
   }
/* eslint-enable no-unused-vars */


   // Helper function (updateTask) - updates the `text` property of a task by `id` using the `setTasks` function.
   function updateTask(id, newText, formattedDateTime) {
      // tasks.map() returns the tasks array with a task with an updated completed property
      // so we will save the mapped array to a new array with the correct/current`completed` property 
      const updatedTasksArray = tasks.map(task => {
         if (task.id === id) {
            return { ...task, text: newText, duedate: formattedDateTime };
         } else {
            return task;
         }
      });
      
      // console.log('tasks array value (BAD completed):', tasks );
      // console.log('updated tasks array after array map (GOOD completed?):', updatedTasksArray );

      setTasks(updatedTasksArray);

      // update localStorage after marking item completed
      const completedTasksList = JSON.stringify(updatedTasksArray);
      localStorage.setItem('tasks', completedTasksList);
      
      /*
      // another instance like toggleCompleted() where using the map() function inside of setTasks()
      // doesn't pass the current state of tasks to the setTasks() function
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
      */
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
      if (window.confirm(`Overwrite the current tasks saved in Local Storage and load app default tasks?`))
      {
         setTasks(defaultTasks);

         // store updated tasks in local storage converting the tasks array of objects to a JSON string
         const updatedTasksList = JSON.stringify(defaultTasks);
         localStorage.setItem('tasks', updatedTasksList);
      }
   }

   return (
      <TodoListContext.Provider value={ tasks }>
      <DndContext
         collisionDetection={closestCenter}
         onDragEnd={handleDragEnd}
         modifiers={[restrictToVerticalAxis]}
         >
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
         <SortableContext
            items={tasks}
            strategy={verticalListSortingStrategy}
            >
            {getFilteredTasks().map(task => (
                  <TodoItem
                     key={task.id}
                     task={task}
                     deleteTask={deleteTask}
                     toggleCompleted={toggleCompletedAnonFunc}
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
            </SortableContext>
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
      </DndContext>
      </TodoListContext.Provider>
   );
}

export default TodoList;
export { TodoListContext };