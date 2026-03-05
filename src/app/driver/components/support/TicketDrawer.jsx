import React, { useState } from "react";
import { X, UploadCloud, File as FileIcon, Download } from "lucide-react";

const TicketDrawer = ({ isOpen, onClose, type = "report" }) => {
    const [file, setFile] = useState(null);

    const title = type === "report" ? "Report Issue" : "Raise a ticket";

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i];
    };

    if (!isOpen) return null;

    // The Figma design specifically has Dummy_File_1.png (94 KB) pre-attached for the "Raise a ticket" view to demonstrate it.
    const isPreAttached = type === "raise" && !file;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 transition-opacity">
            <div className="w-full sm:w-[536px] bg-white h-full shadow-xl flex flex-col transform transition-transform duration-300">
                <div className="flex items-center justify-between px-6 py-4">
                    <h2 className="text-[16px] font-semibold text-[#3F4753]">{title}</h2>
                    <button onClick={onClose} className="text-[#8B8B8B] hover:text-[#3F4753]">
                        <X className="w-5 h-5 stroke-2" />
                    </button>
                </div>

                <div className="w-full border-t border-[#DDDDDD]" />

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <form className="flex flex-col gap-5 h-full">
                        {type === "report" ? (
                            <>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-[#3F4753]">
                                        Delivery ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter active delivery ID"
                                        className="w-full px-3 py-2.5 text-[13px] border border-[#DDDDDD] rounded-[4px] focus:outline-none focus:border-blue-500 placeholder:text-[#8B8B8B]"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[13px] font-semibold text-[#3F4753]">
                                        Issue Type
                                    </label>
                                    {/* Exactly matching the Figma's confusing copy: */}
                                    <input
                                        type="text"
                                        placeholder="Enter active delivery ID"
                                        className="w-full px-3 py-2.5 text-[13px] border border-[#DDDDDD] rounded-[4px] focus:outline-none focus:border-blue-500 placeholder:text-[#8B8B8B]"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-[#3F4753]">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="brief summary of the issue"
                                    className="w-full px-3 py-2.5 text-[13px] border border-[#DDDDDD] rounded-[4px] focus:outline-none focus:border-blue-500 placeholder:text-[#8B8B8B]"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-[#3F4753]">
                                Description
                            </label>
                            <textarea
                                placeholder="Please provide as much information as possible.."
                                rows={4}
                                className="w-full px-3 py-2.5 text-[13px] border border-[#DDDDDD] rounded-[4px] focus:outline-none focus:border-blue-500 placeholder:text-[#8B8B8B] resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-[#3F4753]">
                                Attachment (optional)
                            </label>

                            {!file && !isPreAttached ? (
                                <div
                                    className="w-full border border-dashed border-[#DDDDDD] rounded-[8px] p-6 flex flex-col items-center justify-center gap-2 bg-[#FAFAFA]"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <UploadCloud className="w-5 h-5 text-[#3F4753]" />
                                    <div className="text-center">
                                        <p className="text-[13px] font-semibold text-[#3F4753]">
                                            Choose a file or drag & drop it here
                                        </p>
                                        <p className="text-[11px] text-[#8B8B8B] mt-1">
                                            JPEG, PNG, and PDF, formats, up to 20MB
                                        </p>
                                    </div>
                                    <label className="mt-2 cursor-pointer">
                                        <span className="px-4 py-1.5 bg-[#F4F4F4] text-[#3F4753] text-[12px] font-semibold rounded-[4px] hover:bg-gray-200 transition-colors border border-[#DDDDDD]">
                                            Browse File
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                        />
                                    </label>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 bg-[#F4F4F4] rounded-[6px]">
                                    <div className="flex items-center gap-3">
                                        <FileIcon className="w-5 h-5 text-[#8B8B8B]" />
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[13px] font-medium text-[#3F4753]">
                                                {file ? file.name : "Dummy_File_1.png"}
                                            </span>
                                            <span className="text-[11px] text-[#8B8B8B]">
                                                {file ? formatFileSize(file.size) : "94 KB"}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFile(null)}
                                        className="text-[#8B8B8B] hover:text-[#3F4753]"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto pt-4 flex pb-8">
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white text-[13px] rounded-[4px] font-medium transition-colors"
                                onClick={(e) => { e.preventDefault(); onClose(); }}
                            >
                                Submit ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TicketDrawer;
