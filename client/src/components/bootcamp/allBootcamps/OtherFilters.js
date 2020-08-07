import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const OtherFilters = () => {
  const [filters, setFilters] = useState({
    career: "",
    ratings: "",
    price: "",
  });

  const animatedComponents = makeAnimated();
  const CareerOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Business", label: "Business" },
    { value: "Data Science", label: "Data Science" },
    { value: "UI/UX", label: "UI/UX" },
  ];

  const costOptions = [
    { value: "20000", label: "$20000" },
    { value: "15000", label: "$15000" },
    { value: "10000", label: "$10000" },
    { value: "8000", label: "$8000" },
    { value: "6000", label: "$6000" },
    { value: "4000", label: "$4000" },
    { value: "2000", label: "$2000" },
  ];

  return (
    <form>
      {JSON.stringify(filters)}
      <div className="form-group">
        <label>Careers</label>
        <Select
          value={filters.career.value}
          onChange={(e) => setFilters({ ...filters, career: e.value })}
          components={animatedComponents}
          options={CareerOptions}
        />
      </div>

      <div className="form-group">
        <label> Rating</label>
        <select className="custom-select mb-2">
          <option value="any">
            {" "}
            {/* selected was passed as prop here */}
            Any
          </option>
          <option value="9">9+</option>
          <option value="8">8+</option>
          <option value="7">7+</option>
          <option value="6">6+</option>
          <option value="5">5+</option>
          <option value="4">4+</option>
          <option value="3">3+</option>
          <option value="2">2+</option>
        </select>
      </div>

      <div className="form-group">
        <label> Budget</label>
        <Select
          value={filters.career.value}
          onChange={(e) => setFilters({ ...filters, price: e.value })}
          components={animatedComponents}
          options={costOptions}
        />
      </div>
      <input
        type="submit"
        value="Find Bootcamps"
        className="btn btn-primary btn-block"
      />
    </form>
  );
};

export default OtherFilters;
