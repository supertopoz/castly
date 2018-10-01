import * as actions from "./pageAnimations";

describe('page actions', () => {
  it('should create an action to test if device is a mobile', () => {
    const expectedAction = { type: 'IS_MOBILE', payload: true}
    expect(actions.isMobile(true)).toEqual(expectedAction)
  })
  it('should create an action for displaying mobile inputs', () => {
    const expectedAction = { type: 'DISPLAY_MOBILE_INPUTS', payload: true}
    expect(actions.displayMobileInputs(true)).toEqual(expectedAction)
  })  
  it('should create an action for hiding the word lists', () => {
    const expectedAction = { type: 'HIDE_WORD_LIST', payload: true}
    expect(actions.hideWordList(true)).toEqual(expectedAction)
  })
})
