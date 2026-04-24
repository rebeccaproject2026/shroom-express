import React from 'react';
import { Icon } from '@iconify/react';

const DocumentRow = ({ id, label, sub, isUploaded, onUpload, onRemove }) => {
  const inputId = `file-input-${id}`;
  
  return (
    <div className={`flex items-center justify-between p-3 border transition-all rounded-md ${
      isUploaded 
      ? 'bg-[#E0FFED] border-[#219653] shadow-sm' 
      : 'bg-white border-[#BDBDD2] border-dashed hover:bg-gray-50'
    }`}>
      <input 
        type="file" 
        id={inputId}
        className="hidden" 
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onUpload(file);
        }}
      />
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${
          isUploaded ? 'bg-[#219653] text-white' : 'bg-[#E0FFED] text-[#219653]'
        }`}>
          <Icon icon="mi:document" width="24" />
        </div>
        <div>
          <p className={`text-sm font-bold ${isUploaded ? 'text-[#219653]' : 'text-[#181211]'}`}>
            {label}
          </p>
          <p className={`text-xs font-medium ${isUploaded ? 'text-[#219653]' : 'text-[#64748B]'}`}>
            {isUploaded ? 'Uploaded - click to remove' : sub}
          </p>
        </div>
      </div>
      
      {isUploaded ? (
        <button 
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center border border-[#EA3D2A] rounded-md text-[#EA3D2A] hover:bg-red-50 transition-all bg-white"
        >
          <Icon icon="lucide:x" width="18" />
        </button>
      ) : (
        <button 
          onClick={() => document.getElementById(inputId).click()}
          className="px-6 py-1.5 bg-white border border-[#BDBDD2] rounded-md text-sm font-bold text-[#475569] hover:bg-gray-50 transition-all"
        >
          Browse
        </button>
      )}
    </div>
  );
};

const Step4Documents = ({ formData, setFormData }) => {
  const complianceDocs = [
    { id: 'backgroundCheck', label: 'Criminal Background Check', sub: 'Authorized criminal background check report' },
    { id: 'ownerId', label: 'Owner Government ID', sub: 'Government-issued ID (front side)' },
    { id: 'proofOfAddress', label: 'Proof of Address', sub: 'Recent document showing current address' },
    { id: 'vehicleRegistration', label: 'Vehicle Registration', sub: 'Official vehicle registration document' },
    { id: 'driversLicense', label: 'Driver\'s License', sub: 'Valid driver\'s license' },
    { id: 'insuranceCert', label: 'Insurance Certificate', sub: 'Proof of valid insurance coverage' },
    { id: 'healthSafetyCert', label: 'Health & Safety Certificate', sub: 'Valid health and safety certification' },
  ];

  const handleUpload = (id, file) => {
    // Store the file object in formData.documents (which should be an array of objects or an object mapping)
    // For this implementation, we'll use an array of IDs to indicate 'uploaded' as per the previous state logic
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, id]
    }));
  };

  const handleRemove = (id) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(docId => docId !== id)
    }));
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm font-manrope">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="mi:document" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Upload Documents</h3>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 4 of 4</span>
      </div>

      <div className="p-5 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-[#181211]">
              Compliance Documents <span className="text-[#EA3D2A]">*</span>
            </label>
            <p className="text-xs font-medium text-[#64748B]">
              Upload required documents to speed up the verification process. Click any document to mark it as uploaded.
            </p>
          </div>

          <div className="space-y-3">
            {complianceDocs.map((doc) => (
              <DocumentRow 
                key={doc.id}
                id={doc.id}
                label={doc.label}
                sub={doc.sub}
                isUploaded={formData.documents.includes(doc.id)}
                onUpload={() => handleUpload(doc.id)}
                onRemove={() => handleRemove(doc.id)}
              />
            ))}
          </div>
        </div>

        {/* Compliance Alert */}
        <div className="bg-[#FFF7E8] border border-[#FF9F40] rounded-md p-3 flex items-center gap-3">
          <Icon icon="lucide:alert-triangle" className="text-[#FF9F40] shrink-0" width="20" />
          <p className="text-[13px] font-medium text-[#FF9F40]">
            Drivers without a Driver's License will be held in <span className="font-bold">Pending</span> status until documents are verified.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step4Documents;
