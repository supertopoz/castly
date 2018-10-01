import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import * as actions from "../../actions/pageAnimations";

import Game from "./Game";
import WordCategories from "./WordCategories";

const Wrapper = styled.div`
    display:grid;
    border: lightgrey 1px solid;
    background: ghostwhite;
    padding: 2%;
    border-radius: 10px;
    cursor:pointer;
    grid-template-columns: 1fr
`

const Tab = styled.div`
    display: grid;
    grid-gap: 5px;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
`
const TabName = styled.div`
    display:flex;
    align-items: center;
    width:90%;
    color: #aa00ff;
`




class Tabs extends React.Component {

  componentDidMount(){
    this.props.setTabs('game');
  }

  changeTab(tab){
    this.props.setTabs(tab);
  }

  render(){
    let view;
    let gameTab;
    let wordListTab;
    let themesTab;
    if(this.props.pageAnimations.tab === 'game') {
      view = <Game /> 
      gameTab = {backgroundColor: "white", color: "#aa00ff"}
    }
    if(this.props.pageAnimations.tab === 'wordList'){
      view = <WordCategories/>
      wordListTab = {backgroundColor: "white", color: "#aa00ff"}
    }
    if(this.props.pageAnimations.tab === 'themes') {
      view = <Themes/>
      themesTab = {backgroundColor: "white", color: "#aa00ff"}
    }
    
    let tab = <Tab><TabName style={wordListTab} onClick={()=> this.changeTab("wordList")}>Themes</TabName></Tab>
    tab = ''
    return (
      <Wrapper>        
        {tab}
        { view }
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { pageAnimations: state.pageAnimations };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTabs: (word) => { dispatch(actions.setTabs(word)) },  
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Tabs);