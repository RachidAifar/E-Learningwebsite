import React from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Sidebar from './T_Sidebar';
// import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import CheckQuizinCourse from './CheckAssigningQuizCourse';


const baseUrl='http://127.0.0.1:8000/api';


const AllQuizzes =()=>{
    const [quizData, setQuizData] =useState([]);
    const [courseData, setCourseData] =useState([]);
    const {course_id} = useParams();
    const teacher_id= localStorage.getItem('teacher_id');
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/teacher_quiz/'+teacher_id).then((response)=>{ 
                setQuizData(response.data);
            });

        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/course/'+course_id).then((response)=>{//geting teacher by id
                setCourseData(response.data);
            });
  
        }catch(error){
            console.log(error);
        }
    },[teacher_id,course_id]);

    


    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">Assign Quiz to course: <span className='text-primary text-sm'>{courseData.course_title}</span></h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((row,index)=> 
                                <tr>
                                    <td>
                                        <Link to={"/all_questions/"+row.quiz_id}>{row.title}</Link>
                                    </td>
                                    <CheckQuizinCourse quiz={row.quiz_id} course={course_id} />
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                </section>
            </div>
        </div>        
    )
}
export default AllQuizzes;