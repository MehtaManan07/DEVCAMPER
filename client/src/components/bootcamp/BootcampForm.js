import React from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loader from "../core/Spinner";
import { Col, Row, Button } from "react-bootstrap";

const BootcampForm = ({
  values,
  loading,
  setValues,
  onSubmitHandler,
  setTempCareers,
  id,
}) => {
  const options = [
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Business", label: "Business" },
    { value: "Data Science", label: "Data Science" },
    { value: "UI/UX", label: "UI/UX" },
  ];
  const history = useHistory();

  const { housing, jobAssistance, jobGuarantee, acceptGi } = values;
  const onChangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const animatedComponents = makeAnimated();
  return (
    <div>
      {!loading ? (
        <form onSubmit={onSubmitHandler}>
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
                      onChange={() =>
                        setValues({ ...values, housing: !housing })
                      }
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
                    *After you add the bootcamp, you can add the specific
                    courses offered
                  </p>
                </div>
              </div>
            </div>
          </div>
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
              <Button
                onClick={() => history.goBack()}
                className="my-4"
                variant="outline-danger"
                block
                size="lg"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default BootcampForm;
