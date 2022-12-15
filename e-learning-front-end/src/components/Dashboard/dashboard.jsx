import React from "react";
import {Link} from 'react-router-dom';
import MyCourses from "./MyCourses";
const Dashboard = () => {
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className='col-md-3'>
                <div className="card">
                    <h5 className="card-header">Dashboard</h5>
                    <div className="list-group list-group-flush">
                        <Link to={'/mycourses'} className="list-group-item list-group-action ">My Courses</Link>
                        <Link to={'/all-courses'} className="list-group-item list-group-action ">All Courses</Link>
                        <Link to={'/recommended-courses'} className="list-group-item list-group-action ">Recommended Courses</Link>
                        <Link to={'/profil-setting'} className="list-group-item list-group-action ">Profile Setting</Link>
                        <Link to={'/chnage-password'} className="list-group-item list-group-action ">Change Password</Link>
                        <Link to={'/logout'} className="list-group-item list-group-action text-danger">Logout</Link>
                    </div>
                </div>    
            </aside>
            <section className="col-md-9">
                <MyCourses />
            </section>
        </div>
    </div>
  );
};
export default Dashboard;