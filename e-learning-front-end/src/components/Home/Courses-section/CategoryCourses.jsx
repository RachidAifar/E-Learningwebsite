import React from "react";
import {  Container,Row, Col } from "reactstrap";
import {  ourCoursesData} from "../../Data/Data";
import CourseCard from "./CourseCard";
import "./courses.css";
import {Link,useParams} from 'react-router-dom';
//import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState,useEffect } from 'react';


//todo :hty khtad wrtaa tkhdem !!!

const baseUrl='http://127.0.0.1:8000/api';



const CategoryCourses = () => {

    const [courseData, setCourseData] =useState([]);
    const {category_slug}=useParams();
    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/course/?category='+category_slug).then((response)=>{//getting teacher by id
                setCourseData(response.data.results);
                console.log(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[category_slug]);
    return (
        <section>
        <Container className="container">
            <Row className="pt-5">
                <Col lg="12" className="mb-5">
                <div className="course__top d-flex justify-content-between align-items-center">
                    <div className="course__top__left w-50">
                    <h4>{category_slug}</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                        consequatur libero quod voluptatibus ullam quia quas, vitae
                        voluptatem recusandae reprehenderit!
                    </p>
                    </div>
                </div>
                </Col>
                {courseData && courseData.map((course,index)=>
                <Col className="mb-5" lg="4" md="6" sm="6">
                  <div className="course_card mb-5">
                  <div className="single__course__item">
                    <Link to={`/CourseDetail/${course.course_id}`}><img className="card-img-top " src={course.feature_img} alt={course.course_title}/></Link>
                      <div className="card-body">
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
                
            </Row>
        </Container>
        {/* pagination */}
        <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                <a className="page-link" href="/" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a class="page-link" href="/">1</a></li>
                <li className="page-item"><a class="page-link" href="/">2</a></li>
                <li className="page-item"><a class="page-link" href="/">3</a></li>
                <li className="page-item">
                <a className="page-link" href="/" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>



      </section>
    );
};



export default CategoryCourses;
