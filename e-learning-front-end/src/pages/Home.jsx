//import React from 'react'
import React, { Fragment } from "react";
import Header from "../components/common/Header/Header";
import HeroSlider from "../components/HeroSlider/HeroSlider"
//import HeroSection from "../components/HeroSection/HeroSection"
import Cousres from "../components/Courses-section/Courses"

const Home = () => {
  return (
  <Fragment>
    
    <Header />
    <HeroSlider />
    <Cousres />
  </Fragment>
  )
}

export default Home