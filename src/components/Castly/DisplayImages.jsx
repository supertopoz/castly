import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import {NotificationManager} from 'react-notifications';


import * as castlyActions from '../../actions/castlyActions';

const Wrapper = styled.div`

`

const Img = styled.img`
  max-width: 100px;
`

const dropzone = {
  background: '#f0f0f0',
  color: '#909090',
  border: '1px dashed darkgrey',
  padding: '5%',
  textAlign: 'center',
}

class DisplayImages extends React.Component {

  
  render(){
    return (
      <Wrapper>   
      <div>   
        {this.props.castly.images.map((image, index)=> <div><Img key={`image-${index}`} src={image.preview} alt="Uploaded Image Preview"/></div>)}
        </div>    
      </Wrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return { castly: state.castly };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addImages: (images) => { dispatch(castlyActions.addImages(images)) },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DisplayImages);