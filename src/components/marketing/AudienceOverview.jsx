import { useState } from "react";
import Chart from "react-apexcharts";
import { AUDIENCE_TABS, GENDER_DATA, AGE_RANGE_DATA } from "../../data/marketingData";
import { genderFemaleDonutOptions, genderFemaleDonutSeries, genderUnknownDonutOptions, genderUnknownDonutSeries, genderMaleDonutOptions, genderMaleDonutSeries, genderAnotherIdentityDonutOptions, genderAnotherIdentityDonutSeries } from "../../config/marketingChartConfig";

const AudienceOverview = ({ showLabels = true, title = "Audience Overview", customLabels = null }) => {
  const [audienceTab, setAudienceTab] = useState("this-week");
  const [activeLabel, setActiveLabel] = useState(0); // 0 for first label (Recipients/Impressions)
  
  // Default labels
  const defaultLabels = ["Recipients", "Opens", "Clicks"];
  const labels = customLabels || defaultLabels;

  return (
    <div className="bg-white rounded-sm p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
          {title}
        </h3>
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar w-full sm:w-auto">
          {AUDIENCE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAudienceTab(tab.id)}
              className={`px-3 sm:px-4 py-1.5 text-xs font-medium transition-colors relative whitespace-nowrap ${
                audienceTab === tab.id
                  ? "text-[#109F22] border-b-2 border-[#109F22]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-3 sm:gap-2">
        {/* Gender Section */}
        <div className="border border-[#EEEEEE] py-2 px-2 sm:px-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Gender</h4>
            {showLabels && (
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto hide-scrollbar w-full sm:w-auto">
                {labels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveLabel(index)}
                    className={`pb-1 transition-colors cursor-pointer relative whitespace-nowrap ${
                      activeLabel === index
                        ? "text-gray-900 font-medium"
                        : "text-gray-500 font-normal"
                    }`}
                  >
                    {label}
                    {activeLabel === index && (
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-900"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Donut Chart - Four Separate Circles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-32 h-32 sm:w-40 sm:h-40 relative shrink-0 md:my-0 my-3">
              {/* Outer Circle - Female (Orange) */}
              <div className="absolute inset-0 flex justify-center items-center">
                <Chart
                  options={genderFemaleDonutOptions}
                  series={genderFemaleDonutSeries}
                  type="donut"
                  width="160"
                  height="160"
                />
              </div>
              {/* Outer Circle - Unknown (Black) - Thinner */}
              <div className="absolute inset-0 flex justify-center items-center">
                <Chart
                  options={genderUnknownDonutOptions}
                  series={genderUnknownDonutSeries}
                  type="donut"
                  width="155"
                  height="155"
                />
              </div>
              {/* Inner Circle - Male (Green) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Chart
                  options={genderMaleDonutOptions}
                  series={genderMaleDonutSeries}
                  type="donut"
                  width="120"
                  height="120"
                />
              </div>
              {/* Inner Circle - Another Identity (Light Peach) */}
              <div className="absolute inset-0 flex justify-center items-center">
                <Chart
                  options={genderAnotherIdentityDonutOptions}
                  series={genderAnotherIdentityDonutSeries}
                  type="donut"
                  width="115"
                  height="115"
                />
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 sm:gap-5 w-full sm:w-auto">
              {GENDER_DATA.map((item, index) => (
                <div key={index} className="flex items-center justify-between sm:justify-start gap-4 sm:gap-10">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">
                    {item.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Age Range Section */}
        <div className="border border-[#EEEEEE] px-2 sm:px-3 py-2">
          <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 mb-2 ${showLabels ? 'sm:justify-between' : 'sm:justify-center'}`}>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Age Range</h4>
            {showLabels && (
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto hide-scrollbar w-full sm:w-auto">
                {labels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveLabel(index)}
                    className={`pb-1 transition-colors cursor-pointer relative whitespace-nowrap ${
                      activeLabel === index
                        ? "text-gray-900 font-medium"
                        : "text-gray-500 font-normal"
                    }`}
                  >
                    {label}
                    {activeLabel === index && (
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-900"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Age Range Bars */}
          <div className="space-y-2 sm:space-y-3">
            {AGE_RANGE_DATA.map((item, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-700 w-12 sm:w-16 shrink-0">{item.range}</span>
                <div className="flex-1 bg-gray-200 h-2 relative rounded-full flex min-w-0">
                  {/* Red segment */}
                  <div
                    className="bg-[#F44336] rounded-l-full h-2"
                    style={{ width: `${item.red}%` }}
                  ></div>
                  {/* Green segment */}
                  <div
                    className="bg-[#4CAF50] rounded-r-full h-2"
                    style={{ width: `${item.green}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-gray-900 w-10 sm:w-12 text-right shrink-0">
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 mt-3 sm:mt-2">
        <div className="text-black text-base sm:text-lg font-semibold flex flex-col">
          <span className="font-normal text-xs text-[#464646]">
            Audience Size:
          </span>{" "}
          10,320 - 60,000
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {GENDER_DATA.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceOverview;
