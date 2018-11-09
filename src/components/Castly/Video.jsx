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

class Video extends React.Component {

  startRecording(){
    this.props.canvasRecording.audioCtx.resume();
    const stream = this.props.canvasRecording.dataStream
    this.props.startRecordingStream(stream);
  }

  review(){
    const event = this.props.canvasRecording.recordingData
    this.props.exportVideo(event)
  }

  handleButtonClick(clickedButton){
    const state = this.props.canvasRecording;
    if(this.props.canvasRecording.recordingData === null && clickedButton === 'fiber_manual_record'){
      this.startRecording();
    } else if (this.props.canvasRecording.recordingData !== null && clickedButton === 'fiber_manual_record'){
      this.props.canvasRecording.recorder.resume();
    }
    if(clickedButton === 'stop') { 
      this.props.canvasRecording.recorder.stop();
      setTimeout(() => {
        this.review();
        console.log('DATA', this.props.canvasRecording.recordingData)
      },1000)
      
    };
    if(clickedButton === 'pause') this.props.canvasRecording.recorder.pause();
    this.props.changeRecordButton(clickedButton);
  }

  render(){
      let icon = [];
      if(this.props.canvasRecording.initialized){
        icon = this.props.canvasRecording.recordButtons;
      } 
     return (
      <Wrapper>  
      <Buttons style = {{display:'none'}}>
      {    
       icon.map((item, index)=>{
         return <Button key={`record${index}`} onClick={()=> this.handleButtonClick(item)}><i className="material-icons">{item}</i></Button>
        })
      }  
           
      </Buttons>  
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
    startRecordingStream:(stream) => { dispatch(canvasRecordingActions.startRecordingStream(stream))},
    exportVideo:(event) => { dispatch(canvasRecordingActions.exportVideo(event))},
    addCanvasImage:(image) => { dispatch(canvasRecordingActions.addCanvasImage(image))},
    changeRecordButton:(clickedButton) => { dispatch(canvasRecordingActions.changeRecordButton(clickedButton))}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Video);