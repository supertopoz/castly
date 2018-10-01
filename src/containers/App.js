import React, { Component } from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import {
  Route,
  Link
} from 'react-router-dom'
import 'react-notifications/lib/notifications.css';
import * as actions from "../actions/pageAnimations";

import { Home } from "../components/Home/Home";
import { Disclaimer } from "../components/Disclaimer/Disclaimer";
import Hangman from "../components/Hangman/Hangman";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "../components/Header/Header";
import LoadingBar from "../components/LoadingBar/LoadingBar";



class App extends React.Component {

	componentDidMount(){
		const isMobile = (typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined')?
		window.matchMedia("(pointer:coarse)").matches : false;
		this.props.isMobile(isMobile);			
	}

	render() {
	return (
		<div>
		<SideMenu menu={true}/>
		<Header/>
		<LoadingBar/>
		<main>   
	    <Route path="/hangman" component={Hangman}></Route>
	    <Route path="/disclaimer" component={Disclaimer}></Route>
	    <Route exact path="/" component={Home}></Route>
	    </main>
		<NotificationContainer/>
		</div>
	);
	}
}

const mapStateToProps = (state) => {
  return { hangman: state.hangman };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isMobile: (isMobile) => { dispatch(actions.isMobile(isMobile)) },   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);