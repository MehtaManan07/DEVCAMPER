import React from "react";
import LocationForm from "../bootcamp/LocationForm";

const Showcase = () => {
  return (
    <section className="showcase">
      <div className="dark-overlay">
        <div className="showcase-inner container">
          <h1 className="display-4">Find a Code Bootcamp</h1>
          <p className="lead">
            Find, rate and read reviews on coding bootcamps
          </p>
          <LocationForm showcase />
        </div>
      </div>
    </section>
  );
};

export default Showcase;
