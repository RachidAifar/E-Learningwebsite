//import React from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/home";
import CourseDetail from "../Home/Courses-section/CourseDetail";
import Header from "../common/Header/Header";
import Footer from "../common/footer/Footer";
import About from "../About/About"
//import HeroSlider from "../components/HeroSlider/HeroSlider"
//import HeroSection from "../components/HeroSection/HeroSection"
//import Cousres from "../components/Courses-section/Courses"



const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/CourseDetail' element={<CourseDetail/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}



export default Pages