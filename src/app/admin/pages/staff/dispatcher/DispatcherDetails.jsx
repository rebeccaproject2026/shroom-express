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
import DeliveryChatDrawer from "../../../components/tracking/DeliveryChatDrawer";
import ComplaintsDrawer from "../../../components/common/ComplaintsDrawer";
import AssignCollectionModal from "../../../components/dispatcher/AssignCollectionModal";
import ComplaintModal from "../../../components/dispatcher/ComplaintModal";
import CancelReason from "../../../components/dispatcher/CancelReason";
import PaySalaryModal from "../../../components/dispatcher/PaySalaryModal";
import SuspensionReason from "../../../components/dispatcher/SuspensionReason";
const DispatcherDetails = () => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("drivers");
    const [expandedLogIds, setExpandedLogIds] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // const [isEditOrderOpen, setIsEditOrderOpen] = useState(false);
    const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);
    const [selectedOrderForComplaint, setSelectedOrderForComplaint] = useState(null);
    const [isAssignCollectionOpen, setIsAssignCollectionOpen] = useState(false);
    const [selectedOrderForCollection, setSelectedOrderForCollection] = useState(null);
    const [isComplaintOpen, setIsComplaintOpen] = useState(false);
    const [isCancelReasonOpen, setIsCancelReasonOpen] = useState(false);
    const [isPaySalaryOpen, setIsPaySalaryOpen] = useState(false);
    const [isSuspensionOpen, setIsSuspensionOpen] = useState(false);
    // Sample orders data - Replace with API call later
    const sampleOrders = [
        {
            id: 1,
            type: 'pending',
            address: '123 Main Street, Toronto, ON M5J 2N8',
            orderId: '302011',
            driver: 'Bob Johnson',
            orderAmount: '1325.26',
            orderQuantity: '10 Items',
            orderCreated: '5 Mar 2024',
            orderCreatedTime: '10:30 pm',
            eta: '11:30pm, Today',
            soldQuantity: '2.36g',
            receivedAmount: '1025.35',
            unpaidCollection: '1025.35',
            paidCollection: '25.35',
            deliveryStarted: '12/14/2024 at 06:53 pm',
            approximateArrival: '12/14/2024, 08:12 PM',
        },
        {
            id: 2,
            type: 'delivered',
            address: '456 Oak Avenue, Toronto, ON M5K 3B2',
            orderId: '302012',
            driver: 'Sarah Smith',
            orderAmount: '825.50',
            orderQuantity: '5 Items',
            orderCreated: '5 Mar 2024',
            orderCreatedTime: '10:30 pm',
            deliveredAt: '11:30pm, 12 Dec 2024',
            soldQuantity: '1.50g',
            receivedAmount: '825.50',
            unpaidCollection: '0.00',
            paidCollection: '825.50',
            deliveryStarted: '12/14/2024 at 06:53 pm',
            deliveredTime: '12/14/2024, 08:12 PM',
        },
        {
            id: 3,
            type: 'cancelled',
            address: '789 Pine Road, Toronto, ON M5L 4C3',
            orderId: '302013',
            driver: 'Mike Wilson',
            orderAmount: '550.75',
            orderQuantity: '2 Items',
            orderCreated: '5 Mar 2024',
            orderCreatedTime: '10:30 pm',
            cancelledAt: '11:30pm, 14 Jan 2025',
            cancelReason: 'the requested item is out of stock',
            soldQuantity: '0.75g',
            receivedAmount: '0.00',
            unpaidCollection: '0.00',
            paidCollection: '0.00',
            deliveryStarted: '12/14/2024 at 06:53 pm',
            cancelledTime: '12/14/2024, 08:12 PM',
        },
        {
            id: 4,
            type: 'inprogress',
            address: '321 Maple Street, Toronto, ON M5M 5D4',
            orderId: '302014',
            driver: 'Jack Benson',
            orderAmount: '1125.00',
            orderQuantity: '8 Items',
            orderCreated: '5 Mar 2024',
            orderCreatedTime: '10:30 pm',
            deliveryDate: '15 Jan 2025 Today',
            eta: '11:30 pm',
            soldQuantity: '2.00g',
            receivedAmount: '1125.00',
            unpaidCollection: '0.00',
            paidCollection: '1125.00',
            deliveryStarted: '12/14/2024 at 06:53 pm',
            approximateArrival: '12/14/2024, 08:12 PM',
        },
    ];

    // Handler for order actions - will be connected to API later
    const handleOrderAction = (action, order) => {
        console.log(`Action: ${action}, Order ID: ${order.orderId}`, order);

        switch (action) {
            case 'chat':
                // Open chat drawer with order details
                setSelectedOrder(order);
                setIsChatOpen(true);
                break;
            case 'complaints':
                setSelectedOrderForComplaint(order);
                setIsComplaintsOpen(true);
                break;
            case 'assignCollection':
                setSelectedOrderForCollection(order);
                setIsAssignCollectionOpen(true);
                break;
            case 'complaint':
                setSelectedOrderForComplaint(order);
                setIsComplaintOpen(true);
                break;
            case 'cancelOrder':
                setIsCancelReasonOpen(true);
                setSelectedOrderForComplaint(order);
                break;
            case 'editOrder':
                // Open edit order drawer
                setSelectedOrder(order);
                // setIsEditOrderOpen(true);
                break;
            case 'reorder':
                // TODO: Create new order from existing
                console.log('Reordering:', order.orderId);
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    // Handler for saving edited order
    // const handleSaveOrder = (updatedOrder) => {
    //     console.log('Saving updated order:', updatedOrder);
    //     // TODO: API call to update order
    //     // Example: await updateOrderAPI(updatedOrder);
    //     // Then refresh orders list
    // };

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-2 w-full sm:w-auto">

                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full hover:bg-gray-100 cursor-pointer shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                            {dispatcher.avatar ? (
                                <img
                                    src={dispatcher.avatar}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500 text-base sm:text-lg font-semibold">
                                    {dispatcher.name.charAt(0)}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-[#424143] leading-tight truncate">
                                {dispatcher.name}
                            </h3>
                            <p className="text-xs text-[#3f4753] font-medium mt-1">
                                Added by you on March 22, 2024
                            </p>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setIsPaySalaryOpen(true)}
                        className="flex flex-1 sm:flex-initial items-center justify-center px-3 sm:px-5 py-2.5 bg-blue-600 text-white rounded-sm text-xs sm:text-sm font-semibold gap-1 sm:gap-2 cursor-pointer"
                    >
                        <Icon icon="fa6-solid:coins" width="16" height="16" className="sm:w-[18px] sm:h-[18px]" />
                        <span className="hidden sm:inline">Pay Salary</span>
                        <span className="sm:hidden">Pay</span>
                    </button>
                    <button
                        onClick={() => setIsSuspensionOpen(true)}
                        className="flex flex-1 sm:flex-initial items-center justify-center px-3 py-2.5 bg-red-500 text-white rounded-sm text-xs sm:text-sm font-semibold gap-1 cursor-pointer">
                        <Icon icon="mingcute:user-x-fill" width="18" height="18" className="sm:w-[20px] sm:h-[20px]" />
                        <span className="hidden sm:inline">Suspend Dispatcher</span>
                        <span className="sm:hidden">Suspend</span>
                    </button>
                </div>

            </div>

            {/* Information Card */}
            <div className="bg-white rounded-sm border border-gray-200 p-3 sm:p-4">

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold">Information</h3>
                    <Icon onClick={() => setIsEditOpen(true)} icon="fa6-solid:pencil" width="18" height="18" className="sm:w-[20px] sm:h-[20px]" color="var(--color-secondary)" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-6 sm:gap-x-10 text-sm">

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
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 border border-[#969696] bg-white rounded-sm p-1.5 overflow-x-auto hide-scrollbar">

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
            {activeTab === "area" && (
                <div className="space-y-3">
                    <DispatcherAreaMap
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
                    />
                </div>
            )}
            {activeTab === "log" &&
                <LogActivityTimeline
                    logData={LOG_ACTIVITY}
                    expandedLogIds={expandedLogIds}
                    toggleLogExpand={toggleLogExpand}
                    onlineTime="112.5 hrs"
                    offlineTime="30 hrs"
                />}
            {activeTab === "payroll" &&
                <div className="bg-white rounded-sm border border-gray-200 p-3 sm:p-4">
                    <div className="space-y-3 sm:space-y-4">
                        {PAYROLL_HISTORY.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border-b border-[#212529]/30 pb-3 sm:pb-4 gap-2 sm:gap-0"
                            >
                                <p className="text-xs sm:text-sm text-black font-medium break-words flex-1">
                                    {payment.description}
                                </p>
                                <span className="text-sm font-bold text-black shrink-0">
                                    {payment.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>}
            {activeTab === "inventory" && <div className="bg-white rounded-sm border border-gray-200 p-3 sm:p-4">
                <div className="space-y-3 sm:space-y-4">
                    {INVENTORY_ACTIVITY.map((payment) => (
                        <div
                            key={payment.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border-b border-[#212529]/30 pb-3 sm:pb-4 gap-2 sm:gap-0"
                        >
                            <p className="text-xs sm:text-sm text-black font-medium break-words flex-1">
                                {payment.description}
                            </p>
                            <span className="text-sm font-bold text-black shrink-0">
                                {payment.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>}
            {activeTab === "orders" &&
                <OrderPage
                    showFilters={true}
                    showMap={true}
                    pageType="all"
                    context="dispatcher"
                    orders={sampleOrders}
                    onOrderAction={handleOrderAction}
                />}




            <>
                <AddDispatcher
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    isEdit={true}
                    dispatcherData={dispatcher}
                />
            </>

            {/* Chat Drawer */}
            {selectedOrder && (
                <DeliveryChatDrawer
                    open={isChatOpen}
                    onClose={() => {
                        setIsChatOpen(false);
                        setSelectedOrder(null);
                    }}
                    driverName={selectedOrder.driver || 'Driver'}
                    avatar={null}
                    isOnline={selectedOrder.type === 'inprogress'}
                    eta={selectedOrder.eta || selectedOrder.approximateArrival || 'N/A'}
                    status={
                        selectedOrder.type === 'delivered' ? 'Delivered' :
                            selectedOrder.type === 'cancelled' ? 'Cancelled' :
                                selectedOrder.type === 'inprogress' ? 'In-progress' :
                                    'Pending'
                    }
                    address={selectedOrder.address}
                    orderQuantity={parseInt(selectedOrder.orderQuantity) || 0}
                    orderAmount={parseFloat(selectedOrder.orderAmount) || 0}
                    paymentMethod="Cash on Delivery"
                    orderType="Same Day"
                />
            )}
            {/* ... other drawers like DeliveryChatDrawer */}

            <ComplaintsDrawer
                isOpen={isComplaintsOpen}
                onClose={() => {
                    setIsComplaintsOpen(false);
                    setSelectedOrderForComplaint(null);
                }}
                orderId={selectedOrderForComplaint?.orderId || 'N/A'}
            />

            <AssignCollectionModal
                isOpen={isAssignCollectionOpen}
                onClose={() => {
                    setIsAssignCollectionOpen(false);
                    setSelectedOrderForCollection(null);
                }}
                onConfirm={(payload) => {
                    console.log('Assign collection payload:', payload);
                    // TODO: Call your API here
                    // e.g. axios.post('/api/assign-collection', payload)
                    // Then show success toast, refresh orders, etc.
                }}
                order={selectedOrderForCollection}
            />
            <ComplaintModal
                isOpen={isComplaintOpen}
                onClose={() => {
                    setIsComplaintOpen(false);
                    setSelectedOrderForComplaint(null);
                }}
                onSubmit={(payload) => {
                    console.log('Submitting complaint:', payload);
                    // → Call your API here (POST /complaints)
                    // Show success toast, refresh list, etc.
                }}
                order={selectedOrderForComplaint}
            />
            <CancelReason
                isOpen={isCancelReasonOpen}
                onClose={() => {
                    setIsCancelReasonOpen(false);
                }}
                onSubmit={(payload) => {
                    console.log('Submitting complaint:', payload);
                    // → Call your API here (POST /complaints)
                    // Show success toast, refresh list, etc.
                }}
                order={selectedOrderForComplaint}
            />

            <PaySalaryModal
                isOpen={isPaySalaryOpen}
                onClose={() => setIsPaySalaryOpen(false)}
                onConfirm={(payload) => {
                    console.log('Pay salary payload:', payload);
                    // TODO: Call your API here
                    // e.g. axios.post('/api/pay-salary', payload)
                    // Then show success toast, refresh data, etc.
                }}
                driver={dispatcher}
            />
            <SuspensionReason
                isOpen={isSuspensionOpen}
                onClose={() => setIsSuspensionOpen(false)}
                onSubmit={(payload) => {
                    console.log('Suspension reason submitted:', payload);
                    // TODO: Call your API here to suspend dispatcher
                    // e.g. axios.post('/api/dispatchers/suspend', payload)
                    // Then show toast, refresh data, etc.
                }}
                order={dispatcher}  // passing dispatcher object (since it's for dispatcher)
            />
            {/* Edit Order Drawer */}
            {/* <EditOrderDrawer
                isOpen={isEditOrderOpen}
                onClose={() => {
                    setIsEditOrderOpen(false);
                    setSelectedOrder(null);
                }}
                orderData={selectedOrder}
                onSave={handleSaveOrder}
            /> */}
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-sm sm:text-base text-[#212529]/70 font-medium mb-0.5">{label}</span>
        <span className="font-medium text-sm sm:text-base text-[#212529] break-words">{value}</span>
    </div>
);
const TabButton = ({ label, icon, value, activeTab, setActiveTab, iconClassName }) => {
    const isActive = activeTab === value;

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`flex items-center gap-1 w-full sm:w-55 justify-center py-2 px-2 rounded-sm text-xs sm:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap
        ${isActive
                    ? "bg-[#0066FF] text-white"
                    : "text-[#212121] hover:bg-gray-100"
                }`}
        >
            <Icon icon={icon} className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${iconClassName}`} />
            <span className="truncate">{label}</span>
        </button>
    );
};
export default DispatcherDetails;