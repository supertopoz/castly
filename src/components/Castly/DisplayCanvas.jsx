'use strict';
import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import throttle from 'lodash.throttle';
import {NotificationManager} from 'react-notifications';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';
import * as castlyActions from '../../actions/castlyActions';
import * as pageAnimations from '../../actions/pageAnimations';

const Wrapper = styled.div`
    display:grid;
    border-radius: 10px;
    grid-gap: 10px;
    cursor:pointer;
    margin:0 auto;
    padding-top: 10px;
`

class DisplayCanvas extends React.Component {
  constructor(){
    super();
    this.state = {
      mouse: [],
      videoDragging: false,
      imageDragging: false,
      resizeImage: false,
      resizeVideo: false,
    };
  }



  offset(e){
   const rect = document.getElementById("canvas2").getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;
    if(e.touches) x = e.touches[0].clientX;
    if(e.touches) y = e.touches[0].clientY;

    return {   
      x: (x - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (y - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  }

  debounceEvent(...args) {
    this.debouncedEvent = throttle(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    }
  }

  disableScrolling(){
    var x = window.scrollX || window.pageXOffset || document.body.scrollLeft;
    var y = window.scrollY || window.pageYOffset || document.body.scrollTop;
    window.onscroll=function(){window.scrollTo(x, y);};
  }

  enableScrolling(){
    window.onscroll=function(){};
   }

  onMouseDown(e, touch){
    if(!touch){
      e.preventDefault();
      e.stopPropagation();   
    }
    this.setState({imageDragging: false})
    this.setState({videoDragging: false})
    const mouseX = this.offset(e).x; // Scaled from hidden canvas
    const mouseY = this.offset(e).y; // Scaled from hidden canvas
    const imageStage = this.props.castly.currentCanvasObjects.imageStage;
    const vidToMove = this.props.canvasRecording.video.details
    this.props.castly.currentCanvasObjects.hldrLight = false;
    this.props.castly.currentCanvasObjects.vLight = false;
    if(this.props.castly.currentCanvasObjects.currentImage !== null){

      if (Math.abs(mouseX - (imageStage.x + imageStage.width)) <80 && 
        Math.abs(mouseY - (imageStage.y + imageStage.height)) <80)  {
        this.props.castly.currentCanvasObjects.hldrLight = true;
        this.disableScrolling();
        this.setState({resizeImage: true})
        this.setState({mouse: [mouseX,mouseY]})
      }
      if((mouseX > imageStage.x && mouseX < imageStage.x + imageStage.width)&&
        (mouseY > imageStage.y && mouseY < imageStage.y + imageStage.height)){
          // highlight Image
          this.disableScrolling();
          this.props.castly.currentCanvasObjects.hldrLight = true;
          this.setState({imageDragging: true})
          this.setState({mouse: [mouseX,mouseY]})
        }

      }

      if((mouseX > vidToMove.x && mouseX < vidToMove.x + vidToMove.width)&&
        (mouseY > vidToMove.y && mouseY < vidToMove.y + vidToMove.height)){
        // highlight video
      this.props.castly.currentCanvasObjects.vLight = true;
        this.disableScrolling();
        this.setState({videoDragging: true})
        this.setState({mouse: [mouseX,mouseY]})
      }

      if (Math.abs(mouseX - (vidToMove.x + vidToMove.width)) <80 && 
        Math.abs(mouseY - (vidToMove.y + vidToMove.height)) <80)  {
        this.props.castly.currentCanvasObjects.vLight = true;
        this.disableScrolling();
        this.setState({resizeVideo: true})
        this.setState({mouse: [mouseX,mouseY]})
      }
    }
    moveImage(mouseX, mouseY){
      const imageStage = this.props.castly.currentCanvasObjects.imageStage;
      imageStage.x += Math.floor(Number(mouseX) - Number(this.state.mouse[0]))
      imageStage.y += Math.floor(Number(mouseY) - Number(this.state.mouse[1]))
      this.setState({mouse: [mouseX,mouseY]})

    }
    moveVideo(mouseX, mouseY){
      const video = this.props.canvasRecording.video;
      video.details.x += Math.floor(Number(mouseX) - Number(this.state.mouse[0]))
      video.details.y += Math.floor(Number(mouseY) - Number(this.state.mouse[1]))    
      this.setState({mouse: [mouseX,mouseY]})
    }
    resizeStage(mouseX, mouseY){
      const imageStage = this.props.castly.currentCanvasObjects.imageStage;
      imageStage.width = Math.floor(Math.abs(imageStage.x - 1 - mouseX ));
      imageStage.height = Math.floor(imageStage.width * 0.5625);
      this.setState({mouse: [mouseX,mouseY]})
    }    
    resizeVideo(mouseX, mouseY){
        const video = this.props.canvasRecording.video     
        video.details.width = Math.floor(Math.abs(Number(video.details.x) - 1 - Number(mouseX)));
        video.details.height = Math.floor(video.details.width * (video.details.originalHeight/video.details.originalWidth))
        this.setState({mouse: [mouseX,mouseY]})
    }
    onMouseMove(e){ 
      const mouseX = this.offset(e).x; // Scaled from hidden canvas
      const mouseY = this.offset(e).y *1.05; // Scaled from hidden canvas
      if(this.state.imageDragging)this.moveImage(mouseX, mouseY)
      if(this.state.videoDragging)this.moveVideo(mouseX, mouseY)
      if(this.state.resizeImage) this.resizeStage(mouseX, mouseY)
      if(this.state.resizeVideo) this.resizeVideo(mouseX, mouseY)
    }

  onMouseUp(){
    this.setState({resizeImage: false})
    this.setState({resizeVideo: false})
    this.setState({imageDragging: false})
    this.setState({videoDragging: false})
    this.enableScrolling();
  }

  render(){
    return (
      <Wrapper>        
      <canvas
        style = {{display: this.props.pageAnimations.displayCanvas}}
        onMouseDown = {(e) => this.onMouseDown(e)}
        onMouseMove = { this.debounceEvent(this.onMouseMove, 50)}
        onMouseUp = {(e) => this.onMouseUp(e)}
        onMouseOut = {(e) => this.onMouseUp(e)}        
        onTouchStart = {(e) => this.onMouseDown(e, true)}
        onTouchMove = { this.debounceEvent(this.onMouseMove, 50)}
        onTouchEnd = {(e) => this.onMouseUp(e)}
        width= {0}
        height= {0}
        id="canvas2"        
      />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { canvasRecording: state.canvasRecording, castly: state.castly, pageAnimations: state.pageAnimations};
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentImage: (image) => { dispatch(castlyActions.currentImage(image)) },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCanvas);