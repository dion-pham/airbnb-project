// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if (credential.length === 0) {
            errors.push("Name field is required")
        }
        if (password.length === 0) {
            errors.push("Password is required")
        }
        setErrors(errors)
    }, [credential, password])

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
        <form onSubmit={handleSubmit}>
            {/* <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul> */}
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
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                />
            </label>
            <label>
                Password
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
