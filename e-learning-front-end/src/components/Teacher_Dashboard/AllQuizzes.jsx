import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


const AllQuizzes =()=>{
    const [quizData, setQuizData] =useState([]);
    const [totalResult, setTotalResult] =useState([0]);
    

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
    },[teacher_id]);

    const handleDeleteClick=(quiz_id)=>{
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this quiz?',
            icon:'info',
            timer:5000,
            confirmButtonText:'Continue',
            showConfirmButton: true
          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/quiz/'+quiz_id).then((res)=>{
                        Swal.fire('success','Quiz has been deleted');
                        try{
                            axios.get(baseUrl+'/teacher_quiz/'+teacher_id).then((res)=>{
                                setTotalResult(res.data.length);
                                setQuizData(res.data);
                            });
                        }catch(error){
                            console.log(error);
                        }
                    });
                }catch(error){
                    Swal.fire('error','Quiz has not been deleted!!');
            }}else{  
                Swal.fire('error','Quiz has been delted!!!');
            }
          });    
    }

    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">All Quizzes</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Total Questions</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((row,index)=>  
                                <tr>
                                    <td>
                                        <Link to={"/all_questions/"+row.quiz_id}>{row.title}</Link>
                                    </td>
                                    <td><Link to={'/enrolled_students/'+row.course_id} className='' >123</Link></td>
                                    
                                    <td>
                                        <Link to={'/add_quiz_questions/'+row.quiz_id} className='btn btn-success btn-sm' >Add Question</Link>
                                        <Link to={'/edit_quiz/'+row.quiz_id} className="btn btn-info btn-sm mb-2  mt-2 2 ms-2" >Edit</Link>
                                        <Link onClick={()=>handleDeleteClick(row.quiz_id)} className="btn btn-danger btn-sm mb-2  mt-2 2 ms-2" >Delete</Link> 
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
export default AllQuizzes;