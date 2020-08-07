import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BootcampForm from "../components/bootcamp/BootcampForm";
import { useParams } from "react-router-dom";
import { updateBootcamp, getBootcamp } from "../redux/actions/Bootcamps";

const UpdateBootcamp = () => {
  const { id } = useParams();
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const { loading, error, bootcamp } = listBootcamps;
  console.log(bootcamp);
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
  const [tempCareers, setTempCareers] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let careerss = [];
    tempCareers.map((val) => careerss.push(val.value));
    setValues({ ...values, careers: careerss });
    await dispatch(updateBootcamp(values, id));
  };

  useEffect(() => {

      dispatch(getBootcamp(id));
     bootcamp!==null && setValues({
       ...values, name: bootcamp!== null && bootcamp.name,
        address: bootcamp!== null && bootcamp.address,
        phoneNum: bootcamp!== null && bootcamp.phone,
        email: bootcamp!== null && bootcamp.email,
        website: bootcamp!== null && bootcamp.website,
        careers: bootcamp!== null && bootcamp.careers,
        description: bootcamp!== null && bootcamp.description,
        housing: bootcamp!== null && bootcamp.housing,
        jobAssistance: bootcamp!== null && bootcamp.jobAssistance,
        acceptGi: bootcamp!== null && bootcamp.acceptGi,
        jobGuarantee: bootcamp!== null && bootcamp.jobGuarantee,
      });

    // eslint-disable-next-line
  }, []);
console.log(error[0])
  return (
    <section className="container mt-5">
      <h1 className="mb-2">Update Bootcamp</h1>
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

export default UpdateBootcamp;
