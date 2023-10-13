// react-app/src/components/SignupFormModal/index.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const isEmailValid = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid(email)) {
            setErrors(["Email is not in a valid format"]);
            return;
        }

        if (password === confirmPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            } else {
                closeModal();
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
    };

    return (
        <>
        <div className="signup-form-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                </label>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                <label>
                    Username
                </label>
                <input
                    type="text"
                    placeholder="username"
                    maxLength={40}
                    minLength={3}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
					/>
                <label>
                    Password
                </label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    maxLength={40}
					minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    required
					/>
                <label>
                    Confirm Password
                </label>
                <input
                    type="password"
                    placeholder="confirm password"
                    maxLength={40}
					minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                <button type="submit">Sign Up</button>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                        ))}
                </ul>
            </form>
        </div>
        </>
    );
}

export default SignupFormModal;
