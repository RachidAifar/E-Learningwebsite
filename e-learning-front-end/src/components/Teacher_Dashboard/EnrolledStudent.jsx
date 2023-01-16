import React from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';


const baseUrl='http://127.0.0.1:8000/api';


const EnrolledStudent =()=>{
    const [studentData, setStudentData] =useState([]);
    const {course_id} =useParams();
    //const teacher_id= localStorage.getItem('teacher_id');
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/fetch_enrolled_students/'+course_id).then((response)=>{//getting teacher by id
                setStudentData(response.data);
                console.log(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[course_id]);

    const handleDeleteClick=(course_id)=>{
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon:'info',
            confirmButtonText:"info",
            showConfirmButton:false
          }
        );

    }

    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">Enrolled Student List</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>date of enrolling</th>
                                    <th>Mobil Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((student,index)=>  
                                <tr>
                                    <td>{student.student.student_fullname}</td>
                                    <td >{student.student.email}</td> {/*add imagee from database*/}
                                    <td>{student.enrollment_date}</td>
                                    <td>
                                        {student.student.mobile_phone}
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
export default EnrolledStudent;