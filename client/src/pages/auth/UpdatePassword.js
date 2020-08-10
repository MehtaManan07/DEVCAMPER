import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/actions/Users";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PasswordInput from "../../components/core/PasswordInput";

const UpdatePassword = () => {
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (values.newPassword !== values.newPassword2) {
      alert("Passwords didn't match");
      setValues({
        ...values,
        currentPassword: "",
        newPassword: "",
        newPassword2: "",
      });
      return;
    }
    await dispatch(updatePassword(values));
    if (user.error.length === undefined) {
      history.push("/manage/account");
    }
  };
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            {user.error.length > 0 && (
              <Alert variant="danger"> {user.error} </Alert>
            )}
            <div className="card-body">
              <h1 className="mb-2">Update Password</h1>
              <form>
                <div className="form-group">
                  <label>Current Password</label>
                  
                <PasswordInput
                  pwd="currentPassword"
                  setValues={setValues}
                  values={values}
                />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                <PasswordInput
                  pwd="newPassword"
                  setValues={setValues}
                  values={values}
                />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                <PasswordInput
                  pwd="newPassword2"
                  setValues={setValues}
                  values={values}
                />
                </div>
                <div className="form-group">
                  <button
                    onClick={submitHandler}
                    className="btn btn-outline-success btn-block"
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
