import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useNavigate, useParams } from 'react-router-dom';

const Budgetmodal = () => {

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
 
  const handleChange = (e) => {
    setCategory(e.target.value);
    setBudget(e.target.value);
  }

  const handleSave = () => {
    handleClose();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add budget
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Budget name</Form.Label>
              <Form.Control
                type="text"
                placeholder="category of transaction"
                autoFocus
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Budget amount</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="no commas"
                value={budget} 
                required pattern="^\d+(\.\d{2})?$"
                onChange={(e) => setBudget(e.target.value)}
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Budgetmodal;