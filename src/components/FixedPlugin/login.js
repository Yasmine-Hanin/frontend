import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [classes, setClasses] = React.useState("dropdown show");
  const handleClick = () => {
    if (classes === "dropdown") {
      setClasses("dropdown show");
    } else {
      setClasses("dropdown");
    }
  };
  return (
    <>
      <div className="fixed-plugin">
        <div className={classes}>
          <div onClick={handleClick}>
            <i
              className="nc-icon nc-single-02"
              style={{ height: 25, width: 25 }}
            />
          </div>
          <ul className="dropdown-menu show">
            <div className="content">
              <Row>
                <Col md="14">
                  <Card className="card-user">
                    <CardHeader>
                      <CardTitle tag="h3" style={{ textAlign: "center" }}>
                        Sign in
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col className="px-1" md="10">
                            <FormGroup>
                              <label>Username</label>
                              <Input
                                style={{ textAlign: "center" }}
                                defaultValue="michael23"
                                placeholder="Username"
                                type="text"
                                onChange={(event) => {
                                  setUserName(event.target.value);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="px-1" md="10">
                            <FormGroup>
                              <label htmlFor="exampleInputEmail1">
                                Password
                              </label>
                              <Input
                                style={{ textAlign: "center" }}
                                placeholder="Password"
                                type="password"
                                onChange={(event) => {
                                  setPassword(event.target.value);
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <li className="button-container">
                          <Button
                            href="https://www.creative-tim.com/product/paper-dashboard-react?ref=pdr-fixed-plugin"
                            color="primary"
                            block
                            className="btn-round"
                          >
                            Sign in
                          </Button>
                        </li>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Login;
