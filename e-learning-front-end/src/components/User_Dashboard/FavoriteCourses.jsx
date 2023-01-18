import React from 'react';
import { useState,useEffect } from 'react';
import Sidebar from './Sidebar'
import axios from 'axios';
import {Link} from 'react-router-dom';



const baseUrl='http://127.0.0.1:8000/api';


const FavoriteCourses =()=>{
    const [courseData, setCourseData] =useState([]);
    const student_id= localStorage.getItem('student_id');

    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/fetch_favorite_courses/'+student_id).then((response)=>{
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
                    <h4 className="card-header">Favorite Courses</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created By</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                            {courseData.map((row,index)=>  
                                <tr>
                                    <td><Link to={`/CourseDetail/${row.course.course_id}`}>{row.course.course_title}</Link></td>
                                    <td><Link to={`/teacher_detail/${row.course.teacher.teacher_id}`}>{row.course.teacher.teacher_fullname}</Link></td>
                                    <td>
                                        <Link to={`/category/${row.course.category.title.trim()}`} >{row.course.category.title}</Link>
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
export default FavoriteCourses;