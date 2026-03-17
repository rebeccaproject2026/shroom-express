import React, { useEffect } from 'react';
import './index.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import StoreLayout from './pages/layout/StoreLayout';
import Home from './pages/home/MainHome';
import StoresList from './pages/stores/StoresList';
import StoreDetails from './pages/stores/StoreDetails';
import ProductsList from './pages/products/ProductsList';
import ProductDetail from './pages/products/ProductDetail';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderCompletePage from './pages/checkout/OrderCompletePage';
import CartPage from './pages/checkout/CartPage';


function StoreApp() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<StoreLayout />}>
                <Route index element={<Home />} />
                <Route path="storeslists" element={<StoresList />} />
                <Route path="storeslists/:storeId" element={<StoreDetails />} />
                <Route path="category/:category" element={<ProductsList />} />
                <Route path="product/:productId" element={<ProductDetail />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="order-complete" element={<OrderCompletePage />} />
                <Route path="cart" element={<CartPage />} />
            </Route>
        </Routes>
    );
}

export default StoreApp;
