import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/profile")
      .then((response) => response.json())
      .then((data) => setProfileData(data));
  }, []);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Users</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>Postal Code</th>
                      <th className="text-right">email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.map((profile) => (
                      <tr key={profile.id}>
                        <td>{profile.userName}</td>
                        <td>{profile.country}</td>
                        <td>{profile.city}</td>
                        <td>{profile.postalCode}</td>
                        <td className="text-right">{profile.email}</td>
                      </tr>
                    ))}
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

export default Tables;
