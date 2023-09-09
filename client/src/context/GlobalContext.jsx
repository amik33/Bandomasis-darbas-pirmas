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

};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [fullname, setFullname] = useState(initialContext.fullname);
    const [email, setEmail] = useState(initialContext.email);
    const [total, setTotal] = useState(initialContext.total);

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


    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateRole(role) {
        const allowedRoles = ['public', 'admin', 'seller'];
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
       
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};