'use strict';
import React from 'react';
import {NotificationManager} from 'react-notifications';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import PropTypes from 'prop-types'

import { store }from "./store";
import App from './src/containers/App';
import './src/containers/index.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

/* eslint-env browser */

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'dev') {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      console.log('Worker registration started')
      reg.onupdatefound = function() {
         console.log('update found')
        var installingWorker = reg.installing;
        installingWorker.onstatechange = function() {
          console.log('installing worker')
          switch (installingWorker.state) {

            case 'installed':
              if (navigator.serviceWorker.controller) {
                console.log('New or updated content is available.');
              } else {
                NotificationManager.info('Yey! Castly will work offline!');
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  });
}

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          console.log('deleted cache')
          return caches.delete(cacheName);
        })
      );
    })
  );
});

const Root = ({store}) => (
	    <Provider store={store} >	
	    <Router>
	      <Route path="/" component={App}></Route>	     
	    </Router>
	    </Provider>
)

Root.propTypes = {
	store: PropTypes.object.isRequired
}

render(<Root store={store}/>, document.getElementById('root'));