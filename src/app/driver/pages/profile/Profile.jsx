import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import profile from "../../assets/images/profile.jpg";

const Profile = () => {
    const [vehicleType, setVehicleType] = useState('Delivery Van');
    const [startTime, setStartTime] = useState('09:00 AM');
    const [endTime, setEndTime] = useState('09:00 AM');
    const [contactName, setContactName] = useState('Sarah Doe');

    return (
        <div className="p-4  bg-[#F5F5F5]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-[#222222]">
                    👋 Welcome, David Doe
                </h1>
            </div>

            {/* Scrollable Content Arena */}
            <div className="flex-1 min-h-0  pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

                    {/* Personal Information */}
                    <div className="lg:col-span-2 bg-white rounded-md shadow-sm border border-[#E8E8E8] flex flex-col">
                        {/* Card Header */}
                        <div className="px-5 py-4 border-b border-[#D1D5DB] flex items-center gap-2">
                            <Icon icon="proicons:person-2" width="22" height="22" className="text-[#0F4CBD]" />
                            <h2 className="text-[15px] font-semibold text-[#222222]">Personal Information</h2>
                        </div>
                        {/* Card Body */}
                        <div className="p-5 flex-1">
                            {/* Avatar */}
                            <div className="grid grid-cols-1 border-b border-[#D1D5DB] mb-5">
                                <div className="relative w-[70px] h-[70px] mb-4.5">
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover border border-[#E8E8E8]"
                                    />
                                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#1142D4] rounded-full flex items-center justify-center border-2 border-white text-white hover:bg-blue-700 transition-colors">
                                        <Icon icon="hugeicons:camera-01" width="12" height="12" />
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                                <Input
                                    label="Full Name"
                                    defaultValue="Alex Johnson"
                                    className="!text-[#777777]"
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    defaultValue="alex.j@logitrack.com"
                                    className="!text-[#777777]"
                                />
                                <Input
                                    label="Phone Number"
                                    defaultValue="+1 (555) 000-1234"
                                    className="!text-[#777777]"
                                />
                                <Input
                                    label="Home Address"
                                    defaultValue="742 Evergreen Terrace, Springfield"
                                    className="!text-[#777777]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="lg:col-span-1 bg-white rounded-md shadow-sm border border-[#E8E8E8] flex flex-col">
                        {/* Card Header */}
                        <div className="px-5 py-4 border-b border-[#E8E8E8] flex items-center gap-2.5">
                            <Icon icon="fluent:vehicle-car-28-regular" width="22" height="22" className="text-[#0F4CBD]" />
                            <h2 className="text-[15px] font-semibold text-[#222222]">Vehicle Details</h2>
                        </div>
                        {/* Card Body */}
                        <div className="p-5 flex flex-col gap-4 flex-1">
                            <div>
                                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Vehicle Type</label>
                                <Select
                                    selectOption={vehicleType}
                                    onSelect={(label) => setVehicleType(label)}
                                    options={[
                                        { label: 'Delivery Van', value: 'Delivery Van' },
                                        { label: 'Box Truck', value: 'Box Truck' },
                                        { label: 'Motorcycle', value: 'Motorcycle' }
                                    ]}
                                    className="!text-[#777777]"
                                />
                            </div>
                            <Input
                                label="License Plate"
                                defaultValue="LOGI-TX-2024"
                                className="!text-[#777777]"
                            />
                            <Input
                                label="Model / Year"
                                defaultValue="Mercedes-Benz Sprinter (2022)"
                                className="!text-[#777777]"
                            />
                        </div>
                    </div>

                    {/* Availability Schedule */}
                    <div className="lg:col-span-2 bg-white rounded-md shadow-sm border border-[#E8E8E8] flex flex-col">
                        {/* Card Header */}
                        <div className="px-5 py-4 border-b border-[#E8E8E8] flex items-center gap-2.5">
                            <Icon icon="akar-icons:schedule" width="22" height="22" className="text-[#0F4CBD]" />
                            <h2 className="text-[15px] font-semibold text-[#222222]">Availability Schedule</h2>
                        </div>
                        {/* Card Body */}
                        <div className="p-5 flex-1">
                            <label className="block text-xs font-bold text-[#334155] uppercase tracking-wide mb-3">WORKING DAYS</label>

                            <div className="flex flex-wrap gap-2.5 mb-6">
                                {/* Active Days */}
                                {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day) => (
                                    <div key={day} className="flex flex-col items-center justify-center w-[55px] h-[55px] border-[1.5px] border-[#0F4CBD] rounded-md bg-[#DBEAFE]/50 cursor-pointer hover:bg-blue-50 transition-colors">
                                        <span className="text-[11px] font-bold text-[#0F4CBD] mb-1">{day}</span>
                                        <Icon icon="solar:check-circle-linear" width="18" height="18" className="text-[#0F4CBD]" />
                                    </div>
                                ))}
                                {/* Inactive Days */}
                                {['FRI', 'SAT'].map((day, ix) => (
                                    <div key={`${day}-${ix}`} className="flex flex-col items-center justify-center w-[52px] h-[56px] border border-[#E8E8E8] rounded-md bg-[#F4F4F4] cursor-pointer hover:bg-gray-100 transition-colors">
                                        <span className="text-[11px] font-bold text-[#3F4753] mb-1">{day}</span>
                                        <div className="w-4 h-4 rounded-full border border-[#636363]"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#334155] mb-1.5">Start Time</label>
                                    <div className="relative">
                                        <Icon icon="iconamoon:clock-light" width="19" height="19" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                        <Select
                                            selectOption={startTime}
                                            onSelect={(label) => setStartTime(label)}
                                            options={[
                                                { label: '08:00 AM', value: '08:00 AM' },
                                                { label: '09:00 AM', value: '09:00 AM' },
                                                { label: '10:00 AM', value: '10:00 AM' }
                                            ]}
                                            className="pl-9 !text-[#777777]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#334155] mb-1.5">End Time</label>
                                    <div className="relative">
                                        <Icon icon="iconamoon:clock-light" width="19" height="19" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                        <Select
                                            selectOption={endTime}
                                            onSelect={(label) => setEndTime(label)}
                                            options={[
                                                { label: '05:00 PM', value: '05:00 PM' },
                                                { label: '06:00 PM', value: '06:00 PM' },
                                                { label: '09:00 AM', value: '09:00 AM' }
                                            ]}
                                            className="pl-9 !text-[#777777]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="lg:col-span-1 bg-white rounded-md shadow-sm border border-[#E8E8E8] flex flex-col">
                        {/* Card Header */}
                        <div className="px-5 py-4 border-b border-[#E8E8E8] flex items-center gap-2.5">
                            <Icon icon="material-symbols:e911-emergency-outline-rounded" width="22" height="22" className="text-[#0F4CBD]" />
                            <h2 className="text-[15px] font-semibold text-[#222222]">Emergency Contact</h2>
                        </div>
                        {/* Card Body */}
                        <div className="p-5 flex flex-col gap-4 flex-1">
                            <div>
                                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Contact name</label>
                                <Select
                                    selectOption={contactName}
                                    onSelect={(label) => setContactName(label)}
                                    options={[
                                        { label: 'Sarah Doe', value: 'Sarah Doe' },
                                        { label: 'John Smith', value: 'John Smith' },
                                        { label: 'Emma Wilson', value: 'Emma Wilson' }
                                    ]}
                                    className="!text-[#777777]"
                                />
                            </div>
                            <Input
                                label="Relationship"
                                defaultValue="Spouse"
                                className="!text-[#777777]"
                            />
                            <Input
                                label="Phone Number"
                                defaultValue="+1 (555) 000-1234"
                                className="!text-[#777777]"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
