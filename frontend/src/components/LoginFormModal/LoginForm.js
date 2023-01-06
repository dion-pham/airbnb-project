// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css'
import { useHistory } from "react-router-dom";

function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state => state?.session.user)

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if (credential.length === 0) {
            errors.push("Name or username field is required")
        }
        if (password.length === 0) {
            errors.push("Password is required")
        }
        setErrors(errors)
    }, [credential, password])

    if (sessionUser)  history.push(`/`)

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (

        <form className='login-form' onSubmit={handleSubmit}>
            <h1>Welcome back!</h1>
            {hasSubmitted && errors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}><i className='fa fa-exclamation-circle' />  {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <label>
                <h3>Username or Email</h3>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                />
            </label>
            <label>
                <h3>Password</h3>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Log In</button>
            <button
                onClick={() =>
                    dispatch(
                        sessionActions.login({
                            credential: 'phamsome',
                            password: "pass1word"
                        })
                    )}
            >
                Demo User
            </button>
        </form>
    );
}

export default LoginForm;
