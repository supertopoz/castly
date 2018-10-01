import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import * as actions from "../../actions/hangmanActions";
import {images }from "./images";

const MainWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  background: lightpink;
  color: #aa00ff;
  font-size: 1rem;
  text-align:center;
`

class HangmanViewDiscardedLetters extends React.Component {
  render(){
    return(
        <MainWrapper>
          {this.props.hangman.incorrectLetters.map((item,index) => {
            return <span key={`item-${index}`}> { item } </span>
          })}
      </MainWrapper>  
    );
  }
}

const mapStateToProps = (state) => {
  return { hangman: state.hangman };
};

export default connect(mapStateToProps)(HangmanViewDiscardedLetters);