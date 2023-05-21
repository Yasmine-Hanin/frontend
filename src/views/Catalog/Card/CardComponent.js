import React, { useState } from "react";
import "./Card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "reactstrap";

const CardComponent = ({
  title,
  description,
  abstract,
  infoExtra,
  tools,
  body,
  imageUrl,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mapstore-side-card">
      <div className="ms-head">
        <Container fluid>
          <Row>
            <Col xs={{ order: "first" }} style={{ width: "80px" }}>
              <div className="mapstore-side-preview">
                {imageUrl && <img src={imageUrl} alt="Preview" />}
              </div>
            </Col>
            <Col xs={8}>
              <div className="mapstore-side-card-container">
                <div className="mapstore-side-card-inner">
                  <div className="mapstore-side-card-left-container">
                    <Container fluid>
                      <div className="mapstore-side-card-info">
                        <Row>
                          <Col>
                            {title && (
                              <div className="mapstore-side-card-title">
                                <span>{title}</span>
                              </div>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {description && (
                              <div className="mapstore-side-card-desc">
                                <span>{description}</span>
                              </div>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            {abstract && (
                              <div className="mapstore-side-card-caption">
                                {abstract.length > 50 ? (
                                  <span>
                                    <div>
                                      <Col xs={18}>
                                        {expanded
                                          ? abstract
                                          : `${abstract.substring(0, 50)}...`}
                                      </Col>
                                      <button
                                        title="Read more"
                                        onClick={() => toggleExpand()}
                                      >
                                        <FontAwesomeIcon
                                          icon={
                                            expanded
                                              ? faChevronLeft
                                              : faChevronRight
                                          }
                                          style={{ fontSize: "16px" }}
                                        />
                                      </button>
                                    </div>
                                  </span>
                                ) : (
                                  <span>
                                    <Col xs={8}>{abstract}</Col>
                                  </span>
                                )}
                              </div>
                            )}
                          </Col>
                        </Row>
                      </div>
                      {/* {infoExtra && (
                        <div className="mapstore-side-card-info-extra">
                          {infoExtra}
                        </div>
                      )} */}
                    </Container>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="mapstore-side-card-right-container">
                <div className="mapstore-side-card-tool text-center">
                  <div className="btn-group" style={{ alignItems: "center" }}>
                    {" "}
                    {tools}
                  </div>
                </div>
                <div className="mapstore-side-card-loading"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {body && <div className="ms-body">{body}</div>}
    </div>
  );
};

export default CardComponent;
