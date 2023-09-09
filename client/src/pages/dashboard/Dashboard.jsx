import { useContext } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { SellerDashboard } from './SellerDashboard';
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

    return <Forbiden />;
}