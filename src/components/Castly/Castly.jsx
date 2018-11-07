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

import * as images from '../images/images.js';
import * as castlyActions from '../../actions/castlyActions';
import * as loading from '../images/images';

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
   display: none;
`

class Castly extends React.Component {

  render(){
    let displayHowTo = ''   
    let displayVideo = ''
    if(this.props.castly.images.length === 0) displayHowTo =  <HowTo/>
    let plusButton = <ChooseMedia/>
    if(this.props.canvasRecording.initialized && typeof this.props.canvasRecording.dataStream === 'object') displayHowTo = ''
    if(this.props.canvasRecording.initialized && this.props.castly.images.length > 0) {
      plusButton = <AddFiles/>
      displayVideo = <Video/>
    } 
    return (
      <Wrapper>
        {plusButton}
        {displayHowTo}          
        <DisplayImages/>
        <HiddenCanvas  width="1920" height="1080" id="canvas"/>   
        <DisplayCanvas/>
        {displayVideo}
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
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Castly);