import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SelectedLayerNameContext } from "../../../Context/SelectedLayerName";
import CardComponent from "../Card/CardComponent";
import { Container, Row } from "react-bootstrap";
import { Col } from "reactstrap";
import FormComponent from "../Form/Form";
import UseFetch from "components/Fetch/UseFetch";
import { MoonLoader } from "react-spinners";
import PaginationComponent from "components/Pagination/PaginationComponent";

const CatalogContent = ({ children }) => {
  const [forcePage, setForcePage] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [showWmsLayers, setShowWmsLayers] = useState(false);
  //Search for cards
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const { selectedLayerName, setSelectedLayerName } = useContext(
    SelectedLayerNameContext
  );
  const { wmsLayers } = UseFetch(
    "http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities",
    selectedOption?.value
  );
  function getStart() {
    //Fetch the data from the server using GetCapabilities request

    //Pagination
    const cardsPerPage = 4; // Change this to adjust the number of cards per page
    setStartIndex(currentPage * cardsPerPage);
    setDisplayedCards(
      wmsLayers.slice(
        currentPage * cardsPerPage,
        currentPage * cardsPerPage + cardsPerPage
      )
    );
    setPageCount(Math.ceil(wmsLayers.length / cardsPerPage));
    //const endIndex = startIndex + displayedCards.length;
    //const total = wmsLayers.length;
  }

  //Loading spinner
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    getStart();
    setLoading(false);
  }, [wmsLayers, currentPage]);

  //Show results of the selected Annex
  const showResults = () => {
    setShowWmsLayers(true);
  };

  //Handle the selected Annex
  const handleChangeAnnex = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSearchTerm("");
    setSuggestions([]);
    setCurrentPage(0);
    setStartIndex(0);
    setForcePage(0);
  };

  const addToMap = (layerName) => {
    setSelectedLayerName(layerName);
  };

  //Handle pages
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    setForcePage(selected);
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
                  {(suggestions.length || displayedCards.length) &&
                    (suggestions.length ? suggestions : displayedCards).map(
                      (layer, index) => (
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
                      )
                    )}
                </Row>

                <Row>
                  <Col>
                    <PaginationComponent
                      forcePage={forcePage}
                      pageCount={pageCount}
                      handlePageChange={handlePageChange}
                      startIndex={startIndex}
                      endIndex={
                        startIndex +
                        (suggestions.length || displayedCards.length)
                      }
                      total={suggestions.length || wmsLayers.length}
                    />
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

export default CatalogContent;
