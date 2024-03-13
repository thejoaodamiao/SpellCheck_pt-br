import React, { useEffect, useState } from "react";
import AudioVoicer from "../../components/AudioVoicer";
import Qwerty from "../../components/Qwerty";
import data from "../../data/Data";

import "./Game.css"

const Game = () => {
    const [words, setWords] = useState([]);
    const [guess, setGuess] = useState([]);

    useEffect(() => {
        data.init();
        setWords(data.words);
        setGuess(data.guess);
        // Configurando a função de retorno de chamada para atualizar guess
        data.onUpdateGuess = setGuess;
    }, []);

    useEffect(() => {
        console.log(guess.length); // Verificar se guess está sendo atualizado corretamente
    }, [guess]);

    const verifyWord = (palavra, vetor) => {
        const palavraEncontrada = vetor.find(item => item.word === palavra);
        if (palavraEncontrada) {
            return palavraEncontrada.correct;
        } else {
            return null;
        }
    };

    const handleDescription = (word) =>{
        const description = data.getDescription(word);
        return description
    }

    return (
        <div className="container">
            <h2 className="title">SpellCheck</h2>
            <div className="audio-container">
                {words.map((wordInfo) => (
                    <AudioVoicer
                        key={wordInfo.id}
                        id={wordInfo.id}
                        word={wordInfo.word}
                        // description={handleDescription(wordInfo.word)}
                        buttonState={verifyWord(wordInfo.word, guess)}
                    />
                ))}
            </div>
            <Qwerty />
        </div>
    );
};

export default Game;
