import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Forbiden } from '../../components/error/Forbiden';
import { AdminUsers } from './AdminUsers';

export function Users() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminUsers />;
    }

    return <Forbiden />;
}