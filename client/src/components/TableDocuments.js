import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import ModalDetails from './ModalDetails'


const TableDocuments = ({ documents, viewer, details, deleteId }) => {

    // const [doc,setdoc] = useState({
    //   doc_id: '',id: '',name: '',path: '',size:'',updatedAt: ''});
const [doc,setdoc] = useState(documents);
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
          var obj=documents;
          console.log(obj);
          //doc.push(documents);
          //setdoc(obj);
          setdoc([{
              id: 'nk',
              name: 'item.name'
            }]);
          obj.map((item, index) => {

    setdoc([{
        id: item.id,
        name: item.name
      }]);
    console.log(doc);
  })




            const response = await details(id)
            console.log(response)
            setDatailsData(response.data)
            handleShow(true)
        } catch (err) {
            alert(err.message)
        }
    }

    const deleteDocument = async (e, id) => {
        e.preventDefault()

        try {
            const response = await deleteId(id)
            console.log(response)




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
                        <th>C/N No.</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.doc_id}</td>
                            <td>{row.name || 'Undefined'}</td>
                            <td>{row.size ? `${parseInt(row.size / 1000)} KB`: 'Undefined'}</td>
                            <td>
                                <Button onClick={(e) => detailsDocument(e, row.id)} variant="link">Details</Button>
                                <Button onClick={(e) => viewerDocument(e, row.id)} variant="link">View PDF</Button>
                                <Button onClick={(e) => deleteDocument(e, row.id)} variant="link">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TableDocuments
