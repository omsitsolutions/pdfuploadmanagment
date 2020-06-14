import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import request from '../services/request.services';

const FormDocuments = () => {

    const [file, setFile] = useState("");

    const onChangeHandler = event => {
        setFile(event.target.files[0])
    }

    const onClickHandler = async () => {

        const data = new FormData()
        data.append('file', file)

        try {
            await request.post("/documents/store", data);
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <Form>
            <Form.Group>
                <Form.File
                    onChange={(e) => onChangeHandler(e)}
                    id="file"
                    label="Arquivo PDF"
                    accept='application/pdf' />
            </Form.Group>
            <Form.Group>
                <Button onClick={() => onClickHandler()} ovariant="primary">Enviar Documento</Button>
            </Form.Group>
        </Form>
    )
}

export default FormDocuments
