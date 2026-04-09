import React from 'react';

const NotesContent = () => {
    const notes = [
        {
            author: "Alex Morgan",
            role: "Super Admin",
            initial: "A",
            avatarBg: "bg-[#FFEDEB]",
            avatarText: "text-[#EA3D2A]",
            content: "Confirmed Q2 pricing with Marcus - no changes to unit costs. They're offering a 5% discount on orders over $5,000. Will leverage this for the next bulk restock.",
            date: "Mar 05, 2026 • 10:35 AM"
        },
        {
            author: "Tanya Brisk",
            role: "Logistics Manager",
            initial: "T",
            avatarBg: "bg-[#FFEDEB]",
            avatarText: "text-[#EA3D2A]",
            content: "QA check completed on BATCH-2026-02. All 200 Pack passed potency and purity tests. COA filed in the documents folder.",
            date: "Feb 20, 2026 • 2:00 PM"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-manrope">
            {/* Add Note Section */}
            <div className="p-6 border border-[#E2E8F0] bg-[#F8F8F8] rounded-md mb-4">
                <label className="text-[14px] font-bold text-[#181211] mb-2 block">Add Internal Note <span className="text-[#EA3D2A]">*</span></label>
                <div className="relative">
                    <textarea
                        className="w-full p-4 bg-white border border-[#E2E8F0] rounded-md text-[14px] outline-none min-h-[140px] placeholder:text-[#94A3B8]"
                        placeholder="Add a note about this supplier — pricing negotiations, quality concerns, special instructions..."
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-6 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#94A3B8] rounded-md text-[13px] font-semibold opacity-60 cursor-not-allowed">
                        Add Note
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
                {notes.map((note, idx) => (
                    <div key={idx} className="flex gap-4 p-4 border border-[#F1F5F9] rounded-md bg-white">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${note.avatarBg} ${note.avatarText}`}>
                            {note.initial}
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[15px] font-bold text-[#181211]">{note.author}</span>
                                </div>
                                <span className="text-[12px] text-[#94A3B8] font-medium">{note.date}</span>
                            </div>
                            <p className="text-[13px] text-[#475569] leading-relaxed font-medium">
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
