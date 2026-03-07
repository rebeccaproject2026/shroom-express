import React, { useState } from "react";
import { Icon } from "@iconify/react";
import TicketDrawer from "../../components/support/TicketDrawer";
import PageHeader from "../../components/PageHeader";

const Support = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [drawerState, setDrawerState] = useState({ isOpen: false, type: "raise" });

  const openDrawer = (type) => setDrawerState({ isOpen: true, type });
  const closeDrawer = () => setDrawerState({ isOpen: false, type: drawerState.type });

  const faqs = [
    {
      q: "How to update my bank details?",
      a: "You can update your banking information under Settings > Earnings Profile. Please note that for security reasons, verification may take up to 48 hours before the new account is active.",
    },
    {
      q: "What to do if a customer is not available?",
      a: "If a customer is not available at the delivery location, please try calling them. If they are still unreachable after 5 minutes, mark the delivery as 'Customer Unavailable' and select the appropriate return reason.",
    },
    {
      q: "Vehicle inspection requirements?",
      a: "All vehicles must undergo a safety inspection every 6 months. Documentation must be submitted through the portal. Failure to comply will result in temporary suspension of orders.",
    },
    {
      q: "Incentives and weekly bonus structure?",
      a: "Bonuses are calculated based on completing a minimum number of trips with a rating of 4.5 or higher. Check the 'Earnings' tab every Monday for the updated weekly goals.",
    },
  ];

  const tickets = [
    {
      title: "Payment Dispute - Trip #991",
      desc: "I am raising a payment dispute regarding a recent...",
      status: "Pending",
    },
    {
      title: "App login issues on iOS",
      desc: "I am raising a payment dispute regarding a recent...",
      status: "Resolved",
    },
    {
      title: "Payment Dispute - Trip #991",
      desc: "I am raising a payment dispute regarding a recent...",
      status: "Pending",
    },
    {
      title: "Address update request",
      desc: "I am raising a payment dispute regarding a recent...",
      status: "Resolved",
    },
  ];

  return (
    <div className="p-4  bg-[#F5F5F5]">
      {/* Header */}
      <PageHeader />

      {/* Top Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-5">
        {/* Raise a Ticket */}
        <div className="bg-white rounded-md shadow-sm border border-[#E8E8E8] p-4 ">
          <div className="w-10 h-10 rounded-sm text-[#1142D4] bg-[#DBEAFE] flex items-center justify-center mb-3.5">
            <Icon icon="mynaui:ticket" width="22" height="22" className="text-[#0F4CBD]" />
          </div>
          <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Raise a Ticket</h3>
          <p className="text-[13px] font-medium text-[#64748B] mb-2.5 leading-snug">
            Open a new help request for account or payment issues.
          </p>
          <a href="#" onClick={(e) => { e.preventDefault(); openDrawer('raise'); }} className="mt-auto flex items-center gap-1 text-[13px] font-bold text-[#0F4CBD] hover:underline">
            Start Request<Icon icon="streamline:next" width="16" height="16" />
          </a>
        </div>

        {/* Contact Admin */}
        <div className="bg-white rounded-md shadow-sm border border-[#E8E8E8] p-4">
          <div className="w-10 h-10 rounded-sm text-[#16A34A] bg-[#DCFCE7] flex items-center justify-center mb-3">
            <Icon icon="proicons:chat" width="22" height="22" className="text-[#16A34A]" />
          </div>
          <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Contact Admin</h3>
          <p className="text-[13px] font-medium text-[#64748B] mb-2.5 leading-snug">
            Directly chat or call an administrator for immediate help.
          </p>
          <div className="mt-auto flex items-center gap-2.5">
            <button className="bg-[#0F4CBD]/10 text-[#0F4CBD] text-[12px] font-semibold px-5 py-1.5 rounded-sm uppercase tracking-wide hover:bg-blue-100 transition-colors cursor-pointer">
              CHAT
            </button>
            <button className="bg-[#DCFCE7] text-[#16A34A] text-[12px] font-semibold px-5 py-1.5 rounded-sm uppercase tracking-wide hover:bg-green-100 transition-colors cursor-pointer">
              CALL
            </button>
          </div>
        </div>

        {/* Report Issue */}
        <div className="bg-white rounded-md shadow-sm border border-[#E8E8E8] p-4 ">
          <div className="w-10 h-10 rounded-sm text-[#DC2626] bg-[#FEE2E2] flex items-center justify-center mb-3">
            <Icon icon="ic:outline-report" width="22" height="22" className="text-[#DC2626]" />
          </div>
          <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Report Issue</h3>
          <p className="text-[13px] font-medium text-[#64748B] mb-2.5 leading-snug">
            Report problems with active deliveries or route guidance.
          </p>
          <a href="#" onClick={(e) => { e.preventDefault(); openDrawer('report'); }} className="mt-auto flex items-center gap-2 text-[13px] font-bold text-[#DC2626] hover:underline">
            Report Now <Icon icon="streamline:next" width="16" height="16" />
          </a>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

        {/* FAQ */}
        <div className="lg:col-span-2 bg-white rounded-md shadow-sm border border-[#E8E8E8] flex flex-col">
          {/* Header */}
          <div className="px-5 py-4  flex items-center gap-2.5">
            <Icon icon="mynaui:ticket" width="22" height="22" className="text-[#0F4CBD]" />
            <h2 className="text-base font-semibold text-[#0F172A]">Frequently Asked Questions</h2>
          </div>
          {/* Body */}
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#E8E8E8] last:border-b-0">
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <h4 className="text-sm font-semibold text-[#222222]">{faq.q}</h4>
                  <Icon
                    icon="heroicons:chevron-down-20-solid"
                    width="22"
                    height="22"
                    className={`text-gray-600 transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </div>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-[13px] font-semibold  text-[#64748B] leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* My Tickets */}
        <div className="lg:col-span-1 bg-white rounded-md shadow-sm border border-[#E8E8E8] flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E8E8E8] flex items-center gap-2.5">
            <Icon icon="mynaui:ticket" width="22" height="22" className="text-[#0F4CBD]" />
            <h2 className="text-base font-semibold text-[#0F172A]">My Tickets</h2>
          </div>
          {/* Body */}
          <div className="flex flex-col">
            {tickets.map((ticket, index) => (
              <div key={index} className="flex justify-between items-start p-4 border-b border-[#E8E8E8] last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex-1 pr-4 min-w-0">
                  <h4 className="text-[13px] font-semibold text-[#222222] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {ticket.title}
                  </h4>
                  <p className="text-xs font-medium text-[#777777] whitespace-nowrap overflow-hidden text-ellipsis">
                    {ticket.desc}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${ticket.status === 'Pending'
                    ? 'bg-[#FEF9C3] text-[#A16207]'
                    : 'bg-[#DCFCE7] text-[#15803D]'
                    }`}
                >
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <TicketDrawer
        isOpen={drawerState.isOpen}
        onClose={closeDrawer}
        type={drawerState.type}
      />
    </div>
  );
};

export default Support;
