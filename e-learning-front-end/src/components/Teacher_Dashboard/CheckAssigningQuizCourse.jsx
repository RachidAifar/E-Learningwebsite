import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


function CheckQuizinCourse(props){
    const [quizData, setQuizData] =useState([]);
    //const [courseData, setCourseData] =useState([]);
    //const {course_id} = useParams();

    const teacher_id= localStorage.getItem('teacher_id');
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(`${baseUrl}/fetch_quiz_assign_status/${props.quiz}/${props.course}`).then((response)=>{ 
                setQuizData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[]);

    
const assignQuiz=(quiz_id)=>{
    const CourseFormData =new FormData();
    CourseFormData.append("teacher",teacher_id );
    CourseFormData.append("course",props.course );
    CourseFormData.append("quiz", props.quiz);
  
   

     try{ 
        axios.post(baseUrl+'/quiz_assign_course/',CourseFormData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        .then((res)=>{
          if(res.status===200 || res.status===201){
           
              window.location.reload();
            }
        });  
        }catch(error){
            console.log(error);
        }       
}
    
    return(
        <td>
            { quizData.bool===false && 
                <Link onClick={()=>assignQuiz(props.quiz_id)} className="btn btn-success btn-sm mb-2  mt-2 2 ms-2" >Assign Quiz</Link>
            }
            {  quizData.bool===true && 
            <>
                <Link className="text-success   mt-2 2 ms-2" >Assigned</Link>
                <Link className='btn btn-sm btn-info ms-3' to={`/attempted_student/`+props.quiz}>Attempted Students</Link>
            </>    
            } 
        </td>
       
            
      
                                       
    )
}
export default CheckQuizinCourse;