import EditModal from "components/EditModal";
import React, { useEffect, useState } from "react";

const REQUEST_OPTIONS = {
  headers: { 
    'Content-Type': 'application/json',
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYyN2I2NWY2ZjExMjEwMGQ4NTA3M2YiLCJpYXQiOjE2NjczOTg1MDEsImV4cCI6MTY2OTk5MDUwMX0.FwrETs4Agc5c5LqDGlUn0H6OZMa685aWrbjy7PQ4d2Y",
  },
}
const TRUNC_SIZE = 20;

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

function truncate(str, n){
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};

function TableList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://backoffice-soul-token.herokuapp.com/projects', REQUEST_OPTIONS)
    .then(response => response.json())
    .then(data => setProjects(data.projects));
    
  }, []);

  const clickAddProject = ()=> {

  };

  return (
    <>
      <Container fluid>
        <Button className="add-project" onClick={clickAddProject}>Add Project</Button>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">API Key</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    { projects &&
                      projects.map(({
                        id,
                        name,
                        description,
                        apiKey,
                        tokens,
                      }) => {
                        return ( 
                          <tr>
                            <td>{truncate(id, TRUNC_SIZE)}</td>
                            <td>{truncate(name, TRUNC_SIZE)}</td>
                            <td>{truncate(description, TRUNC_SIZE)}</td>
                            <td>{truncate(apiKey, TRUNC_SIZE)}</td>
                            <td>
                              <EditModal
                                  id={id}
                                  name={name}
                                  description={description}
                                  apiKey={apiKey}
                                  tokens={tokens}
                              /> 
                            </td>
                          </tr>)
                      })
                    }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
