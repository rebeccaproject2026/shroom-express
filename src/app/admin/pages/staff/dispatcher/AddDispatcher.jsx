import { useState, useEffect } from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { X, Check, ArrowUp } from "lucide-react";
import WorkingAreaManager from "../../../components/common/WorkingArea";
import Drawer from "../../../components/common/Drawer";

// Helper function to create default working day payload
const createDefaultWorkingPayload = (dayOfWeek) => ({
    dayOfWeek,
    start: "",
    end: "",
});

const AddDispatcher = ({ isOpen, onClose, isEdit = false, dispatcherData }) => {
    const [formData, setFormData] = useState({
        // Basic Info
        dispatcherName: "",
        dob: "",
        phone: "",
        email: "",

        // Salary
        salary: "",
        salaryPeriod: "monthly",

        // Address
        address: "",
        city: "",
        postalCode: "",
        country: "",
        province: "",

        // Vehicle
        vehicleType: "",
        vehicleInsuranceNumber: "",
        vehicleMakeYear: "",
        vehicleMake: "",
        vehicleModel: "",

        // Other
        criminalRecord: "no",
        workingArea: [""], // Array for multiple working areas
        status: "available",
    });
    const [workingAreas, setWorkingAreas] = useState([""]);
    // Working days state
    const [workingDays, setWorkingDays] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    // Working hours state for each day
    const [workingHours, setWorkingHours] = useState({
        sunday: createDefaultWorkingPayload(0),
        monday: createDefaultWorkingPayload(1),
        tuesday: createDefaultWorkingPayload(2),
        wednesday: createDefaultWorkingPayload(3),
        thursday: createDefaultWorkingPayload(4),
        friday: createDefaultWorkingPayload(5),
        saturday: createDefaultWorkingPayload(6),
    });

    // Populate form when in edit mode
    useEffect(() => {
        if (isEdit && dispatcherData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                dispatcherName: dispatcherData.name || "",
                dob: dispatcherData.dob || "",
                phone: dispatcherData.phone || "",
                email: dispatcherData.email || "",
                salary: dispatcherData.salary?.replace("$", "") || "",
                salaryPeriod: "monthly",
                address: dispatcherData.address || "",
                city: "",
                postalCode: "",
                country: "",
                province: "",
                vehicleType: "",
                vehicleInsuranceNumber: "",
                vehicleMakeYear: "",
                vehicleMake: "",
                vehicleModel: "",
                criminalRecord: "no",
                workingArea: [""],
                status: "available",
            });

            // Parse working days if available (e.g., "Monday - Friday")
            if (dispatcherData.workingDays) {
                const days = dispatcherData.workingDays.toLowerCase();
                setWorkingDays({
                    sunday: days.includes("sunday"),
                    monday: days.includes("monday"),
                    tuesday: days.includes("tuesday"),
                    wednesday: days.includes("wednesday"),
                    thursday: days.includes("thursday"),
                    friday: days.includes("friday"),
                    saturday: days.includes("saturday"),
                });
            }

            // Parse working time if available (e.g., "09:00 to 18:00")
            if (dispatcherData.workingTime) {
                const [start, end] = dispatcherData.workingTime.split(" to ");
                if (start && end) {
                    // Set working hours for all selected days
                    const updatedHours = {};
                    Object.keys(workingDays).forEach((day, index) => {
                        updatedHours[day] = {
                            dayOfWeek: index,
                            start: start.trim(),
                            end: end.trim(),
                        };
                    });
                    setWorkingHours(updatedHours);
                }
            }
        } else if (!isOpen) {
            // Reset form when drawer closes
            setFormData({
                dispatcherName: "",
                dob: "",
                phone: "",
                email: "",
                salary: "",
                salaryPeriod: "monthly",
                address: "",
                city: "",
                postalCode: "",
                country: "",
                province: "",
                vehicleType: "",
                vehicleInsuranceNumber: "",
                vehicleMakeYear: "",
                vehicleMake: "",
                vehicleModel: "",
                criminalRecord: "no",
                workingArea: [""],
                status: "available",
            });
            setWorkingAreas([""]);
            setWorkingDays({
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
            });
            setWorkingHours({
                sunday: createDefaultWorkingPayload(0),
                monday: createDefaultWorkingPayload(1),
                tuesday: createDefaultWorkingPayload(2),
                wednesday: createDefaultWorkingPayload(3),
                thursday: createDefaultWorkingPayload(4),
                friday: createDefaultWorkingPayload(5),
                saturday: createDefaultWorkingPayload(6),
            });
        }
    }, [isEdit, dispatcherData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleWorkingDayChange = (day) => {
        setWorkingDays((prev) => ({
            ...prev,
            [day]: !prev[day],
        }));
    };

    const handleWorkingHourChange = (day, field, value) => {
        setWorkingHours((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value,
            },
        }));
    };


    // Convert time string (HH:mm) to number format (HHMM)
    const convertTimeToNumber = (timeString) => {
        if (!timeString) return 0;
        return parseInt(timeString.replace(":", ""), 10);
    };
    const handleSubmit = () => {
        // Prepare working schedule data
        const workingSchedule = [];

        if (workingDays.sunday && workingHours.sunday.start && workingHours.sunday.end) {
            workingSchedule.push({
                dayOfWeek: 0,
                start: convertTimeToNumber(workingHours.sunday.start),
                end: convertTimeToNumber(workingHours.sunday.end),
            });
        }
        if (workingDays.monday && workingHours.monday.start && workingHours.monday.end) {
            workingSchedule.push({
                dayOfWeek: 1,
                start: convertTimeToNumber(workingHours.monday.start),
                end: convertTimeToNumber(workingHours.monday.end),
            });
        }
        if (workingDays.tuesday && workingHours.tuesday.start && workingHours.tuesday.end) {
            workingSchedule.push({
                dayOfWeek: 2,
                start: convertTimeToNumber(workingHours.tuesday.start),
                end: convertTimeToNumber(workingHours.tuesday.end),
            });
        }
        if (workingDays.wednesday && workingHours.wednesday.start && workingHours.wednesday.end) {
            workingSchedule.push({
                dayOfWeek: 3,
                start: convertTimeToNumber(workingHours.wednesday.start),
                end: convertTimeToNumber(workingHours.wednesday.end),
            });
        }
        if (workingDays.thursday && workingHours.thursday.start && workingHours.thursday.end) {
            workingSchedule.push({
                dayOfWeek: 4,
                start: convertTimeToNumber(workingHours.thursday.start),
                end: convertTimeToNumber(workingHours.thursday.end),
            });
        }
        if (workingDays.friday && workingHours.friday.start && workingHours.friday.end) {
            workingSchedule.push({
                dayOfWeek: 5,
                start: convertTimeToNumber(workingHours.friday.start),
                end: convertTimeToNumber(workingHours.friday.end),
            });
        }
        if (workingDays.saturday && workingHours.saturday.start && workingHours.saturday.end) {
            workingSchedule.push({
                dayOfWeek: 6,
                start: convertTimeToNumber(workingHours.saturday.start),
                end: convertTimeToNumber(workingHours.saturday.end),
            });
        }

        const submitData = {
            ...formData,
            workingSchedule,
        };

        console.log("Submitted Data:", submitData);
        onClose();
    };

    // Working days array for rendering
    const daysOfWeek = [
        { key: "sunday", label: "Sunday" },
        { key: "monday", label: "Monday" },
        { key: "tuesday", label: "Tuesday" },
        { key: "wednesday", label: "Wednesday" },
        { key: "thursday", label: "Thursday" },
        { key: "friday", label: "Friday" },
        { key: "saturday", label: "Saturday" },
    ];

    return (
        // <Dialog
        //     isOpen={isOpen}
        //     onClose={onClose}
        //     title="Add Dispatcher"
        //     maxWidth="max-w-5xl"
        //     actions={[
        //         {
        //             label: "Cancel",
        //             variant: "secondary",
        //             icon: X,
        //             onClick: onClose,
        //         },
        //         {
        //             label: "Save",
        //             variant: "primary",
        //             icon: ArrowUp,
        //             onClick: handleSubmit,
        //         },
        //     ]}
        // >
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            width="w-full sm:w-[95vw] md:w-[90vw] lg:w-[88vw] max-w-[100vw]"
        >
            {/* Fixed Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 border-b border-[#DDDDDD] bg-white gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-[#212121]">
                    {isEdit ? "Edit Dispatcher" : "Add Dispatcher"}
                </h2>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-400 text-[#212121] rounded-sm font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[var(--color-primary)] text-white rounded-sm font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <ArrowUp className="w-4 h-4" />
                        Save
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-2">
                {/* Dispatcher Details Section Header */}
                <h3 className="text-base sm:text-lg font-semibold text-[#212121] mb-3 sm:mb-4">
                    Dispatcher Details
                </h3>

                <div className="flex flex-col gap-4">
                    {/* Form Grid - 4 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
                        {/* Row 1 */}
                        <Input
                            label="Dispatcher Name"
                            name="dispatcherName"
                            value={formData.dispatcherName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />
                        <Input
                            label="Date of Birth"
                            name="dob"
                            type="text"
                            value={formData.dob}
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />
                        <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your number"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />
                        <Input
                            label="salary"
                            name="salary"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter Salary"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />
                        <Input
                            label="Home Address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />
                        <Input
                            label="City"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city name"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />

                        {/* Row 4 */}
                        <Input
                            label="Postal Code"
                            name="postalCode"
                            type="text"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Enter your zip code"
                            labelClassName="text-xs sm:text-sm font-medium text-[#212121]"
                            className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                        />
                        <div className="flex flex-col gap-1">
                            <label className="text-xs sm:text-sm font-medium text-[#212121]">
                                Country
                            </label>
                            <Select
                                name="country"
                                options={[
                                    { value: "canada", label: "Canada" },
                                    { value: "usa", label: "USA" },
                                ]}
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Select your country"
                                className="border-[#DDDDDD] text-gray-900! rounded-sm text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs sm:text-sm font-medium text-[#212121]">
                                Province
                            </label>
                            <Select
                                name="province"
                                options={[
                                    { value: "ontario", label: "Ontario" },
                                    { value: "quebec", label: "Quebec" },
                                ]}
                                value={formData.province}
                                onChange={handleChange}
                                placeholder="Select province"
                                className="border-[#DDDDDD] text-gray-900! rounded-sm text-sm"
                            />
                        </div>
                    </div>

                    {/* Working Area Section */}

                    <WorkingAreaManager
                        value={workingAreas}
                        onChange={(areas) => setWorkingAreas(areas)}
                    />
                    {/* Work Schedule Section */}
                    <div className="flex flex-col gap-2 mt-2">
                        <h2 className="text-sm sm:text-base font-semibold text-[#212121]">
                            Work Schedule
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-500">
                            Select Working Days
                        </p>

                        {/* Days Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                            {daysOfWeek.map((day) => (
                                <div
                                    key={day.key}
                                    onClick={() => handleWorkingDayChange(day.key)}
                                    className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-sm cursor-pointer transition-all border border-[#DDDDDD]`}
                                >
                                    {/* Circle */}
                                    <div
                                        className={`w-5 h-5 flex items-center justify-center rounded-full shrink-0
          ${workingDays[day.key]
                                                ? "bg-[var(--color-secondary)]"
                                                : "border border-gray-400"
                                            }`}
                                    >
                                        {workingDays[day.key] && (<Check className="w-3 h-3 text-white font-bold" strokeWidth={4} />
                                        )}
                                    </div>

                                    <span className="text-xs sm:text-sm font-medium text-[#212121]">
                                        {day.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Working Hours (Only show first selected day like screenshot) */}
                        {Object.keys(workingDays).some((d) => workingDays[d]) && (
                            <div className="mt-3 sm:mt-4 flex flex-col gap-4 sm:gap-6">
                                {daysOfWeek.map(
                                    (day) =>
                                        workingDays[day.key] && (
                                            <div key={day.key} className="w-full">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                                    {/* START TIME */}
                                                    <Input
                                                        type="time"
                                                        label={`Working Hours (${day.label}) Start (GMT+5:30)`}
                                                        value={workingHours[day.key].start}
                                                        onChange={(e) =>
                                                            handleWorkingHourChange(
                                                                day.key,
                                                                "start",
                                                                e.target.value
                                                            )
                                                        }
                                                        width="full"
                                                        compact
                                                        className="border-gray-300 text-[#212529]/60"
                                                        labelClassName="text-xs sm:text-sm font-medium text-[#212529]/60"
                                                    />

                                                    {/* END TIME */}
                                                    <Input
                                                        type="time"
                                                        label="End"
                                                        value={workingHours[day.key].end}
                                                        onChange={(e) =>
                                                            handleWorkingHourChange(
                                                                day.key,
                                                                "end",
                                                                e.target.value
                                                            )
                                                        }
                                                        width="full"
                                                        compact
                                                        labelClassName="text-xs sm:text-sm font-medium text-[#212529]/60"
                                                        className="border-gray-300 text-[#212529]/60"
                                                    />

                                                </div>

                                            </div>
                                        )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default AddDispatcher;