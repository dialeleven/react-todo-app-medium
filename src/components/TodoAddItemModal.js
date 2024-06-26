import React, { useState } from "react";
import "./TodoAddItemModal.css";

function TodoAddItemModal({ showModal, handleClose, addTask }) {
   // State for text input
   const [text, setText] = useState("");

   // State for date/time
   const [dateTime, setDateTime] = useState("");

   // Handle form submit
   const handleSubmit = (e) => {
      e.preventDefault();  // Prevent the default form submission
      addTask({text, dateTime});       // Call the addTask function to add the new task
      setText("");         // Reset the text state to an empty string
      setDateTime("");
      handleClose();
   };

   // Handle Enter key press to submit form
   function handleKeyPress(e) {
      if (e.key === "Enter") {
         handleSubmit(e);
      }
   }

   // close modal if user clicks outside the modal or presses escape key
   if (showModal) {
      // Add a click event listener to the document and close modal if user clicks outside
      document.addEventListener("click", (e) => {
         if (e.target.className === "modal-backdrop") {
            setText("");         // Reset the text state to an empty string
            setDateTime("");
            handleClose();
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

   // Handle close button click
   if (!showModal) {
      // If showModal is false, return null to hide the modal
      return null;
   }

   return (
      <div className="modal-backdrop">
         <div className="modal">
         <div className="modal-header">
            <h2>Add Todo</h2>
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
            <button className="modal-button" onClick={handleClose}>Close</button>
         </div>
         </div>
      </div>
   );
}

export default TodoAddItemModal;