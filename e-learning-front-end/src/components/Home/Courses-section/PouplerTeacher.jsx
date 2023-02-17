import React from "react";
import { useEffect,useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {  Col } from "reactstrap";


import "./courses.css";





const baseUrl='http://127.0.0.1:8000/api'; 
const PouplerTeacher = () => {
    const [teacherData,setTeacher] =useState(null);
    useEffect(()=>{
       axios.get(baseUrl+'/popular_teachers/?all=1/').then((response)=>{
            setTeacher(response.data)
       });
    },[]);
    return (
       <>
        <h3 className="pb-1 mt-4 ms-4">Teachers</h3>
            <p className="mt-2 ms-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
            <div className="container  mt-4 me-1">
            <div className="row mb-4 ms-4">
              {teacherData && teacherData.map((raw,index)=>
              <div className="col-sm-3 mb-4 me-4" >
                  <div className="course_card mb-5">
                    <Link to={`/CourseDetail/${raw.teacher_id}`}><img className="card-img-top " src={raw.teacher_profile} alt={raw.teacher_fullname}/></Link>
                      <div className="card-body mb-5">
                        <h5 className="card-title mr-0 mt-2"><Link to={`/CourseDetail/${raw.teacher_id}`}>{raw.teacher_fullname}</Link></h5>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p className="lesson d-flex align-items-center gap-1">
                              <i className="ri-book-open-line"></i> Lessons
                          </p>
                          {/* <p className="enroll d-flex align-items-center gap-1">
                              <Link to={"/CourseDetail/1"}>Enroll Now</Link> 
                          </p> */}

                          <p className="students d-flex align-items-center gap-1">
                          <i className="ri-user-line"></i><Link to={`/teacher_detail/${raw.teacher_id}`}>Deatil</Link> 
                          </p>
                        </div>
                      </div>
                  </div>
                  </div>
              )}
            </div>
            
        {/* pagination */}
        <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center ml-5">
                <li className="page-item">
                <a className="page-link" href="/" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a className="page-link" href="/">1</a></li>
                <li className="page-item"><a className="page-link" href="/">2</a></li>
                <li className="page-item"><a className="page-link" href="/">3</a></li>
                <li className="page-item">
                <a className="page-link" href="/" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>

    </div>

    </>
    );
};



export default PouplerTeacher;
