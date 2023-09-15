import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Forbiden } from "../../components/error/Forbiden";
import { TotalTable } from "../../components/total-table/TotalTable";
import { UserTotalTable} from '../../components/total-table/UserTotalTable';
import { Title } from "../../components/Title";

export function Total() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Title title='Admin total' />
                    </div>
                    <div className="col-12">
                        <TotalTable />
                        <Title uri ='/total/new' />
                    </div>
                </div>
            </div>
        );
    }

    if (role === 'user') {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Title title='User total' />
                    </div>
                    <div className="col-12">
                        <UserTotalTable />
                    </div>
                </div>
            </div>
        );
    }

    return <Forbiden />;

}