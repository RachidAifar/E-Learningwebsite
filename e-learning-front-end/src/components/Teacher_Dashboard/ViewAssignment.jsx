import React from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


const ViewAssignment =()=>{
    const [assignmentData, setAssignmentDataData] =useState([]);
    const [totalResult, setTotalResult] =useState([0]);
    const{teacher_id}=useParams();
    const{student_id}=useParams();
   

    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/student_assignment/'+student_id+'/'+teacher_id).then((response)=>{//geting assignment by teacher and student id
                setTotalResult(response.data.length);
                setAssignmentDataData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[student_id,teacher_id]);


    //delete date 
    //res for confirm message delete
    // const handleDeleteClick = (chapter_id) => {
    //     Swal.fire({
    //         title: 'Confirm!',
    //         text: 'Do you want to continue deleting this chapter?',
    //         icon: 'info',
    //         confirmButtonText: 'Continue',
    //         showCancelButton: true
    //       }).then((result)=>{
    //         if(result.isConfirmed){
    //             try{
    //                 axios.delete(baseUrl+'/chapter/'+chapter_id).then((res)=>{
    //                     Swal.fire('success','Chapter has been deleted');
    //                     try{
    //                         axios.get(baseUrl+'/course_chapter/'+course_id).then((response)=>{//geting teacher by id
    //                             setTotalResult(response.data.length);
    //                             setChapterCourseData(response.data);
    //                         });
                
    //                     }catch(error){
    //                         console.log(error);
    //                     }
    //                 });
                   
    //             }catch(error){
    //                 Swal.fire('error','Chapter has not been deleted!!');
    //         }}else{  
    //             Swal.fire('error','Data has been delted!!!');
    //         }
    //       })
    // }
    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">All Assignments : {totalResult}<Link className="btn btn-success btn-sm float-end" to={`/student_assignment/${student_id}/${teacher_id}`}>Add Assignment</Link></h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>detail</th>
                                        <th>Created date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignmentData.map((row,index)=>  
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>{row.detail}</td>
                                        <td>{row.created_time}</td>
                                        <td>
                                            {row.student_status===false && 
                                                <Link className='btn btn-sm btn-warning'>Pending</Link>
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
export default ViewAssignment;