import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import ReusableSearchInput from '../../../components/orders/../common/ReusableSearchInput';
import ReusableTableSelect from '../../../components/orders/../common/ReusableTableSelect';
import DriverTrackingCard from '../../../components/orders/tracking/DriverTrackingCard';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/react-table";

// Set Mapbox access token
if (typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== 'undefined') {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
}

const TABS = [
    { label: 'All', count: '284' },
    { label: 'Pending', count: '16' },
    { label: 'Preparing', count: '9' },
    { label: 'In Transit', count: '18' },
    { label: 'Delivered', count: '241' },
    { label: 'Cancelled', count: '9' },
    { label: 'Overdue', count: '3' },
];



const LiveTracking = () => {

    const [activeTab, setActiveTab] = useState('All');
    const [deliveryMode, setDeliveryMode] = useState('delivery'); // 'delivery' or 'shipping'
    const [searchQuery, setSearchQuery] = useState('');
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Live Tracking" }
    ];

    // Mock data for Delivery
    const deliveryTableData = [
        { driver: 'Sarah K.', orderId: 'SE-2026-041', customer: 'Customer name', custId: '#SE-C4821', product: 'Micro Dose C...', sku: 'NVB-MIC-030 · 200 Pack', weight: '45 gm', amount: '$77.98', tax: '+$9.36', status: 'Delivered', delivery: 'Express', created: 'Mar 03, 2026 at 10:45:00', eta: 'Delivered At 12:20:00, Mar 03, 2026' },
        { driver: 'James T.', orderId: 'SE-2026-038', customer: 'Customer name', custId: '#SE-C4821', product: 'Micro Dose C...', sku: 'NVB-MIC-015 · 150 Pack', weight: '30 gm', amount: '$62.00', tax: '+$7.44', status: 'Preparing', delivery: 'Same Day', created: 'Mar 03, 2026 at 10:00:00', eta: 'Approximate Arrival 12:30:00, Today' },
        { driver: 'Mark D.', orderId: 'SE-2026-036', customer: 'Customer name', custId: '#SE-C4821', product: 'Adaptogen Bl...', sku: 'NVB-ADT-001 · 80 Pack', weight: '55 gm', amount: '$132.00', tax: '+$15.84', status: 'Pending', delivery: 'Express', created: 'Mar 02, 2026 at 17:00:00', eta: 'Approximate Arrival 11:30:00, Tomorrow' },
        { driver: 'Priya M.', orderId: 'SE-2026-034', customer: 'Customer name', custId: '#SE-C4821', product: 'Wellness Gu...', sku: 'GR-WLN-040 · 120 units', weight: '62 gm', amount: '$24.99', tax: '+$3.00', status: 'In Transit', delivery: 'Express', created: 'Mar 01, 2026 at 11:23:00', eta: 'Approximate Arrival 11:30:00, Tomorrow' },
        { driver: 'Lena W.', orderId: 'SE-2026-033', customer: 'Customer name', custId: '#SE-C4821', product: 'Micro Dose C...', sku: 'NVB-MIC-050 · 100 Pack', weight: '60 gm', amount: '$70.00', tax: '+$8.40', status: 'Delivered', delivery: 'Same Day', created: 'Feb 15, 2026 at 20:30:00', eta: 'Delivered At 21:20:00, Feb 15, 2026' },
        { driver: 'Omar S.', orderId: 'SE-2026-027', customer: 'Customer name', custId: '#SE-C4821', product: 'Tincture Extr...', sku: 'ED-TIN-030 · 60 units', weight: '38 gm', amount: '$120.00', tax: '+$11.52', status: 'Overdue', delivery: 'Same Day', created: 'Feb 26, 2026 at 11:30:00', eta: 'Approximate Arrival 11:30:00, Tomorrow' },
        { driver: 'Kyle B.', orderId: 'SE-2026-025', customer: 'Customer name', custId: '#SE-C4821', product: 'Micro Dose C...', sku: 'NVB-MIC-030 · 180 Pack', weight: '45 gm', amount: '$62.00', tax: '+$7.44', status: 'Delivered', delivery: 'Express', created: 'Jan 14, 2026 at 19:00:00', eta: 'Delivered At 20:20:00, Jan 14, 2026' },
    ];

    // Mock data for Shipping
    const shippingTableData = [
        { driver: 'Dan R.', orderId: 'SE-2026-031', customer: 'Customer name', custId: '#SE-C4821', product: 'Micro Dose C...', sku: 'MP-MIC-015 · 200 Pack', weight: '30 gm', amount: '$55.00', tax: '+$6.60', status: 'Cancelled', delivery: 'Shipping', created: 'Mar 30, 2026 at 13:20:00', eta: '-' },
        { driver: 'Nina C.', orderId: 'SE-2026-030', customer: 'Customer name', custId: '#SE-C4821', product: 'Lion\'s Mane C...', sku: 'NVB-LMN-100 · 50 Pack', weight: '70 gm', amount: '$96.00', tax: '+$11.52', status: 'Delivered', delivery: 'Shipping', created: 'Mar 28, 2026 at 15:34:00', eta: 'Delivered At 11:20:00, Mar 24, 2026' },
        { driver: 'Aisha N.', orderId: 'SE-2026-022', customer: 'Customer name', custId: '#SE-C4821', product: 'Full Spectrum...', sku: 'CL-FSO-060 · 40 units', weight: '42 gm', amount: '$70.00', tax: '+$8.40', status: 'In Transit', delivery: 'Shipping', created: 'Mar 20, 2026 at 12:45:00', eta: 'Approximate Arrival 11:30:00, Tomorrow' },
    ];

    const currentTableData = useMemo(() => {
        return deliveryMode === 'delivery' ? deliveryTableData : shippingTableData;
    }, [deliveryMode]);

    const columns = useMemo(() => [
        {
            header: 'DRIVER',
            accessorKey: 'driver',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#181211] leading-tight">{row.original.driver}</span>
                    <span className="text-xs font-medium underline text-[#475569] mt-0.5">#SE-D4821</span>
                </div>
            )
        },
        {
            header: 'ORDER ID',
            accessorKey: 'orderId',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#EA3D2A] cursor-pointer hover:underline">{row.original.orderId}</span>
                    <span className="text-sm font-semibold text-[#181211] leading-tight mt-0.5">{row.original.customer}</span>
                    <span className="text-xs font-medium  text-[#475569] underline cursor-pointer mt-0.5">{row.original.custId}</span>
                </div>
            )
        },
        {
            header: 'PRODUCT',
            accessorKey: 'product',
            cell: ({ row }) => (
                <div className="flex flex-col max-w-[150px]">
                    <h4 className="text-sm font-semibold text-[#181211] leading-tight break-words">{row.original.product}</h4>
                    <span className="text-xs font-medium  text-[#475569] underline mt-0.5 break-words uppercase">{row.original.sku}</span>
                </div>
            )
        },
        { header: 'WEIGHT', accessorKey: 'weight', cell: ({ row }) => <span className="text-sm font-medium text-[#181211]">{row.original.weight}</span> },
        {
            header: 'AMOUNT',
            accessorKey: 'amount',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#181211] leading-tight">{row.original.amount}</span>
                    <span className="text-xs font-semibold text-[#9AA4B2] mt-0.5">{row.original.tax}</span>
                </div>
            )
        },
        {
            header: 'STATUS',
            accessorKey: 'status',
            cell: ({ row }) => {
                const statusStyles = {
                    'Delivered': 'text-[#219653] bg-[#CDFFE2]',
                    'In Transit': 'text-[#475569] bg-[#F1F5F9]',
                    'Preparing': 'text-[#0066FF] bg-[#DAE9FF]',
                    'Pending': 'text-[#D26D0A] bg-[#FFF7E8]',
                    'Overdue': 'text-[#475569] bg-[#E2E8F0]',
                    'Cancelled': 'text-[#EA3D2A] bg-[#FFEDEB]'
                };
                return (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyles[row.original.status] || 'bg-gray-100 text-gray-600'}`}>
                        {row.original.status}
                    </span>
                );
            }
        },
        {
            header: 'DELIVERY',
            accessorKey: 'delivery',
            cell: ({ row }) => {
                const deliveryStyles = {
                    'Express': 'text-[#EA3D2A]',
                    'Same Day': 'text-[#219653]',
                    'Shipping': 'text-[#0066FF]'
                };
                return <span className={`text-sm font-semibold ${deliveryStyles[row.original.delivery]}`}>{row.original.delivery}</span>;
            }
        },
        {
            header: 'CREATED',
            accessorKey: 'created',
            cell: ({ row }) => {
                const parts = row.original.created.split(' at ');
                return (
                    <div className="flex flex-col text-[#181211] text-[13px] font-medium leading-tight min-w-[100px]">
                        <span>{parts[0]}</span>
                        <span>at {parts[1]}</span>
                    </div>
                );
            }
        },
        {
            header: 'ETA',
            accessorKey: 'eta',
            cell: ({ row }) => {
                const isDelivered = row.original.eta.includes('Delivered At');
                return (
                    <div className="flex flex-col min-w-[140px] leading-tight">
                        <span className="text-[13px] font-medium text-[#181211] mb-0.5">{isDelivered ? 'Delivered At' : 'Approximate Arrival'}</span>
                        <span className="text-[13px] font-medium text-[#181211]">{row.original.eta.replace('Delivered At ', '').replace('Approximate Arrival ', '')}</span>
                    </div>
                );
            }
        },
        {
            header: 'ACTIONS',
            cell: () => (
                <div className="flex justify-center">
                    <button className="text-[#0066FF] hover:opacity-80 transition-opacity p-1">
                        <Icon icon="lucide:eye" width="18" />
                    </button>
                </div>
            )
        }
    ], []);

    const table = useReactTable({
        data: currentTableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: { pageIndex: 0, pageSize: 8 }
        },
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-79.3832, 43.6532],
            zoom: 12,
            attributionControl: false
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl({
            showCompass: false,
            showZoom: true
        }), 'bottom-right');

        // Add custom controls (locate button)
        const locateBtn = document.createElement('button');
        locateBtn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-geolocate';
        locateBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066FF" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>';
        locateBtn.style.background = 'white';
        locateBtn.style.border = 'none';
        locateBtn.style.padding = '5px';
        locateBtn.style.marginTop = '4px';
        locateBtn.style.boxShadow = '0 0 0 2px rgba(0,0,0,.1)';
        locateBtn.style.borderRadius = '4px';
        locateBtn.onclick = () => { /* center logic */ };

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <div className="animate-in fade-in duration-700 font-manrope pb-10 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Breadcrumbs items={breadcrumbItems} />
                    <h1 className="text-xl font-bold text-[#181211]">Live Tracking</h1>
                    <p className="text-sm font-medium text-[#475569]">Track all orders delivery status.</p>
                </div>

                {/* Delivery/Shipping Toggle */}
                <div className="flex items-center bg-white border border-[#D1D5DB] rounded-full p-0.5 shadow-sm shrink-0">
                    <button
                        onClick={() => setDeliveryMode('delivery')}
                        className={`flex items-center gap-1.5 xl:gap-2 px-6 py-2 rounded-full text-[14px] xl:text-[15px] font-bold transition-all cursor-pointer ${deliveryMode === 'delivery'
                            ? 'bg-[#EA3D2A] text-white shadow-md'
                            : 'text-[#222222] hover:bg-gray-50'
                            }`}
                    >
                        <Icon icon="hugeicons:truck-delivery" width={22} height={22} className="xl:w-6 xl:h-6" />
                        <span>Delivery</span>
                    </button>
                    <button
                        onClick={() => setDeliveryMode('shipping')}
                        className={`flex items-center gap-1.5 xl:gap-2 px-6 py-2 cursor-pointer rounded-full text-[14px] xl:text-[15px] font-bold transition-all ${deliveryMode === 'shipping'
                            ? 'bg-[#EA3D2A] text-white shadow-md'
                            : 'text-[#222222] hover:bg-gray-50'
                            }`}
                    >
                        <Icon icon="stash:pin-place-duotone" width={23} height={23} className="xl:w-[25px] xl:h-[25px]" />
                        <span>Shipping</span>
                    </button>
                </div>
            </div>

            {/* Map Section - Only show in Delivery Mode */}
            {deliveryMode === 'delivery' && (
                <div className="relative w-full h-[600px] bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
                    <div ref={mapContainerRef} className="w-full h-full" />

                    {/* Map Overlays - Top Toolbar */}
                    <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-start justify-between gap-3 pointer-events-none">
                        {/* Status Snapshot Toggles */}
                        <div className="flex items-center justify-between gap-4 pointer-events-auto overflow-x-auto hide-scrollbar sm:max-w-full max-w-full">
                            {[
                                { label: `${deliveryMode === 'delivery' ? 'Delivery' : 'Shipping'} Pending`, count: '9,999', color: '#0066FF' },
                                { label: `${deliveryMode === 'delivery' ? 'Delivery' : 'Shipping'} In-progress`, count: '9,999', color: '#FF9500' },
                                { label: 'Delivered', count: '9,999', color: '#219653' },
                                { label: `${deliveryMode === 'delivery' ? 'Delivery' : 'Shipping'} Cancelled`, count: '9,999', color: '#EA3D2A' },
                            ].map((filter, i) => (
                                <button key={i} className="flex items-center justify-between gap-6 px-3 py-2 bg-white rounded-lg  border border-[#E2E8F0] min-w-[285px] h-12">
                                    <span className="text-sm font-semibold" style={{ color: filter.color }}>{filter.label}</span>
                                    <span className="text-xl font-extrabold text-[#181211]">{filter.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Driver Cards Overlaid on Map (Matches Admin logic) */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="relative w-full h-full">
                            {/* Card 1: In-progress */}
                            <div className="absolute top-[37%] left-[3%] pointer-events-auto">
                                <DriverTrackingCard
                                    driverName="Olivia Smith"
                                    status="In-progress"
                                    isOnline={true}
                                    eta="20 Jan 2025 at 11:00pm"
                                    address="123 Main Street, Toronto, ON M5J 2N8"
                                    totalOrders={19}
                                    breakdown={{ pending: 10, inProgress: 4, delivered: 2, cancelled: 3 }}
                                />
                            </div>
                            {/* Card 2: Pending (Offline) */}
                            <div className="absolute top-[29%] left-[30%] pointer-events-auto">
                                <DriverTrackingCard
                                    driverName="Olivia Smith"
                                    status="Pending"
                                    isOnline={false}
                                    eta="20 Jan 2025 at 11:00pm"
                                    address="123 Main Street, Toronto, ON M5J 2N8"
                                    totalOrders={19}
                                    breakdown={{ pending: 10, inProgress: 4, delivered: 2, cancelled: 3 }}
                                />
                            </div>
                            {/* Card 3: Delivered */}
                            <div className="absolute top-[15%] right-[18%] pointer-events-auto">
                                <DriverTrackingCard
                                    driverName="Olivia Smith"
                                    status="Delivered"
                                    isOnline={true}
                                    eta="20 Jan 2025 at 11:00pm"
                                    address="123 Main Street, Toronto, ON M5J 2N8"
                                    totalOrders={19}
                                    breakdown={{ pending: 10, inProgress: 4, delivered: 2, cancelled: 3 }}
                                />
                            </div>
                            {/* Card 4: Cancelled */}
                            <div className="absolute bottom-[15%] right-[6%] pointer-events-auto">
                                <DriverTrackingCard
                                    driverName="Olivia Smith"
                                    status="Cancelled"
                                    isOnline={true}
                                    eta="20 Jan 2025 at 11:00pm"
                                    address="123 Main Street, Toronto, ON M5J 2N8"
                                    totalOrders={19}
                                    breakdown={{ pending: 10, inProgress: 4, delivered: 2, cancelled: 3 }}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Left Bottom Tools (Matches Reference Image) */}
                    <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-3 pointer-events-none">
                        {/* Online/Offline Toggles */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 bg-white rounded-2xl border border-[#E2E8F0] shadow-md flex items-center justify-center shrink-0 pointer-events-auto hover:bg-gray-50">
                                    <span className="w-8 h-8 rounded-full bg-[#CDFFE2] flex items-center justify-center">
                                        <Icon icon="mdi:radar" width="18" className="text-gray-900" />
                                    </span>
                                </button>
                                <div className="bg-white px-4 py-2 rounded-xl border border-[#E2E8F0] shadow-md pointer-events-auto flex items-baseline gap-3">
                                    <span className="text-xs font-bold text-[#181211]">Online Drivers</span>
                                    <span className="text-sm font-extrabold text-[#181211]">925</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 bg-white rounded-2xl border border-[#E2E8F0] shadow-md flex items-center justify-center shrink-0 pointer-events-auto hover:bg-gray-50 opacity-60">
                                    <span className="w-8 h-8 rounded-full bg-[#FFEDEB] flex items-center justify-center">
                                        <Icon icon="mdi:radar" width="18" className="text-gray-900" />
                                    </span>
                                </button>
                                <div className="bg-white px-4 py-2 rounded-xl border border-[#E2E8F0] shadow-md pointer-events-auto flex items-baseline gap-3 opacity-60">
                                    <span className="text-xs font-bold text-[#181211]">Offline Drivers</span>
                                    <span className="text-sm font-extrabold text-[#181211]">40</span>
                                </div>
                            </div>
                        </div>

                        {/* Layers Button */}
                        <button className="relative w-10 h-10 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md shrink-0 pointer-events-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#065F46] via-[#22C55E]/40 to-[#B45309]"></div>
                            <div className="absolute left-2 bottom-1.5 flex items-center gap-1 text-white">
                                <Icon icon="mdi:layers-outline" width="14" />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">Layers</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}


            {/* Table Section */}
            <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
                {/* Search & Tabs Row */}
                <div className="flex flex-wrap items-center justify-between p-4.5 gap-1 bg-white border-b border-[#F1F5F9]">
                    <div className="flex-1 min-w-[300px] flex items-center justify-between gap-3 flex-wrap">
                        <ReusableSearchInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search order ID, product, customer..."
                            className="w-full sm:w-96"
                        />
                        <div className="flex items-center gap-3">
                            <ReusableTableSelect
                                options={[{ value: 'newest', label: 'Newest First' }]}
                                value="newest"
                                onChange={() => { }}
                                className="w-40"
                            />
                            <div className="flex items-center border-2 border-[#E8E8E8] rounded-md overflow-hidden shrink-0">
                                <button className="p-2 bg-[#EA3D2A] text-white">
                                    <Icon icon="lucide:list" width="20" />
                                </button>
                                <button className="p-2 text-[#181211] hover:bg-gray-50">
                                    <Icon icon="lucide:layout-grid" width="20" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 py-4 flex items-center justify-between border-b border-[#F1F5F9] bg-white">
                    <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
                        {TABS.map((tab, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(tab.label)}
                                className={`flex items-center gap-2 pb-2 transition-all relative whitespace-nowrap ${activeTab === tab.label ? 'text-[#EA3D2A] font-bold' : 'text-[#181211] font-semibold'}`}
                            >
                                <span>{tab.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTab === tab.label ? 'bg-[#FFEDEB] text-[#EA3D2A]' : 'bg-[#F1F5F9] text-[#475569]'}`}>
                                    {tab.count}
                                </span>
                                {activeTab === tab.label && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EA3D2A] rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] border-b border-[#F1F5F9]">
                    <p className="text-[13px] font-medium text-[#475569]">
                        Showing <span className="font-bold text-[#181211]">{currentTableData.length}</span> of <span className="font-bold text-[#181211]">284 orders</span>
                    </p>
                </div>

                {/* Main Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] text-[#64748B] text-[12px] font-bold uppercase border-b border-[#F1F5F9]">
                                {table.getHeaderGroups()[0].headers.map(header => (
                                    <th key={header.id} className="py-3.5 px-3 first:pl-5 last:pr-5">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F1F5F9]">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="py-3 px-3 first:pl-5 last:pr-5">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-3 gap-4 border-t border-[#F1F5F9] bg-white">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
                        >
                            <Icon icon="lucide:chevron-left" width="18" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
                            .filter((p) => {
                                const current = table.getState().pagination.pageIndex + 1;
                                const count = table.getPageCount();
                                return (
                                    p === 1 ||
                                    p === count ||
                                    (p >= current - 1 && p <= current + 1)
                                );
                            })
                            .map((pageNum, idx, arr) => {
                                const current = table.getState().pagination.pageIndex + 1;
                                return (
                                    <React.Fragment key={pageNum}>
                                        {idx > 0 && arr[idx - 1] !== pageNum - 1 && (
                                            <span className="px-1 text-[#94A3B8]">...</span>
                                        )}
                                        <button
                                            onClick={() => table.setPageIndex(pageNum - 1)}
                                            className={`w-9 h-9 flex items-center justify-center rounded-sm font-medium text-sm transition-all active:scale-90 ${current === pageNum
                                                ? "bg-[#EA3D2A] text-white"
                                                : "text-[#181211] hover:bg-gray-50"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    </React.Fragment>
                                );
                            })}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="flex items-center gap-2 px-4 py-2 border border-[#E8E8E8] rounded-md text-sm font-semibold text-[#181211] hover:bg-gray-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <Icon icon="lucide:chevron-right" width="18" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Driver Map Info Window Component
const DriverMapInfo = ({ name, status, isOnline, eta, address, breakdown }) => {
    const statusColor = status === 'In-progress' ? '#FF9500' : status === 'Pending' ? '#0066FF' : '#EA3D2A';

    return (
        <div className="bg-white rounded-lg shadow-xl border border-[#E2E8F0] w-[280px] p-4 pointer-events-auto space-y-3 relative group animate-in zoom-in-95 duration-200">
            {/* Pointer */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-[#E2E8F0]"></div>

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <img src="https://ui-avatars.com/api/?name=Olivia+Smith&background=E3EEFF&color=0066FF" alt="Driver" className="w-10 h-10 rounded-full" />
                        <div className={`absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-[#219653]' : 'bg-[#EA3D2A]'}`}></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isOnline ? 'bg-[#CDFFE2] text-[#219653]' : 'bg-[#FFEDEB] text-[#EA3D2A]'}`}>
                                {isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#181211]">{name}</h4>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded text-[#0066FF] transition-colors"><Icon icon="solar:share-bold" width="16" /></button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"><Icon icon="material-symbols:close" width="16" /></button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#94A3B8]">ETA: {eta}</span>
                    <span style={{ color: statusColor }}>{status}</span>
                </div>
                <p className="text-[11px] font-medium text-[#181211] leading-relaxed line-clamp-1">{address}</p>
            </div>

            <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#181211] flex items-center gap-1">
                        <Icon icon="solar:box-delivery-linear" width="14" />
                        Total Orders ({Object.values(breakdown).reduce((a, b) => a + b, 0)})
                    </span>
                </div>
                {/* Status Bar */}
                <div className="h-1.5 w-full flex rounded-full overflow-hidden">
                    <div className="bg-[#0066FF]" style={{ width: '40%' }}></div>
                    <div className="bg-[#FF9500]" style={{ width: '15%' }}></div>
                    <div className="bg-[#219653]" style={{ width: '30%' }}></div>
                    <div className="bg-[#EA3D2A]" style={{ width: '15%' }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></div><span className="text-[#94A3B8]">Pending</span></div>
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#FF9500]"></div><span className="text-[#94A3B8]">In-Progress</span></div>
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#219653]"></div><span className="text-[#94A3B8]">Delivered</span></div>
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#EA3D2A]"></div><span className="text-[#94A3B8]">Canceled</span></div>
                </div>
            </div>
        </div>
    );
};

export default LiveTracking;
