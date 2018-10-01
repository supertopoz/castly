import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import { words } from "./words"
import * as actions from "../../actions/hangmanActions";
import * as pageActions from "../../actions/pageAnimations";

const Wrapper = styled.div`
    padding-bottom: 5%;
    padding-top: 5%;
    display:grid;
    background: ghostwhite;
    grid-gap: 10px;
    cursor:pointer;
    grid-template-columns: 1fr 1fr;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
`
const Button = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    background: white;
    color: #aa00ff;
    border-radius: 10px;
    text-align: center;
    height: 25px;
    &:hover{
      background: #aa00ff;
      color:white;
      border: 1px solid;
    }

 `


class WordCategories extends React.Component {

  addWords(category){
    this.props.reset();
    let myWords = window.localStorage.getItem('my_words') || JSON.stringify([''])
    let myNewWords = JSON.parse(myWords)
    if(category === 'my_words'){
        this.props.addWords(myNewWords)
        this.props.wordListCategory('my_words')
    } else {
        this.props.addWords(words[category]);
        this.props.wordListCategory(category)
    }        
  }


  render(){ 
    let styled = {}
    if(this.props.hangman.wordListCategory === 'my_words'){
      styled = {backgroundColor: "#aa00ff", color: "white"}
    } else {
      styled = {};
    }    
    return (
      <Wrapper>
        <Button style={styled} onClick={()=> { this.addWords('my_words') }} >My Words</Button>

        {Object.keys(words).map((word, index, array) => {
          if(array[index] === this.props.hangman.wordListCategory){
            styled = {backgroundColor: "#aa00ff", color: "white"}
          } else {
            styled = {};
          }
          return ( 
            <Button style={styled} key={`word-${index}`} 
              onClick={()=> {
                this.addWords(word)
                this.props.changeTab('game')
                }
              }>
            {word}
            </Button>)
        })}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { hangman: state.hangman };
};

const mapDispatchToProps = (dispatch) => {
  return {
    wordListCategory: (type) => { dispatch(actions.wordListCategory(type)) },
    addWords: (word) => { dispatch(actions.addWords(word)) },
    reset: () => { dispatch(actions.reset()) },    
    changeTab: (tab) => { dispatch(pageActions.setTabs(tab)) }, 
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(WordCategories);