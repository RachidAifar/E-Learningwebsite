import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import { useState,useEffect } from 'react';
const baseUrl='http://127.0.0.1:8000/api';


const CourseChapter =()=>{
    // const [courseData, setCourseData] =useState([]);

    // const teacher_id= localStorage.getItem('teacher_id');
    // useEffect(()=>{
    //     //fetch courses
    //     try{
    //         axios.get(baseUrl+'/teacher_courses/'+teacher_id).then((response)=>{//geting teacher by id
    //             setCourseData(response.data);
    //         });

    //     }catch(error){
    //         console.log(error);
    //     }
    // },[]);

    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">All Chapters</h4>
                    <div className="card-body">
                     
                    </div>
                </div>
                </section>
            </div>
        </div>        
    )
}
export default CourseChapter;