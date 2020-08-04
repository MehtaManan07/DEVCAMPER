import React, { useState } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";
import Select from "react-select";
import Loader from '../components/core/Spinner'
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from 'react-redux'
import { createBootcamp } from "../redux/actions/Bootcamps";

const CreateBootcamp = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    phoneNum: 0,
    email: "",
    website: "",
    description: "",
    carrers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
  });
  const dispatch = useDispatch()
  const listBootcamps = useSelector(state => state.listBootcamps)
  const { loading, error } = listBootcamps
  const [tempCareers, setTempCareers] = useState([]);
  const options = [
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Business", label: "Business" },
    { value: "Data Science", label: "Data Science" },
    { value: "UI/UX", label: "UI/UX" },
  ];

  const { housing, jobAssistance, jobGuarantee, acceptGi } = values;
  const onChangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const animatedComponents = makeAnimated();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let careerss = [];
    tempCareers.map(val => careerss.push(val.value))
    setValues({ ...values, careers: careerss });
    console.log(values)
    await dispatch(createBootcamp(values))
  };
  return (
    <section className="container mt-5">
      <h1 className="mb-2">Add Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      {error.length > 0 ? <Alert variant="danger"> {error && error[0]} </Alert> : <></> }
      {!loading ? <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Location & Contact</h3>
                <p className="text-muted">
                  If multiple locations, use the main or largest
                </p>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={values.name}
                    onChange={onChangeHandler("name")}
                    className="form-control"
                    placeholder="Bootcamp Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={values.address}
                    onChange={onChangeHandler("address")}
                    className="form-control"
                    placeholder="Full Address"
                    required
                  />
                  <small className="form-text text-muted">
                    Street, city, state, etc
                  </small>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    value={values.phoneNum}
                    onChange={onChangeHandler("phoneNum")}
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={values.email}
                    onChange={onChangeHandler("email")}
                    className="form-control"
                    placeholder="Contact Email"
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    value={values.website}
                    onChange={onChangeHandler("website")}
                    className="form-control"
                    placeholder="Website URL"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h3>Other Info</h3>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={values.description}
                    onChange={onChangeHandler("description")}
                    rows="5"
                    className="form-control"
                    placeholder="Description (What you offer, etc)"
                    maxLength="500"
                    required
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>
                <div className="form-group">
                  <label>Careers</label>
                  <Select
                    isMulti
                    onChange={setTempCareers}
                    components={animatedComponents}
                    options={options}
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="housing"
                    checked={values.housing}
                    onChange={() => setValues({ ...values, housing: !housing })}
                  />
                  <label className="form-check-label">Housing</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobAssistance"
                    checked={values.jobAssistance}
                    onChange={() =>
                      setValues({ ...values, jobAssistance: !jobAssistance })
                    }
                  />
                  <label className="form-check-label">Job Assistance</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="jobGuarantee"
                    checked={values.jobGuarantee}
                    onChange={() =>
                      setValues({ ...values, jobGuarantee: !jobGuarantee })
                    }
                  />
                  <label className="form-check-label">Job Guarantee</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="acceptGi"
                    checked={values.acceptGi}
                    onChange={() =>
                      setValues({ ...values, acceptGi: !acceptGi })
                    }
                  />
                  <label className="form-check-label">Accepts GI Bill</label>
                </div>
                <p className="text-muted my-4">
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </div>
        </div>
        {JSON.stringify(values)}
        <Row>
          <Col>
            <Button
              onClick={onSubmitHandler}
              className="my-4"
              variant="outline-success"
              block
              size="lg"
            >
              Submit
            </Button>
          </Col>
          <Col>
            <Button className="my-4" variant="outline-danger" block size="lg">
              Cancel
            </Button>
          </Col>
        </Row>
      </form> : <Loader />}
    </section>
  );
};

export default CreateBootcamp;
//  <select name="careers" className="custom-select" multiple>
//                     <option>Select all that apply</option>
//                     {/* selected was passed as prop here */}
//                     <option value="Web Development">Web Development</option>
//                     <option value="Mobile Development">
//                       Mobile Development
//                     </option>
//                     <option value="UI/UX">UI/UX</option>
//                     <option value="Data Science">Data Science</option>
//                     <option value="Business">Business</option>
//                     <option value="Other">Other</option>
//                   </select>
