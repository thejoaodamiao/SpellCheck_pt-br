import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'





const Timer = () => {

    const [hora, setHora] = useState("");
    useEffect(()=>{

        setInterval(() => {
            const date = new Date();
            const horaAtual = date.getHours();
            const minAtual = date.getMinutes();
            const segundos = date.getSeconds();
            const horaFormatada = `${horaAtual}:${minAtual}:${segundos}`
            setHora(horaFormatada)
        }, 1000);
        clearInterval();
    },[])
  return (
    <div>
        <h2>{hora}</h2>
    </div>
  )
}

export default Timer