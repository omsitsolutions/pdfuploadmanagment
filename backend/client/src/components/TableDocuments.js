import React from 'react'
import { Table } from 'react-bootstrap';


const TableDocuments = ({ documents }) => {

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Size</th>
                    <th>Path</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((row) => (
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.size || 'Não definido'}</td>
                        <td>{row.path}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TableDocuments
