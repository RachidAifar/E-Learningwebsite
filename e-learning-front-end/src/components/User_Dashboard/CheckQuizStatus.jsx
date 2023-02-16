import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


function CheckQuizinCourse(props){
    const [quizData, setQuizData] =useState([]);
    //const [courseData, setCourseData] =useState([]);
    //const {course_id} = useParams();

    //const student_id= localStorage.getItem('student_id');
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(`${baseUrl}/fetch_quiz_attempt_status/${props.quiz}/${props.student}`).then((response)=>{ 
                setQuizData(response.data);
                console.log(response.data);
                
            });
            

        }catch(error){
            console.log(error);
        }
    },[]);

    
    return(
        
        <td>
            { quizData.bool===false && 
                <Link to={`take_quiz/${props.quiz}`}  className="btn btn-info btn-sm mb-2  mt-2 2 ms-2" >Take Quiz</Link>
            } 
            {  quizData.bool===true && 
                <Link className="text-success   mt-2 2 ms-2" >Attempt</Link>
               
            } 
            
        </td>
                                       
    )
}
export default CheckQuizinCourse;