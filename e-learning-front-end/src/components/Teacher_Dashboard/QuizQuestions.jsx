import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import {useParams} from "react-router-dom";


const baseUrl='http://127.0.0.1:8000/api';


const QuizQuestion =()=>{
    const [quizquestionData, setQuizQuestionData] =useState([]);
    const [totalResult, setTotalResult] =useState([0]);
    
    const {quiz_id} = useParams();
    

    
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/quiz_questions/'+quiz_id).then((response)=>{ 
                setQuizQuestionData(response.data);
                setTotalResult(response.data.length);
            });

        }catch(error){
            console.log(error);
        }
    },[quiz_id]);

    const handleDeleteClick=(question_id)=>{
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
                    axios.delete(baseUrl+'/question/'+question_id).then((res)=>{
                        Swal.fire('success','quiz has been deleted');
                        try{
                            axios.get(baseUrl+'/quiz_questions/'+quiz_id).then((res)=>{
                                setTotalResult(res.data.length);
                                setQuizQuestionData(res.data);
                            });
                        }catch(error){
                            console.log(error);
                        }
                    });
                }catch(error){
                    Swal.fire('error','Course has not been deleted!!');
            }}else{  
                Swal.fire('error','Course has been delted!!!');
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
                    
                    <h4 className="card-header">All Questions {(totalResult)} <Link className='btn btn-success btn-sm float-end' to={'/add_quiz_questions/'+quiz_id}> Add Question</Link></h4>
                       
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizquestionData.map((row,index)=>  
                                <tr>
                                    <td>
                                        <Link>{row.question}</Link>
                                    </td>
                                    <td>
                                        
                                        <Link to={'/edit_quiz/'+row.quiz_id} className="btn btn-info btn-sm mb-2  mt-2 2 ms-2" ><i className="ri-edit-2-fill"></i></Link>
                                        <Link onClick={()=>handleDeleteClick(row.quiz_id)} className="btn btn-danger btn-sm mb-2  mt-2 2 ms-2" ><i className="ri-delete-bin-fill"></i></Link> 
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
export default QuizQuestion;