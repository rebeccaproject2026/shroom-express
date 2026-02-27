import { ChevronDown, ChevronUp } from "lucide-react";

const LogActivityTimeline = ({
    logData = [],
    expandedLogIds = [],
    toggleLogExpand,
    onlineTime = "0 hrs",
    offlineTime = "0 hrs",
}) => {
    return (
        <div className="bg-white rounded-sm border border-gray-200 p-2 sm:p-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="bg-[#CEF1E0] p-2 sm:p-2.5 rounded-sm text-center">
                    <p className="text-xs sm:text-sm font-medium text-[#00B159] mb-0.5 sm:mb-1">
                        Online Time
                    </p>
                    <p className="text-base sm:text-xl font-bold text-[#00B159]">
                        {onlineTime}
                    </p>
                </div>

                <div className="bg-[#FFF5E5] p-2 sm:p-2.5 rounded-sm text-center">
                    <p className="text-xs sm:text-sm font-medium text-[#FF9800] mb-0.5 sm:mb-1">
                        Offline Time
                    </p>
                    <p className="text-base sm:text-xl font-bold text-[#FF9800]">
                        {offlineTime}
                    </p>
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="space-y-0">
                {logData.map((log, index) => {
                    const isExpanded = expandedLogIds.includes(log.id);

                    return (
                        <div key={log.id} className="relative flex item-start gap-2 sm:gap-3">
                            {/* Left side: Timeline dot + line */}
                            <div className="relative w-5 sm:w-6 flex justify-center">
                                {/* Vertical Line */}
                                {index !== logData.length - 1 && (
                                    <div className="absolute top-3 sm:top-4 bottom-0 w-[2px] bg-[#E3EEFF]" />
                                )}

                                {/* Dot */}
                                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-[#E3EEFF] rounded-full z-10 " />
                            </div>
                            {/* Right Content - Make entire row clickable */}
                            <div className="flex-1 pb-3 sm:pb-5">
                                <div
                                    className="flex items-start justify-between cursor-pointer  transition-colors"
                                    onClick={() => toggleLogExpand(log.id)}
                                >
                                    <div className="flex-1">
                                        <p className="text-sm sm:text-base font-medium text-black leading-none">
                                            {log.date}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5 sm:gap-2 ml-2 sm:ml-4">
                                        <span className="text-sm sm:text-base font-semibold text-[#212121]">
                                            {log.totalHours}
                                        </span>

                                        {isExpanded ? (
                                            <ChevronUp className="w-5 sm:w-7 h-4 sm:h-5 text-[#C2C6CE]" />
                                        ) : (
                                            <ChevronDown className="w-5 sm:w-7 h-4 sm:h-5 text-[#C2C6CE]" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Section */}
                                {isExpanded && log.activities?.length > 0 && (
                                    <div className="mt-1.5 sm:mt-2 space-y-1 sm:space-y-1.5 pl-0 mr-6 sm:mr-8.5">
                                        {log.activities.map((activity, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className="text-xs sm:text-sm font-medium text-[#212121]">{activity.time}</span>
                                                <span className="text-xs sm:text-sm font-semibold text-[#212121]">{log.activities_hr?.[idx]?.hour || ''}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LogActivityTimeline;