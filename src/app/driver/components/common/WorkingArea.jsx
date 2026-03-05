import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Input from "../Input";

const WorkingAreaManager = ({
    value = [],
    onChange,
    label = "Working Area",
}) => {
    const [workingAreas, setWorkingAreas] = useState(
        value.length ? value : [""]
    );

    const workingAreaRefs = useRef([]);
    const workingAreaMaps = useRef([]);

    const hasMapToken =
        typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined" &&
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    // -----------------------------------
    // Sync parent value
    // -----------------------------------
    useEffect(() => {
        if (onChange) {
            onChange(workingAreas);
        }
    }, [workingAreas]);

    // -----------------------------------
    // Add / Remove
    // -----------------------------------
    const addWorkingArea = () => {
        setWorkingAreas((prev) => [...prev, ""]);
    };

    const removeWorkingArea = (index) => {
        setWorkingAreas((prev) => prev.filter((_, i) => i !== index));

        if (workingAreaMaps.current[index]) {
            workingAreaMaps.current[index].remove();
            workingAreaMaps.current[index] = null;
        }
    };

    // -----------------------------------
    // Initialize Maps
    // -----------------------------------
    useEffect(() => {
        if (!hasMapToken) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        workingAreas.forEach((_, index) => {
            if (!workingAreaRefs.current[index]) return;
            if (workingAreaMaps.current[index]) return;

            const map = new mapboxgl.Map({
                container: workingAreaRefs.current[index],
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-79.3832, 43.6532],
                zoom: 12,
            });

            map.addControl(
                new mapboxgl.NavigationControl({ showCompass: false }),
                "top-right"
            );

            workingAreaMaps.current[index] = map;
        });

        return () => {
            workingAreaMaps.current.forEach((map) => map?.remove());
            workingAreaMaps.current = [];
        };
    }, [workingAreas]);

    // -----------------------------------
    // Geocode + Draw Polygon
    // -----------------------------------
    const geocodePostalCode = async (postalCode, map, index) => {
        if (!postalCode || postalCode.length < 3 || !map) return;

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    postalCode
                )}.json?access_token=${mapboxgl.accessToken}&types=postcode&limit=1`
            );

            const data = await response.json();

            if (data.features?.length) {
                const feature = data.features[0];
                map.setCenter(feature.center);

                if (map.getSource(`polygon-${index}`)) {
                    map.removeLayer(`polygon-fill-${index}`);
                    map.removeLayer(`polygon-stroke-${index}`);
                    map.removeSource(`polygon-${index}`);
                }

                if (feature.bbox) {
                    const [minLng, minLat, maxLng, maxLat] = feature.bbox;

                    const coords = [
                        [maxLng, maxLat],
                        [minLng, maxLat],
                        [minLng, minLat],
                        [maxLng, minLat],
                        [maxLng, maxLat],
                    ];

                    map.addSource(`polygon-${index}`, {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            geometry: {
                                type: "Polygon",
                                coordinates: [coords],
                            },
                        },
                    });

                    map.addLayer({
                        id: `polygon-fill-${index}`,
                        type: "fill",
                        source: `polygon-${index}`,
                        paint: {
                            "fill-color": "#FF0000",
                            "fill-opacity": 0.2,
                        },
                    });

                    map.addLayer({
                        id: `polygon-stroke-${index}`,
                        type: "line",
                        source: `polygon-${index}`,
                        paint: {
                            "line-color": "#FF0000",
                            "line-width": 2,
                        },
                    });
                }
            }
        } catch (err) {
            console.error("Geocode error:", err);
        }
    };
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#212121]">
                {label}
            </h2>

            {workingAreas.map((area, index) => (
                <div
                    key={index}
                    className="border border-[#C5C5C5] rounded-sm p-2.5 flex flex-col gap-3"
                >
                    {/* Label + Close Button Row */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-[#212121]">
                            Area Code
                        </label>

                        {workingAreas.length > 1 &&
                            index === workingAreas.length - 1 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeWorkingArea(index)
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition cursor-pointer"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                    </div>

                    {/* Input */}
                    <Input
                        type="text"
                        value={area}
                        placeholder="Enter Postal Code"
                        compact
                        width="full"
                        className="border-[#D9D9D9]"
                        onChange={(e) => {
                            const value = e.target.value;
                            const updated = [...workingAreas];
                            updated[index] = value;
                            setWorkingAreas(updated);

                            if (value.length >= 3) {
                                geocodePostalCode(
                                    value,
                                    workingAreaMaps.current[index],
                                    index
                                );
                            }
                        }}
                    />

                    {/* Map */}
                    <div className="w-full h-64 rounded-sm overflow-hidden bg-[#EEF1F4] border border-[#DDDDDD]">
                        <div
                            ref={(el) =>
                                (workingAreaRefs.current[index] = el)
                            }
                            className="w-full h-full"
                        />
                    </div>
                </div>
            ))}

            {/* Add Button */}
            <button
                type="button"
                onClick={addWorkingArea}
                className="text-[13px] text-[#0066FF] font-semibold flex gap-1 items-center"
            >
                <Plus className="stroke-2 w-5 h-5" />
                Add more...
            </button>
        </div>
    );
};

export default WorkingAreaManager;