import {Link, useAsyncError} from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';



const baseUrl='http://127.0.0.1:8000/api';


const Sidebar = () => {
    const [notificationData,setNotificationData] =useState([]);
    const student_id =localStorage.getItem('student_id');
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/fetch_all_notifications/'+student_id)
            .then((response)=>{
                if(response.status===200){
                    console.log(response);
                    setNotificationData(response.data);

                }
            });
        }catch(error){
            console.log(error);
        }
    },[student_id]);







    return (
    <div className="card">
        <h5 className="card-header">Dashboard</h5>
        <div className="list-group list-group-flush">
            <Link to={'/dashboard'} className="list-group-item list-group-action ">Dashboard</Link>
            <Link to={'/my-courses'} className="list-group-item list-group-action ">My Courses</Link>
            <Link to={'/my_assignment'} className="list-group-item list-group-action ">My Assignment <span className='float-end btn btn-danger btn-sm mt-1 text-white'>{notificationData.length}</span></Link>
            <Link to={'/favorite-courses'} className="list-group-item list-group-action ">Favorite Courses</Link>
            {/* <Link to={'/recommended-courses'} className="list-group-item list-group-action ">Recommended Courses</Link> */}
            <Link to={'/profil-setting'} className="list-group-item list-group-action ">Profile Setting</Link>
            <Link to={'/chnage-password'} className="list-group-item list-group-action ">Change Password</Link>
            <Link to={'/student_logout'} className="list-group-item list-group-action text-danger">Logout</Link>
        </div>
    </div>
    )
}
export default Sidebar ;
