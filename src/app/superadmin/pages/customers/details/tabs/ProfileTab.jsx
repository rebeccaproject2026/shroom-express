import React from "react";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";

const ProfileTab = ({ customer }) => {
    const chartOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            colors: ['#EA3D2A'],
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.35,
                opacityTo: 0.05,
                stops: [0, 100],
                colorStops: [
                    { offset: 0, color: "#EA3D2A", opacity: 0.3 },
                    { offset: 100, color: "#EA3D2A", opacity: 0 }
                ]
            }
        },
        markers: {
            size: 5,
            colors: ['#EA3D2A'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: { size: 7 }
        },
        xaxis: {
            categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#64748B', fontSize: '13px', fontBold: 500 }
            }
        },
        yaxis: { show: false },
        grid: { show: false },
        tooltip: {
            theme: 'light',
            marker: { show: false },
            x: { show: false }
        }
    };

    const chartSeries = [{
        name: 'Spend',
        data: [25, 45, 65, 55, 95, 35]
    }];

    return (
        <div className="space-y-12">
            {/* Profile Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20 mb-10 max-w-5xl">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-[#181211]">Preferred Store</p>
                    <p className="text-[22px] font-semibold text-[#181211] tracking-tight">{customer.preferredStore || "Nature's Best"}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-[#181211]">Preferred Product</p>
                    <p className="text-[22px] font-semibold text-[#181211] tracking-tight">{customer.preferredProduct || "Lion's Mane Powder"}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-[#181211]">Payment Status</p>
                    <div className="flex items-center gap-2 text-[#219653]">
                        <Icon icon="fluent:checkmark-12-filled" width="22" strokeWidth={2} />
                        <span className="text-[22px] font-semibold tracking-tight">{customer.paymentStatus || "Verified"}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-[#181211]">Member Since</p>
                    <p className="text-[22px] font-semibold text-[#181211] tracking-tight">{customer.memberSince || customer.joinedDate}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-md border border-[#E2E8F0] shadow-[0px_1px_2px_0px_#0000000D] mb-2.5">
                <h3 className="text-[22px] font-semibold text-[#181211] mb-8">6-Month Spend Trend</h3>
                <div className="w-full h-[320px] -ml-2">
                    <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={320} />
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;
