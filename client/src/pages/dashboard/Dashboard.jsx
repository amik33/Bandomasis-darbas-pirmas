import { useContext } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { SellerDashboard } from './SellerDashboard';
import { BuyerDashboard } from './BuyerDashboard';
import { GlobalContext } from '../../context/GlobalContext';
import { Forbiden } from '../../components/error/Forbiden';


export function Dashboard() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminDashboard />;
    }

    if (role === 'seller') {
        return <SellerDashboard />;
    }

    if (role === 'buyer') {
        return <BuyerDashboard />;
    }

    return <Forbiden />;
}