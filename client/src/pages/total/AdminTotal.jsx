import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Forbiden } from "../../components/error/Forbiden";
import { TotalTable } from "../../components/total-table/TotalTable";
import { Title } from "../../components/Title";

export function AdminTotal() {
    const { role } = useContext(GlobalContext);

    if (role !== 'admin') {
        return <Forbiden />;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Total' />
                </div>
                <div className="col-12">
                    <TotalTable />
                    <Title uri ='/total/new' />
                </div>
            </div>
        </div>
    )
}