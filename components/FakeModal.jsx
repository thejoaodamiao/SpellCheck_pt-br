import React, { useEffect, useState } from 'react';
import './Modal.css';

import { useLocalStore } from './useLocalStore';


const FakeModal = ({ onClose, guess = [{word: "dale", correct: true}], won = true  }) => {

  // const {setItem, getItem} = useLocalStore();
  const [streak, setStreak] = useState(1);
  const [bestStreak, setBestStreak] = useState(1);
  const [lastDate, setLastDate] = useState("");
  const [save, setSave] = useState(false);
  const currentDate = new Date();
  let count = 0
  useEffect(()=>{
    
    const finalData = JSON.parse(localStorage.getItem("finalData"));
    console.log(finalData);

    if(finalData){
      const currentStreak = finalData.streak + 1;
      const currentlastDate = finalData.lastDate;
      const currentBestStreak = finalData.bestStreak;
      console.log("marcaiones",currentStreak, currentlastDate, currentBestStreak);
      setStreak(currentStreak);
      console.log(streak, bestStreak);
      if(won){
        // currentBestStreak < currentStreak ? setBestStreak((se) => streak + 1) : setBestStreak((streak) => streak + 1)
        // setStreak((currentStreak) => currentStreak + 1);
        setStreak(currentStreak)
        currentBestStreak < currentStreak ? setBestStreak(currentStreak) : setBestStreak(currentBestStreak);
      }
      setLastDate(currentlastDate);
      setSave(true)
    }else{
      initializeData()
    }

    function initializeData() {
      
      // const currentStreak = 1;
      // const currentBestStreak = 5;
      // setLastDate(currentDate);
      console.log("to louco");
      if (won) {
        // setStreak(currentStreak);
        // setBestStreak(currentBestStreak);
        setLastDate(currentDate);
        // Salvar os dados iniciais no localStorage
        console.log("INICIALIZOU", streak, bestStreak);
        setSave(true)
      }
    }
    

   
  
    // const interval = setInterval(() => {
    //   count++
    //   setStreak(count)
    //   const dale = streak
    //   console.log("streak:", streak, "bestStreak:", bestStreak);
    // }, 5000);
    // return () => clearInterval(interval);

    

    
    
    

    
  },[])
  
  useEffect(()=>{ 
    setData();
  },[save])

  useEffect(()=>{
    console.log(streak, bestStreak);
  },[streak])

  function setData() {
    localStorage.setItem("finalData", JSON.stringify({ lastDate: lastDate, streak: streak, bestStreak: bestStreak }));
    console.log("salvo");
  }


  

  // useEffect(()=>{
  //   setStreak(2)
  //   setBestStreak(5);
  //   let dale = 0
  //   setInterval(() => {
  //     dale++;
  //     console.log(dale);
  //     setBestStreak(dale)
  //   }, 5000);


  // },[])

  
 

  

  useEffect(() => {
    console.log("Best Streak:", bestStreak);
  }, [bestStreak]);

  useEffect(() => {
    console.log("Streak:", streak);
  }, [streak]);


  
  return (
    <div className="modal-container">
      {won ? (
            <div>
              <h2>Você Ganhou, Parabéns!!! :)</h2>
            </div>
            ) : (
            <div>
              <h2>Mais sorte, na proxima vez :(</h2>
            </div>
            )}
      <div className="modal">
        <div className='modal-element'>
            <h2>3/5</h2>
            <h1>Corretas</h1>
        </div>
        <div className='modal-element'>
            <h2>{streak}</h2>
            <h1>sequencia</h1>
        </div>
        <div className='modal-element'>
            <h2>{bestStreak}</h2>
            <h1>melhor sequencia</h1>
        </div>
        
      </div>
      <div className="modal-button" onClick={onClose}>Fechar</div>
    </div>
  );
};

export default FakeModal;