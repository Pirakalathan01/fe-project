import React, {useEffect, useState} from 'react';
import {FaTasks, FaHome, FaSignInAlt, FaUserPlus, FaBars} from 'react-icons/fa';
import Link from 'next/link';
import Cookies from 'js-cookie';


const Header = () => {

    const [user, setUser] = useState<{ name: string } | null>(null);
    const [dropdown, setDropdown] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData && userData !== "undefined") {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        Cookies.remove('token');
        window.location.reload();
    };

    return (
        <header
            className="w-full bg-gradient-to-r from-blue-100 to-purple-100 shadow flex items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
                <FaTasks className="text-blue-600 text-2xl md:text-3xl"/>
                <span
                    className="text-lg md:text-2xl font-extrabold text-gray-800 tracking-tight">Project Management Application</span>
            </div>
            {/* Hamburger for mobile */}
            <button className="md:hidden ml-2" onClick={() => setMobileNav(v => !v)}>
                <FaBars className="text-2xl text-gray-700"/>
            </button>
            {/* Navigation */}
            <nav className={`flex-col md:flex-row md:flex gap-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none z-50 ${mobileNav ? 'flex' : 'hidden'}`}>
                <Link href="/"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2 md:p-0">
                    <FaHome/> <span>Home</span>
                </Link>
                {!user ? (
                    <>
                        <Link href="/auth/login"
                              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2 md:p-0">
                            <FaSignInAlt/> <span>Login</span>
                        </Link>
                        <Link href="/auth/register"
                              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition px-4 py-2 md:p-0">
                            <FaUserPlus/> <span>Register</span>
                        </Link>
                    </>
                ) : (
                    <div className="relative flex items-center">
                        <button
                            onClick={() => setDropdown(v => !v)}
                            className="flex items-center gap-2 px-4 py-2 md:p-0"
                        >
                            <span
                                className="bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                                {user.name[0]}
                            </span>
                            <span className="md:inline text-gray-700 hover:text-blue-600">{user.name}</span>
                        </button>
                        {dropdown && (
                            <div className="absolute right-0 mt-2 bg-white shadow rounded p-2 z-50">
                                <button className="block w-full text-left text-red-500 px-4 py-2 hover:bg-gray-100"
                                        onClick={handleLogout}>Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};
export default Header; 