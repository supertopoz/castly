'use strict';
import React from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';


import * as castlyActions from '../../actions/castlyActions';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';
import * as images from '../images/images';

const Wrapper = styled.div`
    display:grid;
`

const Media = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute; 
  top: 0px;
  left: 0px; 
  background: rgba(0, 0, 0, 0.5);
`

const InfoPanel = styled.div`
  display: grid;
  background: white;
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 10%;
  height: 400px;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
`

const Img = styled.img`
  margin: 0 auto;
`

const Loader = styled.div`
    display: grid;
    text-align: center;
`

const Error = styled.div`
  display: grid;
  text-align: center;
`
const Button = styled.div`
    display:flex;
    width: 100px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    background: #aa00ff;
    padding: 10px;
    color: white;
    border-radius: 10px;
    text-align: center;
    max-height: 25px;
    &:hover{
      background: white;
      color:#aa00ff;
      border: 1px solid;
      cursor:pointer;
    }
 `

const MediaChoice = styled.div`
  display: grid;
  padding: 2%;
`
const Form = styled.form`
  display: grid;
  border: 1px solid;
  padding: 2%;
  border-radius: 10px;
`

const Option = styled.option`
  max-width: 100px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;

`
const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

class ChooseMedia extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mediaOptions: [],
      hasMedia: false,
      mic: {},
      camera: {},
      mediaMessage: 'Checking your media options...',
      error: false,
      display: true
    }
    this.handleModelClose = this.handleModelClose.bind(this)
    this.handleModelOkay = this.handleModelOkay.bind(this)
    this.handleCameraChange = this.handleCameraChange.bind(this)
    this.handleMicChange = this.handleMicChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCameraChange(e){
    this.setState({camera:e.target.value})
  } 

  handleMicChange(e){
    this.setState({mic:e.target.value})
  }

  handleModelClose(){
    this.setState({display: false})
  }

  handleSubmit() {
    console.log(this.state)
  }
  componentDidMount(){
    let that = this;



    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(error);

    const error = (e) =>{
      this.setState({mediaMessage: `Opps something is not right: ${e}`})
      this.setState({error: true})
    }


    function gotDevices(deviceInfos) {
      let mediaOptions = []
      let deviceOption = {
        audioInput: null,
        audioOutputSelect: null,
        videoSelect: 0,
        value: null
      }
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === 'audioinput') {
          deviceOption.audioInput = deviceInfo.label //|| 'Microphone ' + (audioInputSelect.length + 1);
        } else if (deviceInfo.kind === 'audiooutput') {
          deviceOption.audioOutputSelect = deviceInfo.label //|| 'Speaker ' + (audioOutputSelect.length + 1);
        } else if (deviceInfo.kind === 'videoinput') {
          deviceOption.videoSelect = deviceInfo.label || 'Camera ' + (Number(deviceOption.videoSelect) + 1);

        }
        deviceOption.value = deviceInfo.deviceId;
        mediaOptions.push(deviceOption)
        deviceOption = {
        audioInput: null,
        audioOutputSelect: null,
        videoSelect: 0,
        value: null
      }
    }
    that.setState({mediaOptions})
    that.setState({hasMedia: true})
  }
  
   // const currentCanvasObjects = this.props.castly.currentCanvasObjects
   // if(this.props.canvasRecording.initialized === false){
   // // this.props.initializeUserMedia(currentCanvasObjects);
   //  }
   // Show loader until media options are captures
  }

  handleModelOkay(){
    console.log('working')
    //this.setState({display: false})
    const currentCanvasObjects = this.props.castly.currentCanvasObjects
    this.props.initializeUserMedia(currentCanvasObjects);
  }

  render(){
    let loader =  <Loader><Img src={images.loading()}/>{this.state.mediaMessage}</Loader>
    let error = '';
    if(this.state.hasMedia) loader ='';
    if(this.state.error){
      error = 
      <Error>
        <h1>Opps! That's an error</h1>
        <div>
          We can't get your video and/or audio input. Below is the error message: 
        </div>
        <div>
          {this.state.mediaMessage}
        </div>
          <Button onClick={() => this.handleModelClose()}>Close</Button>
      </Error>
    }
    let mediaChoice = '';
    let startMedia = '';
    if(!this.state.error && this.state.hasMedia){
      startMedia = <div>
        <h3>Castly want's to start your camera and mic. Then upload content</h3>
        <Buttons>
          <Button onClick={() => this.handleModelOkay()}>Okay</Button>
          <Button onClick={() => this.handleModelClose()}>Cancel</Button>
        </Buttons>
      </div>
    }
    if(!this.state.error && this.state.hasMedia){
      mediaChoice = 
      <MediaChoice>
        <h3>Select Prefered Camera and Microphone</h3>
        <label>
          Camera:
          <select value={this.state.value} onChange={this.handleCameraChange}>
          {this.state.mediaOptions.map((item, index)=>{
            if(item.videoSelect){
            return  <Option key={`camera-${index}`} value={item.value}>{item.videoSelect}</Option>
            }
          })}           
          }
          </select>
        </label>
        <label>
          Microphone:
          <select type="" value={this.state.value} onChange={this.handleMicChange}>
          {this.state.mediaOptions.map((item, index)=>{
            if(item.audioInput){
            return  <Option key={`mic-${index}`} value={item.value}>{item.audioInput}</Option>
            }
          })}           
          }
          </select>
        </label>
        <Button onClick={this.handleSubmit}>Save</Button>
      </MediaChoice>
    }
    let wrapper = <div></div>
      if(this.state.display){
        wrapper = (

            <Media >
            <InfoPanel>
            {error}
            {loader}
            {startMedia}
            {mediaChoice}
            </InfoPanel>
            </Media>

        )    
    }
    return (  
      <Wrapper>   
      {wrapper}
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { castly: state.castly, pageAnimations: state.pageAnimations };
};

const mapDispatchToProps = (dispatch) => {
  return {
     initializeUserMedia:(currentCanvasObjects) => {dispatch(canvasRecordingActions.initializeUserMedia(currentCanvasObjects))}
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChooseMedia);