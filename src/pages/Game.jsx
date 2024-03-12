import { useEffect, useState } from "react";
import AudioVoicer from "../../components/AudioVoicer"
import Qwerty from "../../components/Qwerty"
import data  from"../../data/Data"


import "./Game.css"
const Game = () => {
  const [words, setWords] = useState([]);
  const [guess, setGuess] = useState([]);
  let count = 0;


  useEffect(()=>{
     data.init();
     setWords(data.words);
     
     

  },[])

  useEffect(()=>{
    setGuess(data.currentWord);
    console.log(guess.length);
  },[data.currentWord])

  

  // const wordata = randomWords;
  

  return (
    <div className="container">
      <h2 className="title">SpellCheck</h2>
       <div className="audio-container">
          {/* Usando map para renderizar vários componentes DictionaryFetch */}
          {words.map((wordInfo) => (
            // <AudioVoicer
            //   key={wordInfo.id}
            //   id={wordInfo.id}
            //   word={wordInfo.word}
            //   // buttonState={guess.id === wordInfo.id}
            //   buttonState={test}
            // />
           
            <>
              { guess.length < 1 ? (<AudioVoicer
                key={wordInfo.id}
                id={wordInfo.id}
                word={wordInfo.word}
               // buttonState={guess.id === wordInfo.id}
              />) : (<>
                {

                }[]
              </>)}
            </>
          ))}
        </div>
          <Qwerty/>
      
    </div>
  )
}

export default Game