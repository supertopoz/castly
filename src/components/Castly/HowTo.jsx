import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';

import ChooseMedia from './ChooseMedia'
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

const InfoGraphics = styled.div`
  display:grid;
  grid-gap: 5px;
  border: 1px lightgrey solid;
  border-radius: 10px;
  padding: 5%;
`

const Header = styled.div`
  display:grid;
  color: #6b6b6b;
  font-size: 2em;
  text-align: center; 
`

const Image = styled.img`
  padding-top: 2%;
  padding-bottom: 2%;
  margin: 0 auto;
`

const InfoBlock = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  border-radius: 10px;
  border: 1px solid lightgrey;
  padding: 10px;
  @media only screen and (min-width: 320px)  { 
    grid-template-columns: 1fr;     
  }
  @media only screen and (min-width: 768px)  {  
    grid-template-columns: 1fr 1fr; 
  } 
  @media only screen and (min-width: 1024px) { 
  }

`

const Info = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.3em
  color: #6b6b6b;
`

class HowTo extends React.Component {

  render(){

    return (
      <Wrapper>
      <InfoBlock>
        <div>
        <Header>Step 1</Header>
        <Info>Download your presentation slides as a PDF document</Info>
        </div>
        <Image src={loading.step1()}/>
      </InfoBlock>
      <InfoBlock>
        <div>
        <Header>Step 2</Header>
        <Info>Upload your PDF document to Castly (images are also possible).</Info>
        </div>
        <Image src={loading.step2()}/>

      </InfoBlock>
      <InfoBlock>
        <div>
        <Header>Step 3</Header>
        <Info>Record your Castly, then download as an MP4 video.</Info>
        </div>
        <Image src={loading.step3()}/>
      </InfoBlock>
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


export default connect(mapStateToProps, mapDispatchToProps)(HowTo);