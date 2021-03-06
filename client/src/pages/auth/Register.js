import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { registerUser } from "../../redux/actions/Users";
import PasswordInput from "../../components/core/PasswordInput";

const Register = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const onChangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      alert("Passwords didn't match!!");
      return;
    }
    await dispatch(registerUser(values));
  };
  if (user.isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-user-plus"></i> Register
                </h1>
                <p>
                  Register to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      value={values.name}
                      onChange={onChangeHandler("name")}
                      className="form-control"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      value={values.email}
                      onChange={onChangeHandler("email")}
                      className="form-control"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <PasswordInput
                      pwd="password"
                      setValues={setValues}
                      values={values}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password2">Confirm Password</label>
                    <PasswordInput
                      pwd="confirmPassword"
                      setValues={setValues}
                      values={values}
                      value={values.confirmPassword}
                    />
                  </div>

                  <div className="card card-body mb-3">
                    <h5>User Role</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="user"
                        checked={values.role === "user"}
                        onChange={onChangeHandler("role")}
                      />
                      <label className="form-check-label">
                        Regular User (Browse, Write reviews, etc)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        checked={values.role === "publisher"}
                        value="publisher"
                        onChange={onChangeHandler("role")}
                      />
                      <label className="form-check-label">
                        Bootcamp publisher
                      </label>
                    </div>
                  </div>
                  <p className="text-danger">
                    * You must be affiliated with the bootcamp in some way in
                    order to add it to DevCamper.
                  </p>
                  <div className="form-group">
                    <button
                      onClick={submitHandler}
                      className="btn btn-primary btn-block"
                    >
                      {" "}
                      Register{" "}
                    </button>
                  </div>
                </form>
              </div>
              {user.error.length > 0 && (
                  <Alert variant="danger"> {user.error[0]} </Alert>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
