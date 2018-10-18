import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

import DisplayImages from './DisplayImages';
import Video from './Video';
import DisplayCanvas from './DisplayCanvas';

const Wrapper = styled.div`

    display:grid;
    border-radius: 10px;
    grid-gap: 10px;
    cursor:pointer;
    margin:0 auto;
    padding-top: 10px;
    @media only screen and (min-width: 320px)  { 
    }
    @media only screen and (min-width: 768px)  {   
    } 
    @media only screen and (min-width: 1024px) { 

    }
`

const HiddenCanvas = styled.canvas`
   background: #03A9F4;
   display: none;
`


class Castly extends React.Component {
  
  render(){
    return (
      <Wrapper>        
        
        <DisplayImages/>
        <Video />
        <HiddenCanvas  width="1080" height="600" id="canvas"/>   
        <DisplayCanvas/>
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