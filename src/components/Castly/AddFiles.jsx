import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';


import * as castlyActions from '../../actions/castlyActions';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';



const Wrapper = styled.div``

const Span = styled.span`
    position: absolute;
    left: 0;
    top: 50%;
    height: 100%;
    width: 100%;
    text-align: center;
    margin-top: -19px;
    color: #FFF;
    cursor: pointer;
`

const dropzone = {
    display: "grid",
    alignTtems: "center",
    justifyContent: "center",
    backgroundColor: "#b818ff",
    borderRadius: "999em",
    width: "56px",
    height: "56px",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
    lineHeight: "1",
    fontSize: "36px",
    position: "absolute",
    top: "25px",
    right: "30px",
    color: "white",
    cursor: "pointer"
}

class AddFiles extends React.Component {

  handleOnDrop(files, rejectedFiles){
   // show loader 
  //  console.log(files)
   files.forEach(file =>{
    var image = new Image();
    image.src = file.preview;
    image.onload = function() {
      file['width'] = this.width; 
      file['height'] = this.height;    
   }
  })
   this.props.addImages(files);   
   const currentCanvasObjects = this.props.castly.currentCanvasObjects
   if(this.props.canvasRecording.initialized === false){
     this.props.initializeUserMedia(currentCanvasObjects)
    }
  }  
  render(){
    return (         
        <Dropzone 
          inputProps={{'id':"droppedzone", "style":{width: "1px"}}} 
          style={dropzone} 
          onDrop={this.handleOnDrop.bind(this)} 
          maxSize={5000000}
          accept={['application/pdf', 'image/*']}
        >
        <Span><i className="material-icons">add</i></Span>
        {/* <label htmlFor="droppedzone" >   
          
        </label>*/}
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
    initializeUserMedia:(currentCanvasObjects) => {dispatch(canvasRecordingActions.initializeUserMedia(currentCanvasObjects))}
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddFiles);