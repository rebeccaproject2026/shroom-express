import React from "react";
import { Icon } from "@iconify/react";

const ADMIN_USERS = [
    { id: 1, name: "Alex Morgan", role: "Super Admin", email: "alex@shroomexpress.ca", lastSeen: "2 min ago", initial: "A", color: "#FFF1F0", textColor: "#EA3D2A" },
    { id: 2, name: "Tanya Brisk", role: "Store Manager", email: "tanya@shroomexpress.ca", lastSeen: "1 hr ago", initial: "T", color: "#FFF1F0", textColor: "#EA3D2A" },
    { id: 3, name: "Ryan Cho", role: "Finance Admin", email: "ryan@shroomexpress.ca", lastSeen: "3 hrs ago", initial: "R", color: "#FFF1F0", textColor: "#EA3D2A" },
];

const AdminUsersTab = () => {
    return (
        <div className="p-4 max-w-full animate-in fade-in slide-in-from-bottom-2 duration-500 font-manrope min-h-[500px]">


            <div className="space-y-4">
                {ADMIN_USERS.map((user) => (
                    <div key={user.id} className="p-3 border border-[#E2E8F0] rounded-md flex items-center justify-between bg-white transition-all group">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div
                                className="w-11 h-11 rounded-full flex items-center justify-center text-[17px] font-bold shrink-0 shadow-sm"
                                style={{ backgroundColor: user.color, color: user.textColor }}
                            >
                                {user.initial}
                            </div>

                            {/* Info */}
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-[15.5px] font-semibold text-[#181211]">{user.name}</h4>
                                    <span className="px-2 py-0.5 bg-[#E2E8F0] text-[#181211] text-[10px] font-semibold rounded-sm">
                                        {user.role}
                                    </span>
                                </div>
                                <p className="text-[12.5px]  font-medium text-[#475569] opacity-90">
                                    {user.email} <span className="mx-0.5">·</span> Last seen {user.lastSeen}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center ">
                            <button className="p-1 text-[#181211] transition-all">
                                <Icon icon="iconamoon:edit-light" width="20" />
                            </button>
                            <button className="p-1 text-[#EA3D2A] transition-all">
                                <Icon icon="fluent:delete-24-regular" width="20" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminUsersTab;
