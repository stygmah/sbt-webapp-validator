import React, { useEffect, useState } from "react";
import ReactCodeSinppet from 'react-code-snippet'

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

const generateCode = (apiKey)=>{
  return `
    <iframe 
    src="http://localhost:3000/?apiKey=${apiKey}" 
    title="SBT Login"
    frameborder="0" 
    border="0" 
    cellspacing="0"
    ></iframe>

    <script>
      function OnSBTAuthSuccess(){
        //Implement success case here
      }
      
      function OnSBTAuthError(){
        //Implement success case here
      }
    </script>
  `
}


const REQUEST_OPTIONS = {
  headers: { 
    'Content-Type': 'application/json',
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYyN2I2NWY2ZjExMjEwMGQ4NTA3M2YiLCJpYXQiOjE2NjczOTg1MDEsImV4cCI6MTY2OTk5MDUwMX0.FwrETs4Agc5c5LqDGlUn0H6OZMa685aWrbjy7PQ4d2Y",
  },
}

function handleMessage(event) {  
  console.log(event, 'recieved parent')
}

const getProjectInfo = (project)=>{
  const splitted = project.replace('#','').split('-');
  return {
    name: splitted[0],
    apiKey: splitted[1],
  }
};

function Typography() {
  // useEffect(()=>{
  //   window.addEventListener('message', handleMessage, false);
  //   return (() => window.removeEventListener('message', handleMessage));
  // },[])

  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('https://backoffice-soul-token.herokuapp.com/projects', REQUEST_OPTIONS)
    .then(response => response.json())
    .then(data => setProjects(data.projects))
    .then(()=>{
      setSelected(projects[0]);
      setLoaded(true)
    });
    
  }, []);

  const selectProject = (e)=>{
    if(!e) return '';
    setSelected(getProjectInfo(e));
  };



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            
            {
              loaded && 
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Code Snippet</Card.Title>
                  <p className="card-category mb-3" >
                    Add this code to your project's login page. You can modify the behaviour with the data from the authentication by editing the functions OnSBTAuthSuccess and OnSBTAuthError
                  </p>
                  <Dropdown onSelect={(e)=>selectProject(e)} >
                    <Dropdown.Toggle id="dropdown-basic">
                      {selected ? selected.name : 'Select Project'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {
                        projects?.map(({
                          name,
                          apiKey
                        })=><Dropdown.Item key={apiKey} href={`#${name}-${apiKey}`}>{name}</Dropdown.Item>)
                      }
                    </Dropdown.Menu>
                  </Dropdown>

                </Card.Header>
                <Card.Body>
                    {
                      selected && 
                      <div class="code-box">
                          {generateCode(selected?.apiKey)}
                      </div>
                    }
                </Card.Body>
              </Card>
            }


              {/* <iframe 
                src="http://localhost:3000/?apiKey=4zEAr2ignaOFBj7zbS2c9UEZ1uvugt" 
                title="W3Schools Free Online Web Tutorials"
                id="SBT"
                frameborder="0" 
                border="0" 
                cellspacing="0"
              ></iframe> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Typography;
