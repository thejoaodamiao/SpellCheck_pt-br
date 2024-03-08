import React, { useState, useEffect } from "react";

import words from "./words_br.json"
import xml2js from "xml2js"

export function getRandomWords(callback) {
  // Carregar o arquivo JSON
  fetch(words)
    .then(response => response.json())
    .then(data => {
      // Obter a lista de palavras do JSON
      const wordsList = data.words;

      // Selecionar aleatoriamente 5 palavras
      const selectedWords = selectRandomWords(wordsList, 5);

      // Chamar a função de retorno com as palavras selecionadas
      callback(selectedWords);
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
}

function selectRandomWords(wordsList, count) {
  const shuffledWords = [...wordsList].sort(() => 0.5 - Math.random());
  return shuffledWords.slice(0, count);
}


export async function getDefinition(word){

  const apiUrl = `https://api.dicionario-aberto.net/word/${word}` 
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const xmlString = data.xml;
    xml2js.parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Erro ao analisar XML:', err);
        return;
      }
      console.log(result);
      // Acesse diretamente a tag <item> do objeto resultante
     // const itemValue = result.entry.item;  Substitua 'root' e 'item' pelos nomes reais do seu XML

      // Atualize o estado com o conteúdo da tag <item>
      //return itemValue;
    });
  } catch (error) {
    alert(error);
    console.error('Error fetching dictionary data:', error);
    return null;
  }
}

