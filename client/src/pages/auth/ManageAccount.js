import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/actions/Users";
import { Link } from "react-router-dom";

const ManageAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    dispatch(fetchUser());
    user.user !== {} &&
      setValues({
        ...values,
        name: user.user !== {} && user.user.name,
        email: user.user !== {} && user.user.email,
      });
  }, []);
  console.log(user.user)
  return (
    <>
      <section className="container mt-5">
      {JSON.stringify(values)}
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h1 className="mb-2">Manage Account</h1>
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      value={values.name}
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      value={values.email}
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="submit"
                          value="Save"
                          className="btn btn-success btn-block"
                        />
                      </div>
                      <div className="col-md-6">
                        <Link
                          to="/update/password"
                          className="btn btn-secondary btn-block"
                        >
                          Update Password
                        </Link>
                      </div>
                    </div>
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

export default ManageAccount;
