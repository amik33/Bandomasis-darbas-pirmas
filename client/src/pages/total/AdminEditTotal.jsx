import { useContext, useState } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Forbiden } from "../../components/error/Forbiden";
import { Title } from "../../components/Title";
import { Link, useNavigate, useParams } from "react-router-dom";

export function AdminEditTotal() {
    const { total } = useParams();
    const navigate = useNavigate();
    const { role, changeTotal } = useContext(GlobalContext);
    const [text, setText] = useState(total);

    if (role !== 'admin') {
        return <Forbiden />;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!text) {
            return;
        }

        fetch('http://localhost:3001/api/total/' + total, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newTitle: text }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    changeTotal(total, text);
                    navigate('/total');
                }
            })
            .catch(console.error);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="Edit total" />
                </div>
                <form onSubmit={submitHandler} className=" col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="total">Total</label>
                        <input onChange={e => setText(e.target.value)} value={text} type="text" className="form-control" id="total" />
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-success rounded-pill py-2" type="submit">Update</button>
                        <Link className="btn btn-warning rounded-pill py-2" to="/total">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}