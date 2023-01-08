import React from "react";
import axios from 'axios';
import Sidebar from "./T_Sidebar";
import {useParams} from 'react-router-dom';
import {useState} from "react";


const baseUrl='http://127.0.0.1:8000/api';


const AddChapter = () => {
    const [chapterData, setChapterData] =useState({
        course_id:'',
        course_description:'',
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

    const{course_id}=useParams();//TAKE A ID OF THE COURE FROM URL USING useParms
    const submitForm=()=>{
        const   CourseFormData =new FormData();
        CourseFormData.append("course_id",course_id );
        CourseFormData.append("chapter_title", chapterData.chapter_title);
        CourseFormData.append("chapter_description",chapterData.chapter_description );
        CourseFormData.append("video",chapterData.video,chapterData.video.name );
        CourseFormData.append("remarks",chapterData.remarks );
       
       

         try{
            axios.post(baseUrl+'/chapter/',CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                window.location.href='/add_chapter/1';
            });
        }catch(error){
            console.log(error);
        }
    }; 

  return (
    <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                <div className="card"> 
                    <h4 className="card-header">Add Chapter</h4>   
                    <div className="card-body">
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Title</label>
                        <div class="col-sm-10">
                        <input onChange={handleChange} name="chapter_title" type="text" readonly class="form-control" id="staticEmail" />
                        </div>
                    </div>
                    
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                        <textarea onChange={handleChange} name="chapter_description" type="text" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Video</label>
                        <div class="col-sm-10">
                        <input onChange={handleFileChange} name="video" type="file" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Remarks</label>
                        <div class="col-sm-10">
                        <input onChange={handleChange} name="remarks" type="text" class="form-control"  id="inputPassword"/>
                        </div>
                    </div>
                    <hr />
                    <div class="mb-5">
                    <button onClick={submitForm} type="button" class="btn btn-primary">submit</button>                    
                    </div>
                    </div>    
                </div>
                </section>
        </div>
    </div>
  );
};
export default AddChapter;