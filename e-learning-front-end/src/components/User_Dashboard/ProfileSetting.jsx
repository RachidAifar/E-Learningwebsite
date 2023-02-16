import React from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import {useState,useEffect} from "react";
import Swal from 'sweetalert2';






const baseUrl='http://127.0.0.1:8000/api';
const ProfileSetting = () => {
    const [studentData, setStudentData] = useState({ //the data will by taken from the input and put it into teacherData after make axios post
        'student_fullname':'',                       //handleChange will store all the changes which are targeted                                           //submitForm we will append each value from input "form"
        'email':'',
        'address':'',
        'interested_categories':'',
        'mobile_phone':'',
        'status':''
    });
    const student_id =localStorage.getItem('student_id');
    const handleChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    };

    const submitForm=()=>{
        const teacherFormData =new FormData();
        teacherFormData.append("student_fullname", studentData.student_fullname);
        teacherFormData.append("email", studentData.email);
        teacherFormData.append("mobile_phone", studentData.mobile_phone);
        teacherFormData.append("address", studentData.address);
        teacherFormData.append("interested_categories", studentData.interested_categories);
        try{
            axios.put(baseUrl+'/student/'+student_id,teacherFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            }).then((response)=>{
                if(response.status===200){
                    Swal.fire({
                        title: 'Data hsa been updated',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:"center",
                        timerProgressBar:true,
                        showConfirmButton:false
                      }
                    );
                }
            });
        }catch(error){
            setStudentData({'status':'error'});
        }
    }; 
    useEffect(()=>{
        // fetch current teacher data\
        try{
            axios.get(baseUrl+'/student/'+student_id).then((response)=>{
                setStudentData({
                    student_fullname:response.data.student_fullname,
                    email:response.data.email,
                    mobile_phone:response.data.mobile_phone,
                    address:response.data.address,
                    interested_categories:response.data.interested_categories
                });
                
            });
 
        }catch(error){
            console.log(error);
        }
    },[student_id]);
 
     const studentLoginStatus= localStorage.getItem('studentLoginStatus');//if the user is logied in redirect them to teacher dashboard.
     if(studentLoginStatus!=='true'){
         window.location.href='/login'
     }
 




  return (
    <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                <div className="card"> 
                    <h4 className="card-header">Profile Setting</h4>   
                    <div className="card-body">
                        <div class="mb-2 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                            <input  value={studentData.student_fullname} onChange={handleChange}  name ="student_fullname" type="text" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                            <input  value={studentData.email} onChange={handleChange}  name ="email" type="email" readonly class="form-control" id="staticEmail" />
                            </div>
                        </div>
                         <div class="mb-2 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Intrested Category</label>
                            <div class="col-sm-10">
                            <input  value={studentData.interested_categories} onChange={handleChange}  name ="interested_categories" type="text" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div class="mb-2 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                            <input  value={studentData.address} onChange={handleChange}  name ="address" type="text" class="form-control" id="inputPassword"/>
                        </div>
                        <div class="mt-2 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label mb-4">Mobile Phone</label>
                            <div class="col-sm-10">
                            <input  value={studentData.mobile_phone} onChange={handleChange}  name ="mobile_phone" type="text" class="form-control" id="inputPassword"/>
                        </div>
                        </div>
                            <div class="mb-5 ">
                                <button onClick={submitForm}  type="button" class="btn btn-primary">Update</button>                    
                            </div>
                        </div>    
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
};
export default ProfileSetting;