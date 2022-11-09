import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container >
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Aut saepe voluptatum earum delectus <br /> deserunt id iste,
                quas officiis et repellat!
              </p>
            </div>
          </Col>

          <Col lg="6" md="6" >
            <img src="https://images.pexels.com/photos/5083413/pexels-photo-5083413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;