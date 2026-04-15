import React from 'react';
import { Field, TextAreaField, SelectField } from './TabUIAtoms';

const StoreDetailsContent = ({ store }) => {
    if (!store) return null;
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Basic Information Section */}
            <h2 className="text-lg font-semibold text-[#475569] mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                <Field label="Store Name" value={store.name || 'N/A'} required />
                <Field label="Owner Full Name" value={store.ownerName || 'N/A'} required />
                <Field label="Email Address" value={store.email || 'N/A'} required />
                <Field label="Phone Number" value={store.phone || 'N/A'} required />
                <Field label="Website" value={store.website || 'N/A'} required />
                <Field label="Category" value={store.category || 'N/A'} required />
                <div className="md:col-span-2">
                    <TextAreaField
                        label="Store Description"
                        value={store.description || 'No description provided.'}
                        required
                    />
                </div>
            </div>

            {/* Address Section */}
            <h2 className="text-lg font-semibold text-[#475569] mb-4">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                <Field label="Street Address" value={store.address || 'N/A'} required />
                <Field label="City" value={store.city || 'N/A'} required />
                <Field label="Province / State" value={store.province || 'N/A'} required />
                <Field label="Postal Code" value={store.postalCode || 'N/A'} required />
                <Field label="Country" value={store.country || 'N/A'} required />
            </div>

            {/* Tags & Product Types */}
            <h2 className="text-lg font-semibold text-[#475569] mb-2">Product Types</h2>
            <div className="flex flex-wrap gap-2 mb-4.5">
                {(store.productTypes || []).map((type) => (
                    <span key={type} className="px-6 py-2 rounded-full border border-[#EA3D2A] text-[#EA3D2A] text-sm font-semibold bg-[#FFEDEB] transition-all cursor-default">
                        {type}
                    </span>
                ))}
            </div>
            <h2 className="text-lg font-semibold text-[#475569] mb-2">Store Tags</h2>
            <div className="flex flex-wrap gap-2 mb-2">
                {(store.storeTags || []).map((tag) => (
                    <span key={tag} className="px-6 py-2 rounded-full border border-[#EA3D2A] text-[#EA3D2A] text-sm font-semibold bg-[#FFEDEB] transition-all cursor-default">
                        {tag}
                    </span>
                ))}
            </div>

            {/* License */}
            <div className="space-y-4 pt-2">
                <Field label="Compliant License Number" value={store.licenseNumber || 'N/A'} required />
            </div>
        </div>
    );
};

export default StoreDetailsContent;
