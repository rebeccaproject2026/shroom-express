import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Select from '../../components/Select';

const documentTypes = [
    { value: "Driver's License", label: "Driver's License" },
    { value: "Identity Proof", label: "Identity Proof" },
    { value: "Vehicle Insurance", label: "Vehicle Insurance" },
    { value: "Bank Verification", label: "Bank Verification" },
    { value: "Other Document", label: "Other Document" }
];

const UpdateDocumentModal = ({ isOpen, onClose, onSubmit, initialDocumentType }) => {
    const [selectedType, setSelectedType] = useState(initialDocumentType || documentTypes[0]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const defaultType = initialDocumentType || documentTypes[0].value;
            setSelectedType(defaultType);
            setSelectedFile(null);
            setError('');
            document.body.style.overflow = "hidden";
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";
        }
    }, [isOpen, initialDocumentType]);

    if (!isOpen && !isVisible) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setError('');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setError('');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = () => {
        if (!selectedFile) {
            setError('Please upload a document before submitting.');
            return;
        }

        const payload = {
            documentType: selectedType,
            file: selectedFile
        };

        onSubmit(payload);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal Panel */}
            <div
                className={`relative bg-white rounded-[8px] shadow-xl w-full max-w-[450px] transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} overflow-hidden`}
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#E8E8E8] flex items-center justify-between">
                    <h3 className="text-[17px] font-bold text-[#3F4753]">Update Document</h3>
                    <button onClick={handleClose} className="text-[#8B8B8B] hover:text-[#3F4753] transition-colors rounded-full p-1 -mr-1">
                        <Icon icon="lucide:x" width="20" className="stroke-[1.5]" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pt-5 pb-7">
                    <div className="flex flex-col gap-5">

                        {/* Select Type */}
                        <div className="flex flex-col gap-1.5 min-w-0 flex-1 z-50">
                            <label className="text-[14px] font-medium text-[#777777]">
                                Document Type
                            </label>
                            <Select
                                options={documentTypes}
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                minWidth="100%"
                                placeholder="Select Document Type"
                            />
                        </div>

                        {/* File Upload Area */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[14px] font-medium text-[#777777]">
                                Upload File
                            </label>

                            <div
                                className={`border-2 border-dashed rounded-[8px] p-7 transition-all flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group 
                                ${error && !selectedFile
                                        ? 'border-red-400 bg-red-50 hover:bg-red-100'
                                        : 'border-[#DDDDDD] bg-[#FAFAFA] hover:bg-[#F3F6FF] hover:border-[#1142D4]'}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf"
                                />

                                {selectedFile ? (
                                    <div className="flex flex-col items-center gap-2.5 z-10 w-full">
                                        <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-[#E8E8E8] flex items-center justify-center text-[#1142D4] mb-1">
                                            <Icon icon="hugeicons:task-done-01" width="28" height="28" />
                                        </div>
                                        <div className="flex flex-col items-center w-full">
                                            <p className="text-[15px] font-bold text-[#222222] truncate w-full max-w-[280px]">{selectedFile.name}</p>
                                            <p className="text-[13px] text-[#777777] font-medium mt-0.5">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                                            className="text-[13px] text-red-500 font-bold hover:bg-red-50 px-3 py-1.5 rounded-md mt-2 transition-colors border border-transparent hover:border-red-100"
                                        >
                                            Remove File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2.5 z-10">
                                        <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-[#E8E8E8] flex items-center justify-center text-[#1142D4] mb-2 group-hover:scale-110 transition-transform">
                                            <Icon icon="solar:cloud-upload-linear" width="28" height="28" />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-[15px] text-[#222222] font-semibold">
                                                Click to Upload <span className="text-[#777777] font-normal">or drop file here</span>
                                            </p>
                                            <p className="text-[13px] text-[#777777] mt-1 font-medium">SVG, PNG, JPG or PDF (max. 10MB)</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {error && !selectedFile && (
                                <p className="text-[13px] text-red-600 mt-1">{error}</p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex justify-end gap-3 border-t border-[#E8E8E8] bg-gray-50/50">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2.5 bg-white text-[#222222] text-[13px] font-bold rounded-[6px] hover:bg-gray-50 transition-colors border border-[#DDDDDD] shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 text-white text-[13px] font-bold rounded-[6px] shadow-sm transition-colors border border-transparent bg-[#1142D4] hover:bg-blue-800"
                    >
                        Submit Document
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateDocumentModal;
