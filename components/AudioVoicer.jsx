import { useState } from "react";
import { FaStop, FaPlay, FaTimes, FaCheck } from "react-icons/fa";
import "./AudioVoicer.css";
import data from "../data/Data";

const AudioVoicer = ({ id, word, description = "", buttonState = null }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleButtonClick = () => {
    if (isPlaying) {
      // Se estiver parando, limpar o cache
      setIsPlaying(false);
      speechSynthesis.cancel();
    } else {
      // Se estiver iniciando, iniciar a reprodução
      setIsPlaying(true);
      playWord();
    }
  };

  const playWord = () => {
    // Cancelar qualquer reprodução em andamento
    speechSynthesis.cancel();

    // Configurar a síntese de fala ao iniciar a reprodução
    
    const utterance = new SpeechSynthesisUtterance(word + description);
    console.log(word + description);
    utterance.pitch = 0.5;
    utterance.rate = 1;

    // Callback chamado quando a fala é concluída
    utterance.onend = () => {
      setIsPlaying(false);
    };

    // Callback chamado em caso de erro na síntese de fala
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      setIsPlaying(false);
    };

    // Iniciar a síntese de fala
    window.speechSynthesis.speak(utterance);

    // Atualizar o objeto currentWord do data
    data.currentWord = { id: id, word: word };
  };

  return (
    <div onClick={handleButtonClick} className={`audioVoicer button-audio ${buttonState} ${isPlaying ? "active": ""}`}>
      {buttonState === null ? (isPlaying ? <FaStop /> : <FaPlay />) : buttonState ? <FaCheck /> : <FaTimes />}
    </div>
  );
};

export default AudioVoicer;
