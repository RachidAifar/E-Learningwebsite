import React  from 'react';  
import { Link } from 'react-router-dom';      
import './Register.css'       
        
        
const Register = () => {
    return (        
        <section className="sm-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-5 col-md-5 col-lg-5 col-md-2">
                            <div className="card" >
                                <div className="card-body">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form>
                                        <div className="form-outline mb-2">
                                            <input type="text" id="form3Example1cg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="email" id="form3Example3cg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="password" id="form3Example4cg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="password" id="form3Example4cdg" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="button"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                        <p className="text-center text-muted mt-2 mb-0">Have already an account? <Link to={"/login"}
                                            className="fw-bold text-body"><u>Login here</u></Link></p>
                      
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Register;
    