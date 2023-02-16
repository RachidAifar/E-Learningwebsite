import React from "react";
import axios from 'axios';
import Sidebar from "./T_Sidebar";
import {useState,useEffect} from "react";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";


const baseUrl='http://127.0.0.1:8000/api';

const EditCourse = () => {
    const [quizData, setQuizData] =useState({
        title:'',
        detail:'',
       
    });
    const {quiz_id} = useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher_quiz_detail/'+quiz_id).then((response)=>{
                setQuizData({
                    title:response.data.title,
                    detail:response.data.detail,
                });
                
                console.log(response.data.title);
            });
        }catch(error){
            console.log(error);
        }
        
    },[quiz_id]);

    const handleChange=(event)=>{
        setQuizData({
            ...quizData,
            [event.target.name]:event.target.value
        });
    };
    const teacher_id = localStorage.getItem("teacher_id");
    const submitForm=()=>{
        const CourseFormData =new FormData();
        CourseFormData.append("teacher",teacher_id);
        CourseFormData.append("title",quizData.title );
        CourseFormData.append("detail",quizData.detail );
        
        
       

         try{
            axios.put(baseUrl+'/teacher_quiz_detail/'+quiz_id,CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200){
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
                    <h4 className="card-header">Edit Quiz</h4>   
                    <div className="card-body">
                    <div className="mb-2 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} value={quizData.title} name="title" type="text" className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    
                    <div className="mb-2 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Detail</label>
                        <div className="col-sm-10">
                        <textarea onChange={handleChange} value={quizData.detail} name="detail" type="text" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <hr />
                    <div className="mb-5">
                    <button onClick={submitForm} type="button" className="btn btn-primary">submit</button>                    
                    </div>
                    </div>    
                </div>
                </section>
        </div>
    </div>
  );
};
export default EditCourse;