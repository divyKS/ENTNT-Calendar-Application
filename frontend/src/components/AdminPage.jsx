import React from 'react';
import AdminForm from './AdminForm';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router';
import { FaHome, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import CompaniesList from './CompaniesList';

const AdminPage = () => {
    return (
        <>
            <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
                <div className="text-xl font-bold">Admin Dashboard</div>
                <div className="flex items-center space-x-6">
                    <Link to="/admin/create-company" className="flex items-center hover:text-gray-300">
                        <FaPlusCircle className="mr-1" />
                        Create Company
                    </Link>
                    <div className="flex items-center">
                        <LogoutButton />
                    </div>
                    {/* <div className="flex items-center">
                        <LogoutButton className="flex items-center hover:text-gray-300">
                            <FaSignOutAlt className="mr-1" />
                            Logout
                        </LogoutButton>
                    </div> */}
                </div>
            </nav>
            <CompaniesList />
        </>
    )
}

export default AdminPage;
