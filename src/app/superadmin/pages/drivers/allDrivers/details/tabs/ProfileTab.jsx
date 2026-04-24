import React from 'react';

const ProfileTab = ({ driver }) => {
    const infoGroups = [
        { label: 'Driver Type', value: driver.type || 'In-house' },
        { label: 'Current Status', value: driver.onDuty || 'En Route' },
        { label: 'Vehicle', value: driver.vehicleModel || 'Toyota Corolla' },
        { label: 'Plate', value: driver.plate || 'ABC-1234' },
        { label: 'Licence No.', value: driver.licenceNo || 'ON-D12345' },
        { label: 'Insurance', value: driver.insurance || 'Valid · Exp Dec 2026' },
        { label: 'Top Store', value: driver.topStore || 'Forest Oasis' },
        { label: 'This Month', value: driver.monthlyEarnings || '$892' },
        { label: 'Shifts', value: driver.shifts || '22 shifts' },
        { label: 'Hours Worked', value: driver.hoursWorked || '176 hrs' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20 max-w-5xl">
            {infoGroups.map((group, idx) => (
                <div key={idx} className="space-y-2">
                    <p className="text-[13px] font-semibold text-[#181211] mb-3">{group.label}</p>
                    <p className="text-[22px] font-semibold text-[#181211]">{group.value}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfileTab;
