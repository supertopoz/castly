import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

import DisplayImages from './DisplayImages';
import Video from './Video';
import DisplayCanvas from './DisplayCanvas';

import * as castlyActions from '../../actions/castlyActions';
import * as loading from '../images/loading';

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

const InfoGraphics = styled.div`
  display:grid;
  grid-gap: 20px;
  border: 1px lightgrey solid;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px lightgrey;
  padding: 20px;
`

const Header = styled.div`
  display:grid;
  color: #6b6b6b;
  font-size: 2em;
  text-align: center; 
`

const Image = styled.img`
  margin: 0 auto;
`

const Info = styled.div`
  text-align: center;
  font-size: 1.3em
  color: #6b6b6b;
`


class Castly extends React.Component {

  render(){
    let display = <div></div>
    let displayCanvas = <DisplayCanvas/>
    let displayVideo = <Video />
    if(this.props.castly.images.length === 0){
      display = <InfoGraphics>
      <Header>Simple Tool for Screen Casting Presentations</Header>
      <Info>Don't forget all popular presentation tools export to PDF.</Info>
      <Image src={loading.uploadDiagram()}/>
      </InfoGraphics> 
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