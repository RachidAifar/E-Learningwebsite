import React from 'react';
import {Link} from 'react-router-dom';



const MyCourses =()=>{
    return(
            
        <div className="card">
            <h4 className="card-header">My Courses</h4>
            <div className="card-body">
                <table className="table table-bordered">
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
                            <button className="btn btn-primery  text-danger" >Delete</button>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default MyCourses;