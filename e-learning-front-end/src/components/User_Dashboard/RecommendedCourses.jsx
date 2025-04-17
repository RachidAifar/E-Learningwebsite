import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';
const siteUrl = 'http://127.0.0.1:8000/';

const RecommendedCourses = () => {
  const [courseData, setCourseData] = useState([]);
  const student_id = localStorage.getItem('student_id');

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/recommend/${student_id}/`).then((response) => {
        setCourseData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [student_id]);

  return (
    <div className="mt-5">
      <div className="row">
        {courseData.length === 0 && <p>No recommendations yet.</p>}
        {courseData.map((course, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <Link to={`/CourseDetail/${course.course_id}`}>
                <img
                  src={
                    course.feature_img.startsWith('http')
                      ? course.feature_img
                      : `${siteUrl}${course.feature_img}`
                  }
                  className="card-img-top"
                  alt={course.course_title}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/CourseDetail/${course.course_id}`}>
                    {course.course_title}
                  </Link>
                </h5>
                <p className="card-text">
                  {course.technologies_list?.map((tech, i) => (
                    <span className="badge bg-warning text-dark me-1" key={i}>
                      {tech}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;
