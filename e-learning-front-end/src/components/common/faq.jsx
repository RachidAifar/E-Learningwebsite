import React from 'react';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';
import '../About/about.css'



const baseUrl='http://127.0.0.1:8000/api';


const FAQ =()=>{
    const [faqData, setFaqData] =useState([]);
    const{course_id}=useParams();
   

    useEffect(()=>{
        //fetch courses
        try{
            axios.get(baseUrl+'/faq/').then((response)=>{//geting teacher by id
                setFaqData(response.data);
            });

        }catch(error){
            console.log(error);
        }
    },[course_id]);

    
    return(
       <div className='container mt-3 100vh'>
          <h3 className='pb-1 mb-4 mt-3'>Frequent Asked Question</h3>
          <div className="accordion mt-3 ms-3" id="accordionExample">
          {faqData && faqData.map((row,index)=> 
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  {row.question}
                </button>
              </h2>
              {index===0 &&
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                {row.answer} 
                </div>
              </div>
              }
              {index>0 &&
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                {row.answer} 
                </div>
              </div>
              }
            </div>
          )}
          </div>
       </div>
    )
}
export default FAQ;