import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import StickyHeader from '../../components/layout/StickyHeader';
import Footer from '../../components/layout/Footer';

const StoreLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/store' || location.pathname === '/store/';

    return (
        <div className="store-app min-h-screen flex flex-col">
            <StickyHeader />

            <main className={`flex-1 bg-[#F8F6F6] ${isHomePage ? '' : 'pt-[160px]'}`}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default StoreLayout;
