import words from "./words_br.json";

export default {
    words: [],
    count: 5,
    currentWord: [],
    guessNumber: 5,
    description: "",
    guess: [],
    onUpdateGuess: () => {}, // Função de retorno de chamada para atualizar guess

    game(guess) {
        if (this.guessNumber > 0) {
            const correct = this.currentWord.word === guess;
            if (correct) {
                alert("acertou a palavra :)");  
            } else {
                alert("errou irmão, burrão");
            }
            this.guess.push({ word: this.currentWord.word, correct });
            this.guessNumber--;
            console.log(this.guessNumber);
            console.log(this.guess);
    
            // Atualize o estado de guess usando a função de retorno de chamada
            this.onUpdateGuess([...this.guess]); // Passando uma nova referência de array para forçar a atualização
        } else {
            alert("cabou as chances");
            return;
        }
    }
    ,

    includes(word){
        return true || false;
    },
    
    getXMLToString(data){
        const xmlString = data[0].xml;

        // Criar um objeto XML usando DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        
        // Acessar a tag <def>
        const defTag = xmlDoc.querySelector("def").textContent;
        
        return defTag
    }
    ,

    async getDescription(word){ // Replace with your API key
      
        const apiUrl = `https://api.dicionario-aberto.net/word/${word}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        const description = await this.getXMLToString(data);
        return description;
      } catch (error) {
            console.error('Error fetching dictionary data:', error);
            return "";
      }

    },

    
    
    getWords(){
        const uniqueRandomWords = [];
        while (uniqueRandomWords.length < this.count) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex];
    
            if (!uniqueRandomWords.includes(randomWord)) {
                uniqueRandomWords.push({id: randomIndex, word: randomWord});
            }
        }

        console.log(uniqueRandomWords);

        this.words = uniqueRandomWords;
    },

    init(){
        this.getWords()

    },

};
