import pageAnimations from './pageAnimationsReducer';


const initialState = {
    loadingBar: false,
    sideMenu: false,
    tab: '',
    isMobile: false,
    displayMobileInputs: false,
    hideWordList: true
}

describe('pageAnimation reducer', () => {
  it('should return the initial state', () => {
    expect(pageAnimations(undefined, {})).toEqual(initialState)
  })
  it('should handle SHOW_LOADING_BAR', () => {
    const initialState = {
        loadingBar: false,
    } 
    const targetState = {
        loadingBar: true,
    } 
    expect(
      pageAnimations(initialState, {
        type: 'SHOW_LOADING_BAR',
        payload: true
      })
    ).toEqual(targetState)
  })
  it('should handle SHOW_SIDE_MENU', () => {
    const initialState = {
        sideMenu: false,
    } 
    const targetState = {
        sideMenu: true,
    } 
    expect(
      pageAnimations(initialState, {
        type: 'SHOW_SIDE_MENU',
        payload: true
      })
    ).toEqual(targetState)
  })
  it('should handle SET_TABS', () => {
    const initialState = {
        tab: '',
    } 
    const targetState = {
        tab: 'game',
    } 
    expect(
      pageAnimations(initialState, {
        type: 'SET_TABS',
        payload: 'game'
      })
    ).toEqual(targetState)
  })
  it('should handle IS_MOBILE', () => {
    const initialState = {
        isMobile: false,
    } 
    const targetState = {
        isMobile: true,
    } 
    expect(
      pageAnimations(initialState, {
        type: 'IS_MOBILE',
        payload: true
      })
    ).toEqual(targetState)
  })
  it('should handle DISPLAY_MOBILE_INPUTS', ()=>{
    const initialState = {
      displayMobileInputs: false,      
    }
    const targetState = {
      displayMobileInputs: true,      
    }
    expect( pageAnimations( initialState, { type: 'DISPLAY_MOBILE_INPUTS', payload: true } ))
    .toEqual(targetState)  

  });
  it('should handle HIDE_WORD_LIST', ()=>{
    const initialState = {
      hideWordList: false,      
    }
    const targetState = {
      hideWordList: true,      
    }
    expect( pageAnimations( initialState, { type: 'HIDE_WORD_LIST', payload: true } ))
    .toEqual(targetState)  
  });
})