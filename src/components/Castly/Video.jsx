import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

import * as castlyActions from '../../actions/castlyActions';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';
import * as pageAnimations from '../../actions/pageAnimations';

const Wrapper = styled.div`

    display:grid;
    border-radius: 10px;
    grid-gap: 10px;
    cursor:pointer;
    width:90%;
    margin:0 auto;
    width:100%;
`

const Button = styled.div`
  border: 1px solid;
  padding-top: 3px;
  cursor: pointer;
  text-align: center;
  border-radius: 10px;

`

const Buttons = styled.div`
  display: grid;
  grid-gap: 20%;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
`

const VideoHolder = styled.div`
  
`

class Video extends React.Component {

  startRecording(){
    this.props.canvasRecording.audioCtx.resume();
    const audioStream = this.props.canvasRecording.dataStream
    this.props.startRecordingStream(audioStream);
  }

  review(){
    const event = this.props.canvasRecording.recordingData
    this.props.exportVideo(event)
  }

  handleButtonClick(clickedButton){
    const state = this.props.canvasRecording;
    if(clickedButton === 'fiber_manual_record'){
      this.startRecording();
    }
    if(clickedButton === 'stop') { 
      this.props.displayCanvas('none')
      this.props.canvasRecording.recorder.stop();
      window.localStream.getTracks().forEach( (track) => {
        track.stop();
      })
      setTimeout(() => {
        this.review();
      },500)      
    };
    if(clickedButton === 'pause') this.props.canvasRecording.recorder.pause();
    if(clickedButton === 'refresh'){
      document.getElementById('vid-holder').innerHTML = '';
      
      const currentCanvasObjects = this.props.castly.currentCanvasObjects
      this.props.initializeUserMedia(currentCanvasObjects); 


      this.props.displayCanvas('grid')
      this.props.displayRecordButtons('grid')
      {/*this.props.resetCastlyActions();
      this.props.resetRecordingActions();*/}
    } 
    

    this.props.changeRecordButton(clickedButton);

  }

  render(){
      let icon = [];
      if(this.props.canvasRecording.initialized){
        icon = this.props.canvasRecording.recordButtons;
      } 
     return (
      <Wrapper>  
      <VideoHolder id="vid-holder" controls></VideoHolder>
      <Buttons style = {{display: this.props.pageAnimations.displayRecordButtons}}>
      {    
       icon.map((item, index)=>{
         return <Button key={`record${index}`} onClick={()=> this.handleButtonClick(item)}><i className="material-icons">{item}</i></Button>
        })
      }  
           
      </Buttons>  

      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { 
    canvasRecording: state.canvasRecording, 
    pageAnimations: state.pageAnimations,
    castly: state.castly
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAudioContext:(context) => { dispatch(canvasRecordingActions.setAudioContext(context))},
    startRecordingStream:(stream) => { dispatch(canvasRecordingActions.startRecordingStream(stream))},
    exportVideo:(event) => { dispatch(canvasRecordingActions.exportVideo(event))},
    addCanvasImage:(image) => { dispatch(canvasRecordingActions.addCanvasImage(image))},
    uninitialize:() => { dispatch(canvasRecordingActions.uninitialize())},
    changeRecordButton:(clickedButton) => { dispatch(canvasRecordingActions.changeRecordButton(clickedButton))},
    displayCanvas:(display) => { dispatch(pageAnimations.displayCanvas(display))},
    displayRecordButtons:(display) => { dispatch(pageAnimations.displayRecordButtons(display))},
    initializeUserMedia:(currentCanvasObjects) => {dispatch(canvasRecordingActions.initializeUserMedia(currentCanvasObjects))},
    resetCastlyActions:() => { dispatch(castlyActions.reset())},
    resetRecordingActions:() => { dispatch(canvasRecordingActions.reset())},
    resetRecorder:() => { dispatch(canvasRecordingActions.resetRecorder())},
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Video);