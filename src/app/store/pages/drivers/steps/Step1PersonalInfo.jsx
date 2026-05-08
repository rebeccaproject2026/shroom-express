import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../components/common/Input';
import profileImg from '../../../assets/images/profile.jpg';
import DriverLicenseUpload from '../../../../admin/components/common/DriverLicenseUpload';

const Step1PersonalInfo = ({ formData, setFormData }) => {
    React.useEffect(() => {
        if (!formData.firstName) {
            setFormData({
                ...formData,
                firstName: 'Alex',
                lastName: 'Johnson',
                phoneNumber: '+1 (555) 012-3456',
                email: 'alex.johnson@example.com',
                homeAddress: '123 Maple Avenue, Toronto, ON M5V 2T6'
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Image Section */}
            <div className="flex justify-center mb-4 relative z-20">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-[6px] border-white shadow-xl bg-white">
                        <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#2D88FF] text-white p-2 rounded-full border-4 border-white shadow-md cursor-pointer hover:bg-blue-600 transition-colors">
                        <Icon icon="hugeicons:camera-01" width="18" height="18" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Alex"
                    className=" !border-[#E5DCDC] !py-2.5 font-medium "
                    labelClassName="!text-[#222222] !font-bold !mb-1"
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Johnson"
                    className=" !border-[#E5DCDC] !py-2.5 font-medium "
                    labelClassName="!text-[#222222] !font-bold !mb-1"
                />
            </div>

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
                    className="w-full rounded-md px-4 !py-2.5 border !border-[#E5DCDC] bg-white focus:outline-none focus:border-[#E93E2B] transition-colors resize-none font-medium text-sm text-[#181211]"
                ></textarea>
            </div>

            {/* Personal Identification Section */}
            <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
                <h2 className="text-sm sm:text-base font-bold text-[#222222]">
                    Personal Identification
                </h2>

                <div className="flex flex-col gap-2">
                    <label className="text-xs sm:text-sm font-bold text-[#222222]">
                        Upload Driver License (Front and back side)
                    </label>

                    <DriverLicenseUpload
                        currentFront={formData.licenseFront || ""}
                        currentBack={formData.licenseBack || ""}
                        onUploadFront={(file) => setFormData({ ...formData, licenseFront: file })}
                        onUploadBack={(file) => setFormData({ ...formData, licenseBack: file })}
                    />
                </div>
            </div>
        </div>
    );
};

export default Step1PersonalInfo;
