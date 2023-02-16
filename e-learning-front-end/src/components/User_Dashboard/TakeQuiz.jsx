import React from 'react';
import { useState,useEffect } from 'react';
import Sidebar from './Sidebar'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';



const baseUrl='http://127.0.0.1:8000/api';


const TakeQuiz =()=>{
    const [quizquestionData, setQuizQuestionData] =useState([]);
    const {quiz_id} = useParams();
    
    const student_id= localStorage.getItem('student_id');

    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/quiz_questions/'+quiz_id+'/1').then((response)=>{ 
                setQuizQuestionData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[quiz_id]);

    const submitAnswer = (quizQuestion_id,correct_answer) =>{
        const   QuizFormData =new FormData();
        QuizFormData.append("student",student_id );
        QuizFormData.append("question", quizQuestion_id);
        QuizFormData.append("correct_answer",correct_answer );
        QuizFormData.append("quiz",quiz_id );
       
    
         try{
            axios.post(baseUrl+'/attempt_quiz/',QuizFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
               if(res.status === 200 || res.status=== 201){
                try{
                    axios.get(baseUrl+'/quiz_questions/'+quiz_id+'/next_question/'+quizQuestion_id).then((response)=>{ 
                        setQuizQuestionData(response.data);
                    });
        
                }catch(error){
                    console.log(error);
                }
               }
            });
        }catch(error){
            console.log(error);
        }
    }
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">  
                {quizquestionData.map((row,index)=> 
                <>
                <h4 className='mb-3 border-bottom pb-1'>{row.quiz.title}</h4>
                <div className="card">
                    <h5 className="card-header">{row.question}</h5>
                    <div className="card-body">
                        <table className="table table-bordered ">
                        <tbody>
                                <tr>
                                    <td>
                                        <Link onClick={()=>submitAnswer(row.quizQuestion_id,row.answer_1)} className='btn btn-outline-secondary'>{row.answer_1}</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link onClick={()=>submitAnswer(row.quizQuestion_id,row.answer_2)} className='btn btn-outline-secondary'>{row.answer_2}</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link onClick={()=>submitAnswer(row.quizQuestion_id,row.answer_3)} className='btn btn-outline-secondary'>{row.answer_3}</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link onClick={()=>submitAnswer(row.quizQuestion_id,row.answer_4)} className='btn btn-outline-secondary'>{row.answer_4}</Link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                </>
                )}
                </section>
            </div>
        </div>        
    )
}
export default TakeQuiz;