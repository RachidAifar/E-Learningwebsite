import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


const TeacherCourses =()=>{
    const [courseData, setCourseData] =useState([]);
    

    const teacher_id= localStorage.getItem('teacher_id');
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/teacher_courses/'+teacher_id).then((response)=>{//getting teacher by id
                setCourseData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[teacher_id]);

    const handleDeleteClick=(course_id)=>{
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon:'info',
            timer:5000,
            confirmButtonText:'Continue',
            showConfirmButton: true
          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/course/'+course_id).then((res)=>{
                        Swal.fire('success','Course has been deleted');
                    });
                }catch(error){
                    Swal.fire('error','Course has not been deleted!!');
            }}else{  
                Swal.fire('error','Course has been delted!!!');
            }
          })
          

    }

    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-2'>
                    <Sidebar/>
                </aside>
                <section className="col-md-10">    
                <div className="card">
                    <h4 className="card-header">My Courses</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Total Enrolled</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.map((course,index)=>  
                                <tr>
                                    <td>
                                        <Link to={"/course_chapter/"+course.course_id}>{course.course_title}</Link>
                                        <hr />
                                        {course.course_rating &&
                                            <span>Rating: {course.course_rating}/5</span>
                                        }
                                        {!course.course_rating &&
                                            <span>No Rating</span>
                                        }
                                        
                                    </td>
                                    <td ><img src={course.feature_img} alt={course.course_title} width={"100"} className="rounded ms-1"/></td> {/*add imagee from database*/}
                                    <td><Link to={'/enrolled_students/'+course.course_id} className='' >{course.total_enrolled_students}</Link></td>
                                    
                                    <td>
                                        <Link to={'/add_chapter/'+course.course_id} className='btn btn-success btn-sm' >Add Chapters</Link>
                                        <Link to={'/edit_course/'+course.course_id} className="btn btn-info btn-sm mb-2  mt-2 2 ms-2" >Edit</Link>
                                        <Link onClick={()=>handleDeleteClick(course.course_id)} className="btn btn-danger btn-sm mb-2  mt-2 2 ms-2" >Delete</Link>
                                        <Link to={'/study_materials/'+course.course_id} className="btn btn-primary btn-sm mb-2  mt-2 2 ms-2" >Study Material</Link> 
                                        <Link to={'/assign_quiz/'+course.course_id} className="btn btn-warning btn-sm mb-2  mt-2 2 ms-2" >Assign Quiz</Link>
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