import React from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import {useState} from "react";
import Swal from 'sweetalert2';




const baseUrl='http://127.0.0.1:8000/api';






const ChangePassword = () => {


    const [studentData, setStudentData] = useState({ //the data will by taken from the input and put it into teacherData after make axios post
        'password':'',                       //handleChange will store all the changes which are targeted         //submitForm we will append each value from input "form"'
    });
    const student_id =localStorage.getItem('student_id');
    const handleChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    };
    const submitForm=()=>{
        const teacherFormData =new FormData();
        teacherFormData.append("password", studentData.password);
        

        try{
            axios.post(baseUrl+'/student/change_password/'+student_id +'/',teacherFormData).then((response)=>{
                if(response.status===200){
                    Swal.fire({
                        title: 'password hsa been changed',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:"center",
                        timerProgressBar:true,
                        showConfirmButton:false
                      }
                    );
                    window.location.href='/student_logout'
                }
            });
        }catch(error){
            setStudentData({'status':'error'});
        }
        
    }; 
    // const teacherLoginStatus= localStorage.getItem('teacherLoginStatus');//if the user is logied in redirect them to teacher dashboard.
    // if(teacherLoginStatus!=='true'){
    //     window.location.href='/teacher_login'
    // }


  return (


    <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                <div className="card"> 
                    <h4 className="card-header">Change Password</h4>   
                    <div className="card-body">
                    {/* <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Old Password</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" id="staticEmail" />
                        </div>
                    </div> */}
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                        <div class="col-sm-10">
                        <input onChange={handleChange}  name ="password" type="text" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    {/* <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Confirme Password</label>
                        <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword"/>
                        </div>
                    </div> */}
                    <hr />
                    <div >
                    <button type="button" class="btn btn-primary" onClick={submitForm}>Change</button>                    
                    </div>
                    </div>    
                </div>
                </section>
        </div>
    </div>
  );
};
export default ChangePassword;