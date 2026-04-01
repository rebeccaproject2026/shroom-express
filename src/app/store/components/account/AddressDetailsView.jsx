import { Icon } from '@iconify/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const initialAddresses = [
    {
        id: 1,
        name: 'Jeo Deo',
        address: '11, Gardiner Expressway Exhibition Place Toronto - M5V 3B1 Ontario',
        phone: '+44 4568 2356',
        email: 'jeodeo@gmail.com',
    },
    {
        id: 2,
        name: 'Martin Shah',
        address: '5, Canterbury Street Saint John City Market Saint John - E2L 2C1 New Brunswick',
        phone: '+44 4568 2356',
        email: 'jeodeo@gmail.com',
    },
];

const emptyForm = { firstName: '', lastName: '', phone: '', email: '', address: '', city: '', state: '', postcode: '' };

const inputClass = "w-full border border-[#BDBDD2] rounded-md px-5 py-1.5 sm:py-2.5 text-sm text-[#181211] outline-none focus:border-[#E93E2B] placeholder:text-[#BDBDBD] transition-colors bg-white";

const AddressDetailsView = () => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const removeAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id));

    const handleEdit = (addr) => {
        const [firstName, ...rest] = addr.name.split(' ');
        setForm({
            firstName: firstName || '',
            lastName: rest.join(' ') || '',
            phone: addr.phone,
            email: addr.email,
            address: addr.address,
            city: '',
            state: '',
            postcode: '',
        });
        setEditingId(addr.id);
        setShowModal(true);
    };

    const handleSave = () => {
        if (!form.firstName || !form.lastName) return;
        const updated = {
            name: `${form.firstName} ${form.lastName}`,
            address: form.address || '',
            phone: form.phone,
            email: form.email,
        };
        if (editingId) {
            setAddresses(prev => prev.map(a => a.id === editingId ? { ...a, ...updated } : a));
        } else {
            setAddresses(prev => ([...prev, { id: Date.now(), ...updated }]));
        }
        setForm(emptyForm);
        setEditingId(null);
        setShowModal(false);
    };

    const handleClose = () => { setShowModal(false); setEditingId(null); setForm(emptyForm); };

    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#181211]">Address Details</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-[15px] font-bold text-[#E93E2B] hover:underline flex items-center cursor-pointer"
                >
                    <PlusIcon className="w-4 h-4 mr-1.5" />
                    Add New
                </button>
            </div>

            {/* Address cards */}
            <div className="flex flex-col gap-4">
                {addresses.map(addr => (
                    <div key={addr.id}>
                        {/* Desktop Card (Visible on Desktop/Tablet only) */}
                        <div className="hidden sm:block border border-[#E8E8E8] rounded-lg p-6 bg-white shadow-sm hover:border-[#E93E2B33] transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-bold text-[#181211] mb-1">{addr.name}</p>
                                    <p className="text-sm font-semibold text-[#181211B2] mb-3">{addr.address}</p>
                                    <div className="flex items-center font-semibold gap-4 text-sm text-[#181211B2]">
                                        <span>Phone : {addr.phone}</span>
                                        <span className="text-[#181211]">|</span>
                                        <span>Email : {addr.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 shrink-0 pt-1">
                                    <button onClick={() => handleEdit(addr)} className="text-base font-bold text-[#E93E2B] cursor-pointer hover:underline transition-all">Edit</button>
                                    <button
                                        onClick={() => removeAddress(addr.id)}
                                        className="text-base font-bold text-[#181211B2] cursor-pointer hover:text-[#E93E2B] transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Card (Visible on Mobile only - Image 827) */}
                        <div className="sm:hidden border border-[#F1F5F9] rounded-[24px] bg-white p-4 shadow-sm">
                            <div className="space-y-1 mb-5">
                                <p className="text-base font-bold text-[#181211] mb-2">{addr.name}</p>
                                <p className="text-sm font-semibold text-[#181211] opacity-70 leading-relaxed mb-4">{addr.address}</p>

                                <div className="space-y-0.5 text-sm font-bold text-[#181211]">
                                    <p className="opacity-70">Phone : <span className="text-[#181211]">{addr.phone}</span></p>
                                    <p className="opacity-70">Email : <span className="text-[#181211]">{addr.email}</span></p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3 mt-4">
                                <button onClick={() => handleEdit(addr)} className="text-base font-black text-[#E93E2B] active:opacity-50 transition-opacity">Edit</button>
                                <button
                                    onClick={() => removeAddress(addr.id)}
                                    className="text-base font-black text-[#181211] active:opacity-50 transition-opacity"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {addresses.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-sm font-semibold text-[#BDBDBD]">No addresses saved yet</p>
                    </div>
                )}
            </div>

            {/* Add New Address Modal */}
            {showModal && createPortal(
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 p-4" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] relative max-h-[85vh] sm:max-h-[95vh] flex flex-col overflow-hidden sm:-top-2 -top-10">
                        {/* Modal header */}
                        <div className="flex items-center justify-between bg-[#FAF8FB] border-b border-[#F1F5F9] p-4 sticky top-0 z-10 shrink-0">
                            <h3 className="text-lg font-bold text-[#181211]">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[#181211] hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable Form Body */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-4 custom-scrollbar">
                            <div className="flex flex-col gap-3 sm:gap-4 pb-0">
                                {/* First + Last name */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                            First name <span>*</span>
                                        </label>
                                        <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="Jeo" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                            Last name <span>*</span>
                                        </label>
                                        <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Deo" className={inputClass} />
                                    </div>
                                </div>

                                {/* Phone & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                            Phone <span>*</span>
                                        </label>
                                        <input type="text" value={form.phone} onChange={set('phone')} placeholder="+1 123 456 7890" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                            Email address <span>*</span>
                                        </label>
                                        <input type="email" value={form.email} onChange={set('email')} placeholder="jeo@example.com" className={inputClass} />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                        Address <span>*</span>
                                    </label>
                                    <input type="text" value={form.address} onChange={set('address')} placeholder="11, Gardiner Expressway..." className={inputClass} />
                                </div>

                                {/* City & State */}
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                            City <span>*</span>
                                        </label>
                                        <input type="text" value={form.city} onChange={set('city')} placeholder="Toronto" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                            State <span>*</span>
                                        </label>
                                        <input type="text" value={form.state} onChange={set('state')} placeholder="Ontario" className={inputClass} />
                                    </div>
                                </div>

                                {/* Postcode */}
                                <div>
                                    <label className="text-sm font-semibold text-[#181211] mb-1 block">
                                        Postcode <span>*</span>
                                    </label>
                                    <input type="text" value={form.postcode} onChange={set('postcode')} placeholder="M5V 3B1" className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="p-4 sm:p-5  sm:pb-10 md:pb-20 lg:pb-5 border-t border-[#F1F5F9] bg-white shrink-0">
                            <button
                                onClick={handleSave}
                                className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-bold py-3 sm:py-3.5 rounded-md text-[15px] shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                            >
                                {editingId ? 'Update Address' : 'Save Address'}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default AddressDetailsView;
