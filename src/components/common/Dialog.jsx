import { X } from "lucide-react";

const Dialog = ({
    isOpen,
    onClose,
    title,
    children,
    actions = [],
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-[95%] max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDDDDD]">
                    <h2 className="text-base font-semibold text-[#212121]">
                        {title}
                    </h2>

                    {/* Action Buttons */}
                    {actions.length > 0 && (
                        <div className="flex gap-2">
                            {actions.map((action, index) => {
                                const Icon = action.icon;

                                return (
                                    <button
                                        key={index}
                                        type={action.type || "button"}
                                        onClick={action.onClick}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm font-semibold text-sm transition-colors cursor-pointer ${action.variant === "primary"
                                            ? "bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
                                            : action.variant === "danger"
                                                ? "bg-red-600 text-white hover:bg-red-700"
                                                : "bg-white border border-gray-400 text-[#212121] hover:bg-gray-50"
                                            }`}
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        {action.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
