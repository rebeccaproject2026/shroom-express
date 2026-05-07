import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import heroImg from '../assets/images/becamdriver.png';
import journeyImg from '../assets/images/becamdriverfooter.png';
import profileImg from '../assets/images/profile.jpg';
import Input from '../components/common/Input';
import Select from '../components/common/Select';

const BecomeDriver = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        homeAddress: '',
        vehicleType: 'Delivery Van',
        licensePlate: '',
        modelYear: '',
        workingDays: ['MON', 'TUE', 'WED', 'THU'],
        startTime: '09:00 AM',
        endTime: '09:00 AM',
        emergencyContactName: '',
        emergencyRelationship: '',
        emergencyPhoneNumber: ''
    });

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const toggleDay = (day) => {
        if (formData.workingDays.includes(day)) {
            setFormData({ ...formData, workingDays: formData.workingDays.filter(d => d !== day) });
        } else {
            setFormData({ ...formData, workingDays: [...formData.workingDays, day] });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="w-full overflow-x-hidden font-sans bg-white">
            {/* Hero & Registration Section */}
            <section
                className="py-12 md:py-12 relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }}
            >

                <div className="max-w-[1350px] mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 ">
                        {/* Form Card */}
                        <div className="w-full max-w-[550px] bg-white rounded-[20px] overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] border border-[#E93E2B]/40 flex flex-col h-[750px]">
                            {/* Card Header - Red (Fixed) */}
                            <div className="bg-[#E93E2B] text-white p-6 pb-12 relative flex-shrink-0">
                                <button
                                    onClick={() => window.history.back()}
                                    className="absolute left-6 top-6 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white border border-white/20"
                                >
                                    <Icon icon="lucide:arrow-left" width="20" />
                                </button>
                                <div className="text-center">
                                    <h2 className="text-2xl font-semibold tracking-tight mb-1">Become Driver Registration</h2>
                                    <p className="text-base font-medium opacity-95">Fill your details to start your journey with us</p>
                                </div>
                            </div>

                            {/* Form Content Wrapper (Scrollable area inside) */}
                            <div className="flex-1 flex flex-col -mt-10 bg-white relative overflow-hidden">
                                {/* Scrollable Fields Area */}
                                <div className="flex-1 overflow-y-auto px-8 md:px-10 custom-scrollbar pb-6 pt-5">
                                    <form id="driver-form" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                        {/* Form Section Header */}
                                        <div className="flex justify-center  mb-10 relative z-20">
                                            <div className="relative">
                                                <div className="w-28 h-28 rounded-full overflow-hidden border-[6px] border-white shadow-xl bg-white">
                                                    <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="absolute bottom-1 right-1 bg-[#2D88FF] text-white p-2 rounded-full border-4 border-white shadow-md cursor-pointer hover:bg-blue-600 transition-colors">
                                                    <Icon icon="hugeicons:camera-01" width="18" height="18" />
                                                </div>
                                            </div>
                                        </div>

                                        <Input
                                            label="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Alex Johnson"
                                            className=" !border-[#E5DCDC] !py-2.5 font-medium "
                                            labelClassName="!text-[#222222] !font-bold !mb-1"
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <Input
                                                label="Phone Number"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 000-1234"
                                                className=" !border-[#E5DCDC] !py-2.5 font-medium "
                                                labelClassName="!text-[#222222] !font-bold !mb-1"
                                            />
                                            <Input
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="alex.j@logitrack.com"
                                                className=" !border-[#E5DCDC] !py-2.5 font-medium "
                                                labelClassName="!text-[#222222] !font-bold !mb-1"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="!text-[#222222] text-sm !font-bold ">Home Address</label>
                                            <textarea
                                                name="homeAddress"
                                                value={formData.homeAddress}
                                                onChange={handleInputChange}
                                                placeholder="742 Evergreen Terrace, Springfield"
                                                rows="3"
                                                className="w-full rounded-md px-4 !py-2.5 border !border-[#E5DCDC] focus:outline-none focus:border-[#E93E2B] transition-colors resize-none font-medium text-sm text-[#181211]"
                                            ></textarea>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label className="!text-[#222222] text-sm !font-bold ">Vehicle Type</label>
                                            <Select
                                                name="vehicleType"
                                                value={formData.vehicleType}
                                                onChange={handleInputChange}
                                                options={[
                                                    { value: 'Delivery Van', label: 'Delivery Van' },
                                                    { value: 'Motorcycle', label: 'Motorcycle' },
                                                    { value: 'Car', label: 'Car' }
                                                ]}
                                                placeholder="Select Vehicle Type"
                                                className="!rounded-md !border-[#E5DCDC] !py-2.5"
                                            />
                                        </div>

                                        <Input
                                            label="License Plate"
                                            name="licensePlate"
                                            value={formData.licensePlate}
                                            onChange={handleInputChange}
                                            placeholder="LOGI-TX-2024"
                                            className=" !border-[#E5DCDC] !py-2.5 font-medium "
                                            labelClassName="!text-[#222222] !font-bold !mb-1"
                                        />
                                        <Input
                                            label="Model / Year"
                                            name="modelYear"
                                            value={formData.modelYear}
                                            onChange={handleInputChange}
                                            placeholder="Mercedes-Benz Sprinter (2022)"
                                            className=" !border-[#E5DCDC] !py-2.5 font-medium "
                                            labelClassName="!text-[#222222] !font-bold !mb-1"
                                        />

                                        {/* Restored WORKING DAYS */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-xs font-bold text-[#222222] uppercase tracking-wide">WORKING DAYS</label>
                                            <div className="flex flex-wrap gap-2.5">
                                                {days.map(day => {
                                                    const isActive = formData.workingDays.includes(day);
                                                    return (
                                                        <div
                                                            key={day}
                                                            className={`flex flex-col items-center justify-center w-[55px] h-[55px] border-[1.5px] rounded-xl cursor-pointer transition-all ${isActive ? 'bg-[#FFF0EE] border-[#E93E2B] text-[#E93E2B]' : 'bg-[#F9F9F9] border-[#E8E8E8] text-[#4B5563]'}`}
                                                            onClick={() => toggleDay(day)}
                                                        >
                                                            <span className="text-[10px] font-bold mb-1">{day}</span>
                                                            {isActive ? (
                                                                <Icon icon="solar:check-circle-linear" width="16" height="16" />
                                                            ) : (
                                                                <div className="w-3.5 h-3.5 rounded-full border border-[#636363]"></div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Restored SHIFT TIMINGS */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-bold text-[#222222]">Start Time</label>
                                                <div className="relative">
                                                    <Icon icon="iconamoon:clock-light" width="20" height="20" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                                    <input
                                                        type="time"
                                                        name="startTime"
                                                        className="w-full pl-11 pr-4 text-sm border !border-[#E5DCDC] !py-2.5 font-medium bg-white text-[#333333]  focus:outline-none rounded-md transition-all"
                                                        value={formData.startTime}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-bold text-[#222222]">End Time</label>
                                                <div className="relative">
                                                    <Icon icon="iconamoon:clock-light" width="20" height="20" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                                    <input
                                                        type="time"
                                                        name="endTime"
                                                        className="w-full pl-11 pr-4 text-sm border !border-[#E5DCDC] !py-2.5 font-medium bg-white text-[#333333]  focus:outline-none rounded-md transition-all"
                                                        value={formData.endTime}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Fixed Button Section (Outside scrollable area) */}
                                <div className="p-8 md:px-10 flex items-center flex-shrink-0 bg-white border-t border-gray-50 font-manrope gap-4">
                                    <button
                                        form="driver-form"
                                        type="submit"
                                        className="flex-1 py-3.5 bg-[#E93E2B] text-white rounded-xl text-base font-bold shadow-[0px_10px_25px_-5px_#E93E2B66] hover:bg-[#E93E2B]/90 transition-all flex items-center justify-center gap-3 active:scale-95"
                                    >
                                        Save & Continue
                                        <Icon icon="lucide:arrow-right" width="20" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder for spacing to keep form on the left if needed */}
                        <div className="flex-1 hidden lg:block"></div>

                    </div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-2 mb-8">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl  font-bold text-[#111827]">Why Join <span className="text-[#E93E2B]">Shroom Express?</span></h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-68">
                        {[
                            { title: 'High Earnings', desc: 'Earn more with every successful delivery.', icon: 'solar:wallet-outline' },
                            { title: 'Flexible Hours', desc: 'Work on your own schedule and enjoy complete freedom.', icon: "mdi:alarm" },
                            { title: 'Work Near You', desc: 'Get orders in your nearby area and save travel time.', icon: 'mdi:map-marker-outline' },
                            { title: 'Performance Rewards', desc: 'Top performers receive special rewards and exciting bonuses.', icon: 'solar:medal-ribbon-star-linear' },
                        ].map((benefit, i) => (
                            <div key={i} className="bg-[#FCF3F3] border border-[#F9CABC] rounded-[35px] p-5  text-center  hover:border-[#FFE4E1] transition-all group">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white rounded-full flex items-center justify-center shadow-[0px_0px_27px_0px_#E93E2B2B] text-2xl sm:text-3xl mx-auto mt-4 sm:mb-6 transition-transform">
                                    <Icon icon={benefit.icon} className="text-[#E93E2B] *:stroke-[1px]" width={28} height={28} />
                                </div>
                                <h3 className="text-[#181211] text-lg  font-extrabold mb-2.5 tracking-tight px-1.5 leading-tight">{benefit.title}</h3>
                                <p className="text-[#886663] text-sm sm:text-[16px] max-w-65 mx-auto leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section - Matching Hero Section Pattern */}
            <section
                className="relative w-full min-h-[342px] w-full mt-5 flex items-center bg-cover bg-center"
                style={{ backgroundImage: `url(${journeyImg})` }}
            >

                {/* Content */}
                <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-18">
                    <div className="max-w-2xl text-white">

                        <h2 className="text-3xl  font-bold mb-4 tracking-tight leading-[1.1]">
                            Ready to start your Journey?
                        </h2>

                        <p className="text-base w-100 text-[#FFFFFF] mb-10 leading-relaxed max-w-lg font-medium">
                            Join thousands of delivery partners who are earning and growing with Shroom Express.
                        </p>

                        <div className="flex flex-wrap items-center gap-10 sm:gap-20">

                            {/* Stat 1 */}
                            <div className="flex items-center gap-3">
                                <Icon icon="pepicons-pencil:people" className="text-4xl mb-3" />
                                <div>
                                    <span className="block text-2xl font-bold">10K+</span>
                                    <span className="text-sm md:text-base text-[#FFFFFF] font-medium">
                                        Active Partners
                                    </span>
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div className="flex items-center gap-3">
                                <Icon icon="si:city-line" className="text-4xl mb-3" />
                                <div>
                                    <span className="block text-2xl font-bold">20+</span>
                                    <span className="text-sm md:text-base text-[#FFFFFF] font-medium">
                                        Cities Covered
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BecomeDriver;
