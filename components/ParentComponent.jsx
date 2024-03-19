// ParentComponent.js
import React, { useState } from 'react';
import Modal from "./Modal"

const ParentComponent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      {isPopupOpen && <Modal onClose={closePopup} />}
    </div>
  );
};

export default ParentComponent;