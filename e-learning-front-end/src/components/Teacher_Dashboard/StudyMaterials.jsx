import React from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';


const StudyMaterials =()=>{
    const [materialData, setMaterialData] =useState([]);
    const [totalResult, setTotalResult] =useState([0]);
    const{course_id}=useParams();
   

    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/study_materials/'+course_id).then((response)=>{//geting teacher by id
                setTotalResult(response.data.length);
                setMaterialData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[course_id]);


    //delete date 
    //res for confirm message delete
    const handleDeleteClick = (materails_id) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to continue deleting this chapter?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/study_material/'+materails_id).then((res)=>{
                        Swal.fire('success','Chapter has been deleted');
                        try{
                            axios.get(baseUrl+'/study_materials/'+course_id).then((response)=>{//geting teacher by id
                                setTotalResult(response.data.length);
                                setMaterialData(response.data);
                            });
                
                        }catch(error){
                            console.log(error);
                        }
                    });
                   
                }catch(error){
                    Swal.fire('error','Chapter has not been deleted!!');
            }}else{  
                Swal.fire('error','Data has been delted!!!');
            }
          })
    }
    const downloadFile = (file_url) =>{
        window.location.href = file_url; 
    }
    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">All Study Materials : {totalResult}<Link className="btn btn-success btn-sm float-end" to={'/add_materials/'+course_id}>Add Study Materials</Link></h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>file</th>
                                        <th>Remark</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materialData.map((material,index)=>  
                                    <tr>
                                        <td>{material.title}</td>
                                        <td>{material.description}</td>
                                        <td>
                                        <Link onClick={() => downloadFile(material.files)} className='btn btn-outline-info btn-sm' >Download File</Link>
                                        </td> {/*add video from database*/}
                                        <td>{material.remarks}</td>
                                        <td>
                                            <Link onClick={()=>handleDeleteClick(material.id)}   name="delete" className="btn btn-danger mb-2  ms-2" ><i className="ri-delete-bin-fill"></i></Link>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                    </div>
                </div>
                </section>
            </div>
        </div>        
    )
}
export default StudyMaterials;