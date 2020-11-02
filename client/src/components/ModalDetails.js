import React from 'react'
import { Button, Container, Row, Col, Modal } from 'react-bootstrap'
import "../styles/Modal.css";

const ModalDetails = ({ data, show, handleClose }) => {

    const details = (data) => (
        <Container>
            <Row>
                <Col><b>Num. Pages: </b>{data.numpages || 'undefined'}</Col>
            </Row>
            <Row>
                <Col><b>Text:</b></Col>
            </Row>
            <Row>
                <Col>{data.text || 'undefined'}</Col>
            </Row>
        </Container>
    )

    return (
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-90w">
            <Modal.Header closeButton>
            <Modal.Title>Document Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    data ? details(data) : 'No Data'
                }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDetails
