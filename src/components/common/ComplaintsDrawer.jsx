// src/components/dispatcher/ComplaintsDrawer.jsx
import React from 'react';
import { X } from 'lucide-react';
import Drawer from '../common/Drawer'; // assuming you have this reusable Drawer
import { Icon } from '@iconify/react';

const ComplaintsDrawer = ({ isOpen, onClose, orderId = 'N/A' }) => {

    // Inside ComplaintsDrawer
    // const [complaints, setComplaints] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (isOpen && orderId !== 'N/A') {
    //         // fetch(`/api/orders/${orderId}/complaints`)
    //         //   .then(res => res.json())
    //         //   .then(data => {
    //         //     setComplaints(data);
    //         //     setLoading(false);
    //         //   });
    //     }
    // }, [isOpen, orderId]);
    // Static data for now — later replace with API fetch based on orderId
    const complaints = [
        {
            type: 'Client Complaint',
            date: '12 January 2025',
            time: '10:20pm',
            message:
                'I received my order (Order ID: ' +
                orderId +
                ') on [Delivery Date], but [Missing Item Name] was missing. Please check and arrange a replacement or refund.',
        },
        {
            type: 'Driver Complaint',
            date: '14 January 2025',
            time: '10:20pm',
            message:
                'I would like to report an incident involving the driver assigned to my order (Order ID: ' +
                orderId +
                '). The driver, [Driver\'s Name if known], displayed inappropriate behavior during the delivery on [Date]. Specifically, [briefly describe the misbehavior, e.g., rude attitude, aggressive language, delayed delivery, etc.].',
        },
        {
            type: 'Dispatcher Complaint',
            date: '14 January 2025',
            time: '10:20pm',
            message:
                'I would like to report an incident involving the driver assigned to my order (Order ID: ' +
                orderId +
                '). The driver, [Driver\'s Name if known], displayed inappropriate behavior during the delivery on [Date]. Specifically, [briefly describe the misbehavior, e.g., rude attitude, aggressive language, delayed delivery, etc.].',
        },
        {
            type: 'Master Complaint',
            date: '14 January 2025',
            time: '10:20pm',
            message:
                'I would like to report an incident involving the driver assigned to my order (Order ID: ' +
                orderId +
                '). The driver, [Driver\'s Name if known], displayed inappropriate behavior during the delivery on [Date]. Specifically, [briefly describe the misbehavior, e.g., rude attitude, aggressive language, delayed delivery, etc.].',
        },
    ];

    return (
        <Drawer isOpen={isOpen} onClose={onClose} width="w-[500px] sm:w-[560px] md:w-[550px]">
            {/* Header - matches screenshot style */}
            <div className="px-6 py-3 flex items-center justify-between  bg-white shrink-0">
                {/* Left: Icon + Title */}
                <div className="flex items-center gap-2.5">
                    <div className="relative top-[1px]"> {/* ← tiny nudge up */}
                        <Icon
                            icon="akar-icons:chat-question"
                            className="w-5 h-5 text-[#FF9800]"
                        />
                    </div>
                    <h3 className="text-[20px] font-semibold text-gray-900">
                        Complaints
                    </h3>
                </div>

                {/* Right: Close button */}
                <button
                    onClick={onClose}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    aria-label="Close"
                    title="Close"
                >
                    <X className="w-6 h-6 text-[#212121]/50 stroke-[2.5]" />
                </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-white px-7 py-1.5">
                <div className="space-y-8">
                    {complaints.map((complaint, index) => (
                        <div key={index} className="space-y-2">
                            {/* Type + Timestamp row */}
                            <div className="flex items-baseline justify-between">
                                <h4 className="text-[16px] font-semibold text-[#000000] tracking-tight">
                                    {complaint.type}
                                </h4>
                                <span className="text-sm text-[#000000]/80 whitespace-nowrap">
                                    {`${complaint.date} at ${complaint.time}`}
                                </span>
                            </div>

                            {/* Message */}
                            <p className="text-[15px] leading-[1.55] text-[#000000] font-medium ">
                                {complaint.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
};

export default ComplaintsDrawer;