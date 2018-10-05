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
   display:none;
`
const DisplayCanvas = styled.canvas`
   background: #03A9F4;
`

class Video extends React.Component {

  startRecording(){
    this.props.canvasRecording.audioCtx.resume();
    const stream = this.props.canvasRecording.myRecording
    this.props.startRecordingStream(stream);
  }

  stopRecording(){
    this.props.canvasRecording.recorder.stop();
  }

  pauseRecording(){
    console.log('pause')
    this.props.canvasRecording.recorder.pause();
  }  
  resumeRecording(){
    console.log('resume')
    this.props.canvasRecording.recorder.resume();
  }
  review(){
    console.log('review')
    //this.props.canvasRecording.recorder.resume();
    const event = this.props.canvasRecording.recordingData
    this.props.exportVideo(event)
  }



  render(){
    return (
      <Wrapper>  
      <Button onClick={ this.props.initializeUserMedia }>Initilize System</Button>      
      <Button onClick={ this.startRecording.bind(this)}>START</Button> 
      <Button onClick={ this.pauseRecording.bind(this)}>PAUSE</Button>
      <Button onClick={ this.resumeRecording.bind(this)}>CONTINUE</Button>      
      <Button onClick={ this.stopRecording.bind(this)}>STOP</Button>
      <Button onClick={ this.review.bind(this)}>REVIEW</Button>       
      
      <HiddenCanvas  width="1080" height="600" id="canvas"/>   
      <DisplayCanvas width="700" height="300" id="canvas2"/>
      <div id="vid-holder" style={{maxWidth: '300px'}} controls></div>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { canvasRecording: state.canvasRecording };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAudioContext:(context) => { dispatch(canvasRecordingActions.setAudioContext(context))},
    initializeUserMedia:() => {dispatch(canvasRecordingActions.initializeUserMedia())},
    startRecordingStream:(stream) => { dispatch(canvasRecordingActions.startRecordingStream(stream))},
    exportVideo:(event) => { dispatch(canvasRecordingActions.exportVideo(event))}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Video);