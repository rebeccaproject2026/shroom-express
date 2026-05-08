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
import DealsPage from './pages/deals/DealsPage';
import BecomeDriver from './pages/BecomeDriver';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import MushroomFAQ from './pages/MushroomFAQ';
import WhatToExpect from './pages/WhatToExpect';
// import MushroomStrains from './pages/MushroomStrains';

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
                                    <Route path="deals" element={<DealsPage />} />
                                    <Route path="become-a-driver" element={<BecomeDriver />} />
                                    <Route path="about-us" element={<AboutUs />} />
                                    <Route path="contact-us" element={<ContactUs />} />
                                    <Route path="mushroom-faq" element={<MushroomFAQ />} />
                                    <Route path="what-to-expect" element={<WhatToExpect />} />
                                    {/* <Route path="mushroom-strains" element={<MushroomStrains />} /> */}
                                    <Route path="become-driver" element={<BecomeDriver />} />
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
