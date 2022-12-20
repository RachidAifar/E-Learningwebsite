import {Link} from 'react-router-dom'
const Sidebar = () => {
    return (
    <div className="card">
        <h5 className="card-header">Dashboard</h5>
        <div className="list-group list-group-flush">
            <Link to={'/dashboard'} className="list-group-item list-group-action ">Dashboard</Link>
            <Link to={'/my-courses'} className="list-group-item list-group-action ">My Courses</Link>
            <Link to={'/favorite-courses'} className="list-group-item list-group-action ">Favorite Courses</Link>
            <Link to={'/recommended-courses'} className="list-group-item list-group-action ">Recommended Courses</Link>
            <Link to={'/profil-setting'} className="list-group-item list-group-action ">Profile Setting</Link>
            <Link to={'/chnage-password'} className="list-group-item list-group-action ">Change Password</Link>
            <Link to={'/login'} className="list-group-item list-group-action text-danger">Logout</Link>
        </div>
    </div>
    )
}
export default Sidebar ;
