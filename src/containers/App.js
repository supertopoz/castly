import React, { Component, Suspense, lazy } from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import {
  Route,
  Link
} from 'react-router-dom'
import 'react-notifications/lib/notifications.css';
import * as actions from "../actions/pageAnimations";

const Disclaimer = lazy(() => import("../components/Disclaimer/Disclaimer"));
const Home = lazy(() => import("../components/Home/Home"));
const Castly = lazy(() => import("../components/Castly/Castly"));

import SideMenu from "../components/SideMenu/SideMenu";
import Header from "../components/Header/Header";

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
		<Suspense fallback={<div>Loading...</div>}>
		<main>   
	    <Route path="/Castly" component={props => <Castly {...props} />}></Route>
	    <Route path="/disclaimer" component={props => <Disclaimer {...props} />}></Route>
	    <Route exact path="/" component={props=> <Home {...props}/>}></Route>
	    </main>
	    </Suspense>
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