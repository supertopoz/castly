import * as actions from "./hangmanActions";

describe('hangman actions', () => {
  it('should create an action to add new words', () => {
    const words = ['apple', 'banana']
    const expectedAction = { type: 'ADD_WORDS', payload: words}
    expect(actions.addWords(words)).toEqual(expectedAction)
  })
  it('should create an action reset hangman', () => {
    const expectedAction = { type: 'RESET', payload: ["wordListCategory"]}
    const payload = ["wordListCategory"]
    expect(actions.reset(payload)).toEqual(expectedAction)
  })

  it('should create an action set the type of word list selected', () => {
    const expectedAction = { type: 'WORD_LIST_TYPE', payload: 'myWords'}
    const wordIndex = 1
    expect(actions.wordListCategory('myWords')).toEqual(expectedAction)
  })

  it('should create an action get a specific word from the list', () => {
    const expectedAction = { type: 'WORD_FROM_LIST', payload: 1}
    const wordIndex = 1
    expect(actions.wordFromList(wordIndex)).toEqual(expectedAction)
  })

  it('should create an action get convert current word to dashes', () => {
    const expectedAction = { type: "CONVERT_WORD_TO_DASHES", payload: '---'}
    const word = '---'
    expect(actions.convertWordToDashes(word)).toEqual(expectedAction)
  })  
  it('should create an action to get the users letter', () => {
    const expectedAction = { type: "GET_LETTER", payload: 'A'}
    const letter = 'A'
    expect(actions.getLetter(letter)).toEqual(expectedAction)
  })  
  it('should create an action to check letters against the word', () => {
    const expectedAction = { type: "LETTER_CHECK_INSERT", payload: true }
    expect(actions.letterCheckInsert()).toEqual(expectedAction)
  })
  it('should create an action to handle end of list', () => {
    const expectedAction = { type: "REACHED_END_OF_LIST", payload: true }
    expect(actions.reachedEnd()).toEqual(expectedAction)
  })  
})
