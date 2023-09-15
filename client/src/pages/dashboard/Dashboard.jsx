import { useContext } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { UserDashboard } from './UserDashboard';
import { GlobalContext } from '../../context/GlobalContext';
import { Forbiden } from '../../components/error/Forbiden';


export function Dashboard() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminDashboard />;
    }

    if (role === 'user') {
        return <UserDashboard />;
    }

    return <Forbiden />;
}