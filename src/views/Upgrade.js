import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  CardTitle,
  Form,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";
import Axios from "axios";

function Upgrade() {
  const [usersList, setUsersList] = useState([]);
  const [newCity, setNewCity] = useState(0);
  const [newCountry, setNewCountry] = useState(0);
  const getUser = () => {
    Axios.get("http://localhost:3001/profile").then((response) => {
      setUsersList(response.data);
    });
  };
  const updateProfile = (id) => {
    Axios.put("http://localhost:3001/update", {
      country: newCountry,
      id: id,
    }).then((response) => {
      alert("Profile updated");
    });
  };
  const deleteProfile = (id) => {
    Axios.delete(`http://localhost:3001/delete${id}`).then((response) => {
      alert("Profile is deleted");
    });
  };
  const test = () => {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, "9000");
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <Card className="card-upgrade">
              <CardHeader className="text-center">
                <CardTitle tag="h4">Testing Interface</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <Button
                          className="btn-round"
                          color="primary"
                          rel="noopener noreferrer"
                          target="_blank"
                          onClick={getUser}
                        >
                          Test
                        </Button>
                        {usersList.map((val, key) => {
                          return (
                            <div className="content">
                              <Row>
                                <Col md="8">
                                  <Card className="card-user">
                                    <CardHeader>
                                      <CardTitle tag="h5">
                                        {val.userName}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                      <Form>
                                        <Row>
                                          <Col className="px-1" md="3">
                                            <FormGroup>
                                              <label>Username</label>
                                              <div>{val.userName}</div>
                                            </FormGroup>
                                          </Col>
                                          <Col className="pl-1" md="4">
                                            <FormGroup>
                                              <label htmlFor="exampleInputEmail1">
                                                Email address
                                              </label>
                                              <div>{val.email}</div>
                                            </FormGroup>
                                          </Col>
                                          <Col className="pr-1" md="5">
                                            <FormGroup>
                                              <label>Password</label>
                                              <div>{val.password}</div>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col className="pr-1" md="6">
                                            <FormGroup>
                                              <label>First Name</label>
                                              <div>{val.firstName}</div>
                                            </FormGroup>
                                          </Col>
                                          <Col className="pl-1" md="6">
                                            <FormGroup>
                                              <label>Last Name</label>
                                              <div>{val.lastName}</div>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col md="12">
                                            <FormGroup>
                                              <label>Address</label>
                                              <div>{val.address}</div>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col className="pr-1" md="4">
                                            <FormGroup>
                                              <label>City</label>
                                              <div>{val.city}</div>
                                            </FormGroup>
                                          </Col>
                                          <Col className="px-1" md="4">
                                            <FormGroup>
                                              <label>Country</label>
                                              <div>{val.country}</div>
                                              <input
                                                type="text"
                                                onChange={(event) => {
                                                  setNewCountry(
                                                    event.target.value
                                                  );
                                                }}
                                              />
                                            </FormGroup>
                                          </Col>
                                          <Col className="pl-1" md="4">
                                            <FormGroup>
                                              <label>Postal Code</label>
                                              <div>{val.postalCode}</div>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <div className="update ml-auto mr-auto">
                                            <Button
                                              className="btn-round"
                                              color="primary"
                                              type="submit"
                                              onClick={() => {
                                                updateProfile(val.id);
                                              }}
                                            >
                                              Update Profile
                                            </Button>
                                          </div>
                                        </Row>
                                        <Row>
                                          <div className="update ml-auto mr-auto">
                                            <br />
                                            <Button
                                              className="btn btn-danger"
                                              color="primary"
                                              type="submit"
                                              onClick={() => {
                                                deleteProfile(val.id);
                                              }}
                                            >
                                              Delete Profile
                                            </Button>
                                          </div>
                                        </Row>
                                      </Form>
                                    </CardBody>
                                  </Card>
                                </Col>
                              </Row>
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Upgrade;
