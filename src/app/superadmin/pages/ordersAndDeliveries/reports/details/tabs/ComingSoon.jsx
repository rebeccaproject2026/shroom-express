import { Icon } from "@iconify/react";

const ComingSoon = ({ tabName }) => (
    <div className="flex flex-col items-center justify-center py-24 gap-4 select-none">
        <div className="w-16 h-16 rounded-full bg-[#fef0ee] flex items-center justify-center">
            <Icon icon="mdi:clock-outline" width="32" className="text-[#EA3D2A]" />
        </div>
        <div className="text-center space-y-1.5">
            <h4 className="text-[16px] font-bold text-[#181211]">{tabName} — Coming Soon</h4>
            <p className="text-[13px] font-medium text-[#64748B]">
                This section is currently being built. Check back soon.
            </p>
        </div>
        <span className="px-4 py-1.5 bg-[#FFF7E8] border border-[#f59e0b] text-[#f59e0b] rounded-full text-[12px] font-bold tracking-wide">
            In Progress
        </span>
    </div>
);

export default ComingSoon;
