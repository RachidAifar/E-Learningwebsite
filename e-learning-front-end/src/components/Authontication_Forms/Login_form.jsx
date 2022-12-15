import React from "react";
import {Link} from 'react-router-dom';
import "./Login.css";






const Login = () => {
    return (
        <section className="sm-image">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-5 col-lg-6 col-sm-5">
                        <img src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp`}
                            className="img-fluid" alt=""></img>
                    </div>
                    <div className="card col-md-5 col-md-4">
                        <div className="card-body">
                        <h3 className="text-center mb-3">Login</h3>
                            <form>
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-2">
                                    <input type="email" id="form3Example3" className="form-control form-control-sm"
                                        placeholder="Enter a valid email address" />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-2">
                                    <input type="password" id="form3Example4" className="form-control form-control-sm"
                                        placeholder="Enter password" />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to={"#!"} className="text-body">Forgot password?</Link>
                                </div>

                                <div className="text-center text-md-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-sm">Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to={"/register"}
                                        className="link-danger">Register</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
        </section>
    );
};
export default Login;
