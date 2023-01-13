import React from "react";
import "./courses.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


const AllCourses = () => {

    const [courseData, setCourseData] =useState([]);
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/course').then((response)=>{//getting teacher by id
                setCourseData(response.data);
                console.log(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[]);
    return (
        <>
        <h3 className="pb-1 mt-4 ms-5">Our Courses</h3>
        <div className="container mt-4 me-1">
            <div className="row mt-4 me-1">
            {courseData && courseData.map((course,index)=>
                <div className="col-sm-3 me-4" >
                <div className="course_card ">
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
                    <li className="page-item">
                        <a className="page-link" href="/" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a class="page-link" href="/">1</a></li>
                    <li className="page-item"><a class="page-link" href="/">2</a></li>
                    <li className="page-item"><a class="page-link" href="/">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="/" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
           
         

        </div>
        </>
    )
};



export default AllCourses;






















    
