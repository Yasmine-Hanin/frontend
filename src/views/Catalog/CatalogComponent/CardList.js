import React from "react";
import { Col, Row } from "react-bootstrap";
import CardComponent from "../Card/CardComponent";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const CardList = ({
  layers,
  onClick,
  addToMap,
  startIndex,
  handlePageChange,
}) => {
  return (
    <>
      <Row
        style={{
          boxShadow: " 2px 4px 8px rgba(0, 0, 0, 0.2)",
          maxHeight: "270px",
          overflow: "auto",
        }}
      >
        {layers.map((layer, index) => (
          <div key={index}>
            <Col xs={12} onClick={() => onClick(layer)}>
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
          <div className="catalog-pagination">
            <ReactPaginate
              pageCount={Math.ceil(layers.length / 4)}
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
              Results {startIndex + 1} - {startIndex + 4} of : {layers.length}
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CardList;
