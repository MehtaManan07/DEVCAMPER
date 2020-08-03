import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ text }) => {
    return (
        <>
        <Spinner animation="border" variant="danger" />
    <h4> {text} </h4>
    </>
    )
}

export default Loader
