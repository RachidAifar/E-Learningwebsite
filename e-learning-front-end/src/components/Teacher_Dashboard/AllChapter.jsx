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
    const handleDeleteClick = () => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to continue deleting this chapter?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
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
                    <h4 className="card-header">All Chapters : {totalResult}</h4>
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
                                        <td><Link to={"#"}>{chapter.chapter_title}</Link></td>
                                        <td>{chapter.chapter_description}</td>
                                        <td>
                                        <video width="320" height="240" controls>
                                            <source src={chapter.video.url} type="video/mp4"/>
                                            <source src={chapter.video.url}type="video/ogg"/>
                                            Your browser does not support the video tag.
                                        </video>
                                        </td> {/*add video from database*/}
                                        <td>{chapter.remarks}</td>
                                        <td>
                                            <Link to={"/edit_chapter/"+chapter.chapter_id} name="edit" className='btn btn-info text-white mb-2 ms-2' ><i className="ri-edit-2-fill"></i></Link>
                                            <Button onClick={handleDeleteClick} to={"/delete_chapter/"+chapter.chapter_id}  name="delete" className="btn btn-danger mb-2  ms-2" ><i className="ri-delete-bin-fill"></i></Button>
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