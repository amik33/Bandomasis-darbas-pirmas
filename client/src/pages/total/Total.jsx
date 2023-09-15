import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Forbiden } from "../../components/error/Forbiden";
import { TotalTable } from "../../components/total-table/TotalTable";
import { SellerTotalTable} from '../../components/total-table/SellerTotalTable';
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

    if (role === 'seller') {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Title title='Seller total' />
                    </div>
                    <div className="col-12">
                        <SellerTotalTable />
                    </div>
                </div>
            </div>
        );
    }

    return <Forbiden />;

}