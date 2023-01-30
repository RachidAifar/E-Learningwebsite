import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from "react";
import Sidebar from "./Sidebar";


const baseUrl='http://127.0.0.1:8000/api';





const Dashboard = () => {
    const[dashboar,setDashboar]=useState([]);
    const student_id =localStorage.getItem('student_id');

    useEffect(()=>{
      //fetch courses
      try{
          axios.get(baseUrl+'/student/dashboard/'+student_id).then((response)=>{//geting teacher by id
           console.log(response.data);
           setDashboar(response.data);
          });

      }catch(error){
          console.log(error);
      }
  },[student_id]);

  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
  if(studentLoginStatus!== 'true'){
    window.location.href='/login'
  }


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
                      <h4 className="card-header bg-primary text-white">Total Enrolled Courses</h4>
                      <div className="card-body">
                        <h3><Link to={"/my-courses"}>{dashboar.total_enrolled_courses}</Link></h3>
                      </div>
                    </div>   
                  </div>
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h4 className="card-header bg-success text-white">Total Favorite Courses </h4>
                      <div className="card-body">
                        <h3><Link to={"/favorite-courses"}>{dashboar.total_favorite_courses}</Link></h3>
                      </div>
                    </div>   
                  </div>
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h4 className="card-header bg-warning text-white">Assignments</h4>
                      <div className="card-body">
                        <h5>Complted: <Link to={"/my_assignment"}>{dashboar.total_completed_assignments}</Link></h5>
                        <h5>Pading: <Link to={"/my_assignment"}>{dashboar.total_pending_assignment}</Link></h5>
                      </div>
                    </div>   
                  </div>
               </div>
            </section>
        </div>
    </div>
  );
};
export default Dashboard;