import React, { useState } from "react";
import TodoItem from './TodoItem';

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
         id: 2,
         text: "Edit item",
         completed: true
      },
      {
         id: 3,
         text: "Reorder with drag and drop",
         completed: false
      },
      {
         id: 4,
         text: "Filtering option (show 'All' tasks, 'Completed' and 'Uncompleted')",
         completed: false
      },
      {
         id: 5,
         text: "Due date/time",
         completed: false
      },
      {
         id: 6,
         text: "Store todo list in local storage",
         completed: false
      }
   ]);

   const [text, setText] = useState('');

   // Helper function (addTask) - creates a new task object with a unique `id`, `text`, and `completed` property.
   // The new task object is added to the `tasks` array using the `setTasks` function.
   // Resets the `text` state to an empty string.  
   function addTask(text) {
      const newTask = {
         id: Date.now(),
         text,
         completed: false
      };
      setTasks([...tasks, newTask]);
      setText('');
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

   return (
      <div className="container">
         <div className="todo-list">
            {tasks.map(task => (
               <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                  updateTask={updateTask}
               />
            ))}
            <div>
               <input type="checkbox" name="confirm-deletes" id="confirm-deletes" value={true} />Confirm deletions?
            </div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <button className="button" onClick={() => addTask(text)}>Add Todo</button>
         </div>
      </div>
   );
}

export default TodoList;