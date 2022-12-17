//import React from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/home";
import CourseDetail from "../Home/Courses-section/CourseDetail";
import Header from "../common/Header/Header";
import Footer from "../common/footer/Footer";
import About from "../About/About";
import Login from "../Authontication_Forms/Login_form"
import Register from "../Authontication_Forms/Register_form"
import Dashboard from "../Dashboard/dashboard"
import MyCourses from "../Dashboard/MyCourses";
import FavoriteCourses from "../Dashboard/FavoriteCourses";
import RecommendedCourses from "../Dashboard/RecommendedCourses";
import ProfileSetting from "../Dashboard/ProfileSetting";
import ChangePassword from "../Dashboard/ChangePassword";

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
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/my-courses' element={<MyCourses />} />
          <Route exact path='/favorite-courses' element={<FavoriteCourses />} />
          <Route exact path='/recommended-courses' element={<RecommendedCourses />} />
          <Route exact path='/profil-setting' element={<ProfileSetting />} />
          <Route exact path='/chnage-password' element={<ChangePassword />} />
          <Route exact path='/CourseDetail/:course_id' element={<CourseDetail/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}



export default Pages