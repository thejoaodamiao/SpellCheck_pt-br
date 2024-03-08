import { FaStop, FaPlay, FaTimes,  FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

import "./AudioVoicer.css"
import data  from"../data/Data"

const AudioVoicer = ({word, description = "", buttonState = null}) => {

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      // Configurar a síntese de fala ao iniciar a reprodução
      
      const voicesList = window.speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(word);
      console.log(voicesList);
      utterance.voice = voicesList[1];
      utterance.pitch = 1.5;
      utterance.rate = 1;
      
      if(utterance.voice != null){
        console.log(utterance);
        utterance.onend = () => {
        // Callback chamado quando a fala é concluída
        setIsPlaying(false);
        speechSynthesis.cancel();
        };

        utterance.onerror = () =>{
          console.error('Speech synthesis error:', event.error);
          speechSynthesis.cancel();
        }
        console.log(voicesList);
      // Iniciar a síntese de fala
        window.speechSynthesis.speak(utterance);

        data.currentWord = word;

      }

      
    }
  }, [isPlaying, word]);



  const handleButtonClick = () => {
    if (isPlaying) {
      // Se estiver parando, limpar o cache
      setIsPlaying(false);
      speechSynthesis.cancel();
    } else {
      // Se estiver iniciando, iniciar a reprodução
      setIsPlaying(true);
    }
  };

  return (
    <div onClick={handleButtonClick} className={ `audioVoicer button-audio ${buttonState} `}>
    {/* {isPlaying && buttonState === null ? (
        <FaStop/>
      ) : (
        <FaPlay />
    )} */}
    {buttonState === null ? ({
          true:<FaStop/>,
          false: <FaPlay/>
        }[isPlaying]) : 
        ({
          true: <FaCheck/>,
          false: <FaTimes/>
        }[buttonState])
    }
    </div>
  )
}

export default AudioVoicer