import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Breadcrumbs from '../../../components/common/Breadcrumbs';

const RegisteredDriverDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Resume/ New Registered", path: "/superadmin/drivers/resume" },
    { label: `#${id || 'Driver-ID'}` }
  ];

  const driverInfo = {
    name: 'Ethan Walsh',
    id: id || 'Driver-ID',
    type: 'Store Driver',
    appliedDate: 'Mar 04, 2026',
    email: 'ethan.w@email.ca',
    location: 'Ottawa, Ontario',
    phone: '+1 647-213-1013',
    vehicle: 'Toyota Yaris 2021',
    plate: 'XJ9 4421',
    licenceNo: 'ON-D12345',
    insurance: 'Valid · Exp Dec 2026',
    status: 'Pending',
    initials: 'LC'
  };

  const documents = [
    { name: 'Criminal Background Check', date: 'Uploaded Feb 14, 2026', status: 'Verified' },
    { name: 'Owner Government ID', date: 'Uploaded Feb 14, 2026', status: 'Verified' },
    { name: 'Proof of Address', date: 'Uploaded Feb 14, 2026', status: 'Verified' },
    { name: 'Vehicle Registration', date: 'Uploaded Feb 14, 2026', status: 'Verified' },
    { name: 'Driver\'s License', date: 'Uploaded Feb 14, 2026', status: 'Verified' },
    { name: 'Insurance Certificate', status: 'Missing', date: 'Not submitted.' },
    { name: 'Health & Safety Certificate', date: 'Uploaded Mar 01, 2026', status: 'Reviewing' },
  ];

  return (
    <div className="space-y-6 font-manrope animate-in fade-in duration-700 pb-10">
      {/* Header Section */}
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-sm bg-white shadow-[0px_4px_7px_rgba(0,0,0,0.25)] flex items-center justify-center shrink-0">
              <span className="text-[24px] font-semibold text-[#181211]">{driverInfo.initials}</span>
            </div>
            <div className="space-y-1">
              <h1 className="text-[22px] font-semibold text-[#181211] mb-2">{driverInfo.name}</h1>
              <div className="flex flex-wrap items-center gap-x-1 text-[13px] font-medium text-[#475569]">
                <span>#{driverInfo.id}</span>
                <span>·</span>
                <span>{driverInfo.type}</span>
                <span>·</span>
                <span>Applied {driverInfo.appliedDate}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 text-[12px] font-medium text-[#475569]">
                <span className="flex items-center gap-1">
                  <Icon icon="lucide:mail" width="14" className="opacity-70" /> {driverInfo.email}
                </span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1">
                  <Icon icon="lucide:map-pin" width="14" className="opacity-70" /> {driverInfo.location}
                </span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1">
                  <Icon icon="lucide:phone" width="14" className="opacity-70" /> {driverInfo.phone}
                </span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1">
                  <Icon icon="solar:screencast-2-linear" width="14" className="opacity-70" /> {driverInfo.vehicle} · {driverInfo.plate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <button className="flex items-center gap-2 px-5 py-2 bg-[#E0FFED] border border-[#219653] text-[#219653] rounded-lg text-sm font-bold transition-all  shadow-sm">
              <Icon icon="gg:check-o" width="18" />
              Approve
            </button>
            <button className="flex items-center gap-2 px-5 py-2 border border-[#EA3D2A] text-[#EA3D2A] rounded-lg text-sm font-bold  transition-all bg-[#FFEDEB] active:scale-95 shadow-sm">
              <Icon icon="lucide:x" width="18" />
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-md border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[500px]">
        {/* Driver Information Section */}
        <div className="p-5 space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-[#181211]">Driver Information</h2>
            <p className="text-sm font-medium text-[#64748B]">Key details including driver type, vehicle, and compliance status.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-18 max-w-5xl">
            <div className="space-y-0.5">
              <p className="text-[13px] font-semibold text-[#181211]">Driver Type</p>
              <p className="text-xl font-semibold text-[#181211]">{driverInfo.type}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[13px] font-semibold text-[#181211]">Current Status</p>
              <p className="text-xl font-semibold text-[#181211]">{driverInfo.status}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[13px] font-semibold text-[#181211]">Vehicle</p>
              <p className="text-xl font-semibold text-[#181211]">{driverInfo.vehicle}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[13px] font-semibold text-[#181211]">Plate</p>
              <p className="text-xl font-semibold text-[#181211]">{driverInfo.plate}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[13px] font-semibold text-[#181211]">Licence No.</p>
              <p className="text-xl font-semibold text-[#181211]">{driverInfo.licenceNo}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[13px] font-semibold text-[#181211]">Insurance</p>
              <p className="text-xl font-semibold text-[#181211]">{driverInfo.insurance}</p>
            </div>
          </div>
        </div>

        {/* Compliance Documents Section */}
        <div className="p-5 space-y-6">
          <h2 className="text-xl font-semibold text-[#181211]">Compliance Documents</h2>

          <div className="space-y-2">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between p-2.5 rounded-md transition-all bg-[#F6FBFF]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11.5 h-11.5 rounded-md flex items-center justify-center shrink-0 ${doc.status === 'Verified' ? 'bg-[#CDFFE2] text-[#219653]' :
                    doc.status === 'Reviewing' ? 'bg-[#FFF7E8] text-[#F29339]' :
                      'bg-[#FEF2F2] text-[#EA3D2A]'
                    }`}>
                    <Icon icon="gala:file-document" width="22" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[15px] font-semibold text-[#181211] leading-tight">{doc.name}</h4>
                    <p className="text-[13px] text-[#64748B] font-medium">{doc.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  {doc.status === 'Verified' && (
                    <>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#CDFFE2] border border-[#219653] text-[#219653] rounded-md text-[13px] font-semibold">
                        <Icon icon="hugeicons:tick-02" width="16" strokeWidth={3} />
                        Verified
                      </span>
                      <button className="px-3 py-1.5 bg-[#DAE9FF] border border-[#0066FF] text-[#0066FF] rounded-md text-[13px] font-semibold transition-all ">
                        View
                      </button>
                    </>
                  )}
                  {doc.status === 'Missing' && (
                    <>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEDEB] border border-[#EA3D2A] text-[#EA3D2A] rounded-md text-sm font-semibold">
                        <Icon icon="lucide:x" width="16" strokeWidth={3} />
                        Missing
                      </span>
                      <button className="px-3 py-1.5 bg-[#DAE9FF] border border-[#0066FF] text-[#0066FF] rounded-md text-[13px] font-semibold transition-all ">
                        Request
                      </button>
                    </>
                  )}
                  {doc.status === 'Reviewing' && (
                    <>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF7E8] border border-[#FF9F40] text-[#FF9F40] rounded-md text-[13px] font-semibold mr-1">
                        <Icon icon="mdi:timer-sand" width="16" />
                        Reviewing
                      </span>
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-[#219653] text-white rounded-md text-sm font-semibold shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] transition-all  active:scale-95">
                        <Icon icon="lucide:check" width="16" strokeWidth={3} />
                        Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEDEB] border border-[#EA3D2A] text-[#EA3D2A] rounded-md text-sm font-semibold">
                        <Icon icon="lucide:x" width="16" strokeWidth={3} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredDriverDetails;
