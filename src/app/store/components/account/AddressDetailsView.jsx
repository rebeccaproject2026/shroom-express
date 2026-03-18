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

const inputClass = "w-full border border-[#BDBDD2] rounded-md px-5 py-2.5 text-sm text-[#181211] outline-none focus:border-[#E93E2B] placeholder:text-[#BDBDBD] transition-colors bg-white";

const AddressDetailsView = () => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);

    const removeAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id));

    const handleSave = () => {
        if (!form.firstName || !form.lastName) return;
        setAddresses(prev => ([
            ...prev,
            {
                id: Date.now(),
                name: `${form.firstName} ${form.lastName}`,
                address: `${form.address}, ${form.city} - ${form.postcode} ${form.state}`,
                phone: form.phone,
                email: form.email,
            }
        ]));
        setForm(emptyForm);
        setShowModal(false);
    };

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
            <div className="flex flex-col gap-3">
                {addresses.map(addr => (
                    <div key={addr.id} className="border border-[#E8E8E8] rounded-lg p-6 bg-white">
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
                            <div className="flex items-center gap-4 shrink-0">
                                <button className="text-base font-bold text-[#E93E2B] cursor-pointer hover:underline">Edit</button>
                                <button
                                    onClick={() => removeAddress(addr.id)}
                                    className="text-base font-semibold text-[#181211B2] cursor-pointer hover:text-[#E93E2B] transition-colors"
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
                <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/40" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] mx-2 relative max-h-[97vh] overflow-y-auto">
                        {/* Modal header */}
                        <div className="flex items-center justify-between bg-[#FAF8F8] border border-[#E8E8E8] p-4">
                            <h3 className="text-lg font-bold text-[#181211]">Add New Address</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-[#181211] hover:text-[#E93E2B] transition-colors text-xl font-bold leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 p-4">
                            {/* First + Last name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                        Frist name <span>*</span>
                                    </label>
                                    <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="Jeo" className={inputClass} />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                        Last name <span>*</span>
                                    </label>
                                    <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Deo" className={inputClass} />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                    Phone <span>*</span>
                                </label>
                                <input type="text" value={form.phone} onChange={set('phone')} placeholder="Jeo" className={inputClass} />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                    Email address <span>*</span>
                                </label>
                                <input type="email" value={form.email} onChange={set('email')} placeholder="Deo" className={inputClass} />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                    Address <span>*</span>
                                </label>
                                <input type="text" value={form.address} onChange={set('address')} placeholder="Jeo" className={inputClass} />
                            </div>

                            {/* City */}
                            <div>
                                <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                    City <span>*</span>
                                </label>
                                <input type="text" value={form.city} onChange={set('city')} placeholder="Deo" className={inputClass} />
                            </div>

                            {/* State + Postcode */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                        State <span>*</span>
                                    </label>
                                    <input type="text" value={form.state} onChange={set('state')} placeholder="Jeo" className={inputClass} />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-[#181211] mb-1.5 block">
                                        Postcode <span>*</span>
                                    </label>
                                    <input type="text" value={form.postcode} onChange={set('postcode')} placeholder="Deo" className={inputClass} />
                                </div>
                            </div>

                            {/* Save button */}
                            <button
                                onClick={handleSave}
                                className="w-full bg-[#E93E2B] hover:bg-red-600 text-white font-bold py-3 rounded-md text-[15px] transition-colors mt-1"
                            >
                                Save Address
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
