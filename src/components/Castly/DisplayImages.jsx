import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';
import AddFiles from './AddFiles';
import { Document, Page } from 'react-pdf/dist/entry.parcel';

import * as castlyActions from '../../actions/castlyActions';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';
const Wrapper = styled.div`
   display: grid;
`

const Img = styled.img`
   padding: 1px;
   width:150px;
   height:75px;
   object-fit:scale-down;
   object-fit:scale-up;
  `
const Gallary = styled.div`
  display: grid;
  grid-gap: 10px;
  overflow: auto;
  max-width: 700px;
`
const ImageWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  color: white;
  background-color: #222;
  padding-bottom: 10px;
  box-shadow: 1px 1px 1px 1px #9E9E9E;
  margin-bottom: 10px;
  max-width: 500px;
`

const ImgName = styled.div`
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 5px;
  color: #d6d6d6;
  width:146px;

`

const Controls = styled.div`
  margin-top: 5px;
  display: grid;
  align-items: center;
  justify-content: center;
`

const Button = styled.div`
    padding: 2px;
    width: 40px;
    text-align: center
    background-color: #454545;
    background-image: -webkit-linear-gradient(top,#3e3e3e,#333);
    border: 1px solid #141414;
    box-shadow: 0 1px 0 rgba(255,255,255,.06), 1px 1px 0 rgba(255,255,255,.03), -1px -1px 0 rgba(0,0,0,.02), inset 1px 1px 0 rgba(255,255,255,.05);
    color: #aaa;
    cursor: pointer;
    text-shadow: 0 -1px 0 rgba(0,0,0,.5);
`

class DisplayImages extends React.Component {

  onDocumentComplete(pages){
   console.log('loaded');
  }

  createNewImage(image){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.preview;
        img.addEventListener('load', function(){
          resolve(img);
        })
    })
  }

  createCorner(){
    return new Promise((resolve, reject) => {
      const corner = new Image()
      corner.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACiSURBVDiN5dQxCsMwDIXhpNcSOkfIZHLi4CwxOYVHTf47mzppLTIU8sYH+kAgNAIMN+Z1J/Z/YEppCCHUJc4cx4Gqsq5r1bvAM8wFXmHdYAsrpfjAFhZjZJqmfrCFbduGiLDvex/Yg30Fe7FL0IOdgl6sCf6KlVLIOZNzrk5n8GAAZoaIICKYWRtcloUYYzU4zzMppY/VzAxVRVUrcISnPdg3D5nIVm+mB9cAAAAASUVORK5CYII=';
      corner.addEventListener('load', function(){
        resolve(corner)
      })
    }).catch(e => reject(e))
  }

  componendDidRev

  addCanvasImage(image){

    this.createNewImage(image).then(img => {
      this.createCorner().then( corner =>{
        image['img'] = img;
        this.props.currentImage(image);   
        this.props.resize(corner) 
        const imageStage = this.props.castly.imageStage         
        this.props.addCanvasImage(image.img, imageStage, corner);        
      })
    })    
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext){
    console.log("next Props", nextProps)
    return true;
  }

  render(){
    let PDF = <div></div>
    if(this.props.castly.images[0]){
      PDF = <div></div>
    }
    const style = {gridTemplateColumns: `repeat(${this.props.castly.images.length}, auto)`}
    return (
      <Wrapper> 
      <AddFiles/>  
      {/*<Gallary style={style}> 
      
        {this.props.castly.images.map((image, index)=> {
          return(
          <ImageWrapper key={`image-${index}`} >
            <ImgName>{image.name}</ImgName>
            <Img src={image.preview} alt="Uploaded Image Preview"/>
            <Controls>
            <Button 
              onClick={() =>this.addCanvasImage(image)}
            >Cast</Button>
            </Controls>
          </ImageWrapper>
          )
          }
        )}

        </Gallary>*/  }
        <Document file={this.props.castly.images[0]} >  <Page pageNumber={1} /></Document>
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { castly: state.castly, canvasRecording: state.canvasRecording };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => { dispatch(castlyActions.addImages(images)) },
    imageStageDetails: (details) => { dispatch(castlyActions.imageStageDetails(details)) },
    currentImage: (image) => { dispatch(castlyActions.currentImage(image)) },
    resize: (corner) => { dispatch(castlyActions.resize(corner)) },
    addCanvasImage:(image, imageStage, corner) => { dispatch(castlyActions.addCanvasImage(image, imageStage, corner))},

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DisplayImages);