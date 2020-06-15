import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import request from '../services/request.services';
import { isAuthenticated, setUser, setToken } from "../services/user.services";
import "../styles/Auth.css";

const Register = (props) => {

    if(isAuthenticated()){
        props.history.push("/documents");
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleRegister = async event => {
        
        event.preventDefault();

        if (!email || !password || !name) {
            setError(true)
            setErrorMessage("Name, E-mail and Password are required")
        } else {
            try {
                
                const response = await request.post("/create", { email, password, name });
                setToken(response.data.token);
                setUser(response.data.user);
                setError(false)
                setErrorMessage("")
                props.history.push("/documents");

            } catch (err) {
                setError(true)
                setErrorMessage(err.message)
            }
        }
    }

    return (
        <div className="Auth">
            <Form>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="E-mail" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Senha" />
                </Form.Group>

                <Form.Group>
                    <Link to={`/`}>Return to Login</Link>
                </Form.Group>

                <Form.Group>
                    <Button onClick={(e) => handleRegister(e)} variant="primary">
                        Create User
                    </Button>
                </Form.Group>

                <Form.Group>
                {
                    error ? <div className='error'>{errorMessage} </div> : null
                }
                </Form.Group>
            </Form>
        </div>
    );
}

export default withRouter(Register)