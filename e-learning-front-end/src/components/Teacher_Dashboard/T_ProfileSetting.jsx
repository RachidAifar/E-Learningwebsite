import React from "react";
import Sidebar from "./T_Sidebar";
const TeacherProfileSetting = () => {
  return (
    <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className="col-md-9">
                <div className="card"> 
                    <h4 className="card-header">Profile Setting</h4>   
                    <div className="card-body">
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input type="text" readonly class="form-control" id="staticEmail" />
                        </div>
                    </div>
                    
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Profile Photo</label>
                        <div class="col-sm-10">
                        <input type="file" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div class="mb-2 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Speciality</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <hr />
                    <div class="mb-5">
                    <button type="button" class="btn btn-primary">Update</button>                    
                    </div>
                    </div>    
                </div>
                </section>
        </div>
    </div>
  );
};
export default TeacherProfileSetting;