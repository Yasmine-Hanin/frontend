import React from "react";
import { Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <Col xs={6} id="footer-attribution-container"></Col>
          <Col xs={3} id="footer-scaleLine-container"></Col>
          <Col xs={3} id="footer-mousePosition-container">
            <button id="showCoord" title="Show / Hide Coordinate">
              <FontAwesomeIcon icon={faMouse} />
            </button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
