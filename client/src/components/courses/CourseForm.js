import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Button } from "react-bootstrap";

const CourseForm = ({ values, onSubmitHandler, setValues }) => {
  const onchangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const options = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];
  const animatedComponents = makeAnimated();
  return (
    <form action="manage-bootcamp.html">
      <div className="form-group">
        <label>Course Title</label>
        <input
          type="text"
          value={values.title}
          onChange={onchangeHandler("title")}
          className="form-control"
          placeholder="Title"
        />
      </div>
      <div className="form-group">
        <label>Duration</label>
        <input
          type="number"
          min="1"
          value={values.weeks}
          onChange={onchangeHandler("weeks")}
          placeholder="Duration"
          className="form-control"
        />
        <small className="form-text text-muted">
          Enter number of weeks course lasts
        </small>
      </div>
      <div className="form-group">
        <label>Course Tuition</label>
        <input
          type="number"
          min="1"
          value={values.tuition}
          onChange={onchangeHandler("tuition")}
          className="form-control"
        />
        <small className="form-text text-muted">USD Currency</small>
      </div>
      <div className="form-group">
        <label>Minimum Skill Required</label>
        <Select
          value={values.minimumSkill.value}
          options={options}
          components={animatedComponents}
          onChange={(opt) => setValues({ ...values, minimumSkill: opt.value })}
        />
        {/* <select name="minimumSkill" className="form-control">
            <option value="beginner" selected>
              Beginner (Any)
            </option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select> */}
      </div>
      <div className="form-group">
        <textarea
          value={values.description}
          onChange={onchangeHandler("description")}
          rows="5"
          className="form-control"
          placeholder="Course description summary"
          maxLength="500"
        ></textarea>
        <small className="form-text text-muted">
          No more than 500 characters
        </small>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={values.scholarhipsAvailable}
          onChange={() =>
            setValues({
              ...values,
              scholarhipsAvailable: !values.scholarhipsAvailable,
            })
          }
          id="scholarshipAvailable"
        />
        <label className="form-check-label" htmlFor="scholarshipAvailable">
          Scholarship Available
        </label>
      </div>
      <div className="form-group mt-4">
        <Button onClick={onSubmitHandler} className="btn btn-dark btn-block">
          {" "}
          Add Course{" "}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
