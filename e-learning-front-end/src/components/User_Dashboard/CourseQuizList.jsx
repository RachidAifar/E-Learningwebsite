import React from 'react';
import { useState,useEffect } from 'react';
import Sidebar from './Sidebar'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import CheckQuizStatus from './CheckQuizStatus'



const baseUrl='http://127.0.0.1:8000/api';


const CourseQuizList =()=>{
    const [quizData, setQuizData] =useState([]);
    const student_id= localStorage.getItem('student_id');
    const {course_id} = useParams();


    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/fetch_assign_quiz/'+course_id).then((response)=>{
                setQuizData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[course_id]);

    




    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">  
                <div className="card">
                    <h6 className="card-header">Quiz List</h6>
                    <div className="card-body">
                    <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Quiz</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {quizData.map((row,index)=>  
                                <tr>
                                    <td>{row.quiz.title}</td>
                                    <CheckQuizStatus quiz={row.quiz.quiz_id} student={student_id}/>
                                </tr>    
                            )}
                            </tbody>
                        </table>
                        <hr />
                        {/* <button className='btn btn-dark btn-sm'>Skip</button>
                        <button className='btn btn-dark btn-sm ms-2'>Submit</button> */}
                    </div>
                </div>
                </section>
            </div>
        </div>        
    )
}
export default CourseQuizList;