import React from "react";
import {useEffect,useState } from 'react';  
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./Login.css";
import image1 from '../images/6310507.jpg'



const baseUrl='http://127.0.0.1:8000/api';

const Login = () => {
    const [studentLoginData, setstudentLoginData] = useState({ //the same of register you can see the register.
        'email':'',
        'password':''
    });
    //show error message when the teacher is not exist
    const[errorMsg, seterrorMsg] =useState('');
    //change element value
    const handleChange=(event)=>{
        setstudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        });
    };
    const submitForm=()=>{
        const studentFormData =new FormData();
        studentFormData.append("email", studentLoginData.email)
        studentFormData.append("password", studentLoginData.password)
       

         try{
            axios.post(baseUrl+'/student_login',studentFormData).then((response)=>{
                if(response.data.bool===true){
                localStorage.setItem('studentLoginStatus', true);//save a data in local storage
                localStorage.setItem('student_id', response.data.student_id);
                window.location.href='/dashboard';
            }else{
                seterrorMsg('Inavalid Email Or Password');
            }
             });

        }catch(error){
            console.log(error);
        }
    }; 

    const studentLoginStatus= localStorage.getItem('studentLoginStatus');//the redirect the loged in user to dashboard
    if(studentLoginStatus==='true'){
        window.location.href='/dashboard'
    };


    useEffect(()=>{
        document.title='Student Login';
    });
    return (
        <section className="sm-image">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-5 col-sm-6 col-sm-5">
                        <img src={image1}
                            className="img-fluid  p-3 " alt=""></img>
                    </div>
                    <div className="card col-md-5 col-md-4">
                        <div className="card-body">
                        <h3 className="text-center mb-3">Login</h3>
                        {errorMsg&& <p className="text-danger">{errorMsg}</p>}
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                    <input value={studentLoginData.email} onChange={handleChange} name="email"  type="email" id="form3Example3" className="form-control form-control-sm"
                                        placeholder="Email" />
                                    
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input value={studentLoginData.password} onChange={handleChange} name="password" type="password" id="form3Example4" className="form-control form-control-sm"
                                        placeholder="Password" />
                                    
                                </div>

                                <div className="text-center text-md-start mt-2 pt-2">
                                    <button type="button" onClick={submitForm} className="btn btn-primary btn-sm float-end">Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to={"/register"}
                                        className="link-danger">Register</Link></p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </section>
    );
};
export default Login;
