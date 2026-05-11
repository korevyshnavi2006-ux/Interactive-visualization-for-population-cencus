const censusData = [
  {
    id: "north",
    name: "Northern Plains",
    entries: [
      { year: 2001, population: 14.2, literacy: 68, density: 410, migration: -0.2, urbanization: 34, households: 2.8, age: [17, 22, 20, 15, 11, 8, 5, 2] },
      { year: 2011, population: 16.6, literacy: 74, density: 462, migration: 0.1, urbanization: 39, households: 3.1, age: [16, 21, 21, 16, 11, 8, 5, 2] },
      { year: 2021, population: 18.7, literacy: 79, density: 511, migration: 0.4, urbanization: 44, households: 3.4, age: [15, 20, 22, 17, 12, 8, 4, 2] }
    ]
  },
  {
    id: "coastal",
    name: "Coastal Belt",
    entries: [
      { year: 2001, population: 11.5, literacy: 73, density: 520, migration: 0.5, urbanization: 48, households: 3.0, age: [15, 20, 21, 16, 12, 9, 5, 2] },
      { year: 2011, population: 13.1, literacy: 79, density: 565, migration: 0.9, urbanization: 54, households: 3.4, age: [14, 19, 22, 17, 13, 9, 4, 2] },
      { year: 2021, population: 14.4, literacy: 84, density: 603, migration: 1.1, urbanization: 61, households: 3.7, age: [13, 18, 22, 18, 14, 9, 4, 2] }
    ]
  },
  {
    id: "central",
    name: "Central Corridor",
    entries: [
      { year: 2001, population: 9.8, literacy: 62, density: 298, migration: -0.4, urbanization: 29, households: 2.6, age: [18, 23, 19, 14, 10, 8, 5, 3] },
      { year: 2011, population: 11.7, literacy: 69, density: 336, migration: -0.1, urbanization: 34, households: 2.9, age: [17, 22, 20, 15, 11, 8, 5, 2] },
      { year: 2021, population: 13.5, literacy: 75, density: 384, migration: 0.2, urbanization: 40, households: 3.2, age: [16, 21, 21, 16, 11, 8, 5, 2] }
    ]
  },
  {
    id: "highland",
    name: "Highland Region",
    entries: [
      { year: 2001, population: 6.4, literacy: 70, density: 186, migration: -0.1, urbanization: 24, households: 2.4, age: [16, 21, 20, 15, 12, 9, 5, 2] },
      { year: 2011, population: 7.1, literacy: 76, density: 199, migration: 0.2, urbanization: 28, households: 2.7, age: [15, 20, 21, 16, 12, 9, 5, 2] },
      { year: 2021, population: 7.8, literacy: 81, density: 214, migration: 0.3, urbanization: 31, households: 2.9, age: [14, 19, 21, 17, 13, 9, 5, 2] }
    ]
  },
  {
    id: "metro",
    name: "Metro Arc",
    entries: [
      { year: 2001, population: 18.1, literacy: 81, density: 880, migration: 1.4, urbanization: 69, households: 3.9, age: [13, 18, 24, 19, 13, 8, 4, 1] },
      { year: 2011, population: 22.5, literacy: 86, density: 1012, migration: 1.8, urbanization: 74, households: 4.2, age: [12, 17, 25, 20, 13, 8, 4, 1] },
      { year: 2021, population: 27.4, literacy: 90, density: 1176, migration: 2.1, urbanization: 79, households: 4.5, age: [11, 16, 25, 21, 14, 8, 4, 1] }
    ]
  },
  {
    id: "delta",
    name: "River Delta",
    entries: [
      { year: 2001, population: 8.6, literacy: 66, density: 436, migration: -0.3, urbanization: 37, households: 2.7, age: [17, 22, 20, 15, 11, 8, 5, 2] },
      { year: 2011, population: 9.5, literacy: 72, density: 475, migration: 0.1, urbanization: 42, households: 3.0, age: [16, 21, 21, 16, 11, 8, 5, 2] },
      { year: 2021, population: 10.3, literacy: 78, density: 512, migration: 0.2, urbanization: 47, households: 3.3, age: [15, 20, 21, 17, 12, 8, 5, 2] }
    ]
  }
];

const ageLabels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70+"];
const state = {
  year: 2021,
  regionId: "metro",
  metric: "population",
  sortBy: "population"
};

const els = {
  yearSelect: document.querySelector("#yearSelect"),
  regionSelect: document.querySelector("#regionSelect"),
  metricSelect: document.querySelector("#metricSelect"),
  sortSelect: document.querySelector("#sortSelect"),
  populationValue: document.querySelector("#populationValue"),
  populationFoot: document.querySelector("#populationFoot"),
  growthValue: document.querySelector("#growthValue"),
  growthFoot: document.querySelector("#growthFoot"),
  literacyValue: document.querySelector("#literacyValue"),
  literacyFoot: document.querySelector("#literacyFoot"),
  urbanValue: document.querySelector("#urbanValue"),
  urbanFoot: document.querySelector("#urbanFoot"),
  visiblePopulation: document.querySelector("#visiblePopulation"),
  visibleLiteracy: document.querySelector("#visibleLiteracy"),
  visibleUrbanShare: document.querySelector("#visibleUrbanShare"),
  trendCaption: document.querySelector("#trendCaption"),
  ageCaption: document.querySelector("#ageCaption"),
  comparisonCaption: document.querySelector("#comparisonCaption"),
  settlementCaption: document.querySelector("#settlementCaption"),
  scatterCaption: document.querySelector("#scatterCaption"),
  trendChart: document.querySelector("#trendChart"),
  ageChart: document.querySelector("#ageChart"),
  comparisonChart: document.querySelector("#comparisonChart"),
  settlementChart: document.querySelector("#settlementChart"),
  scatterChart: document.querySelector("#scatterChart")
};

const tooltip = document.querySelector("#tooltipTemplate").content.firstElementChild.cloneNode(true);
document.body.appendChild(tooltip);
tooltip.hidden = true;

function init() {
  populateControls();
  bindEvents();
  render();
}

function populateControls() {
  const years = [...new Set(censusData.flatMap(region => region.entries.map(entry => entry.year)))];
  els.yearSelect.innerHTML = years
    .map(year => `<option value="${year}" ${year === state.year ? "selected" : ""}>${year}</option>`)
    .join("");

  els.regionSelect.innerHTML = censusData
    .map(region => `<option value="${region.id}" ${region.id === state.regionId ? "selected" : ""}>${region.name}</option>`)
    .join("");

  els.metricSelect.value = state.metric;
  els.sortSelect.value = state.sortBy;
}

function bindEvents() {
  els.yearSelect.addEventListener("change", event => {
    state.year = Number(event.target.value);
    render();
  });

  els.regionSelect.addEventListener("change", event => {
    state.regionId = event.target.value;
    render();
  });

  els.metricSelect.addEventListener("change", event => {
    state.metric = event.target.value;
    render();
  });

  els.sortSelect.addEventListener("change", event => {
    state.sortBy = event.target.value;
    render();
  });
}

function render() {
  const selectedRegion = censusData.find(region => region.id === state.regionId);
  const selectedEntry = selectedRegion.entries.find(entry => entry.year === state.year);
  const previousEntry = selectedRegion.entries.find(entry => entry.year === state.year - 10);
  const yearEntries = censusData.map(region => ({
    regionId: region.id,
    region: region.name,
    ...region.entries.find(entry => entry.year === state.year),
    previous: region.entries.find(entry => entry.year === state.year - 10)
  }));

  renderHeadlineStats(yearEntries);
  renderKPIs(selectedRegion.name, selectedEntry, previousEntry);
  renderTrendChart(selectedRegion);
  renderAgeChart(selectedRegion.name, selectedEntry);
  renderComparisonChart(yearEntries);
  renderSettlementChart(selectedRegion.name, selectedEntry);
  renderScatterChart(yearEntries);
}

function renderHeadlineStats(entries) {
  const totalPopulation = entries.reduce((sum, entry) => sum + entry.population, 0);
  const avgLiteracy = entries.reduce((sum, entry) => sum + entry.literacy, 0) / entries.length;
  const urbanPopulation = entries.reduce((sum, entry) => sum + (entry.population * entry.urbanization) / 100, 0);

  els.visiblePopulation.textContent = `${formatNumber(totalPopulation)}M`;
  els.visibleLiteracy.textContent = `${avgLiteracy.toFixed(1)}%`;
  els.visibleUrbanShare.textContent = `${((urbanPopulation / totalPopulation) * 100).toFixed(1)}%`;
}

function renderKPIs(regionName, current, previous) {
  const growth = previous ? ((current.population - previous.population) / previous.population) * 100 : 0;
  const migrationLabel = current.migration >= 0 ? "Net inflow" : "Net outflow";

  els.populationValue.textContent = `${formatNumber(current.population)}M`;
  els.populationFoot.textContent = `${regionName} in ${current.year}`;
  els.growthValue.textContent = `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`;
  els.growthFoot.textContent = previous ? `Compared with ${previous.year}` : "First census point";
  els.literacyValue.textContent = `${current.literacy}%`;
  els.literacyFoot.textContent = `${migrationLabel}: ${current.migration.toFixed(1)}M`;
  els.urbanValue.textContent = `${current.urbanization}%`;
  els.urbanFoot.textContent = `Avg. household size ${current.households.toFixed(1)}`;
}

function renderTrendChart(region) {
  const svg = els.trendChart;
  const width = 720;
  const height = 240;
  const margin = { top: 18, right: 18, bottom: 36, left: 50 };
  const maxPopulation = Math.max(...censusData.flatMap(item => item.entries.map(entry => entry.population)));

  const x = year => margin.left + ((year - 2001) / 20) * (width - margin.left - margin.right);
  const y = value => height - margin.bottom - (value / (maxPopulation * 1.1)) * (height - margin.top - margin.bottom);

  const path = region.entries.map((entry, index) => `${index === 0 ? "M" : "L"} ${x(entry.year)} ${y(entry.population)}`).join(" ");

  svg.innerHTML = `
    ${drawHorizontalGrid(width, height, margin, 5)}
    <path class="trend-line" d="${path}"></path>
    ${region.entries.map(entry => `
      <circle
        class="trend-point"
        cx="${x(entry.year)}"
        cy="${y(entry.population)}"
        r="${entry.year === state.year ? 8 : 6}"
        fill="${entry.year === state.year ? "#c97535" : "#247b74"}"
        data-tip="${region.name}<br>${entry.year}: ${formatNumber(entry.population)}M"
      ></circle>
      <text class="tick-label" x="${x(entry.year)}" y="${height - 18}" text-anchor="middle">${entry.year}</text>
    `).join("")}
    <text class="axis-label" x="${margin.left}" y="${height - 18}">Census year</text>
    <text class="axis-label" x="16" y="${margin.top}" transform="rotate(-90 16 ${margin.top})">Population (millions)</text>
  `;

  attachTooltip(svg);
  els.trendCaption.textContent = `${region.name} grew from ${formatNumber(region.entries[0].population)}M to ${formatNumber(region.entries.at(-1).population)}M over three census rounds.`;
}

function renderAgeChart(regionName, entry) {
  const svg = els.ageChart;
  const width = 720;
  const height = 240;
  const margin = { top: 18, right: 16, bottom: 38, left: 46 };
  const max = Math.max(...entry.age);
  const barWidth = (width - margin.left - margin.right) / entry.age.length - 14;

  svg.innerHTML = `
    ${drawHorizontalGrid(width, height, margin, 5)}
    ${entry.age.map((value, index) => {
      const barHeight = (value / (max * 1.15)) * (height - margin.top - margin.bottom);
      const x = margin.left + index * ((width - margin.left - margin.right) / entry.age.length) + 8;
      const y = height - margin.bottom - barHeight;
      return `
        <rect
          class="age-bar"
          x="${x}"
          y="${y}"
          width="${barWidth}"
          height="${barHeight}"
          rx="14"
          fill="${index < 3 ? "#c97535" : "#71834b"}"
          data-tip="${regionName}<br>${ageLabels[index]}: ${value}%"
        ></rect>
        <text class="tick-label" x="${x + barWidth / 2}" y="${height - 22}" text-anchor="middle">${ageLabels[index]}</text>
      `;
    }).join("")}
    <text class="axis-label" x="${margin.left}" y="${height - 18}">Age band</text>
    <text class="axis-label" x="16" y="${margin.top}" transform="rotate(-90 16 ${margin.top})">Share of population</text>
  `;

  attachTooltip(svg);
  els.ageCaption.textContent = `The strongest concentration in ${entry.year} sits around ${ageLabels[entry.age.indexOf(Math.max(...entry.age))]}.`;
}

function renderComparisonChart(entries) {
  const svg = els.comparisonChart;
  const width = 920;
  const height = 280;
  const margin = { top: 18, right: 22, bottom: 58, left: 66 };
  const metricKey = state.metric;
  const sorted = [...entries].sort((a, b) => getSortValue(b) - getSortValue(a));
  const max = Math.max(...sorted.map(entry => entry[metricKey]));
  const step = (width - margin.left - margin.right) / sorted.length;
  const barWidth = step - 24;

  svg.innerHTML = `
    ${drawHorizontalGrid(width, height, margin, 6)}
    ${sorted.map((entry, index) => {
      const value = entry[metricKey];
      const barHeight = (value / (max * 1.12)) * (height - margin.top - margin.bottom);
      const x = margin.left + index * step + 12;
      const y = height - margin.bottom - barHeight;
      const activeClass = entry.regionId === state.regionId ? "is-active" : "";
      return `
        <rect
          class="comparison-bar ${activeClass}"
          x="${x}"
          y="${y}"
          width="${barWidth}"
          height="${barHeight}"
          rx="16"
          fill="${entry.regionId === state.regionId ? "#a84b3a" : "#247b74"}"
          data-region="${entry.regionId}"
          data-tip="${entry.region}<br>${metricLabel(metricKey)}: ${formatMetric(metricKey, value)}"
        ></rect>
        <text class="tick-label" x="${x + barWidth / 2}" y="${height - 44}" text-anchor="middle">${entry.region}</text>
      `;
    }).join("")}
    <text class="axis-label" x="${margin.left}" y="${height - 16}">Regions</text>
    <text class="axis-label" x="18" y="${margin.top}" transform="rotate(-90 18 ${margin.top})">${metricLabel(metricKey)}</text>
  `;

  svg.querySelectorAll("[data-region]").forEach(node => {
    node.style.cursor = "pointer";
    node.addEventListener("click", () => {
      state.regionId = node.dataset.region;
      els.regionSelect.value = state.regionId;
      render();
    });
  });

  attachTooltip(svg);
  els.comparisonCaption.textContent = `${metricLabel(metricKey)} for ${state.year}; click any region to focus the rest of the dashboard.`;
}

function renderSettlementChart(regionName, entry) {
  const svg = els.settlementChart;
  const width = 720;
  const height = 220;
  const margin = { top: 22, right: 16, bottom: 40, left: 34 };
  const chartWidth = width - margin.left - margin.right;
  const urbanWidth = chartWidth * (entry.urbanization / 100);
  const ruralWidth = chartWidth - urbanWidth;

  svg.innerHTML = `
    <rect x="${margin.left}" y="78" width="${chartWidth}" height="52" rx="18" fill="rgba(113, 131, 75, 0.18)"></rect>
    <rect
      class="settlement-urban"
      x="${margin.left}"
      y="78"
      width="${urbanWidth}"
      height="52"
      rx="18"
      fill="#247b74"
      data-tip="${regionName}<br>Urban population: ${entry.urbanization}%"
    ></rect>
    <rect
      class="settlement-rural"
      x="${margin.left + urbanWidth}"
      y="78"
      width="${ruralWidth}"
      height="52"
      rx="18"
      fill="#c97535"
      data-tip="${regionName}<br>Rural population: ${(100 - entry.urbanization).toFixed(1)}%"
    ></rect>
    <text class="chart-title" x="${margin.left}" y="52">${regionName} in ${entry.year}</text>
    <text class="tick-label" x="${margin.left}" y="166">Urban</text>
    <text class="tick-label" x="${margin.left + urbanWidth + 10}" y="166">Rural</text>
    <text class="small-label" x="${margin.left + 12}" y="108" fill="white">${entry.urbanization}%</text>
    <text class="small-label" x="${margin.left + urbanWidth + 12}" y="108" fill="white">${(100 - entry.urbanization).toFixed(1)}%</text>
  `;

  attachTooltip(svg);
  els.settlementCaption.textContent = `Urban share has room to compare against household size ${entry.households.toFixed(1)} and migration ${entry.migration.toFixed(1)}M.`;
}

function renderScatterChart(entries) {
  const svg = els.scatterChart;
  const width = 720;
  const height = 240;
  const margin = { top: 18, right: 18, bottom: 38, left: 50 };
  const maxDensity = Math.max(...entries.map(entry => entry.density));
  const minDensity = Math.min(...entries.map(entry => entry.density));
  const minLiteracy = Math.min(...entries.map(entry => entry.literacy));
  const maxLiteracy = Math.max(...entries.map(entry => entry.literacy));

  const x = value => margin.left + ((value - minDensity) / (maxDensity - minDensity)) * (width - margin.left - margin.right);
  const y = value => height - margin.bottom - ((value - minLiteracy) / (maxLiteracy - minLiteracy)) * (height - margin.top - margin.bottom);

  svg.innerHTML = `
    ${drawHorizontalGrid(width, height, margin, 5)}
    ${entries.map(entry => `
      <circle
        class="scatter-dot ${entry.regionId === state.regionId ? "is-active" : ""}"
        cx="${x(entry.density)}"
        cy="${y(entry.literacy)}"
        r="${entry.regionId === state.regionId ? 13 : 10}"
        fill="${entry.regionId === state.regionId ? "#a84b3a" : "#71834b"}"
        data-region="${entry.regionId}"
        data-tip="${entry.region}<br>Density: ${entry.density}/km²<br>Literacy: ${entry.literacy}%"
      ></circle>
    `).join("")}
    <text class="axis-label" x="${margin.left}" y="${height - 14}">Population density</text>
    <text class="axis-label" x="18" y="${margin.top}" transform="rotate(-90 18 ${margin.top})">Literacy rate</text>
  `;

  svg.querySelectorAll("[data-region]").forEach(node => {
    node.style.cursor = "pointer";
    node.addEventListener("click", () => {
      state.regionId = node.dataset.region;
      els.regionSelect.value = state.regionId;
      render();
    });
  });

  attachTooltip(svg);
  els.scatterCaption.textContent = `Higher-density regions in ${state.year} also trend toward higher literacy in this sample census view.`;
}

function getSortValue(entry) {
  if (state.sortBy === "growth") {
    const previousPopulation = entry.previous?.population ?? entry.population;
    return ((entry.population - previousPopulation) / previousPopulation) * 100;
  }
  if (state.sortBy === "literacy") {
    return entry.literacy;
  }
  if (state.sortBy === "urbanization") {
    return entry.urbanization;
  }
  return entry.population;
}

function metricLabel(metric) {
  return {
    population: "Population (millions)",
    literacy: "Literacy rate (%)",
    density: "Density (people/km²)",
    migration: "Net migration (millions)"
  }[metric];
}

function formatMetric(metric, value) {
  if (metric === "population" || metric === "migration") {
    return `${value.toFixed(1)}M`;
  }
  if (metric === "literacy") {
    return `${value}%`;
  }
  return value.toFixed(0);
}

function drawHorizontalGrid(width, height, margin, lines) {
  const chartHeight = height - margin.top - margin.bottom;
  return Array.from({ length: lines + 1 }, (_, index) => {
    const y = margin.top + (chartHeight / lines) * index;
    return `<line class="grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"></line>`;
  }).join("");
}

function attachTooltip(container) {
  container.querySelectorAll("[data-tip]").forEach(node => {
    node.addEventListener("pointerenter", event => {
      tooltip.hidden = false;
      tooltip.innerHTML = event.currentTarget.dataset.tip;
    });

    node.addEventListener("pointermove", event => {
      tooltip.style.left = `${event.clientX + 14}px`;
      tooltip.style.top = `${event.clientY + 14}px`;
    });

    node.addEventListener("pointerleave", () => {
      tooltip.hidden = true;
    });
  });
}

function formatNumber(value) {
  return Number(value).toFixed(1).replace(".0", "");
}

init();
