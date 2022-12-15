import React, { useRef } from "react";
import { Container } from "reactstrap";
import "bootstrap";
import { navLinks } from "../../Data/Data";
import { Link } from "react-router-dom";
//import Dropdown from './Dropdown'
import "./header.css";


const Header = () => {
  const menuRef = useRef();


  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to={"../../"}><img  src="/images/e-learning-logo.png" alt="" /></Link>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <Link to={item.path}>{item.text}</Link>
                  </li>
                ))}
                 <li className="nav-item">
                    <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      User
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link to={"/register"} className="dropdown-item">Register</Link></li>
                      <li><Link to={"/login"} className="dropdown-item">Login</Link></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><Link to={"/dashboard"} className="dropdown-item">Dashboard</Link></li>
                      <li><Link to={"/"} className="dropdown-item">Logout</Link></li>
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