import React from 'react'
import { Button, Table } from 'react-bootstrap';

const TableDocuments = ({ documents, viewer }) => {

    const viewerDocument = async (e, id) => {
        e.preventDefault()

        try {
            const response = await viewer(id);
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Size</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((row) => (
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.size || 'Não definido'}</td>
                            <td><Button onClick={(e) => viewerDocument(e, row.id)} variant="link">Visualizar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableDocuments
