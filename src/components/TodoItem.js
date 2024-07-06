import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function TodoItem({ task, deleteTask, toggleCompleted, updateTask, editItemModal }) {
   // useSortable hook for dnd kit 
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task.id,
   });

   // style for dnd kit
   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   // function to toggle the completion status of a todo item
   function handleChange() {
      toggleCompleted(task.id);
   }

   // confirm todo deletion and call deleteTask() if confirmed
   function handleDelete() {
      if (window.confirm(`Delete todo: ${task.text}?`))
         deleteTask(task.id);
   }

   // user clicks the edit button to edit the todo item
   function editItemModal2() {
      //alert('hi');
      // console.log(task.id);
      // console.log(task.text);
      // console.log(task.duedate);
      // console.log('task in editItemModal2: ', task);
       console.log('task.id in editItemModal2: ', task.id);

      // call editItemModal() from TodoList.js, passing in the task object being edited
      editItemModal(task.id);
   }

   return (
      <div ref={setNodeRef} style={style} {...attributes}  className="todo-item">
         <span {...listeners} className="drag-handle">☰</span>
         <div className="todo-content">
            <input type="checkbox" checked={task.completed} onChange={handleChange} />
            <div className="todo-text-container">
               <div className="todo-text">
                  {task.text}
               </div>
               <div className="due-date">{task.duedate}</div>
            </div>
            <button className="edit-button" onClick={editItemModal2}>
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
         </div>
      </div>
   );
}

// Exporting TodoItem component for use in other files.
// Note: the exported value can be a variable, function, class, or object.
export default TodoItem;


/*
            <button className="delete-button" onClick={handleDelete}>
               X
            </button>
               
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