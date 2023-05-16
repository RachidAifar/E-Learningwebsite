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
  const [ratingStatus, setRatingStatus]=useState();
  const [avgRatingStatus, setAvgRatingStatus]=useState([0]);
  const [addtoFavorit, setAddtoFavorit]=useState();
  const [courseViews, setCourseViews]=useState( 0);

  const{course_id}=useParams();
 const student_id =localStorage.getItem('student_id');

  useEffect(()=>{
      //fetch courses
      try{
          axios.get(baseUrl+'/course/'+course_id).then((response)=>{//geting teacher by id
              setCourseData(response.data);
              setTeacherData(response.data.teacher);
              setChapterCourseData(response.data.course_chapters);
              setrelatedCourseData(JSON.parse(response.data.related_videos));
              settechnoloListData(response.data.technologies_list);
              if(response.data.course_rating!=='' && response.data.course_rating !==null){
                setAvgRatingStatus(response.data.course_rating);
              }
              
          });

          //get views
          axios.get(baseUrl+'/update_view/'+course_id).then((res)=>{
            setCourseViews(res.data.views)
          })

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
      
      //rating
      try{
        axios.get(baseUrl+'/fetch_rating_status/'+student_id+'/'+course_id).then((response)=>{//geting teacher by id
           if(response.data.bool===true){
            setRatingStatus('success');
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
                    timer:5000,
                    position:"",
                    timerProgressBar:true,
                    showConfirmButton:false
                  });
                  window.location.reload();
                  userEnrollStatus('success');
                  
                }
            });  
            }catch(error){
                console.log(error);
            }       
    }
      //ADD RATING
      const [ratingData, setratingData] =useState({
        rating:'',
        reviews:''
      });

      const handleChange=(event)=>{
        setratingData({
            ...ratingData,
            [event.target.name]:event.target.value
        });
      };

      const submitForm=()=>{
        const CourseFormData =new FormData();
        CourseFormData.append("course",course_id );
        CourseFormData.append("student", student_id);
        CourseFormData.append("rating",ratingData.rating );
        CourseFormData.append("reviews",ratingData.reviews);
       
         try{
            axios.post(baseUrl+'/course_rating/'+course_id,CourseFormData,)
            .then((res)=>{
              if(res.status===200 || res.status===201){
                Swal.fire({
                    title: 'Thanks for rating',
                    icon: 'success',
                    toast:true,
                    timer:3000,
                    position:"",
                    timerProgressBar:true,
                    showConfirmButton:false
                  });
                  // setRatingStatus('success');
                  window.location.reload();
                }
          });  
        }catch(error){
            console.log(error);
        }
    }; 
    //add to favorite courses
    const addToFavorit = () =>{
      const   CourseFormData =new FormData();
      CourseFormData.append("course",course_id );
      CourseFormData.append("student", student_id);
      CourseFormData.append("status", true);

      try{
        axios.post(baseUrl+'/student_add_favorite_course/',CourseFormData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        .then((res)=>{
          if(res.status===200 || res.status===201){
            Swal.fire({
                title: 'This course has been added to your favorite courses',
                icon: 'success',
                toast:true,
                timer:3000,
                position:"",
                timerProgressBar:true,
                showConfirmButton:false
              });
              setAddtoFavorit('success');
            }
            
      });  
      }catch(error){
          console.log(error);
      }
    };
    const removeFavorit = () =>{
      const   CourseFormData =new FormData();
      CourseFormData.append("course",course_id );
      CourseFormData.append("student", student_id);
      CourseFormData.append("status", false);

      try{
        axios.get(baseUrl+'/student_remove_favorite_course/'+student_id+'/'+course_id,{
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        .then((res)=>{
          if(res.status===200 || res.status===201){
              Swal.fire({
                  title: 'This course has been removed from your favorite courses',
                  icon: 'success',
                  toast:true,
                  timer:3000,
                  position:"",
                  timerProgressBar:true,
                  showConfirmButton:false
                });
                setAddtoFavorit('');
              }
            
      });  
      }catch(error){
          console.log(error);
      }
    };
    

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
              <h3>{courseData.course_title}  {userLoginStatus ==='success' && addtoFavorit !=='success' &&
                <Link to={""} title="Add to your favorite course list"  onClick={addToFavorit} type="Button" className="btn btn-outline-danger flex-end" ><i className="ri-heart-line"></i></Link> 
              }
              {userLoginStatus ==='success' && addtoFavorit ==='success' &&
                <Link to={""} title="remove from your favorite course list"  onClick={removeFavorit} type="Button" className="btn btn-danger flex-end" ><i className="ri-heart-line"></i></Link> 
              }
              
              </h3>
             
              <p>
              {courseData.course_description}
              </p>
              <p className="fw-bold">Upoaded by: <Link to={`/teacher_detail/${teacherData.teacher_id}`}>{teacherData.teacher_fullname}</Link></p>
              <p className="fw-bold">technologies:&nbsp;
              {technoloListData.map((tech,index) =>
                <>
                  <Link className="badge bg-warning ms-1" to={`/category/${tech.trim()}`}>{tech}</Link>
                </>
              )}
              </p>
              <p className="fw-bold">Time: 2 Hours 13 Minuts</p>  
              <p className="fw-bold">Views: {courseViews}</p> 
              <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Students</p> 
              <p className="fw-bold">
                Rating: {avgRatingStatus.toFixed(2)}/5
                {userEnrollStatus ==='success' && userLoginStatus==='success' &&
                <>
                  {ratingStatus !== 'success' &&
                  <Link className="btn btn-warning btn-sm text-light ms-2" data-bs-toggle="modal" data-bs-target="#ratingModal"><i className="ri-star-fill  me-2"></i>Rating</Link>
                  }
                  {
                    ratingStatus === 'success' &&
                    <small className="badge bg-success ms-2">Thanks for rating this course</small>
                  }
                  <div className="rating_modal mt-4">
                    <div className="modal fade mt-5" id="ratingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg mt-5">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-3" id="exampleModalLabel">Rating for {courseData.course_title}</h1>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Rating</label>
                                <select onChange={handleChange} className="form-control " name='rating'>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label" >Review</label>
                                <textarea className="form-control" onChange={handleChange} name="reviews" rows="5" cols="30" ></textarea>
                              </div>
                              <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>  

                }
              </p>
              {userEnrollStatus ==='success' && userLoginStatus==='success' &&
                <p className="h4"><span className="badge bg-success bg-lg mb-5" >you have already enrolled in this course</span> </p>
              }
              {userLoginStatus ==='success' && userEnrollStatus !== 'success' &&
                <p><Button  onClick={enrollCourse} type="Button" className="btn btn-primary mb-5" >Enroll Now</Button> </p>
              }
               {userEnrollStatus ==='success' && userLoginStatus==='success' &&
                <p className="h4"><span className="badge bg-success bg-lg mb-5" ></span> </p>
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
                        <video controls>
                          <source src={chapter.video} type="video/mp4" />
                          {/* Add additional <source> elements for other video formats if needed */}
                        </video>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
            <div className="row mb-5">
              {relatedCourseData.map((rcourse,index)=>
                <Col lg="4" md="6" sm="6" className="row mb-5">
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