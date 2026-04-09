import React from "react";
import { Icon } from "@iconify/react";

const ContactsContent = () => {
    const contacts = [
        {
            name: "Marcus Webb",
            role: "Account Manager",
            email: "email@supplier.com",
            phone: "Phone number",
            initial: "M",
            color: "bg-[#FFEDEB] text-[#EA3D2A]",
            isPrimary: true
        },
        {
            name: "Priya Sharma",
            role: "Quality Assurance",
            email: "priya@supplier.com",
            phone: "+1 234 567 890",
            initial: "P",
            color: "bg-[#FFEDEB] text-[#EA3D2A]",
            isPrimary: false
        },
        {
            name: "Jordan Kline",
            role: "Logistics Manager",
            email: "jordan@supplier.com",
            phone: "+1 987 654 321",
            initial: "J",
            color: "bg-[#FFEDEB] text-[#EA3D2A]",
            isPrimary: false
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-manrope">
            {/* Header Section */}
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className="text-xl font-semibold text-[#181211] leading-tight mb-1">Supplier Contacts</h2>
                    <p className="text-sm font-medium text-[#475569]">People to reach out to at NovaBio Labs</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#EA3D2A] text-white rounded-lg text-sm font-semibold hover:bg-[#D43424] transition-all active:scale-95 shadow-lg shadow-[#EA3D2A]/20">
                    <Icon icon="lucide:plus" width="18" />
                    Add Contact
                </button>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contacts.map((contact, idx) => (
                    <div key={idx} className="bg-white border border-[#E2E8F0] rounded-md  p-3 relative flex flex-col items-center">
                        {contact.isPrimary && (
                            <span className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#0066FF] border border-[#0066FF] bg-white">
                                Primary
                            </span>
                        )}

                        {/* Avatar */}
                        <div className={`w-15 h-15 rounded-full bg-[#FFEDEB] text-[#EA3D2A] flex items-center justify-center text-3xl font-medium mb-4 mt-2`}>
                            {contact.initial}
                        </div>

                        {/* Name & Role */}
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold text-[#181211] leading-tight">{contact.name}</h3>
                            <p className="text-sm font-medium text-[#181211]">{contact.role}</p>
                        </div>

                        {/* Contact Info Row - Only show for first card */}
                        {idx === 0 && (
                            <div className="flex w-full gap-3 mb-1">
                                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-[#F8F8F8] rounded-md overflow-hidden min-w-0">
                                    <Icon icon="carbon:email" className="text-[#EA3D2A] shrink-0" width="18" />
                                    <span className="text-[11px] font-medium text-[#181211] truncate font-manrope">
                                        {contact.email}
                                    </span>
                                </div>
                                <div className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-[#F8F8F8] rounded-md overflow-hidden min-w-0">
                                    <Icon icon="solar:phone-outline" className="text-[#EA3D2A] shrink-0" width="18" />
                                    <span className="text-[11px] font-medium text-[#181211] truncate font-manrope">
                                        {contact.phone}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Actions style - Only show for 2nd and 3rd cards */}
                        {idx !== 0 && (
                            <div className="flex w-70 gap-3">
                                <button className="flex-1 px-3 py-3 bg-white border border-[#E2E8F0] text-[#181211] rounded-lg text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33]">
                                    Mail
                                </button>
                                <button className="flex-1 px-3 py-3 bg-[#EA3D2A] text-white rounded-lg text-sm font-semibold  transition-all shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] active:scale-95">
                                    Call
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactsContent;
