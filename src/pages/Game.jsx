import React, { useEffect, useState } from "react";

import AudioVoicer from "../../components/AudioVoicer";
import Qwerty from "../../components/Qwerty";
import data from "../../data/Data";
import ParentComponent from "../../components/ParentComponent";
import Alert from "../../components/Alert";

import "./Game.css";

const Game = () => {
    const [words, setWords] = useState([]);
    const [guess, setGuess] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(true);
  
    useEffect(() => {
      // Verificar se existem dados no localStorage
      const localStorageData = localStorage.getItem("gameData");
      const LocalStorageData = localStorage.getItem("guessData")
      if (localStorageData) {
        // Se existirem dados, use-os para inicializar os estados
        const parsedData = JSON.parse(localStorageData);
        setWords(parsedData.words);
        if (LocalStorageData) {       
            const parsedDataGuess = JSON.parse(LocalStorageData);
            setGuess(parsedDataGuess);
        }
        
  
      } else {
        // Se não houver dados, inicialize-os normalmente
        initializeData();
      }
      
      
      data.onUpdateGuess = setGuess;
      
  
      // Função para inicializar os dados
      function initializeData() {
        data.init();
        setWords(data.words);
        setGuess(data.guess)
        localStorage.setItem("gameData", JSON.stringify({ words: data.words, guess: data.guess }));
      }
  
      // Função para verificar e atualizar os dados à meia-noite
      const updateDataAtMidnight = () => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMin = currentDate.getMinutes();
  
        if (currentHour === 0 && currentMin === 0) {
          initializeData(); // Reinitialize data
          console.log('Data updated at midnight');
        }
      };
  
      // Intervalo para verificar e atualizar os dados à meia-noite
      const interval = setInterval(updateDataAtMidnight, 60000); // Verificar a cada minuto
  
      return () => clearInterval(interval);
    }, []);
  
    // Dependência: apenas reexecute o efeito quando guess mudar
    useEffect(() => {
        console.log(guess);
      // Atualize o localStorage sempre que o estado guess mudar
     if(guess.length > 0){
        localStorage.setItem("guessData", JSON.stringify(guess));
     }
    }, [guess]);
  
    // Função para verificar se uma palavra foi adivinhada corretamente
    const verifyWord = (palavra, vetor) => {
      const palavraEncontrada = vetor.find((item) => item.word === palavra);
      return palavraEncontrada ? palavraEncontrada.correct : null;
    };

    
    const openPopup = () => {
      setIsPopupOpen(true);
    };

    const closePopup = () => {
      setIsPopupOpen(false);
    };
  
    return (
      <div className="container">
        <h1 className="title">Verboo</h1>
        <div className="audio-container">
          {words.map((wordInfo) => (
            <AudioVoicer
              key={wordInfo.id}
              id={wordInfo.id}
              word={wordInfo.word}
              buttonState={verifyWord(wordInfo.word, guess)}
            />
          ))}
        </div>
        <Qwerty />
        <ParentComponent/>
        {isPopupOpen && <Alert onClose={closePopup} />}
      </div>
    );
  };
  

export default Game;
