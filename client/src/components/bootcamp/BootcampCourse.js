import React from "react";

const BootcampCourse = ({ course }) => {
  return (
    <div className="card mb-3">
      <h5 className="card-header bg-primary text-white">{course.title}</h5>
      <div className="card-body">
        <h5 className="card-title">Duration: {course.weeks} Weeks</h5>
        <p className="card-text">{course.description}</p>
        <ul className="list-group mb-3">
          <li className="list-group-item">Cost: ${course.tuition} USD</li>
          <li className="list-group-item">
            Skill Required: {course.minimumSkill}
          </li>
          <li className="list-group-item">
            Scholarship Available:{" "}
            {course.scholarhipsAvailable ? (
              <i className="fas fa-check text-success"></i>
            ) : (
              <i className="fas fa-times text-danger"></i>
            )}{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BootcampCourse;
