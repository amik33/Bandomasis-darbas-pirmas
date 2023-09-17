import { useContext, useState } from "react";
import { Title } from "../../components/Title";
import { GlobalContext } from "../../context/GlobalContext";
import { FormsTable } from "../../components/forms-table/FormsTable";

export function UserForms() {
    const { total, forms } = useContext(GlobalContext);
    const [selectedForms, setSelectedForms] = useState('All');
    // const [selectedTotal, setSelectedTotal] = useState('All');
    const [title, setTitle] = useState('');

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='User total' />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 col-sm-4 col-md-3">
                            <select className=" form-select"
                                onChange={e => setSelectedForms(e.target.value)}>
                                <option value="All">All</option>
                                {forms.map(tot => (
                                    <option key={tot} value={tot}>{tot}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 col-sm-4 col-md-3">
                            <input type="text" className="form-control" value={title}
                                onChange={e => setTitle(e.target.value)} />
                        </div>

                    </div>
                </div>
                <div className="col-12">
                    <FormsTable filterForms={selectedForms} filterTitle={title.toLowerCase()} />
                    <Title uri="/forms/new" />
                </div>
            </div>
        </div>
    )
}