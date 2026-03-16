import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StickyHeader from '../../components/layout/StickyHeader';
import Footer from '../../components/layout/Footer';
import product1 from '../../assets/images/product1.png';

const defaultCartItems = [
    { id: 1, name: 'Blue Pulaski (Dried)', description: 'Focus & Cognitive Support | 60 Capsules', price: 45, quantity: 1, image: product1 },
    { id: 2, name: "Lion's Mane Dual Extract", description: 'Top-Shelf Indica | 3.5 Grams', price: 60, quantity: 2, image: product1 },
];

const StoreLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/store' || location.pathname === '/store/';

    const [cartItems] = useState(defaultCartItems);
    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <div className="store-app min-h-screen flex flex-col">
            <StickyHeader cartCount={cartCount} onCartClick={() => navigate('/store/cart')} />

            <main className={`flex-1 bg-[#F8F6F6] ${isHomePage ? '' : 'pt-[250px]'}`}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default StoreLayout;
