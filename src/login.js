import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import React,{useState,useEffect } from 'react';
import * as Yup  from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./register";
import patientList from "./patientList";
import { Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAlert } from './actions/alert';
import { setUser } from './actions/setUser';
import propTypes from 'prop-types';


const Login = ({setAlert,setUser,history}) =>{
    let storedToken = 'null';
    function redirectToRegister(){
        history.push("register")
    }
    // useEffect (() => {
    //     if(localStorage.getItem('userLog') !="null"){
    //         history.push('dashboard'); 
    //     } 
    // });
        return( 
                <div className = 'row'>
                    <div className="col-sm-4"></div>
                    <div className= "col-sm-4">
                        <center><h1>Hi there !</h1></center>
                        <Formik initialValues = {{userName:'', password:''}}
                            validationSchema={Yup.object().shape({
                                userName: Yup.string().required('Username is required'),
                                password: Yup.string().required('Password is required')
                            })}
                            onSubmit = {data =>{
                                const obj = {
                                    userName: data.userName,
                                    password: data.password
                                };
                                axios.post('http://localhost:4000/mydatabase/login/', obj)
                                    .then(res => {
                                        if(res.data == 'login err'){
                                            setAlert('please enter correct login ID or Password','danger');
                                        } else {
                                            setUser(res.data.obj.userlogData[0]);
                                            console.log(res.data.obj.userlogData[0])
                                            let role = res.data.obj.userlogData[0].role
                                            let token = res.data.obj.token;
                                            if(role == 'HCP'){
                                                history.push('hcp');
                                            } else {
                                                history.push('patient');
                                            }
                                            localStorage.setItem('userLog',res.data.obj.token);
                                            
                                        }
                                        
                                }); 
                            }}
                        >{({errors, values, handleChange,touched,isSubmitting, handleBlur}) =>(
                            <Form>
                                <div className="form-group"> 
                                    <label> User Name: </label>
                                    <Field  type="text"
                                            className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')}
                                            placeholder = 'user name'
                                            name='userName'
                                            onChange={handleChange}
                                            />
                                     <ErrorMessage name="userName" component="div" className="invalid-feedback" />       
                                </div>
                                <div className="form-group">
                                    <label >Password: </label>
                                    <Field 
                                            type="password" 
                                            placeholder = 'enter Password'
                                            className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                            name='password'
                                            onChange={handleChange}
                                            />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-4">
                                            <Button type="submit"  className="btn btn-primary" >Sign In</Button>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="submit"  onClick={redirectToRegister} value="Sign Up" className="btn btn-primary" />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                            
                            </Formik>
                        </div>
                        <div className="col-sm-4"></div>
                </div>
        )
}

Login.propTypes = {
    setAlert: propTypes.func.isRequired,
    setUser: propTypes.func.isRequired
}

export default connect(null,{setAlert,setUser}) (Login);