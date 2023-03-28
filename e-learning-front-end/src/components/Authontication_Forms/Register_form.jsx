import React  from 'react';  
import { Link } from 'react-router-dom';          
import {useState } from 'react';  
import axios from 'axios';     
import './Register.css';   
        
const baseUrl='http://127.0.0.1:8000/api/student/';
        
const Register = () => {
    const [studentData, setStudentData] = useState({ //the data will by taken from the input and put it into teacherData after make axios post
        'student_fullname':'',                       //handleChange will store all the changes which are targeted 
        'password':'',                               //submitForm we will append each value from input "form"
        'email':'',
        'mobile_phone':'',
        'address':'',
        'status':''
    });
    const [errors, setErrors] = useState({});
    //change element value
    const handleChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
        setErrors({
            ...errors,
            [event.target.name]: ''
          });
    };
    const validateData = () => {
        let errors = {};
    
        if (!studentData.student_fullname) {
          errors.student_fullname = 'Name is required';
        }
    
        if (!studentData.email) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(studentData.email)) {
          errors.email = 'Email is invalid';
        }
    
        if (!studentData.password) {
          errors.password = 'Password is required';
        } else if (studentData.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        }
        if (!studentData.mobile_phone) {
            errors.mobile_phone = "Mobile Phone is required";
          } else if (!/^[0-9]+$/.test(studentData.mobile_phone)) {
            errors.mobile_phone = "Mobile Phone is invalid";
          }
          if (!studentData.address) {
            errors.address = "Address is required";
          }
    
          return errors;
      };
    //end
    const submitForm=()=>{
        const studentFormData =new FormData();
        const errors = validateData();
        setErrors(errors);
        studentFormData.append("student_fullname", studentData.student_fullname)
        studentFormData.append("password", studentData.password)
        studentFormData.append("email", studentData.email)
        studentFormData.append("mobile_phone", studentData.mobile_phone)
        studentFormData.append("address", studentData.address)
        try{
            if (Object.keys(errors).length === 0){
            axios.post(baseUrl,studentFormData,).then((response)=>{
                setStudentData({
                    'student_fullname':'',
                    'password':'',
                    'email':'',
                    'mobile_phone':'',
                    'address':'',
                    'status':'success'
                });
            })};
        }catch(error){
            setStudentData({'status':'error'});
        }
        console.log(studentData);
    }; 
    // const teacherLoginStatus= localStorage.getItem('teacherLoginStatus');//if the user is logied in redirect them to teacher dashboard.
    // if(teacherLoginStatus==='true'){
    //     window.location.href='/teacher_dashboard'
    // }

    return (        
        <section className="sm-image gradient-custom-3">
            <div className="mask d-flex align-items-center h-100  ">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-5 col-md-5 col-lg-5 col-md-2">
                        {studentData.status ==='success' && <p className='text-success'>Thanks for registeration</p>}
                        {studentData.status ==='error' && <p className='text-danger'>Something went wrong!!!</p>}
                            <div className="card mt-3 mb-2" >
                                <div className="card-body">
                                    <h2 className="text-uppercase text-center mb-4">Create an account</h2>
                                    
                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="form3Example1cg">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="student_fullname"
                                            onChange={handleChange}
                                            value={studentData.student_fullname}
                                            id="form3Example1cg"
                                            className={`form-control form-control-sm ${
                                            errors.student_fullname ? "is-invalid" : ""
                                            }`}
                                        />
                                        {errors.student_fullname && (
                                            <div className="invalid-feedback">{errors.student_fullname}</div>
                                        )}
                                    </div>
                                   <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="form3Example3cg">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            value={studentData.email}
                                            id="form3Example3cg"
                                            className={`form-control form-control-sm ${
                                            errors.email ? "is-invalid" : ""
                                            }`}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="form3Example4cg">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            value={studentData.password}
                                            id="form3Example4cg"
                                            className={`form-control form-control-sm ${
                                            errors.password ? "is-invalid" : ""
                                            }`}
                                        />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="form3Example1cg">Mobile Phone</label>
                                        <input type="text" name="mobile_phone" onChange={handleChange} value={studentData.mobile_phone} id="form3Example1cg" className={`form-control form-control-sm ${errors.mobile_phone && 'is-invalid'}`} />
                                        {errors.mobile_phone && <div className="invalid-feedback">{errors.mobile_phone}</div>}      
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" htmlFor="form3Example3cg">Address</label>
                                        <textarea   name="address" onChange={handleChange} value={studentData.address} type="text" id="form3Example3cg" className={`form-control form-control-sm ${errors.address && 'is-invalid'}`} />
                                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                    </div>
                                        
                                    <div className="d-flex justify-content-center">
                                        <button type="button" onClick={submitForm} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                    </div>

                                    <p className="text-center text-muted mt-2 mb-0">Have already an account? <Link to={"/login"}
                                        className="fw-bold text-body"><u>Login here</u></Link>
                                    </p>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Register;
    