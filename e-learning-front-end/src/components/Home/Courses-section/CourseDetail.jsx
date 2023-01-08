import React from "react"
import { Container, Row, Col } from "reactstrap";
import {Link,useParams} from 'react-router-dom';
import aboutImg from "../../images/pexels-negative-space-160107.jpg";
//import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {  RelatedCourses} from "../../Data/Data";
import "./courseDetail.css";
import CourseCard from "./CourseCard";
import axios from 'axios';
import { useState,useEffect } from 'react';




const baseUrl='http://127.0.0.1:8000/api';


  // const {course_id}=useParams();

const CourseDetail = () => {

  const [chapterData, setChapterCourseData] =useState([]);
  const [courseData, setCourseData] =useState([]);
  const [teacherData, setTeacherData] =useState([]);
  const{course_id}=useParams();
 

  useEffect(()=>{
      //fetch courses
      try{
          axios.get(baseUrl+'/course/'+course_id).then((response)=>{//geting teacher by id
              setCourseData(response.data);
              setTeacherData(response.data.teacher);
              setChapterCourseData(response.data.course_chapters)
          });

      }catch(error){
          console.log(error);
      }
  },[course_id]);

  return(
    <section>
      <Container className="card_courseDetail">
        <Row>
          <Col lg="5" md="5">
            <div className="thumbail">
              <img  src={courseData.feature_img} alt="" className="w-100 mb-5" />
            </div>
          </Col>

          <Col mb="5" md="7">
            <div className="detail__content">
              <h3>{courseData.course_title}</h3>
              <p>
              {courseData.course_description}
              </p>
              <p className="fw-bold">Upoaded by: <Link to={"/teacher_detail:teacher_id"}>{teacherData.teacher_fullname}</Link></p>
              <p className="fw-bold">Time: 2 Hours 13 Minuts</p>  
              <p className="fw-bold">Total Enrolled: 470 Student</p> 
              <p className="fw-bold">Rating 4/5</p> 
            </div>
          </Col>
        </Row>
        <div className="listItem mb-3">
        <Card className="text-bg-primary p-3" style={{ width: '58rem'  }}>
          <Card.Header><h4>Course Videos</h4></Card.Header>
            <ListGroup variant="flush">
            {chapterData.map((chapter,index) =>
              <li className="text-bg-light p-3 ms-2 mt-2 mb-2">{chapter.chapter_title}<button className="btn btn-sm btn-info mt-1 float-end" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="ri-youtube-fill"></i> Play</button>
              <div className="modal fade" id="videoModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg mt-5 pt-5">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="ratio ratio-16x9">
                    <iframe src={chapter.video} title="YouTube video" allowFullScreen></iframe>
                  </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
              </div>
              </li>
               )}
            </ListGroup>
          </Card>
        </div>
      </Container>
      <Container>
        <Row>
          <Col lg="12" className="mt-5 mb-2">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h4>Related Courses</h4>
                
              </div>
            </div>
          </Col>
          {RelatedCourses.map((item) => (
            <Col lg="4" md="3" sm="4" >
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CourseDetail;