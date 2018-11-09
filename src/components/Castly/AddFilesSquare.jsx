import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';

import * as images from '../images/images.js';
import * as castlyActions from '../../actions/castlyActions';
import * as pageAnimationActions from '../../actions/pageAnimations';



const Wrapper = styled.div``

const Span = styled.span`
    text-align: center;
    color: #FFF;
    cursor: pointer;
`

const dropzone = {
    display: "flex",
    width: "25%",
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid",
    background: "#aa00ff",
    padding: "10px",
    color: "white",
    borderRadius: "10px",
    textAlign: "center",
    maxHeight: "25px"
    }

class AddFiles extends React.Component {

  handleRejectedFiles(files){    
    files.forEach(file => {
        NotificationManager.warning(`${file.name} is too large. Max file size is 5 mb`, 'Opps!', 10000)
    })
  }

  handleOnClick(files, rejectedFiles){
    this.props.showLoader(true);
    if(rejectedFiles) this.handleRejectedFiles(rejectedFiles)
    let filteredFiles =  files.reduce((arc,file,index) =>{
      if(index === 0 && file.type === 'application/pdf'){
        NotificationManager.info('PDF processing started', 'Info', 2000)
        file.preview = images.loading();
        arc.push(file);
      }
      if(index >= 1 && file.type === 'application/pdf'){
        NotificationManager.warning('Castly can only process one PDF document by itself.', 'Opps!', 2000)
      } 
      else if(file.type.indexOf('image') >= 0) {
        var image = new Image();
        image.src = file.preview;
        image.onload = function() {
          file['width'] = this.width; 
          file['height'] = this.height; 
        }
        arc.push(file)
      }
      return arc
    }, [])
    this.props.addImages(filteredFiles);  
  }  
  render(){
    return (         
        <Dropzone 
          inputProps={{'id':"droppedzone", "style":{width: "1px"}}} 
          style={dropzone} 
          onDrop={this.handleOnClick.bind(this)} 
          maxSize={5000000}
          accept={['application/pdf', 'image/*']}
        >
        <Span>Okay</Span>
        {/* <label htmlFor="droppedzone"></label>*/}
        </Dropzone>
    );
  }
}


const mapStateToProps = (state) => {
  return { castly: state.castly, canvasRecording: state.canvasRecording};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => { dispatch(castlyActions.addImages(images)) },    
    showLoader:(loader) => {dispatch(pageAnimationActions.showLoader(loader))}
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddFiles);