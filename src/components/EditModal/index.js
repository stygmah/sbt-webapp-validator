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
const EditModal  = ({
  id,
  name,
  description,
  apiKey,
  tokens,
})=>{
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function createToken() {
      
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
            </div>
          </div>
        </Modal>
      </div>
    );
}

export default EditModal;