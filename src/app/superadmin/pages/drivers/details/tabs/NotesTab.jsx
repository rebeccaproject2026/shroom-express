import React from "react";

const NotesTab = () => {
    // const notes = [
    //     {
    //         content: "Driver has consistently delivered ahead of schedule for the Toronto region. Increased completion rate significantly this month.",
    //         date: "Mar 05, 2026 • 10:35 AM"
    //     },
    //     {
    //         content: "Updated vehicle information and verified new insurance documents. Driver is now cleared for night shifts.",
    //         date: "Feb 20, 2026 • 2:15 PM"
    //     }
    // ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-manrope">
            {/* Add Note Section */}
            <div className="p-6 border border-[#E2E8F0] bg-[#F8F8F8] rounded-md mb-4">
                <label className="text-[14px] font-bold text-[#181211] mb-2 block">Add Internal Note <span className="text-[#EA3D2A]">*</span></label>
                <div className="relative">
                    <textarea
                        className="w-full p-4 bg-white border border-[#E2E8F0] rounded-md text-[14px] outline-none min-h-[140px] placeholder:text-[#94A3B8]"
                        placeholder="Add a note about this Driver"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-6 py-2.5 bg-[#FFFFFF] border border-[#E2E8F0] text-[#94A3B8] rounded-md text-[13px] font-semibold opacity-60 cursor-not-allowed">
                        Save Note
                    </button>
                </div>
            </div>

            {/* Notes List */}
            {/* <div className="space-y-4">
                {notes.map((note, idx) => (
                    <div key={idx} className="flex gap-4 p-5 border border-[#F1F5F9] rounded-xl bg-white hover:shadow-sm transition-shadow">
                        <div className="flex-1 space-y-2">
                            <p className="text-[14px] text-[#334155] leading-relaxed font-medium">
                                {note.content}
                            </p>
                            <span className="inline-block text-[12px] text-[#94A3B8] font-bold uppercase tracking-tight">
                                {note.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default NotesTab;
