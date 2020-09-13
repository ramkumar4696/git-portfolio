import React, { Component, Fragment } from "react";
//import components
import Navbar from './components/navbar.jsx';
import Intro from './components/intro.jsx';
import About from './components/about.jsx';
import Portfolio from './components/portfolio.jsx';
import Contact from './components/contact.jsx';
import BackToTop from './components/back-top.jsx';
import Preloader from './components/preloader';
import UploadFile from './components/upload';

class App extends Component{
    state = {data:{}}
    componentDidMount(){
        fetch("data.json").then(data=>data.json()).then(data=>this.setState({data}))
    }

    render(){
        const data = this.state.data;
        return <Fragment>
        <Navbar data = {data} />
        <Intro data = {data} />
        <About data = {data} />
        <Portfolio data = {data} />
        <Contact data = {data} />
        <BackToTop data = {data} />
        <Preloader data = {data} />
        </Fragment>
    }
}

export default App;