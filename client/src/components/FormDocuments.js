import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import request from '../services/request.services';

const FormDocuments = ({ dispatchSetDocuments }) => {

    const [file, setFile] = useState("");
    const [docId, setdocId] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onChangeHandler = event => {
        setFile(event.target.files[0])
    }

    const onClickHandler = async () => {

      if (!docId & !file) {
          setError(true)
          setErrorMessage("C/N No. & POD PDF are required")
      }
      else if (!docId ) {
          setError(true)
          setErrorMessage("Please enter C/N No.")
      } else if ( !file) {
          setError(true)
          setErrorMessage("Please browse POD PDF file")
      } else {

        const data = new FormData()
        data.append('file', file)
        data.append('docId', docId)

        try {
            await request.post("/documents/store", data);
            console.log(data);
            const response = await request.get("/documents")
            dispatchSetDocuments(response.data.documents)
        } catch (err) {
            alert(err.message)
        }
      }
    }

    return (
        <Form>
        <Form.Group controlId="formBasicEmail">
    <Form.Label>Proof of delivery (POD)</Form.Label>
    <Form.Control type="text" placeholder="Enter C/N NO." value={docId} onChange={e => setdocId(e.target.value)}/>
    <Form.Text className="text-muted" >
      Please never share with anyone else.
    </Form.Text></Form.Group>
            <Form.Group>
                <Form.File
                    onChange={(e) => onChangeHandler(e)}
                    id="file"
                    label="Save your PDF document"
                    accept='application/pdf' />

            </Form.Group>
            <Form.Group>
                <Button onClick={() => onClickHandler()} ovariant="primary">Upload</Button>
            </Form.Group>
            <Form.Group>
            {
                error ? <div className='error'>{errorMessage} </div> : null
            }
            </Form.Group>
        </Form>
    )
}

export default FormDocuments
