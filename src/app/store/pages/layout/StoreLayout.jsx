import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StickyHeader from '../../components/layout/StickyHeader';
import Footer from '../../components/layout/Footer';
import CartDrawer from '../../components/layout/CartDrawer';
import MobileCartDrawer from '../../components/layout/MobileCartDrawer';
import MobileBottomNav from '../../components/layout/MobileBottomNav';
import AddedToBagPopup from '../../components/layout/AddedToBagPopup';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const StoreLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/store' || location.pathname === '/store/';
    const { cartItems, cartCount, removeFromCart, updateQuantity } = useCart();
    const { wishlistCount } = useWishlist();
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <div className="store-app min-h-screen flex flex-col">
            <StickyHeader cartCount={cartCount} wishlistCount={wishlistCount} onCartClick={() => setCartOpen(true)} />

            {/* Desktop Drawer */}
            <div className="hidden lg:block">
                <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            </div>

            {/* Mobile/Tablet Bottom Sheet */}
            <MobileCartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                cartItems={cartItems}
                cartCount={cartCount}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
            />

            <AddedToBagPopup onCartOpen={() => setCartOpen(true)} />

            <main className={`flex-1 bg-[#F8F6F6] ${isHomePage ? '' : 'pt-[160px] lg:pt-[130px]'}  lg:pb-0`}>
                <Outlet />
            </main>

            {/* Hide standard mobile nav on product detail, checkout flow, track order, and account edit pages */}
            {!location.pathname.startsWith('/store/product/') && 
             !location.pathname.startsWith('/store/cart') && 
             !location.pathname.startsWith('/store/checkout') && 
             !location.pathname.startsWith('/store/order-complete') && 
             !location.pathname.startsWith('/store/track-order') && 
             !location.search.includes('mode=edit') && 
             <MobileBottomNav />}

            <Footer />
        </div>
    );
};

export default StoreLayout;
