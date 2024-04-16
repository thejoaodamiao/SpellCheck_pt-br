import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({ onClose, guess = [{word: "dale", correct: true}] , won = true }) => {
  const [streak, setStreak] = useState(null); 
  const [bestStreak, setBestStreak] = useState(null);
  const [save, setSave] = useState(false);
  

  useEffect(() => {

    const fetchData = () => {
      const finalData = JSON.parse(localStorage.getItem("finalData"));
      if (finalData) {

        //inicializar
        const localStreak =  finalData.streak;// atual streak de vitorias
        const localBestStreak = finalData.bestStreak;//melhor streak de vitorias
        const localLastDate = finalData.LastDate;//data da ultima vitoria
        const updatedDate = new Date();//data de hj
        //inicializar
        console.log(localStreak, localBestStreak, localLastDate, updatedDate);

        setBestStreak(localBestStreak);
        setStreak(localStreak);

        if(won){
          if(isYesterday(localLastDate)){
            const updatedStreak = localStreak + 1;//atualiza streak
            const updatedBestStreak = localBestStreak > updatedStreak ? localBestStreak : updatedStreak;// se streak atual maior que a melhor atualiza a bestStreak
            
            
            setStreak(updatedStreak);
            setBestStreak(updatedBestStreak);
            setData(updatedStreak, updatedBestStreak, updatedDate);
          }else{
            const updatedStreak = 1;
            
            setStreak(updatedStreak);
            setData(updatedStreak, localBestStreak, updatedDate );
          }
          
        }else{
          const updatedStreak = 0;
          
          setStreak(updatedStreak);
          setData(updatedStreak, localBestStreak, localLastDate);

        } 
        
      }else{
        const updatedDate = new Date();
        if(won){
          setStreak(1);
          setBestStreak(1);
          setData(1 , 1 , updatedDate);
        }else{
          setStreak(0);
          setBestStreak(0);
          setData(0 , 0 , updatedDate);
        }
      }
    }
    fetchData();
    
    
  }, []);

  function setData(streak, bestStreak, date) {
    localStorage.setItem("finalData", JSON.stringify({ streak: streak, bestStreak: bestStreak, LastDate: date}));
    console.log("Dados salvos no localStorage.");
  }

  function isYesterday(LastDate){
    const currentDate = new Date();
    const lastDateCompare = new Date(LastDate)
    //é pra estar ....getDay() - 1, pra comparar com ontem
    return currentDate.getDay() - 1 === lastDateCompare.getDay() &&
          currentDate.getMonth() === lastDateCompare.getMonth() &&
          currentDate.getFullYear() === lastDateCompare.getFullYear();

  }

  function handleGuess(guess){
    const correctCount = guess.filter(item => item.correct === true).length;
    if(correctCount > 3){
      setWon(true);
    }
    return `${correctCount}/5`
  }

  return (
    <div className="modal-container">
      {won ? (
        <div>
          <h2>Você Ganhou, Parabéns!!! :)</h2>
        </div>
      ) : (
        <div>
          <h2>Mais sorte na próxima vez :(</h2>
        </div>
      )}
      <div>
        <p style={{fontSize: "20px"}}>{guess[0].word + ", " +guess[1].word + ", " +guess[2].word+ ", " +guess[3].word+ ", " +guess[4].word}</p >
      </div>
      <div className="modal">
      <div className='modal-element'>
            <h2>{handleGuess(guess)}</h2>
            <h1>Corretas</h1>
        </div>
        <div className='modal-element'>
          <h2>{streak}</h2>
          <h1>sequencia</h1>
        </div>
        <div className='modal-element'>
          <h2>{bestStreak}</h2>
          <h1>Melhor Sequencia</h1>
        </div>
      </div>
      <div className="modal-button" onClick={onClose}>Fechar</div>
    </div>
  );
};

export default Modal;
