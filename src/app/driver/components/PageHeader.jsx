import React from 'react';

const PageHeader = ({ title = "👋 Welcome, David Doe", className = "" }) => {
    return (
        <div className={`mb-6 shrink-0 ${className}`}>
            <h1 className="text-lg font-semibold text-[#222222]">
                {title}
            </h1>
        </div>
    );
};

export default PageHeader;
