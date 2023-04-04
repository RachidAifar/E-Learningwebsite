import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { olineCoursesData, ourCoursesData} from "../../Data/Data";
import "./courses.css";
import CourseCard from "./CourseCard";
import { useState,useEffect } from 'react';
import axios from "axios";
//import AllCourses from "./AllCourses"

const baseUrl='http://127.0.0.1:8000/api';
const Courses = () => {
  const [courseData,setCourseData] =useState([]);
  const [popularCourseData,setPopularCourseData] =useState([]);
  const [teacherData,setTeacherData] =useState([]);

//todo: addd cards to home so you can display the courses.
useEffect(()=>{
      //fetch courses
      try{
          axios.get(baseUrl+'/course/?result=3').then((response)=>{//getting teacher by id
              setCourseData(response.data.results);
          });

      }catch(error){
          console.log(error);
      }
      //fetch popular courses
      try{
        axios.get(baseUrl+'/popular_courses/?popular=1').then((response)=>{//getting teacher by id
          setPopularCourseData(response.data);
        });

    }catch(error){
        console.log(error);
    }
    //fetch teachers
    //fetch popular courses
    try{
      axios.get(baseUrl+'/popular_teachers/?popular=1').then((response)=>{//getting teacher by id
        setTeacherData(response.data);
      });

  }catch(error){
      console.log(error);
  }
  },[]);

  return (
    <>
      <Container className="container">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h3 className="pb-1 mb-2 mt-3">Our Courses</h3>
                <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                      consequatur libero quod voluptatibus ullam quia quas, vitae
                      voluptatem recusandae reprehenderit!
                </p>
              </div>
              <div>
                    <Link to={"/all_courses"} className="w-50 text-end"><button className="btn"> See All</button></Link>
              </div>
            </div>
            <div className="row mb-4 ms-4">
              {courseData && courseData.map((course,index)=>
                <Col lg="4" md="6" sm="6">
                  <div className="course_card mb-5">
                  <div className="single__course__item ">
                    <Link to={`/CourseDetail/${course.course_id}`}><img className="card-img-top " src={course.feature_img} alt={course.course_title}/></Link>
                      <div className="card-body mb-5">
                        <h5 className="card-title mr-0 mt-2"><Link to={`/CourseDetail/${course.course_id}`}>{course.course_title}</Link></h5>
                        <div className="d-flex justify-content-between align-items-center mt-3 ">
                          <p className="lesson d-flex align-items-center gap-1">
                              <i className="ri-book-open-line"></i>  Lessons
                          </p>
                          

                          <p className="students d-flex align-items-center gap-1">
                          {course.total_enrolled_students}<i className="ri-user-line"></i>
                          </p>
                        </div>

                        <div className=" d-flex justify-content-between align-items-center">
                          <p className="rating d-flex align-items-center gap-1">
                              <i className="ri-star-fill"></i> Rating:{course.course_rating}
                          </p>

                          <p className="enroll d-flex align-items-center gap-1">
                              <Link to={`/CourseDetail/${course.course_id}`}>Enroll Now</Link> 
                          </p>
                        </div>
                      </div>
                  </div>
                  </div>
                </Col>
              )}
            </div>
            <hr />
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h4 className="pb-1 mb-2 mt-3">Popular Courses</h4>
                <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                      consequatur libero quod voluptatibus ullam quia quas, vitae
                      voluptatem recusandae reprehenderit!
                  </p>
              </div>
                <div className="w-50 text-end">
                  <Link to={"/poupler_courses"} className="float-end"><button className="btn"> See All</button></Link>
                </div>
            </div>
            <div className="row mb-4 ms-4">
              {popularCourseData && popularCourseData.map((raw,index)=>
                <Col lg="4" md="6" sm="6">
                  <div className="course_card mb-5">
                  <div className="single__course__item">
                    <Link to={`/CourseDetail/${raw.course.course_id}`}><img className="card-img-top " src={raw.course.feature_img} alt={raw.course.course_title}/></Link>
                      <div className="card-body mb-5">
                        <h5 className="card-title mr-0 mt-2"><Link to={`/CourseDetail/${raw.course.course_id}`}>{raw.course.course_title}</Link></h5>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p className="lesson d-flex align-items-center gap-1">
                              <i className="ri-book-open-line"></i> Lessons
                          </p>
                          {/* <p className="enroll d-flex align-items-center gap-1">
                              <Link to={"/CourseDetail/1"}>Enroll Now</Link> 
                          </p> */}

                          <p className="students d-flex align-items-center gap-1">
                          {raw.course.course_views}<i className="ri-user-line"></i>
                          </p>
                        </div>

                        <div className=" d-flex justify-content-between align-items-center">
                          <p className="rating d-flex align-items-center gap-1">
                              <i className="ri-star-fill"></i> Rating:{raw.rating}
                          </p>

                          <p className="enroll d-flex align-items-center gap-1">
                              <Link to={`/CourseDetail/${raw.course.course_id}`}>Enroll Now</Link> 
                          </p>
                        </div>
                      </div>
                  </div>
                  </div>
                </Col>
              )}
            </div>
           
         <Row>
        </Row>
        <hr />
        <Row>
          <Col lg="12" className="mb-2 mt-3">
          
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h4>Popular Online Courses</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              {<div className="w-50 text-end">
                <a href="https://www.udemy.com/courses/search/?q=programming&src=sac&kw=progra"  rel="noreferrer" target="_blank"><button className="btn"> See All</button></a>
              </div>}
            </div>
          </Col>
          {ourCoursesData.map((item) => (
            <Col lg="4" md="6" sm="6" onClick={() => this.goToDetails(item)}>
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
        <hr />
        <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h3 className="pb-1 mb-2 mt-3">Populer Teacher</h3>
                <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                      consequatur libero quod voluptatibus ullam quia quas, vitae
                      voluptatem recusandae reprehenderit!
                </p>
              </div>
              <div>
                    <Link to={"/poupler_teachers"} className="w-50 text-end"><button className="btn"> See All</button></Link>
              </div>
            </div>
            <div className="row mb-2 ms-4">
              {teacherData && teacherData.map((raw,index)=>
                <Col lg="4" md="6" sm="6">
                  <div className="course_card mb-5">
                  <div className="single__course__item">
                    <Link to={`/teacher_detail/${raw.teacher_id}`}><img className="card-img-top " src={raw.teacher_profile} alt={raw.teacher_fullname}/></Link>
                      <div className="card-body mb-5">
                        <h5 className="card-title mr-0 mt-2"><Link to={`/teacher_detail/${raw.teacher_id}`}>{raw.teacher_fullname}</Link></h5>
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
                </Col>
              )}
            </div>
      </Container>

    </>
  );
};

export default Courses;