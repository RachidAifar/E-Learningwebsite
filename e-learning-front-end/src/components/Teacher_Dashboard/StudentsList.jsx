import React from 'react';
import {Link} from 'react-router-dom';
import Sidebar from './T_Sidebar'



const StudentList =()=>{
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">Students List</h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Enrolled Course</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Rachid Aifar</td>
                                    <td><Link to={""}>Java Development</Link></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm mb-2  mt-0 2 ms-2" >Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </section>
            </div>
        </div>        
    )
}
export default StudentList;