'use strict';
import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';

import { loading } from '../images/images.js';
import { addImages } from '../../actions/castlyActions';
import { showLoader, displayCanvas} from '../../actions/pageAnimations';



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
    right: "40px",
    color: "white",
    cursor: "pointer"
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
        file.preview = loading();
        arc.push(file);
      }
      if(index >= 1 && file.type === 'application/pdf'){
        NotificationManager.warning('Castly can only process one PDF document by itself.', 'Opps!', 2000)
      } 
      else if(file.type.indexOf('image') >= 0) {
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
        <Span><i className="material-icons">add</i></Span>
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
    addImages: (images) => { dispatch(addImages(images)) },    
    showLoader:(loader) => {dispatch(showLoader(loader))},
    displayCanvas:(display) => {dispatch(displayCanvas(display))} 
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddFiles);