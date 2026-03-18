import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

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

const AddressDetailsView = () => {
    const [addresses, setAddresses] = useState(initialAddresses);

    const removeAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id));

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#181211]">Address Details</h2>
                <button className="text-[15px] font-bold text-[#E93E2B] hover:underline flex items-center cursor-pointer">
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
                                <button className="text-base font-bold text-[#E93E2B] cursor-pointer hover:underline">
                                    Edit
                                </button>
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
        </div>
    );
};

export default AddressDetailsView;
