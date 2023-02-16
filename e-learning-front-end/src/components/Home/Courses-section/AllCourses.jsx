import React from "react";
import "./courses.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api/course/';


const AllCourses = () => {

    const [courseData, setCourseData] =useState([]);
    const [nextUrl, setNextUrl] =useState(baseUrl);
    const [previousUrl, setPreviousUrl] =useState([]);
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl).then((response)=>{//getting teacher by id  
                setNextUrl(response.data.next);
                setPreviousUrl(response.data.previous);
                setCourseData(response.data.results);
            });

        }catch(error){
            console.log(error);
        }
    },[]);

    const paginationHandler=(url)=>{
        try{
            axios.get(url).then((response)=>{//getting teacher by id
                setCourseData(response.data.results);
                setNextUrl(response.data.next);
                setPreviousUrl(response.data.previous);
            });

        }catch(error){
            console.log(error);
        }
    }
    return (
        <>
        <h3 className="pb-1 mt-4 ms-5">Our Courses</h3>
        <div className="container  mt-4 me-1">
            <div className="row mb-5 mt-4 me-1">
            {courseData && courseData.map((course,index)=>
                <div className="col-sm-3 mb-4 me-4" >
                <div className="course_card">
                <Link to={`/CourseDetail/${course.course_id}`}><img className="card-img-top" src={course.feature_img} alt={course.course_title}/></Link>
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/CourseDetail/${course.course_id}`}>{course.course_title}</Link></h5>
                    <div className=" d-flex justify-content-between align-items-center">
                    <p className="lesson d-flex align-items-center gap-1">
                        <i className="ri-book-open-line"></i>  Lessons
                    </p>

                    <p className="students d-flex align-items-center gap-1">
                        <i className="ri-user-line"></i> K
                    </p>
                    </div>

                    <div className=" d-flex justify-content-between align-items-center">
                    <p className="rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill"></i> Rating:
                    </p>

                    <p className="enroll d-flex align-items-center gap-1">
                        <Link to={`/CourseDetail/${course.course_id}`}>Enroll Now</Link> 
                    </p>
                    </div>
                </div>
                </div>

                </div>
            )}
            </div>
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    {previousUrl &&
                        <li className="page-item"><button class="page-link" onClick={()=>paginationHandler( previousUrl)}><i class="ri-arrow-left-line"></i> Previous</button></li>
                    }
                    {nextUrl &&
                        <li className="page-item"><button class="page-link" onClick={()=>paginationHandler(nextUrl)} >Next <i class="ri-arrow-right-line"></i></button></li>
                    }   
                </ul>
            </nav>
           
         

        </div>
        </>
    )
};



export default AllCourses;






















    
