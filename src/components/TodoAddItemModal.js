import React, { useState, useContext, useEffect } from "react";
import "./TodoAddItemModal.css";

import { TodoListContext } from "./TodoList";

function TodoAddItemModal({ showModal, handleClose, addTask, addEditMode, currentTaskId }) {
   // State for text input
   const [text, setText] = useState("");

   // State for date/time - default to tomorrow at 9am
   const [dateTime, setDateTime] = useState("");

   const [isNewButtonHidden, setIsNewButtonHidden] = useState(true);

   // our list of tasks
   const editObject = useContext(TodoListContext);

   //console.log(editObject);
   // console.log('currentTaskId in TodoAddItemModal: ', currentTaskId);
   // console.log('editObject in TodoAddItemModal: ', editObject);
   // console.log('currentTaskId:', currentTaskId);
   // console.log('editObject:', editObject);


   const foundTask = editObject.find(task => task.id === currentTaskId);

   if (foundTask) {
      console.log('Found task:', foundTask);
      console.log('Task text:', foundTask.text);
      console.log('Due date:', foundTask.duedate);
   } else {
      console.log(`Task with ID ${currentTaskId} not found.`);
   }


   useEffect(() => {
      if (addEditMode === 'Edit' && foundTask) {
         setText(foundTask.text);
         setDateTime(foundTask.duedate);
      } else {
         setText(""); // Reset text state if not in edit mode or foundTask is not defined
      }
   }, [addEditMode, foundTask]);

   // Handle form submit (arrow function version)
   /*
   const handleSubmitOld = (e) => {
      e.preventDefault();  // Prevent the default form submission

      // if text is not empty, add the new task
      if (text !== "")
      {
         // replace the 'T' in the date/time with a space and set the date/time
         const formattedDateTime = dateTime.replace("T", " ");
   
         addTask({text, dateTime: formattedDateTime});       // Call the addTask function to add the new task
         setText("");         // Reset the text state to an empty string
         setDateTime("");
         handleClose();
      }
      else {
         // alert('Please enter some text.');
      }
   }
   */

   // Handle form submit (function version)
   function handleSubmit(event) {
      event.preventDefault();  // Prevent the default form submission

      // if text is not empty, add the new task
      if (text !== "")
      {
         // replace the 'T' in the date/time with a space and set the date/time
         const formattedDateTime = dateTime.replace("T", " ");
   
         addTask({text, dateTime: formattedDateTime});       // Call the addTask function to add the new task
         setText("");         // Reset the text state to an empty string
         setDateTime("");
         handleClose();
      }
      else {
         // alert('Please enter some text.');
      }
   }

   // Handle Enter key press to submit form
   function handleKeyPress(e) {
      if (e.key === "Enter") {
         handleSubmit(e);
      }
   }
   

   // modal add item window is open, so add event listeners for click and keydown
   if (showModal) {
      // Add a click event listener to the document and close modal if user clicks outside
      document.addEventListener("click", (e) => {
         switch (e.target.className) {
            //case 'modal-backdrop':     // user clicked outside of modal
            case 'modal-button-close': // user clicked close button
               setText("");
               setDateTime("");
               handleClose();
               break;
            
            default:
               // alert(e);
               break;
         }
      });

      // handle escape key press to close modal
      document.addEventListener("keydown", (e) => {
         if (e.key === "Escape") {
            setText("");         // Reset the text state to an empty string
            setDateTime("");
            handleClose();
         }
      });
   }

   // Do not display the modal if showModal is false (initial state from TodoList.js and when
   // closing an open modal window)
   if (showModal)
   {
      return (
         <div className="modal-backdrop">
            <div className="modal">
               <div className="modal-header">
                  <h2>{addEditMode} Todo</h2>
                  <button className="close-button" onClick={handleClose}>×</button>
               </div>
               <div className="modal-body">
                  <input
                     type="text"
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     placeholder="Enter todo item"
                     onKeyDown={handleKeyPress}
                     required
                     autoFocus
                  />

                  <div className="modal-date">
                     <label>Due Date (Optional):</label>
                     <input
                        type="datetime-local"
                        value={dateTime}
                        className="modal-date-time"
                        onChange={(e) => setDateTime(e.target.value)}
                        onKeyDown={handleKeyPress}
                     />
                  </div>
               </div>
               <div className="modal-footer">
                  <button className="modal-button" onClick={handleSubmit}>Add</button>
                  <button className="modal-button-close" onClick={handleClose}>Close</button>
                  {/* expression to conditionally render the 'New' button */}
                  {
                     isNewButtonHidden ? null : <button className="modal-button" onClick={() => setIsNewButtonHidden(true)}>New</button>
                  }
               </div>
            </div>
         </div>
      );
   }
}

export default TodoAddItemModal;