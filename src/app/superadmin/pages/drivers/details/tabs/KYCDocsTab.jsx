/* eslint-disable no-unused-vars */
import React from 'react';
import { Icon } from "@iconify/react";

const KYCDocsTab = ({ driver }) => {
    const documents = [
        { name: "Criminal Background Check", date: "Uploaded Feb 14, 2026", status: "Verified" },
        { name: "Owner Government ID", date: "Uploaded Feb 14, 2026", status: "Verified" },
        { name: "Proof of Address", date: "Uploaded Feb 14, 2026", status: "Verified" },
        { name: "Vehicle Registration", date: "Uploaded Feb 14, 2026", status: "Verified" },
        { name: "Driver's License", date: "Uploaded Feb 14, 2026", status: "Verified" },
        { name: "Insurance Certificate", date: "Not submitted.", status: "Missing" },
        { name: "Health & Safety Certificate", date: "Uploaded Mar 01, 2026", status: "Reviewing" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Summary & Request Action */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-[14px] font-semibold">
                    <span className='text-[#181211]'><span className="text-[#219653]">4 </span>verified</span>
                    <span className="text-[#181211]">·</span>
                    <span className='text-[#181211]'><span className="text-[#F29339]">1</span> in review</span>
                    <span className="text-[#181211]">·</span>
                    <span className='text-[#181211]'><span className="text-[#EA3D2A]">1</span> missing</span>
                </div>
                <button
                    className="flex items-center gap-1.5 px-4 py-2 border border-[#0066FF] text-[#0066FF] rounded-lg text-sm font-bold bg-[#DAE9FF] transition-all active:scale-95 shadow-sm"
                >
                    <Icon icon="material-symbols:upload-rounded" width="18" />
                    Request More Docs
                </button>
            </div>

            {/* Documents List */}
            <div className="space-y-2">
                {documents.map((doc, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-md transition-all bg-[#F6FBFF]"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className={`w-11.5 h-11.5 rounded-md flex items-center justify-center shrink-0 ${doc.status === 'Verified' ? 'bg-[#CDFFE2] text-[#219653]' :
                                doc.status === 'Reviewing' ? 'bg-[#FFF7E8] text-[#F29339]' :
                                    'bg-[#FEF2F2] text-[#EA3D2A]'
                                }`}>
                                <Icon icon="gala:file-document" width="22" />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="text-[15px] font-semibold text-[#181211] leading-tight">{doc.name}</h4>
                                <p className="text-[13px] text-[#64748B] font-medium">
                                    {doc.date}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                            {doc.status === 'Verified' && (
                                <>
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#CDFFE2] border border-[#219653] text-[#219653] rounded-md text-[13px] font-bold">
                                        <Icon icon="hugeicons:tick-02" width="16" />
                                        Verified
                                    </span>
                                    <button className="px-4 py-1.5 bg-[#DAE9FF] border border-[#0066FF] text-[#0066FF] rounded-md text-[13px] font-bold transition-all hover:bg-[#C2DBFF]">
                                        View
                                    </button>
                                </>
                            )}
                            {doc.status === 'Missing' && (
                                <>
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEDEB] border border-[#EA3D2A] text-[#EA3D2A] rounded-md text-[13px] font-bold">
                                        <Icon icon="lucide:x" width="16" />
                                        Missing
                                    </span>
                                    <button className="px-4 py-1.5 bg-[#DAE9FF] border border-[#0066FF] text-[#0066FF] rounded-md text-[13px] font-bold transition-all hover:bg-[#C2DBFF]">
                                        Request
                                    </button>
                                </>
                            )}
                            {doc.status === 'Reviewing' && (
                                <>
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF7E8] border border-[#FF9F40] text-[#FF9F40] rounded-md text-[13px] font-bold mr-1">
                                        <Icon icon="mdi:timer-sand" width="16" />
                                        Reviewing
                                    </span>
                                    <button className="flex items-center gap-1 px-4 py-1.5 bg-[#219653] text-white rounded-md text-[13px] font-bold transition-all hover:bg-[#1B7E45] active:scale-95">
                                        <Icon icon="lucide:check" width="16" />
                                        Approve
                                    </button>
                                    <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FFEDEB] border border-[#EA3D2A] text-[#EA3D2A] rounded-md text-[13px] font-bold transition-all hover:bg-[#FFD6D1]">
                                        <Icon icon="lucide:x" width="16" />
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KYCDocsTab;
