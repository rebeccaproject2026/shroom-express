import React from 'react';
import { Icon } from '@iconify/react';

const UploadBox = ({ label, sub, icon, isLogo }) => (
  <div className={`w-full aspect-[6/1.2] border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-2 bg-[#F8F8F8] cursor-pointer transition-all group ${isLogo ? 'border-[#EA3D2A]' : 'border-[#BDBDD2]'
    }`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isLogo ? 'bg-[#FFEDEB] text-[#EA3D2A]' : 'bg-[#F1F5F9] text-[#64748B]'
      }`}>
      <Icon icon={icon || "lucide:upload-cloud"} width="24" />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold text-[#181211]">{label}</p>
      <p className="text-xs font-medium text-[#64748B]">{sub}</p>
    </div>
  </div>
);

const DocumentItem = ({ name, size, type, onRemove }) => (
  <div className="flex items-center justify-between p-3 border border-[#BDBDD2] rounded-md bg-white">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${type === 'pdf' ? 'bg-[#FFEDEB]' : 'bg-[#E2E8F0]'
        }`}>
        <Icon
          icon={type === 'pdf' ? "mdi:file-pdf-box" : "icon-park:file-doc"}
          className={type === 'pdf' ? "text-[#EA3D2A]" : "text-[#2F80ED]"}
          width="24"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#181211] truncate">{name}</p>
        <p className="text-xs font-medium text-[#64748B]">{size}</p>
      </div>
    </div>
    <button
      onClick={onRemove}
      className="w-8 h-8 flex items-center justify-center border border-[#EA3D2A] rounded-md text-[#EA3D2A] hover:bg-[#FFEDEB] transition-all"
    >
      <Icon icon="lucide:x" width="18" />
    </button>
  </div>
);

const Step5MediaDocs = ({ formData, setFormData }) => {
  const removeDoc = (index) => {
    const newDocs = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocs });
  };

  return (
    <div className="bg-white border border-[#BDBDD2] rounded-md overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#BDBDD2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFEDEB] rounded-sm flex items-center justify-center shrink-0">
            <Icon icon="solar:folder-outline" className="text-[#EA3D2A]" width="24" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#181211]">Media & Documents</h3>
            <p className="text-[#181211] text-xs leading-tight">Upload store logo, banner image and required compliance documents</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#181211]">Step 5 of 5</span>
      </div>

      <div className="p-5 space-y-6">
        {/* Logo Upload */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-[#181211] block">
            Store Logo <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>
          <UploadBox
            label="Click to upload logo"
            sub="PNG, JPG up to 5MB"
            isLogo={true}
            icon="lucide:upload"
          />
        </div>

        {/* Banner Upload */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-[#181211] block">
            Store Banner Image <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>
          <UploadBox
            label="Click to upload banner"
            sub="PNG, JPG up to 10MB, Wide format preferred"
            isLogo={false}
            icon="lucide:upload"
          />
        </div>

        {/* Compliance Documents */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#181211] block">
            Business License Document <span className="text-[#EA3D2A] ml-0.5">*</span>
          </label>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-[#BDBDD2] border-dashed rounded-md bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CDFFE2] rounded-md flex items-center justify-center shrink-0">
                  <Icon icon="mi:document" className="text-[#219653]" width="24" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#181211]">Upload license document</p>
                  <p className="text-xs font-medium text-[#64748B]">PDF, DOC up to 10MB</p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-white border border-[#BDBDD2] rounded-md text-sm font-bold text-[#475569]  hover:bg-gray-50">
                Browse
              </button>
            </div>

            <div className="space-y-2.5">
              {formData.documents.map((doc, index) => (
                <DocumentItem
                  key={index}
                  {...doc}
                  onRemove={() => removeDoc(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Compliance Alert */}
        <div className="bg-[#FFF7E8] border border-[#FF9F40] rounded-lg p-4 flex gap-3">
          <Icon icon="lucide:info" className="text-[#FF9F40] shrink-0" width="20" />
          <p className="text-sm font-medium text-[#FF9F40] leading-relaxed">
            Important:
            All uploaded documents are reviewed by our compliance team within 24-48 hours. The store will remain in Pending status until verification is complete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step5MediaDocs;
