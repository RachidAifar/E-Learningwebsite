import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


const TeacherCourses =()=>{
    const [courseData, setCourseData] =useState([]);

    const teacher_id= localStorage.getItem('teacher_id');
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/teacher_courses/'+teacher_id).then((response)=>{//geting teacher by id
                setCourseData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[]);

    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">My Courses</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created By</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.map((course,index)=>  
                                <tr>
                                    <td><Link to={"/course_chapter/"+course.course_id}>{course.course_title}</Link></td>
                                    <td><Link to={"/"}>Rachid Aifar</Link></td>
                                    <td><img src={course.feature_img} alt={course.course_title} width={"200"} className="rounded" /></td> {/*add imagee from database*/}
                                    <td>
                                        <Link className="btn btn-danger btn-sm mb-2  mt-0 2 ms-2" >Delete</Link>
                                        <Link className='btn btn-success btn-sm  mt-0 ms-2' to={'/add_chapter/'+course.course_id}>Add Chapters</Link>
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
export default TeacherCourses;