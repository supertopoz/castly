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
   background: #03A9F4;
`

class DisplayCanvas extends React.Component {

  offset(e){
   const rect = document.getElementById("canvas2").getBoundingClientRect();
    return {   
      x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  }

  debounceEvent(...args) {
    this.debouncedEvent = throttle(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    }
  }

  onMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.setDragging(false);
    this.props.videoDragging(false);
    const mouseX = this.offset(e).x; // Scaled from hidden canvas
    const mouseY = this.offset(e).y * 1.05; // Scaled from hidden canvas
    const imgToMove = this.props.images.currentImage.details

    if((mouseX > imgToMove.x && mouseX < imgToMove.x + imgToMove.width *1.05)&&
      (mouseY > imgToMove.y && mouseY < imgToMove.y + imgToMove.height *1.05)){
      console.log('Hit image')
      this.props.setDragging(true);
      this.props.setMouse([mouseX,mouseY])
    }
    const vidToMove = this.props.canvasRecording.video.details
    if((mouseX > vidToMove.x && mouseX < vidToMove.x + vidToMove.width)&&
      (mouseY > vidToMove.y && mouseY < vidToMove.y + vidToMove.height *1.05)){
      console.log('Hit vid')
      this.props.videoDragging(true);
      this.props.setMouse([mouseX,mouseY])
    }

    }

  onMouseMove(e){ 

    //if(!this.props.images.dragging) return
    


    e.preventDefault()
    e.stopPropagation()   
    const mouseX = this.offset(e).x; // Scaled from hidden canvas
    const mouseY = this.offset(e).y *1.05; // Scaled from hidden canvas
    const image = this.props.images.currentImage;
    if(this.props.images.dragging){

      image.details.x += Number(mouseX) - Number(this.props.images.mouse[0])
      image.details.y += Number(mouseY) - Number(this.props.images.mouse[1])  
      this.props.currentImage(image);
      this.props.addCanvasImage(image.img, image.details.x, image.details.y);
      this.props.setMouse([mouseX,mouseY])
    } 
    else if(this.props.canvasRecording.videoDragging){
    
      const video = this.props.canvasRecording.video;
      video.details.x += Number(mouseX) - Number(this.props.images.mouse[0])
      video.details.y += Number(mouseY) - Number(this.props.images.mouse[1])      
      canvasRecordingActions.canvasVideoAnimation(video, image.img, image.details.x, image.details.y )
      this.props.setMouse([mouseX,mouseY]);
    } else {
      return
    }
    

  }
  onMouseUp(){
    if(this.props.images.dragging){
    this.props.setDragging(false);
    } else if(this.props.canvasRecording.videoDragging){
    this.props.videoDragging(false);
    } else {
      return
    }
    
  }

  render(){
    return (
      <Wrapper>        
      <Canvas
        onMouseDown = {(e) => this.onMouseDown(e)}
        onMouseMove = { this.debounceEvent(this.onMouseMove, 100)}
        onMouseUp = {(e) => this.onMouseUp(e)}
        onMouseOut = {(e) => this.onMouseUp(e)}
        width="700" 
        height="300" 
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
    addCanvasImage:(image, top, left) => { dispatch(castlyActions.addCanvasImage(image, top,left))},
    setMouse:(mouse) => { dispatch(castlyActions.setMouse(mouse))},
    currentImage: (image) => { dispatch(castlyActions.currentImage(image)) },
    setDragging:(dragging) => { dispatch(castlyActions.setDragging(dragging))},
    videoDragging:(dragging) => { dispatch(canvasRecordingActions.videoDragging(dragging))},  
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCanvas);