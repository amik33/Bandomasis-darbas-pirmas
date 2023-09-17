import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export function FormsTable({ filterForms, filterTitle }) {
    const { forms, updateForms, deleteTotalHandler } = useContext(GlobalContext);

    useEffect(() => {
        fetch('http://localhost:3001/api/forms/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    updateForms(data.list);
                }
            })
            .catch(console.error);
    }, []);

    const imageStyle = {
        width: 100,
        height: 50,
        objectFit: 'container',
        objectPosition: 'center',
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Location</th>
                        <th scope="col">Type</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        forms
                            .filter(form => filterForms === 'All' ? true : form.total === filterForms)
                            .filter(form => filterTitle === '' ? true : form.title.toLowerCase().includes(filterTitle))
                            .map((form, idx) => (
                                <tr key={form.title + idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img style={imageStyle} src={form.image} alt="Form" />
                                    </td>
                                    <td>{form.title}</td>
                                    <td>{form.price}</td>
                                    <td>{form.location}</td>
                                    <td>{form.total}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <Link className="btn btn-primary btn-sm" to={`/forms/${form.id}/edit`}>Edit</Link>
                                            <button onClick={() => deleteTotalHandler(form)} className="btn btn-danger btn-sm" type="button">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}