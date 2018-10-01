import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';
import * as hangmanActions from "../../actions/hangmanActions";
import * as pageAnimations from "../../actions/pageAnimations";
import WordCategories from "./WordCategories";
import WordInput from "./WordInput";
import { words } from "./words"

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

const StartWrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    background: ghostwhite;
    border-radius: 10px;
    grid-gap: 2%;
    cursor:pointer;
`

const Button = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    background: #aa00ff;
    padding: 5px;
    color: white;
    border-radius: 10px;
    text-align: center;
    max-height: 25px;
    &:hover{
      background: white;
      color:#aa00ff;
      border: 1px solid;
    }
 `

class Game extends React.Component {

  reset(resetPosition){

    const wordList = this.props.hangman.wordList;
    if(wordList.length === 0){
      NotificationManager.warning('Please select a word list or create your own.','Opps! No words to play with')
      return;
    }
    const wordListCategory = this.props.hangman.wordListCategory;
    this.props.reset();
    this.props.addWords(wordList);
    this.props.wordFromList(resetPosition);
    this.props.wordListCategory(wordListCategory);
    this.props.convertWordToDashes();
   }

  handleLocalStorage(){
    let localWords = window.localStorage.getItem('my_words');
    if (localWords === null) return 0
    let array = JSON.parse(localWords);
    return array.length;
  }
  selectButton(){
    let wordListLength = this.handleLocalStorage();
    if(this.props.hangman.wordListCategory !== 'my_words'){        
      wordListLength = words[this.props.hangman.wordListCategory].length;
    } 
    const word = this.props.hangman.currentWordIndex + 1;
    word >= wordListLength? this.props.reachedEnd() : this.reset(word);
  }

  render(){
    let visibiilty = <i  className="material-icons">visibility</i>;
    if(this.props.pageAnimations.hideWordList) visibiilty =  <i className="material-icons">visibility_off</i>;

    if(this.props.hangman.reachedEndofList){
      return (
        <Wrapper>
          <Button onClick={()=> this.props.reset(["wordListCategory","wordList"])} >FINISH</Button>
          <Button onClick={()=> this.reset(0)} >RESTART</Button>
        </Wrapper>
      )
    }

    if(this.props.hangman.word === '' ){
      return (
        <StartWrapper>   
          <div>  
            <Button onClick={()=> this.reset(0)}>START</Button> 
            <div style={{'textAlign' : 'center', 'padding': '5px'}}>
            Word List
            <span style={{'float':'right'}} onClick={
                () => { this.props.pageAnimations.hideWordList? this.props.hideWordList(false) : this.props.hideWordList(true) }}>
                {visibiilty}</span>
            </div>     
          </div>
          <WordInput/>
          <WordCategories/>                   
        </StartWrapper>
      )
    }


    if(this.props.hangman.word === this.props.hangman.semiCompleteWord ||this.props.hangman.incorrectLetters.length >= 10){
      return (
        <Wrapper>
          <Button onClick={()=> this.selectButton()}>NEXT</Button>
        </Wrapper>
      )
    }

    return (
      <Wrapper>        
        { this.props.hangman.availableLetters.map((item, index)=>{
          return  <Button onClick={()=> {
            if(item !== '#'){
              this.props.getLetter(item);
              this.props.letterCheckInsert()
            }
          }} 
          key={`letter-${index}`}
          >{item}
          </Button>  
          })
        }
        <Button
        onClick={()=> this.props.reset(["wordListCategory","wordList"])}
        ><i className="material-icons">arrow_back</i></Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Game);