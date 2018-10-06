import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';
import AddFiles from './AddFiles';

import * as castlyActions from '../../actions/castlyActions';

const Wrapper = styled.div`
   display: grid;
`

const Img = styled.img`
   padding: 1px;
   width:150px;
   height:75px;
   object-fit:scale-down;
   object-fit:scale-up;
  `
const Gallary = styled.div`
  display: grid;
  grid-gap: 10px;
  overflow: auto;
`
const ImageWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  color: white;
  background-color: #222;
  padding-bottom: 10px;
  box-shadow: 1px 1px 1px 1px #9E9E9E;
  margin-bottom: 10px;
`

const ImgName = styled.div`
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 5px;
  color: #d6d6d6;
  width:146px;

`

const Controls = styled.div`
  margin-top: 5px;
  display: grid;
  align-items: center;
  justify-content: center;
`

const Button = styled.div`
    padding: 2px;
    width: 40px;
    text-align: center
    background-color: #454545;
    background-image: -webkit-linear-gradient(top,#3e3e3e,#333);
    border: 1px solid #141414;
    box-shadow: 0 1px 0 rgba(255,255,255,.06), 1px 1px 0 rgba(255,255,255,.03), -1px -1px 0 rgba(0,0,0,.02), inset 1px 1px 0 rgba(255,255,255,.05);
    color: #aaa;
    cursor: pointer;
    text-shadow: 0 -1px 0 rgba(0,0,0,.5);
`

class DisplayImages extends React.Component {

  
  render(){
    const style = {gridTemplateColumns: `repeat(${this.props.castly.images.length +1}, auto)`}
    return (
      <Wrapper>   
      <Gallary style={style}> 
      
        {this.props.castly.images.map((image, index)=> {
          return(
          <ImageWrapper key={`image-${index}`} >
            <ImgName>{image.name}</ImgName>
            <Img src={image.preview} alt="Uploaded Image Preview"/>
            <Controls>
            <Button>Cast</Button>
            </Controls>
          </ImageWrapper>
          )
          }
        )}
        <AddFiles/>
        </Gallary>    
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { castly: state.castly };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => { dispatch(castlyActions.addImages(images)) },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DisplayImages);