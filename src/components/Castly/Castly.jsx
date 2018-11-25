'use strict';
import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

import AddFiles from './AddFiles';
import ChooseMedia from './ChooseMedia';
import DisplayImages from './DisplayImages';
import Video from './Video';
import HowTo from './HowTo';
import DisplayCanvas from './DisplayCanvas';

import * as castlyActions from '../../actions/castlyActions';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';
import * as pageAnimations from '../../actions/pageAnimations';


const Wrapper = styled.div`
    display:grid;
    grid-gap: 10px;
    cursor:pointer;
    margin:0 auto;
    padding-top: 5px;
    max-width: 700px;
`

const HiddenCanvas = styled.canvas`
   background: #03A9F4;
   margin-left: -3000px;
   margin-top: -3000px;
`

class Castly extends React.Component {
  constructor(){
    super();
    this.hiddenCanvas = React.createRef();
  }

  componentWillUnmount(){
    this.props.resetCastlyActions();
    this.props.resetRecordingActions();
    this.props.resetPageAnimationActions();
    this.props.castly.currentCanvasObjects.running = false; // Stop canvas Loop
    try{
      window.localStream.getTracks().forEach( (track) => track.stop())
    } catch(e){}
  }

  render(){
    let displayHowTo = <HowTo/>   
    let plusButton = <ChooseMedia/>
    if(this.props.canvasRecording.initialized && typeof this.props.canvasRecording.dataStream === 'object') displayHowTo = ''
    if(this.props.canvasRecording.initialized && this.props.castly.images.length > 0) plusButton = <AddFiles/>

    return (
      <Wrapper>
        {plusButton}
        {displayHowTo}          
        <DisplayImages/>
        <canvas style={{
          display: "none"
        }} 
        width="1920" 
        height="1080" 
        ref={this.hiddenCanvas}
        id="canvas"/>   
        <DisplayCanvas/>
        <video          
          style={{display:"none"}} 
          id="userVideoElement"
        ></video>
        <Video/>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { 
    castly: state.castly, 
    canvasRecording: state.canvasRecording
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetCastlyActions:() => { dispatch(castlyActions.reset())},
    resetRecordingActions:() => { dispatch(canvasRecordingActions.reset())},
    resetPageAnimationActions:() => { dispatch(pageAnimations.reset())},
    setUserVideo:(videoElement) => { dispatch(canvasRecordingActions.setUserVideo(videoElement))},
    startRecordingStream:(audioStream, video) => { dispatch(canvasRecordingActions.startRecordingStream(audioStream, video))},
  };
};


export default connect(mapStateToProps, mapDispatchToProps,null, {withRef: true})(Castly);