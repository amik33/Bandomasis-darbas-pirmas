import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";


export function Login () {
    const { updateEmail, updateFullname, updateLoginStatus, updateRole } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    function isValidEmail() {
        const minEmailSize = 6;
        const maxEmailSize = 60;

        if (email.length < minEmailSize) {
            setEmailErr(`Email too short. Minimum ${minEmailSize} symbols required.`);
            setEmailValid(false);
        } else if (email.length > maxEmailSize) {
            setEmailErr(`Email too long. Maximum ${maxEmailSize} symbols required.`);
            setEmailValid(false);
        } else {
            setEmailErr(false);
            setEmailValid(true);
        }
    }

    function isValidPassword() {
        const minPasswordSize = 6;
        const maxPasswordSize = 60;

        if (password.length < minPasswordSize) {
            setPasswordErr(`Password too short. Minimum ${minPasswordSize} symbols required.`);
            setPasswordValid(false);
        } else if (password.length > maxPasswordSize) {
            setPasswordErr(`Password too long. Maximum ${maxPasswordSize} symbols required.`);
            setPasswordValid(false);
        } else {
            setPasswordErr(false);
            setPasswordValid(true);
        }
    }


    function emailUpdateHandler(e) {
        setEmail(e.target.value);
    }

    function passwordUpdateHandler(e) {
        setPassword(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (email && password) {
            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        updateLoginStatus(true);
                        updateEmail(data.user.email);
                        updateFullname(data.user.fullname);
                        updateRole(data.user.role);
                        navigate('/dashboard');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>
                    <div className="form-floating mb-3">
                        <input onChange={emailUpdateHandler} value={email} onBlur={isValidEmail} type="email" id="email"
                        className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailValid ? 'is-valid' : ''}`} />
                        <label htmlFor="email">Email</label>
                        <div className="invalid-feedback">{emailErr}</div>    
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={passwordUpdateHandler} value={password} onBlur={isValidPassword} type="password" id="password"
                        className={`form-control ${passwordErr ? 'is-invalid' : ''} ${passwordValid ? 'is-valid' : ''}`} />
                        <label htmlFor="password">Password</label>
                        <div className="invalid-feedback">{passwordErr}</div>
                    </div>
                    <button className="btn btn-success w-100 py-2" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}