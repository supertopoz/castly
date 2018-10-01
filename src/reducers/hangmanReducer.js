const initialState = {
    word: '',
    wordList : [],
    currentLetter: '',
    semiCompleteWord: '',
    incorrectLetters: [],
    currentWordIndex: 0,
    reachedEndofList: false,
    wordListCategory: '',
    availableLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
}

const addWords = (state, action) => {
  return { ...state, wordList: action.payload}
}

const wordListCategory = (state, action) => {
  return { ...state, wordListCategory: action.payload}
}

const reset = (state, action) => {
  if(action.payload === undefined){
    return { ...initialState }
  }
  let preservedItems = Object.assign({},initialState);  
  action.payload.forEach(item =>{
    preservedItems[item] = state[item]
  })
  return { ...preservedItems }
}

const wordFromList = (state, action) => { 
  return { ...state, word: state.wordList[action.payload] ,currentWordIndex: action.payload }
}

const convertWordToDashes = (state) => {
  let newWord = '';
  state.word.split('').map(item => (item === ' ')? newWord += ' ':newWord += '-' )
  return { ...state, semiCompleteWord: newWord }
}

const getLetter = (state, action) => {
  const letterLocation = state.availableLetters.indexOf(action.payload);
  const letters = Object.assign([],state.availableLetters);
  letters.splice(letterLocation,1,'#');
  return { ...state, currentLetter: action.payload, availableLetters: letters }
}

const sliceInletters = (target, current, letter) => {
  let newCurrent = current.split('')
  target.split('').map((item, index) => (item === letter)? newCurrent[index] = letter : '')
  return newCurrent.join('');
}


const letterCheckInsert = (state) => {
  let newWord = sliceInletters(
    state.word, 
    state.semiCompleteWord, 
    state.currentLetter
  );

  if(state.word.indexOf(state.currentLetter) < 0){
    return { ...state, incorrectLetters : [...state.incorrectLetters, state.currentLetter]}
  }

  return { ...state, semiCompleteWord : newWord }
}

const reacherEnd = (state, action) => {
  return { ...state, reachedEndofList: action.payload } 
}



const hangman = (state = initialState , action) => {
    switch (action.type) {
        case "ADD_WORDS": return addWords(state, action)
        case "WORD_LIST_TYPE": return wordListCategory(state, action)         
        case "RESET": return reset(state, action)        
        case "WORD_FROM_LIST": return wordFromList(state, action)        
        case "CONVERT_WORD_TO_DASHES": return convertWordToDashes(state, action)        
        case "GET_LETTER": return getLetter(state, action)        
        case "LETTER_CHECK_INSERT": return letterCheckInsert(state, action)           
        case "REACHED_END_OF_LIST": return reacherEnd(state, action)        
               
        
        break;
    }
    return state;
};

export default hangman;