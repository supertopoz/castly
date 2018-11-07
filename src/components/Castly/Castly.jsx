import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

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

const Loader = styled.div`
  margin: 0 auto;
`

class Castly extends React.Component {

  render(){
    console.log(this.props.pageAnimations.showLoader)
    let display = <div></div>
    let loader = <div></div>
    if(this.props.pageAnimations.showLoader){
      loader = <Loader><img src={images.loading()}/></Loader>  
    }
    
    let displayCanvas = <DisplayCanvas style={{display:"none"}}/>

    let displayVideo = <Video />
    if(this.props.castly.images.length === 0){
      display =  <HowTo/>
    }
    return (

      <Wrapper>
        {display}             
        <DisplayImages/>
        <HiddenCanvas  width="1920" height="1080" id="canvas"/>   
        {loader}
        {displayCanvas}
        {displayVideo}
        {/*<img src={loading.loading()} />*/}
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