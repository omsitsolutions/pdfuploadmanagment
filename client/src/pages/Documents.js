import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import request from '../services/request.services'
import { viewer, details } from '../services/documents.services'
import { logout } from '../services/user.services'
import { setDocuments } from '../actions'
import TableDocuments from '../components/TableDocuments'
import FormDocuments from '../components/FormDocuments'

import { withRouter } from "react-router-dom";

const Documents = ({ documents, dispatchSetDocuments, history }) => {

    const getDocuments = async () => {
        try {
            const response = await request.get("/documents")
            dispatchSetDocuments(response.data.documents)
        } catch (err) {
            logout()
            return history.push("/")
        }
    }

    useEffect(() => {
        getDocuments()
    }, [])

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Documents))
