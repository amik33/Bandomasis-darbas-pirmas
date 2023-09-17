import { useContext, useState } from "react";
import { Title } from "../../components/Title";
import { GlobalContext } from "../../context/GlobalContext";
import { TotalTable } from "../../components/total-table/TotalTable";

export function AdminForms() {
    const { total } = useContext(GlobalContext);
    const [selectedTotal, setSelectedTotal] = useState('All');
    const [title, setTitle] = useState('');

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Total admin' />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 col-sm-4 col-md-3">
                            <select className=" form-select"
                                onChange={e => setSelectedTotal(e.target.value)}>
                                <option value="All">All</option>
                                {total.map(tot => (
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
                    <TotalTable filtertotal={selectedTotal} filterTitle={title.toLowerCase()} />
                </div>
            </div>
        </div>
    )
}