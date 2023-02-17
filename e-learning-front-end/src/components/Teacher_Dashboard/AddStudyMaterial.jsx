import React from "react";
import axios from 'axios';
import Sidebar from "./T_Sidebar";
import {useParams} from 'react-router-dom';
import {useState} from "react";


const baseUrl='http://127.0.0.1:8000/api';


const AddStudyMaterials = () => {
    const [materialData, setMaterialData] =useState({
        course:'',
        title:'',
        description:'',
        files:'',
        remarks:''
    });

    const handleChange=(event)=>{
        setMaterialData({
            ...materialData,
            [event.target.name]:event.target.value
        });
    };
    const handleFileChange=(event)=>{
        
        window.url =window.url || window.webkitURL;
        var upload =document.createElement('upload');
        upload.src = URL.createObjectURL(event.target.files[0]);
        setMaterialData({
            ...materialData,
            [event.target.name]:event.target.files[0]
        });
    };

    const{course_id}=useParams();//TAKE A ID OF THE COURE FROM URL USING useParms
    const submitForm=()=>{
        const   CourseFormData =new FormData();
        CourseFormData.append("course",course_id );
        CourseFormData.append("title", materialData.title);
        CourseFormData.append("description",materialData.description );
        CourseFormData.append("files",materialData.files,materialData.files.name );
        CourseFormData.append("remarks",materialData.remarks );
       
       

         try{
            axios.post(baseUrl+'/study_materials/'+course_id,CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                window.location.href='/study_materials/'+course_id;
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
                    <h4 className="card-header">Add Study Materials</h4>   
                    <div className="card-body">
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Title</label>
                        <div class="col-sm-10">
                        <input onChange={handleChange} name="title" type="text" readonly class="form-control" id="staticEmail" />
                        </div>
                    </div>
                    
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                        <textarea onChange={handleChange} name="description" type="text" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">File</label>
                        <div class="col-sm-10">
                        <input onChange={handleFileChange} name="files" type="file" class="form-control" id="inputPassword"/>
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
export default AddStudyMaterials;