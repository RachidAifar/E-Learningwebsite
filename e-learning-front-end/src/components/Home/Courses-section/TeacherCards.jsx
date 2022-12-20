import React from "react";
import {Link} from 'react-router-dom';

const CourseCard = (props) => {
  const { imgUrl, title, students, rating } = props.item;

  return (
    <div className="single__course__item">
      <div className="course__img">
      <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="course__details">
        <h6 className="course__title mb-4">{title}</h6>
        <div className=" d-flex justify-content-between align-items-center">
          <p className="rating d-flex align-items-center gap-1">
            <i className="ri-star-fill"></i> Rating:{rating}
          </p>

          <p className="enroll d-flex align-items-center gap-1">
            <Link to={"/teacher_detail:teacher_id"}><i className="ri-account-circle-fill"></i>More Details</Link> 
          </p>
         
          <p className="students d-flex align-items-center gap-1">
            <i className="ri-user-line"></i> {students}K
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;