import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import RequestDocsModal from "../modals/RequestDocsModal";

const DocumentsContent = ({ store }) => {
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const apiDocuments = store?.documents || [];
    
    // Map API documents to the UI format
    const displayDocuments = apiDocuments.map(doc => ({
        name: doc.name,
        date: "Uploaded", // Date info might not be in the subdoc yet, keeping simple
        status: "Verified", // Defaulting to verified for now as they exist
        url: doc.url
    }));

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000';
    const getFileUrl = (url) => {
        if (!url) return "#";
        if (url.startsWith('http')) return url;
        return `${API_URL}/files/${url}`;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Summary & Request Action */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[14px] font-medium">
                    <span className='text-[#181211]'><span className="text-[#219653]">{displayDocuments.length} </span>uploaded</span>
                </div>
                <button 
                    onClick={() => setIsRequestModalOpen(true)}
                    className="flex items-center gap-1 px-3 py-2 border border-[#0066FF] text-[#0066FF] rounded-lg text-sm font-semibold bg-[#DAE9FF] transition-all active:scale-95 shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33]"
                >
                    <Icon icon="material-symbols:upload-rounded" width="18" />
                    Request More Docs
                </button>
            </div>

            {/* Documents List */}
            <div className="space-y-2">
                {displayDocuments.map((doc, idx) => (
                    <div
                        key={idx}
                        className={`flex flex-col md:flex-row md:items-center justify-between p-2 rounded-md border transition-all bg-[#F6FBFF] border-[#F6FBFF]`
                        }
                    >
                        <div className="flex items-center gap-2">
                            <div className={`w-11.5 h-11.5 rounded-md flex items-center justify-center shrink-0 bg-[#CDFFE2] text-[#219653]`}>
                                <Icon icon="gala:file-document" width="24" strokeWidth={2.5} />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="text-base font-semibold text-[#181211] leading-tight">{doc.name}</h4>
                                <p className="text-[13px] text-[#64748B] font-medium">
                                    {doc.date}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                                <>
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#CDFFE2] border border-[#219653] text-[#219653] rounded-md text-[13px] font-semibold">
                                        <Icon icon="hugeicons:tick-02" width="16" strokeWidth={3} />
                                        Verified
                                    </span>
                                    <a 
                                        href={getFileUrl(doc.url)} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="px-3 py-1.5 bg-[#DAE9FF] border border-[#0066FF] text-[#0066FF] rounded-md text-[13px] font-semibold transition-all hover:bg-white flex items-center"
                                    >
                                        View
                                    </a>
                                </>
                        </div>
                    </div>
                ))}
                
                {displayDocuments.length === 0 && (
                    <div className="p-10 text-center border border-dashed border-[#E2E8F0] rounded-lg">
                        <p className="text-[#94A3B8] font-medium">No documents uploaded for this store.</p>
                    </div>
                )}
            </div>

            {/* Request Documents Modal */}
            <RequestDocsModal 
                isOpen={isRequestModalOpen} 
                onClose={() => setIsRequestModalOpen(false)} 
            />
        </div>
    );
};

export default DocumentsContent;
