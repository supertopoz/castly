import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';

import * as castlyActions from '../../actions/castlyActions';

const Wrapper = styled.div``

const dropzone = {
  width: '130px',
  height: '83%',
  background: '#f0f0f0',
  color: '#4F4F4F',
  border: '1px dashed #4F4F4F',
  padding: '5%',
  textAlign: 'center',
}

class AddFiles extends React.Component {

  handleOnDrop(files, rejectedFiles){
   files.forEach(file =>{
    console.log(file)
    var image = new Image();
    image.src = file.preview;
    image.onload = function() {
      file['width'] = this.width; 
      file['height'] = this.height;    
   }
  })
   this.props.addImages(files)
  }  
  render(){
    return (
      <Wrapper>            
        <Dropzone 
          inputProps={{'id':"dropzone"}} 
          style={dropzone} 
          onDrop={this.handleOnDrop.bind(this)} 
          accept='image/*' 
          maxSize={5000000}>
          Drag and drop an image file here or click <label htmlFor="dropzone" >.</label>
        </Dropzone>

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


export default connect(mapStateToProps, mapDispatchToProps)(AddFiles);