import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export function SellerTotalTable() {
    const { total } = useContext(GlobalContext);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Act</th>
                        <th className="text-center" scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       total.map((tot, i) => (
                            <tr key={tot}>
                                <td>{i + 1}</td>
                                <td className="text-center">{tot}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}