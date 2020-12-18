import PatientList from './patientList';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import React, { Component } from 'react';
import axios from 'axios';
import Header from './header';
import * as Yup  from 'yup';
import { Button} from 'react-bootstrap';
export default class Institute extends Component {
    constructor(props) {
        super(props);
        this.state = {resdata: []};
    }

    

    componentWillMount() {
        axios.get('http://localhost:4000/mydatabase/')
            .then(response => {
                this.setState({ resdata: response.data });
                console.log(this.state.resdata);
            })
            .catch(function (error){
                console.log(error);
            })
    }
    

    patientList() {
        return this.state.resdata.map(function(currentPatient, i){
            return <PatientList datatosend = {currentPatient} key={i} />;
        })
    }

    render() {
        if(localStorage.getItem('userLog') == null){
            this.props.history.push('/'); 
        }
        return (
            <div>
                <h3>Student List :</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.patientList() } 
                    </tbody>
                </table>
            </div>    
        )
    }
}

