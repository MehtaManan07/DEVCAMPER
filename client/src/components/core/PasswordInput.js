import React, { useState } from "react";

const PasswordInput = ({ pwd = "password", values, setValues, value=values.password }) => {
    const [show, setShow] = useState(false);
    const onChangeHandler = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }
  return (
    <>
    {JSON.stringify(pwd)}
      <div className="input-group">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChangeHandler(pwd)}
          className="form-control"
          placeholder="Enter password"
          required
        />
        <div className="input-group-append">
          <i
            style={{ cursor: "pointer", color: show ? "blueviolet" : "black" }}
            onClick={() => setShow(!show)}
            className="btn fa fa-eye"
          ></i>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
