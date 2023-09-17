import { useContext } from 'react';
import { AdminForms } from './AdminForms'; 
import { UserForms } from './UserForms';
import { GlobalContext } from '../../context/GlobalContext';
import { Forbiden } from '../../components/error/Forbiden';

export function Forms() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminForms />;
    }

    if (role === 'user') {
        return <UserForms />;
    }

    return <Forbiden />;
}