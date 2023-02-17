import React from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Sidebar from './T_Sidebar';
// import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import QuizResult from './QuizResult'


const baseUrl='http://127.0.0.1:8000/api';


const AttemptedStudent =()=>{
    const [studentData, setStudentData] =useState([]);
    const {quiz_id} = useParams();
    
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/attempted_quiz/'+quiz_id).then((response)=>{ 
                setStudentData(response.data);
                console.log(response.data);
            });

        }catch(error){
            console.log(error);
        }

       
    },[quiz_id]);

    


    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">Student List</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Joining Date</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((row,index)=> 
                                <tr>
                                    <td>
                                        {row.student.student_fullname}
                                    </td>
                                    <td>
                                    {row.student.email}
                                    </td>
                                    <td>{row.student.dateOfJoining} </td>
                                    <td>
                                    <button type="button"  className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#resultModal${row.student_id}`}>
                                        Quiz Result
                                    </button>
                                    <div className="modal fade mt-5" id={`resultModal${row.student_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <QuizResult quiz={row.quiz.quiz_id} student={row.student.student_id} />
                                    </div>  
                                    </td>
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
export default AttemptedStudent;