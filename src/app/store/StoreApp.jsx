import React, { useEffect } from 'react';
import './index.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import StoreLayout from './pages/layout/StoreLayout';
import Home from './pages/home/MainHome';
import StoresList from './pages/stores/StoresList';
import StoreDetails from './pages/stores/StoreDetails';
import ProductsList from './pages/products/ProductsList';
import ProductDetail from './pages/products/ProductDetail';


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
                {/* Further routes like /products, /cart, /checkout will go here */}
            </Route>
        </Routes>
    );
}

export default StoreApp;
