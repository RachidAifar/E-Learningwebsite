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

//todo: addd cards to home so you can display the courses.
useEffect(()=>{
      //fetch courses
      try{
          axios.get(baseUrl+'/course/?result=3').then((response)=>{//getting teacher by id
              setCourseData(response.data);
              console.log(response.data);
          });

      }catch(error){
          console.log(error);
      }
  },[]);

  return (
    <>

      <Container className="container">

           <Link to={"/all_courses"} className="float-end"><button className="btn"> See All</button></Link>
            <h3 className="pb-1 mb-4 mt-5">Our Courses</h3>
            <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
            <div className="row mb-4 ms-4">
              {courseData && courseData.map((course,index)=>
                <Col lg="4" md="6" sm="6">
                  <div className="course_card mb-5">
                  <div className="single__course__item">
                    <Link to={`/CourseDetail/${course.course_id}`}><img className="card-img-top " src={course.feature_img} alt={course.course_title}/></Link>
                      <div className="card-body mb-5">
                        <h5 className="card-title mr-0"><Link to={`/CourseDetail/${course.course_id}`}>{course.course_title}</Link></h5>
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
         <Row>
           {/* <Col lg="12" className="mb-2">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50 mt-5">
                <h4>Online Courses</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
                <button className="btn">See All</button>
              </div>
            </div>
          </Col>
          {olineCoursesData.map((item) => (
            <Col lg="4" md="3" sm="4" >
              <CourseCard key={item.id} item={item} />
            </Col>
          ))} */}
          {/* <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h4>Popular Courses</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
              <Link to={"/poupler_courses"}><button className="btn"> See All</button></Link>
              </div>
            </div>
          </Col>
          {ourCoursesData.map((item) => (
            <Col lg="4" md="6" sm="6" onClick={() => this.goToDetails(item)}>
              <CourseCard key={item.id} item={item} />
            </Col>
          ))} */}
        </Row>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h4>Popular Teachers</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
              <Link to={"/poupler_teachers"}><button className="btn"> See All</button></Link>
              </div>
            </div>
          </Col>
          {ourCoursesData.map((item) => (
            <Col lg="4" md="6" sm="6" onClick={() => this.goToDetails(item)}>
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>

    </>
  );
};

export default Courses;