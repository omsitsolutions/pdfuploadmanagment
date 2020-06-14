import React from 'react'
import { connect } from 'react-redux'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles
} from '@material-ui/core';

import PropTypes from 'prop-types'
import documentsJson from '../documents.json'

import { setDocuments } from '../actions'

const Documents = ({ documents, dispatchSetDocuments }) => {

    const click = () => {
        dispatchSetDocuments(documentsJson.documents)
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={styles().table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">size</TableCell>
                            <TableCell align="right">path</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.size}</TableCell>
                                <TableCell align="right">{row.path}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={() => click() } variant="contained" color="primary">
                Documentos
            </Button>
        </div>
    )
}

const styles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const mapStateToProps = state => {
    return {
        documents: state.documents
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchSetDocuments: documents => {
        dispatch(setDocuments(documents))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Documents)
