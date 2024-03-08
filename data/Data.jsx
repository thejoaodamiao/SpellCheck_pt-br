import words from "./words_br.json"

export default {
    words: [],
    count: 5,
    currentWord: "",
    guessNumber: 5,


    game(guess){
        if(this.guessNumber > 0 ){
            if(this.currentWord === guess){
            
                alert("acertou a palavra :)");
            }else{
                alert("errou irmão, burrão");
            }
            this.guessNumber --;
        }else{
            alert("cabou as chances");
            return
        }
        
    },
    init(){
        const uniqueRandomWords = [];
        while (uniqueRandomWords.length < this.count) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex];
    
            if (!uniqueRandomWords.includes(randomWord)) {
              uniqueRandomWords.push({id: randomIndex, word:randomWord});
            }
        }

        console.log(uniqueRandomWords)

        this.words = uniqueRandomWords;
    },

}