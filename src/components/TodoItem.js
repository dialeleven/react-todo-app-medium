import React, { useState } from 'react';

 
/**
 * Renders a single todo item with the ability to edit, delete, and mark as completed.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.task - The todo item to render.
 * @param {Function} props.deleteTask - The function to delete a todo item.
 * @param {Function} props.toggleCompleted - The function to toggle the completion status of a todo item.
 * @param {Function} props.updateTask - The function to update a todo item's text.
 * @return {JSX.Element} The rendered todo item component.
 */
function TodoItem({ task, deleteTask, toggleCompleted, updateTask }) {
   // State variable  'editOn' is used to toggle the edit input field when the edit button is clicked
   const [editOn, setEditOn] = useState(false);

   const [editText, setEditText] = useState(task.text);

   // 
   function handleChange() {
      toggleCompleted(task.id);
   }

   // confirm todo deletion and call deleteTask() if confirmed
   function handleDelete() {
      if (window.confirm(`Delete todo: ${task.text}?`))
         deleteTask(task.id);
   }

   function editItem() {
      // Invert the 'editOn' state using !.
      // If 'editOn' is true, set it to false. If 'editOn' is false, set it to true.
      setEditOn(!editOn);
   }

   function saveEdit(event) {
      console.log(event.target.value);
      setEditText(event.target.value);
   }

   function blur() {
      // update the task's text with the current editText value
      updateTask(task.id, editText);
      // remove the input field by setting editOn to false
      setEditOn(false);
   }

   return (
      <div className="todo-item">
         <input
            type="checkbox"
            checked={task.completed}
            onChange={handleChange}
            onBlur={blur}
         />
         {
            /* if 'editOn' is true (i.e. the edit button is clicked), display the input field, otherwise display the plain text */
            editOn ?
               <div>
                  <input
                  type="text"
                  value={editText}
                     className="edit-input" 
                     onChange={saveEdit}
                     onBlur={blur}
                  />
               </div>
               :
               <div>{task.text}</div>
         }
         <button className="edit-button" onClick={editItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" alt="Edit">
               <title>Edit</title>
               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
               <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
         </button>
         <button className="delete-button" onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" alt="Delete">
               <title>Delete</title>
               <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
         </button>
         {/* <button className="delete-button" onClick={() => deleteTask(task.id)}>
            X
         </button> */}
      </div>
   );
}

export default TodoItem;


/*
         <button className="edit-button" onClick={editItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" alt="Edit">
               <title>Edit</title>
               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
               <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
         </button>
         <button className="delete-button" onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" alt="Delete">
               <title>Delete</title>
               <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
         </button>
*/