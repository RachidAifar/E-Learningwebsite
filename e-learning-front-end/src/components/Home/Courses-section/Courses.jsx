import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { olineCoursesData, ourCoursesData} from "../../Data/Data";
import "./courses.css";
import CourseCard from "./CourseCard";
//import AllCourses from "./AllCourses"


const Courses = () => {
  return (
    <>
    <section>
      <Container className="container">
        <Row>
          <Col lg="12" className="mb-2">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
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
          ))}
        </Row>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h4>our Courses</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
              <Link to={"/all_courses"}><button className="btn"> See All</button></Link>
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
    </section>
    </>
  );
};

export default Courses;