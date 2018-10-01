import hangman from './hangmanReducer';


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

 const targetStateAddWords = {
        word: '',
        wordList : ['APPLES', 'PEARS'],
        currentLetter: '',
        semiCompleteWord: '',
        incorrectLetters: [],
        currentWordIndex: 0,
        reachedEndofList: false,
        wordListCategory: '',
        availableLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      } 


describe('hangman reducer', () => {
  it('should return the initial state', () => {
    expect(hangman(undefined, {})).toEqual(initialState)
  })
  it('should handle ADD_WORD', () => {
    expect(
      hangman(initialState, {
        type: 'ADD_WORDS',
        payload: ['APPLES', 'PEARS']
      })
    ).toEqual(targetStateAddWords)
  })
  
  it('should handle WORD_FROM_LIST', ()=>{
    const initialState = { word: '', wordList: ['APPLES', 'PEARS'], currentWordIndex: 0};
    const targetState = { word: 'PEARS', wordList: ['APPLES', 'PEARS'], currentWordIndex: 1};

    expect( hangman( initialState, { type: 'WORD_FROM_LIST', payload: 1}))
    .toEqual(targetState)
  });

  it('should handle CONVERT_WORD_TO_DASHES', ()=>{
    const initialState1 = { word: 'PEARS', semiCompleteWord: ''};
    const targetState1 = { word: 'PEARS', semiCompleteWord: '-----'};
    const initialState2 = { word: 'HAPPY COUPLE', semiCompleteWord: ''};
    const targetState2 = { word: 'HAPPY COUPLE', semiCompleteWord: '----- ------'};

    expect( hangman( initialState1, { type: 'CONVERT_WORD_TO_DASHES', payload: true } ))
    .toEqual(targetState1)    

    expect(hangman(initialState2, { type: 'CONVERT_WORD_TO_DASHES',payload: true } ))
    .toEqual(targetState2)
  });
  it('should handle GET_LETTER', ()=>{
    const initialState = {
      currentLetter: '',
      availableLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    }
    const targetState = {
      currentLetter: 'A',
      availableLetters: ["#","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    }
    expect( hangman( initialState, { type: 'GET_LETTER', payload: 'A' } ))
    .toEqual(targetState)  

  });
  it('should handle LETTER_CHECK', ()=>{
    const initialState1 = {
        word: 'HAPPY COUPLE',
        currentLetter: 'A',
        semiCompleteWord: '----- ------',
        incorrectLetters: [],
    }

    const targetState1 = {
        word: 'HAPPY COUPLE',
        currentLetter: 'A',
        semiCompleteWord: '-A--- ------',
        incorrectLetters: [],
    }

    const initialState2 = {
      word: 'HAPPY COUPLE',
      currentLetter: 'X',
      semiCompleteWord: '-A--- ------',
      incorrectLetters: [],
    }

    const targetState2 = {
      word: 'HAPPY COUPLE',
      currentLetter: 'X',
      semiCompleteWord: '-A--- ------',
      incorrectLetters: ['X'],
    }
    expect( hangman( initialState1, { type: 'LETTER_CHECK_INSERT', payload: true } ))
    .toEqual(targetState1)

    expect( hangman( initialState2, { type: 'LETTER_CHECK_INSERT', payload: true } ))
    .toEqual(targetState2)  

  });
  it('should handle REACHED_END_OF_LIST', ()=>{
        const initialState = {reachedEndofList: false,}
        const targetState = {reachedEndofList: true,}
    expect(
      hangman(initialState, {
        type: 'REACHED_END_OF_LIST',
        payload: true
      })
    ).toEqual(targetState)
  });
    it('should handle WORD_LIST_TYPE', ()=>{
        const initialState = { wordListCategory: '',}
        const targetState = {wordListCategory: 'my_words',}
    expect(
      hangman(initialState, {
        type: 'WORD_LIST_TYPE',
        payload: 'my_words'
      })
    ).toEqual(targetState)
  });
  it('should handle RESET', ()=>{
     const initialState = {
        word: 'APPLES',
        wordList : ['APPLES', 'PEARS'],
        currentLetter: 'A',
        semiCompleteWord: 'A-----',
        incorrectLetters: ["X"],
        currentWordIndex: 0,
        reachedEndofList: false,
        wordListCategory: 'my_words',
        availableLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      }
     const targetState = {
        word: '',
        wordList : ['APPLES', 'PEARS'],
        currentLetter: '',
        semiCompleteWord: '',
        incorrectLetters: [],
        currentWordIndex: 0,
        reachedEndofList: false,
        wordListCategory: 'my_words',
        availableLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      }
      const targetState2 = {
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

    expect(
      hangman(initialState, {
        type: 'RESET',
        payload: ["wordListCategory", "wordList"]
      })
    ).toEqual(targetState)
    expect(
      hangman(initialState, {
        type: 'RESET',
        payload: []
      })
    ).toEqual(targetState2)
  })
})