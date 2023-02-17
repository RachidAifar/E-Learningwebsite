import {Link, useParams} from 'react-router-dom'
import React from "react";
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Container, Row, Col } from "reactstrap";
import TeacherImage from "../images/202100527_1640328372828097_4475152047372531726_n.jpg";






const baseUrl='http://127.0.0.1:8000/api';


const TeacherDetail = () => {
  const [teacherData, setteacherData] =useState([]);
  const [courseData, setCourseData] =useState([]);
  const [skillsData, setskillsData] =useState([]);

  let {teacher_id}=useParams();

  useEffect(()=>{
    //fetch courses
    try{
        axios.get(baseUrl+'/teacher/'+teacher_id).then((response)=>{//geting teacher by id
          setteacherData(response.data);
          setCourseData(response.data.teacher_courses);
          setskillsData(response.data.skills_list);
        });

    }catch(error){
        console.log(error);
    }
},[teacher_id]);


    return (
    <section>
      <Container className="card mt-5">
        <Row>
          <Col lg="5" md="5" className='mt-4'>
            <div className="thumbail">
              <img src={teacherData.teacher_profile} alt="Teacher_Image" className="w-100" />
            </div>
          </Col>

          <Col md="7" className='mt-4'>
            <div className="detail__content">
              <h3>{teacherData.teacher_fullname}</h3>
              <p>{teacherData.bio}</p>
              <p className="fw-bold">Speciality: <span className='btn btn-info btn-sm'>{teacherData.speciality}</span></p>
              <p className="fw-bold">Skills:&nbsp;
              {skillsData.map((skills,index) =>
                <>
                  <Link className="badge bg-warning ms-1" to={`/teacher_skill_course/${skills.trim()}/${teacherData.teacher_id}`}>{skills}</Link>
                </>
              )}
              </p>
              <p className="fw-bold">Total Courses: {teacherData.total_teacher_courses}</p>
              <p className="fw-bold">Contact Info: <span className='emphasis-text'>{teacherData.email}</span> </p>
            </div>
           
          </Col>
        </Row>
        <div className="listItem mb-3">
          <div className='card mt-4'>
            <h5 className='card-header'>Course List</h5>
            <div className='list-group list-group-flush'>
              {courseData.map((course,index)=>
                <Link to={`/CourseDetail/${course.course_id}`} className="list-group-item list-group-item-action">{course.course_title}</Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
    )
}
export default TeacherDetail ;
