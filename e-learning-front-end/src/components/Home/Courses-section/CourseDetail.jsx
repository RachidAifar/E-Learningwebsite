import React from "react"
import { Container, Row, Col, Button } from "reactstrap";
import {Link,useParams} from 'react-router-dom';
//import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import "./courseDetail.css";

import axios from 'axios';
import { useState,useEffect } from 'react';




const baseUrl='http://127.0.0.1:8000/api';

const siteUrl='http://127.0.0.1:8000/';


  // const {course_id}=useParams();

const CourseDetail = () => {

  const [chapterData, setChapterCourseData] =useState([]);
  const [courseData, setCourseData] =useState([]);
  const [teacherData, setTeacherData] =useState([]);
  const [relatedCourseData, setrelatedCourseData] =useState([]);
  const [technoloListData, settechnoloListData] =useState([]);
  const [userLoginStatus, setuserLoginStatus]=useState([]);
  const [userEnrollStatus, setuserEnrollStatus]=useState([]);

  const{course_id}=useParams();
 const student_id =localStorage.getItem('student_id');

  useEffect(()=>{
      //fetch courses
      try{
          axios.get(baseUrl+'/course/'+course_id).then((response)=>{//geting teacher by id
              setCourseData(response.data);
              setTeacherData(response.data.teacher);
              setChapterCourseData(response.data.course_chapters)
              setrelatedCourseData(JSON.parse(response.data.related_videos))
              settechnoloListData(response.data.technologies_list)
          });

      }catch(error){
          console.log(error);
      }
      //fetch enroll status
      try{
        axios.get(baseUrl+'/fetch_enroll_status/'+student_id+'/'+course_id).then((response)=>{//geting teacher by id
           if(response.data.bool===true){
            setuserEnrollStatus('success');
           }
        });

      }catch(error){
        console.log(error);
      }
      const studentLoginStatus= localStorage.getItem('studentLoginStatus');//the redirect the loged in user to dashboard
      if(studentLoginStatus==='true'){
          setuserLoginStatus('success')
      };
  },[student_id,course_id]);


const enrollCourse=()=>{
        const student_id = localStorage.getItem("student_id");
        const CourseFormData =new FormData();
        CourseFormData.append("course",course_id );
        CourseFormData.append("student", student_id);
      
       

         try{ 
            axios.post(baseUrl+'/student_enroll_course/',CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
              if(res.status===200 || res.status===201){
                Swal.fire({
                    title: 'you have successfully enrolled in this course',
                    icon: 'success',
                    toast:true,
                    timer:3000,
                    position:"",
                    timerProgressBar:true,
                    showConfirmButton:false
                  });
                  userEnrollStatus('success');
                }
            });  
        }catch(error){
            console.log(error);
        }
}

  //console.log(relatedCourseData);
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
            <div className="detail__content mb-5">
              <h3>{courseData.course_title}</h3>
              <p>
              {courseData.course_description}
              </p>
              <p className="fw-bold">Upoaded by: <Link to={`/teacher_detail/:${teacherData.teacher_id}`}>{teacherData.teacher_fullname}</Link></p>
              <p className="fw-bold">technologies:&nbsp;
              {technoloListData.map((tech,index) =>
                <>
                  <Link className="badge bg-warning ms-1" to={`/category/${tech.trim()}`}>{tech}</Link>
                </>
              )}
              </p>
              <p className="fw-bold">Time: 2 Hours 13 Minuts</p>  
              <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Students</p> 
              <p className="fw-bold">Rating 4/5</p>
              {userEnrollStatus ==='success' && userLoginStatus==='success' &&
                <p><span className="btn btn-success mb-5" >you have already enrolled in this course</span> </p>
              }
              {userLoginStatus ==='success' && userEnrollStatus !== 'success' &&
                <p><Button  onClick={enrollCourse} type="Button" className="btn btn-primary mb-5" >Enroll Now</Button> </p>
              }
              {userLoginStatus !=='success' &&
                <p><Link to={"/login"}  onClick={enrollCourse} type="Button" className="btn btn-danger mb-5" >Please Login to Enroll in this course</Link> </p>
              }
            </div>
          </Col>
        </Row>
        <div className="listItem mb-3">
        <Card className="text-bg-primary p-3" style={{ width: '58rem'  }}>
        {userEnrollStatus ==='success' && userLoginStatus==='success' &&
          <>
          <Card.Header><h4>In this course</h4></Card.Header>
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
            </>
          } 
          </Card>
        </div>
      </Container>
      <Container>
      <Link to={"/all_courses"} className="float-end"><button className="btn"> See All</button></Link>
            <h3 className="pb-1 mb-4 mt-5">Realted Courses</h3>
            <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
            <div className="row mb-4">
              {relatedCourseData.map((rcourse,index)=>
                <Col lg="4" md="6" sm="6">
                  <div className="course_card">
                  <div className="single__course__item">
                    <Link target={"_blank"} to={`/CourseDetail/${rcourse.pk}`}><img className="card-img-top " src={`${siteUrl}media/${rcourse.fields.feature_img}`} alt={rcourse.fields.course_title}/></Link>
                      <div className="card-body">
                        <h5 className="card-title mr-0"><Link to={`/CourseDetail/${rcourse.pk}`}>{rcourse.fields.course_title}</Link></h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="lesson d-flex align-items-center gap-1">
                              <i className="ri-book-open-line"></i>  Lessons
                          </p>

                          <p className="students d-flex align-items-center gap-1">
                              <i className="ri-user-line"></i> K
                          </p>
                        </div>

                        <div className=" d-flex justify-content-between align-items-center">
                          <p className="rating d-flex align-items-center gap-1">
                              <i className="ri-star-fill"></i> Rating:
                          </p>

                          <p className="enroll d-flex align-items-center gap-1">
                              <Link to={"/CourseDetail/1"}>Enroll Now</Link> 
                          </p>
                        </div>
                      </div>
                  </div>
                  </div>
                </Col>
              )}
              </div>
      </Container>
    </section>
  );
};

export default CourseDetail;