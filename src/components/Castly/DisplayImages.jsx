import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';


import * as castlyActions from '../../actions/castlyActions';

const Wrapper = styled.div`
   display: grid;
`

const Img = styled.img`

   background: darkgrey;
   @media only screen and (min-width: 320px)  { 
     width:150px;
     height:75px;
     object-fit:scale-down;
     object-fit:scale-up;
   }
    @media only screen and (min-width: 768px)  {   
      width:200px;
     height:150px;
     object-fit:scale-down;
     object-fit:scale-up;
    } 
    @media only screen and (min-width: 1024px) { 
     width:200px;
     height:150px;
     object-fit:scale-down;
     object-fit:scale-up;
    }
`

const Gallary = styled.div`
  display: grid;
  grid-gap: 10px;
  overflow: auto;
`


const ImageWrapper = styled.div`
  display: grid;
  color: white;
  background: red;
  padding: 10px;
  padding-bottom: 20px;
`

class DisplayImages extends React.Component {

  
  render(){
    const style = {gridTemplateColumns: `repeat(${this.props.castly.images.length}, auto)`}
    return (
      <Wrapper>   
      <Gallary style={style}>   
        {this.props.castly.images.map((image, index)=> {
          return(
          <ImageWrapper key={`image-${index}`} >
            <Img src={image.preview} alt="Uploaded Image Preview"/>
            <div>{image.name}</div>
          </ImageWrapper>
          )
          }
        )}
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