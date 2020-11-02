import React, { useState } from "react"
import { Link, withRouter } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import request from '../services/request.services'
import { isAuthenticated, setUser, setToken } from "../services/user.services"
import "../styles/Auth.css"

const Login = (props) => {

    if(isAuthenticated()){
        props.history.push("/documents")
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = async event => {

        event.preventDefault()

        if (!email || !password) {
            setError(true)
            setErrorMessage("E-mail and Password are required")
        } else {
            try {
                const response = await request.post("/auth", { email, password })
                console.log(JSON.stringify(response.data.user));
                setToken(response.data.token)
                setUser(JSON.stringify(response.data.user))
                setError(false)
                setErrorMessage("")
                props.history.push("/documents")

            } catch (err) {
                setError(true)
                setErrorMessage(err.message)
            }
        }
    }

    return (
        <div className="Auth">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="E-mail" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password" />
                </Form.Group>

                <Form.Group>
                    <Link to={`/register`}>Register</Link>
                </Form.Group>

                <Form.Group>
                    <Button onClick={(e) => handleLogin(e)} variant="primary">
                        Login
                    </Button>
                </Form.Group>

                <Form.Group>
                {
                    error ? <div className='error'>{errorMessage} </div> : null
                }
                </Form.Group>
            </Form>
        </div>
    )
}

export default withRouter(Login)
