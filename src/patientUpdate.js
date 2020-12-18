import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import React, { Component } from 'react';
import axios from 'axios';
import Header from './header';
import * as Yup  from 'yup';
import { Button} from 'react-bootstrap';
export default class patientUpdate extends Component {

    constructor(props) {
        super(props);
        let id, spid;
        this.state = {
            name: '',
            email: '',
            resultData:[]
        }
    }
    componentWillMount() {
        console.log(this.props.location.pathname)
        this.id = this.props.location.pathname;
        this.spid = this.id.split('/')
        let resultD = []; 
        console.log(this.spid[2]);
        console.log(this.spid[3]);
        console.log(this.spid[4]);
        axios.post("http://localhost:4000/mydatabase/").then(res => console.log(res.data));
        this.setState({ name: this.spid[3],
            email: this.spid[4]
        });
    }
    
    render() {
        // if(localStorage.getItem('userLog') == "null"){
        //     this.props.history.push('/'); 
        // }
        return (
            <div>
                <h3 align="center">Update Patient</h3>
                <Formik initialValues={{
                    name: this.state.name, 
                    email: this.state.email
                }} 
                validationSchema={Yup.object().shape({
                        name: Yup.string().required('name is required'),
                        email: Yup.string().email('please enter a valid email').required('Please enter an email')   
                })}
                onSubmit = { data => {
                    console.log(data);
                    const obj = {
                        name: data.name,
                        email: data.email
                    };
                    console.log(obj)
                    axios.post('http://localhost:4000/mydatabase/update/'+this.spid[2],obj).then(res => console.log(res.data));
                    this.props.history.push('/userlist');
                }}>
                {({errors, values, handleChange,touched,isSubmitting, handleBlur}) => (
                    <Form>
                        <div className="form-group"> 
                            <label>Name: </label>
                            <Field  type="text"
                                    className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                                    placeholder = 'Name'
                                    name = 'name'
                                    onChange={handleChange}
                                    />
                        </div>
                        <div className="form-group">
                            <label>Email Address: </label>
                            <Field  type="text"
                                    className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    placeholder = 'Email Address'
                                    name = 'email'
                                    onChange={handleChange}
                                    />
                        </div>

                        <br />

                        <div className="form-group">
                            <Button type="submit"  className="btn btn-primary" >Update Ptient</Button>
                        </div>
                    </Form>
                )}
                    
                </Formik>
            </div>
        )
    }
}