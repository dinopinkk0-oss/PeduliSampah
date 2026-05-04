# 🗺️ WebGIS TPS Yogyakarta

**"Dari Pemetaan ke Keputusan: Web GIS untuk Analisis Kelayakan dan Optimalisasi Lokasi TPS di Kota Yogyakarta"**

> *Peduli Sampah dan Lingkungan untuk Masa Depan yang Lebih Sehat*

---

## 📁 Struktur File

```
webgis-tps-yogyakarta/
├── index.html          ← Landing page utama
├── map.html            ← Halaman Peta Interaktif
├── edukasi.html        ← Halaman Edukasi
├── css/
│   ├── style.css       ← Stylesheet global (semua halaman)
│   ├── map.css         ← Stylesheet khusus halaman peta
│   └── edukasi.css     ← Stylesheet khusus halaman edukasi
├── js/
│   ├── main.js         ← Script bersama (musik, partikel, animasi)
│   └── map.js          ← Script peta Mapbox GL JS
└── README.md
```

---

## 🚀 Cara Deploy ke GitHub Pages

1. **Buat repositori baru** di GitHub (misal: `webgis-tps-yogyakarta`)
2. **Upload semua file** ke repositori (pertahankan struktur folder)
3. Buka **Settings → Pages**
4. Pilih branch `main`, folder `/root`
5. Klik **Save** → Website aktif di `https://username.github.io/webgis-tps-yogyakarta`

---

## 🔑 Setup Mapbox Token

Sebelum deploy, ganti token Mapbox di `js/map.js` baris 55:

```javascript
mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN_HERE';
```

Dapatkan token gratis di: https://account.mapbox.com/access-tokens/

---

## 🎵 Musik

Musik menggunakan file audio lokal:
- Tambahkan file audio kamu dengan nama **backsound.mp3** di folder root (sejajar dengan index.html)

---

## ✨ Fitur

- 🗺️ Peta interaktif Mapbox GL JS
- 📍 10 titik TPS/TPA/TPST/Depo Yogyakarta
- 🔴 Analisis buffer zona dampak (100m, 250m, 500m)
- 🛰️ Toggle basemap: Streets ↔ Satelit
- 🔍 Pencarian lokasi real-time
- 🔽 Filter berdasarkan jenis fasilitas
- 💬 Popup edukatif di setiap titik
- 🎵 Musik latar (SoundCloud)
- 🌿 Animasi partikel & efek visual
- 📱 Responsif mobile/desktop
- 🎬 Panel video YouTube edukasi sampah

---

## 👥 Kelompok 1

- Vichesa Risma Putri
- Amelia Pitra Salsabila Banu Susilo
- Ilma Nugraheni
- Erfina Hijria Ashsakinaya
- Cecilia Yuli Santi Br. Pane
- M. Naufal Candra Nusantara
- Cahya Kastim Putra
