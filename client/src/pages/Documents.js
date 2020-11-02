import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import request from '../services/request.services'
import { viewer, details, deleteId } from '../services/documents.services'
import { getUser, logout } from '../services/user.services'
import { setDocuments } from '../actions'
import TableDocuments from '../components/TableDocuments'
import FormDocuments from '../components/FormDocuments'
import { withRouter } from "react-router-dom";

import '../styles/Documents.css'

const Documents = ({ documents, dispatchSetDocuments, history }) => {

    const user = JSON.parse(getUser())
    console.log('Documents Page ->user', user)

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

    const handleLogout = () => {
        logout()
        return history.push("/")
    }

    return (
        <Container className="containerDocuments">
            <Container>
                <Row>
                    <Col>
                        Welcome, {user.name}!
                    </Col>
                    <Col>
                        <Button className="btnLogout" onClick={() => handleLogout()} variant="link">
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <FormDocuments dispatchSetDocuments={dispatchSetDocuments} />
            </Container>
            <Container>
                <TableDocuments documents={documents} viewer={viewer} details={details} deleteId={deleteId} />
            </Container>
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
