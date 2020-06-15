import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap';
import request from '../services/request.services';
import { viewer, details } from '../services/documents.services';
import { setDocuments } from '../actions'
import TableDocuments from '../components/TableDocuments'
import FormDocuments from '../components/FormDocuments'

const Documents = ({ documents, dispatchSetDocuments }) => {

    useEffect(async () => {
        
        try {
            const response = await request.get("/documents")
            dispatchSetDocuments(response.data.documents)
        } catch (err) {
            alert(err.message)
        }

    }, []);

    return (
        <Container>
            <FormDocuments dispatchSetDocuments={dispatchSetDocuments}/>
            <TableDocuments documents={documents} viewer={viewer} details={details}/>
        </Container>
    )
}

const mapStateToProps = state => ({
    documents: state.documents
})

const mapDispatchToProps = dispatch => ({
    dispatchSetDocuments: documents => {
        dispatch(setDocuments(documents))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Documents)
