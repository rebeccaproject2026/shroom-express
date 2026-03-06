import { Icon } from "@iconify/react";
import PageHeader from '../../components/PageHeader';

const Documents = () => {
    return (
        <div className="p-4  bg-[#F5F5F5]">
            {/* Welcome Header */}
            <PageHeader />

            {/* Documents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                {/* Driver's License Card */}
                <div className="bg-white flex flex-col border border-[#E8E8E8] rounded-md shadow-sm overflow-hidden min-h-[180px]">
                    <div className="relative p-5 flex-1 flex flex-col">
                        {/* Verified Badge */}
                        <div className="absolute top-5 right-5">
                            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#D1FAE5] text-[#059669]">
                                Verified
                            </span>
                        </div>

                        {/* Icon and Content */}
                        <div className="flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-md bg-[#DBEAFE] flex items-center justify-center">
                                <Icon icon="hugeicons:license-third-party" width="22" height="22" className="text-[#0F49BD]" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#222222] mb-3">Driver's License</h3>

                                {/* Details */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="lets-icons:date-today" width="16" height="16" className="text-[#777777]" />
                                        <span className="text-[11px] text-[#777777] font-medium">Expiry: Dec 15, 2025</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon icon="hugeicons:id" width="16" height="16" className="text-[#777777] *:stroke-2" />
                                        <span className="text-[11px] text-[#777777] font-medium">ID: DL-992-004-X</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Button Section */}
                    <div className="bg-[#F8FBFF] px-5 py-3 border-t border-[#E8E8E8] flex justify-end">
                        <button className="px-5 py-2 bg-[#1142D4] text-white rounded-md font-medium text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                            <Icon icon="hugeicons:pencil-edit-01" width="14" height="14" />
                            Update
                        </button>
                    </div>
                </div>

                {/* Identity Proof Card */}
                <div className="bg-white flex flex-col border border-[#E8E8E8] rounded-md shadow-sm overflow-hidden min-h-[180px]">
                    <div className="relative p-5 flex-1 flex flex-col">
                        {/* Pending Badge */}
                        <div className="absolute top-5 right-5">
                            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706]">
                                Pending
                            </span>
                        </div>

                        {/* Icon and Content */}
                        <div className="flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-md bg-[#DBEAFE] flex items-center justify-center">
                                <Icon icon="ic:sharp-fingerprint" width="22" height="22" className="text-[#1142D4]" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#222222] mb-3">Identity Proof</h3>

                                {/* Details */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="lets-icons:date-today" width="16" height="16" className="text-[#777777]" />
                                        <span className="text-[11px] text-[#777777] font-medium">Expiry: N/A</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icon icon="hugeicons:id" width="16" height="16" className="text-[#777777] *:stroke-2" />
                                        <span className="text-[11px] text-[#777777] font-medium">Type: Passport</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Button Section */}
                    <div className="bg-[#F8FBFF] px-5 py-3 border-t border-[#E8E8E8] flex justify-end">
                        <button className="px-5 py-2 bg-[#1142D4] text-white rounded-md font-medium text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                            <Icon icon="hugeicons:pencil-edit-01" width="14" height="14" />
                            Update
                        </button>
                    </div>
                </div>

                {/* Vehicle Insurance Card */}
                <div className="bg-white flex flex-col border border-[#E8E8E8] rounded-md shadow-sm overflow-hidden min-h-[180px]">
                    <div className="relative p-5 flex-1 flex flex-col">
                        {/* Expiring Soon Badge */}
                        <div className="absolute top-5 right-5">
                            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706]">
                                Expiring Soon
                            </span>
                        </div>

                        {/* Icon and Content */}
                        <div className="flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-md bg-[#DBEAFE] flex items-center justify-center">
                                <Icon icon="hugeicons:car-01" width="22" height="22" className="text-[#1142D4]" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#222222] mb-3">Vehicle Insurance</h3>

                                {/* Warning Message */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="ph:warning-bold" width="14" height="14" className="text-[#D97706]" />
                                        <span className="text-[11px] text-[#D97706] font-medium">Expiry: Oct 30, 2023</span>
                                    </div>
                                    <p className="text-[11px] text-[#777777] font-medium leading-relaxed mt-1">
                                        Document must be updated at least 5 days before expiration to avoid account suspension.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Button Section */}
                    <div className="bg-[#F8FBFF] px-5 py-3 border-t border-[#E8E8E8] flex justify-end mt-auto">
                        <button className="px-5 py-2 bg-[#1142D4] text-white rounded-md font-medium text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                            <Icon icon="hugeicons:pencil-edit-01" width="15" height="15" />
                            Update
                        </button>
                    </div>
                </div>

                {/* Bank Verification Card */}
                <div className="bg-white flex flex-col border border-[#E8E8E8] rounded-md shadow-sm overflow-hidden min-h-[180px]">
                    <div className="relative p-5 flex-1 flex flex-col">
                        {/* Rejected Badge */}
                        <div className="absolute top-5 right-5">
                            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#DC2626]">
                                Rejected
                            </span>
                        </div>

                        {/* Icon and Content */}
                        <div className="flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-md bg-[#FEE2E2] flex items-center justify-center">
                                <Icon icon="hugeicons:bank" width="22" height="22" className="text-[#DC2626]" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-[#222222] mb-3">Bank Verification</h3>

                                {/* Error Message */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-1">
                                        <Icon icon="material-symbols:cancel-outline-rounded" width="14" height="14" className="text-[#DC2626]" />
                                        <span className="text-[11px] text-[#DC2626] font-medium">Reason: Document unclear</span>
                                    </div>
                                    <p className="text-[11px] text-[#777777] font-medium leading-relaxed mt-1">
                                        Please ensure that your bank statement clearly shows your full name and account number.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Re-Upload Button Section */}
                    <div className="bg-[#F8FBFF] px-5 py-3 border-t border-[#E8E8E8] flex justify-end mt-auto">
                        <button className="px-4 py-2 bg-[#1142D4] text-white rounded-md font-medium text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                            <Icon icon="tabler:reload" width="15" height="15" />
                            Re - Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;