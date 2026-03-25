import React, { useEffect } from 'react';
import './index.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CategoryProvider } from './context/CategoryContext';
import { AuthProvider } from './context/AuthContext';
import { StoresProvider } from './context/StoresContext';
import StoreLayout from './pages/layout/StoreLayout';
import Home from './pages/home/MainHome';
import StoresList from './pages/stores/StoresList';
import StoreDetails from './pages/stores/StoreDetails';
import ProductsList from './pages/products/ProductsList';
import ProductDetail from './pages/products/ProductDetail';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderCompletePage from './pages/checkout/OrderCompletePage';
import CartPage from './pages/checkout/CartPage';
import TrackOrderPage from './pages/checkout/TrackOrderPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import CheckEmailPage from './pages/auth/CheckEmailPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import MyAccountPage from './pages/auth/MyAccountPage';
import CreateStorePage from './pages/stores/CreateStorePage';

function StoreApp() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <AuthProvider>
        <StoresProvider>
        <CartProvider>
            <WishlistProvider>
            <CategoryProvider>
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
                    <Route path="track-order" element={<TrackOrderPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="check-email" element={<CheckEmailPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                    <Route path="myaccount" element={<MyAccountPage />} />
                    <Route path="create-store" element={<CreateStorePage />} />
                </Route>
            </Routes>
            </CategoryProvider>
            </WishlistProvider>
        </CartProvider>
        </StoresProvider>
        </AuthProvider>
    );
}

export default StoreApp;
