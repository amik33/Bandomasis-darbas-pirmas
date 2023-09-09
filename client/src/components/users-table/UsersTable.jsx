import { useContext, useEffect, useState } from 'react';
import { formatDate } from '../../lib/formatDate';
import { GlobalContext } from '../../context/GlobalContext';

export function UsersTable() {
    const { email } = useContext(GlobalContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUsers(data.list);
                }
            })
            .catch(console.error);
    }, []);

    function handleStatusChange(email, status) {
        fetch('http://localhost:3001/api/users/' + email, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newStatus: status }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUsers(pre => pre.map(user =>
                        user.email === email ? { ...user, is_blocked: status } : user
                    ));
                }
            })
            .catch(console.error);
    }

    const Block = ({ userEmail }) => (
        <button
            onClick={() => handleStatusChange(userEmail, true)}
            className='btn btn-outline-danger rounded-pill'
            disabled={email === userEmail}>
            Block
        </button>
    );
    const Unblock = ({ userEmail }) => (
        <button
            onClick={() => handleStatusChange(userEmail, false)}
            className='btn btn-outline-success rounded-pill'>
            Unblock
        </button>
    );

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Act</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Registered</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, i) => (
                            <tr key={user.email}>
                                <td>{i + 1}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.is_blocked
                                    ? <span className="btn btn-danger rounded-pill">Blocked</span>
                                    : <span className="btn btn-success rounded-pill">Active</span>}</td>
                                <td>{formatDate(user.created)}</td>
                                <td className="d-flex gap-2 justify-content-end">
                                    {user.is_blocked ? <Unblock userEmail={user.email} /> : <Block userEmail={user.email} />}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}