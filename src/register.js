import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup  from 'yup';
import axios from 'axios';
import { createStore,applyMiddleware } from 'redux';
import { Button} from 'react-bootstrap';
window.$user = false
export default class Register extends React.Component {
    constructor(props){
        super(props);
        let user = false;
        this.state = {
            allUserData : ''
        }
}

    componentDidMount() {
        axios.get('http://localhost:4000/mydatabase/userData')
            .then(response => {
                this.setState({
                    allUserData : response.data
                })
                console.log(this.state.allUserData)
            })
            .catch(function (error){
                console.log(error);
            })
    }
    
    userNameCheck = (userData) =>{
        if(this.state.allUserData){
            this.state.allUserData.forEach(function(element){
                if(element.userName == userData.userName){
                    alert('User name already exist,please use different username');
                    // this.setState({
                        window.$user = true
                    //})
                } 
            });
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                <h1>Register Student</h1>
                <Formik initialValues = {{
                                            fname:'', 
                                            lname:'',
                                            DOB:'',
                                            email:'',
                                            role:'',
                                            mobile:'',
                                            fatherName:'',
                                            userName:'',
                                            password:'',
                                            cpassword:''
                                        }}
                            validationSchema={
                                Yup.object().shape({
                                    fname: Yup.string().required('name is required'),
                                    email:Yup.string().email('please enter a valid email').required('Please enter an email'),
                                    role:Yup.string().required('Please select User Type'),
                                    mobile: Yup.string().max(10).min(10).matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Please enter a valid mobile number"),
                                    userName: Yup.string().min(8).required('user name is required'),
                                    password: Yup.string().required('No password provided.') 
                                            .min(8, 'Password is too short - should be 8 chars minimum.')
                                            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                                    cpassword: Yup.string().required('Please fill your password match').test('passwords-match', 'Passwords must match', function(value) {
                                                    return this.parent.password === value;
                                                })
                                })
                            }
                            onSubmit = {data =>{
                                console.log(data);
                                    const userData = {
                                            fname : data.fname,
                                            lname : data.lname,
                                            DOB : '',
                                            email : data.email,
                                            mobile : data.mobile,
                                            role : data.role,
                                            fatherName : '',
                                            userName : data.userName,
                                            password : data.password
                                        };
                                        
                                        this.userNameCheck(userData);

                                        if(window.$user != true){
                                            axios.post('http://localhost:4000/mydatabase/register/', userData).then(res => console.log(res)).catch(function (error){
                                                console.log(error);
                                            });
                                            setTimeout(()=>{
                                                this.props.history.push('/');
                                            },500)
                                        }
                                        
                                        
                            }}
            >{({errors, values, handleChange,touched,isSubmitting, handleBlur}) =>(
                <Form>
                    {/* <div className="form-group"> 
                    <div className="img-wrapper">
                        <UserAvatar userId={ currentUser._id } imageId={ currentUser.profile.picture } size="small" fSize="small" shape="circle" />
                            <input type="file" name="avatar" onChange={ this.uploadFile } ref="imageInput" accept="image/png, image/jpeg"  multiple="false" />
                    </div>
                    </div> */}
                    <div className="form-group"> 
                        <label>Full Name: </label>
                        <Field  type="text"
                                className={'form-control' + (errors.fname && touched.fname ? ' is-invalid' : '')}
                                placeholder = 'First name'
                                name = 'fname'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="fname" component="div" className="invalid-feedback" />
                    </div>
                    {/*<div className="form-group">
                        <label>Last Name: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.lname && touched.lname ? ' is-invalid' : '')}
                                placeholder = 'Last Name'
                                name = 'lname'
                                onChange={handleChange}
                                />
                        
                        <ErrorMessage name="lname" component="div" className="invalid-feedback" />
                    </div>*/}
                    {/*<div className="form-group">
                        <label>DOB: </label>
                        <Field  type="date" 
                                className={'form-control' + (errors.DOB && touched.DOB ? ' is-invalid' : '')}
                                placeholder = 'DOB'
                                name = 'DOB'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="DOB" component="div" className="invalid-feedback" />
                    </div>*/}
                    <div className="form-group">
                        <label>Email ID: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                placeholder = 'Email Id'
                                name = 'email'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number: </label>
                        <Field  type="number" 
                                className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')}
                                placeholder = 'Mobile Number'
                                name = 'mobile'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>User Type: </label>
                         HCP
                        <input  type="radio" 
                                //className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}
                                name = 'role'
                                onChange={handleChange}
                                value="HCP"/>
                        Patient
                        <input  type="radio" 
                                //className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}
                                name = 'role'
                                onChange={handleChange}
                                value="Patient"/>
                        {/*<ErrorMessage name="role" component="div" className="invalid-feedback" />*/}
                    </div>
                    {/*<div className="form-group">
                        <label>Father Name: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.fatherName && touched.fatherName ? ' is-invalid' : '')}
                                placeholder = 'Father Name'
                                name = 'fatherName'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="fatherName" component="div" className="invalid-feedback" /> 
                    </div>*/}
                    <div className="form-group">
                        <label>User Name: </label>
                        <Field  type="text" 
                                className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')}
                                placeholder = 'User Name'
                                name = 'userName'
                                onChange={handleChange}
                                />
                       <ErrorMessage name="userName" component="div" className="invalid-feedback" /> 
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <Field  type="password" 
                                className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                placeholder = 'Enter Password'
                                name = 'password'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <Field  type="password" 
                                className={'form-control' + (errors.cpassword && touched.cpassword ? ' is-invalid' : '')}
                                placeholder = 'Confirn Password'
                                name = 'cpassword'
                                onChange={handleChange}
                                />
                        <ErrorMessage name="cpassword" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <Button  type="submit" value="Register" className="btn btn-primary" >Register</Button>
                    </div>
                </Form>
            )}
                </Formik>
                </div>
                <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}