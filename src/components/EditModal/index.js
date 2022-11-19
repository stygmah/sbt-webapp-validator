import Modal from 'react-modal';
import { useState } from 'react';
import { Button } from "react-bootstrap";

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
const postToken = (id,data) => {
  let token = null;
  fetch(`https://backoffice-soul-token.herokuapp.com/projects/${id}/tokens`, {
    ...REQUEST_OPTIONS,
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => token = data);
};

const EditModal  = ({
  id,
  name,
  description,
  apiKey,
  tokens,
  reload,
})=>{
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [tokenForm, setTokenForm] = useState(false);
    const [data, setData] = useState({
      name: '',
      address: '',
      network_name: '',
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

    function createToken(){
      postToken(id, data); 
      setTokenForm(false);
      tokens.push(data)
    }
  
    return (
      <div>
        <Button onClick={openModal}>+</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='modal-project'>
            <h2>
              {name}
            </h2>
            <h6>
              ID: {id}
            </h6>
            <p>
              {description}
            </p>
            <div className='api-key-container'>
              <label for="country">Api Key </label>
              <input type="text" id="apiKey" name="apiKey" value={apiKey} readonly />
            </div>
            <div className='sbt-list-container'>
              <h4>
                Registered SBT
              </h4>
              <div>
                {tokens.length === 0 ? <p>No tokens for this project, please add your first token</p> : 
                <table>
                    <tr>
                      <th>Name</th>
                      <th>Network</th>
                      <th>Address</th>
                    </tr>
                  {
                    tokens.map(({
                      name,
                      network_name,
                      address,
                    })=>
                      <tr>
                        <td>{name}</td>
                        <td>{network_name}</td>
                        <td>{address}</td>
                      </tr>
                    )
                  }
                </table>}
              </div>
              {!tokenForm &&
                <Button className="add-btn" onClick={()=>setTokenForm(!tokenForm)}>
                  Add Token
                </Button>
              }
              {tokenForm &&
                  <div className='token-form'>
                  <div className='project-form'>
                    <input type="text" class="form-control my-3" placeholder="Name" onChange={(e)=>onChangeInput(e, 'name')}/>
                    <input type="text" class="form-control my-3" placeholder="Address" onChange={(e)=>onChangeInput(e, 'address')}/>
                    <input type="text" class="form-control my-3" placeholder="Network Name" onChange={(e)=>onChangeInput(e, 'network_name')}/>
                  </div>
                  <Button onClick={createToken} >
                    Create
                  </Button>
                </div>
              }
            </div>
          </div>
        </Modal>
      </div>
    );
}

export default EditModal;