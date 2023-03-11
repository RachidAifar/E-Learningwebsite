//import React from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/home";
import CourseDetail from "../Home/Courses-section/CourseDetail";
import TeacherDetail from "../Teacher_Dashboard/TeacherDetail";
import Header from "../common/Header/Header";
import Footer from "../common/footer/Footer";
import About from "../About/About";
import Login from "../Authontication_Forms/Login_form";
import Register from "../Authontication_Forms/Register_form";
import PouplerCourses from "../Home/Courses-section/PouplerCourses";
import PouplerTeachers from "../Home/Courses-section/PouplerTeacher";
//user
import Dashboard from "../User_Dashboard/dashboard";
import MyCourses from "../User_Dashboard/MyCourses";
import FavoriteCourses from "../User_Dashboard/FavoriteCourses";
import RecommendedCourses from "../User_Dashboard/RecommendedCourses";
import ChangePassword from "../User_Dashboard/ChangePassword";
import ProfileSetting from "../User_Dashboard/ProfileSetting";
import StudentLogin from "../Authontication_Forms/Login_form"
import StudentLogout from '../User_Dashboard/UserLogout';
import UserStudyMaterials from '../User_Dashboard/UserStudyMaterials';

//teacher
import AllCourses from "../Home/Courses-section/AllCourses";
import TeacherLogout from '../Teacher_Dashboard/TeacherLogout';
import AllChapter from "../Teacher_Dashboard/AllChapter";
import EditChapter from "../Teacher_Dashboard/EditChapter";
import TeacherSkillCourses from "../Teacher_Dashboard/TeacherSkillCourses";
import EnrolledStudent from '../Teacher_Dashboard/EnrolledStudent';
import StudyMaterials from '../Teacher_Dashboard/StudyMaterials';
//assignemnt
import AddAssignment from "../Teacher_Dashboard/AddAssignment";
import ViewAssignment from "../Teacher_Dashboard/ViewAssignment";
import StudentAssignment from "../User_Dashboard/StudentAssignment";
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
import AddChapter from "../Teacher_Dashboard/AddChapter";
import EditCourse from "../Teacher_Dashboard/EditCourse";
import AddQuiz from "../Teacher_Dashboard/AddQuiz";
import AllQuizzes from "../Teacher_Dashboard/AllQuizzes";
import EditQuiz from "../Teacher_Dashboard/EditQuiz";
import QuizQuestion from "../Teacher_Dashboard/QuizQuestions";
import AddQuizQuestion from "../Teacher_Dashboard/AddQuizQuestion";
import AssignQuiz from "../Teacher_Dashboard/AssignQuiz";
import CourseQuizList from "../User_Dashboard/CourseQuizList";
import TakeQuiz from "../User_Dashboard/TakeQuiz";
import SearchCourses from "../Home/Courses-section/SearchCourse";
import AddStudyMaterials from "../Teacher_Dashboard/AddStudyMaterial";
import AttemptedStudents from "../Teacher_Dashboard/AttemptedStudent";
import FAQ from "../common/faq";



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
          <Route exact path='/add_courses' element={<AddCourse />} />
          <Route exact path='/edit_course/:course_id' element={<EditCourse />} />
          <Route exact path='/add_chapter/:course_id' element={<AddChapter />} />
          <Route exact path='/teacher_profile_setting' element={<TeacherProfileSetting />} />
          <Route exact path='/teacher_chnage_password' element={<TeacherChangePassword />} />
          <Route exact path='/teacher_logout' element={<TeacherLogout />} />

          <Route exact path='/add_quiz' element={<AddQuiz />} />
          <Route exact path='/all_quiz' element={<AllQuizzes />} />
          <Route exact path='/edit_quiz/:quiz_id' element={<EditQuiz/>} />
          <Route exact path='/all_questions/:quiz_id' element={<QuizQuestion/>} />
          <Route exact path='/add_quiz_questions/:quiz_id' element={<AddQuizQuestion/>} />
          <Route exact path='/assign_quiz/:course_id' element={<AssignQuiz/>} />

          <Route exact path='/quiz_course/:course_id' element={<CourseQuizList/>} />
          <Route exact path='/quiz_course/:course_id/take_quiz/:quiz_id' element={<TakeQuiz/>} />


          <Route exact path='/search_courses/:searchstring' element={<SearchCourses/>} />


          <Route exact path='/student_assignment/:student_id/:teacher_id' element={<AddAssignment />} />
          <Route exact path='/view_assignment/:student_id/:teacher_id' element={<ViewAssignment />} />
          <Route exact path='/my_assignment/' element={<StudentAssignment />} />



          <Route exact path='/students_list' element={<StudentList />} />
          <Route exact path='/students_login' element={<StudentLogin />} />
          <Route exact path='/student_logout' element={<StudentLogout />} />
          <Route exact path='/enrolled_students/:course_id' element={<EnrolledStudent />} /> 

          

          <Route exact path='/CourseDetail/:course_id' element={<CourseDetail/>} />
          <Route exact path="/teacher_detail/:teacher_id" element={<TeacherDetail/>} />
          <Route exact path="/all_courses" element={<AllCourses/>} />
          <Route exact path="/course_chapter/:course_id" element={<AllChapter/>} />
          <Route exact path="/edit_chapter/:chapter_id" element={<EditChapter/>} />

          <Route exact path="/study_materials/:course_id" element={<StudyMaterials/>} />
          <Route exact path="/add_materials/:course_id" element={<AddStudyMaterials/>} />
          {/* <Route exact path="/edit_material/:study_id" element={<EditChapter/>} /> */}
          
          <Route exact path="/user/study_materials/:course_id" element={<UserStudyMaterials/>} />

          <Route exact path="/category/:category_slug" element={<CategoryCourses/>} />
        {/* fetch courses based on teacher skills */}
          <Route exact path="/teacher_skill_course/:skill_name/:teacher_id" element={<TeacherSkillCourses/>} />


          <Route exact path="/poupler_courses" element={<PouplerCourses/>} />
          <Route exact path="/poupler_teachers" element={<PouplerTeachers/>} />

          <Route exact path="/attempted_student/:quiz_id" element={<AttemptedStudents/>} />





          <Route exact path="/faq" element={<FAQ/>} />

        </Routes>
        <Footer />
      </Router>
    </>
  )
}



export default Pages