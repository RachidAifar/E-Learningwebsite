import {Link} from 'react-router-dom'
import React from "react"
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col } from "reactstrap";
import Card from 'react-bootstrap/Card';
import TeacherImage from "../images/202100527_1640328372828097_4475152047372531726_n.jpg";
import "./teacherDetail.css"
const TeacherDetail = () => {
    return (
    <section>
      <Container className="card">
        <Row>
          <Col lg="5" md="5">
            <div className="thumbail">
              <img src={TeacherImage} alt="Teacher_Image" className="w-100" />
            </div>
          </Col>

          <Col md="7">
            <div className="detail__content">
              <h3>Rachid Aifar</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi cupiditate animi deserunt libero nesciunt corporis
                explicabo nobis ex quo molestiae!
              </p>
              <p className="fw-bold">Speciality: <Link to={"/teacher_detail:teacher_id"}>Software engineer</Link></p>
              <p className="fw-bold">Skills: 
              <Link to={"/category/c#"}>C#</Link> , 
              <Link to={"/category/java"}>JAVA</Link>,
              <Link to={"/category/python"}>Python</Link></p>
              <p className="fw-bold">Total Courses: 5</p>
              <p className="fw-bold">Rating 4/5</p> 
            </div>
          </Col>
        </Row>
        <div className="listItem mb-3">
        <Card style={{ width: '58rem'  }}>
          <Card.Header><h4>Courses List</h4></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><Link to={"/CourseDetail/:course_id/"}> Python Course 1</Link></ListGroup.Item>
              <ListGroup.Item><Link to={"/CourseDetail/:course_id/"}> Python Course 2</Link></ListGroup.Item>
              <ListGroup.Item><Link to={"/CourseDetail/:course_id/"}> Python Course 3</Link></ListGroup.Item>
              <hr />
              <ListGroup.Item><Link to={"/CourseDetail/:course_id/"}> Django Course 1</Link></ListGroup.Item>
              <ListGroup.Item><Link to={"/CourseDetail/:course_id/"}> Django Course 2</Link></ListGroup.Item>
              <ListGroup.Item><Link to={"/CourseDetail/:course_id/"}> Django Course 3</Link></ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </Container>
    </section>
    )
}
export default TeacherDetail ;
