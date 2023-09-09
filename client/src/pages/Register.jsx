import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Register() {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState('');
    const [fullnameErr, setFullnameErr] = useState('');
    const [fullnameValid, setFullnameValid] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [repassword, setRepassword] = useState('');
    const [repasswordErr, setRepasswordErr] = useState('');
    const [repasswordValid, setRepasswordValid] = useState(false);

    function updateFullname(e) {
        setFullname(e.target.value);
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    function updateRepassword(e) {
        setRepassword(e.target.value);
    }

    function isValidFullnameFormat(name) {
        const nameWords = name.split(' ');
        if (nameWords.length < 2 || nameWords.length > 3) {
            return false;
        } 

        for (const word of nameWords) {
            if (!/^[A-Z][a-z]*$/.test(word)) {
                return false;
            }
        }

        return true;
    }

    function isValidFullname() {
        const minFullnameSize = 3;
        const maxFullnameSize = 50;

        if (!isValidFullnameFormat(fullname)) {
            setFullnameErr(`The full name must consist of two words, each of which begins with a capital letter.`);
            setFullnameValid(false);
        } else if (fullname.length < minFullnameSize) {
            setFullnameErr(`Username too short. Minimum ${minFullnameSize} symbols required.`);
            setFullnameValid(false);
        } else if (fullname.length > maxFullnameSize) {
            setFullnameErr(`Username too long. Maximum ${maxFullnameSize} symbols required.`);
            setFullnameValid(false);
        } else {
            setFullnameErr(false);
            setFullnameValid(true);
        }
    }

    function isValidEmail() {
        const minEmailSize = 6;
        const maxEmailSize = 60;
        const atSymbol = email.indexOf('@');
        const dotSymbol = email.lastIndexOf('.');
        const atSymbolCount = email.split('@').length - 1;
        const topLevelDomain = email.slice(dotSymbol + 1);

        if (email.length < minEmailSize) {
            setEmailErr(`Email too short. Minimum ${minEmailSize} symbols required.`);
            setEmailValid(false);
        } else if (email.length > maxEmailSize) {
            setEmailErr(`Email too long. Maximum ${maxEmailSize} symbols required.`);
            setEmailValid(false);
        } else if (!email.includes('@')) {
            setEmailErr(`"@" symbol is required.`);
            setEmailValid(false);
        } else if (atSymbolCount > 1) {
            setEmailErr(`Only one "@" character is allowed`);
            setEmailValid(false);
        } else if (atSymbol > dotSymbol - 3 || dotSymbol === -1) {
            setEmailErr(`Invalid email format, e.g.: example@example.com`);
            setEmailValid(false);
        } else if (topLevelDomain.length < 2 || topLevelDomain.length > 4) {
            setEmailErr(`Invalid top-level domain.`);
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

    function isValidRepassword() {
        if (password !== repassword) {
            setRepasswordErr('Passwords do not match.');
            setRepasswordValid(false);
        } else {
            setRepasswordErr(false);
            setRepasswordValid(true);
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        if (fullname && email && password) {
            fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ fullname, email, password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        navigate('/login');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>
                    <div className="form-floating mb-3">
                        <input onChange={updateFullname} onBlur={isValidFullname} value={fullname} type="text" id="fullname" 
                        className={`form-control ${fullnameErr ? 'is-invalid' : ''} ${fullnameValid ? 'is-valid' : ''}`}/>
                        <label htmlFor="fullname">Full name</label>
                        <div className="invalid-feedback">{fullnameErr}</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={updateEmail} value={email} onBlur={isValidEmail} type="email" id="email"
                        className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailValid ? 'is-valid' : ''}`} />
                        <label htmlFor="email">Email</label>
                        <div className="invalid-feedback">{emailErr}</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={updatePassword} value={password} onBlur={isValidPassword}  type="password" id="password" 
                        className={`form-control ${passwordErr ? 'is-invalid' : ''} ${passwordValid ? 'is-valid' : ''}`} />
                        <label htmlFor="password">Password</label>
                        <div className="invalid-feedback">{passwordErr}</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={updateRepassword} onBlur={isValidRepassword} autoComplete="Off" value={repassword} type="password" id="repassword"
                        className={`form-control ${repasswordErr ? 'is-invalid' : ''} ${repasswordValid ? 'is-valid' : ''}`} />
                        <label htmlFor="repeatpassword">Repeat password</label>
                        <div className="invalid-feedback">{repasswordErr}</div>
                    </div>
                    <button className="btn btn-success w-100 py-2" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}