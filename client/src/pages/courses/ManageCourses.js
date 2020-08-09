import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBootcamp } from "../../redux/actions/Bootcamps";
import { useHistory, Link, useParams } from "react-router-dom";
import ManageTop from "../../components/bootcamp/ManageTop";
import Loader from "../../components/core/Spinner";
import { removeCourse } from "../../redux/actions/Courses";

const ManageCourses = () => {
  const history = useHistory();
  const { id } = useParams();
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { bootcamp, loading } = listBootcamps;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamp(id));
    // eslint-disable-next-line
  }, []);

  const deleteCourse = async (courseId) => {
    alert("Are you sure? This cannot be undone...");
    await dispatch(removeCourse(courseId));
    await dispatch(getBootcamp(id))
  };

  return (
    <section className="container mt-5">
      {loading || bootcamp === null ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/manage/bootcamp/${id}`)}
                  className="btn btn-link text-secondary my-3"
                >
                  <i className="fas fa-chevron-left"></i> Manage Bootcamp
                </span>
                <h1 className="mb-4">Manage Courses</h1>
                <ManageTop bootcamp={bootcamp} />

                <Link
                  to={`/new/course/${bootcamp._id}`}
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
                    {bootcamp &&
                      bootcamp.courses.map((course) => (
                        <tr key={course._id}>
                          <td>{course.title}</td>
                          <td>
                            <Link to={`/update/course/${course._id}`} className="btn btn-secondary">
                              <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <button
                              onClick={() => deleteCourse(course._id)}
                              className="btn btn-danger"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageCourses;
