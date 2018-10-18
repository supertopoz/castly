import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import throttle from 'lodash.throttle';
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

  offset(){
   const canvas=document.getElementById("canvas2");
   const rect = canvas.getBoundingClientRect();
    return { 
      top: rect.top + window.pageYOffset, 
      left: rect.left + window.pageXOffset,
    };
  }

  onMouseDown(e){
    this.props.setDragging(true);
    e.preventDefault();
    e.stopPropagation();
    const mouseX = e.clientX - this.offset().left;
    const mouseY = e.clientY - this.offset().top;
    const imgToMove = this.props.images.currentImage.details
    this.props.setDragging(false);
    if((mouseX > imgToMove.x && mouseX < imgToMove.x + imgToMove.width)){
      //  imgToMove.isDragging = true;
      this.props.setDragging(true);
    }
    this.props.setMouse([mouseX,mouseY])
  }

  debounceEvent(...args) {
    this.debouncedEvent = throttle(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    }
  }

  onMouseMove(e){ 
    if(!this.props.images.dragging) return
    e.preventDefault()
    e.stopPropagation()
    
    const mouseX = e.clientX - this.offset().left;
    const mouseY = e.clientY - this.offset().top;
    const image = this.props.images.currentImage;
    image.x += Number(mouseX) - Number(this.props.images.mouse[0])
    image.y += Number(mouseY) - Number(this.props.images.mouse[1])
    
    this.props.currentImage(image);
    this.props.setMouse([mouseX,mouseY])
     if(image){
         this.props.addCanvasImage(image.preview, mouseX, mouseY);
     }

    // })

}
    onMouseUp(){
      if(!this.props.images.dragging) return
      this.props.setDragging(false);
    }

  render(){
    return (
      <Wrapper>        
      <Canvas

        onMouseDown = {(e) => this.onMouseDown(e)}
        onMouseMove = { this.debounceEvent(this.onMouseMove, 200)}
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
    addCanvasImage:(image, top, left) => { dispatch(canvasRecordingActions.addCanvasImage(image, top,left))},
    setMouse:(mouse) => { dispatch(castlyActions.setMouse(mouse))},
    currentImage: (image) => { dispatch(castlyActions.currentImage(image)) },
    setDragging:(dragging) => { dispatch(castlyActions.setDragging(dragging))},
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCanvas);