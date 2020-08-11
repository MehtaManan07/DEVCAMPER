import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch()
}
  return (
    <>
      <section className="container mt-5">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <a href="login.html">Back to login</a>
                <h1 className="mb-2">Reset Password</h1>
                <p>
                  Use this form to reset your password using the registered
                  email address.
                </p>
                <form>
                  <div className="form-group">
                    <label>Enter Email</label>
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="form-group">
                    <button
                    onClick={submitHandler}
                      value="Reset Password"
                      className="btn btn-dark btn-block"
                    >Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
