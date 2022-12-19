import React from "react"
import { Container, Row, Col } from "reactstrap";
import {Link} from 'react-router-dom';
import aboutImg from "../../images/pexels-negative-space-160107.jpg";

//import { useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {  RelatedCourses} from "../../Data/Data";
import "./courseDetail.css";
import CourseCard from "./CourseCard";

  // const {course_id}=useParams();

const CourseDetail = () => {
  return (
    <section>
      <Container className="card ">
        <Row>
          <Col lg="5" md="5">
            <div className="thumbail">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col md="7">
            <div className="detail__content">
              <h3>Course Title</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi cupiditate animi deserunt libero nesciunt corporis
                explicabo nobis ex quo molestiae!
              </p>
              <p className="fw-bold">Upoaded by: <Link to={"/teacher_detail:teacher_id"}> Teacher 1</Link></p>
              <p className="fw-bold">Time: 2 Hours 13 Minuts</p>  
              <p className="fw-bold">Total Enrolled: 470 Student</p> 
              <p className="fw-bold">Rating 4/5</p> 
            </div>
          </Col>
        </Row>
        <div className="listItem mb-3">
        <Card style={{ width: '58rem'  }}>
          <Card.Header><h4>Course Videos</h4></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>video 1 <button className="btn btn-sm btn-info float-end" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="ri-youtube-fill"></i> Play</button></ListGroup.Item>
              {/* video Modal start  */}
              <div className="modal fade" id="videoModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg mt-5 pt-5">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div class="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                  </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
              </div>
              {/* video modal end */}
              <ListGroup.Item>video 2 <button className="btn btn-sm btn-info float-end"><i className="ri-youtube-fill"></i> Play</button></ListGroup.Item>
              <ListGroup.Item>video 3 <button className="btn btn-sm btn-info float-end"><i className="ri-youtube-fill"></i> Play</button></ListGroup.Item>
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