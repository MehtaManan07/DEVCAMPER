import React, { useState } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";
import Select from "react-select";
import Loader from "../components/core/Spinner";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { createBootcamp } from "../redux/actions/Bootcamps";
import CreateUpdateForm from "../components/bootcamp/CreateUpdateForm";

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
  const dispatch = useDispatch();
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { loading, error } = listBootcamps;
  const [tempCareers, setTempCareers] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let careerss = [];
    tempCareers.map((val) => careerss.push(val.value));
    setValues({ ...values, careers: careerss });
    console.log(values);
    await dispatch(createBootcamp(values));
  };
  return (
    <section className="container mt-5">
      <h1 className="mb-2">Add Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      {error.length > 0 ? (
        <Alert variant="danger"> {error && error[0]} </Alert>
      ) : (
        <></>
      )}
      <CreateUpdateForm
        values={values}
        loading={loading}
        setValues={setValues}
        onSubmitHandler={onSubmitHandler}
        setTempCareers={setTempCareers}
      />
    </section>
  );
};

export default CreateBootcamp;
