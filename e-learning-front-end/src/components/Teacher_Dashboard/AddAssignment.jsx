import React from "react";
import axios from 'axios';
import Sidebar from "./T_Sidebar";
import {useParams} from 'react-router-dom';
import {useState} from "react";
import Swal from 'sweetalert2';


const baseUrl='http://127.0.0.1:8000/api';


const AddAssignment = () => {
    const [assignmentData, setAssignmentData] =useState({
       title:'',
       detail:''
    });

    const handleChange=(event)=>{
        setAssignmentData({
            ...assignmentData,
            [event.target.name]:event.target.value
        });
    };
    const{teacher_id}=useParams(); 
    const{student_id}=useParams();//TAKE A ID OF THE COURE FROM URL USING useParms
    const submitForm=()=>{
        const   CourseFormData =new FormData();
        CourseFormData.append("student",student_id);
        CourseFormData.append("teacher",teacher_id);
        CourseFormData.append("title", assignmentData.title);
        CourseFormData.append("detail",assignmentData.detail);
       
       

         try{
            axios.post(baseUrl+'/student_assignment/'+student_id+"/"+teacher_id,CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                console.log(res.status)
                if(res.status===201){
                    Swal.fire({
                        title: 'Assignment has been Added',
                        icon: 'success',
                        toast:true,
                        timer:4000,
                        position:"center",
                        timerProgressBar:true,
                        showConfirmButton:false
                      }
                    );

                    //save notification
                    const notifiData =new FormData();
                    notifiData.append('teacher',teacher_id);
                    notifiData.append('student',student_id);
                    notifiData.append('notif_for','student');
                    notifiData.append('notif_subject','assignment');
                    notifiData.append('teacher',teacher_id);

                    axios.post(baseUrl+'/save_notification/',notifiData,{
                        headers:{
                            'content-type' : 'multipart/form-data'
                        }
                    }).then((res)=>{
                        console.log('Notification Added');
                    })
                    window.location.reload();
                }
            });
        }catch(error){
            console.log(error);
        }
    }; 

  return (
    <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                <div className="card"> 
                    <h4 className="card-header">Add Assignment</h4>   
                    <div className="card-body">
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Title</label>
                        <div class="col-sm-10">
                        <input onChange={handleChange} name="title" type="text" readonly class="form-control" id="staticEmail" />
                        </div>
                    </div>
                    
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Detail</label>
                        <div class="col-sm-10">
                        <textarea onChange={handleChange} name="detail" type="text" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <hr />
                    <div class="mb-5">
                    <button onClick={submitForm} type="button" class="btn btn-primary">submit</button>                    
                    </div>
                    </div>    
                </div>
                </section>
        </div>
    </div>
  );
};
export default AddAssignment;