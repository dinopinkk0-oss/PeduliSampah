// ===== MAP.JS – Mapbox GL JS Map Page =====

// === DATA TPS/TPA ===
const tpsData = [
  {
    id: 1,
    name: "TPA Kota Baru",
    type: "TPA",
    lat: -7.788443,
    lng: 110.369346,
    desc: "Tempat Pembuangan Akhir utama di wilayah Kota Baru. Fasilitas ini menerima sampah dari berbagai penjuru kota dan perlu dikelola dengan ketat untuk mencegah pencemaran lingkungan sekitar.",
  },
  {
    id: 2,
    name: "TPS Demangan",
    type: "TPS",
    lat: -7.85497,
    lng: 110.387925,
    desc: "Tempat Penampungan Sementara di kawasan Demangan. Lokasi ini melayani masyarakat sekitar sebelum sampah diangkut ke TPA.",
  },
  {
    id: 3,
    name: "TPA Karanganyar",
    type: "TPA",
    lat: -7.817025,
    lng: 110.373438,
    desc: "Tempat Pembuangan Akhir di wilayah Karanganyar. Keberadaannya perlu dipantau karena dapat berdampak pada kualitas lingkungan sekitar.",
  },
  {
    id: 4,
    name: "TPS THR Keparakan",
    type: "TPS",
    lat: -7.808933,
    lng: 110.369133,
    desc: "Titik penampungan sampah sementara yang berlokasi di sekitar kawasan THR Keparakan, melayani kawasan padat permukiman.",
  },
  {
    id: 5,
    name: "TPS Umum Patangpuluhan",
    type: "TPS",
    lat: -7.811178,
    lng: 110.34541,
    desc: "TPS umum yang melayani warga Patangpuluhan. Lokasi strategis namun perlu memperhatikan jarak dengan permukiman agar tidak menimbulkan gangguan.",
  },
  {
    id: 6,
    name: "Depo TPS Lempuyangan",
    type: "Depo",
    lat: -7.79094,
    lng: 110.373972,
    desc: "Titik depo pengumpulan sampah di kawasan Lempuyangan. Berfungsi sebagai pusat pengumpulan sebelum distribusi ke TPA.",
  },
  {
    id: 7,
    name: "TPS Argolubang",
    type: "TPS",
    lat: -7.790215,
    lng: 110.380535,
    desc: "Fasilitas penampungan sampah sementara di Argolubang. Melayani warga sekitar dalam pengelolaan sampah harian.",
  },
  {
    id: 8,
    name: "Depo/TPS Gedongkuning",
    type: "Depo",
    lat: -7.807238,
    lng: 110.398035,
    desc: "Depo sekaligus TPS yang berlokasi di Gedongkuning. Mendukung pengelolaan sampah di kawasan timur kota.",
  },
  {
    id: 9,
    name: "TPS Kotagede",
    type: "TPS",
    lat: -7.822405,
    lng: 110.396239,
    desc: "Tempat penampungan sementara di kawasan bersejarah Kotagede. Perlu pengelolaan ekstra hati-hati untuk menjaga estetika lingkungan budaya.",
  },
  {
    id: 10,
    name: "TPST Karangmiri",
    type: "TPST",
    lat: -7.83297,
    lng: 110.39548,
    desc: "Tempat Pengolahan Sampah Terpadu di Karangmiri. Fasilitas modern yang mengintegrasikan pemilahan, pengomposan, dan daur ulang sampah.",
  },
];

// Marker colors per type
const typeColors = {
  TPA:  '#ef4444',
  TPS:  '#f59e0b',
  TPST: '#3b82f6',
  Depo: '#22c55e',
};

const typeIcons = {
  TPA:  '🏔️',
  TPS:  '🗑️',
  TPST: '♻️',
  Depo: '🚛',
};

// ===== MAPBOX TOKEN =====
// NOTE: Replace with your Mapbox public token before deploying
mapboxgl.accessToken = 'pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ';

// ===== INIT MAP =====
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [110.383, -7.801],
  zoom: 13,
  attributionControl: false,
});

map.addControl(new mapboxgl.AttributionControl({ compact: true }));
map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'bottom-right');
map.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-right');
map.addControl(new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: false }), 'bottom-right');

// ===== LOADING =====
const mapLoading = document.getElementById('mapLoading');
map.on('load', () => {
  setTimeout(() => {
    if (mapLoading) {
      mapLoading.classList.add('hidden');
      setTimeout(() => mapLoading.style.display = 'none', 600);
    }
  }, 800);
  addMarkers();
});

// ===== MARKERS =====
const markers    = [];
let   activePopup = null;

function addMarkers(filter = []) {
  // Remove old markers
  markers.forEach(m => m.remove());
  markers.length = 0;

  const activeTypes = filter.length ? filter : ['TPA', 'TPS', 'TPST', 'Depo'];
  const visible     = tpsData.filter(d => activeTypes.includes(d.type));

  const countEl = document.getElementById('visibleCount');
  if (countEl) countEl.textContent = visible.length;

  visible.forEach(loc => {
    // Custom HTML marker
    const el       = document.createElement('div');
    el.className   = 'custom-marker';
    el.setAttribute('data-type', loc.type);

    const color = typeColors[loc.type] || '#22c55e';
    const icon  = typeIcons[loc.type]  || '📍';

    el.innerHTML = `
      <div class="marker-pin" style="background:${color}; box-shadow: 0 4px 14px ${color}55;">
        <span class="marker-icon">${icon}</span>
      </div>
      <div class="marker-shadow"></div>
    `;

    // Inject marker CSS once
    if (!document.getElementById('marker-style')) {
      const s = document.createElement('style');
      s.id    = 'marker-style';
      s.textContent = `
        .custom-marker { cursor: pointer; }
        .marker-pin {
          width: 38px; height: 38px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex; align-items: center; justify-content: center;
          border: 2px solid rgba(255,255,255,0.7);
          transition: all 0.2s ease;
          position: relative;
        }
        .custom-marker:hover .marker-pin { transform: rotate(-45deg) scale(1.2); }
        .marker-icon {
          transform: rotate(45deg);
          font-size: 16px;
          line-height: 1;
        }
        .marker-shadow {
          width: 10px; height: 6px;
          background: rgba(0,0,0,0.2);
          border-radius: 50%;
          margin: 2px auto 0;
          filter: blur(2px);
        }
      `;
      document.head.appendChild(s);
    }

    // Popup
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      offset: { top: [0, 8], bottom: [0, -42] },
      maxWidth: '300px',
    });

    popup.setHTML(`
      <div class="popup-inner">
        <span class="popup-type-badge popup-type-${loc.type}">${typeIcons[loc.type]} ${loc.type}</span>
        <div class="popup-name">${loc.name}</div>
        <div class="popup-coords">📍 ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</div>
        <div class="popup-divider"></div>
        <div class="popup-desc">${loc.desc}</div>
      </div>
    `);

    el.addEventListener('click', () => {
      if (activePopup) activePopup.remove();
      popup.setLngLat([loc.lng, loc.lat]).addTo(map);
      activePopup = popup;
      map.flyTo({ center: [loc.lng, loc.lat], zoom: Math.max(map.getZoom(), 15), speed: 1.2 });
    });

    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat([loc.lng, loc.lat])
      .addTo(map);

    markers.push(marker);
  });
}

// ===== BUFFER ANALYSIS =====
let bufferVisible = false;

function addBufferLayers() {
  const radii = [100, 250, 500];
  const colors = ['#ef4444', '#f59e0b', '#22c55e'];
  const opacities = [0.18, 0.14, 0.1];

  // Remove existing
  removeBufferLayers();

  const allFeatures = tpsData.map(loc => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [loc.lng, loc.lat] },
    properties: { name: loc.name, type: loc.type },
  }));

  radii.forEach((r, i) => {
    const layerId  = `buffer-${r}`;
    const sourceId = `buffer-src-${r}`;

    // Create buffered circles (approximate with turf-like formula)
    const polygons = allFeatures.map(f => {
      return circlePolygon(f.geometry.coordinates, r);
    });

    const geojson = {
      type: 'FeatureCollection',
      features: polygons,
    };

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, { type: 'geojson', data: geojson });
    }
    if (!map.getLayer(layerId + '-fill')) {
      map.addLayer({
        id: layerId + '-fill',
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': colors[i],
          'fill-opacity': opacities[i],
        },
      }, 'waterway-label');
    }
    if (!map.getLayer(layerId + '-stroke')) {
      map.addLayer({
        id: layerId + '-stroke',
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': colors[i],
          'line-width': 1.5,
          'line-opacity': 0.5,
          'line-dasharray': i === 0 ? [1,0] : i === 1 ? [4, 2] : [8, 4],
        },
      });
    }
  });
}

function removeBufferLayers() {
  [100, 250, 500].forEach(r => {
    const lid = `buffer-${r}`;
    const sid = `buffer-src-${r}`;
    if (map.getLayer(lid + '-fill'))   map.removeLayer(lid + '-fill');
    if (map.getLayer(lid + '-stroke')) map.removeLayer(lid + '-stroke');
    if (map.getSource(sid))            map.removeSource(sid);
  });
}

// Create a circle polygon approximation (no turf.js needed)
function circlePolygon(center, radiusMeters, steps = 64) {
  const coords = [];
  const earthR = 6378137;
  const lat    = center[1] * Math.PI / 180;
  const lng    = center[0] * Math.PI / 180;
  const dR     = radiusMeters / earthR;

  for (let i = 0; i <= steps; i++) {
    const angle  = (i / steps) * 2 * Math.PI;
    const pLat   = Math.asin(Math.sin(lat) * Math.cos(dR) +
                             Math.cos(lat) * Math.sin(dR) * Math.cos(angle));
    const pLng   = lng + Math.atan2(
      Math.sin(angle) * Math.sin(dR) * Math.cos(lat),
      Math.cos(dR) - Math.sin(lat) * Math.sin(pLat)
    );
    coords.push([pLng * 180 / Math.PI, pLat * 180 / Math.PI]);
  }

  return {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [coords] },
    properties: {},
  };
}

// ===== BUFFER BUTTON =====
const btnBuffer      = document.getElementById('btnBuffer');
const btnClearBuffer = document.getElementById('btnClearBuffer');

if (btnBuffer) {
  btnBuffer.addEventListener('click', () => {
    if (!bufferVisible) {
      addBufferLayers();
      bufferVisible = true;
      btnBuffer.innerHTML = '<i class="fas fa-eye-slash"></i> Sembunyikan Buffer';
      btnBuffer.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
      if (btnClearBuffer) btnClearBuffer.style.display = 'flex';
    } else {
      removeBufferLayers();
      bufferVisible = false;
      btnBuffer.innerHTML = '<i class="fas fa-bullseye"></i> Lihat Zona Dampak';
      btnBuffer.style.background = '';
      if (btnClearBuffer) btnClearBuffer.style.display = 'none';
    }
  });
}

if (btnClearBuffer) {
  btnClearBuffer.addEventListener('click', () => {
    removeBufferLayers();
    bufferVisible = false;
    if (btnBuffer) {
      btnBuffer.innerHTML = '<i class="fas fa-bullseye"></i> Lihat Zona Dampak';
      btnBuffer.style.background = '';
    }
    btnClearBuffer.style.display = 'none';
  });
}

// ===== BASEMAP TOGGLE =====
const btnStreets   = document.getElementById('btnStreets');
const btnSatellite = document.getElementById('btnSatellite');

function setStyle(styleUrl) {
  map.setStyle(styleUrl);
  map.once('styledata', () => {
    // Re-add markers after style change
    addMarkers(getActiveFilters());
    if (bufferVisible) addBufferLayers();
  });
}

if (btnStreets) {
  btnStreets.addEventListener('click', () => {
    setStyle('mapbox://styles/mapbox/streets-v12');
    btnStreets.classList.add('active');
    btnSatellite.classList.remove('active');
  });
}
if (btnSatellite) {
  btnSatellite.addEventListener('click', () => {
    setStyle('mapbox://styles/mapbox/satellite-streets-v12');
    btnSatellite.classList.add('active');
    btnStreets.classList.remove('active');
  });
}

// ===== FILTER =====
function getActiveFilters() {
  const cbs = document.querySelectorAll('.filter-cb');
  const active = [];
  cbs.forEach(cb => { if (cb.checked) active.push(cb.value); });
  return active;
}

document.querySelectorAll('.filter-cb').forEach(cb => {
  cb.addEventListener('change', () => {
    addMarkers(getActiveFilters());
  });
});

// ===== SEARCH =====
const searchInput   = document.getElementById('searchInput');
const searchBtn     = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

function performSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (searchResults) searchResults.innerHTML = '';
  if (!q) return;

  const results = tpsData.filter(d =>
    d.name.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    searchResults.innerHTML = `<li style="font-size:12px; color:rgba(255,255,255,0.4); padding:8px 12px;">Tidak ditemukan</li>`;
    return;
  }

  results.forEach(loc => {
    const li   = document.createElement('li');
    li.className = 'search-result-item';
    li.innerHTML = `
      <span style="font-size:16px">${typeIcons[loc.type]}</span>
      <span>${loc.name}</span>
      <span style="margin-left:auto; font-size:10px; padding:2px 7px; border-radius:4px; background:${typeColors[loc.type]}30; color:${typeColors[loc.type]}">${loc.type}</span>
    `;
    li.addEventListener('click', () => {
      map.flyTo({ center: [loc.lng, loc.lat], zoom: 16, speed: 1.5 });
      if (activePopup) activePopup.remove();
      const popup = new mapboxgl.Popup({ closeButton: true, offset: [0, -42], maxWidth: '300px' });
      popup.setLngLat([loc.lng, loc.lat]).setHTML(`
        <div class="popup-inner">
          <span class="popup-type-badge popup-type-${loc.type}">${typeIcons[loc.type]} ${loc.type}</span>
          <div class="popup-name">${loc.name}</div>
          <div class="popup-coords">📍 ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</div>
          <div class="popup-divider"></div>
          <div class="popup-desc">${loc.desc}</div>
        </div>
      `).addTo(map);
      activePopup = popup;
      if (searchResults) searchResults.innerHTML = '';
      searchInput.value = '';
    });
    searchResults.appendChild(li);
  });
}

if (searchBtn)   searchBtn.addEventListener('click', performSearch);
if (searchInput) searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') performSearch(); });

// Close search results on outside click
document.addEventListener('click', e => {
  if (searchResults && !searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
    searchResults.innerHTML = '';
  }
});

// ===== RESET VIEW =====
const btnReset = document.getElementById('btnReset');
if (btnReset) {
  btnReset.addEventListener('click', () => {
    map.flyTo({ center: [110.383, -7.801], zoom: 13, speed: 1.5 });
    if (activePopup) { activePopup.remove(); activePopup = null; }
  });
}

// ===== SIDEBAR TOGGLE =====
const sidebar           = document.getElementById('sidebar');
const sidebarToggle     = document.getElementById('sidebarToggle');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const icon = sidebarToggle.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
      icon.className = 'fas fa-chevron-right';
    } else {
      icon.className = 'fas fa-chevron-left';
    }
    setTimeout(() => map.resize(), 350);
  });
}

if (mobileSidebarToggle && sidebar) {
  mobileSidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });
  // Close on outside click
  document.getElementById('map')?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
  });
}
