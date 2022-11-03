import React, { useRef } from "react";
import { Container } from "reactstrap";
import "./header.css";


const navLinks = [
  {
    display: "Home",
    url: "../Home.js",
  },
  {
    display: "Courses",
    url: "#",
  },

  {
    display: "Teachers",
    url: "#",
  },
  {
    display: "MyCouses",
    url: "#",
  },
  {
    display: "Course categories",
    url: "#",
  },
  {
    display: "About",
    url: "#",
  },
];

const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <img  src="/images/e-learning-logo.png" alt="" />
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div> 
          </div>
          

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;