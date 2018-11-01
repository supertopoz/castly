import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import { Document, Page } from 'react-pdf/dist/entry.parcel';
import {NotificationManager} from 'react-notifications';

import AddFiles from './AddFiles';
import * as castlyActions from '../../actions/castlyActions';


const HiddenCanvas = styled.div`
  display: none;
`


class HandlePdf extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      numPages: 0,
      imgArr: [], 
      completedImages: [],      
    }
  }

  documentData(e){
    this.setState({numPages: e.numPages})
    this.setState({imgArr: [...Array(e.numPages).keys()]})
  }
  

  createImages(index){

    return new Promise((resolve, reject) => {
      const canvas = document.querySelectorAll(`.pdfCanvas-${index} canvas`)[0];
      canvas.toBlob(function(blob) {
        const image = new Image();
        const url = URL.createObjectURL(blob);
        image.src = url;
        image.preview = url;
        image.name = `pdf: p${index+1}`
        resolve(image)
      });
    })
  }

  initiateCreateImagesFromPDF(){
    let proms = this.state.imgArr.map((item, index) =>{
      return this.createImages(index)
    })
    Promise.all(proms).then(values => {
      this.props.addImages(values)
      this.setState({ numPages: 0, imgArr: [], completedImages: []})
    })
  }

  imageRendered(e){
    const completedImages = this.state.completedImages;
    completedImages.push(e.pageIndex);
    this.setState({completedImages})
    if(this.state.completedImages.length === this.state.imgArr.length){
      this.initiateCreateImagesFromPDF();
    }
  }
  render(){


    let page = <div></div>

    if(this.props.castly.images[0]){
      if(this.props.castly.images[0].type === 'application/pdf'){
        page = (
          <Document
            file={this.props.castly.images[0]} 
            onLoadSuccess = {(e) => this.documentData(e)}
            onLoadError={(e) => console.log(e)}
          >  
          { this.state.imgArr.map((item,index)=>{
              return(            
                <Page 
                  key = {`page-${index}`}
                  onRenderSuccess ={(e)=> this.imageRendered(e)}
                  className = {`pdfCanvas-${index}`}
                  pageNumber={index+1} 
                  renderAnnotations ={false}
                />              
              )
            })
          }
          </Document>
          ) 
      }
    }
  return (<HiddenCanvas>{page}</HiddenCanvas>);
  }
}

const mapStateToProps = (state) => {
  return { castly: state.castly};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => { dispatch(castlyActions.addImages(images)) },      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandlePdf);