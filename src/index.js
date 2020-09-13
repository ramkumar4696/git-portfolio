import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';


//import css in order
import './css/normalize.css';
import './css/animate.css';
import 'bootstrap/dist/css/bootstrap.css';
 import './css/ionicons/css/ionicons.css';
 import './css/font-awesome/css/font-awesome.css';
import 'lightbox2/dist/css/lightbox.min.css'
import './css/style.css';

//import js libraries
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './libs/easing.js';
import 'lightbox2/dist/js/lightbox.min.js';

import * as serviceWorker from './serviceWorker';


import ReactGA from 'react-ga';
import App from './app';
// ReactGA.initialize('UA-133322079-01');
// ReactGA.pageview(window.location.pathname + window.location.search);
console.log(process.env)

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache().restore(cache),
    link: createUploadLink({ uri: process.env.API_URI || "http://localhost:4000/graphql" }),
  });

 const apolloClient = createApolloClient();
 const apolloCache = apolloClient.cache.extract();


ReactDOM.render(<ApolloProvider client={apolloClient}><App/></ApolloProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
