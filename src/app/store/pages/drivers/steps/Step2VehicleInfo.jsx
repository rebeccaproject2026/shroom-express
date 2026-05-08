import React from 'react';
import { Icon } from '@iconify/react';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';

const Step2VehicleInfo = ({ formData, setFormData }) => {
    React.useEffect(() => {
        if (!formData.licensePlate) {
            setFormData({
                ...formData,
                vehicleType: 'Vehicle',
                licensePlate: 'SHRM-DRV-2024',
                modelYear: 'Ford Transit (2023)',
                workingDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
                dayHours: {
                    'MON': { open: '08:00', close: '20:00' },
                    'TUE': { open: '08:00', close: '20:00' },
                    'WED': { open: '08:00', close: '20:00' },
                    'THU': { open: '08:00', close: '20:00' },
                    'FRI': { open: '08:00', close: '20:00' },
                }
            });
        }
    }, []);

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleDay = (day) => {
        const currentDays = [...formData.workingDays];
        const newDayHours = { ...(formData.dayHours || {}) };

        if (currentDays.includes(day)) {
            const newDays = currentDays.filter(d => d !== day);
            setFormData({ ...formData, workingDays: newDays });
        } else {
            const newDays = [...currentDays, day];
            if (!newDayHours[day]) {
                newDayHours[day] = { open: '08:00', close: '20:00' };
            }
            setFormData({ ...formData, workingDays: newDays, dayHours: newDayHours });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-4">
            <div className="flex flex-col gap-1.5">
                <label className="!text-[#222222] text-sm !font-bold ">Vehicle Type</label>
                <Select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    options={[
                        { value: 'Vehicle', label: 'Vehicle' },
                        { value: 'Motorcycle', label: 'Motorcycle' }
                    ]}
                    placeholder="Select Vehicle Type"
                    className="!rounded-md !border-[#E5DCDC] !py-2.5"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label="License Plate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    placeholder="LOGI-TX-2024"
                    className=" !border-[#E5DCDC] !py-2.5 font-medium "
                    labelClassName="!text-[#222222] !font-bold !mb-1"
                />
                <Input
                    label="Model / Year"
                    name="modelYear"
                    value={formData.modelYear}
                    onChange={handleInputChange}
                    placeholder="Mercedes-Benz (2022)"
                    className=" !border-[#E5DCDC] !py-2.5 font-medium "
                    labelClassName="!text-[#222222] !font-bold !mb-1"
                />
            </div>

            {/* WORKING DAYS */}
            <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-[#222222] uppercase tracking-wide">WORKING DAYS</label>
                <div className="flex flex-wrap gap-2.5">
                    {days.map(day => {
                        const isActive = formData.workingDays.includes(day);
                        return (
                            <div
                                key={day}
                                className={`flex flex-col items-center justify-center w-[55px] h-[55px] border-[1.5px] rounded-xl cursor-pointer transition-all ${isActive ? 'bg-[#FFF0EE] border-[#E93E2B] text-[#E93E2B]' : 'bg-[#F9F9F9] border-[#E8E8E8] text-[#4B5563]'}`}
                                onClick={() => toggleDay(day)}
                            >
                                <span className="text-[10px] font-bold mb-1">{day}</span>
                                {isActive ? (
                                    <Icon icon="solar:check-circle-linear" width="16" height="16" />
                                ) : (
                                    <div className="w-3.5 h-3.5 rounded-full border border-[#636363]"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SHIFT TIMINGS per Day */}
            <div className="space-y-4 pt-2">
                {formData.workingDays.sort((a, b) => days.indexOf(a) - days.indexOf(b)).map((day) => {
                    const dayFullNames = {
                        MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday',
                        FRI: 'Friday', SAT: 'Saturday', SUN: 'Sunday'
                    };
                    return (
                        <div key={day} className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 animate-in fade-in slide-in-from-top-2 duration-300 border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#222222]">Start Time ({dayFullNames[day]})</label>
                                <div className="relative">
                                    <Icon icon="iconamoon:clock-light" width="18" height="18" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                    <input
                                        type="time"
                                        className="w-full pl-11 pr-4 text-sm border !border-[#E5DCDC] !py-2.5 font-medium bg-white text-[#333333]  focus:outline-none rounded-md transition-all"
                                        value={formData.dayHours?.[day]?.open || ''}
                                        onChange={(e) => {
                                            const newDayHours = { ...(formData.dayHours || {}) };
                                            newDayHours[day] = { ...(newDayHours[day] || {}), open: e.target.value };
                                            setFormData({ ...formData, dayHours: newDayHours });
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-[#222222]">End Time ({dayFullNames[day]})</label>
                                <div className="relative">
                                    <Icon icon="iconamoon:clock-light" width="18" height="18" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#222222] pointer-events-none" />
                                    <input
                                        type="time"
                                        className="w-full pl-11 pr-4 text-sm border !border-[#E5DCDC] !py-2.5 font-medium bg-white text-[#333333]  focus:outline-none rounded-md transition-all"
                                        value={formData.dayHours?.[day]?.close || ''}
                                        onChange={(e) => {
                                            const newDayHours = { ...(formData.dayHours || {}) };
                                            newDayHours[day] = { ...(newDayHours[day] || {}), close: e.target.value };
                                            setFormData({ ...formData, dayHours: newDayHours });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Step2VehicleInfo;
