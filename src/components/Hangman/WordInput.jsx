import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';
import * as hangmanActions from "../../actions/hangmanActions";
import * as pageAnimations from "../../actions/pageAnimations";
import { words } from "./words"


const Input = styled.textarea`
    width: 95%;
    border:none;
    padding: 2%;
    color: #aa00ff;
    font-size: 1.3rem;
    background: white no-repeat;
    background-image: linear-gradient(to bottom, #aa00ff, #aa00ff), linear-gradient(to bottom, silver, silver);
    background-size: 0 2px, 100% 1px;
    background-position: 50% 100%, 50% 100%;
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    &:focus{
      background-size: 100% 2px, 100% 1px;
      outline: none;
      box-shadow: 2px 2px 5px 0px #9E9E9E;
    }
`

const MobileWrapper = styled.div`
    display: grid; 
    top: 0px;
    left: 0px;
    box-shadow: none;
    position: absolute;
    background: rgba(0,0,0,0.6);
    height: 100%;
    width: 100%;
    grid-template-columns: 1fr 10fr 1fr;
    grid-template-rows: 2fr 1fr 5fr;
    padding-top: 20%;
`

const HiddenWords = styled.span`
`

const DesktopWrapper = styled.div``


class WordInput extends React.Component {


   textAreaFocus(e, eventType){
    if(this.props.pageAnimations.isMobile){
      this.props.displayMobileInputs(true);
    }
   }

   textAreaBlur(){
    if(this.props.pageAnimations.isMobile){
      this.props.displayMobileInputs(false);
    }
   }
   
   handleChange(e){
    let words = e.target.value.toUpperCase().split(',')
    const acceptedChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",","," ", "","_"]
    const letterToCheck = e.target.value.toUpperCase()[e.target.value.length -1];
    const deleteLetter = e.target
    console.log(deleteLetter)
    if(acceptedChars.indexOf(letterToCheck) >= 0 || letterToCheck === undefined ){
      window.localStorage.setItem('my_words', JSON.stringify(words));
      this.props.addWords(words)
    } else {
      NotificationManager.info('Yey! Hangman only works with English Alphabet A-Z and ","');
    }
   }

   convertLetters(word){
    
     return word.reduce((arc, item) => {        
        let hiddenWord = '' 
        item.split('').forEach((letter)=> hiddenWord += '_')
        arc.push(hiddenWord);
        hiddenWord = '';
        return arc
      },[])
   }


  render(){
      let wordList = this.props.hangman.wordList;
      if(this.props.pageAnimations.hideWordList){
        wordList = this.convertLetters(wordList)
        console.log(wordList)
      }
      let input = <Input         
        onChange={(e)=> this.handleChange(e, 'change')} 
        onFocus={(e) => this.textAreaFocus(e)}
        onBlur={()=> this.textAreaBlur()} 
        value = {wordList}

        />
      if(this.props.hangman.wordListCategory !== 'my_words'){
        if(this.props.pageAnimations.hideWordList){
          return <div>{wordList.map((item, index) => <HiddenWords key={`word-${index}`}>{item}, </HiddenWords>)}</div>
        }
        return <div>{wordList.map((item, index) => <span key={`word-${index}`}>{item}, </span>)}</div>
      }
      if(this.props.pageAnimations.displayMobileInputs) return <MobileWrapper><div></div>{input}<div></div></MobileWrapper>      
      return <DesktopWrapper>{input}</DesktopWrapper>
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
    displayMobileInputs: (display) => { dispatch(pageAnimations.displayMobileInputs(display)) }    
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(WordInput);