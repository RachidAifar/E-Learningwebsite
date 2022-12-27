import React from "react";
import axios from 'axios';
import Sidebar from "./T_Sidebar";
import {useState,useEffect} from "react";


const baseUrl='http://127.0.0.1:8000/api';

const AddCourse = () => {
    const [cats, setCtas]=useState([]);
    const [courseData, setCourseData] =useState({
        category:'',
        course_title:'',
        course_description:'',
        feature_img:'',
        technologies:''
    });

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/courseCategory').then((response)=>{
                setCtas(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[]);
    const handleChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    };
    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    };
    const teacher_id = localStorage.getItem("teacher_id");
    const submitForm=()=>{
        const   CourseFormData =new FormData();
        CourseFormData.append("category",courseData.category );
        CourseFormData.append("teacher", teacher_id);
        CourseFormData.append("course_title",courseData.course_title );
        CourseFormData.append("course_description",courseData.course_description );
        CourseFormData.append("feature_img",courseData.feature_img,courseData.feature_img.name );
        CourseFormData.append("technologies",courseData.technologies );
       

         try{
            axios.post(baseUrl+'/course/',CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                window.location.href='/add_courses';
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
                    <h4 className="card-header">Add Course</h4>   
                    <div className="card-body">
                    <div className="mb-2 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10">
                            <select onChange={handleChange} name="category" type="text" className="form-control">
                                {cats.map((category,index)=>{ return <option key={index} value={category.category_id}>{category.title}</option>})} 
                            </select>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="course_title" type="text" className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    
                    <div className="mb-2 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <textarea onChange={handleChange} name="course_description" type="text" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Featured Image</label>
                        <div className="col-sm-10">
                        <input onChange={handleFileChange} name="feature_img" type="file" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Technologies</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="technologies" type="text" className="form-control" placeholder="Python,Java,C#,JavaScript,HTML,CSS" id="inputPassword"/>
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
export default AddCourse;