import React from "react";
import Sidebar from "./T_Sidebar";
import axios from 'axios';
import {useState,useEffect} from "react";
import Swal from 'sweetalert2';




const baseUrl='http://127.0.0.1:8000/api';

const TeacherProfileSetting = () => {



    const [teacherData, setTeacherData] = useState({ //the data will by taken from the input and put it into teacherData after make axios post
        'teacher_fullname':'',                       //handleChange will store all the changes which are targeted 
                                                    //submitForm we will append each value from input "form"
        'email':'',
        'mobile_phone':'',
        'address':'',
        'bio':'',
        'prev_image':'',
        'teacher_profile':'',
        'speciality':'',
        'skills':'',
        'status':''
    });
    const teacher_id =localStorage.getItem('teacher_id');
    const handleFileChange=(event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.files[0]
        });
    };
    const handleChange=(event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    };

    const submitForm=()=>{
        const teacherFormData =new FormData();
        teacherFormData.append("teacher_fullname", teacherData.teacher_fullname);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("mobile_phone", teacherData.mobile_phone);
        teacherFormData.append("address", teacherData.address);
        teacherFormData.append("speciality", teacherData.speciality);
        teacherFormData.append("bio", teacherData.bio);
        teacherFormData.append("skills", teacherData.skills);
        if(teacherData.teacher_profile!==''){
            teacherFormData.append("teacher_profile", teacherData.teacher_profile,teacherData.teacher_profile.name)
        };

        try{
            axios.put(baseUrl+'/teacher/'+teacher_id,teacherFormData,{
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
            setTeacherData({'status':'error'});
        }
    }; 
    useEffect(()=>{
       // fetch current teacher data\
       try{
           axios.get(baseUrl+'/teacher/'+teacher_id).then((response)=>{
               setTeacherData({
                   teacher_fullname:response.data.teacher_fullname,
                   email:response.data.email,
                   mobile_phone:response.data.mobile_phone,
                   speciality:response.data.speciality,
                   address:response.data.address,
                   bio:response.data.bio,
                   prev_image:response.data.teacher_profile,
                   teacher_profile:'',
                   skills:response.data.skills,
               });
               
           });

       }catch(error){
           console.log(error);
       }
   },[teacher_id]);

    const teacherLoginStatus= localStorage.getItem('teacherLoginStatus');//if the user is logied in redirect them to teacher dashboard.
    if(teacherLoginStatus!=='true'){
        window.location.href='/teacher_login'
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
                        <label for="staticEmail" class="col-sm-2 col-form-label">Full Name</label>
                        <div class="col-sm-10">
                        <input value={teacherData.teacher_fullname} onChange={handleChange}  name ="full_name" type="text"  className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input value={teacherData.email} onChange={handleChange}  name ="email" type="text"  className="form-control" id="staticEmail" />
                        </div>
                    </div> 
                    <div class="mb-3 row">
                        <div class="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Profile Photo</label>
                            <div className="col-sm-10">
                                <input onChange={handleFileChange} name="teacher_profile" type="file" className="form-control" id="inputPassword"/>
                                {teacherData.prev_image &&
                                <p className="mt-2"><img src={teacherData.prev_image} alt={teacherData.teacher_fullname} width="300" /></p>}
                            </div>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Mobile Phone</label>
                        <div class="col-sm-10">
                        <input value={teacherData.mobile_phone} onChange={handleChange}  name ="mobile_phone" type="text"  className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                        <input value={teacherData.address} onChange={handleChange}  name ="Address"  type="text"  className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Speciality</label>
                        <div class="col-sm-10">
                        <input value={teacherData.speciality} onChange={handleChange}  name ="speciality" type="text" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">skills</label>
                        <div class="col-sm-10">
                        <input value={teacherData.skills} onChange={handleChange}  name ="skills"  type="text" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Bio</label>
                        <div class="col-sm-10">
                        <textarea value={teacherData.bio} onChange={handleChange}  name ="bio" type="text" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <hr />
                    <div class="mb-5">
                    <button type="button" class="btn btn-primary" onClick={submitForm} >Update</button>                    
                    </div>
                    </div>    
                </div>
                </section>
        </div>
    </div>
  );
};
export default TeacherProfileSetting;