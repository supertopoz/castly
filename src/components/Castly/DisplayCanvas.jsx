import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import {NotificationManager} from 'react-notifications';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';
import * as castlyActions from '../../actions/castlyActions';




const Wrapper = styled.div`

    display:grid;
    border-radius: 10px;
    grid-gap: 10px;
    cursor:pointer;
    margin:0 auto;
    padding-top: 10px;
    @media only screen and (min-width: 320px)  { 

    }
    @media only screen and (min-width: 768px)  {   

    } 
    @media only screen and (min-width: 1024px) { 

    }
`

const Canvas = styled.canvas`
   box-shadow: 2px 2px 5px 1px #9E9E9E;
`

class DisplayCanvas extends React.Component {
  constructor(){
    super();
    this.state = {
      mouse: [],
      image: {},
      video: {},
      videoDragging: false,
      imageDragging: false,
      resizeImage: false,
      resizeVideo: false,
      canvasWidth: 0,
      canvasHeight: 0, 
      imageStage: {x: 10, y:10, width: 1280, height: 720}
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


  onMouseDown(e, touch){
    if(!touch){
      e.preventDefault();
      e.stopPropagation();   
    }
    this.setState({imageDragging: false})
    this.setState({videoDragging: false})
    const mouseX = this.offset(e).x; // Scaled from hidden canvas
    const mouseY = this.offset(e).y; // Scaled from hidden canvas
    const imageStage = this.state.imageStage;
    if(this.props.images.currentImage !== null){

    if (Math.abs(mouseX - (imageStage.x + imageStage.width)) <40 && 
      Math.abs(mouseY - (imageStage.y + imageStage.height)) <40)  {
      this.setState({resizeImage: true})
      this.setState({mouse: [mouseX,mouseY]})
    }
    if((mouseX > imageStage.x && mouseX < imageStage.x + imageStage.width)&&
      (mouseY > imageStage.y && mouseY < imageStage.y + imageStage.height)){
        this.setState({imageDragging: true})
        this.setState({mouse: [mouseX,mouseY]})
      }

    }
    const vidToMove = this.props.canvasRecording.video.details
    if((mouseX > vidToMove.x && mouseX < vidToMove.x + vidToMove.width)&&
      (mouseY > vidToMove.y && mouseY < vidToMove.y + vidToMove.height)){
      this.setState({videoDragging: true})
      this.setState({mouse: [mouseX,mouseY]})
    }

    if (Math.abs(mouseX - (vidToMove.x + vidToMove.width)) <40 && 
      Math.abs(mouseY - (vidToMove.y + vidToMove.height)) <40)  {
      this.setState({resizeVideo: true})
      this.setState({mouse: [mouseX,mouseY]})
    }


    }

    moveImage(mouseX, mouseY){
      const imageStage = this.state.imageStage;
      const image = this.props.images.currentImage;
      const resize = this.props.images.resize;
      imageStage.x += Number(mouseX) - Number(this.state.mouse[0])
      imageStage.y += Number(mouseY) - Number(this.state.mouse[1])  
      this.setState({imageStage})
      this.props.addCanvasImage(image.img, imageStage, resize);
      this.setState({mouse: [mouseX,mouseY]})
    }

    moveVideo(mouseX, mouseY){
      const video = this.props.canvasRecording.video;
      video.details.x += Number(mouseX) - Number(this.state.mouse[0])
      video.details.y += Number(mouseY) - Number(this.state.mouse[1])    
      const image = this.props.images.currentImage;
      canvasRecordingActions.canvasVideoAnimation(video)
      const imageStage = this.state.imageStage;
      const resize = this.props.images.resize;
      if(image){
        this.props.addCanvasImage(image.img, imageStage, resize);   
      }
      this.setState({mouse: [mouseX,mouseY]})
    }

    resizeStage(mouseX, mouseY){
        const image = this.props.images.currentImage;
        const imageStage = this.state.imageStage;
        const resize = ''// this.props.images.resize;
        imageStage.width = Math.abs(imageStage.x - 1 - mouseX );
        imageStage.height = imageStage.width * 0.5625
        this.props.addCanvasImage(image.img, imageStage, resize);
        this.setState({imageStage})
        this.setState({mouse: [mouseX,mouseY]})
    }    

    resizeVideo(mouseX, mouseY){
        const video = this.props.canvasRecording.video
        const resize = this.props.images.resize;        
        video.details.width = Math.abs(Number(video.details.x) - 1 - Number(mouseX));
        video.details.height = video.details.width * (video.details.originalHeight/video.details.originalWidth)
        canvasRecordingActions.canvasVideoAnimation(video, resize)
        const imageStage = this.state.imageStage;
        const image = this.props.images.currentImage;
        if(image){
          this.props.addCanvasImage(image.img, imageStage, resize);   
        }
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
  //  this.props.currentImage(this.state.image);
    this.props.imageStageDetails(this.state.imageStage)
    this.setState({resizeImage: false})
    this.setState({resizeVideo: false})
    this.setState({imageDragging: false})
    this.setState({videoDragging: false})
  }

  onMouseTouch(e){
    console.log(this.offset(e).x)
  }

  render(){
    return (
      <Wrapper>        
      <Canvas
        onMouseDown = {(e) => this.onMouseDown(e)}
        onMouseMove = { this.debounceEvent(this.onMouseMove, 50)}
        onMouseUp = {(e) => this.onMouseUp(e)}
        onMouseOut = {(e) => this.onMouseUp(e)}        
        onTouchStart = {(e) => this.onMouseDown(e, true)}
        onTouchMove = { this.debounceEvent(this.onMouseMove, 50)}
        onTouchEnd = {(e) => this.onMouseUp(e)}
        width={this.state.canvasWidth} 
        height={this.state.canvasHeight} 
        id="canvas2"        
      />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { canvasRecording: state.canvasRecording, images: state.castly };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCanvasImage:(image, imageStage, resize) => { dispatch(castlyActions.addCanvasImage(image, imageStage, resize))},
    imageStageDetails: (details) => { dispatch(castlyActions.imageStageDetails(details)) },
    setMouse:(mouse) => { dispatch(castlyActions.setMouse(mouse))},
    currentImage: (image) => { dispatch(castlyActions.currentImage(image)) },
    setDragging:(dragging) => { dispatch(castlyActions.setDragging(dragging))},
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCanvas);