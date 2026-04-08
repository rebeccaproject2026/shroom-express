import React from 'react';

const NotesContent = () => {
    const notes = [
        {
            author: "Tanya Brisk",
            role: "Admin",
            initial: "T",
            avatarBg: "bg-[#FFEDEB]",
            avatarText: "text-[#EA3D2A]",
            content: "Reorder has been placed with EarthDrop Co. 50 bottles expected by March 23.",
            date: "Mar 04, 2026 • 2:15 PM"
        },
        {
            author: "Alex Morgan",
            role: "Super Admin",
            initial: "A",
            avatarBg: "bg-[#FFF7E8]",
            avatarText: "text-[#F2994A]",
            content: "Low stock alert triggered. Please review and restock ASAP — this is one of the top-selling products in Forest Oasis.",
            date: "Mar 03, 2026 • 10:22 AM"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Add Note Section */}
            <div className="p-4 border border-[#E2E8F0] bg-[#F8F8F8] rounded-md mb-4">
                <label className="text-sm font-semibold text-[#181211]">Add Internal Note <span className="text-[#EA3D2A]">*</span></label>
                <div className="relative">
                    <textarea
                        className="w-full p-4 bg-white border border-[#E2E8F0] rounded-md text-[14px] outline-none min-h-[120px] placeholder:text-[#475569]"
                        placeholder="Write a note about this store - visible only the admins..."
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-6 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#475569] rounded-md text-sm font-semibold opacity-60 cursor-not-allowed">
                        Add Note
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div className="space-y-6">
                {notes.map((note, idx) => (
                    <div key={idx} className="flex gap-4 p-2 transition-all border-2 border-[#F6FBFF] rounded-md mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${note.avatarBg} ${note.avatarText}`}>
                            {note.initial}
                        </div>
                        <div className="flex-1 space-y-1.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[15px] font-semibold text-[#181211]">{note.author}</span>
                                    <span className="px-2 py-0.5 bg-[#E2E8F0] text-[#181211] text-[10px] font-semibold rounded-sm">
                                        {note.role}
                                    </span>
                                </div>
                                <span className="text-[12px] text-[#475569] font-medium">{note.date}</span>
                            </div>
                            <p className="text-[14px] text-[#475569] leading-relaxed font-regular">
                                {note.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesContent;
