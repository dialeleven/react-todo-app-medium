import React, { useState } from "react";
import "./TodoAddItemModal.css";

function TodoAddItemModal({ showModal, handleClose, addTask }) {
   const [text, setText] = useState("");

   // Handle form submit
   const handleSubmit = (e) => {
      e.preventDefault();
      addTask(text);
      setText("");
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
            handleClose();
         }
      });

      // handle escape key press to close modal
      document.addEventListener("keydown", (e) => {
         if (e.key === "Escape") {
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
               onKeyPress={handleKeyPress}
               required
               autoFocus
            />
         </div>
         <div className="modal-footer">
            <button className="modal-button" onClick={handleClose}>Close</button>
            <button className="modal-button" onClick={handleSubmit}>Add</button>
         </div>
         </div>
      </div>
   );
}

export default TodoAddItemModal;