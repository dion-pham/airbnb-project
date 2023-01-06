// frontend/src/components/SignupFormPage/index.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if (firstName.length === 0) {
            errors.push("First name field is required")
        }
        if (firstName.length > 50) {
            errors.push("First name field must be less than 50 characters")
        }
        if (lastName.length === 0) {
            errors.push("Last name field is required")
        }
        if (lastName.length > 50) {
            errors.push("Last name field must be less than 50 characters")
        }
        if (email.length === 0) {
            errors.push("Email field is required")
        }
        if (email.length > 50) {
            errors.push("Email name field must be less than 50 characters")
        }
        if (!email.includes('.') || !email.includes('@')) {
            errors.push('Email must be valid')
        }
        if (username.length === 0) {
            errors.push("Username field is required")
        }
        if (username.length > 50) {
            errors.push("Username field must be less than 50 characters")
        }
        if (password.length === 0) {
            errors.push("Password field is required")
        }
        if (confirmPassword.length === 0) {
            errors.push("Confirm password field is required")
        }

        setErrors(errors)
    }, [firstName, lastName, email, username, password, confirmPassword])

    // if (sessionUser) return <Redirect to="/" />;
    if (sessionUser) history.push(`/`)

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        setErrors([]);
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };



    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <h1>Welcome to PhamBnb!</h1>
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
                <h3>First Name</h3>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                <h3> Last Name</h3>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <label>
                <h3>Email</h3>

                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <h3>Username</h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <label>
                <h3>Confirm Password</h3>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;
