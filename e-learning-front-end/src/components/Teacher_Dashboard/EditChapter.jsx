import React from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Sidebar from './T_Sidebar';
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';




const baseUrl='http://127.0.0.1:8000/api';

const EditChapter= ()=>{

    const [chapterData, setChapterData] =useState({
        course_id:'',
        chapter_title:'',
        chapter_description:'',
        prev_video:'',
        video:'',
        remarks:''
    });

    const handleChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    };

    const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    };

    const{chapter_id}=useParams();
    const submitForm=()=>{
        const   CourseFormData =new FormData();
        CourseFormData.append("chapter_id",chapterData.chapter_id);
        CourseFormData.append("course_id",chapterData.course_id);
        CourseFormData.append("chapter_title", chapterData.chapter_title);
        CourseFormData.append("chapter_description",chapterData.chapter_description );
        if(chapterData.video!==''){
            CourseFormData.append("video",chapterData.video,chapterData.video.name );
        }
        CourseFormData.append("remarks",chapterData.remarks );
       
       

         try{
            axios.put(baseUrl+'/chapter/'+chapter_id,CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200){
                    Swal.fire({
                        title: 'Data hsa been updated',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:"center",
                        timerProgressBar:true,
                        showConfirmButton:false
                      }
                    );
                }
            });
        }catch(error){
            console.log(error);
        }
    }; 
    useEffect(()=>{
        //fetch courses to the form
        try{
            axios.get(baseUrl+'/chapter/'+chapter_id).then((response)=>{//geting teacher by id
                console.log(response.data);
                setChapterData({
                    course_id:response.data.course_id,
                    chapter_title:response.data.chapter_title,
                    chapter_description:response.data.chapter_description,
                    prev_video:response.data.video,
                    video:'',
                    remarks:response.data.remarks
                });
                
            });

        }catch(error){
            console.log(error);
        }
    },[chapter_id]);




    return(
        <div className="container mt-4">
        <div className="row">
            <aside className='col-md-3'>
                <Sidebar/>
            </aside>
            <section className="col-md-9">
            <div className="card"> 
                <h4 className="card-header">Update Chapter</h4>   
                <div className="card-body">
                <div className="mb-2 row">
                    <label htmlhtmlhtmlfor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                    <input onChange={handleChange} value={chapterData.chapter_title} name="chapter_title" type="text"  className="form-control" id="staticEmail" />
                    </div>
                </div>
                
                <div className="mb-2 row">
                    <label htmlhtmlfor="inputPassword" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                    <textarea onChange={handleChange} value={chapterData.chapter_description} name="chapter_description" type="text" className="form-control" id="inputPassword"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlhtmlfor="inputPassword"  className="col-sm-2 col-form-label">Video</label>
                    <input onChange={handleFileChange} name="video" type="file" className="form-control" id="inputPassword"/>
                    {chapterData.prev_video &&
                    <video width="100%" className='mt-2'  controls>
                        <source src={chapterData.prev_video} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>}
                </div>
                <div className="mb-2 row">
                    <label htmlhtmlfor="inputPassword" className="col-sm-2 col-form-label">Remarks</label>
                    <div className="col-sm-10">
                    <input onChange={handleChange} value={chapterData.remarks} name="remarks" type="text" className="form-control"  id="inputPassword"/>
                    </div>
                </div>
                <hr />
                <div className="mb-5">
                <button onClick={submitForm} type="button" className="btn btn-primary">submit</button>                    
                </div>
                </div>    
            </div>
            </section>
    </div>
</div>
);
         
};

export default EditChapter;