import { createContext, useEffect, useState } from 'react';

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    role: 'public',
    updateRole: () => { },
    fullname: '',
    updateFullname: () => { },
    email: '',
    updateEmail: () => { },
    total: [],
    addTotal: () => { },
    deleteTotal: () => { },
    changeTotal: () => { },
    updateTotale: () => { },
    forms: [],
    updateForms: () => { },
    steeringWheelSides: [],


};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [fullname, setFullname] = useState(initialContext.fullname);
    const [email, setEmail] = useState(initialContext.email);
    const [total, setTotal] = useState(initialContext.total);
    const [forms, setForms] = useState(initialContext.forms);
    const [steeringWheelSides, setSteeringWheelSides] = useState(initialContext.steeringWheelSides);

    useEffect(() => {
        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.user) {
                    setLoginStatus(true);
                    setRole(data.user.role);
                    setFullname(data.user.fullname);
                    setEmail(data.user.email);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/api/total', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.list) {
                    setTotal(data.list.map(t => t.title));
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/api/data/steering-wheel-sides', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.list) {
                    setSteeringWheelSides(data.list.map(t => t.side));
                }
            })
            .catch(console.error);
    }, []);


    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateRole(role) {
        const allowedRoles = ['public', 'admin', 'user'];
        if (allowedRoles.includes(role)) {
            setRole(role);
        }
    }

    function updateFullname(fullname) {
        setFullname(fullname);
    }

    function updateEmail(email) {
        setEmail(email);
    }

    function updateTotale(total) {
        setTotal(total);
    }

    function addTotal(total) {
        setTotal(pre => [...pre, total]);
    }

    function deleteTotal(total) {
        setTotal(pre => pre.filter(title => title !== total));
    }

    function changeTotal(oldTotal, newTotal) {
        setTotal(pre => pre.map(title => title === oldTotal ? newTotal : title));
    }

    function updateForms(forms) {
        setForms(forms);
    }


    const value = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
        fullname,
        updateFullname,
        email,
        updateEmail,
        total,
        addTotal,
        deleteTotal,
        changeTotal,
        updateTotale,
        forms,
        updateForms,
        steeringWheelSides,
       
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};