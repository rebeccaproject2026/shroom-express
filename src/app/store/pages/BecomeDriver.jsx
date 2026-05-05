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
        <div className="w-full overflow-x-hidden font-sans">
            {/* Hero Section - Reverted to full-width background, but matching left-side content style of MainHome */}
            <section
                className="h-[500px] md:h-[600px] bg-[#FEF1F0] bg-cover bg-[position:right_center] flex items-center relative w-full"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="w-full px-6 sm:px-10 lg:px-20">
                    {/* Left Side Content - Matching MainHome.jsx styling */}
                    <div className="w-[60%] md:w-[55%] flex flex-col items-start z-10 pr-2 sm:px-10 lg:pl-20 ">
                        {/* Badge - Styled like MainHome */}
                        <div className="bg-[#E93E2B]/10 text-[#E93E2B] text-[8px] sm:text-[11px] font-extrabold px-3 py-1 sm:px-4 sm:py-2 rounded-full uppercase tracking-widest mb-2 sm:mb-3 mt-1">
                            JOIN OUR TEAM
                        </div>

                        {/* Heading - Styled like MainHome */}
                        <h1 className="text-[#181211] font-extrabold text-lg sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1]">
                            Become a <span className="text-[#E93E2B]">Delivery</span><br />
                            <span className="text-[#E93E2B]">Partner</span>
                        </h1>

                        {/* Subtitle - Styled like MainHome */}
                        <p className="text-[#886663] text-[10px] leading-relaxed sm:text-base font-medium max-w-md mt-2 sm:mt-3">
                            Earn more by delivering happiness. Flexible hours,<br className="hidden sm:block" />
                            easy onboarding, and exciting growth opportunities.
                        </p>

                        {/* Apply Button */}
                        <button className="bg-[#E93E2B] text-white pl-5.5 pr-5.5 py-2  rounded-lg text-[10px] sm:text-base font-bold flex items-center gap-2 cursor-pointer transition-all mt-4 sm:mt-4 ">
                            Apply Now
                            <div className="items-center justify-center text-white">
                                <Icon icon="carbon:next-filled" className="text-xl" />
                            </div>
                        </button>

                        {/* Features Row */}
                        <div className="flex flex-wrap gap-2 sm:gap-5 mt-4 sm:mt-6">
                            <div className="flex items-center gap-1 text-[10px] sm:text-[15px] font-bold text-[#181811]">
                                <Icon icon="material-symbols:bolt" className="text-yellow-400 text-sm sm:text-2xl" /> Quick Approval
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[15px] font-bold text-[#181811]">
                                <Icon icon="fluent:rocket-20-filled" className="text-[#E93E2B] text-sm sm:text-2xl" /> Easy Onboarding
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[15px] font-bold text-[#181811]">
                                <Icon icon="mdi:alarm-clock" className="text-[#E93E2B] text-sm sm:text-2xl" /> Flexible Hours
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section className="py-14 pb-0 mb-8 bg-[#F8F6F6]">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="text-center mb-7">
                        <h2 className="text-[28px] font-bold mb-3 text-[#000000]">Partner Registration</h2>
                        <p className="text-[#898989] text-sm font-semibold sm:text-base">Fill your details to start your journey with us</p>
                    </div>

                    <div className="max-w-[60%] mx-auto bg-white border border-[#E93E2B]/40 rounded-3xl p-6 px-10 shadow-sm">
                        <div className="flex justify-start mb-5">
                            <div className="relative">
                                <div className="w-[70px] h-[70px] rounded-full overflow-hidden border border-[#E8E8E8]">
                                    <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-[#E93E2B] text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                    <Icon icon="hugeicons:camera-01" width="12" height="12" />
                                </div>
                            </div>
                        </div>

                        <form className="flex flex-col gap-4 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Alex Johnson"
                                className=" !border-[#E5DCDC] !py-2.5 font-medium "
                                labelClassName="!text-[#222222] !font-bold !mb-1"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                            <Input
                                label="Home Address"
                                name="homeAddress"
                                value={formData.homeAddress}
                                onChange={handleInputChange}
                                placeholder="742 Evergreen Terrace, Springfield"
                                className=" !border-[#E5DCDC] !py-2.5 font-medium "
                                labelClassName="!text-[#222222] !font-bold !mb-1"
                            />

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#222222]">Vehicle Type</label>
                                <div className="relative flex items-center">
                                    <select
                                        name="vehicleType"
                                        className="w-full pl-4 pr-10 py-2.5 text-sm border border-[#E5DCDC] bg-white text-[#333333] font-medium appearance-none focus:outline-none rounded-md transition-all"
                                        value={formData.vehicleType}
                                        onChange={handleInputChange}
                                    >
                                        <option>Delivery Van</option>
                                        <option>Motorcycle</option>
                                        <option>Car</option>
                                    </select>
                                    <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-gray-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-bold text-[#222222] uppercase tracking-wide">WORKING DAYS</label>
                                <div className="flex flex-wrap gap-2.5">
                                    {days.map(day => {
                                        const isActive = formData.workingDays.includes(day);
                                        return (
                                            <div
                                                key={day}
                                                className={`flex flex-col items-center justify-center w-[60px] h-[60px] border-[1.5px] rounded-xl cursor-pointer transition-all ${isActive ? 'bg-[#FFF0EE] border-[#E93E2B] text-[#E93E2B]' : 'bg-[#F9F9F9] border-[#E8E8E8] text-[#4B5563]'}`}
                                                onClick={() => toggleDay(day)}
                                            >
                                                <span className="text-[11px] font-bold mb-1">{day}</span>
                                                {isActive ? (
                                                    <Icon icon="solar:check-circle-linear" width="18" height="18" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full border border-[#636363]"></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#1F2937]">Start Time</label>
                                    <div className="relative">
                                        <Icon icon="iconamoon:clock-light" width="20" height="20" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                        <select
                                            name="startTime"
                                            className="w-full pl-11 pr-10 py-2.5 text-sm border border-[#E8E8E8] bg-white text-[#333333] font-medium appearance-none focus:outline-none rounded-md transition-all"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                        >
                                            <option>09:00 AM</option>
                                            <option>10:00 AM</option>
                                        </select>
                                        <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-gray-400" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#1F2937]">End Time</label>
                                    <div className="relative">
                                        <Icon icon="iconamoon:clock-light" width="20" height="20" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                        <select
                                            name="endTime"
                                            className="w-full pl-11 pr-10 py-2.5 text-sm border border-[#E8E8E8] bg-white text-[#333333] font-medium appearance-none focus:outline-none rounded-md transition-all"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                        >
                                            <option>09:00 AM</option>
                                            <option>06:00 PM</option>
                                        </select>
                                        <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-[#E93E2B] text-white py-3.5 rounded-xl text-lg font-semibold cursor-pointer  transition-all shadow-lg shadow-red-500/10 ">
                                Complete & continue
                            </button>
                        </form>
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
