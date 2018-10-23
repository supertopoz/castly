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
  constructor(){
    super();
    this.state = {
      mouse: [],
      image: {},
      videoDragging: false,
      imageDragging: false,
      resizeImage: false,
      canvasWidth: 768,
      canvasHeight: 432
    };
  }

  componentDidMount(){

    var that = this
    function t(){
      var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth
      if(x < 700){
      that.setState({canvasWidth: x-40})
      that.setState({canvasHeight: (x-40)*0.5625})
      } else {
          that.setState({canvasWidth: 700})
          that.setState({canvasHeight: (x-40)*0.5625})
      }
    }
    window.onload = t;
  //  window.onresize = t;
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

  onMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({imageDragging: false})
    this.setState({videoDragging: false})
    const mouseX = this.offset(e).x; // Scaled from hidden canvas
    const mouseY = this.offset(e).y; // Scaled from hidden canvas
    console.log(mouseX)
    console.log(mouseY)
    if(this.props.images.currentImage !== null){

      const imgToMove = this.props.images.currentImage.details
      if((mouseX > imgToMove.x && mouseX < imgToMove.x + imgToMove.width)&&
        (mouseY > imgToMove.y && mouseY < imgToMove.y + imgToMove.height)){
          console.log('in current image')
        this.setState({imageDragging: true})
        this.setState({mouse: [mouseX,mouseY]})
      }
    if (Math.abs(mouseX - (imgToMove.x + imgToMove.width)) <40 && 
      Math.abs(mouseY - (imgToMove.y + imgToMove.height)) <40)  {
      console.log('hit corner')
      this.setState({resizeImage: true})
      this.setState({mouse: [mouseX,mouseY]})
      // dragBR = true;
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw(rect, rect2);
    }
    }
    const vidToMove = this.props.canvasRecording.video.details
    if((mouseX > vidToMove.x && mouseX < vidToMove.x + vidToMove.width)&&
      (mouseY > vidToMove.y && mouseY < vidToMove.y + vidToMove.height)){
      this.setState({videoDragging: true})
      this.setState({mouse: [mouseX,mouseY]})
    }


    }

    moveImage(mouseX, mouseY){
      const image = this.props.images.currentImage;
      image.details.x += Number(mouseX) - Number(this.state.mouse[0])
      image.details.y += Number(mouseY) - Number(this.state.mouse[1])  
      this.setState({image})
      this.props.addCanvasImage(image.img, image.details.x, image.details.y, image.corner);
      this.setState({mouse: [mouseX,mouseY]})
    }

    moveVideo(mouseX, mouseY){
      const video = this.props.canvasRecording.video;
      video.details.x += Number(mouseX) - Number(this.state.mouse[0])
      video.details.y += Number(mouseY) - Number(this.state.mouse[1])    
      const image = this.props.images.currentImage;
      canvasRecordingActions.canvasVideoAnimation(video)
      if(image){
        this.props.addCanvasImage(image.img, image.details.x, image.details.y, image.corner);   
      }
      this.setState({mouse: [mouseX,mouseY]})
    }

    cornerMove(mouseX, mouseY){
        const image = this.props.images.currentImage;

        // TO DO - CHANGE THE CURENT IMAGE NOT THE UNDERLYING IMAGE. 

        image.img.width = Math.abs(image.details.x - 1 - mouseX );
        image.img.height = image.img.width * this.props.images.images[0].height/this.props.images.images[0].width
        image.details.width = Math.abs(image.details.x - 1 - mouseX );
        image.details.height = image.img.width * this.props.images.images[0].height/this.props.images.images[0].width
        this.props.addCanvasImage(image.img, image.details.x, image.details.y, image.corner);
        this.setState({image})
        this.setState({mouse: [mouseX,mouseY]})
    }
 
    onMouseMove(e){ 
      e.preventDefault()
      e.stopPropagation()   
      const mouseX = this.offset(e).x; // Scaled from hidden canvas
      const mouseY = this.offset(e).y *1.05; // Scaled from hidden canvas
      if(this.state.imageDragging)this.moveImage(mouseX, mouseY)
      if(this.state.videoDragging)this.moveVideo(mouseX, mouseY)
      if(this.state.resizeImage) this.cornerMove(mouseX, mouseY)
    }

  onMouseUp(){
    this.props.currentImage(this.state.image);
    this.setState({resizeImage: false})
    this.setState({imageDragging: false})
    this.setState({videoDragging: false})
  }

  render(){
    return (
      <Wrapper>        
      <Canvas
        onMouseDown = {(e) => this.onMouseDown(e)}
        onMouseMove = { this.debounceEvent(this.onMouseMove, 100)}
        onMouseUp = {(e) => this.onMouseUp(e)}
        onMouseOut = {(e) => this.onMouseUp(e)}        
        onTouchStart = {(e) => this.onMouseDown(e)}
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
    addCanvasImage:(image, top, left, corner) => { dispatch(castlyActions.addCanvasImage(image, top,left, corner))},
    setMouse:(mouse) => { dispatch(castlyActions.setMouse(mouse))},
    currentImage: (image) => { dispatch(castlyActions.currentImage(image)) },
    setDragging:(dragging) => { dispatch(castlyActions.setDragging(dragging))},
    videoDragging:(dragging) => { dispatch(canvasRecordingActions.videoDragging(dragging))},  
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayCanvas);