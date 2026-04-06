import React from 'react';
import { Field, TextAreaField, SelectField } from './TabUIAtoms';

const StoreDetailsContent = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Basic Information Section */}
            <h2 className="text-lg font-semibold text-[#475569] mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                <Field label="Store Name" value="Forest Oasis" required />
                <Field label="Owner Full Name" value="Jhon Doe" required />
                <Field label="Email Address" value="forestoasis@email.com" required />
                <Field label="Phone Number" value="+1 (461) 000-0000" required />
                <Field label="Website" value="http://store.com" required />
                <Field label="Category" value="Micro dosing" required />
                <div className="md:col-span-2">
                    <TextAreaField
                        label="Store Description"
                        value="Forest Oasis is a premium micro-dosing dispensary offering lab-tested, organic mushroom products for wellness and beginners. We specialize in carefully crafted micro-dose capsules and full-spectrum tinctures."
                        required
                    />
                </div>
            </div>

            {/* Address Section */}
            <h2 className="text-lg font-semibold text-[#475569] mb-4">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                <Field label="Street Address" value="123 Main Street, Unit 4" required />
                <div className="md:grid-cols-1">
                    <Field label="City" value="Toronto" required />
                </div>
                <SelectField label="Province / State" value="Select..." required />
                <Field label="Postal Code" value="M5V 2T6" required />
                <Field label="Country" value="Canada" required />
            </div>

            {/* Tags & Product Types */}
            <h2 className="text-lg font-semibold text-[#475569] mb-2">Product Types</h2>
            <div className="flex flex-wrap gap-2 mb-4.5">
                {['Micro dosing', 'Full Spectrum', 'Wellness', 'Edibles'].map((type) => (
                    <span key={type} className="px-6 py-2 rounded-full border border-[#EA3D2A] text-[#EA3D2A] text-sm font-semibold bg-[#FFEDEB] transition-all cursor-default">
                        {type}
                    </span>
                ))}
            </div>
            <h2 className="text-lg font-semibold text-[#475569] mb-2">Store Tags</h2>
            <div className="flex flex-wrap gap-2 mb-2">
                {['Premium', 'Lab Tested', 'Fast Delivery', 'Loyalty Rewards'].map((tag) => (
                    <span key={tag} className="px-6 py-2 rounded-full border border-[#EA3D2A] text-[#EA3D2A] text-sm font-semibold bg-[#FFEDEB] transition-all cursor-default">
                        {tag}
                    </span>
                ))}
            </div>

            {/* License */}
            <div className="space-y-4 pt-2">
                <Field label="Compliant License Number" value="LIC-2026-ON-00123" required />
            </div>
        </div>
    );
};

export default StoreDetailsContent;
