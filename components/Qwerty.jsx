
import React from "react";
import "./Qwerty.css"

import data  from"../data/Data"

import { FaDeleteLeft } from "react-icons/fa6";
import { useState } from "react";

const Qwerty = () => {
  const qwerty = ["áéíóúãõâêîôû", "qwertyuiop","asdfghjklç","zxcvbnm", ];

  
  const [inputText, setInputText] = useState("");

  const handleKeyPress = (character) => {
    setInputText((prevText) => prevText + character);
  };

  const handleDelete = () => {
    setInputText((prevText) => prevText.slice(0, -1));
  };

  const handleSubmit = (e) =>{
    e.preventDefault(); 
    if(!inputText){
      alert("digite algo")
      return
    }
    data.game(inputText.toLowerCase().trim());
    setInputText("");

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="qwerty">
      <form >
        <input className="textarea" 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)} 
              onKeyDown={handleKeyDown}/>
      </form> 
      {qwerty.map((row, rowIndex)=>(
        <div className="qwerty-container" key={rowIndex}>
          {row.split('').map((key, keyIndex)=>(
            <div className="keys button"  key={keyIndex}
            onClick={() => handleKeyPress(key)}>
              {key}
            </div>
          ))}
          {rowIndex === 1 && ( 
            <div 
                className="keys button" 
                id="delete" 
                onClick={handleDelete}
              >
              <FaDeleteLeft/>
            </div>
          )}
        </div>
        
      ))}
      <div 
        className="keys button" 
        id="space"
        onClick={handleSubmit}
        > Enviar</div>
      
    </div>
    )
}

export default Qwerty