import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BanknoteArrowDown, Edit, MapPin, Package, ReceiptText } from "lucide-react";
import avatar from "../../../assets/images/self-portrait-beautiful-chinese-girl2.png";
import { Icon } from "@iconify/react";
import AddDispatcher from "./AddDispatcher";
import ManageDrivers from "../../../components/dispatcher/ManageDrivers";
import DispatcherAreaMap from "../../../components/dispatcher/DispatcherAreaMap";
import LogActivityTimeline from "../../../components/dispatcher/LogActivityTimeline";
import OrderPage from "../../../components/order/OrderPage";
const DispatcherDetails = () => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("drivers");
    const [expandedLogIds, setExpandedLogIds] = useState([]);

    const toggleLogExpand = (id) => {
        setExpandedLogIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };
    const LOG_ACTIVITY = [
        {
            id: 1,
            date: "12 Dec 2025",
            activities: [
                { time: "Online 2:00 pm", type: "online" },
                { time: "Offline 4:00 pm", type: "offline" }
            ],
            totalHours: "5 hrs",
            activities_hr: [{ hour: ".5 hrs" }, { hour: "4 hrs" }],
        },
        {
            id: 2,
            date: "11 Dec 2024",
            activities: [
                { time: "Online 2:00 pm", type: "online" },
                { time: "Offline 4:00 pm", type: "offline" }
            ],
            activities_hr: [{ hour: "1 hrs" }, { hour: "5 hrs" }],
            totalHours: "6 hrs",
        },
        {
            id: 3,
            date: "10 Dec 2024",
            activities: [
                { time: "Online 2:00 pm", type: "online" },
                { time: "Offline 4:00 pm", type: "offline" }
            ],
            activities_hr: [{ hour: "5 hrs" }, { hour: "2 hrs" }],
            totalHours: "7 hrs",
        },
        {
            id: 4,
            date: "09 Dec 2024",
            activities: [
                { time: "Online 2:00 pm", type: "online" },
                { time: "Offline 4:00 pm", type: "offline" }
            ],
            activities_hr: [{ hour: "2 hrs" }, { hour: "8 hrs" }],
            totalHours: "10 hrs",
        },
        {
            id: 5,
            date: "07 Jan 2025",
            activities: [
                { time: "Online 2:00 pm", type: "online" },
                { time: "Offline 4:00 pm", type: "offline" }
            ],
            activities_hr: [{ hour: "2 hrs" }, { hour: "2 hrs" }],
            totalHours: "4 hrs",
        },
    ];
    //  Replace later with API call using id
    const dispatcher = {
        name: "John Henry",
        phone: "+1 7685674653",
        email: "John456@gmail.com",
        avatar: avatar,
        gender: "Female",
        position: "Dispatcher",
        dob: "14 March 1998",
        age: "26 Years",
        joiningDate: "12 Mar 2022",
        salary: "$1200",
        workingDays: "Monday - Friday",
        workingTime: "09:00 to 18:00",
        rollOver: "12",
        address: "1833 Bel Meadow Drive, Bentley, Toronto 92335",
    };
    const PAYROLL_HISTORY = [
        {
            id: 1,
            description: "50 hrs Payment - Paid by Master - 12 Dec 2024 at 9:30 pm",
            amount: "$340",
        },
        {
            id: 2,
            description: "55 hrs Payment - Paid by Master - 12 Dec 2024 at 9:30 pm",
            amount: "$440",
        },
        {
            id: 3,
            description: "45 hrs Payment - Paid by Master - 01 Jan 2025 at 9:30 pm",
            amount: "$240",
        },
        {
            id: 4,
            description: "52 hrs Payment - Paid by Master - 15 Feb 2025 at 9:30 pm",
            amount: "$360",
        },
        {
            id: 5,
            description: "65 hrs Payment - Paid by Master - 11 Mar 2025 at 9:30 pm",
            amount: "$440",
        },
        {
            id: 6,
            description: "23 hrs Payment - Paid by Master - 12 Mar 2025 at 9:30 pm",
            amount: "$140",
        },
        {
            id: 7,
            description: "47 hrs Payment - Paid by Master - 12 Apr 2025 at 9:30 pm",
            amount: "$320",
        },
    ];
    const INVENTORY_ACTIVITY = [
        {
            id: 1,
            description: "Product-F added - 12 Dec 2023 at 9:30 pm",
            amount: "10 kg",
        },
        {
            id: 2,
            description: "Product-G added - 11 Dec 2023 at 9:30 pm",
            amount: "$23 kg",
        },
        {
            id: 3,
            description: "Product-H added - 10 Dec 2023 at 9:30 pm",
            amount: "9 kg",
        },
        {
            id: 4,
            description: "Product-K added - 08 Dec 2023 at 9:30 pm",
            amount: "11 kg",
        },
        {
            id: 5,
            description: "Product-F added - 04 Dec 2023 at 9:30 pm",
            amount: "12 kg",
        },
        {
            id: 6,
            description: "Product-F added - 02 Dec 2023 at 9:30 pm",
            amount: "20 kg",
        },
    ];
    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center justify-between">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-2">

                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-start gap-3">
                        <div className="w-13 h-13 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                            {dispatcher.avatar ? (
                                <img
                                    src={dispatcher.avatar}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500 text-lg font-semibold">
                                    {dispatcher.name.charAt(0)}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold text-[#424143] leading-tight">
                                {dispatcher.name}
                            </h3>
                            <p className="text-xs text-[#3f4753] font-medium mt-1">
                                Added by you on March 22, 2024
                            </p>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex gap-3">
                    <button className="flex px-5 py-2.5 bg-blue-600 text-white rounded-sm text-sm font-semibold gap-2 cursor-pointer">
                        <Icon icon="fa6-solid:coins" width="18" height="18" />
                        Pay Salary
                    </button>
                    <button className="flex px-3 py-2.5 bg-red-500 text-white rounded-sm text-sm font-semibold gap-1 cursor-pointer">
                        <Icon icon="mingcute:user-x-fill" width="20" height="20" />
                        Suspend Dispatcher
                    </button>
                </div>

            </div>

            {/* Information Card */}
            <div className="bg-white rounded-sm border border-gray-200 p-4">

                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Information</h3>
                    <Icon onClick={() => setIsEditOpen(true)} icon="fa6-solid:pencil" width="20" color="var(--color-secondary)" className="cursor-pointer" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-sm">

                    <InfoItem label="Phone Number" value={dispatcher.phone} />
                    <InfoItem label="Email Address" value={dispatcher.email} />

                    <InfoItem label="Position" value={dispatcher.position} />
                    <InfoItem label="Gender" value={dispatcher.gender} />

                    <InfoItem label="Date of Birth" value={dispatcher.dob} />
                    <InfoItem label="Age" value={dispatcher.age} />

                    <InfoItem label="Joining Date" value={dispatcher.joiningDate} />
                    <InfoItem label="Salary/month" value={dispatcher.salary} />

                    <InfoItem label="Working Days" value={dispatcher.workingDays} />
                    <InfoItem label="Working Time" value={dispatcher.workingTime} />

                    <InfoItem label="Address" value={dispatcher.address} />
                    <InfoItem label="Roll-Over" value={dispatcher.rollOver} />

                </div>
            </div>
            {/* Tabs Navigation */}
            <div className="flex justify-between items-center gap-2 border border-[#969696] bg-white rounded-sm p-1.5">

                <TabButton
                    label="Managing Drivers"
                    icon="healthicons:truck-driver"
                    value="drivers"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <TabButton
                    label="Managing Area Code"
                    icon="mdi:location"
                    value="area"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <TabButton
                    label="Order History"
                    icon="material-symbols:history-rounded"
                    value="orders"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <TabButton
                    label="Log Activity"
                    icon="basil:invoice-outline"
                    value="log"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    iconClassName="scale-y-[-1]"
                />

                <TabButton
                    label="Payroll History"
                    icon="hugeicons:payment-02"
                    value="payroll"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <TabButton
                    label="Inventory Activity"
                    icon="mage:package-box"
                    value="inventory"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

            </div>
            {activeTab === "drivers" && <ManageDrivers />}
            {activeTab === "area" && < DispatcherAreaMap
                areas={[
                    "M2N 3X1",
                    "M2N 3X3",
                    "M2N 3X5",
                    "M2N 3X1",
                    "M2N 3X3",
                    "M2N 3X5",
                    "M2N 3X1",
                    "M2N 3X3",
                    "M2N 3X5"
                ]}
            />}
            {activeTab === "log" &&
                <LogActivityTimeline
                    logData={LOG_ACTIVITY}
                    expandedLogIds={expandedLogIds}
                    toggleLogExpand={toggleLogExpand}
                    onlineTime="112.5 hrs"
                    offlineTime="30 hrs"
                />}
            {activeTab === "payroll" &&
                <div className="bg-white rounded-sm border border-gray-200 p-4">
                    <div className="space-y-4">
                        {PAYROLL_HISTORY.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex items-center justify-between bg-white border-b border-[#212529]/30 pb-4"
                            >
                                <p className="text-sm text-black font-medium">
                                    {payment.description}
                                </p>
                                <span className="text-sm font-bold text-black">
                                    {payment.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>}
            {activeTab === "inventory" && <div className="bg-white rounded-sm border border-gray-200 p-4">
                <div className="space-y-4">
                    {INVENTORY_ACTIVITY.map((payment) => (
                        <div
                            key={payment.id}
                            className="flex items-center justify-between bg-white border-b border-[#212529]/30 pb-4"
                        >
                            <p className="text-sm text-black font-medium">
                                {payment.description}
                            </p>
                            <span className="text-sm font-bold text-black">
                                {payment.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>}
            {activeTab === "orders" && <OrderPage
                showFilters={true}
                showMap={true}
                pageType="all"
                pageContext="dispatcher"
            />}




            <>
                <AddDispatcher
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    isEdit={true}
                    dispatcherData={dispatcher}
                />
            </>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-base text-[#212529]/70 font-medium mb-0.5">{label}</span>
        <span className="font-medium text-[#212529]">{value}</span>
    </div>
);
const TabButton = ({ label, icon, value, activeTab, setActiveTab, iconClassName }) => {
    const isActive = activeTab === value;

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`flex items-center gap-1 w-55 justify-center py-2 rounded-sm text-sm font-medium cursor-pointer transition-colors
        ${isActive
                    ? "bg-[#0066FF] text-white"
                    : "text-[#212121] hover:bg-gray-100"
                }`}
        >
            <Icon icon={icon} className={`w-6 h-6 ${iconClassName}`} />
            {label}
        </button>
    );
};
export default DispatcherDetails;