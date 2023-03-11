import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import {Row, Col } from "reactstrap";
import './heroSlider.css';
import image1 from '../../images/online2.jpg';
import image2 from '../../images/online-education-2.jpg';
import image3 from '../../images/virtual-learning-3.jpg';


const items = [
  {
    id: "01",
    src: image1,
    width: 800,
    height: 600
  },
  {
    id: "02",
    src: image2,
    width: 800,
    height: 300
  },
  {
    id: "03",
    src: image3,
    width: 800,
    height: 600
  }
];


const slider = () => (
  <Row className='mt-5 mb-2'>
      <Col md={7} className="mx-auto px-auto">
          <UncontrolledCarousel items={items} />
      </Col>
  </Row>
  );

// const slider = () => <UncontrolledCarousel items={items} />;

export default slider;