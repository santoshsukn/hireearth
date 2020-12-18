import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Header extends React.Component {
    constructor(props){
        super(props);
    }
    logout = () => {
        localStorage.userLog = "null";
    }
   
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <img src="logo.jpeg"  className="logo" height="96"/>
                    </li>
                    <li>
                        <Link to="/userlist" className="navbar-brand">Student List</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/patients" className="nav-link"> Add Students</Link>
                    </li>   
                </ul>
                </div>
            </nav>
        )
    }
} 

