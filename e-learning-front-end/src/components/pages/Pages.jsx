//import React from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/home";
import CourseDetail from "../Home/Courses-section/CourseDetail";
import TeacherDetail from "../Teacher_Dashboard/TeacherDetail";
import Header from "../common/Header/Header";
import Footer from "../common/footer/Footer";
import About from "../About/About";
import Login from "../Authontication_Forms/Login_form"
import Register from "../Authontication_Forms/Register_form"
import PouplerCourses from "../Home/Courses-section/PouplerCourses"
import PouplerTeachers from "../Home/Courses-section/PouplerTeacher"
//user
import Dashboard from "../User_Dashboard/dashboard"
import MyCourses from "../User_Dashboard/MyCourses";
import FavoriteCourses from "../User_Dashboard/FavoriteCourses";
import RecommendedCourses from "../User_Dashboard/RecommendedCourses";
import ChangePassword from "../User_Dashboard/ChangePassword";
import ProfileSetting from "../User_Dashboard/ProfileSetting";
//teacher
import AllCourses from "../Home/Courses-section/AllCourses";
//List pages
import TeacherLogin from "../Authontication_Forms/Teacher_Login";
import TeacherRegister from "../Authontication_Forms/Teacher_Register";
import TeacherDashboard from '../Teacher_Dashboard/T_Dashboard';
import TeacherCourses from '../Teacher_Dashboard/T_Courses';
import TeacherChangePassword from '../Teacher_Dashboard/T_ChangePassword';
import StudentList from "../Teacher_Dashboard/StudentsList";
import AddCourse from "../Teacher_Dashboard/AddCouses";
import TeacherProfileSetting from "../Teacher_Dashboard/T_ProfileSetting";
import CategoryCourses from "../Home/Courses-section/CategoryCourses";

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

          <Route exact path='/teacher_dashboard' element={<TeacherDashboard />} />
          <Route exact path='/teacher_login' element={<TeacherLogin />} />
          <Route exact path='/teacher_register' element={<TeacherRegister />} />
          <Route exact path='/teacher_courses' element={<TeacherCourses />} />
          <Route exact path='/students_list' element={<StudentList />} />
          <Route exact path='/add_courses' element={<AddCourse />} />
          <Route exact path='/teacher_profile_setting' element={<TeacherProfileSetting />} />
          <Route exact path='/teacher_chnage_password' element={<TeacherChangePassword />} />

          <Route exact path='/CourseDetail/:course_id' element={<CourseDetail/>} />
          <Route exact path="/teacher_detail:teacher_id" element={<TeacherDetail/>} />
          <Route exact path="/all_courses" element={<AllCourses/>} />
          <Route exact path="/category/:category_slug" element={<CategoryCourses/>} />

          <Route exact path="/poupler_courses" element={<PouplerCourses/>} />
          <Route exact path="/poupler_teachers" element={<PouplerTeachers/>} />



        </Routes>
        <Footer />
      </Router>
    </>
  )
}



export default Pages