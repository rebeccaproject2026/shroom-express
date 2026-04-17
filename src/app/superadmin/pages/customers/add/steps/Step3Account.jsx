import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../components/common/Input';
import ReusableTableSelect from '../../../../components/common/ReusableTableSelect';

const Toggle = ({ enabled, onChange }) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);

const Step3Account = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (name) => {
        setFormData(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const storeOptions = [
        { value: 'Forest Oasis', label: 'Forest Oasis' },
        { value: 'Urban Jungle', label: 'Urban Jungle' },
    ];

    const productOptions = [
        { value: 'Micro Dose Caps 30mg', label: 'Micro Dose Caps 30mg' },
        { value: 'Magic Mushroom Tea', label: 'Magic Mushroom Tea' },
    ];

    const notificationOptions = [
        {
            id: 'sendWelcomeEmail',
            label: 'Send Welcome Email',
            sublabel: 'Send an onboarding email immediately on save'
        },
        {
            id: 'enableSMSUpdates',
            label: 'Enable SMS Order Updates',
            sublabel: 'Text notifications for order status changes'
        },
        {
            id: 'marketingEmails',
            label: 'Marketing Emails',
            sublabel: 'Promotions, newsletters, and product updates'
        }
    ];

    return (
        <div className="bg-white rounded-md border border-[#BDBDD2] shadow-sm overflow-hidden font-manrope min-h-[820px]">
            {/* Header */}
            <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#FFEDEB] flex items-center justify-center shrink-0">
                        <Icon icon="solar:settings-outline" className="text-[#EA3D2A]" width="22" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-[#181211]">Account Settings</h3>
                    </div>
                </div>
                <span className="text-xs font-bold text-[#181211]">Step 3 of 3</span>
            </div>

            <div className="p-5 space-y-6">
                {/* Store and Product Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Preferred Store</label>
                        <ReusableTableSelect
                            value={formData.preferredStore}
                            onChange={(e) => setFormData({ ...formData, preferredStore: e.target.value })}
                            options={storeOptions}
                            placeholder="Select Store"
                            borderclass="border border-[#BDBDD2]"
                            className="w-full text-[#475569] font-medium"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Preferred Product</label>
                        <ReusableTableSelect
                            value={formData.preferredProduct}
                            onChange={(e) => setFormData({ ...formData, preferredProduct: e.target.value })}
                            options={productOptions}
                            placeholder="Select Product"
                            borderclass="border border-[#BDBDD2]"
                            className="w-full text-[#475569] font-medium"
                        />
                    </div>
                </div>

                {/* Promo Code */}
                <Input
                    label="Apply Promo Code"
                    name="promoCode"
                    value={formData.promoCode || ''}
                    onChange={handleChange}
                    placeholder="e.g. WELCOME20"
                    className="!py-2.5 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                />

                {/* Notification Preferences */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-[#181211] block mb-1">
                        Notification Preferences <span className="text-[#EA3D2A] ml-0.5">*</span>
                    </label>

                    <div className="space-y-3">
                        {notificationOptions.map((option) => (
                            <div key={option.id} className="p-3 border border-[#BDBDD2] rounded-lg flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-semibold text-[#181211]">{option.label}</h4>
                                    <p className="text-xs font-medium text-[#475569]">{option.sublabel}</p>
                                </div>
                                <Toggle
                                    enabled={formData[option.id]}
                                    onChange={() => handleToggle(option.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Internal Notes */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-[#181211]">Internal Notes</label>
                    <div className="relative mt-1">
                        <textarea
                            name="internalNotes"
                            value={formData.internalNotes || ''}
                            onChange={handleChange}
                            maxLength={500}
                            placeholder="e.g. Referred by Felix Drummond Prefers morning deliveries. Birthday promo eligible Apr 20..."
                            className="w-full h-32 px-4 py-3 bg-white border border-[#BDBDD2] rounded-sm text-sm font-medium text-[#181211] outline-none resize-none placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        />
                        <div className="absolute bottom-3 right-4 text-[11px] font-bold text-[#BABABA]">
                            {(formData.internalNotes || '').length}/500
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3Account;

