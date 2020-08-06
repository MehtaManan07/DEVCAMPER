import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import CourseForm from "../components/courses/CourseForm";
import { useDispatch, useSelector } from 'react-redux'
import { addCourse } from "../redux/actions/Courses";

const AddCourse = () => {
  const [values, setValues] = useState({
    title: "",
    minimumSkill: "",
    tuition: "",
    weeks: 0,
    scholarhipsAvailable: false,
    description: "",
  });
  const { id } = useParams();
  const courses = useSelector(state => state.courses)
  const { loading, error, course } = courses;
  const dispatch = useDispatch();
  const { state } = useLocation();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values)
    dispatch(addCourse(id,values))
  }
  const history = useHistory();
  return (
    <section className="container mt-5">
    <div className="row">
        <div className="col-md-8 m-auto">
        {JSON.stringify({ loading, error, course })}
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <span
                onClick={() => history.goBack()}
                style={{ cursor: "pointer" }}
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Courses
              </span>
              <h1 className="mb-2">{state && state.name}</h1>
              <h3 className="text-primary mb-4">Add Course</h3>
              <CourseForm values={values} onSubmitHandler={onSubmitHandler} setValues={setValues} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCourse;
