import {Link} from 'react-router-dom'
const Sidebar = () => {
    return (
    <div className="card">
        <h5 className="card-header">Teacher Dashboard</h5>
        <div className="list-group list-group-flush">
            <Link to={'/teacher_dashboard'} className="list-group-item list-group-action ">Dashboard</Link>
            <Link to={'/teacher_courses'} className="list-group-item list-group-action ">My Courses</Link>
            <Link to={'/add_courses'} className="list-group-item list-group-action ">Add Course</Link>
            <Link to={'/students_list'} className="list-group-item list-group-action ">My Student</Link>
            <Link to={'/all_quiz'} className="list-group-item list-group-action ">Quizzes</Link>
            <Link to={'/add_quiz'} className="list-group-item list-group-action ">Add Quiz</Link>
            <Link to={'/teacher_profile_setting'} className="list-group-item list-group-action ">Profile Setting</Link>
            <Link to={'/teacher_chnage_password'} className="list-group-item list-group-action ">Change Password</Link>
            <Link to={'/login'} className="list-group-item list-group-action text-danger">Logout</Link>
        </div>
    </div>
    )
}
export default Sidebar ;
