import React from 'react';
import { useState,useEffect } from 'react';
import Sidebar from './Sidebar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';



const baseUrl='http://127.0.0.1:8000/api';


const MyAssignment =()=>{
    const [assignmentData, setAssignmentData] =useState([]);



    const student_id= localStorage.getItem('student_id');

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/fetch_student_assignment/'+student_id).then((response)=>{//geting assignment by teacher and student id
                setAssignmentData(response.data);
                console.log(response.data);
            });
            

        }catch(error){
            console.log(error);
        }
        
    },[student_id]);

    
    const markasDone =(assignemnt_id,title,detail,teacher,student)=>{
        const CourseFormData =new FormData();
        CourseFormData.append("teacher", teacher);
        CourseFormData.append("student", student);
        CourseFormData.append("title", title);
        CourseFormData.append("detail", detail);
        CourseFormData.append("student_status", true);
        try{ 
        axios.put(baseUrl+'/update_assignment_status/'+assignemnt_id,CourseFormData,{
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
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">My Assignment</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Detail</th>
                                    <th>Created By</th>
                                    <th>Action</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                            {assignmentData.map((row,index)=>  
                                <tr>
                                    <td>{row.title}</td>
                                    <td>{row.detail}</td>
                                    <td><Link to={`/teacher_detail/${row.teacher.teacher_id}`}>{row.teacher.teacher_fullname}</Link></td>
                                    <td>
                                        {row.student_status===false && 
                                            <Link className='btn btn-sm btn-info' onClick={()=>markasDone(row.id,row.title, row.detail, row.teacher.teacher_id, row.student.student_id)}>Mark as Done</Link>
                                        }
                                        { row.student_status===true&& 
                                            <Link className='btn btn-sm btn-success'>Completed</Link>
                                        }
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
export default MyAssignment;