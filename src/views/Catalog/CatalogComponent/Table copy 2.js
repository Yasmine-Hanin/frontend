import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { SelectedLayerNameContext } from "../../../Context/SelectedLayerName";
import CardComponent from "../Card/CardComponent";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Col } from "reactstrap";
import FormComponent from "../Form/Form";
import UseFetch from "components/Fetch/UseFetch";
import { MoonLoader } from "react-spinners";
import ErrorBoundary from "Error/ErrorBoundary";
import { Autocomplete, TextField } from "@mui/material";

const SearchButton = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { wmsLayers } = UseFetch(
    "http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities",
    selectedOption.value
  );
  const [showWmsLayers, setShowWmsLayers] = useState(false);
  const { selectedLayerName, setSelectedLayerName } = useContext(
    SelectedLayerNameContext
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const cardsPerPage = 4; // Change this to adjust the number of cards per page
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedCards = wmsLayers.slice(startIndex, endIndex);
  const total = wmsLayers.length;

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleClick = () => {
    setShowWmsLayers(true);
  };

  const onClick = (layerName) => {
    console.log("layername : " + layerName);
    setSelectedLayerName(layerName);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [inputText, setInputText] = useState("");

  const inputHandler = (e) => {
    //convert input text to lower case
    var text = e.target.value;
    setInputText(text);
  };

  console.log(inputText);

  useEffect(() => {
    setLoading(false);
  }, [wmsLayers]);

  const titles = [];
  const layerSearched = [];

  if (wmsLayers) {
    wmsLayers.forEach((layer) => {
      if (layer.title) {
        titles.push(layer.title);
        if (layer.title === inputText) {
          layerSearched.push(layer);
        }
      }
    });
    console.log("Ttles " + titles);
    console.log(wmsLayers);
    console.log("Searched " + layerSearched);
  }

  for (let i = 0; i < titles.length; i++) {}

  const [value, setValue] = useState("");
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (value) => {
    setValue(value);
  };

  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const options = ["Option 1", "Option 2", "Option 3"];
  console.log(value);

  return (
    <div>
      {children}

      <FormComponent
        selectedOption={selectedOption}
        onChange={handleChange}
        onClick={handleClick}
        inputHandler={inputHandler}
      />
      <Autocomplete
        value={value}
        onChange={handleOnChange}
        inputValue={inputValue}
        onInputChange={handleOnInputChange}
        options={titles}
        renderInput={(params) => (
          <TextField {...params} label="Search" variant="outlined" />
        )}
      />

      <Container fluid>
        {loading ? (
          <MoonLoader
            color="blue"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            {showWmsLayers && (
              <>
                <Row
                  style={{
                    boxShadow: " 2px 4px 8px rgba(0, 0, 0, 0.2)",
                    maxHeight: "270px",
                    overflow: "auto",
                  }}
                >
                  {displayedCards.map((layer, index) => (
                    <>
                      <Col xs={12}>
                        <CardComponent
                          key={index} // Make sure to add a unique key for each card
                          imageUrl={
                            "https://mapstore.geosolutionsgroup.com/mapstore/dist/web/client/components/catalog/img/default.jpg"
                          }
                          title={layer.title}
                          description={layer.title}
                          abstract={layer.abstract}
                          tools={
                            <div>
                              <button
                                className="btn-square-md btn-primary"
                                id="add_map_btn"
                                onClick={() => onClick(layer.name)}
                                title="Add To Map"
                              >
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  style={{
                                    textAlign: "center",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                />
                              </button>
                            </div>
                          }
                        />
                      </Col>
                    </>
                  ))}
                </Row>
                <Row>
                  <Col>
                    <div className="catalog-pagination">
                      <ReactPaginate
                        pageCount={Math.ceil(wmsLayers.length / cardsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName="pagination"
                        activeClassName="active"
                        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                      />
                    </div>
                    <div className="push-right">
                      <p>
                        Results {startIndex + 1} - {endIndex} of : {total}
                      </p>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default SearchButton;
