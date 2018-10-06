import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

import DisplayImages from './DisplayImages';
import Video from './Video';


const Wrapper = styled.div`

    display:grid;
    border-radius: 10px;
    grid-gap: 10px;
    cursor:pointer;
    margin:0 auto;
    padding-top: 10px;
    @media only screen and (min-width: 320px)  { 
      width:98%;
    }
    @media only screen and (min-width: 768px)  {   
      width:70%;
    } 
    @media only screen and (min-width: 1024px) { 
      width:70%;
    }
`


class Castly extends React.Component {
  
  render(){
    return (
      <Wrapper>        
        
        <DisplayImages/>
        <Video />
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