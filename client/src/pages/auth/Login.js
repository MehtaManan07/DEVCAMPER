import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/Users";
import PasswordInput from "../../components/core/PasswordInput";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(values));
  };
  if (user.isAuth) {
    return <Redirect to="/all/bootcamps" />;
  }

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-sign-in-alt"></i> Login
                </h1>
                <p>
                  Log in to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                <form>
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
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>{" "}
                    <PasswordInput
                      pwd="password"
                      setValues={setValues}
                      values={values}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      onClick={onSubmitHandler}
                      className="btn btn-primary btn-block"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p>
                  Forgot Password?
                  <Link to="/reset-password">Reset</Link>
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
