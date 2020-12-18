import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        localStorage.userLog = "null";
        console.log(this.props.history)
        this.props.history.push("/login");
        return false;
    }
    render(){
        return(
            <div className="collpase navbar-collapse">
            </div>
        )
    }
} 

