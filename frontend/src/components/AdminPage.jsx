import React from 'react';
import AdminForm from './AdminForm';
import LogoutButton from './LogoutButton';

const AdminPage = () => (
    <div>
        <h2>Welcome to the Admin Page</h2>
        <AdminForm />
        <LogoutButton />
    </div>
);

export default AdminPage;
