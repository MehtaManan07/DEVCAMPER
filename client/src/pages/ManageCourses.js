import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import image from "../img/image_1.jpg";
import ManageTop from "../components/bootcamp/ManageTop";

const ManageCourses = (props) => {
    const history = useHistory()
    const {state} = useLocation()
    console.log(state)
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <span
              style={{ cursor: "pointer" }}
                onClick={() => history.goBack()}
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Bootcamp
              </span>
              <h1 className="mb-4">Manage Courses</h1>
              <ManageTop bootcamp={state} />

              <Link
                to={{ pathname: `/new/course/${state._id}`, state }}
                className="btn btn-primary btn-block mb-4"
              >
                Add Bootcamp Course
              </Link>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  { state && state.courses.map(course => (
                    <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>
                      <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button className="btn btn-danger">
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageCourses;
