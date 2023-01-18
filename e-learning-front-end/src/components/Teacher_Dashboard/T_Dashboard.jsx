import React from "react";
import Sidebar from "./T_Sidebar";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from "react";





const baseUrl='http://127.0.0.1:8000/api';





const TeacherDashboard = () => {
    const[teacherDashboar,setTeacherDashboar]=useState([]);
    const teacher_id =localStorage.getItem('teacher_id');

    useEffect(()=>{
      //fetch courses
      try{
          axios.get(baseUrl+'/teacher/teacher_dashboard/'+teacher_id).then((response)=>{//geting teacher by id
           console.log(response.data);
           setTeacherDashboar(response.data);
          });

      }catch(error){
          console.log(error);
      }
  },[teacher_id]);


  return (
    <div className="container mt-4">
        <div className="row">
            <aside className='col-md-3'>
                <Sidebar/>
            </aside>
            <section className="col-md-9">
               <div className="row">
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h4 className="card-header bg-primary text-white">Total Courses Uploaded</h4>
                      <div className="card-body">
                        <h3><Link to={"/teacher_courses"}>{teacherDashboar.total_teacher_courses}</Link></h3>
                      </div>
                    </div>   
                  </div>
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h4 className="card-header bg-success text-white">Total Students Enrolled</h4>
                      <div className="card-body">
                        <h3><Link to={"/students_list"}>{teacherDashboar.total_teacher_student}</Link></h3>
                      </div>
                    </div>   
                  </div>
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h4 className="card-header bg-warning text-white">Total Chapters Created</h4>
                      <div className="card-body">
                        <h3><Link to={"/teacher_courses"}>{teacherDashboar.total_teacher_chapters}</Link></h3>
                      </div>
                    </div>   
                  </div>
               </div>
            </section>
        </div>
    </div>
  );
};
export default TeacherDashboard;