import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Input from '../components/common/Input';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Handle form submission logic here
    };

    return (
        <div className="w-full bg-[#F8F6F6] font-sans py-12 md:py-20 px-6 sm:px-10 lg:px-20 min-h-screen">
            <div className="max-w-[1700px] mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <span className="text-[#E93E2B] text-sm md:text-base font-extrabold uppercase mb-3 block">GET IN TOUCH</span>
                    <h1 className="text-[#181211] font-extrabold text-4xl tracking-tight mb-2">
                        Contact <span className="text-[#E93E2B]">Us</span>
                    </h1>
                    <p className="text-[#636363] text-sm md:text-base leading-relaxed font-normal">
                        We're Here to help! Whether you have a Question about our products, or anything's else - our team is always ready to assist you.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Left Info Column */}
                    <div className="w-full lg:w-[35%] bg-white rounded-4xl p-8 md:p-10 shadow-[0px_2px_20px_0px_#2546151A]">
                        <div className="space-y-12">
                            {/* Contact Us Info */}
                            <div className="flex items-start gap-5">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0px_0px_27px_0px_#E93E2B2B] mt-4">
                                    <Icon icon="mage:contact-book" width="34" height="34" className="text-[#181211]" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-[#2C2F2C] font-extrabold text-xl">Contact Us</h3>
                                    <div className="space-y-2">
                                        <p className="text-[#707070] text-base font-medium">
                                            PHONE: (647) 991-6104
                                        </p>
                                        <p className="text-[#707070] text-base font-medium">
                                            EMAIL: sales@shroomexpress.ca
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sales Support Info */}
                            <div className="flex items-start gap-5">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0px_0px_27px_0px_#E93E2B2B] mt-4">
                                    <Icon icon="hugeicons:customer-support" width="34" height="34" className="text-[#181211] " />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-[#2C2F2C] font-extrabold text-xl">Sales Support</h3>
                                    <div className="space-y-2">
                                        <p className="text-[#707070] text-base font-medium">
                                            PHONE: (647) 991-6104
                                        </p>
                                        <p className="text-[#707070] text-base font-medium">
                                            EMAIL: sales@shroomexpress.ca
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="">
                                <h4 className="text-[#2C2F2C] font-extrabold text-xl mb-4">Follow Us</h4>
                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-[#181211] hover:opacity-80 transition-opacity">
                                        <Icon icon="bi:twitter-x" width="30" height="30" />
                                    </a>
                                    <a href="#" className="text-[#E60023] hover:opacity-80 transition-opacity">
                                        <Icon icon="logos:pinterest" width="30" height="30" />
                                    </a>
                                    <a href="#" className="text-[#FF4500] hover:opacity-80 transition-opacity">
                                        <Icon icon="logos:reddit-icon" width="30" height="30" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Column */}
                    <div className="w-full lg:w-[65%] bg-white rounded-4xl shadow-[0px_2px_20px_0px_#2546151A] p-5 md:p-10 ">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Firstname"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Jeo"
                                    className="px-4 py-3 rounded-lg"
                                    labelClassName="font-semibold text-[#181211]"
                                />
                                <Input
                                    label="Lastname"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Deo"
                                    className="px-4 py-3 rounded-lg"
                                    labelClassName="font-semibold text-[#181211]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 000-1234"
                                    className="px-4 py-3 rounded-lg"
                                    labelClassName="font-semibold text-[#181211]"
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    placeholder="alex.j@logitrack.com"
                                    className="px-4 py-3 rounded-lg"
                                    labelClassName="font-semibold text-[#181211]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[#181211] text-sm font-semibold block">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Describe your message here..."
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] focus:border-[#E93E2B] outline-none transition-all font-normal text-sm text-[#181211] placeholder:text-[#BDBDBD] resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#E93E2B] text-white py-3 rounded-full font-semibold text-base hover:bg-[#D33524] transition-all shadow-md active:scale-[0.98] mt-2"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
