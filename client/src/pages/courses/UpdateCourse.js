import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { updateCourse, getCourse } from "../../redux/actions/Courses";
import CourseForm from "../../components/courses/CourseForm";

const UpdateCourse = () => {
  const courses = useSelector((state) => state.courses);
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
  const history = useHistory();
  const { course, error } = courses;

  useEffect(() => {
    dispatch(getCourse(id));
    course !== null && setValues({
      ...values,
      title: course !== null && course.title,
      minimumSkill: course !== null && course.minimumSkill,
      tuituon: course !== null && course.tuituon,
      weeks: course !== null && course.weeks,
      scholarshipsAvailable: course !== null && course.scholarshipsAvailable,
      description: course !== null && course.description,
    });
    // eslint-disable-next-line
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCourse(id, values));
    error.length <= 0 && history.push(`/manage/bootcamp/${course.bootcamp._id}`)
  };

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
              {/* <h1 className="mb-2">{state && state.name}</h1> */}
              <h3 className="text-primary mb-4">Add Course</h3>
              {error.length > 0 && <Alert variant="danger"> {error} </Alert>}
              <CourseForm
                values={values}
                onSubmitHandler={onSubmitHandler}
                setValues={setValues}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateCourse;
