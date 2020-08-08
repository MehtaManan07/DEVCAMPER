import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [values, setValues] = useState({
        password: "",
        email: "",
    })
    const onChangeHandler = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(values)
    }
  return (
    <section class="form mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 m-auto">
            <div class="card bg-white p-4 mb-4">
              <div class="card-body">
                <h1>
                  <i class="fas fa-sign-in-alt"></i> Login
                </h1>
                <p>
                  Log in to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form>
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input
                      type="email"
                      value={values.email}
                      onChange={onChangeHandler("email")}
                      class="form-control"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      value={values.password}
                      onChange={onChangeHandler("password")}
                      class="form-control"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <button
                      onClick={onSubmitHandler}
                      class="btn btn-primary btn-block"
                    > Login </button>
                  </div>
                </form>
                <p>                  
                 Forgot Password?
                  <Link to="/reset-password">Reset Password</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
