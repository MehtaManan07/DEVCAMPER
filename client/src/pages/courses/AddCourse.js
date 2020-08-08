import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addCourse } from '../../redux/actions/Courses'
import CourseForm from '../../components/courses/CourseForm'

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
  const dispatch = useDispatch();
  const { state } = useLocation();
  const history = useHistory();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addCourse(id,values))
    setValues({ ...values, 
      title: "",
      minimumSkill: "",
      tuition: "",
      weeks: 0,
      scholarhipsAvailable: false,
      description: "",
    })
    history.push(`/manage/courses/${id}`)
  }
  return (
    <section className="container mt-5">
    <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <span
                onClick={() => history.push(`/manage/courses/${id}`)}
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
