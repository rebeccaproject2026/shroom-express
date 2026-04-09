import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../../components/common/Input';
import ReusableTableSelect from '../../../../../components/common/ReusableTableSelect';

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

const Step3Commercial = ({ formData, setFormData }) => {
    const paymentTermsOptions = [
        { value: 'Net 15', label: 'Net 15' },
        { value: 'Net 30', label: 'Net 30' },
        { value: 'Net 45', label: 'Net 45' },
        { value: 'Due on Receipt', label: 'Due on Receipt' },
    ];

    return (
        <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[820px]">
            {/* Header */}
            <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF1F0] rounded-sm flex items-center justify-center shrink-0">
                        <Icon icon="fluent-mdl2:product" className="text-[#EA3D2A]" width="22" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-[#181211]">Commercial Terms</h3>
                    </div>
                </div>
                <span className="text-xs font-bold text-[#181211]">STEP 3 OF 4</span>
            </div>

            <div className="p-5 space-y-6">
                {/* Payment Terms & Lead Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Payment Terms <span className="text-[#EA3D2A] ml-0.5">*</span></label>
                        <ReusableTableSelect
                            value={formData.paymentTerms}
                            onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                            options={paymentTermsOptions}
                            placeholder="Select Terms"
                            borderclass="border border-[#BDBDD2]"
                            className="w-full text-[#475569] font-medium"
                        />
                    </div>
                    <Input
                        label="Lead Time (days)"
                        required
                        placeholder="24"
                        value={formData.leadTime}
                        onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                        className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                </div>

                {/* Min Order & Reorder Buffer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Minimum Order ($)"
                        required
                        placeholder="32"
                        leftIcon={<span className="text-gray-400 font-bold">$</span>}
                        value={formData.minOrder}
                        onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                        className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium pl-8"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                        containerClassName="relative"
                    />
                    <Input
                        label="Reorder Buffer (days)"
                        placeholder="3"
                        value={formData.reorderBuffer}
                        onChange={(e) => setFormData({ ...formData, reorderBuffer: e.target.value })}
                        className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                        labelClassName="text-sm font-semibold text-[#181211]"
                        borderClass="border border-[#BDBDD2]"
                    />
                </div>

                {/* Tax ID */}
                <Input
                    label="Tax ID / HST Number"
                    placeholder="e.g. HST 123456789 RT0001"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                    labelClassName="text-sm font-semibold text-[#181211]"
                    borderClass="border border-[#BDBDD2]"
                />

                {/* Supplier Settings */}
                <div className="space-y-3 pt-4 border-t border-[#BDBDD2]">
                    <label className="text-sm font-semibold text-[#181211] block mb-1">
                        Supplier Settings <span className="text-[#EA3D2A] ml-0.5">*</span>
                    </label>

                    <div className="space-y-3">
                        {[
                            { id: 'requireCOA', label: 'Require COA with every shipment', sub: 'Certificate of Analysis mandatory for all orders' },
                            { id: 'preferredSupplier', label: 'Mark as Preferred Supplier', sub: 'Appears first in restock recommendations' },
                            { id: 'autoReorder', label: 'Enable Auto-Reorder', sub: 'System automatically places orders when stock is low' }
                        ].map((setting) => (
                            <div key={setting.id} className="p-4 border border-[#BDBDD2] rounded-lg flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-semibold text-[#181211]">{setting.label}</h4>
                                    <p className="text-xs font-medium text-[#475569]">{setting.sub}</p>
                                </div>
                                <Toggle
                                    enabled={formData[setting.id]}
                                    onChange={() => setFormData({ ...formData, [setting.id]: !formData[setting.id] })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admin Notes */}
                <div className="space-y-1.5 pt-2">
                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">Admin Notes</label>
                    <div className="relative">
                        <textarea
                            rows="4"
                            placeholder="e.g. COA required for all batches, bulk discount available for orders over $5,000. Contact Marcus directly for expedited shipping..."
                            className="w-full px-4 py-3 bg-white border border-[#BDBDD2] rounded-sm text-sm font-medium text-[#181211] outline-none transition-all font-medium resize placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                            value={formData.adminNotes}
                            onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value.slice(0, 500) })}
                        ></textarea>
                    </div>
                    <div className="flex justify-end text-xs font-medium text-[#475569] tracking-wider">
                        {formData.adminNotes?.length || 0}/500
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3Commercial;
