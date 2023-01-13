import React from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import { Button } from 'reactstrap';

const baseUrl='http://127.0.0.1:8000/api';


const CourseChapter =()=>{
    const [chapterData, setChapterCourseData] =useState([]);
    const [totalResult, setTotalResult] =useState([0]);
    const{course_id}=useParams();
   

    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/course_chapter/'+course_id).then((response)=>{//geting teacher by id
                setTotalResult(response.data.length);
                setChapterCourseData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[course_id]);


    //delete date 
    //res for confirm message delete
    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to continue deleting this chapter?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/chapter/'+chapter_id).then((res)=>{
                        Swal.fire('success','Chapter has been deleted');
                        try{
                            axios.get(baseUrl+'/course_chapter/'+course_id).then((response)=>{//geting teacher by id
                                setTotalResult(response.data.length);
                                setChapterCourseData(response.data);
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
    
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">    
                <div className="card">
                    <h4 className="card-header">All Chapters : {totalResult}<Link className="btn btn-success btn-sm float-end" to={'/add_chapter/'+course_id}>Add Chapter</Link></h4>
                    <div className="card-body">
                        <table className="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Video</th>
                                        <th>Remark</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter,index)=>  
                                    <tr>
                                        <td><Link to={"/edit_chapter/"+chapter.chapter_id}>{chapter.chapter_title}</Link></td>
                                        <td>{chapter.chapter_description}</td>
                                        <td>
                                        {!chapterData.video &&
                                        <video width="320" controls>
                                            <source src={chapter.video} type="video/mp4"/>
                                            {/* <source src={chapter.video}type="video/ogg"/> */}
                                            Your browser does not support the video tag.
                                        </video>
                                        }
                                        </td> {/*add video from database*/}
                                        <td>{chapter.remarks}</td>
                                        <td>
                                            <Link to={"/edit_chapter/"+chapter.chapter_id} name="edit" className='btn btn-info text-white mb-2 ms-2' ><i className="ri-edit-2-fill"></i></Link>
                                            <Link onClick={()=>handleDeleteClick(chapter.chapter_id)}   name="delete" className="btn btn-danger mb-2  ms-2" ><i className="ri-delete-bin-fill"></i></Link>
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
export default CourseChapter;