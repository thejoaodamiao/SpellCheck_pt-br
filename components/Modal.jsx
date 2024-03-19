import React from 'react';
import './Modal.css';

const Modal = ({ onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className='modal-element'>
            <h2>5</h2>
            <h1>jogos</h1>
        </div>
        <div className='modal-element'>
            <h2>2/5</h2>
            <h1>acertou</h1>
        </div>
        <div className='modal-element'>
            <h2>2</h2>
            <h1>sequencia</h1>
        </div>
        <div className='modal-element'>
            <h2>10</h2>
            <h1>melhor sequencia</h1>
        </div>
        
      </div>
      <div className="modal-button" onClick={onClose}>Fechar</div>
    </div>
  );
};

export default Modal;