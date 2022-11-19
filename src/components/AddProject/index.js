import Modal from 'react-modal';
import { useState } from 'react';
import { Button, Input } from "react-bootstrap";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    }
};

const REQUEST_OPTIONS = {
  headers: { 
    'Content-Type': 'application/json',
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYyN2I2NWY2ZjExMjEwMGQ4NTA3M2YiLCJpYXQiOjE2NjczOTg1MDEsImV4cCI6MTY2OTk5MDUwMX0.FwrETs4Agc5c5LqDGlUn0H6OZMa685aWrbjy7PQ4d2Y",
  },
}

const postProject = (data) => {
  console.log(data)
  fetch('https://backoffice-soul-token.herokuapp.com/projects', {
    ...REQUEST_OPTIONS,
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => console.log(data, 'success'));
};

const AddProjectModal  = ({
  
})=>{
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
      name: '',
      description: '',
    });
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function onChangeInput ({
      target: {
        value
      }
    }, field) {
      const newData = data;
      data[field] = value;
      setData(data);
    }
  
    return (
      <div>
        <Button className="add-project" onClick={openModal}>Add New Project</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='modal-project'>
            <h3>Create new Project</h3>
            <div className='project-form'>
              <input type="text" class="form-control my-3" placeholder="Name" onChange={(e)=>onChangeInput(e, 'name')}/>
              <input type="text" class="form-control my-3" placeholder="Description" onChange={(e)=>onChangeInput(e, 'description')}/>
            </div>
            <Button onClick={()=> postProject(data)} >
              Create
            </Button>
          </div>
        </Modal>
      </div>
    );
}

export default AddProjectModal;