import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';

//this is child component of AttemptedStudent
const baseUrl='http://127.0.0.1:8000/api';


function QuizResult(props){
    const [resultData, setResultData] =useState([]);
    //const [courseData, setCourseData] =useState([]);
    //const {course_id} = useParams();

    useEffect(()=>{
        //fetch courses
        try{
            axios.get(`${baseUrl}/fetch_quiz_result/${props.quiz}/${props.student}`).then((response)=>{ 
                setResultData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[]); 
    return(
        <div className="modal-dialog ">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Quiz Result</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <table className='table table-bordered '>
                        <thead>
                            <tr>
                                <th>Total Questions</th>
                                <th>Answered Questions</th>
                                <th>Total Correct Answers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{resultData.total_questions}</td>
                                <td>{resultData.total_answered_question}</td>
                                <td>{resultData.total_correct_answers}</td>
                            </tr>
                        </tbody>    
                    </table>
                </div>
            </div>
        </div>                                   
    )
}
export default QuizResult;