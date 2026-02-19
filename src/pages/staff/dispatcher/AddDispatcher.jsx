import { useState } from "react";
import Dialog from "../../../components/common/Dialog";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { ChevronDown, X, ArrowUp } from "lucide-react";

// Helper function to create default working day payload
const createDefaultWorkingPayload = (dayOfWeek) => ({
    dayOfWeek,
    start: "",
    end: "",
});

const AddDispatcher = ({ isOpen, onClose }) => {
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

    const [timezoneAbbr, setTimezoneAbbr] = useState("");

    // Get timezone abbreviation on component mount
    useState(() => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
        });
        const parts = formatter.formatToParts(now);
        const abbr = parts.find((p) => p.type === "timeZoneName")?.value || "";
        setTimezoneAbbr(abbr);
    }, []);

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

    const handleWorkingAreaChange = (index, value) => {
        const updatedWorkingAreas = [...formData.workingArea];
        updatedWorkingAreas[index] = value;
        setFormData((prev) => ({
            ...prev,
            workingArea: updatedWorkingAreas,
        }));
    };

    const addWorkingArea = () => {
        setFormData((prev) => ({
            ...prev,
            workingArea: [...prev.workingArea, ""],
        }));
    };

    const removeWorkingArea = (index) => {
        if (formData.workingArea.length > 1) {
            const updatedWorkingAreas = formData.workingArea.filter((_, i) => i !== index);
            setFormData((prev) => ({
                ...prev,
                workingArea: updatedWorkingAreas,
            }));
        }
    };

    // Convert time string (HH:mm) to number format (HHMM)
    const convertTimeToNumber = (timeString) => {
        if (!timeString) return 0;
        return parseInt(timeString.replace(":", ""), 10);
    };

    // Validate timing (end time must be after start time)
    const validateTiming = (startTime, endTime) => {
        if (!startTime || !endTime) return true;

        const startMinutes = timeStringToMinutes(startTime);
        const endMinutes = timeStringToMinutes(endTime);

        return endMinutes > startMinutes;
    };

    const timeStringToMinutes = (timeString) => {
        if (!timeString) return 0;
        const [hours, minutes] = timeString.split(":").map(Number);
        return (hours || 0) * 60 + (minutes || 0);
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
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Add Dispatcher"
            maxWidth="max-w-5xl"
            actions={[
                {
                    label: "Cancel",
                    variant: "secondary",
                    icon: X,
                    onClick: onClose,
                },
                {
                    label: "Save",
                    variant: "primary",
                    icon: ArrowUp,
                    onClick: handleSubmit,
                },
            ]}
        >
            <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto px-1">
                {/* Form Grid - 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                    {/* Row 1 */}
                    <Input
                        label="Dispatcher Name"
                        name="dispatcherName"
                        value={formData.dispatcherName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        labelClassName="text-sm font-medium text-[#212121]"
                        className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                    />
                    <Input
                        label="Date of Birth"
                        name="dob"
                        type="text"
                        value={formData.dob}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                        labelClassName="text-sm font-medium text-[#212121]"
                        className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                    />
                    <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your number"
                        labelClassName="text-sm font-medium text-[#212121]"
                        className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        labelClassName="text-sm font-medium text-[#212121]"
                        className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                    />

                    {/* Row 2 */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-[#212121]">
                            Salary
                        </label>
                        <div className="flex items-stretch border border-[#DDDDDD] rounded-sm bg-white">
                            <input
                                name="salary"
                                type="text"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="Enter Salary"
                                className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none"
                                style={{ border: 'none', outline: 'none' }}
                            />
                        </div>
                    </div>
                    <Input
                        label="Home Address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        labelClassName="text-sm font-medium text-[#212121]"
                        className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                    />
                    <Input
                        label="City"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city name"
                        labelClassName="text-sm font-medium text-[#212121]"
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
                        labelClassName="text-sm font-medium text-[#212121]"
                        className="border-[#DDDDDD] rounded-sm text-sm py-2!"
                    />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-[#212121]">
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
                        <label className="text-sm font-medium text-[#212121]">
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
                <div className="flex flex-col gap-2.5 mt-4">
                    <h2 className="text-base font-semibold text-[#212121]">
                        Working Area
                    </h2>

                    {formData.workingArea.map((area, index) => (
                        <div key={index} className="border border-[#C5C5C5] rounded-md p-3 flex flex-col gap-2.5">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-[#212121]">
                                        Area Code {index + 1}
                                    </label>
                                    {formData.workingArea.length > 1 && index === formData.workingArea.length - 1 && (
                                        <button
                                            onClick={() => removeWorkingArea(index)}
                                            className="text-red-500 text-sm hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <input
                                    value={area}
                                    onChange={(e) => handleWorkingAreaChange(index, e.target.value)}
                                    placeholder="Enter area code (e.g., M2N 3X1)"
                                    className="w-full px-3 py-2 text-sm border border-[#D9D9D9] rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addWorkingArea}
                        className="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1 mt-2"
                    >
                        <span>+</span> Add more...
                    </button>
                </div>

                {/* Work Schedule Section */}
                <div className="flex flex-col gap-3 mt-4">
                    <h2 className="text-base font-semibold text-[#212121]">
                        Work Schedule
                    </h2>

                    {/* Working Days Selection */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                        {daysOfWeek.map((day) => (
                            <label
                                key={day.key}
                                className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${workingDays[day.key]
                                    ? "bg-blue-50 border-blue-500 text-blue-700"
                                    : "border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={workingDays[day.key]}
                                    onChange={() => handleWorkingDayChange(day.key)}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium">{day.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Working Hours for Selected Days */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {daysOfWeek.map((day) => (
                            workingDays[day.key] && (
                                <div key={day.key} className="border rounded-md p-3">
                                    <h3 className="text-sm font-semibold text-[#212121] mb-2">
                                        {day.label}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs text-gray-500 mb-1 block">
                                                Start ({timezoneAbbr})
                                            </label>
                                            <input
                                                type="time"
                                                value={workingHours[day.key].start}
                                                onChange={(e) => handleWorkingHourChange(day.key, "start", e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-[#D9D9D9] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                step="60"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 mb-1 block">
                                                End
                                            </label>
                                            <input
                                                type="time"
                                                value={workingHours[day.key].end}
                                                onChange={(e) => handleWorkingHourChange(day.key, "end", e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-[#D9D9D9] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                step="60"
                                            />
                                        </div>
                                    </div>
                                    {workingHours[day.key].start &&
                                        workingHours[day.key].end &&
                                        !validateTiming(workingHours[day.key].start, workingHours[day.key].end) && (
                                            <p className="text-xs text-red-500 mt-1">
                                                End time must be after start time
                                            </p>
                                        )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default AddDispatcher;