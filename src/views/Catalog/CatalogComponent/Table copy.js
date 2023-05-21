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
import { Container, Row } from "react-bootstrap";
import { Col } from "reactstrap";
import FormComponent from "../Form/Form";
import UseFetch from "components/Fetch/UseFetch";
import { MoonLoader } from "react-spinners";

const SearchButton = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("");
  //Fetch the data from the server using GetCapabilities request
  const { wmsLayers } = UseFetch(
    "http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities",
    selectedOption?.value
  );

  const [showWmsLayers, setShowWmsLayers] = useState(false);
  const { selectedLayerName, setSelectedLayerName } = useContext(
    SelectedLayerNameContext
  );

  //Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4; // Change this to adjust the number of cards per page
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedCards = wmsLayers.slice(startIndex, endIndex);
  const total = wmsLayers.length;

  //Search for cards
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //Loading spinner
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  useEffect(() => {
    setLoading(false);
  }, [wmsLayers]);

  //Show results of the selected Annex
  const showResults = () => {
    setShowWmsLayers(true);
  };

  //Handle the selected Annex
  const handleChangeAnnex = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSearchTerm("");
    setSuggestions([]);
  };

  const addToMap = (layerName) => {
    setSelectedLayerName(layerName);
  };

  //Handle pages
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  //Handle change of search field
  const handleChangeSearchTerm = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filteredSuggestions = wmsLayers.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      <h1>No records match</h1>;
      setSuggestions([]);
    }
  };

  const handleSelect = (value) => {
    setSearchTerm(value.title);
    setSuggestions([]);
  };

  return (
    <div>
      {children}

      <FormComponent
        selectedOption={selectedOption}
        onChangeAnnex={handleChangeAnnex}
        showResults={showResults}
        searchTerm={searchTerm}
        handleChangeSearchTerm={handleChangeSearchTerm}
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
                  {suggestions.length > 0
                    ? suggestions.map((layer, index) => (
                        <Col
                          key={index}
                          onClick={() => handleSelect(layer)}
                          xs={12}
                        >
                          <CardComponent
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
                                  onClick={() => addToMap(layer.name)}
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
                      ))
                    : displayedCards.map((layer, index) => (
                        <div key={index}>
                          <Col xs={12}>
                            <CardComponent
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
                                    onClick={() => addToMap(layer.name)}
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
                        </div>
                      ))}
                </Row>

                <Row>
                  <Col>
                    {suggestions.length > 0 ? (
                      <>
                        <div className="catalog-pagination">
                          <ReactPaginate
                            pageCount={Math.ceil(
                              wmsLayers.length / cardsPerPage
                            )}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName="pagination"
                            activeClassName="active"
                            previousLabel={
                              <FontAwesomeIcon icon={faAngleLeft} />
                            }
                            nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                          />
                        </div>
                        <div className="push-right">
                          <p>
                            Results {startIndex + 1} - {suggestions.length} of :{" "}
                            {suggestions.length}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="catalog-pagination">
                          <ReactPaginate
                            pageCount={Math.ceil(
                              wmsLayers.length / cardsPerPage
                            )}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName="pagination"
                            activeClassName="active"
                            previousLabel={
                              <FontAwesomeIcon icon={faAngleLeft} />
                            }
                            nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                          />
                        </div>
                        <div className="push-right">
                          <p>
                            Results {startIndex + 1} - {endIndex} of : {total}
                          </p>
                        </div>
                      </>
                    )}
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
