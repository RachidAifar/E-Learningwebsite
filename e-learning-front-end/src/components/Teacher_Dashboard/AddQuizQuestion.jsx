import React from "react";
import axios from 'axios';
import Sidebar from "./T_Sidebar";
import {useParams} from 'react-router-dom';
import {useState} from "react";



const baseUrl='http://127.0.0.1:8000/api';


const AddQuizQuestion= () => {
    const [questionData, setQuestionData] =useState({
        quiz:'',
        question:'',
        answer_1:'',
        answer_2:'',
        answer_3:'',
        answer_4:'',
        correct_answer:''
    });

    const handleChange=(event)=>{
        setQuestionData({
            ...questionData,
            [event.target.name]:event.target.value
        });
    };
 

    const{quiz_id}=useParams();//TAKE A ID OF THE quiz FROM URL USING useParms
    const submitForm=()=>{
        const   CourseFormData =new FormData();
        CourseFormData.append("quiz",quiz_id );
        CourseFormData.append("question", questionData.question);
        CourseFormData.append("answer_1",questionData.answer_1 );
        CourseFormData.append("answer_2",questionData.answer_2 );
        CourseFormData.append("answer_3",questionData.answer_3 );
        CourseFormData.append("answer_4",questionData.answer_4 );
        CourseFormData.append("correct_answer",questionData.correct_answer );
       
    
         try{
            axios.post(baseUrl+'/quiz_questions/'+quiz_id,CourseFormData,{
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then((res)=>{
                window.location.href='/all_questions/'+quiz_id;
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
                    <h4 className="card-header">Add Quiz</h4>   
                    <div className="card-body">
                    <div className="mb-2 row">
                        <label  className="col-sm-2 col-form-label">Question</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="question" type="text"  className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    
                    <div className="mb-2 row">
                        <label  className="col-sm-2 col-form-label">Answer 1</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="answer_1" type="text" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-sm-2 col-form-label">Answer 2</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="answer_2" type="text" className="form-control"  id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label  className="col-sm-2 col-form-label">Answer 3</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="answer_3" type="text" className="form-control"  id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-sm-2 col-form-label">Answer 4</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="answer_4" type="text" className="form-control"  id="inputPassword"/>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Corecct Answer</label>
                        <div className="col-sm-10">
                        <input onChange={handleChange} name="correct_answer" type="text" className="form-control"  id="inputPassword"/>
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
export default AddQuizQuestion;