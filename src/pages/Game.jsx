import { useEffect, useState } from "react";
import AudioVoicer from "../../components/AudioVoicer"
import Qwerty from "../../components/Qwerty"
import data  from"../../data/Data"


import "./Game.css"
const Game = () => {
  const [words, setWords] = useState([]);

  useEffect(()=>{
     data.init();
     setWords(data.words);

  },[])

  // const wordata = randomWords;
  

  return (
    <div className="container">
      <h2 className="title">SpellCheck</h2>
       <div className="audio-container">
          {/* Usando map para renderizar vários componentes DictionaryFetch */}
          {words.map((wordInfo) => (
            <AudioVoicer key={wordInfo.id} word={wordInfo.word} />
          ))}
        </div>
          <Qwerty words={words} />
      
    </div>
  )
}

export default Game