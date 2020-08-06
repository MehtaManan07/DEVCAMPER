import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ text }) => {
  return (
    <>
      <Spinner
        animation="border"
        variant="danger"
        style={{
          margin: "150px auto",
          display: "block",
          background: "inherit",
        }}
      />
    </>
  );
};

export default Loader;
