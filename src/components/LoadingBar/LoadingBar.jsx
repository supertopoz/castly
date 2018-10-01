import React from "react";
import styled, { keyframes } from "styled-components"
import {connect} from "react-redux";

const keyFrameExampleOne = keyframes`
    from {
      left: 0%; width: 0;z-index:100;
    }
    33.3333% {
      left: 0; width: 100%;z-index: 10;
    }
    to {
      left: 0; width: 100%;
    }
  }
`

const LoadBar = styled.div`
  position: relative;
  margin-top: 0px;
  width: 100%;
  height: 2px;
  background-color: white;
`

const Bar = styled.div`
    content: "";
    display: inline;
    position: absolute;
    width: 0;
    height: 100%;
    left: 50%;
    text-align: center;
    &:nth-child(1){
      background-color: #2b368c;
      animation: ${keyFrameExampleOne} 3s linear infinite
    }
    &:nth-child(2){
      background-color: white;
      animation: ${keyFrameExampleOne} 3s linear 1s infinite;
    }
    &:nth-child(3){
      background-color: red;
      animation: ${keyFrameExampleOne} 3s linear 2s infinite;
    }
    
`

class LoadingBar extends React.Component {
  constructor(){
    super()
  }
  render(){
  if(this.props.loadingBar){
    return (
    <LoadBar>
      <Bar/>
      <Bar/>
      <Bar/>
    </LoadBar>
  )} else {
      return (<div></div>)
    }
  }

}

const mapStateToProps = (state) => {
  return {
    loadingBar: state.pageAnimations.loadingBar
  };
};

export default connect(mapStateToProps)(LoadingBar);