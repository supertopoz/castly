import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

import DisplayImages from './DisplayImages';
import Video from './Video';
import DisplayCanvas from './DisplayCanvas';

import * as castlyActions from '../../actions/castlyActions';

const Wrapper = styled.div`

    display:grid;
    grid-gap: 10px;
    cursor:pointer;
    margin:0 auto;
    padding-top: 5px;
    max-width: 700px;
    @media only screen and (min-width: 320px)  { 
    }
    @media only screen and (min-width: 768px)  {   
    } 
    @media only screen and (min-width: 1024px) { 

    }
`

const HiddenCanvas = styled.canvas`
   background: #03A9F4;
   display: none;
`


class Castly extends React.Component {
  
  render(){
    let display = <div></div>
    let displayCanvas = <DisplayCanvas/>
    let displayVideo = <Video />
    if(this.props.castly.images.length === 0){
      display = <div>Add picture files of a PDF document</div> 
      displayCanvas = <div></div>
      displayVideo = <div></div>
    }
    return (
      <Wrapper>
        {display}             
        <DisplayImages/>
   
        <HiddenCanvas  width="1920" height="1080" id="canvas"/>   
        {displayCanvas}
             {displayVideo}
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { castly: state.castly, pageAnimations: state.pageAnimations };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Castly);