import React, { useEffect } from "react";
import Showcase from "../../components/Landing/Showcase";
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";

const Landing = () => {
  const user = useSelector(state => state.user)
  if(user.isAuth) {
    return <Redirect to="/all/bootcamps" />
  }
  return (
    <div>
      <Showcase />
    </div>
  );
};

export default Landing;
