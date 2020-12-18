import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Redirect, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
window.$id = ''
class PatientList extends Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        window.$id = this.props.datatosend._id;
        axios.post('http://localhost:4000/mydatabase/delete/'+window.$id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err)) 
           window.location.reload();
    }
    
  render() {
    if(localStorage.getItem('userLog') == null){
        this.props.history.push('/'); 
    }
    return (
    
        <tr>
          <td>
            {this.props.datatosend.name}
          </td>
          <td>
            {this.props.datatosend.email}
          </td>
          <td>
            <Link className="btn btn-primary" to={"/patientUpdate/"+this.props.datatosend._id+"/"+this.props.datatosend.name+"/"+this.props.datatosend.email}>Edit User</Link>
          </td>
          <td>
            <button onClick={this.deleteUser} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default PatientList;