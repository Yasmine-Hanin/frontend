import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Form.css";
import Select from "react-select";

const AnnexOptions = [
  { value: "ANNEX 1", label: "ANNEX 1" },
  { value: "ANNEX 2", label: "ANNEX 2" },
  { value: "ANNEX 3", label: "ANNEX 3" },
];

const FormComponent = (props) => {
  return (
    <Form>
      <Form.Group controlId="formDropdown">
        <Select
          placeholder="INSPIRE ANNEX"
          className="basic-single"
          classNamePrefix="select"
          isClearable="true"
          value={props.selectedOption}
          onChange={props.onChangeAnnex}
          options={AnnexOptions}
        />
      </Form.Group>

      <Form.Group controlId="formInput">
        <Form.Control
          type="text"
          placeholder="Enter text"
          value={props.searchTerm}
          onChange={props.handleChangeSearchTerm}
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={props.showResults}
        className="search-button"
      >
        Search
      </Button>
    </Form>
  );
};

export default FormComponent;
