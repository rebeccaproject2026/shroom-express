import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import StoreLayout from './pages/layout/StoreLayout';
import Home from './pages/home/MainHome';


function StoreApp() {
    return (
        <Routes>
            <Route path="/" element={<StoreLayout />}>
                <Route index element={<Home />} />
                {/* Further routes like /products, /cart, /checkout will go here */}
            </Route>
        </Routes>
    );
}

export default StoreApp;
