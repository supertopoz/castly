import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';


const Wrapper = styled.div`
    display:grid;
    background: ghostwhite;
    border-radius: 10px;
    grid-gap: 4%;
    cursor:pointer;
    @media only screen and (min-width: 320px)  { 
      grid-template-columns: repeat(7, 1fr)
    }
    @media only screen and (min-width: 768px)  {   
      grid-template-columns: repeat(6, 1fr)
    } 
    @media only screen and (min-width: 1024px) { 
      grid-template-columns: repeat(5, 1fr)
    }
`


class Castly extends React.Component {
  
  render(){
    return (
      <Wrapper>        
        Hello World
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { hangman: state.hangman, pageAnimations: state.pageAnimations };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWords: (word) => { dispatch(hangmanActions.addWords(word)) },
    reset: (options) => { dispatch(hangmanActions.reset(options)) },    
    wordFromList: (wordIndex) => { dispatch(hangmanActions.wordFromList(wordIndex)) },    
    wordListCategory: (wordListCategory) => { dispatch(hangmanActions.wordListCategory(wordListCategory)) },    
    convertWordToDashes: (currentWord) => { dispatch(hangmanActions.convertWordToDashes(currentWord)) },    
    getLetter: (letter) => { dispatch(hangmanActions.getLetter(letter)) },   
    letterCheckInsert: () => { dispatch(hangmanActions.letterCheckInsert()) },   
    reachedEnd: () => { dispatch(hangmanActions.reachedEnd()) },  
    hideWordList:(display) => { dispatch(pageAnimations.hideWordList(display))}
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Castly);