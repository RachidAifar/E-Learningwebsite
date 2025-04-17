import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecommendedCourses from './RecommendedCourses'; // ✅ Keep this for the bottom section

const baseUrl = 'http://127.0.0.1:8000/api';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const studentId = localStorage.getItem('student_id');

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/fetch_enrolled_courses/${studentId}`).then((response) => {
        setEnrolledCourses(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">Token Courses</h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    <th>Quiz</th>
                    <th>Materials</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourses.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/CourseDetail/${row.course.course_id}`}>
                          {row.course.course_title}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/teacher_detail/${row.course.teacher.teacher_id}`}>
                          {row.course.teacher.teacher_fullname}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/quiz/${row.course.course_id}`}
                          className="btn btn-sm btn-info"
                        >
                          Quiz List
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/study-material/${row.course.course_id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Study Material
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✅ Recommended section */}
          <div className="card mt-4">
            <h4 className="card-header">Recommended For You</h4>
            <div className="card-body">
              <RecommendedCourses />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyCourses;
