import React, { useEffect } from "react";
import image from "../img/image_1.jpg";
import { useParams, Link, useHistory } from "react-router-dom";
import { getBootcamp, removeBootcamp } from "../redux/actions/Bootcamps";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/core/Spinner";

const ManageBootcamp = () => {
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { bootcamp, loading, error } = listBootcamps;
  const history = useHistory()
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamp(id));
  }, [id]);

  const deleteBootcamp = () => {
    alert("Are you sure? this can't be undone!!");
    dispatch(removeBootcamp(id))
    history.push('/all/bootcamps')
  }

  return (
    <section className="container mt-5">
      {bootcamp === null || loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h1 className="mb-4">Manage Bootcamp</h1>
                <div className="card mb-3">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={image} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to={`/bootcamp/${bootcamp.name}/${bootcamp._id}`}>
                            {bootcamp.name}
                            <span className="float-right badge badge-success">
                              8.8
                            </span>
                          </Link>
                        </h5>
                        <span className="badge badge-dark mb-2">{bootcamp.location.city}, {bootcamp.location.state}</span>
                        <p className="card-text">
                          {bootcamp.careers.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="mb-4">
                  <div className="form-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        name="photo"
                        className="custom-file-input"
                        id="photo"
                      />
                      <label className="custom-file-label" htmlFor="photo">
                        Add Bootcamp Image
                      </label>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-light btn-block"
                    value="Upload Image"
                  />
                </form>
                <Link to={`/update/bootcamp/${bootcamp._id}`} className="btn btn-primary btn-block">
                  Edit Bootcamp Details
                </Link>
                <Link
                  to={{ pathname: `/manage/courses/${bootcamp._id}`, state: bootcamp.courses }}
                  className="btn btn-secondary btn-block"
                >
                  Manage Courses
                </Link>
                <span style={{ cursor: "pointer" }} onClick={() => deleteBootcamp()} className="btn btn-danger btn-block">
                  Remove Bootcamp
                </span>
                <p className="text-muted mt-5">
                  * You can only add one bootcamp per account.
                </p>
                <p className="text-muted">
                  * You must be affiliated with the bootcamp in some way in
                  order to add it to DevCamper.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageBootcamp;
