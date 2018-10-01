import React from "react";
import {connect} from "react-redux";
import styled from "styled-components"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { showSideMenu } from "../../actions/pageAnimations";


const Menu = styled.div`
  display: grid;
  margin-top: -8px;
  margin-left: -10px;
  z-index: 10;
  position: absolute;
  height: 100% !important;
  z-index: 100;
`
const MenuHeader = styled.div`
  height: 62px;
  background: #f5f5f5;
  border-bottom: 1px solid lightgrey;
`
const MenuLink = styled.div`
  margin-left: 10px;
  padding: 10px;
  font-size: 1.5rem;
`
const LeftColumn = styled.div`
  background: white;
  z-index: 200;
  height: 100%;
  box-shadow: 3px 0px 4px #9E9E9E;

`
const RightColumn = styled.div`
  background: transparent;
`
let style = hideMenu;

const hideMenu = {
  WebkitTransition: '-webkit-transform 0.4s linear', 
  transform: 'translate3d(-60vw, 0, 0)'
} 

const active = {
  WebkitTransition: '-webkit-transform 0.4s linear',  
  width: '150px'
}

class SideMenu extends React.Component {

    render(){    
    this.props.sideMenu? style = active: style = hideMenu;
    return (

        <Menu style={style} >
        <LeftColumn  onMouseLeave={(e)=> this.props.showSideMenu(false)}>
        <MenuHeader/>
        <MenuLink>
        <Link to="/" onClick={() => this.props.showSideMenu(false)}>Home</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/hangman" onClick={() => this.props.showSideMenu(false)}>Hangman</Link>
        </MenuLink>
        <MenuLink>
          <Link to="/disclaimer" onClick={() => this.props.showSideMenu(false)}>Disclaimer</Link>
        </MenuLink>

        </LeftColumn>
        </Menu>
    );
    }
};
    const mapStateToProps = (state) => {
      return { sideMenu: state.pageAnimations.sideMenu };
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        showSideMenu: (visibility) => { dispatch(showSideMenu(visibility)) }    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);