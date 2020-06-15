import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import ModalDetails from './ModalDetails'

const TableDocuments = ({ documents, viewer, details }) => {

    const [detailsData, setDatailsData] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const viewerDocument = async (e, id) => {
        e.preventDefault()

        try {
            const response = await viewer(id)
            const file = new Blob([response.data], { type: 'application/pdf' })
            const fileURL = URL.createObjectURL(file)
            window.open(fileURL)
        } catch (err) {
            alert(err.message)
        }
    }

    const detailsDocument = async (e, id) => {
        e.preventDefault()

        try {
            const response = await details(id)
            console.log(response)
            setDatailsData(response.data)
            handleShow(true)
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <ModalDetails 
                data={detailsData} 
                show={show} 
                handleClose={handleClose} 
            />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((row) => (
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.name || 'Undefined'}</td>
                            <td>{row.size ? `${parseInt(row.size / 1000)} KB`: 'Undefined'}</td>
                            <td>
                                <Button onClick={(e) => detailsDocument(e, row.id)} variant="link">Detalhes</Button>
                                <Button onClick={(e) => viewerDocument(e, row.id)} variant="link">Visualizar PDF</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableDocuments
