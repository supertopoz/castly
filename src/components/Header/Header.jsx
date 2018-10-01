import React from "react";
import {connect} from "react-redux";
import styled from "styled-components"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'material-icons/iconfont/material-icons.css'

import { showSideMenu } from "../../actions/pageAnimations";
const FixedHeader = styled.div`
  display: grid;
  grid-gap:10px;
  grid-template-columns: 1fr 10fr;
  background: white;
  padding: 7px;
  border-bottom: 1px solid lightgrey;
`

const Heading = styled.div`
  text-align:left;
  padding-top: 5px;
`

const Menu = styled.div`
  padding-left: 1%;
  cursor: pointer;
`

class Header extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
      console.log('header props', this.props)
    return (
        <FixedHeader>
          { console.log('These are props for the header:', this.props)}
          <Menu onClick={()=> this.props.showSideMenu(true)}><i className="material-icons">menu</i></Menu>                
          <Link to="/"><Heading>HANGMAN FOR EDUCATION</Heading></Link>          
        </FixedHeader>
    );
  }
};

    const mapStateToProps = (state) => {
      return {
        student: state.student,
        sideMenu: state.pageAnimations.sideMenu

      };
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        addStudentId: (id) => { dispatch(addStudentId(id))},
        showSideMenu: (visibility) => { dispatch(showSideMenu(visibility))}   
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
