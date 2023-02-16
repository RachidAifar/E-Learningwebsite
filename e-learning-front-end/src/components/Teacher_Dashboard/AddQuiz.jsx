import React from "react";
import axios from 'axios';
import Sidebar from "./T_Sidebar";
import {useState} from "react";


const baseUrl='http://127.0.0.1:8000/api';

const AddQuiz = () => {
    const [quizData, setQuizData] =useState({
        title:'',
        detail:'',
        teacher:''
        });

    const handleChange=(event)=>{
        setQuizData({
            ...quizData,
            [event.target.name]:event.target.value
        });
    };
    
    const teacher_id = localStorage.getItem("teacher_id");
    const submitForm=()=>{
        const   CourseFormData =new FormData();
        CourseFormData.append("teacher", teacher_id);
        CourseFormData.append("title",quizData.title );
        CourseFormData.append("detail",quizData.detail );
        
       

       

         try{
            axios.post(baseUrl+'/quiz/',CourseFormData,{
            })
            .then((res)=>{
              window.location.reload();
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
                    <h4 className="card-header">Add Quiz</h4>   
                    <div className="card-body">
                    <div className="mb-2 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Quiz Title</label>
                        <div className="col-sm-10">
                            <input onChange={handleChange} name="title" type="text" className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Detail</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="detail" type="text" className="form-control" id="staticEmail" />
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
export default AddQuiz;