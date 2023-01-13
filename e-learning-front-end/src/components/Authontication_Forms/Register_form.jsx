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
    //change element value
    const handleChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    };
    //end
    const submitForm=()=>{
        const studentFormData =new FormData();
        studentFormData.append("student_fullname", studentData.student_fullname)
        studentFormData.append("password", studentData.password)
        studentFormData.append("email", studentData.email)
        studentFormData.append("mobile_phone", studentData.mobile_phone)
        studentFormData.append("address", studentData.address)
        try{
            axios.post(baseUrl,studentFormData,).then((response)=>{
                setStudentData({
                    'student_fullname':'',
                    'password':'',
                    'email':'',
                    'mobile_phone':'',
                    'address':'',
                    'status':'success'
                });
            });
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
                                            <label className="form-label" htmlFor="form3Example1cg">Name</label>
                                            <input type="text"  name="student_fullname" onChange={handleChange} value={studentData.student_fullname} id="form3Example1cg" className="form-control form-control-sm" />
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example3cg">Email</label>
                                            <input type="email" name="email" onChange={handleChange} value={studentData.email} id="form3Example3cg" className="form-control form-control-sm" />
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                            <input type="password" name="password" onChange={handleChange} value={studentData.password} id="form3Example4cg" className="form-control form-control-sm" />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example1cg">Mobile Phone</label>
                                            <input type="text" name="mobile_phone" onChange={handleChange} value={studentData.mobile_phone}  id="form3Example1cg" className="form-control form-control-sm" />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example3cg">Address</label>
                                            <textarea   name="address" onChange={handleChange} value={studentData.address} type="text" id="form3Example3cg" className="form-control" />
                                        </div>
                                        
                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={submitForm}className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
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
    