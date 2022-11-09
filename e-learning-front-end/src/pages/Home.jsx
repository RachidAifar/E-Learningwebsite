//import React from 'react'
import React, { Fragment } from "react";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/footer/Footer";
import HeroSlider from "../components/HeroSlider/HeroSlider"
//import HeroSection from "../components/HeroSection/HeroSection"
import Cousres from "../components/Courses-section/Courses"

const Home = () => {
  return (
  <Fragment>
    <Header />
    <HeroSlider />
    <Cousres />
    <Footer />
  </Fragment>
  )
}

export default Home