import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBootcamp } from "../../redux/actions/Bootcamps";
import BootcampForm from "../../components/bootcamp/BootcampForm";
import { useHistory } from "react-router-dom";

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
  const [tempCareers, setTempCareers] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { loading, error } = listBootcamps;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let careerss = [];
    tempCareers.map((val) => careerss.push(val.value));
    setValues({ ...values, careers: careerss });
    await dispatch(createBootcamp(values));
    error === {} && history.push("/manage/account");
  };

  console.log(error,error.length)
  return (
    <section className="container mt-5">
      <h1 className="mb-2">Add Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      {error.length > 0 && <Alert variant="danger"> {error[0]} </Alert>}
      <BootcampForm
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
