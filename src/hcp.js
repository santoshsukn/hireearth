import React, { Component } from 'react';
import axios from 'axios';
import Header from './header';
export default class Institute extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/mydatabase/')
            .then(response => {
                this.setState({ resdata: response.data });
                console.log(this.state.resdata);
            })
            .catch(function (error){
                console.log(error);
            })
    }
    render() {
        
        return (
            <div>
                <h3>Welcome to your HCP Page</h3>
            </div>    
        )
    }
}

