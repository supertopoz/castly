import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
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
      width:98%;
    }
    @media only screen and (min-width: 768px)  {   
      width:70%;
    } 
    @media only screen and (min-width: 1024px) { 
      width:70%;
    }
`

const Canvas = styled.canvas`
   background: #03A9F4;
`

class DisplayCanvas extends React.Component {
  

  addImage(e){

     this.props.addCanvasImage('blank.png');
  }

  offset(e){
   const canvas=document.getElementById("canvas2");
   return {
    top: ()=> canvas.offsetTop - canvas.scrollTop + canvas.parentNode.offsetTop - canvas.parentNode.scrollTop,
    left: ()=> canvas.offsetLeft - canvas.scrollLeft + canvas.parentNode.offsetLeft - canvas.parentNode.scrollLeft
    }
  }

  onMouseDown(e){
    this.props.setDragging(true);
    e.preventDefault();
    e.stopPropagation();
    const mouseX = e.clientX - this.offset().left();
    const mouseY = e.clientY - this.offset().top();
    console.log(e)
    this.props.setMouse([mouseX,mouseY])
    //test to see if mouse is in 1+ images
  //  isDragging = false;
    //   images.forEach(imgToMove => {
    //   if((mouseX > imgToMove.x && mouseX < imgToMove.x + imgToMove.width) &&
    //      (mouseY > imgToMove.y && mouseY < imgToMove.y + imgToMove.height)){
    //  //  imgToMove.isDragging = true;
    //    // isDragging = true;
    //   }
    // })
    // startX = mouseX;
    // startY = mouseY;
  }

  onMouseMove(e){
    // const canvas=document.getElementById("canvas2");
    // var ctx = canvas.getContext("2d");
    //if(!isDragging){return;}
 
    e.preventDefault()
    e.stopPropagation()
       if(!this.props.images.dragging) return
    const mouseX = e.clientX - this.offset().left();
    const mouseY = e.clientY - this.offset().top();
    console.log(this.props.images.mouse)
    // images.forEach(image => {
    //   if(image.isDragging) {
    //     image.x+= mouseX - startX;
    //     image.y+= mouseY - startY;
    //   }
    //  })
    //startX = mouseX;
    //startY = mouseY;
    let x = mouseX - this.props.images.mouse[0]
    let y = mouseY - this.props.images.mouse[1]
    let image = this.props.images.currentImage;
    // images.forEach(image => {
     //ctx.drawImage(image.preview, image.x, image.y, image.width , image.height);
     if(image){
         this.props.addCanvasImage(image.preview, x, y);
     }

    // })

}
    onMouseUp(){
      this.props.setDragging(false);
    }

  render(){
    return (
      <Wrapper>        
      <Canvas

        onMouseDown = {(e) => this.onMouseDown(e)}
        onMouseMove = {(e) => this.onMouseMove(e)}
        onMouseUp = {(e) => this.onMouseUp(e)}
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
    setDragging:(dragging) => { dispatch(castlyActions.setDragging(dragging))},
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCanvas);