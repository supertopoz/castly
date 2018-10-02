import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';
import AddFiles from './AddFiles';
import ImageEditing from './ImageEditing';
import DisplayImages from './DisplayImages';


const Wrapper = styled.div`

    display:grid;
    border-radius: 10px;
    grid-gap: 10px;
    cursor:pointer;
    width:90%;
    margin:0 auto;
    padding-top: 10px;
    @media only screen and (min-width: 320px)  { 
      width:90%;
    }
    @media only screen and (min-width: 768px)  {   
      width:80%;
    } 
    @media only screen and (min-width: 1024px) { 
      width:70%;
    }
`


class Castly extends React.Component {
  
  render(){
    return (
      <Wrapper>        
        <AddFiles/>
        <DisplayImages/>
        <ImageEditing/>
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