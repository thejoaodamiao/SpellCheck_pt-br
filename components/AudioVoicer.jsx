import { useEffect, useState } from "react";
import { FaStop, FaPlay, FaTimes, FaCheck } from "react-icons/fa";
import "./AudioVoicer.css";
import data from "../data/Data";

const AudioVoicer = ({ id, word, description = "", buttonState = null }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const voicelist = getVoicesByLanguage();
    const voz = null || voicelist[3]; // Escolha uma voz específica, por exemplo, a quarta voz da lista
    const newUtterance = new SpeechSynthesisUtterance(word + description);
    newUtterance.voice = voz;
    newUtterance.pitch = 0.5;
    newUtterance.rate = 1;
    setUtterance(newUtterance);
  }, [word, description]);

  const handleButtonClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
      speechSynthesis.cancel();
    } else {
      setIsPlaying(true);
      playWord();
    }
  };

  const playWord = () => {
    if (!utterance) return; // Verifica se a instância utterance está disponível

    speechSynthesis.cancel();

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);

    data.currentWord = word;
  };

  function getVoicesByLanguage() {
    return window.speechSynthesis.getVoices().filter(function(voice) {
      return voice.lang.startsWith("pt-BR");
    });
  }

  return (
    <div onClick={handleButtonClick} className={`audioVoicer button-audio ${buttonState} ${isPlaying ? "active" : ""}`}>
      {buttonState === null ? (isPlaying ? <FaStop /> : <FaPlay />) : buttonState ? <FaCheck /> : <FaTimes />}
    </div>
  );
};

export default AudioVoicer;
