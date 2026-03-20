import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StickyHeader from '../../components/layout/StickyHeader';
import Footer from '../../components/layout/Footer';
import CartDrawer from '../../components/layout/CartDrawer';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const StoreLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/store' || location.pathname === '/store/';
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <div className="store-app min-h-screen flex flex-col">
            <StickyHeader cartCount={cartCount} wishlistCount={wishlistCount} onCartClick={() => setCartOpen(true)} />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

            <main className={`flex-1 bg-[#F8F6F6] ${isHomePage ? '' : 'pt-[250px]'}`}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default StoreLayout;
