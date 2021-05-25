import React, { useState } from "react";
import "./SearchForm.css";

import { Button } from "reactstrap";

const SearchForm = ({ search }) => {
  const initialData = {
    searchTerm: "",
  };
  const [formData, setFormData] = useState(initialData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      [name]: value,
    }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await search(formData.searchTerm);
    setFormData(initialData);
  };

  return (
    <div className="SearchForm">
      <form className="SearchForm-form form-inline" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="Enter ticker symbol..."
          value={formData.searchTerm}
          onChange={handleChange}
        />
        <Button size="md" className="SearchForm-btn">
          Search
        </Button>
      </form>
    </div>
  );
};
export default SearchForm;
