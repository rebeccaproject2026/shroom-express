import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DispatcherAreaMap = ({ areas = [] }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const hasMapToken =
        typeof import.meta.env.VITE_MAPBOX_ACCESS_TOKEN !== "undefined" &&
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    // -----------------------------------
    // Initialize Map
    // -----------------------------------
    useEffect(() => {
        if (!hasMapToken || !mapContainer.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-79.3832, 43.6532],
            zoom: 10,
        });

        map.current.addControl(
            new mapboxgl.NavigationControl({ showCompass: false }),
            "top-right"
        );

        return () => map.current?.remove();
    }, []);

    // -----------------------------------
    // Draw Postal Polygons
    // -----------------------------------
    // useEffect(() => {
    //     if (!map.current || !areas.length) return;

    //     const drawAreas = async () => {
    //         const bounds = new mapboxgl.LngLatBounds();

    //         for (let i = 0; i < areas.length; i++) {
    //             const postalCode = areas[i];

    //             if (!postalCode || postalCode.length < 3) continue;

    //             try {
    //                 const response = await fetch(
    //                     `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    //                         postalCode
    //                     )}.json?access_token=${mapboxgl.accessToken}&types=postcode&limit=1`
    //                 );

    //                 const data = await response.json();

    //                 if (data.features?.length) {
    //                     const feature = data.features[0];

    //                     if (feature.bbox) {
    //                         const [minLng, minLat, maxLng, maxLat] = feature.bbox;

    //                         const coords = [
    //                             [maxLng, maxLat],
    //                             [minLng, maxLat],
    //                             [minLng, minLat],
    //                             [maxLng, minLat],
    //                             [maxLng, maxLat],
    //                         ];

    //                         const sourceId = `polygon-${i}`;

    //                         if (map.current.getSource(sourceId)) {
    //                             map.current.removeLayer(`${sourceId}-fill`);
    //                             map.current.removeLayer(`${sourceId}-line`);
    //                             map.current.removeSource(sourceId);
    //                         }

    //                         map.current.addSource(sourceId, {
    //                             type: "geojson",
    //                             data: {
    //                                 type: "Feature",
    //                                 geometry: {
    //                                     type: "Polygon",
    //                                     coordinates: [coords],
    //                                 },
    //                             },
    //                         });

    //                         map.current.addLayer({
    //                             id: `${sourceId}-fill`,
    //                             type: "fill",
    //                             source: sourceId,
    //                             paint: {
    //                                 "fill-color": "#0066FF",
    //                                 "fill-opacity": 0.25,
    //                             },
    //                         });

    //                         map.current.addLayer({
    //                             id: `${sourceId}-line`,
    //                             type: "line",
    //                             source: sourceId,
    //                             paint: {
    //                                 "line-color": "#0066FF",
    //                                 "line-width": 2,
    //                             },
    //                         });

    //                         bounds.extend([minLng, minLat]);
    //                         bounds.extend([maxLng, maxLat]);
    //                     }
    //                 }
    //             } catch (err) {
    //                 console.error("Geocode error:", err);
    //             }
    //         }

    //         if (!bounds.isEmpty()) {
    //             map.current.fitBounds(bounds, { padding: 40 });
    //         }
    //     };

    //     drawAreas();
    // }, [areas]);

    return (
        <div className="bg-white rounded-xl shadow-sm p-4">

            {/* MAP */}
            <div className="w-full h-[450px] rounded-sm overflow-hidden border border-[#DDDDDD]">
                <div ref={mapContainer} className="w-full h-full" />
            </div>

            {/* AREA CODES TITLE */}
            <div className="mt-4">
                <span className="text-[#212529]/70 text-base font-medium  py-1 rounded-sm">
                    Area Codes
                </span>
            </div>

            {/* BADGES */}
            <div className="flex flex-wrap gap-2 mt-3">
                {areas.map((area, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 text-sm bg-[#f0f1f3] text-[#424143] font-medium rounded-sm"
                    >
                        {area}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default DispatcherAreaMap;