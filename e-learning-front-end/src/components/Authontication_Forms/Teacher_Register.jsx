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
        'bio':'',
        'speciality':'',
        'skills':'',
        'status':''
    });
    const [errors, setErrors] = useState({});
    //change element value
    const handleChange=(event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
        setErrors({
            ...errors,
            [event.target.name]: ''
          });
    };
    const validateData = () => {
        let errors = {};
      
        if (!teacherData.teacher_fullname) {
          errors.teacher_fullname = 'Name is required';
        }
      
        if (!teacherData.email) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(teacherData.email)) {
          errors.email = 'Email is invalid';
        }
      
        if (!teacherData.password) {
          errors.password = 'Password is required';
        } else if (teacherData.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        }
      
        if (!teacherData.mobile_phone) {
          errors.mobile_phone = 'Mobile Phone is required';
        } else if (!/^[0-9]+$/.test(teacherData.mobile_phone)) {
          errors.mobile_phone = 'Mobile Phone is invalid';
        }
      
        if (!teacherData.address) {
          errors.address = 'Address is required';
        }
      
        if (!teacherData.bio) {
          errors.bio = 'Bio is required';
        }
      
        if (!teacherData.skills) {
          errors.skills = 'Skills are required';
        }
      
        if (!teacherData.speciality) {
          errors.speciality = 'Speciality is required';
        }
      
        return errors;
      };
    
    //end
    const submitForm=()=>{
        const teacherFormData =new FormData();
        const errors = validateData();
        teacherFormData.append("teacher_fullname", teacherData.teacher_fullname)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("mobile_phone", teacherData.mobile_phone)
        teacherFormData.append("address", teacherData.address)
        teacherFormData.append("speciality", teacherData.speciality)
        teacherFormData.append("bio", teacherData.bio)
        teacherFormData.append("skills", teacherData.skills)

        try{
            if (Object.keys(errors).length === 0){
            axios.post(baseUrl,teacherFormData,).then((response)=>{
                setTeacherData({
                    'teacher_fullname':'',
                    'password':'',
                    'email':'',
                    'mobile_phone':'',
                    'address':'',
                    'speciality':'',
                    'skills':'',
                    'bio':'',
                    'status':'success'
                });
            })};
        }catch(error){
            setTeacherData({'status':'error'});
        }
        setErrors(errors);
        console.log(teacherData);
    }; 
    const teacherLoginStatus= localStorage.getItem('teacherLoginStatus');//if the user is logied in redirect them to teacher dashboard.
    if(teacherLoginStatus==='true'){
        window.location.href='/teacher_dashboard'
    }


    return (        
        <section className="sm-image">
            <div className="mask d-flex align-items-center gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-5 col-md-5 col-lg-5 col-md-2">
                                {teacherData.status ==='success' && <p className='text-success ms-2 mt-2'>Thanks for registeration</p>}
                                {teacherData.status ==='error' && <p className='text-danger ms-2 mt-2'>Something went wrong!!!</p>}
                            <div className="card" >
                                <div className="card-body">
                                    <h2 className="text-uppercase text-center mb-5">Teacher Register</h2>
                                    <form>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                            <input value={teacherData.teacher_fullname} onChange={handleChange} name="teacher_fullname" type="text" id="form3Example1cg"  className={`form-control form-control-sm ${
                                            errors.teacher_fullname ? "is-invalid" : ""
                                            }`} />
                                            {errors.teacher_fullname && (
                                            <div className="invalid-feedback">{errors.teacher_fullname}</div>
                                        )}
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                            <input value={teacherData.email} onChange={handleChange}  name="email" type="email" id="form3Example3cg"  className={`form-control form-control-sm ${
                                            errors.email ? "is-invalid" : ""
                                            }`} />
                                             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                            <input value={teacherData.password} onChange={handleChange}  name="password" type="password" id="form3Example4cg"  className={`form-control form-control-sm ${
                                            errors.password ? "is-invalid" : ""
                                            }`} />
                                            {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                        </div>
                                       
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example4cdg">Mobile Phone</label>
                                            <input value={teacherData.mobile_phone} onChange={handleChange}  name ="mobile_phone" type="text" id="form3Example4cdg" className={`form-control form-control-sm ${errors.mobile_phone && 'is-invalid'}`} />
                                            {errors.mobile_phone && <div className="invalid-feedback">{errors.mobile_phone}</div>}      
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example3cg">Address</label>
                                            <textarea value={teacherData.address} onChange={handleChange}  name="address" type="text" id="form3Example3cg" className={`form-control form-control-sm ${errors.address && 'is-invalid'}`} />
                                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example3cg">Speciality</label>
                                            <textarea value={teacherData.speciality} onChange={handleChange}  name="speciality" type="text" id="form3Example3cg" className={`form-control form-control-sm ${errors.speciality && 'is-invalid'}`} />
                                            {errors.speciality && <div className="invalid-feedback">{errors.speciality}</div>}
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example4cdg">Skills</label>
                                            <input value={teacherData.skills} onChange={handleChange}  name ="skills" type="text" id="form3Example4cdg"className={`form-control form-control-sm ${errors.skills && 'is-invalid'}`} />
                                            {errors.skills && <div className="invalid-feedback">{errors.skills}</div>}
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="form3Example3cg">Bio:Few words about you</label>
                                            <textarea value={teacherData.bio} onChange={handleChange}  name="bio" type="text" id="form3Example3cg" className={`form-control form-control-sm ${errors.bio && 'is-invalid'}`} />
                                            {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
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