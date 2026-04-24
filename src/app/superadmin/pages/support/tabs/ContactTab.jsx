import React from "react";
import { Icon } from "@iconify/react";
import Input from "../../../components/common/Input";

const InfoCard = ({ icon, title, subtitle, detail }) => (
    <div className="bg-[#FFEDEB] border border-[#EA3D2A] rounded-lg p-4 flex items-start gap-3 transition-all shadow-[0_1px_2px_0_#0000000D] cursor-pointer group">
        <div className="p-1  text-[#EA3D2A] ">
            <Icon icon={icon} width="35" />
        </div>
        <div className="space-y-1">
            <h4 className="text-lg font-semibold text-[#181211] leading-tight">{title}</h4>
            <p className="text-sm font-medium text-[#181211]">{subtitle}</p>
            <p className="text-sm font-medium  text-[#475569]">{detail}</p>
        </div>
    </div>
);

const ContactTab = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500 font-manrope">
            {/* ── Left Column: Contact Form ── */}
            <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-md p-5 space-y-6">
                <h2 className="text-[25px] font-semibold text-[#181211]">Send us a message</h2>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        label="Subject"
                        required
                        placeholder="e.g. issue with order refund"
                        borderClass="border border-[#E2E8F0]"
                        className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm outline-none transition-all placeholder:text-[#181211]/60   font-medium"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                    />

                    <Input
                        label="Your Name"
                        required
                        placeholder="Alex Morgan"
                        borderClass="border border-[#E2E8F0]"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                        className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm outline-none transition-all placeholder:text-[#181211]/60  text-[#181211] font-medium"
                    />

                    <Input
                        label="Email"
                        type="email"
                        required
                        placeholder="admin@shroomexpress.ca"
                        borderClass="border border-[#E2E8F0]"
                        labelClassName="text-[14.5px] font-semibold text-[#181211]"
                        className="w-full h-11 px-5 !bg-[#F8F8F8] rounded-lg text-sm outline-none transition-all placeholder:text-[#181211]/60  text-[#181211] font-medium"
                    />

                    <div className="space-y-1.5">
                        <label className="text-[14.5px] font-semibold text-[#181211] ">
                            Message <span className="text-[#EA3D2A] ml-0.5">*</span>
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Describe your issue in detail..."
                            className="w-full px-5 py-3.5 border border-[#E2E8F0] mt-1 !bg-[#F8F8F8] rounded-sm text-sm outline-none transition-all placeholder:text-[#94A3B8] placeholder:text-[#181211]/60  font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex-1 items-center gap-2 px-6 py-2.5 mb-4 bg-white text-[#475569] rounded-lg text-sm font-medium  transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 border border-[#E2E8F0]/50">
                            Cancel
                        </button>
                        <button className="flex-1 px-6 py-2.5 mb-4 bg-[#EA3D2A] text-white justify-center rounded-lg text-sm font-medium shadow-[0px_4px_6px_-4px_#EA3D2A33,0px_10px_15px_-3px_#EA3D2A33] hover:bg-[#EA3D2A]/90 transition-all flex items-center gap-2 active:scale-95">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            {/* ── Right Column: Support Cards ── */}
            <div className="flex flex-col gap-5">
                <InfoCard
                    icon="carbon:email"
                    title="Email Support"
                    subtitle="support@shroomexpress.ca"
                    detail="Response within 2 hours"
                />
                <InfoCard
                    icon="fluent:chat-16-regular"
                    title="Live Chat"
                    subtitle="Available in admin portal"
                    detail="Mon-Fri, 9am-6pm EST"
                />
                <InfoCard
                    icon="proicons:call"
                    title="Phone Support"
                    subtitle="+1 416-000-123456"
                    detail="Urgent issues only"
                />
                <InfoCard
                    icon="gala:file-document"
                    title="Documentation"
                    subtitle="docs.shroomexpress.ca"
                    detail="API docs, guides, tutorials"
                />
            </div>
        </div>
    );
};

export default ContactTab;
