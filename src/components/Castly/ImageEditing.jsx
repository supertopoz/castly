import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import styled from "styled-components";
import {NotificationManager} from 'react-notifications';
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


import * as castlyActions from '../../actions/castlyActions';

const Wrapper = styled.div`
   display: grid;
   background: black;
   color: white;
   left: 0px;
   top: 0px;
   display: grid;
`

class ImageEditing extends React.Component {

  

  componentDidMount(){

  }

  onImageLoaded(image){
    console.log('onCropComplete', image)
  }

  onCropComplete(crop){
    console.log('onCropComplete', crop)
  }

  onCropChange(crop){

    //this.setState({ crop })
  }

  render() {
    let img = "https://www.springfieldnewssun.com/rf/image_medium/Pub/p9/CmgSharedContent/2018/01/06/Images/GettyImages-155256950-RtD12E73KjzHTo558WCxcqN-680x383.jpeg"
    return (
      <Wrapper>
          <ReactCrop
          src={img}
          crop={{
            src: null,
            crop: {
              x: 10,
              y: 10,
              width: 80,
              height: 80
            }
          }}
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
        />
      </Wrapper>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(ImageEditing);