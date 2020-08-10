import React, { useState }  from "react";
import { useLocation } from "react-router-dom";

const UpdatePassword = () => {
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const {state} = useLocation()
  const onChangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(values);
  }
  return (
    <section class="container mt-5">
      <div class="row">
        <div class="col-md-8 m-auto">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h1 class="mb-2">Update Password</h1>
              <form>
                <div class="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={values.currentPassword}
                    onChange={onChangeHandler("currentPassword")}
                    class="form-control"
                    placeholder="Current Password"
                  />
                </div>
                <div class="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={values.newPassword}
                    onChange={onChangeHandler("newPassword")}
                    class="form-control"
                    placeholder="New Password"
                  />
                </div>
                <div class="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={values.newPassword2}
                    onChange={onChangeHandler("newPassword2")}
                    class="form-control"
                    placeholder="Confirm New Password"
                  />
                </div>
                <div class="form-group">
                  <button
                    onClick={submitHandler}
                    class="btn btn-outline-success btn-block"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
