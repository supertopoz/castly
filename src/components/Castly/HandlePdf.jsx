'use strict';
import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";

let Document;
let Page;
import('react-pdf/dist/entry.parcel').then(code => {
  Document = code.Document
  Page = code.Page

}).catch(e => console.log(e))
import {NotificationManager} from 'react-notifications';
import "babel-polyfill";

import AddFiles from './AddFiles';
import * as castlyActions from '../../actions/castlyActions';
import * as pageAnimations from '../../actions/pageAnimations';
import * as canvasRecordingActions from '../../actions/canvasRecordingActions';

const HiddenCanvas = styled.div``

const Loader = styled.div`
  margin: 0 auto;
  display: grid;
  max-width: 200px; 
  background: lightgrey;
` 

const LoaderSegment = styled.div`
  background: #aa00ff;
  height: 5px;
` 


class HandlePdf extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pageNumber: 1,
      numPages: 0,
      images: [],
      width: 0,
      loaderSegmentWidth: 0
    }
  }

  documentData(e){
    this.props.displayCanvas('none');
    this.setState({numPages: e.numPages})
  }

  createImage(count){

    return new Promise((resolve, reject) => {
      const canvas = document.querySelectorAll(`.pdfCanvas canvas`)[0];
      
      canvas.toBlob(function(blob) {
        const image = new Image();
        const url = URL.createObjectURL(blob);
        image.preview = url;
        image.name = `slide: ${count} `
        image.addEventListener('load', function(){
          URL.revokeObjectURL(url)
        })
        resolve(image)
      });
    })
  }

    componentDidMount() {
      {/*this.updateWindowDimensions();*/}
    }




    updateWindowDimensions() {
      let width = window.innerWidth
      let loaderSegmentWidth = 700
      if(width < 700){
        loaderSegmentWidth = width
      }
      this.setState({ width, loaderSegmentWidth});
    }

  async imageRendered(){
    if(this.state.pageNumber <= this.state.numPages){
    let count = this.state.pageNumber + 1
    const images = this.state.images
    const image = await this.createImage(count -1);
    // destroy canvas 
    
    images.push(image)
    this.setState({images})
    this.setState({pageNumber: count})
    }
    if(this.state.pageNumber === this.state.numPages){
      this.props.addImages(this.state.images)
      this.setState({
        pageNumber: 1,
        numPages: 0,
        images: [],  
      })
      console.log('finished')

      this.props.displayCanvas('grid');
    } 
  }
  render(){
    let page;
    if(this.props.castly.images[0]){
      if(this.props.castly.images[0].type === 'application/pdf'){



        page = (
          <div>
          Still here
          <Document

            file={this.props.castly.images[0]} 
            onLoadSuccess = {(e) => this.documentData(e)}
            onLoadError={(e) => console.log(e)}
          >          
          <Page 
            onRenderSuccess ={(e)=> this.imageRendered(e)}
            className = {`pdfCanvas`}
            pageNumber= {this.state.pageNumber+1} 
            renderAnnotations = {false}
          />              
          </Document>
          </div>


          ) 
      }
    }
  return (
    <div>
    <Loader style={{ "gridTemplateColumns": `repeat(${this.state.numPages}, ${200/this.state.numPages}px)` }}>
    {this.state.images.map((item, index)=>{
      return <LoaderSegment key={`loadersegment-${index}`}></LoaderSegment>
    })}
    </Loader>
    <HiddenCanvas>{page}</HiddenCanvas>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { castly: state.castly,  canvasRecording: state.canvasRecording};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => { dispatch(castlyActions.addImages(images)) },      
    initializeUserMedia:(currentCanvasObjects) => {dispatch(canvasRecordingActions.initializeUserMedia(currentCanvasObjects))},
    displayCanvas:(display) => {dispatch(pageAnimations.displayCanvas(display))} 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandlePdf);