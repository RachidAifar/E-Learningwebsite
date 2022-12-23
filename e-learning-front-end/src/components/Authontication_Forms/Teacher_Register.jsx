import React  from 'react';
import {useState } from 'react';  
import axios from 'axios';
import { Link } from 'react-router-dom';      
import './Register.css'       
        
const baseUrl='http://127.0.0.1:8000/api/teacher/';

const Register = () => {
    const [teacherData, setTeacherData] = useState({ //the data will by taken from the input and put it into teacherData after make axios post
        'teacher_fullname':'',                       //handleChange will store all the changes which are targeted 
        'password':'',                               //submitForm we will append each value from input "form"
        'email':'',
        'mobile_phone':'',
        'address':'',
        'speciality':'',
        'status':''
    });
    //change element value
    const handleChange=(event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    };
    //end
    const submitForm=()=>{
        const teacherFormData =new FormData();
        teacherFormData.append("teacher_fullname", teacherData.teacher_fullname)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("mobile_phone", teacherData.mobile_phone)
        teacherFormData.append("address", teacherData.address)
        teacherFormData.append("speciality", teacherData.speciality)

        try{
            axios.post(baseUrl,teacherFormData,).then((response)=>{
                setTeacherData({
                    'teacher_fullname':'',
                    'password':'',
                    'email':'',
                    'mobile_phone':'',
                    'address':'',
                    'speciality':'',
                    'status':'auccess'
                });
            });
        }catch(error){
            setTeacherData({'status':'error'});
        }
    }; 
    const teacherLoginStatus= localStorage.getItem('teacherLoginStatus');//if the user is logied in redirect them to teacher dashboard.
    if(teacherLoginStatus==='true'){
        window.location.href='/teacher_dashboard'
    }


    return (        
        <section className="sm-image">
            {teacherData.status==='auccess' && <p className='text-success'>you register successfully</p>}
            {teacherData.status==='error' && <p className='text-danger'>something went wrong!! try again</p>}
            <div className="mask d-flex align-items-center gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-5 col-md-5 col-lg-5 col-md-2">
                            <div className="card" >
                                <div className="card-body">
                                    <h2 className="text-uppercase text-center mb-5">Teacher Register</h2>
                                    <form>
                                        <div className="form-outline mb-2">
                                            <input value={teacherData.teacher_fullname} onChange={handleChange} name="teacher_fullname" type="text" id="form3Example1cg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <input value={teacherData.password} onChange={handleChange}  name="password" type="password" id="form3Example4cg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <input value={teacherData.email} onChange={handleChange}  name="email" type="email" id="form3Example3cg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <input value={teacherData.mobile_phone} onChange={handleChange}  name ="mobile_phone" type="number" id="form3Example4cdg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example4cdg">Mobile Phone</label>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <textarea value={teacherData.address} onChange={handleChange}  name="address" type="text" id="form3Example3cg" className="form-control" />
                                            <label className="form-label" htmlFor="form3Example3cg">Address</label>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <textarea value={teacherData.speciality} onChange={handleChange}  name="speciality" type="text" id="form3Example3cg" className="form-control" />
                                            <label className="form-label" htmlFor="form3Example3cg">Speciality</label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button onClick={submitForm} type="button"
                                                className="btn btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>
                                        <p className="text-center text-muted mt-2 mb-0">Have already an account? <Link to={"/login"}
                                            className="fw-bold text-body"><u>Login here</u></Link></p>
                      
                                    </form>
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
    