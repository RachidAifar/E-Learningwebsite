import React from "react";
import Sidebar from "./Sidebar";
const Dashboard = () => {
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className='col-md-3'>
                <Sidebar/>
            </aside>
            <section className="col-md-9">
              <div className="card">
                <h5 className="card-header ">Dashboard</h5>
              </div>  
            </section>
        </div>
    </div>
  );
};
export default Dashboard;