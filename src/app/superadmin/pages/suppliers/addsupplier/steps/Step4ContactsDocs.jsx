import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../../components/common/Input';

const ContactCard = ({ index, isPrimary, contact, updateContact, removeContact }) => (
    <div className={`p-4 border rounded-md relative transition-all ${isPrimary ? 'border-[#EA3D2A] bg-[#FFEDEB]' : 'border-[#E2E8F0] bg-[#F8F8F8]'}`}>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] shadow-sm transition-colors ${isPrimary ? 'bg-[#EA3D2A] text-white' : 'bg-[#E2E8F0] text-[#475569]'
                    }`}>
                    {index + 1}
                </div>
                <h4 className={`text-sm font-semibold ${isPrimary ? 'text-[#181211]' : 'text-[#475569]'}`}>Contact {index + 1}</h4>
                {isPrimary && (
                    <span className="px-2 py-0.5 bg-[#EA3D2A] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Required</span>
                )}
            </div>
            {!isPrimary && (
                <button
                    onClick={removeContact}
                    className="text-[#EA3D2A]"
                >
                    <Icon icon="fluent:delete-24-regular" width="18" />
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <Input
                label="Full Name"
                required={isPrimary}
                placeholder="User name"
                value={contact.name}
                onChange={(e) => updateContact('name', e.target.value)}
                className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
            />
            <Input
                label="Job Title / Role"
                placeholder="Accountant"
                value={contact.role}
                onChange={(e) => updateContact('role', e.target.value)}
                className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
            />
            <Input
                label="Email"
                required={isPrimary}
                placeholder="32"
                value={contact.email}
                onChange={(e) => updateContact('email', e.target.value)}
                className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
            />
            <Input
                label="Phone"
                placeholder="(000) 000-0000"
                value={contact.phone}
                onChange={(e) => updateContact('phone', e.target.value)}
                className="!py-2 placeholder:text-[14px] placeholder:text-[#475569] placeholder:font-medium"
                labelClassName="text-sm font-semibold text-[#181211]"
                borderClass="border border-[#BDBDD2]"
            />
        </div>
    </div>
);

const DocItem = ({ id, label, sub, file, onFileChange, onRemove }) => (
    <div className={`flex items-center justify-between p-4 border rounded-md transition-all ${file ? 'bg-[#E0FFED] border-[#CDFFE2]' : 'bg-white border-[#BDBDD2] border-dashed'}`}>
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${file ? 'bg-[#CDFFE2]' : 'bg-[#E8F1FF]'}`}>
                <Icon icon={file ? "solar:check-read-linear" : "solar:file-text-linear"} className={file ? "text-[#219653]" : "text-[#475569]"} width="22" />
            </div>
            <div>
                <p className={`text-sm font-bold ${file ? 'text-[#219653]' : 'text-[#181211]'}`}>{label}</p>
                <p className="text-xs font-medium text-[#64748B]">{file ? 'Uploaded - click to remove' : sub}</p>
            </div>
        </div>
        <input
            type="file"
            id={`file-input-${id}`}
            className="hidden"
            onChange={(e) => onFileChange(e.target.files[0])}
        />
        <button
            onClick={() => {
                if (file) onRemove();
                else document.getElementById(`file-input-${id}`).click();
            }}
            className={`px-6 py-1.5 rounded-md text-sm font-bold transition-all flex items-center justify-center ${file
                ? 'bg-white border border-[#EA3D2A] text-[#EA3D2A] hover:bg-[#FFEDEB] !px-3'
                : 'bg-white border border-[#BDBDD2] text-[#475569] hover:bg-gray-50'
                }`}
        >
            {file ? <Icon icon="solar:trash-bin-trash-bold" width="18" /> : 'Browse'}
        </button>
    </div>
);

const Step4ContactsDocs = ({ formData, setFormData }) => {
    const addContact = () => {
        setFormData({
            ...formData,
            contacts: [...formData.contacts, { name: '', role: '', email: '', phone: '' }]
        });
    };

    const updateContact = (index, field, value) => {
        const newContacts = [...formData.contacts];
        newContacts[index][field] = value;
        setFormData({ ...formData, contacts: newContacts });
    };

    const removeContact = (index) => {
        setFormData({
            ...formData,
            contacts: formData.contacts.filter((_, i) => i !== index)
        });
    };

    const handleFileChange = (field, file) => {
        if (file) {
            setFormData({ ...formData, [field]: file });
        }
    };

    const removeFile = (field) => {
        setFormData({ ...formData, [field]: null });
    };

    return (
        <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[820px]">
            {/* Header */}
            <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF1F0] rounded-sm flex items-center justify-center shrink-0">
                        <Icon icon="fluent-mdl2:product" className="text-[#EA3D2A]" width="22" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-[#181211]">Contacts & Docs</h3>
                    </div>
                </div>
                <span className="text-xs font-bold text-[#181211]">STEP 4 OF 4</span>
            </div>

            <div className="p-5 space-y-6">
                {/* Contacts Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-[#181211]">Primary Contact <span className="text-[#EA3D2A]">*</span></label>
                        <button
                            onClick={addContact}
                            className="text-[13px] font-bold text-[#EA3D2A] flex items-center gap-1 hover:underline"
                        >
                            <Icon icon="lucide:plus" width="14" />
                            Add Contact
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.contacts.map((contact, idx) => (
                            <ContactCard
                                key={idx}
                                index={idx}
                                isPrimary={idx === 0}
                                contact={contact}
                                updateContact={(field, val) => updateContact(idx, field, val)}
                                removeContact={() => removeContact(idx)}
                            />
                        ))}
                    </div>
                </div>

                {/* Compliance Documents */}
                <div className="space-y-4 pt-4 border-t border-[#BDBDD2]">
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-[#181211]">Compliance Documents <span className="text-[#EA3D2A]">*</span></label>
                        <p className="text-xs font-medium text-[#64748B]">Upload required documents to speed up the verification process. Click any document to mark it as uploaded.</p>
                    </div>

                    <div className="space-y-3">
                        <DocItem
                            id="license"
                            label="Business License / Registration"
                            sub="PDF or Image, required for all suppliers"
                            file={formData.docLicense}
                            onFileChange={(file) => handleFileChange('docLicense', file)}
                            onRemove={() => removeFile('docLicense')}
                        />
                        <DocItem
                            id="coa"
                            label="Certificate of Analysis (COA)"
                            sub="Lab test results for your products"
                            file={formData.docCOA}
                            onFileChange={(file) => handleFileChange('docCOA', file)}
                            onRemove={() => removeFile('docCOA')}
                        />
                        <DocItem
                            id="insurance"
                            label="Insurance Certificate"
                            sub="Liability insurance documentation"
                            file={formData.docInsurance}
                            onFileChange={(file) => handleFileChange('docInsurance', file)}
                            onRemove={() => removeFile('docInsurance')}
                        />
                        <DocItem
                            id="health"
                            label="NSF / Health Canada Certification"
                            sub="Regulatory compliance certificate"
                            file={formData.docHealth}
                            onFileChange={(file) => handleFileChange('docHealth', file)}
                            onRemove={() => removeFile('docHealth')}
                        />
                    </div>
                </div>

                {/* Compliance Alert */}
                <div className="bg-[#FFF7E8] border border-[#FF9F40] rounded-md p-3 flex gap-3">
                    <Icon icon="lucide:alert-triangle" className="text-[#FF9F40] shrink-0" width="18" />
                    <p className="text-xs font-semibold text-[#7C2D12] leading-relaxed">
                        Suppliers without a Business License will be held in <span className="text-[#92400E] font-bold">Pending</span> status until documents are verified.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Step4ContactsDocs;
