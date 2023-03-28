import React, { useRef } from "react";
import { Container } from "reactstrap";
import "bootstrap";
import { navLinks } from "../../Data/Data";
import { Link } from "react-router-dom";
import {useState} from "react";
//import Dropdown from './Dropdown'
import "./header.css";


const Header = () => {

 
  const [searchString, setSearchString] =useState({
    'search':''
  });
  const menuRef = useRef();

 
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  
  const teacherLoginStatus= localStorage.getItem('teacherLoginStatus');//the redirect the loged in user to dashboard 
  const studentLoginStatus= localStorage.getItem('studentLoginStatus');

  const handleChange=(event)=>{
    setSearchString({
        ...searchString,
        [event.target.name]:event.target.value
    });
};


  const searchCourse =()=>{
    if( searchString.search !== ''){
      window.location.href='/search_courses/'+searchString.search;
    }
   
  }
  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to={"../../"}><img  src="/images/e-learning-logo.png" alt="" /></Link>
          </div>
          <form className="d-flex" role="search">
            <input name="search" onChange={handleChange} className="form-control me-2" type="search" placeholder="Course title or Technology" aria-label="Search"/>
            <button onClick={searchCourse} className="btn btn-outline-success btn-sm" type="button">Search</button>
          </form>
          
          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <Link to={item.path}>{item.text}</Link>
                  </li>
                ))}
                 <li className="nav-item">
                  {teacherLoginStatus !== 'true'&&
                    <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      User
                    </Link>}
                    <ul className="dropdown-menu">
                    {studentLoginStatus !== 'true'  && 
                      <>
                      <li><Link to={"/register"} className="dropdown-item">Register</Link></li>
                      <li><Link to={"/login"} className="dropdown-item">Login</Link></li>
                      </>
                    }
                    {studentLoginStatus === 'true'  && 
                      <>
                      {/* <li><hr className="dropdown-divider"/></li> */}
                      <li><Link to={"/dashboard"} className="dropdown-item">Dashboard</Link></li>
                      <li><Link to={"/student_logout"} className="dropdown-item">Logout</Link></li>
                      </>
                    }
                    </ul>
                </li>
                <li className="nav-item">
                  {studentLoginStatus !=="true" &&
                    <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Teacher
                    </Link>}
                    <ul className="dropdown-menu">
                      {teacherLoginStatus !== 'true' && studentLoginStatus !=="true" &&
                        <>
                        <li><Link to={"/teacher_register"} className="dropdown-item">Register</Link></li>
                        <li><Link to={"/teacher_login"} className="dropdown-item">Login</Link></li></>
                      }
                      {teacherLoginStatus === 'true' && 
                        <>
                          <li><hr className="dropdown-divider"/></li>
                          <li><Link to={"/teacher_dashboard"} className="dropdown-item">Dashboard</Link></li>
                          <li><Link to={"/teacher_logout"} className="dropdown-item">Logout</Link></li>
                        </>
                      }
                    </ul>
                </li>
              </ul>
            </div> 
          </div>


          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
          
        </div>
      </Container>
    </header>
  );
};

export default Header;