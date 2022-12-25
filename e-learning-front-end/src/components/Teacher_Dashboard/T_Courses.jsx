import React from 'react';
import {Link} from 'react-router-dom';
import Sidebar from './T_Sidebar'



const TeacherCourses =()=>{
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">My Courses</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>Java Development</td>
                                <td><Link to={""}>Rachid Aifar</Link></td>
                                <td>
                                    <Link className="btn btn-danger btn-sm active mt-0 2 ms-2" >Delete</Link>
                                    <Link className='btn btn-success btn-sm active mt-0 ms-2' to={"/add_chapter/2  "}>Add Chapters</Link>
                                </td>
                            </tbody>
                        </table>
                    </div>
                </div>
                </section>
            </div>
        </div>        
    )
}
export default TeacherCourses;