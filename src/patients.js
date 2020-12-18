import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup  from 'yup';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import Header from './header';
class Students extends React.Component{
    constructor(props) {
        super(props);
    }
     componentDidMount() {
        axios.get('http://localhost:4000/mydatabase/')
            .then(response => {
                this.setState({ datasave: response.data });
                console.log(this.state.datasave);
            })
            .catch(function (error){
                console.log(error);
            })
    }
   render() {
        if(!localStorage.getItem('userLog')){
            this.props.history.push('/');  
        }
      return (
          
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                <h1>Add Student</h1>
                <Formik initialValues = {{
                                            name:'', 
                                            email:''
                                        }}
                            validationSchema={
                                Yup.object().shape({
                                    name: Yup.string().required('name is required'),
                                    email:Yup.string().email('please enter a valid email').required('Please enter an email')
                                   
                                })
                            }
                            onSubmit = {data =>{
                                console.log(data);
                                    const userData = {
                                            name : data.name,
                                            email : data.email
                                        };
                                
                                axios.post('http://localhost:4000/mydatabase/add/', userData).then(res => console.log(res));
                                        this.props.history.push('/userlist');

                            }}
            >{({errors, values, handleChange,touched,isSubmitting, handleBlur}) =>(
                <Form>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <Field  type="text"
                                className={'form-control' + (errors.name && touched.fname ? ' is-invalid' : '')}
                                placeholder = 'Name'
                                name = 'name'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Date of Joining'
                                name = 'dateofjoin'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Date of Joining'
                                name = 'dateofjoin'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Date of Joining'
                                name = 'dateofjoin'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Date of Joining'
                                name = 'dateofjoin'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Date of Joining'
                                name = 'dateofjoin'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Date of Joining'
                                name = 'dateofjoin'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Date of Joining'
                                name = 'dateofjoin'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'email'
                                name = 'email'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    
                    <div className="form-group">
                        <Button  type="submit" value="Add Patient" className="btn btn-primary" >Add</Button>
                    </div>
                </Form>
            )}
                </Formik>
                </div>
                </div>
                </div>
            </div>
         
      );
   }
}

export default Students;