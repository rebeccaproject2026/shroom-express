import avatar1 from "../../assets/images/self-portrait-beautiful-chinese-girl 1.png";
import avatar2 from "../../assets/images/self-portrait-beautiful-chinese-girl2.png";
import avatar3 from "../../assets/images/self-portrait-beautiful-chinese-girl3.png";
import avatar4 from "../../assets/images/self-portrait-beautiful-chinese-girl4.png";

const ManageDrivers = () => {
    const drivers = [
        { id: 1, name: "Driver Name", status: "online", avatar: avatar1 },
        { id: 2, name: "Driver Name 2", status: "online", avatar: avatar2 },
        { id: 3, name: "Driver Name 3", status: "offline", avatar: avatar3 },
        { id: 4, name: "Driver Name 4", status: "online", avatar: avatar4 },
        { id: 5, name: "Driver Name", status: "online", avatar: avatar1 },
        { id: 6, name: "Driver Name 2", status: "online", avatar: avatar2 },
        { id: 7, name: "Driver Name 3", status: "offline", avatar: avatar3 },
        { id: 8, name: "Driver Name 4", status: "online", avatar: avatar4 },
    ];

    return (
        <div className="bg-white rounded-sm border border-gray-200 p-4 h-[500px] overflow-y-auto">

            {/* Title */}
            <h2 className="text-xl font-semibold text-[#212121] mb-4">
                Drivers
            </h2>

            {/* Driver List */}
            <div className="flex flex-col gap-3">

                {drivers.map((driver) => (
                    <div
                        key={driver.id}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        {/* Avatar with status indicator */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                            <img
                                src={driver.avatar}
                                alt={driver.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold">${driver.name.charAt(0)}</div>`;
                                }}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col">
                            <p className="text-base font-semibold text-[#212121]">
                                {driver.name}
                            </p>

                            <span
                                className={`text-sm font-medium capitalize ${driver.status === "online"
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {driver.status === "online" ? "Online" : "Offline"}
                            </span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ManageDrivers;