import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  getBootcamp,
  removeBootcamp,
  uploadImage,
} from "../redux/actions/Bootcamps";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/core/Spinner";
import ManageTop from "../components/bootcamp/ManageTop";
import { Button, Alert } from "react-bootstrap";

const ManageBootcamp = () => {
  const [image, setImage] = useState({});
  const [fileName, setFileName] = useState("Upload an image");
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { bootcamp, loading, error } = listBootcamps;
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBootcamp(id));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    console.log(typeof formData);
    await dispatch(uploadImage(id, formData));
    await setFileName("");
    await dispatch(getBootcamp(id));
  };

  const changeHandler = (e) => {
    setImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const deleteBootcamp = async () => {
    alert("Are you sure? this can't be undone!!");
    await dispatch(removeBootcamp(id));
    await history.push("/all/bootcamps");
  };

  return (
    <section className="container mt-5">
      {bootcamp === null || loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              {error.length > 0 ? (
                <Alert variant="danger"> {error.toString()} </Alert>
              ) : (
                <></>
              )}
              {/* {error && <Alert variant="danger"> {error} </Alert>} */}
              <div className="card-body">
                <h1 className="mb-4">Manage Bootcamp</h1>
                <ManageTop bootcamp={bootcamp} />
                <form className="mb-4">
                  <div className="form-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        onChange={changeHandler}
                        className="custom-file-input"
                        id="photo"
                      />
                      <label className="custom-file-label" htmlFor="photo">
                        {fileName}
                      </label>
                    </div>
                  </div>
                  <Button
                    onClick={submitHandler}
                    className="btn-outline-dark btn-block"
                  >
                    {" "}
                    Upload Photo{" "}
                  </Button>
                </form>
                <Link
                  to={`/update/bootcamp/${bootcamp._id}`}
                  className="btn btn-primary btn-block"
                >
                  Edit Bootcamp Details
                </Link>
                <Link
                  to={{
                    pathname: `/manage/courses/${bootcamp._id}`,
                    state: bootcamp,
                  }}
                  className="btn btn-secondary btn-block"
                >
                  Manage Courses
                </Link>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteBootcamp()}
                  className="btn btn-danger btn-block"
                >
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
