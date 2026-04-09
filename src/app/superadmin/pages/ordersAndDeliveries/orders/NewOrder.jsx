import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import Input from '../../../components/common/Input';
import ReusableTableSelect from '../../../components/common/ReusableTableSelect';

const NewOrder = () => {
    const breadcrumbItems = [
        { label: "Dashboard", path: "/superadmin/dashboard" },
        { label: "Orders & Deliveries", path: "/superadmin/orders/all" },
        { label: "New Order" }
    ];

    const [formData, setFormData] = useState({
        supplier: '',
        store: '',
        customer: '',
        deliveryType: '',
        priority: '',
        expectedDelivery: '',
        notes: '',
        items: [
            { id: 1, name: 'Micro Dose Caps 30mg', sku: 'NVB-MIC-030 · $15.00/Pack · 45 gm · Min 50 · In Stock: 142', quantity: 3, price: 45.00, icon: 'ph:leaf' },
            { id: 2, name: 'Lion\'s Mane Caps 100ct', sku: 'NVB-LMN-100 · $20.00/Pack · 70 gm · Min 25 · Low Stock: 8 ⚠', quantity: 1, price: 20.00, icon: 'ph:leaf' }
        ]
    });

    const supplierOptions = [
        { value: 'nova', label: 'NovaBio Labs' },
        { value: 'forest', label: 'Forest Oasis' }
    ];

    const storeOptions = [
        { value: 'toronto', label: 'Toronto Main' },
        { value: 'oasis', label: 'Forest Oasis' }
    ];

    const deliveryOptions = [
        { value: 'same-day', label: 'Same day' },
        { value: 'express', label: 'Express' }
    ];

    const priorityOptions = [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
    ];

    const handleQuantityChange = (id, delta) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        }));
    };

    const removeItem = (id) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const subtotal = formData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = 0.00;
    const tax = subtotal * 0.13;
    const total = subtotal + deliveryFee + tax;

    return (
        <div className="space-y-6 animate-in fade-in duration-700 font-manrope">
            {/* Breadcrumbs & Header Section */}
            <div className="flex flex-col gap-2 mb-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="space-y-1">
                    <h1 className="text-lg font-bold text-[#181211]">New Order</h1>
                    <p className="text-[#475569] font-medium text-sm">Add new order with full details</p>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0] shadow-sm">
                <div className="space-y-8">
                    {/* First Row: Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Supplier <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                            <ReusableTableSelect
                                value={formData.supplier}
                                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                options={supplierOptions}
                                placeholder="Select a category..."
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Store <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                            <ReusableTableSelect
                                options={storeOptions}
                                value={formData.store}
                                onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                                placeholder="Select Store"
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-1">
                            <Input
                                label="Customer"
                                required
                                placeholder="Customer name or ID..."
                                value={formData.customer}
                                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                                className="!py-2  placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                                labelClassName="text-sm font-semibold text-[#181211]"
                                borderClass="border-2 border-[#E8E8E8]"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Delivery Type  <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                            <ReusableTableSelect
                                options={deliveryOptions}
                                value={formData.deliveryType}
                                onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                                placeholder="Select Delivery Type"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Order Items Section */}
                    <div className="mb-4">
                        <label className="text-sm font-semibold text-[#181211] mb-1.5">Order Items <span className="text-[#EA3D2A]">*</span></label>
                        <div className="space-y-3">
                            {formData.items.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-2 mt-1 border-2 border-[#E2E8F0] rounded-lg  transition-all">
                                    <div className="w-9 h-9 rounded-sm bg-[#E8E8E8] flex items-center justify-center shrink-0">
                                        🌿
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold leading-tight truncate text-[#181211]">{item.name}</h4>
                                        <p className="text-xs  font-medium  mt-0.5 whitespace-nowrap text-[#475569]">{item.sku}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-between w-[60px] px-3 py-1.5 border border-[#E2E8F0] rounded-md bg-[#F8F8F8]">
                                            <span className="text-[15px] font-medium text-[#181211]">{item.quantity}</span>
                                            <div className="flex flex-col items-center space-y-1">
                                                <button onClick={() => handleQuantityChange(item.id, 1)} className="text-[#181211] hover:opacity-70 transition-all">
                                                    <Icon icon="mdi:triangle" width="10" className="rotate-0" />
                                                </button>
                                                <button onClick={() => handleQuantityChange(item.id, -1)} className="text-[#181211] hover:opacity-70 transition-all">
                                                    <Icon icon="mdi:triangle" width="10" className="rotate-180" />
                                                </button>
                                            </div>
                                        </div>

                                        <span className="w-16 text-right text-sm font-semibold text-[#181211]">${(item.price * item.quantity).toFixed(2)}</span>

                                        <button onClick={() => removeItem(item.id)} className="p-2 text-[#EA3D2A] border border-[#EA3D2A] bg-[#FFEDEB] rounded-md hover:bg-[#EA3D2A] hover:text-white transition-all">
                                            <Icon icon="lucide:x" width="18" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3.5 px-2 flex items-center  p-2 mt-1 border-2 border-[#E2E8F0] rounded-lg  text-sm text-[#475569] gap-2 hover:bg-gray-50 transition-all">
                                <Icon icon="lucide:plus" width="18" />
                                Add Product from Catalog
                            </button>
                        </div>
                    </div>

                    {/* Third Row: Priority & Delivery Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Priority  </label>
                            <ReusableTableSelect
                                options={priorityOptions}
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                placeholder="Select Priority"
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-1">
                            <Input
                                label="Expected Delivery"
                                type="date"
                                value={formData.expectedDelivery}
                                onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                                className="!py-2  placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                                // rightIcon={<Icon icon="lucide:calendar" width="18" />}
                                labelClassName="text-sm font-semibold text-[#181211]"
                                borderClass="border-2 border-[#E8E8E8]"
                            />
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div className="space-y-2 mb-4">
                        <label className="text-sm font-semibold text-[#181211] ">Internal Notes</label>
                        <textarea
                            className="w-full p-4 border border-[#E2E8F0] mt-1.5 rounded-md text-sm text-[#181211] bg-white outline-none focus:border-[#EA3D2A] transition-all min-h-[80px]"
                            placeholder="Special handling, delivery instructions..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    {/* Financial Summary */}
                    <div className="space-y-3">

                        <div className="flex justify-between items-center text-[13px] border-b border-[#E2E8F0] pb-2 font-medium text-[#475569]">
                            <span>Subtotal ({formData.items.length} products)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center text-[13px] border-b border-[#E2E8F0] pb-2 font-medium text-[#475569]">
                            <span>Delivery</span>
                            <span>${deliveryFee.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center text-[13px] border-b border-[#E2E8F0] pb-2 font-medium text-[#475569]">
                            <span>HST (13%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-[#181211]">Estimated Total</span>
                            <span className="text-lg font-semibold text-[#181211]">${total.toFixed(2)}</span>
                        </div>

                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-[#E2E8F0] -mx-6 px-6">

                    <Link
                        to="/superadmin/orders/all"
                        className="w-full py-3 bg-white border border-[#E2E8F0] rounded-lg text-sm font-bold text-[#475569] flex items-center justify-center hover:bg-gray-50 transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33]"
                    >
                        Cancel
                    </Link>
                    <button className="w-full py-3 bg-[#EA3D2A] text-white rounded-lg text-sm font-bold flex items-center justify-center shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all active:scale-[0.99]">
                        Place Order
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NewOrder;
