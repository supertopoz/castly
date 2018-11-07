import React from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';
import AddFilesSquare from './AddFilesSquare';

import * as castlyActions from '../../actions/castlyActions';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';
import * as images from '../images/images';

const Wrapper = styled.div``

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
  color: #6b6b6b;
`


const PlusButton = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: #b818ff;
    border-radius: 999em;
    width: 56px;
    height: 56px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    line-height: 1;
    font-size: 36px;
    position: absolute;
    top: 25px;
    right: 30px;
    color: white;
    cursor: pointer
`
const Span = styled.span`
    text-align: center;
    cursor: pointer;
`

const Warning = styled.div`
  background: #FFB6C1;
  padding: 20px;
  color: #6b6b6b;

`
const ErrorHeading = styled.div`
  display: grid;
  grid-template-columns: 10fr 1fr;
  color: #6b6b6b;
`

class ChooseMedia extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mediaOptions: [],
      hasMedia: true,
      mic: {},
      camera: {},
      mediaMessage: 'Checking your media options...',
      error: false,
      display: false
    }
   this.handlePlusButtonClick =   this.handlePlusButtonClick.bind(this)
   this.handleModelClose =   this.handleModelClose.bind(this)
  }

  handleModelClose(){
      this.setState({display: false})
    }

  handlePlusButtonClick(){
    this.setState({display:true})
    const currentCanvasObjects = this.props.castly.currentCanvasObjects
    this.props.initializeUserMedia(currentCanvasObjects);
   // Show loader until media options are captures
  }

  

  render(){
    let loader =  <Loader><Img src={images.loading()}/>{this.state.mediaMessage}</Loader>
    let error = '';
    let sucess = ''
    if(this.props.canvasRecording.initialized ){
      loader = ''
      sucess = <div>
      Your camera and mircophone are now working. Please select files to add to your castly.
      <AddFilesSquare/>
      </div>
    }
    let dataStream = this.props.canvasRecording.dataStream;
    if(dataStream === null) dataStream = 0;
    if(typeof dataStream === 'string'){
      sucess = '';
      error = 
      <Error>
        <ErrorHeading>
        <h1>Opps! That's an error</h1>
        <i onClick={this.handleModelClose} className="material-icons">close</i>
        </ErrorHeading>
        <Warning>
          {this.props.canvasRecording.dataStream}
        </Warning>
      </Error>
    }
    
    let mainContent = <div></div>
      if(this.state.display){
        mainContent = (

            <Media >
            <InfoPanel>
            {error}
            {loader}
            {sucess}
            </InfoPanel>
            </Media>
        )    
    }
    return (  
      <Wrapper> 
      <div>
      <PlusButton onClick={this.handlePlusButtonClick}>
      <Span><i className="material-icons">add</i></Span>
      </PlusButton>
      </div>  
      {mainContent}
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { castly: state.castly, pageAnimations: state.pageAnimations, canvasRecording: state.canvasRecording };
};

const mapDispatchToProps = (dispatch) => {
  return {
     initializeUserMedia:(currentCanvasObjects) => {dispatch(canvasRecordingActions.initializeUserMedia(currentCanvasObjects))}
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChooseMedia);