import React, { useRef } from "react";
import { Container } from "reactstrap";
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