import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';

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

const Button = styled.div`
  border: 1px solid;
  padding: 5px;
  width: 110px;
  cursor: pointer;
`

const HiddenCanvas = styled.canvas`
   background: #03A9F4;
   display: none;
`
const DisplayCanvas = styled.canvas`
   background: #03A9F4;
`

class Video extends React.Component {

  componentDidMount(){
     console.log('mounted')
  }

  init(){
    console.log('clicked')
    this.props.initializeUserMedia()
  }
  
  render(){
    return (
      <Wrapper>  
      <Button onClick={() => this.init()}>Initilize System</Button>      
      <Button>START</Button>      
      <Button>STOP</Button>   
      <HiddenCanvas width="1080" height="600" id="canvas"/>   
      <DisplayCanvas width="700" height="300" id="canvas2"/>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { hangman: state.hangman, pageAnimations: state.pageAnimations };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAudioContext:(context) => { dispatch(canvasRecordingActions.setAudioContext(context))},
    initializeUserMedia:() => {dispatch(canvasRecordingActions.initializeUserMedia())}
    }
  };


export default connect(mapStateToProps, mapDispatchToProps)(Video);