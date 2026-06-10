// ===== MAP-TABS.JS =====
// Tab navigation + kesesuaian mirror + validasi panel integration
// Tidak mengubah logika JS yang sudah ada di map.js

(function () {
  'use strict';

  // ── Tab switching ──────────────────────────────────────────────
  window.switchTab = function (tabId) {
    document.querySelectorAll('.tab-rail-btn[data-tab]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
      btn.setAttribute('aria-selected', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === 'tab-' + tabId);
    });
    // Open sidebar if collapsed
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('collapsed')) {
      sidebar.classList.remove('collapsed');
      updateSidebarToggleIcon();
      setTimeout(() => { if (window.map && window.map.resize) window.map.resize(); }, 320);
    }
  };

  document.querySelectorAll('.tab-rail-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // ── Skor-tab mini toggle (inside Kesesuaian panel) ──────────────
  document.querySelectorAll('.skor-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.skor-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.skor-table').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById('skor-' + btn.dataset.skor);
      if (target) target.classList.add('active');
    });
  });

  // ── Collapse/expand sidebar ─────────────────────────────────────
  window.updateSidebarToggleIcon = function () {
    const sidebar = document.getElementById('sidebar');
    const icon = document.querySelector('#sidebarToggle i');
    const label = document.querySelector('#sidebarToggle span');
    if (!sidebar) return;
    const collapsed = sidebar.classList.contains('collapsed');
    if (icon) icon.className = collapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
    if (label) label.textContent = collapsed ? 'Buka' : 'Tutup';
    document.body.classList.toggle('sidebar-is-collapsed', collapsed);
  };

  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      sidebar.classList.remove('mobile-open');
      updateSidebarToggleIcon();
      setTimeout(() => { if (window.map && window.map.resize) window.map.resize(); }, 320);
    });
  }

  const mobileToggle = document.getElementById('mobileSidebarToggle');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.remove('mobile-open');
      } else {
        sidebar.classList.toggle('mobile-open');
      }
      updateSidebarToggleIcon();
    });
    document.getElementById('map')?.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
    });
  }

  // ── Mirror kesesuaian result from analysisPanel ─────────────────
  // Watch for changes in _lastKesesuaian and update kesesuaian tab
  const labelMap = ['', 'Tidak Sesuai', 'Kurang Sesuai', 'Sesuai', 'Sangat Sesuai'];
  function renderKesesuaianTab() {
    const k = window._lastKesesuaian;
    const panel = document.getElementById('kesesuaianResult');
    if (!panel) return;
    if (!k) {
      panel.innerHTML = '<div class="empty-analysis">Klik lokasi pada peta untuk melihat skor kesesuaian lahan.</div>';
      return;
    }
    const kat = k.kategori || { label: '-', color: '#888', icon: '?' };
    panel.innerHTML = `
      <div class="kes-result-badge" style="background:${kat.color}22;color:${kat.color};border:1px solid ${kat.color}55">
        ${kat.icon} ${kat.label}
      </div>
      <div class="kes-result-nilai">
        Nilai Kesesuaian: <strong style="color:${kat.color}">${k.nilaiKesesuaian}</strong> / 4.00
      </div>
      <div class="kes-result-rows">
        ${kesRow('🌊', 'Sungai', '35%', k.riverDistanceM, k.skorSungai)}
        ${kesRow('🛣️', 'Jalan', '35%', k.roadDistanceM, k.skorJalan)}
        ${kesRow('🏘️', 'Permukiman', '30%', k.settlementDistanceM, k.skorPermukiman)}
      </div>
    `;
  }

  function kesRow(icon, label, bobot, jarak, skor) {
    const cat = labelMap[skor] || '-';
    const cls = skor >= 4 ? 's4' : skor === 3 ? 's3' : skor === 2 ? 's2' : 's1';
    return `
      <div class="kes-result-row">
        <span class="kes-result-label">${icon} ${label} <small>${bobot}</small></span>
        <span class="kes-result-dist">${jarak != null ? jarak + ' m' : '-'}</span>
        <span class="kes-result-skor ${cls}">Skor ${skor || '-'}</span>
        <span class="kes-result-cat">${cat}</span>
      </div>`;
  }

  // Poll for changes (simple approach — no mutation observer needed)
  let lastKesHash = null;
  setInterval(() => {
    const k = window._lastKesesuaian;
    const hash = k ? JSON.stringify(k) : null;
    if (hash !== lastKesHash) {
      lastKesHash = hash;
      renderKesesuaianTab();
    }
  }, 400);

  // ── Quick shortcut buttons on map auto-switch to correct tab ────
  // When btnAnalyzeClick is activated, switch to pelayanan tab
  const btnAnalyzeClick = document.getElementById('btnAnalyzeClick');
  if (btnAnalyzeClick) {
    btnAnalyzeClick.addEventListener('click', () => switchTab('pelayanan'), true);
  }
  const btnStartGame = document.getElementById('btnStartGame');
  if (btnStartGame) {
    btnStartGame.addEventListener('click', () => switchTab('game'), true);
  }

  // ── Dashboard shortcut buttons ──────────────────────────────────
  // Already inline onclick="switchTab(...)" in HTML

})();

// ===== BUKA–TUTUP PANEL DASHBOARD ANALISIS =====
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("dashboardPanelToggle");
  const toggleText = toggleButton?.querySelector("span");

  if (!sidebar || !toggleButton) {
    console.warn("Tombol atau sidebar dashboard tidak ditemukan.");
    return;
  }

  toggleButton.addEventListener("click", () => {
    const sedangTertutup =
      sidebar.classList.toggle("dashboard-panel-collapsed");

    toggleButton.title = sedangTertutup
      ? "Buka Dashboard Analisis"
      : "Tutup Dashboard Analisis";

    if (toggleText) {
      toggleText.textContent = sedangTertutup
        ? "Buka"
        : "Tutup";
    }

    // Menyesuaikan ukuran peta setelah sidebar berubah
    window.setTimeout(() => {
      if (
        typeof map !== "undefined" &&
        typeof map.resize === "function"
      ) {
        map.resize();
      }
    }, 320);
  });
});