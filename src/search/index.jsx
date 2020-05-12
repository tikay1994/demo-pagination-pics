import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
  onSubmit: null,
};

function SearchForm(props) {
  const { onSubmit } = props;
  const [search, setSearch] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchChange(e) {
    const values = e.target.value;
    setSearch(values);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        search: values,
      };
      onSubmit(formValues);
    }, 300);
  }
  return (
    <input
      style={{ padding: "5px", marginBottom: "10px" }}
      type="text"
      placeholder="Search picture"
      value={search}
      onChange={handleSearchChange}
    ></input>
  );
}

export default SearchForm;
