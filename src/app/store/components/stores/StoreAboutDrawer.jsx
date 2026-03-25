import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== 'undefined') {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const StoreAboutDrawer = ({ open, onClose, storeData }) => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    // Prevent background scrolling when drawer is open
    useEffect(() => {
        if (open) {
            document.body.style.setProperty("overflow", "hidden", "important");
            document.documentElement.style.setProperty("overflow", "hidden", "important");
        } else {
            document.body.style.removeProperty("overflow");
            document.documentElement.style.removeProperty("overflow");
        }
        return () => {
            document.body.style.removeProperty("overflow");
            document.documentElement.style.removeProperty("overflow");
        };
    }, [open]);

    // Init Mapbox map when drawer opens
    useEffect(() => {
        if (!open || !mapContainerRef.current) return;
        if (mapRef.current) return; // already initialized

        const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        if (!token) return;

        // Default to Toronto; use storeData.coords if available
        const center = storeData?.coords || [-79.3832, 43.6532];

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center,
            zoom: 14,
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

        mapRef.current.on('load', () => {
            // Pin marker
            const pinEl = document.createElement('div');
            pinEl.innerHTML = `
                <svg width="28" height="36" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="#E93E2B"/>
                    <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>
            `;
            pinEl.style.cursor = 'pointer';
            new mapboxgl.Marker({ element: pinEl, anchor: 'bottom' })
                .setLngLat(center)
                .addTo(mapRef.current);
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [open]);

    // Prevent rendering strictly if no data/close but we use translate for smooth animation
    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-[#0F3540]/60 z-[9998] transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E8] shrink-0">
                    <h2 className="text-lg font-bold text-[#181211]">Store Details</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E7EB] rounded-full transition-colors"
                    >
                        <Icon icon="heroicons:x-mark-20-solid" width={20} className="text-[#6B7280]" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-28 custom-scrollbar">

                    {/* Cover & Logo block */}
                    <div className="relative mb-10">
                        {/* Cover */}
                        <div className="w-full h-[120px] rounded-md overflow-hidden bg-gray-200">
                            <img
                                src={storeData?.coverImage}
                                alt="Store Cover"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Logo */}
                        <div className="absolute -bottom-8 left-4">
                            <div className="w-18 h-18 bg-white rounded-md shadow-[0px_4px_16px_rgba(0,0,0,0.1)] p-1.5 flex items-center justify-center">
                                {storeData?.logo ? (
                                    <img src={storeData.logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                                ) : (
                                    <span className="font-bold text-xl text-[#0F3540]">FO</span>
                                )}
                            </div>
                        </div>
                        {/* Top Rated Badge */}
                        <div className="absolute  left-24 -bottom-6 flex">
                            <Icon icon="solar:verified-check-bold" width={16} className="text-[#E93E2B]" />
                            <span className="text-[11px] font-bold text-[#E93E2B] uppercase tracking-wider">Top Rated Seller</span>
                        </div>
                    </div>



                    {/* Store Name & Desc */}
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-[#181211] mb-1">{storeData?.name || "Forest Oasis"}</h1>
                        <p className="text-[13px] text-[#64748B]">Farm-to-table grocer & community sustainable hub.</p>
                    </div>

                    {/* Est. Delivery */}
                    <div className="bg-[#F8F9FA] px-4 py-2.5 rounded-lg mb-6 flex items-center gap-2">
                        <span className="text-[#9CA3AF] text-[13px] font-medium">Est. Delivery:</span>
                        <span className="text-[13px] font-bold text-[#181211]">{storeData?.deliveryTime || "Under 2 hours"}</span>
                    </div>

                    {/* ABOUT US */}
                    <div className="mb-6">
                        <h3 className="text-[#94A3B8] text-[12px] font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                            About Us
                        </h3>
                        <p className="text-[14px] font-medium text-[#475569] leading-relaxed">
                            {storeData?.description || "Forest Oasis is a premium magic mushroom wellness store inspired by the purity and mystery of the forest. Our mission is to provide high-quality, carefully sourced psilocybin mushroom products in a safe, informed, and responsible environment."}
                        </p>
                    </div>

                    {/* STORE REVIEWS */}
                    <div className="bg-[#F8FAFC] rounded-xl p-5 mb-6 border border-[#F1F5F9]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[#94A3B8] text-[12px] font-bold tracking-widest uppercase">Store Reviews</h3>
                            <button className="text-[#E93E2B] text-[12px] font-bold hover:underline">View All</button>
                        </div>

                        <div className="flex items-center justify-between">
                            {/* Left side overall rating */}
                            <div className="flex flex-col items-center">
                                <h4 className="text-[42px] font-extrabold text-[#111827] leading-none mb-1">
                                    {storeData?.rating || "4.9"}
                                </h4>
                                <div className="flex items-center gap-0.5 mb-1 text-[#FFE100]">
                                    {[...Array(5)].map((_, i) => (
                                        <Icon key={i} icon="flowbite:star-solid" width={14} />
                                    ))}
                                </div>
                                <span className="text-[11px] text-[#181211]">Based on {storeData?.reviewCount || 24}</span>
                                <span className="text-[11px] text-[#181211]">verified reviews</span>
                            </div>

                            {/* Right side bars */}
                            <div className="w-[180px] flex flex-col gap-1.5">
                                {[
                                    { stars: "05", p: 90, bar: "w-[90%]" },
                                    { stars: "04", p: 60, bar: "w-[60%]" },
                                    { stars: "03", p: 40, bar: "w-[40%]" },
                                    { stars: "02", p: 30, bar: "w-[30%]" },
                                    { stars: "01", p: 0, bar: "w-[0%]" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="text-[12px] font-bold text-[#374151] w-4">{item.stars}</span>
                                        <Icon icon="flowbite:star-solid" width={11} className="text-[#FFE100]" />
                                        <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                                            <div className={`h-full ${item.p > 0 ? 'bg-[#FFE100]' : 'bg-transparent'} ${item.bar} rounded-full`}></div>
                                        </div>
                                        <span className="text-[11px] font-semibold text-[#181211] w-[26px] text-right font-medium">{item.p}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* OPERATING HOURS */}
                    <div className="mb-6">
                        <h3 className="text-[#9CA3AF] text-[12px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                            <Icon icon="ph:clock" width={16} /> Operating Hours
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-[#64748B]">Monday - Friday</span>
                                <span className="text-[#111827] font-bold">08:00 AM - 08:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-[#64748B]">Saturday</span>
                                <span className="text-[#111827] font-bold">09:00 AM - 06:00 PM</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-[#64748B]">Sunday</span>
                                <span className="text-[#E93E2B] font-bold">Closed</span>
                            </div>
                        </div>
                    </div>

                    {/* LOCATION */}
                    <div>
                        <h3 className="text-[#9CA3AF] text-[12px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                            <Icon icon="carbon:map" width={16} /> Location
                        </h3>
                        <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl overflow-hidden">
                            <div className="w-full h-40 relative overflow-hidden">
                                {import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ? (
                                    <div ref={mapContainerRef} className="w-full h-full" />
                                ) : (
                                    <div className="w-full h-full bg-[#E5F1E8] flex items-center justify-center">
                                        <Icon icon="carbon:location-filled" width={32} className="text-[#3B82F6]" />
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex gap-3 items-start bg-white">
                                <div className="p-1.5 rounded-full bg-red-50 text-[#E93E2B] shrink-0 mt-0.5">
                                    <Icon icon="mi:location" width={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-[#111827]">{storeData?.address || "123 Organic Lane"}</span>
                                    <span className="text-[12px] text-[#6B7280]">2.4 km away • Toronto Central</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Fixed Footer Buttons */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t border-[#E8E8E8] p-5 shadow-[0px_-4px_24px_rgba(0,0,0,0.04)]">
                    <div className="flex gap-3">
                        <button
                            onClick={() => storeData?.phone && window.open(`tel:${storeData.phone}`)}
                            className="flex-1 bg-[#E93E2B] hover:bg-[#D53523] text-white py-3.5 rounded-xl text-[14px] font-bold transition-colors flex items-center justify-center gap-2 shadow-[0px_4px_12px_rgba(233,62,43,0.3)]"
                        >
                            <Icon icon="fluent:call-16-filled" width={18} /> Call Now
                        </button>
                        <button
                            onClick={() => { onClose(); navigate(`/store/storeslists/${storeData?.id}`); }}
                            className="flex-1 bg-[#E93E2B] hover:bg-[#D53523] text-white py-3.5 rounded-xl text-[14px] font-bold transition-colors flex items-center justify-center gap-2 shadow-[0px_4px_12px_rgba(233,62,43,0.3)]"
                        >
                            Open Website <Icon icon="iconamoon:link-external" width={18} />
                        </button>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }
            `}} />
        </>
    );
};

export default StoreAboutDrawer;
