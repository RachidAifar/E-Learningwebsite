import React from "react";
import { useEffect,useState } from "react";
import {Link} from 'react-router-dom';
import "./courses.css";
import axios from 'axios';


const baseUrl='http://127.0.0.1:8000/api';



const PouplerCourses = () => {
    const [courseData,setCourseData] =useState(null);
   
    useEffect(()=>{
    try{
        axios.get(baseUrl+'/popular_courses/?all=1').then((response)=>{
            setCourseData(response.data);
        });
    }catch(error){
        console.log(error);
    }
      
    },[]);





    return (
        <>
        <h3 className="pb-1 mt-4 ms-5">Popular Courses</h3>
        <div className="container  mt-4 me-1">
            <div className="row mb-5 mt-4 me-1">
            {courseData && courseData.map((row,index)=>
                <div className="col-sm-3 mb-4 me-4" >
                <div className="course_card">
                <Link to={`/CourseDetail/${row.course.course_id}`}><img className="card-img-top" src={row.course.feature_img} alt={row.course.course_title}/></Link>
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/CourseDetail/${row.course.course_id}`}>{row.course.course_title}</Link></h5>
                    <div className=" d-flex justify-content-between align-items-center">
                    <p className="lesson d-flex align-items-center gap-1">
                        <i className="ri-book-open-line"></i>  Lessons
                    </p>

                    <p className="students d-flex align-items-center gap-1">
                        <i className="ri-user-line"></i> {row.course.course_views}
                    </p>
                    </div>

                    <div className=" d-flex justify-content-between align-items-center">
                    <p className="rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill"></i> <Link className="btn btn-info btn-sm">Rating:{row.rating}</Link> 
                    </p>

                    <p className="enroll d-flex align-items-center gap-1">
                        <Link to={`/CourseDetail/${row.course.course_id}`}>Enroll Now</Link> 
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
    );
};



export default PouplerCourses;
