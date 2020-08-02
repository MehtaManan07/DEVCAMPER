import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBootcamps } from "../redux/actions/Bootcamps";
import { useEffect } from "react";

const AllBootcamps = () => {
  const listBootcamps = useSelector((state) => state.listBootcamps);
  const dispatch = useDispatch();
  const { bootcamps, loading, error } = listBootcamps;
  useEffect(() => {
    dispatch(getBootcamps());
  }, []);
  console.log(listBootcamps);
  return (
    <div style={{ color: 'red' }}>
    <hr/>
    <hr/>
    We found {bootcamps.length} bootcamps
    </div>
  );
};

export default AllBootcamps;
