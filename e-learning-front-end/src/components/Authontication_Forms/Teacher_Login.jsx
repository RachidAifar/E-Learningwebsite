import React from "react";
import {useEffect,useState } from 'react';  
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./Login.css";




const baseUrl='http://127.0.0.1:8000/api';


const Login = () => {
    const [teacherLoginData, setTeacherLoginData] = useState({ //the same of register you can see the register.
        'email':'',
        'password':''
    });
    //change element value
    const handleChange=(event)=>{
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    };
    const submitForm=()=>{
        const teacherFormData =new FormData();
        teacherFormData.append("email", teacherLoginData.email)
        teacherFormData.append("password", teacherLoginData.password)
       

         try{
            axios.post(baseUrl+'/teacher_login',teacherFormData).then((response)=>{
                console.log(response.data);
                if(response.data.bool===true){
                localStorage.setItem('teacherLoginStatus', true);
                window.location.href='/teacher_dashboard';
            }
             });

        }catch(error){
            console.log(error);
        }
    }; 

    const teacherLoginStatus= localStorage.getItem('teacherLoginStatus');//the redirect the loged in user to dashboard 
    if(teacherLoginStatus==='true'){
        window.location.href='/teacher_dashboard'
    }


    useEffect(()=>{
        document.title='Teacher Login';
    });
    return (
        <section className="sm-image">
            <div className="container-fluid h-custom  h-100">
            {/* {teacherData.status==='auccess' && <p className='text-success'>you register successfully</p>}
            {teacherData.status==='error' && <p className='text-danger'>something went wrong!! try again</p>} */}
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-5 col-lg-6 col-sm-5">
                        <img src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp`}
                            className="img-fluid" alt=""></img>
                    </div>
                    <div className="card col-md-5 col-md-4">
                        <div className="card-body">
                        <h3 className="text-center mb-3">Teacher Login</h3>
                            <form>
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-2">
                                    <input value={teacherLoginData.email} onChange={handleChange} name="email" type="email" id="form3Example3" className="form-control form-control-sm"
                                        placeholder="Enter a valid email address" />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-2">
                                    <input value={teacherLoginData.password} onChange={handleChange} name="password"  type="password" id="form3Example4" className="form-control form-control-sm"
                                        placeholder="Enter password" />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to={"#!"} className="text-body">Forgot password?</Link>
                                </div>

                                <div className="text-center text-md-start mt-4 pt-2">
                                    <button type="button" onClick={submitForm} className="btn btn-primary btn-sm">Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to={"/register"}
                                        className="link-danger">Register</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
        </section>
    );
};
export default Login;
