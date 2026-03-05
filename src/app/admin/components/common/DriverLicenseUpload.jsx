import { useRef, useState, useEffect } from "react";

const DriverLicenseUpload = ({
    // driverId,
    currentFront = "",
    currentBack = "",
    onUploadFront,
    onUploadBack,
}) => {
    const [front, setFront] = useState(currentFront);
    const [back, setBack] = useState(currentBack);

    const frontInputRef = useRef(null);
    const backInputRef = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFront(currentFront);
        setBack(currentBack);
    }, [currentFront, currentBack]);

    const handleFileUpload = async (file, type) => {
        if (!file) return;

        /* =========================
           STATIC MODE (ACTIVE)
           ========================= */
        if (type === "front") {
            setFront(file);
            onUploadFront && onUploadFront(file);
        } else {
            setBack(file);
            onUploadBack && onUploadBack(file);
        }

        /* =========================
           API MODE (COMMENTED)
           ========================= */

        /*
        const formData = new FormData();
        formData.append("file", file);
    
        try {
          const endpoint =
            type === "front"
              ? `/api/v1/customer/driver-license-card-front/${driverId}`
              : `/api/v1/customer/driver-license-card-back/${driverId}`;
    
          const res = await fetch(endpoint, {
            method: "POST",
            body: formData,
          });
    
          const data = await res.json();
    
          if (type === "front") {
            setFront(data.file);
            onUploadFront && onUploadFront(data.file);
          } else {
            setBack(data.file);
            onUploadBack && onUploadBack(data.file);
          }
        } catch (error) {
          console.error("Upload error:", error);
        }
        */
    };

    const handleChange = (e, type) => {
        const file = e.target.files[0];
        handleFileUpload(file, type);
    };

    const handleRemove = (type) => {
        if (type === "front") {
            setFront("");
            onUploadFront && onUploadFront(null);
            if (frontInputRef.current) frontInputRef.current.value = "";
        } else {
            setBack("");
            onUploadBack && onUploadBack(null);
            if (backInputRef.current) backInputRef.current.value = "";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* FRONT */}
            <div className="flex flex-col items-center justify-center border border-[#D9D9D9] rounded-sm px-8 py-12 bg-white hover:border-gray-400 transition-colors cursor-pointer">

                <input
                    type="file"
                    ref={frontInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "front")}
                />

                {!front ? (
                    <div
                        className="w-full flex flex-col items-center cursor-pointer"
                        onClick={() => frontInputRef.current.click()}
                    >
                        <UploadPlaceholder label="Front side" />
                    </div>
                ) : (
                    <>
                        <img
                            src={
                                typeof front === "string"
                                    ? `http://api.spamadmin.cloud/files/${front}`
                                    : URL.createObjectURL(front)
                            }
                            alt="Front"
                            className="w-full max-h-52 object-contain rounded-sm"
                        />

                        <button
                            type="button"
                            onClick={() => handleRemove("front")}
                            className="mt-4 bg-red-600 text-white text-sm px-4 py-1.5 rounded hover:bg-red-700 transition"
                        >
                            Remove file
                        </button>
                    </>
                )}
            </div>

            {/* BACK */}
            <div className="flex flex-col items-center justify-center border border-[#D9D9D9] rounded-sm px-8 py-12 bg-white hover:border-gray-400 transition-colors cursor-pointer">

                <input
                    type="file"
                    ref={backInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "back")}
                />

                {!back ? (
                    <div
                        className="w-full flex flex-col items-center cursor-pointer"
                        onClick={() => backInputRef.current.click()}
                    >
                        <UploadPlaceholder label="Back side" />
                    </div>
                ) : (
                    <>
                        <img
                            src={
                                typeof back === "string"
                                    ? `http://api.spamadmin.cloud/files/${back}`
                                    : URL.createObjectURL(back)
                            }
                            alt="Back"
                            className="w-full max-h-52 object-contain rounded-sm"
                        />

                        <button
                            type="button"
                            onClick={() => handleRemove("back")}
                            className="mt-4 bg-red-600 text-white text-sm px-4 py-1.5 rounded hover:bg-red-700 transition"
                        >
                            Remove file
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const UploadPlaceholder = ({ label }) => (
    <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
                className="w-12 h-12 text-[#D9D9D9]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
            </svg>
        </div>

        <div className="text-center">
            <p className="text-sm text-gray-600">
                Select your file or drag and drop it here
            </p>
        </div>

        <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
);

export default DriverLicenseUpload;