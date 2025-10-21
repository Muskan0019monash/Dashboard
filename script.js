// Enhanced script.js with improved world map and deep blue color scheme

/* ============================
 Utilities & Setup
 ============================ */
function cssVar(name, fallback = '') {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return v ? v.trim() : fallback;
}

// Enhanced Vega-Lite config with white chart backgrounds
const vegaChartConfig = {
    background: "white",
    view: { stroke: "transparent" },
    axis: {
        domainColor: "#374151", // gray-700
        gridColor: "#f3f4f6", // gray-100
        labelColor: "#374151", // gray-700
        titleColor: "#1f2937", // gray-800
        labelFont: cssVar('--font-sans'),
        titleFont: cssVar('--font-sans'),
        labelFontSize: 12,
        titleFontSize: 14,
        titleFontWeight: 600,
        labelAngle: 0
    },
    legend: {
        labelColor: "#374151", // gray-700
        titleColor: "#1f2937", // gray-800
        labelFont: cssVar('--font-sans'),
        titleFont: cssVar('--font-sans'),
    },
    title: {
        color: "#1f2937", // gray-800
        font: cssVar('--font-sans'),
        fontSize: 16,
        fontWeight: 600
    }
};

/* ============================
 Embedded Data
 ============================ */
// New dataset provided by the user
const migrationData = [
    { country: "India", latitude: 20.5937, longitude: 78.9629, migrants: 720000, settlement_state: "NSW", region: "Asia" },
    { country: "China", latitude: 35.8617, longitude: 104.1954, migrants: 680000, settlement_state: "VIC", region: "Asia" },
    { country: "United Kingdom", latitude: 55.3781, longitude: -3.4360, migrants: 550000, settlement_state: "QLD", region: "Europe" },
    { country: "Philippines", latitude: 12.8797, longitude: 121.7740, migrants: 320000, settlement_state: "WA", region: "Asia" },
    { country: "Vietnam", latitude: 14.0583, longitude: 108.2772, migrants: 300000, settlement_state: "SA", region: "Asia" },
    { country: "Sri Lanka", latitude: 7.8731, longitude: 80.7718, migrants: 180000, settlement_state: "NSW", region: "Asia" },
    { country: "Malaysia", latitude: 4.2105, longitude: 101.9758, migrants: 150000, settlement_state: "VIC", region: "Asia" },
    { country: "Nepal", latitude: 28.3949, longitude: 84.1240, migrants: 130000, settlement_state: "NSW", region: "Asia" },
    { country: "South Africa", latitude: -30.5595, longitude: 22.9375, migrants: 120000, settlement_state: "QLD", region: "Africa" },
    { country: "Pakistan", latitude: 30.3753, longitude: 69.3451, migrants: 110000, settlement_state: "NSW", region: "Asia" },
    { country: "Italy", latitude: 41.8719, longitude: 12.5674, migrants: 95000, settlement_state: "WA", region: "Europe" },
    { country: "Greece", latitude: 39.0742, longitude: 21.8243, migrants: 90000, settlement_state: "SA", region: "Europe" },
    { country: "Indonesia", latitude: -0.7893, longitude: 113.9213, migrants: 85000, settlement_state: "NT", region: "Asia" },
    { country: "Bangladesh", latitude: 23.685, longitude: 90.3563, migrants: 80000, settlement_state: "NSW", region: "Asia" },
    { country: "Ireland", latitude: 53.4129, longitude: -8.2439, migrants: 75000, settlement_state: "QLD", region: "Europe" },
    { country: "Singapore", latitude: 1.3521, longitude: 103.8198, migrants: 70000, settlement_state: "VIC", region: "Asia" },
    { country: "Hong Kong", latitude: 22.3193, longitude: 114.1694, migrants: 65000, settlement_state: "NSW", region: "Asia" },
    { country: "United States", latitude: 37.0902, longitude: -95.7129, migrants: 62000, settlement_state: "WA", region: "North America" },
    { country: "Lebanon", latitude: 33.8547, longitude: 35.8623, migrants: 60000, settlement_state: "NSW", region: "Middle East" },
    { country: "Fiji", latitude: -17.7134, longitude: 178.065, migrants: 55000, settlement_state: "QLD", region: "Oceania" }
];

const migrationTrends = [
 { year: "2014", arrivals: 1844, departures: 1109, net: 735 }, { year: "2015", arrivals: 1869, departures: 1132, net: 737 }, { year: "2016", arrivals: 2003, departures: 1124, net: 879 }, { year: "2017", arrivals: 2136, departures: 1124, net: 1012 }, { year: "2018", arrivals: 2120, departures: 1149, net: 971 }, { year: "2019", arrivals: 2261, departures: 1279, net: 982 }, { year: "2020", arrivals: 1722, departures: 1220, net: 502 }, { year: "2021", arrivals: 637, departures: 866, net: -229 }, { year: "2022", arrivals: 2188, departures: 882, net: 1306 }, { year: "2023", arrivals: 2941, departures: 820, net: 2121 }, { year: "2024", arrivals: 2131, departures: 644, net: 1487 }
];

const visaData = [
 { year: "2013-14", temporary: 253.16, australian: 72.18, permanent: 94.35, nz: 37.77, unknown: 7.21 }, { year: "2014-15", temporary: 262.93, australian: 71.68, permanent: 91.49, nz: 31.75, unknown: 7.40 }, { year: "2015-16", temporary: 281.76, australian: 75.80, permanent: 90.59, nz: 33.70, unknown: 7.43 }, { year: "2016-17", temporary: 314.82, australian: 79.28, permanent: 106.20, nz: 32.33, unknown: 7.53 }, { year: "2017-18", temporary: 327.30, australian: 77.16, permanent: 87.91, nz: 30.38, unknown: 4.77 }, { year: "2018-19", temporary: 350.67, australian: 78.90, permanent: 85.39, nz: 30.54, unknown: 4.90 }, { year: "2019-20", temporary: 313.66, australian: 96.41, permanent: 70.89, nz: 22.22, unknown: 3.67 }, { year: "2020-21", temporary: 29.58, australian: 61.37, permanent: 36.95, nz: 16.95, unknown: 1.15 }, { year: "2021-22", temporary: 266.21, australian: 62.48, permanent: 71.10, nz: 24.12, unknown: 2.82 }, { year: "2022-23", temporary: 556.62, australian: 58.75, permanent: 80.39, nz: 42.66, unknown: 0.96 }, { year: "2023-24", temporary: 464.78, australian: 60.04, permanent: 90.88, nz: 51.10, unknown: 0.00 }
];

const educationData = [
 { visaStream: "Skilled", "2015-2019": 2.0, "2010-2014": 5.6, "Before 2010": 7.7, Total: 5.8 }, { visaStream: "Family", "2015-2019": 1.2, "2010-2014": 4.1, "Before 2010": 4.4, Total: 3.4 }, { visaStream: "Humanitarian", "2015-2019": 2.7, "2010-2014": 7.1, "Before 2010": 10.0, Total: 7.4 }, { visaStream: "All permanent migrants", "2015-2019": 1.8, "2010-2014": 5.2, "Before 2010": 6.9, Total: 5.0 }
];

/* ============================
 Theming & Colors - Vibrant multi-color palette
 ============================ */
const regionColorMap = { 
    "Asia": "#ef4444", 
    "Europe": "#f97316", 
    "Africa": "#eab308", 
    "Oceania": "#22c55e", 
    "North America": "#3b82f6", 
    "Middle East": "#a855f7", 
    "South America": "#ec4899" 
};

const stateColors = { 
    "NSW": "#ef4444", 
    "VIC": "#f97316", 
    "QLD": "#eab308", 
    "WA": "#22c55e", 
    "SA": "#3b82f6",
    "NT": "#64748b"
};

const trendColors = { 
    arrivals: "#7f1d1d", // Dark maroon for arrivals
    departures: "#f97316", 
    net: "#22c55e" 
};

// Updated visa colors with different shades
const visaColors = { 
    domain: ["temporary", "australian", "permanent", "nz", "unknown"], 
    range: ["#1e40af", "#15803d", "#ea580c", "#dc2626", "#64748b"] // Different shades
};

/* ============================
 Enhanced Map Rendering
 ============================ */
let mapIsFullscreen = false;
let selectedRegions = ["All"];

function formatMigrationNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
}

function computeSizeRange(numPoints) {
    const vw = Math.max(document.documentElement.clientWidth || 900, 900);
    const baseMin = Math.max(60, Math.round(vw * 0.05));
    const baseMax = Math.min(5000, Math.round(vw * 0.5));
    const divisor = Math.max(1, Math.sqrt(Math.max(1, numPoints)) / 2.5);
    return [baseMin, Math.round(baseMax / divisor)];
}

function normalizePointsForMap() {
    let points = (migrationData || []).map(d => ({ 
        country: d.country || '', 
        lat: +d.latitude, 
        lon: +d.longitude, 
        migrants: +d.migrants || 0, 
        region: d.region || 'Other', 
        settlement_state: d.settlement_state || '',
        migrantsFormatted: formatMigrationNumber(+d.migrants || 0)
    })).filter(p => p.lat && p.lon);

    // Filter by selected regions
    if (!selectedRegions.includes("All")) {
        points = points.filter(p => selectedRegions.includes(p.region));
    }

    return points;
}

function getTopCountries(points, count = 5) {
    return points
        .sort((a, b) => b.migrants - a.migrants)
        .slice(0, count)
        .map(p => ({ ...p, isTop: true }));
}

function renderEnhancedMap() {
    const points = normalizePointsForMap();
    if (!points.length) return;
    
    const sizeRange = computeSizeRange(points.length);
    const topCountries = getTopCountries(points, 5);

    const mapSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "width": "container", 
        "height": mapIsFullscreen ? Math.max(600, window.innerHeight - 150) : 550,
        "autosize": {
            "type": "fit",
            "contains": "padding"
        },
        "projection": { 
            "type": "equalEarth",
            "center": [0, 0], // Center the map for a global view
            "scale": mapIsFullscreen ? 200 : 160  // Adjusted scale for a wider world view
        },
        "layer": [
            {
                "data": { 
                    "url": "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/world-110m.json", 
                    "format": { "type": "topojson", "feature": "countries" } 
                },
                "mark": { 
                    "type": "geoshape", 
                    "fill": "#374151", 
                    "stroke": "#111827", 
                    "strokeWidth": 0.5 
                }
            },
            {
                "data": { "values": points },
                "mark": { 
                    "type": "circle", 
                    "filled": true, 
                    "tooltip": true, 
                    "stroke": "#111827", 
                    "strokeWidth": 1.5, 
                    "opacity": 0.7 
                },
                "encoding": {
                    "longitude": { "field": "lon", "type": "quantitative" },
                    "latitude": { "field": "lat", "type": "quantitative" },
                    "size": { 
                        "field": "migrants", 
                        "type": "quantitative", 
                        "scale": { "range": sizeRange },
                        "legend": {
                            "title": "Migration Volume (Number of Migrants, 2023)",
                            "format": ".0s",
                            "values": [50000, 200000, 500000, 1000000],
                            "symbolType": "circle"
                        }
                    },
                    "color": { 
                        "field": "migrants", 
                        "type": "quantitative", 
                        "scale": { "scheme": "turbo" },
                        "legend": null
                    },
                    "tooltip": [
                        { "field": "country", "title": "Country" }, 
                        { "field": "migrantsFormatted", "title": "Migration Volume" }, 
                        { "field": "region", "title": "Region" },
                        { "field": "settlement_state", "title": "Primary Settlement State" }
                    ]
                }
            },
            {
                "data": { "values": topCountries },
                "mark": { 
                    "type": "text", 
                    "align": "center", 
                    "baseline": "middle", 
                    "dx": 0, 
                    "dy": -15,
                    "fontSize": 10,
                    "fontWeight": "bold",
                    "fill": "#1f2937",
                    "stroke": "white",
                    "strokeWidth": 3
                },
                "encoding": {
                    "longitude": { "field": "lon", "type": "quantitative" },
                    "latitude": { "field": "lat", "type": "quantitative" },
                    "text": { "field": "country", "type": "nominal" }
                }
            }
        ],
        "config": vegaChartConfig
    };
    
    vegaEmbed('#worldMap', mapSpec, { actions: false, renderer: 'svg' }).catch(console.error);
}

/* ============================
 Chart Renderers with Enhanced Colors
 ============================ */
function renderStateChart() {
    const agg = {};
    migrationData.forEach(d => {
        const s = (d.settlement_state || '').trim();
        if (!s || s.toLowerCase() === 'unknown') return;
        agg[s] = (agg[s] || 0) + (+d.migrants || 0);
    });
    
    // Filter out states with no data
    let rows = Object.keys(agg)
        .filter(k => agg[k] > 0)
        .map(k => ({ settlement_state: k, migrants: agg[k] }));

    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "width": "container", "height": 320,
        "data": { "values": rows },
        "mark": { "type": "bar", "cornerRadius": 4, "tooltip": true },
        "encoding": {
            "x": { "field": "settlement_state", "type": "nominal", "title": "Australian State", "sort": "-y" },
            "y": { "field": "migrants", "type": "quantitative", "title": "Number of Migrants", "axis": { "grid": false } },
            "color": { "field": "settlement_state", "type": "nominal", "title": "State", "scale": { "domain": Object.keys(stateColors), "range": Object.values(stateColors) } }
        },
        "config": vegaChartConfig
    };
    vegaEmbed('#stateChart', spec, { actions: false, renderer: 'svg' }).catch(console.error);
}

function renderRegionChart() {
    const agg = {};
    migrationData.forEach(d => {
        const r = d.region || 'Other';
        agg[r] = (agg[r] || 0) + (+d.migrants || 0);
    });
    const rows = Object.keys(agg).map(k => ({ region: k, migrants: agg[k] }));

    const regionDomain = rows.map(r => r.region);
    const regionRange = regionDomain.map(r => regionColorMap[r] || '#9ca3af');

    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "width": "container", "height": 280,
        "data": { "values": rows },
        "mark": { "type": "arc", "innerRadius": 70, "tooltip": true, "stroke": "white", "strokeWidth": 2 },
        "encoding": {
            "theta": { "field": "migrants", "type": "quantitative", "stack": true },
            "color": { "field": "region", "type": "nominal", "scale": { "domain": regionDomain, "range": regionRange }, "title": "Region" },
            "tooltip": [{ "field": "region", "title": "Region" }, { "field": "migrants", "title": "Migrants", "format": "," }]
        },
        "config": vegaChartConfig
    };
    vegaEmbed('#regionChart', spec, { actions: false, renderer: 'svg' }).catch(console.error);
    setupRegionTable(rows);
}

function setupRegionTable(data) {
    const tableContainer = document.getElementById('regionTableContainer');
    const toggleBtn = document.getElementById('showRegionTable');
    if (!tableContainer || !toggleBtn) return;

    let tableHTML = `<table id="regionTable"><thead><tr>
        <th>Region</th><th>Number of Migrants</th>
        </tr></thead><tbody>`;
    data.sort((a,b) => b.migrants - a.migrants).forEach(r => {
        tableHTML += `<tr><td>${r.region}</td><td>${r.migrants.toLocaleString()}</td></tr>`;
    });
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    toggleBtn.onclick = () => {
        const isVisible = tableContainer.style.display === 'block';
        tableContainer.style.display = isVisible ? 'none' : 'block';
        toggleBtn.textContent = isVisible ? 'View as table' : 'Hide table';
    };
}

function renderCountryChart() {
    const sorted = (migrationData || []).slice().sort((a, b) => (b.migrants || 0) - (a.migrants || 0)).slice(0, 10);
    const rows = sorted.map((d, i) => ({ country: d.country, migrants: +d.migrants, rank: i + 1, region: d.region }));

    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "width": "container", "height": 380,
        "data": { "values": rows },
        "mark": { "type": "bar", "cornerRadiusEnd": 4, "tooltip": true },
        "encoding": {
            "y": { "field": "country", "type": "nominal", "sort": "-x", "title": null },
            "x": { "field": "migrants", "type": "quantitative", "title": "Number of Migrants" },
            "color": { "field": "country", "type": "nominal", "scale": { "scheme": "tableau10" }, "legend": null },
            "tooltip": [{ "field": "country", "title": "Country" }, { "field": "migrants", "title": "Migrants", "format": "," }, { "field": "region", "title": "Region" }, { "field": "rank", "title": "Rank" }]
        },
        "config": vegaChartConfig
    };
    vegaEmbed('#countryChart', spec, { actions: false, renderer: 'svg' }).catch(console.error);
}

function renderTrendChart() {
    const selected = Array.from(document.querySelectorAll('input[name="trendSeries"]:checked')).map(c => c.value);
    if (!selected.length) {
        vegaEmbed('#trendChart', { data: { values: [] } }).catch(() => {});
        return;
    }

    let spec;
    if (selected.length === 1) {
        const metric = selected[0];
        spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": "container", "height": 320,
            "data": { "values": migrationTrends },
            "mark": { "type": "bar", "cornerRadius": 4, "tooltip": true },
            "encoding": {
                "x": { "field": "year", "type": "ordinal", "title": "Year" },
                "y": { "field": metric, "type": "quantitative", "title": "Number (thousands)" },
                "color": { "value": trendColors[metric] }
            }
        };
    } else {
        const folded = migrationTrends.flatMap(r => selected.map(k => ({ year: r.year, type: k, value: r[k] })));
        spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": "container", "height": 320,
            "data": { "values": folded },
            "mark": { "type": "line", "point": true, "strokeWidth": 2.5, "tooltip": true },
            "encoding": {
                "x": { "field": "year", "type": "ordinal", "title": "Year" },
                "y": { "field": "value", "type": "quantitative", "title": "Number (thousands)" },
                "color": { "field": "type", "type": "nominal", "title": "Metric", "scale": { "domain": Object.keys(trendColors), "range": Object.values(trendColors) } }
            }
        };
    }
    spec.config = vegaChartConfig;
    vegaEmbed('#trendChart', spec, { actions: false, renderer: 'svg' }).catch(console.error);
}

function renderVisaChart(selectedVisaType = "All") {
    let spec;
    if (selectedVisaType === "All") {
        spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": "container", "height": 320,
            "data": { "values": visaData },
            "transform": [{ "fold": visaColors.domain, "as": ["Visa Type", "value"] }],
            "mark": { "type": "bar", "tooltip": true },
            "encoding": {
                "x": { "field": "year", "type": "ordinal", "title": "Year", "axis": { "labelAngle": -45 } },
                "y": { "field": "value", "type": "quantitative", "title": "Number (thousands)", "stack": "normalize" },
                "color": { "field": "Visa Type", "type": "nominal", "scale": visaColors }
            }
        };
    } else {
        spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": "container", "height": 320,
            "data": { "values": visaData },
            "mark": { "type": "line", "point": { "filled": false, "fill": "white" }, "strokeWidth": 3, "tooltip": true },
            "encoding": {
                "x": { "field": "year", "type": "ordinal", "title": "Year", "axis": { "labelAngle": -45 } },
                "y": { "field": selectedVisaType, "type": "quantitative", "title": "Number (thousands)" },
                "color": { "value": visaColors.range[visaColors.domain.indexOf(selectedVisaType)] || "#3b82f6" }
            }
        };
    }
    spec.config = vegaChartConfig;
    vegaEmbed('#visaChart', spec, { actions: false, renderer: 'svg' }).catch(console.error);
}

function renderEducationChart() {
    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "width": "container", "height": 280,
        "data": { "values": educationData },
        "transform": [{ "fold": ["2015-2019", "2010-2014", "Before 2010", "Total"], "as": ["category", "percentage"] }],
        "mark": { "type": "rect", "tooltip": true, "stroke": "white", "strokeWidth": 2 },
        "encoding": {
            "x": { "field": "visaStream", "type": "nominal", "title": "Visa Stream" },
            "y": { "field": "category", "type": "nominal", "title": "Arrival Period", "sort": ["2015-2019", "2010-2014", "Before 2010", "Total"] },
            "color": { "field": "percentage", "type": "quantitative", "scale": { "scheme": "blues" }, "title": "% Enrolled" },
            "tooltip": [{ "field": "visaStream", "title": "Visa Stream" }, { "field": "category", "title": "Period" }, { "field": "percentage", "title": "% Enrolled", "format": ".1f" }]
        },
        "config": vegaChartConfig
    };
    vegaEmbed('#educationChart', spec, { actions: false, renderer: 'svg' }).catch(console.error);
    setupEducationTable();
}

function setupEducationTable() {
    const tableContainer = document.getElementById('educationTableContainer');
    const toggleBtn = document.getElementById('showEducationTable');
    if (!tableContainer || !toggleBtn) return;

    let tableHTML = `<table id="educationTable"><thead><tr>
        <th>Visa stream</th><th>2015–2019 (%)</th><th>2010–2014 (%)</th>
        <th>Before 2010 (%)</th><th>Total (%)</th>
        </tr></thead><tbody>`;
    educationData.forEach(r => {
        tableHTML += `<tr><td>${r.visaStream}</td><td>${r['2015-2019']}</td><td>${r['2010-2014']}</td><td>${r['Before 2010']}</td><td>${r.Total}</td></tr>`;
    });
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;

    toggleBtn.onclick = () => {
        const isVisible = tableContainer.style.display === 'block';
        tableContainer.style.display = isVisible ? 'none' : 'block';
        toggleBtn.textContent = isVisible ? 'View as table' : 'Hide table';
    };
}

/* ============================
 Region Filtering for Map
 ============================ */
function handleRegionFilter() {
    const checkboxes = document.querySelectorAll('input[name="regionFilter"]');
    const allCheckbox = document.querySelector('input[name="regionFilter"][value="All"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.value === 'All') {
                if (checkbox.checked) {
                    // Uncheck all other checkboxes
                    checkboxes.forEach(cb => {
                        if (cb.value !== 'All') cb.checked = false;
                    });
                    selectedRegions = ['All'];
                } else {
                    checkbox.checked = true; // Prevent unchecking "All" when it's the only one
                }
            } else {
                // If any specific region is checked, uncheck "All"
                if (checkbox.checked) {
                    allCheckbox.checked = false;
                    selectedRegions = Array.from(document.querySelectorAll('input[name="regionFilter"]:checked'))
                        .map(cb => cb.value)
                        .filter(v => v !== 'All');
                    
                    if (selectedRegions.length === 0) {
                        allCheckbox.checked = true;
                        selectedRegions = ['All'];
                    }
                } else {
                    selectedRegions = Array.from(document.querySelectorAll('input[name="regionFilter"]:checked'))
                        .map(cb => cb.value)
                        .filter(v => v !== 'All');
                    
                    if (selectedRegions.length === 0) {
                        allCheckbox.checked = true;
                        selectedRegions = ['All'];
                    }
                }
            }
            renderEnhancedMap();
        });
    });
}

/* ============================
 Initializer & Event Binding
 ============================ */
function bindUI() {
    document.querySelectorAll('input[name="trendSeries"]').forEach(ch => ch.addEventListener('change', renderTrendChart));
    document.getElementById('visaTypeFilter')?.addEventListener('change', (e) => renderVisaChart(e.target.value));
    document.getElementById('mapFullscreenToggle')?.addEventListener('change', e => {
        mapIsFullscreen = e.target.checked;
        renderEnhancedMap();
    });
    
    handleRegionFilter();
}

function renderAllCharts() {
    renderEnhancedMap();
    renderStateChart();
    renderRegionChart();
    renderCountryChart();
    renderTrendChart();
    renderVisaChart('All');
    renderEducationChart();
}

async function initialize() {
    bindUI();
    renderAllCharts();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(renderAllCharts, 250);
    });
}

document.addEventListener('DOMContentLoaded', initialize);