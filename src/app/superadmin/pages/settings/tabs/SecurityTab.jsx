import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ReusableTableSelect from "../../../components/common/ReusableTableSelect";

const Toggle = ({ enabled, onChange }) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#EA3D2A]' : 'bg-[#E2E8F0]'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);

const SecurityTab = () => {
    const [settings, setSettings] = useState({
        twoFactor: true,
        ipWhitelist: false,
        auditLogging: true,
        apiAccess: true
    });

    const securityList = [
        { id: 'twoFactor', label: 'Two-Factor Authentication', sub: 'Require 2FA for all admin logins' },
        { id: 'ipWhitelist', label: 'IP Whitelist', sub: 'Only allow logins from approved IPs' },
        { id: 'auditLogging', label: 'Audit Logging', sub: 'Log all admin actions to audit trail' },
        { id: 'apiAccess', label: 'API Access', sub: 'Enable external API integrations' },
    ];

    const timeoutOptions = [
        { value: '15 minutes', label: '15 minutes' },
        { value: '30 minutes', label: '30 minutes' },
        { value: '1 hour', label: '1 hour' },
        { value: '4 hours', label: '4 hours' },
    ];

    return (
        <div className="p-4 max-w-full animate-in fade-in slide-in-from-bottom-2 duration-500 font-manrope">
            <div className="bg-white border border-[#E2E8F0] rounded-md p-5 space-y-8">

                {/* ── Security Settings ── */}
                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <h2 className="text-xl font-semibold text-[#181211]">Security Settings</h2>
                        <p className="text-sm font-medium text-[#475569] mt-1">Protect your admin platform and customer data</p>
                    </div>

                    <div className="space-y-3">
                        {securityList.map((item) => (
                            <div key={item.id} className="p-3 border border-[#BDBDD2] rounded-md flex items-center justify-between transition-all hover:bg-[#F8FAFC]/50">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-semibold text-[#181211]">{item.label}</h4>
                                    <p className="text-xs font-medium text-[#475569]">{item.sub}</p>
                                </div>
                                <Toggle
                                    enabled={settings[item.id]}
                                    onChange={() => setSettings({ ...settings, [item.id]: !settings[item.id] })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Session Timeout ── */}
                <div className="space-y-1.5 flex flex-col mb-4">
                    <label className="text-[14.5px] font-semibold text-[#181211]">Session Timeout</label>
                    <ReusableTableSelect
                        options={timeoutOptions}
                        defaultValue="30 minutes"
                        borderclass="border border-[#E2E8F0] rounded-lg"
                        className="w-full h-11 !bg-[#F8F8F8] text-sm text-[#181211] font-medium"
                    />
                </div>

                {/* ── Security Recommendations (Alert Box) ── */}
                <div className="p-3 bg-[#FFF7E8] border border-[#D26D0A] border-opacity-30 rounded-md flex items-start gap-2.5 mb-4">
                    <Icon icon="material-symbols:warning-rounded" className="text-[#D26D0A] mt-0.5 shrink-0" width="20" />
                    <p className="text-[13px] font-semibold text-[#D26D0A] leading-relaxed">
                        Security Recommendations — Two-factor authentication and audit logging are currently enabled. Ensure all admin accounts use strong passwords. API keys should be rotated every 90 days.
                    </p>
                </div>
                {/* ── Footer Actions ── */}
                <div className="p-4 border-t border-[#E2E8F0] flex gap-4">
                    <button
                        className="flex-1 px-4 py-2.5 bg-white text-[#475569] rounded-lg text-sm font-semibold border border-[#E2E8F0] transition-all shadow-[0px_4px_6px_-4px_#64748B33,0px_10px_15px_-3px_#64748B33] shrink-0 ml-4"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-4 py-2.5 bg-[#EA3D2A]  text-white rounded-lg text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(24,18,17,0.2),0px_10px_15px_-3px_rgba(24,18,17,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Icon icon="lucide:check" width="18" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;
