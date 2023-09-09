import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export function TotalTable() {
    const { total, deleteTotal } = useContext(GlobalContext);

    function deleteTotalHandler(title) {
        fetch('http://localhost:3001/api/total/' + title, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    deleteTotal(title);
                }
            })
            .catch();
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Act</th>
                        <th scope="col">Total</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       total.map((tot, i) => (
                            <tr key={tot}>
                                <td>{i + 1}</td>
                                <td>{tot}</td>
                                <td className="d-flex gap-2 justify-content-end">
                                    <Link className="btn btn-warning pe-3 rounded-pill" to={`/total/${tot}/edit`}>Edit</Link>
                                    <button onClick={() => deleteTotalHandler(tot)} className="btn btn-danger rounded-pill" type="button">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}