import React from "react";
import { useEffect,useState } from "react";
import axios from 'axios'


import {  Container,Row, Col } from "reactstrap";
import {  PouplerCoursesData} from "../../Data/Data";
import TeacherCards from "./TeacherCards";
import "./courses.css";





const baseUrl='http://127.0.0.1:8000/api'; 
const PouplerTeacher = () => {
    const [teacher,setTeacher] =useState(null);
    useEffect(()=>{
       axios.get(baseUrl+'/teacher/').then((response)=>{
            setTeacher(response.data)
       });
    },[]);
    console.log(teacher);
    return (
        <section>
        <Container className="container">
            <Row className="pt-5">
                <Col lg="12" className="mb-5">
                <div className="course__top d-flex justify-content-between align-items-center">
                    <div className="course__top__left w-50">
                    <h4>Poupler Teachers </h4>
                    <p>
                        Lorem ipsum Rachid dolor sit amet consectetur adipisicing elit. Quae
                        consequatur libero quod voluptatibus ullam quia quas, vitae
                        voluptatem recusandae reprehenderit!
                    </p>
                    </div>
                </div>
                </Col>
                {PouplerCoursesData.map((item) => (
                <Col lg="4" md="6" sm="6" mb="4" onClick={() => this.goToDetails(item)}>
                    <TeacherCards key={item.id} item={item} />
                </Col>
                ))}
                {PouplerCoursesData.map((item) => (
                <Col lg="4" md="6" sm="6" onClick={() => this.goToDetails(item)}>
                <TeacherCards key={item.id} item={item} />
                </Col>
                ))}
                {PouplerCoursesData.map((item) => (
                <Col lg="4" md="6" sm="6" onClick={() => this.goToDetails(item)}>
                <TeacherCards key={item.id} item={item} />
                </Col>
                ))}
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
                <li className="page-item"><a className="page-link" href="/">1</a></li>
                <li className="page-item"><a className="page-link" href="/">2</a></li>
                <li className="page-item"><a className="page-link" href="/">3</a></li>
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



export default PouplerTeacher;
