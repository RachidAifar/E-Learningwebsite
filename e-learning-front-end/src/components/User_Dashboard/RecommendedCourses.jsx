import React from 'react';
import { useState,useEffect } from 'react';
import Sidebar from './Sidebar'
import axios from 'axios';
import {Link} from 'react-router-dom';



const baseUrl='http://127.0.0.1:8000/api';


const RecommendedCourses =()=>{
    const [courseData, setCourseData] =useState([]);
    const student_id= localStorage.getItem('student_id');

    
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/fetch_recommended_courses/'+student_id).then((response)=>{
                setCourseData(response.data);
                console.log(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[student_id]);



    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">Recommended Courses</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Technologies</th>
                                    <th>Enrollment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {courseData.map((row,index)=>  
                                <tr>
                                    <td><Link to={`/CourseDetail/${row.teacher.course_id}`}>{row.teacher.course_title}</Link></td>
                                    <td>{row.teacher.technologies}</td>
                                    <td>
                                        {row.teacher.enrollment_date}
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
export default RecommendedCourses;