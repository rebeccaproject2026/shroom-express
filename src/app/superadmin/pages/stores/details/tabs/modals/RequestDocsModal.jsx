import React, { useState } from "react";
import { Icon } from "@iconify/react";

const RequestDocsModal = ({ isOpen, onClose }) => {
    const [docs, setDocs] = useState([
        { id: 'bl', label: 'Business License (Renewed)', selected: false },
        { id: 'id', label: 'Owner Government ID', selected: false },
        { id: 'poa', label: 'Proof of Address', selected: true },
        { id: 'ins', label: 'Insurance Certificate', selected: true },
        { id: 'hs', label: 'Health & Safety Certificate', selected: false },
        { id: 'lab', label: 'Product Lab Reports', selected: false },
    ]);

    const toggleDoc = (id) => {
        setDocs(docs.map(doc =>
            doc.id === id ? { ...doc, selected: !doc.selected } : doc
        ));
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-[#181211]/30 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-[36%] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#DAE9FF] rounded-md flex items-center justify-center text-[#0066FF] shrink-0">
                        <Icon icon="material-symbols:upload-rounded" width="24" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-xl font-semibold text-[#181211]">Request Documents</h3>
                        <p className="text-xs text-[#181211] font-regular leading-none">Vendor will be notified via email</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-6">
                    {/* Document Selection List */}
                    <div className="space-y-2.5 mb-3 max-h-[300px] overflow-y-auto pr-1 select-none scrollbar-hide">
                        {docs.map((doc) => (
                            <label
                                key={doc.id}
                                onClick={() => toggleDoc(doc.id)}
                                className={`flex items-center gap-3 p-2.5 rounded-md border cursor-pointer transition-all ${doc.selected
                                    ? 'bg-[#FEF2F2] border-[#EA3D2A] text-[#EA3D2A]'
                                    : 'bg-white border-[#E2E8F0] text-[#181211]'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${doc.selected
                                    ? 'bg-transparent border-[#EA3D2A]'
                                    : 'bg-white border-[#E2E8F0]'
                                    }`}>
                                    {doc.selected && <Icon icon="lucide:check" width="14" strokeWidth={4.5} />}
                                </div>
                                <span className={`text-[14.5px] font-semibold ${doc.selected ? 'text-[#EA3D2A]' : 'text-[#181211]'}`}>
                                    {doc.label}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-2.5">
                        <label className="text-[14.5px] font-semibold text-[#181211]">Message to Vendor</label>
                        <textarea
                            className="w-full p-4 mt-1.5 bg-white border border-[#E2E8F0] rounded-md text-sm min-h-[120px] outline-none focus:border-[#EA3D2A] transition-colors placeholder:text-[#94A3B8] placeholder:text-[13.5px]"
                            placeholder="Please resubmit the following documents within 5 business days..."
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-5 border-t border-[#E2E8F0] flex gap-4 bg-white">                    
                    <button
                    onClick={onClose}
                    className="flex-1 px-5 py-2.5 border border-[#E2E8F0] text-[#475569] rounded-md text-[15px] font-bold transition-all hover:bg-gray-50 active:scale-95"
                >
                    Cancel
                </button>
                    <button
                        className="flex-1 px-5 py-2.5 bg-[#EA3D2A] text-white justify-center rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95"
                    >
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestDocsModal;
