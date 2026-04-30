import React from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import ReusableSearchInput from '../../../components/common/ReusableSearchInput';
import RejectDriverModal from './RejectDriverModal';

const RegisteredDrivers = () => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = React.useState('');
  const breadcrumbItems = [
    { label: "Dashboard", path: "/superadmin/dashboard" },
    { label: "Resume/ New Registered" }
  ];

  const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = React.useState(null);

  const stats = [
    {
      label: 'Total Applicants',
      value: '4',
      borderColor: 'border-[#475569]',
      bgColor: 'bg-[#F8F8F8]',
      textColor: 'text-[#181211]'
    },
    {
      label: 'Pending',
      value: '1',
      borderColor: 'border-[#F2994A]',
      bgColor: 'bg-[#FFF7E8]',
      textColor: 'text-[#F2994A]'
    },
    {
      label: 'Approved',
      value: '2',
      borderColor: 'border-[#219653]',
      bgColor: 'bg-[#E0FFED]',
      textColor: 'text-[#219653]'
    },
    {
      label: 'Rejected',
      value: '1',
      borderColor: 'border-[#EA3D2A]',
      bgColor: 'bg-[#FFEDEB]',
      textColor: 'text-[#EA3D2A]'
    },
  ];

  const applicants = [
    {
      id: 1,
      name: 'Sophie Turner',
      email: 'sophie.t@email.ca',
      phone: '+1 416-212-1012',
      location: 'Brampton',
      vehicle: 'Chevrolet Spark 2022',
      appliedDate: 'Mar 05, 2026',
      status: 'Approved',
      type: 'ShroomExpress Driver',
      initials: 'ST',
      avatarBg: 'bg-[#FFEDEB]',
      initialsColor: 'text-[#EA3D2A]'
    },
    {
      id: 2,
      name: 'Ethan Walsh',
      email: 'ethan.w@email.ca',
      phone: '+1 647-213-1013',
      location: 'Ottawa',
      vehicle: 'Toyota Yaris 2021',
      appliedDate: 'Mar 04, 2026',
      status: 'Pending',
      type: 'Store Driver',
      initials: 'EW',
      avatarBg: 'bg-[#EBF5FF]',
      initialsColor: 'text-[#2F80ED]',
      actions: ['View', 'Approve', 'Reject']
    },
    {
      id: 3,
      name: 'Zara Okonkwo',
      email: 'zara.o@email.ca',
      phone: '+1 416-214-1014',
      location: 'Brampton',
      vehicle: 'Nissan Versa 2023',
      appliedDate: 'Mar 03, 2026',
      status: 'Rejected',
      type: 'In-house Driver',
      initials: 'ZO',
      avatarBg: 'bg-[#FFEDEB]',
      initialsColor: 'text-[#EB5757]',
      isRejected: true,
      alert: "The applicant did not provide a valid driver's license, which is required for driver approval. Without verified licensing documents, the application cannot proceed."
    },
    {
      id: 4,
      name: 'Felix Nguyen',
      email: 'felix.n@email.ca',
      phone: '+1 647-215-1015',
      location: 'Ottawa',
      vehicle: 'Honda Civic 2020',
      appliedDate: 'Mar 02, 2026',
      status: 'Approved',
      type: 'In-house Driver',
      initials: 'FN',
      avatarBg: 'bg-[#FFF9EB]',
      initialsColor: 'text-[#F2994A]'
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return 'text-[#219653] border-[#219653]';
      case 'Pending': return ' text-[#D26D0A] border-[#D26D0A]';
      case 'Rejected': return ' text-[#EA3D2A] border-[#EA3D2A]';
      default: return 'text-gray-600 border-gray-300';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-manrope">
      <div className="flex flex-col gap-2 mb-3">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-[#181211]">Resume / New Registered</h1>
            <p className="text-[#475569] font-medium text-sm">Review driver applications, uploaded resumes, and onboard approved applicants.</p>
          </div>
          <Link
            to="/superadmin/drivers/add"
            className="bg-[#EA3D2A] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-bold tracking-wide shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:opacity-90 transition-all flex items-center gap-2 active:scale-95 shrink-0"
          >
            <Icon icon="mdi:account-plus" width="20" />
            Add Driver
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={` bg-white p-3 rounded-lg border border-t-[5px] $ ${stat.borderColor} shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:shadow-md cursor-default`}
          >
            <div className="space-y-4">
              <p className="text-[#475569] text-sm font-medium tracking-wide mb-2">{stat.label}</p>
              <h3 className="text-2xl font-semibold text-[#181211] leading-none mb-2">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden flex flex-col min-h-0 shadow-sm">
        <div className="p-4 border-b border-[#F1F5F9] bg-white sticky top-0 z-10">
          <div className="max-w-md">
            <ReusableSearchInput
              placeholder="Search name, email, or phone..."
              value={searchFilter}
              onChange={(val) => setSearchFilter(val)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#475569]">Showing <span className="text-[#181211]">4</span> of <span className="text-[#181211]">4 applicants</span></p>
          </div>

          <div className="border border-[#E2E8F0] rounded-md overflow-hidden divide-y divide-[#E2E8F0]">
            {applicants.map((app) => (
              <div
                key={app.id}
                className={`p-3 transition-all flex flex-col gap-4 ${app.isRejected ? 'bg-[#FFEDEB]' : 'bg-white'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${app.avatarBg} ${app.initialsColor}`}>
                      {app.initials}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-semibold text-[#181211]">{app.name}</h4>
                      <p className="text-sm font-medium text-[#181211]">
                        {app.email} · <span className="">{app.phone}</span>
                      </p>
                      <p className="text-[13px] font-medium text-[#475569]">
                        {app.location} · {app.vehicle} · Applied on {app.appliedDate}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border-2 ${getStatusStyle(app.status)}`}>
                          {app.status}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#0066FF] text-[#0066FF] bg-[#EBF5FF]">
                          {app.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {app.actions ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/superadmin/drivers/resume/details/${app.id}`)}
                          className="px-4 py-2 rounded-md border border-[#0066FF] text-[#0066FF] text-sm font-semibold flex items-center gap-1.5 hover:bg-[#EBF5FF] transition-all bg-[#F6FBFF] shadow-[0px_4px_6px_-4px_#0066FF33,0px_10px_15px_-3px_#0066FF33]"
                        >
                          <Icon icon="majesticons:eye-line" width="18" />
                          View
                        </button>
                        <button className="px-4 py-2 rounded-md border border-[#219653] text-[#219653] text-sm font-semibold flex items-center gap-1.5 hover:bg-[#E0FFED] transition-all bg-[#E0FFED] shadow-[0_4px_6px_-4px_#21965333,0_10px_15px_-3px_#21965333]">
                          <Icon icon="gg:check-o" width="18" />
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDriver(app);
                            setIsRejectModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-md border border-[#EB5757] text-[#EB5757] text-sm font-semibold flex items-center gap-1.5 bg-[#FFEDEB] transition-all "
                        >
                          <Icon icon="lucide:x" width="18" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(`/superadmin/drivers/resume/details/${app.id}`)}
                        className="px-4 py-2 rounded-md border border-[#0066FF] text-[#0066FF] text-[13px] font-bold flex items-center gap-1.5 hover:bg-[#EBF5FF] transition-all bg-[#F6FBFF] shadow-[0px_4px_6px_-4px_#0066FF33,0px_10px_15px_-3px_#0066FF33]"
                      >
                        <Icon icon="lucide:eye" width="18" />
                        View
                      </button>
                    )}
                  </div>
                </div>

                {app.alert && (
                  <div className="ml-11 bg-white border border-[#FFC8C2] rounded-md p-2 flex gap-3 animate-in fade-in duration-500">
                    <Icon icon="lucide:alert-triangle" className="text-[#EA3D2A] shrink-0 mt-0.5" width="16" />
                    <p className="text-[11px] font-medium text-[#EA3D2A] leading-relaxed">
                      {app.alert.split('driver\'s license').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <span className="font-semibold text-[#EA3D2A]">driver's license</span>}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <RejectDriverModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        driver={selectedDriver}
        onConfirm={(reason) => {
          console.log('Rejected driver:', selectedDriver?.id, 'with reason:', reason);
          // Add your rejection API call here
        }}
      />
    </div>
  );
};

export default RegisteredDrivers;
