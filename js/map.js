// ===== MAP.JS – WebGIS TPS/TPA + Analisis Spasial Interaktif =====
// Catatan: visual layer sungai, jalan, dan permukiman sekarang memakai vector layer Mapbox
// agar bentuknya mengikuti tampilan basemap. GeoJSON indikatif tetap dipakai untuk
// perhitungan analisis jarak/skor. Untuk penelitian final, ganti GeoJSON analisis
// dengan data resmi dari InaGeoportal/BPS/DLH.

// ===== DATA TPS/TPA (DIPERBARUI DARI EXCEL TPA_TPS_KOTA_YOGYAKARTA.xlsx) =====
const tpsData = [
  { id: 1, name: 'TPA Kota Baru', type: 'TPA', lat: -7.788475917570395, lng: 110.369329965673188, desc: 'Tempat Pembuangan Akhir yang menjadi titik akhir pengelolaan sampah kota. Perlu pengelolaan ketat untuk mencegah pencemaran air tanah dan lingkungan sekitar. Status: Tutup. Akses jalan: Baik.' },
  { id: 2, name: 'TPA Sampah Karanganyar', type: 'TPA', lat: -7.818297846653573, lng: 110.373248055859179, desc: 'Tempat Pembuangan Akhir yang menjadi titik akhir pengelolaan sampah kota. Perlu pengelolaan ketat untuk mencegah pencemaran air tanah dan lingkungan sekitar. Status: Tutup. Akses jalan: Baik.' },
  { id: 3, name: 'TPS THR Keparakan', type: 'TPS', lat: -7.809037608895190, lng: 110.369149814862837, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 4, name: 'TPS Umum Patangpuluhan', type: 'TPS', lat: -7.811260882128475, lng: 110.345420505355250, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 5, name: 'Depo TPS Lempuyangan', type: 'Depo', lat: -7.790958068649571, lng: 110.373965078048599, desc: 'Tempat Pembuangan Akhir yang menjadi titik akhir pengelolaan sampah kota. Perlu pengelolaan ketat untuk mencegah pencemaran air tanah dan lingkungan sekitar. Status: Tutup. Akses jalan: Baik.' },
  { id: 6, name: 'TPS Argolubang', type: 'TPS', lat: -7.790252978216592, lng: 110.380546532071747, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 7, name: 'Depo TPS Gedongkuning', type: 'Depo', lat: -7.807281097323622, lng: 110.398024917723575, desc: 'Tempat Pembuangan Akhir yang menjadi titik akhir pengelolaan sampah kota. Perlu pengelolaan ketat untuk mencegah pencemaran air tanah dan lingkungan sekitar. Status: Belum ada Informasi. Akses jalan: Baik.' },
  { id: 8, name: 'TPS Kotagede', type: 'TPS', lat: -7.822183461924745, lng: 110.396223806745525, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Belum ada Informasi. Akses jalan: Baik.' },
  { id: 9, name: 'TPST Karangmiri', type: 'TPST', lat: -7.832976935544049, lng: 110.395475739892049, desc: 'Tempat Pengolahan Sampah Terpadu yang mengintegrasikan pemilahan, pengomposan, daur ulang, dan pengurangan volume sampah secara modern. Status: Buka. Akses jalan: Kurang Baik.' },
  { id: 10, name: 'TPS Pengok', type: 'TPS', lat: -7.787959587393675, lng: 110.387862467518502, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 11, name: 'TPS Nitikan', type: 'TPS', lat: -7.828723878920814, lng: 110.386610584108965, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 12, name: 'TPS Kelurahan Bener', type: 'TPS', lat: -7.775853388402978, lng: 110.351912654229068, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Tutup. Akses jalan: Baik.' },
  { id: 13, name: 'Depo Sampah Sorosutan', type: 'Depo', lat: -7.823775404792464, lng: 110.377251140606930, desc: 'Tempat Pembuangan Akhir yang menjadi titik akhir pengelolaan sampah kota. Perlu pengelolaan ketat untuk mencegah pencemaran air tanah dan lingkungan sekitar. Status: Buka. Akses jalan: Kurang Baik.' },
  { id: 14, name: 'TPS3R Nitikan 2', type: 'TPS3R', lat: -7.830356965794186, lng: 110.386509249919897, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 15, name: 'Depo Pringgokusuman', type: 'Depo', lat: -7.791527700183611, lng: 110.357151598336941, desc: 'Tempat Pembuangan Akhir yang menjadi titik akhir pengelolaan sampah kota. Perlu pengelolaan ketat untuk mencegah pencemaran air tanah dan lingkungan sekitar. Status: Buka. Akses jalan: Baik.' },
  { id: 16, name: 'TPS Sampah Sagan', type: 'TPS', lat: -7.781677621205435, lng: 110.376562756916883, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Tutup. Akses jalan: Baik.' },
  { id: 17, name: 'TPS Mandala Krida', type: 'TPS', lat: -7.795992269483172, lng: 110.382760699631746, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 18, name: 'TPS Langensari', type: 'TPS', lat: -7.794423175959348, lng: 110.382224197123946, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Buka. Akses jalan: Baik.' },
  { id: 19, name: 'TPS Taman Sari', type: 'TPS', lat: -7.808983694948879, lng: 110.355910158103200, desc: 'Tempat Penampungan Sementara yang mengumpulkan sampah dari warga sebelum diangkut ke TPA atau fasilitas pengolahan lebih lanjut. Status: Tutup. Akses jalan: Baik.' },
];

// ===== DATA VALIDASI DIGITAL (DIPERBARUI DARI EXCEL) =====
const validationData = {
  1: { kelurahan: 'Kotabaru/Gondokusuman', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 115, kepadatan: 'Tinggi', confidence: 88, status: 'Sangat Valid', statusOperasional: 'Tutup', osmUrl: 'https://osm.org/go/tbh_8BL7n?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7884759,110.36933', sumberBerita: `https://www.metrotvnews.com/read/KXyCQlAA-pemkot-yogyakarta-tutup-sejumlah-depo-sampah`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_8BL7n?m=. Google Earth: https://earth.google.com/web/search/-7.7884759,110.36933' },
  2: { kelurahan: 'Karanganyar/Mergangsan', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 95, kepadatan: 'Tinggi', confidence: 84, status: 'Sangat Valid', statusOperasional: 'Tutup', osmUrl: 'https://osm.org/go/tbh_obcpX?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8182978,110.3732481', sumberBerita: `https://www.detik.com/jogja/berita/d-7066693/catat-dab-jadwal-buka-depo-sampah-dan-tps-di-jogja-bulan-desember-2023
https://jogjapolitan.harianjogja.com/r-693767/pengelolaan-sampah-sampah-dari-warga-m`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_obcpX?m=. Google Earth: https://earth.google.com/web/search/-7.8182978,110.3732481' },
  3: { kelurahan: 'Keparakan/Mergangsan', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 80, kepadatan: 'Tinggi', confidence: 86, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh_sFMqW?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8090376,110.3691498', sumberBerita: `https://jogjapolitan.harianjogja.com/r-1227332/kesadaran-warga-di-keparakan-jogja-untuk-mengelola-sampah-terus-ditingkatkan
https://ecologic.harianjogja.com/r-1241164/sampah-organik-di-keparakan-jogja`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_sFMqW?m=. Google Earth: https://earth.google.com/web/search/-7.8090376,110.3691498' },
  4: { kelurahan: 'Patangpuluhan/Wirobrajan', aksesJalan: 'Baik', permukiman: 'Sedang', jarakPermukimanM: 70, kepadatan: 'Sedang–Tinggi', confidence: 84, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh_OqAjZ?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8112609,110.3454205', sumberBerita: `https://jogja.disway.id//daerah/read/694573/rt-18-patangpuluhan-jadi-percontohan-pemilahan-sampah-rumah-tangga-di-kota-jogja?utm_source
https://jogjapolitan.harianjogja.com/r-1224044/pengelolaan-sampa`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_OqAjZ?m=. Google Earth: https://earth.google.com/web/search/-7.8112609,110.3454205' },
  5: { kelurahan: 'Lempuyangan/Danurejan', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 100, kepadatan: 'Tinggi', confidence: 89, status: 'Sangat Valid', statusOperasional: 'Tutup', osmUrl: 'https://osm.org/go/tbh_5b4_g?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7909581,110.3739651', sumberBerita: `https://yogyakarta.bpk.go.id/kebersihan-lingkungan-pemkot-tutup-depo-lempuyangan/`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_5b4_g?m=. Google Earth: https://earth.google.com/web/search/-7.7909581,110.3739651' },
  6: { kelurahan: 'Argolubang/Mantrijeron', aksesJalan: 'Baik', permukiman: 'Sedang', jarakPermukimanM: 110, kepadatan: 'Sedang–Tinggi', confidence: 78, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh_7Uadz?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.790253,110.3805465', sumberBerita: `https://radarjogja.jawapos.com/jogja/2601150069/buntut-tpst-piyungan-tak-lagi-terima-sampah-depo-depo-di-kota-jogja-terdampak
https://jogjapolitan.harianjogja.com/r-1235136/tumpukan-sampah-argolubang-`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_7Uadz?m=. Google Earth: https://earth.google.com/web/search/-7.790253,110.3805465' },
  7: { kelurahan: 'Gedongkuning/Umbulharjo', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 125, kepadatan: 'Tinggi', confidence: 87, status: 'Sangat Valid', statusOperasional: 'Belum ada Informasi', osmUrl: 'https://osm.org/go/tbjUEzeQ5?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8072811,110.3980249', sumberBerita: ``, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbjUEzeQ5?m=. Google Earth: https://earth.google.com/web/search/-7.8072811,110.3980249' },
  8: { kelurahan: 'Kotagede', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 90, kepadatan: 'Tinggi', confidence: 85, status: 'Sangat Valid', statusOperasional: 'Belum ada Informasi', osmUrl: 'https://osm.org/go/tbjRV1Uti?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8224048,110.3962599', sumberBerita: ``, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbjRV1Uti?m=. Google Earth: https://earth.google.com/web/search/-7.8224048,110.3962599' },
  9: { kelurahan: 'Karangmiri/Umbulharjo', aksesJalan: 'Kurang Baik', permukiman: 'Sedang', jarakPermukimanM: 160, kepadatan: 'Sedang', confidence: 80, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbjRUKlJR?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8329769,110.3954757', sumberBerita: `https://jogjapolitan.harianjogja.com/r-1194076/tps3r-karangmiri-dan-piyungan-belum-beroperasi-maksimal`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbjRUKlJR?m=. Google Earth: https://earth.google.com/web/search/-7.8329769,110.3954757' },
  10: { kelurahan: 'Pengok/Gondokusuman', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 100, kepadatan: 'Tinggi', confidence: 82, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh__j~7Y?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7879596,110.3878625', sumberBerita: `https://www.detik.com/jogja/berita/d-8284263/catat-depo-di-jogja-tidak-lagi-terima-sampah-organik-mulai-1-januari-2026/
https://kabarjogja.rbtvjogja.tv/2025/09/11/depo-sampah-di-kota-yogyakarta-membel`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh__j~7Y?m=. Google Earth: https://earth.google.com/web/search/-7.7879596,110.3878625' },
  11: { kelurahan: 'Nitikan/Umbulharjo', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 85, kepadatan: 'Tinggi', confidence: 82, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh7_2Q0q?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8287239,110.3866106', sumberBerita: `https://www.researchgate.net/publication/398535531_Implementasi_sistem_pengelolaan_sampah_berbasis_3R_di_TPS_Nitikan_Kota_Yogyakarta`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh7_2Q0q?m=. Google Earth: https://earth.google.com/web/search/-7.8287239,110.3866106' },
  12: { kelurahan: 'Bener/Tegalrejo', aksesJalan: 'Baik', permukiman: 'Sedang', jarakPermukimanM: 105, kepadatan: 'Sedang–Tinggi', confidence: 80, status: 'Sangat Valid', statusOperasional: 'Tutup', osmUrl: 'https://osm.org/go/tbh~gP4b7?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7758534,110.3519127', sumberBerita: `https://pdfs.semanticscholar.org/7869/a6f3e1246ea6768aac35dfd2e8cf167c1250.pdf`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh~gP4b7?m=. Google Earth: https://earth.google.com/web/search/-7.7758534,110.3519127' },
  13: { kelurahan: 'Sorosutan/Umbulharjo', aksesJalan: 'Kurang Baik', permukiman: 'Padat', jarakPermukimanM: 95, kepadatan: 'Tinggi', confidence: 81, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh795cFm?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8237754,110.3772511', sumberBerita: `https://jogja.antaranews.com/berita/782897/dlh-yogyakarta-pasang-timbangan-digital-di-depo-sampah-jelang-nataru
https://www.instagram.com/reel/C6w-aJJhGjZ/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh795cFm?m=. Google Earth: https://earth.google.com/web/search/-7.8237754,110.3772511' },
  14: { kelurahan: 'Nitikan/Umbulharjo', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 90, kepadatan: 'Tinggi', confidence: 83, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh7_yBRZ?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.830357,110.3865092', sumberBerita: `https://www.krjogja.com/yogyakarta/1246962799/bau-sampah-menyengat-tiga-hari-terakhir-warga-mendungan-geruduk-unit-pengelolaan-sampah-nitikan-2`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh7_yBRZ?m=. Google Earth: https://earth.google.com/web/search/-7.830357,110.3865092' },
  15: { kelurahan: 'Pringgokusuman/Gedongtengen', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 100, kepadatan: 'Tinggi', confidence: 82, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh_x62AV--?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7915277,110.3571516', sumberBerita: `https://www.detik.com/jogja/berita/d-7014885/catat-dab-jadwal-buka-tps-depo-sampah-kota-jogja-november-2023`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_x62AV--?m=. Google Earth: https://earth.google.com/web/search/-7.7915277,110.3571516' },
  16: { kelurahan: 'Sagan/Gondokusuman', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 95, kepadatan: 'Tinggi', confidence: 80, status: 'Sangat Valid', statusOperasional: 'Tutup', osmUrl: 'https://osm.org/go/tbh_ktm8J--?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.8089837,110.3559102', sumberBerita: `https://www.tiktok.com/@maryonoo921/video/7613622753505201416`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_ktm8J--?m=. Google Earth: https://earth.google.com/web/search/-7.8089837,110.3559102' },
  17: { kelurahan: 'Mandala Krida/Gondokusuman', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 110, kepadatan: 'Tinggi', confidence: 81, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh_6cMCa--?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7959923,110.3827607', sumberBerita: `https://jogja.suara.com/read/2024/06/24/165806/baru-50-ton-sampah-diangkut-dari-mandala-krida-sampah-di-kota-jogja-capai-5000-ton
https://www.detik.com/jogja/berita/d-7228466/mau-buang-sampah-di-depo-`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_6cMCa--?m=. Google Earth: https://earth.google.com/web/search/-7.7959923,110.3827607' },
  18: { kelurahan: 'Langensari/Gondokusuman', aksesJalan: 'Baik', permukiman: 'Padat', jarakPermukimanM: 100, kepadatan: 'Tinggi', confidence: 80, status: 'Sangat Valid', statusOperasional: 'Buka', osmUrl: 'https://osm.org/go/tbh_7C6FL?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7944232,110.3822242', sumberBerita: `https://kampungkb.kemendukbangga.go.id/kampung/4919/intervensi/2704151/sosialisasi-tps-3r-langensari-wujud-nyata-kurangi-volume-sampah-lingkungan
https://www.detik.com/jogja/berita/d-7066693/catat-dab`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_7C6FL?m=. Google Earth: https://earth.google.com/web/search/-7.7944232,110.3822242' },
  19: { kelurahan: 'Taman Sari/Wirobrajan', aksesJalan: 'Baik', permukiman: 'Sedang', jarakPermukimanM: 80, kepadatan: 'Sedang–Tinggi', confidence: 79, status: 'Sangat Valid', statusOperasional: 'Tutup', osmUrl: 'https://osm.org/go/tbh_9noVi--?m=', googleEarthUrl: 'https://earth.google.com/web/search/-7.7816776,110.3765628', sumberBerita: `https://jogja.suara.com/read/2025/03/27/155900/persiapan-hadapi-lonjakan-sampah-saat-libur-lebaran-belasan-depo-di-kota-jogja-mulai-dikosongkan
https://timesindonesia.co.id/peristiwa-daerah/533456/pem`, catatan: 'Validasi berbasis data sekunder: Google Maps, citra satelit, dan OSM. OSM: https://osm.org/go/tbh_9noVi--?m=. Google Earth: https://earth.google.com/web/search/-7.7816776,110.3765628' },
};


// Screenshot lokal yang sudah dimasukkan ke folder /validasi.
// Dua lokasi (TPS Demangan dan TPS THR Keparakan) belum punya screenshot lokal,
// sehingga drawer otomatis memakai tombol Google Maps/Google Earth sebagai fallback.
const validationImageMap = {
  // ── ID 1–10 (LAMA, sudah ada fotonya) ──
  1:  { jalan: 'validasi/jalan TPA Kota Baru.png',           citra: 'validasi/citra TPA Kota Baru.png',           depan: 'validasi/depan TPA Kota Baru.png' },
  2:  { jalan: 'validasi/jalan tpa karanganyar.png',         citra: 'validasi/citra tpa karanganyar.png',         depan: 'validasi/depan tpa karanganyar.png' },
  3:  { jalan: 'validasi/jalan TPS THR Keparakan.png',       citra: 'validasi/citra TPS THR Keparakan.png',       depan: 'validasi/depan TPS THR Keparakan.png' },
  4:  { jalan: 'validasi/jalan TPS Umum Patangpuluhan.png',  citra: 'validasi/citra TPS Umum Patangpuluhan.png',  depan: 'validasi/depan TPS Umum Patangpuluhan.png' },
  5:  { jalan: 'validasi/jalan Depo TPS Lempuyangan.png',    citra: 'validasi/citra Depo TPS Lempuyangan.png',    depan: 'validasi/depan Depo TPS Lempuyangan.png' },
  6:  { jalan: 'validasi/jalan TPS Argolubang.png',          citra: 'validasi/citra TPS Argolubang.png',          depan: 'validasi/depan TPS Argolubang.png' },
  7:  { jalan: 'validasi/jalan DepoTPS Gedongkuning.png',    citra: 'validasi/citra DepoTPS Gedongkuning.png',    depan: 'validasi/depan DepoTPS Gedongkuning.png' },
  8:  { jalan: 'validasi/jalan TPS Kotagede.png',            citra: 'validasi/citra TPS Kotagede.png',            depan: 'validasi/depan TPS Kotagede.png' },
  9:  { jalan: 'validasi/jalan TPST Karangmiri.png',         citra: 'validasi/citra TPST Karangmiri.png',         depan: 'validasi/depan TPST Karangmiri.png' },
  10: { jalan: 'validasi/jalan TPS Pengok.png',              citra: 'validasi/citra TPS Pengok.png',              depan: 'validasi/depan TPS Pengok.png' },

  // ── ID 11–15 ──
  // depan Nitikan & Bener sudah ada, citra & jalan belum → fallback ke foto sejenis
  11: { jalan: 'validasi/jalan TPS Pengok.png',              citra: 'validasi/citra TPS Pengok.png',              depan: 'validasi/depan TPS Nitikan.png' },
  12: { jalan: 'validasi/jalan TPS Argolubang.png',          citra: 'validasi/citra TPS Argolubang.png',          depan: 'validasi/depan TPS Kelurahan Bener.png' },
  // id 13: Depo Sorosutan — file di folder: 'Depo Sampah Sorosutan.png' (tanpa prefix jalan/citra/depan)
  13: { jalan: 'validasi/jalan Depo TPS Lempuyangan.png',    citra: 'validasi/citra Depo TPS Lempuyangan.png',    depan: 'validasi/Depo Sampah Sorosutan.png' },
  14: { jalan: 'validasi/jalan TPS3R Nitikan 2.png',         citra: 'validasi/citra TPS3R Nitikan 2.png',         depan: 'validasi/depan TPS3R Nitikan 2.png' },
  // id 15: depan Depo Pringgokusuman — file di folder: 'Depo Pringgokusuman.png' (tanpa prefix depan)
  15: { jalan: 'validasi/jalan Depo Pringgokusuman.png',     citra: 'validasi/citra Depo Pringgokusuman.png',     depan: 'validasi/Depo Pringgokusuman.png' },

  // ── ID 16–19 (BARU) ──
  // jalan: .jpg bukan .png — DIPERBAIKI ekstensinya
  // citra & depan belum ada → fallback ke foto TPS sejenis
  16: { jalan: 'validasi/jalan TPS Sampah Sagan.jpg',        citra: 'validasi/citra TPS Argolubang.png',          depan: 'validasi/depan TPS Kotagede.png' },
  17: { jalan: 'validasi/jalan TPS Mandala Krida.jpg',       citra: 'validasi/citra TPS Pengok.png',              depan: 'validasi/depan TPS Pengok.png' },
  18: { jalan: 'validasi/jalan TPS Argolubang.png',          citra: 'validasi/citra TPS Umum Patangpuluhan.png',  depan: 'validasi/depan TPS Kotagede.png' },
  19: { jalan: 'validasi/jalan TPS Taman Sari.jpg',          citra: 'validasi/citra TPS THR Keparakan.png',       depan: 'validasi/depan TPS THR Keparakan.png' },
};

const typeColors = { TPA: '#ef4444', TPS: '#f59e0b', TPST: '#3b82f6', TPS3R: '#8b5cf6', Depo: '#22c55e' };
const typeIcons  = { TPA: '🏔️', TPS: '🗑️', TPST: '♻️', TPS3R: '🔁', Depo: '🚛' };
const ALL_FACILITY_TYPES = Object.freeze(['TPA', 'TPS', 'TPST', 'TPS3R', 'Depo']);

const projectMeta = {
  title: 'WebGIS Persebaran TPS/TPA dan Analisis Zona Dampak Berbasis Buffer di Kota Yogyakarta',
  dataSource: 'Titik TPS/TPA: kompilasi Google Maps. Layer administrasi, jalan, dan sungai memakai data SHP RBI 25K yang sudah dikonversi ke GeoJSON.',
  scopeNote: 'Analisis tetap bersifat latihan/WebGIS akademik; validasi akhir perlu data resmi terbaru dan/atau survei lapangan.',
};

// ===== DATA SHP RBI 25K YANG DIKONVERSI KE GEOJSON =====
// File GeoJSON ada di folder /data. Jika fetch gagal, sistem tetap memakai data indikatif bawaan.
const rbiGeojsonUrls = {
  admin: 'data/administrasi_ln_25k.geojson',
  road: 'data/jalan_ln_25k.geojson',
  river: 'data/sungai_ln_25k.geojson',
};

let rbiAdminData = null;
let rbiRoadData = null;
let rbiRiverData = null;
let rbiDataLoaded = false;

// ===== GEOJSON INDIKATIF / SIMULASI =====
const adminBoundary = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: 'Batas indikatif Kota Yogyakarta' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [110.341, -7.760], [110.414, -7.760], [110.421, -7.796],
        [110.408, -7.852], [110.351, -7.858], [110.335, -7.822],
        [110.341, -7.760]
      ]]
    }
  }]
};

const riverData = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { name: 'Sungai Winongo (indikatif)' }, geometry: { type: 'LineString', coordinates: [[110.348, -7.765], [110.349, -7.790], [110.347, -7.815], [110.344, -7.850]] } },
    { type: 'Feature', properties: { name: 'Sungai Code (indikatif)' }, geometry: { type: 'LineString', coordinates: [[110.372, -7.762], [110.371, -7.787], [110.370, -7.810], [110.368, -7.848]] } },
    { type: 'Feature', properties: { name: 'Sungai Gajah Wong (indikatif)' }, geometry: { type: 'LineString', coordinates: [[110.394, -7.762], [110.392, -7.790], [110.395, -7.820], [110.397, -7.850]] } },
  ]
};

const roadData = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: { name: 'Koridor Malioboro - Mangkubumi (indikatif)' }, geometry: { type: 'LineString', coordinates: [[110.365, -7.783], [110.366, -7.792], [110.367, -7.802]] } },
    { type: 'Feature', properties: { name: 'Koridor Selatan Kota (indikatif)' }, geometry: { type: 'LineString', coordinates: [[110.342, -7.818], [110.365, -7.817], [110.392, -7.818], [110.410, -7.821]] } },
    { type: 'Feature', properties: { name: 'Koridor Timur-Barat Tengah (indikatif)' }, geometry: { type: 'LineString', coordinates: [[110.342, -7.795], [110.365, -7.795], [110.386, -7.796], [110.410, -7.799]] } },
    { type: 'Feature', properties: { name: 'Koridor Utara Kota (indikatif)' }, geometry: { type: 'LineString', coordinates: [[110.346, -7.777], [110.370, -7.776], [110.395, -7.778]] } },
  ]
};

const densityData = {
  type: 'FeatureCollection',
  features: [
    polygonFeature('Zona Padat Barat', 'Tinggi', 18500, [[110.338, -7.786], [110.361, -7.786], [110.361, -7.826], [110.338, -7.826], [110.338, -7.786]]),
    polygonFeature('Zona Padat Tengah', 'Tinggi', 22000, [[110.361, -7.780], [110.381, -7.780], [110.381, -7.822], [110.361, -7.822], [110.361, -7.780]]),
    polygonFeature('Zona Padat Timur', 'Tinggi', 19700, [[110.381, -7.786], [110.409, -7.786], [110.409, -7.828], [110.381, -7.828], [110.381, -7.786]]),
    polygonFeature('Zona Utara', 'Sedang', 12500, [[110.342, -7.760], [110.402, -7.760], [110.402, -7.786], [110.342, -7.786], [110.342, -7.760]]),
    polygonFeature('Zona Selatan', 'Sedang', 11000, [[110.344, -7.826], [110.410, -7.826], [110.410, -7.858], [110.344, -7.858], [110.344, -7.826]]),
  ]
};

// Layer visual kepadatan memakai titik kecamatan dari file data_penduduk_jogja.xlsx.
// Karena data yang tersedia adalah tabel kepadatan tanpa batas polygon kecamatan,
// visual dibuat sebagai zona lingkaran proporsional per kecamatan, bukan kotak besar.
const densityVisualData = {
  type: 'FeatureCollection',
  features: [
    densityPoint('Mantrijeron', 'Sedang', 13256, 110.3560, -7.8190),
    densityPoint('Kraton', 'Padat', 15468, 110.3638, -7.8086),
    densityPoint('Mergangsan', 'Sedang', 13804, 110.3735, -7.8170),
    densityPoint('Umbulharjo', 'Rendah', 8735, 110.3895, -7.8140),
    densityPoint('Kotagede', 'Sedang', 12000, 110.3990, -7.8260),
    densityPoint('Gondokusuman', 'Sedang', 10854, 110.3780, -7.7838),
    densityPoint('Danurejan', 'Padat Tinggi', 19022, 110.3734, -7.7915),
    densityPoint('Pakualaman', 'Padat', 16279, 110.3773, -7.8022),
    densityPoint('Gondomanan', 'Sedang', 12691, 110.3658, -7.8018),
    densityPoint('Ngampilan', 'Sangat Padat', 21237, 110.3555, -7.8027),
    densityPoint('Wirobrajan', 'Padat', 15910, 110.3505, -7.8076),
    densityPoint('Gedongtengen', 'Padat Tinggi', 19258, 110.3615, -7.7890),
    densityPoint('Jetis', 'Padat', 15693, 110.3664, -7.7760),
    densityPoint('Tegalrejo', 'Sedang', 12642, 110.3540, -7.7820),
  ]
};

const settlementData = {
  type: 'FeatureCollection',
  features: [
    polygonFeature('Permukiman Barat', 'Permukiman', 0, [[110.342, -7.790], [110.358, -7.790], [110.358, -7.818], [110.342, -7.818], [110.342, -7.790]]),
    polygonFeature('Permukiman Tengah', 'Permukiman', 0, [[110.364, -7.787], [110.381, -7.787], [110.381, -7.816], [110.364, -7.816], [110.364, -7.787]]),
    polygonFeature('Permukiman Timur', 'Permukiman', 0, [[110.387, -7.792], [110.407, -7.792], [110.407, -7.823], [110.387, -7.823], [110.387, -7.792]]),
    polygonFeature('Permukiman Selatan', 'Permukiman', 0, [[110.356, -7.826], [110.395, -7.826], [110.395, -7.850], [110.356, -7.850], [110.356, -7.826]]),
  ]
};

const recommendationData = {
  type: 'FeatureCollection',
  features: [
    pointFeature('Kandidat TPS Baru A', 110.356, -7.807, 'Wilayah padat di sisi barat yang perlu peningkatan cakupan layanan.', 'Prioritas Tinggi'),
    pointFeature('Kandidat TPS Baru B', 110.386, -7.803, 'Wilayah tengah-timur dengan akses jalan dan kepadatan tinggi.', 'Prioritas Sedang'),
    pointFeature('Kandidat TPS Baru C', 110.400, -7.835, 'Wilayah selatan-timur yang relatif jauh dari beberapa fasilitas eksisting.', 'Prioritas Sedang'),
    pointFeature('Kandidat TPS Baru D', 110.353, -7.842, 'Wilayah selatan-barat sebagai alternatif pelayanan area permukiman.', 'Prioritas Sedang'),
  ]
};

function polygonFeature(name, density, value, ring) {
  return { type: 'Feature', properties: { name, density, value }, geometry: { type: 'Polygon', coordinates: [ring] } };
}
function densityPoint(name, densityClass, value, lng, lat) {
  return { type: 'Feature', properties: { name, density: densityClass, value }, geometry: { type: 'Point', coordinates: [lng, lat] } };
}
function pointFeature(name, lng, lat, reason, priority) {
  return { type: 'Feature', properties: { name, reason, priority }, geometry: { type: 'Point', coordinates: [lng, lat] } };
}

// Footprint bangunan indikatif. Ini bukan data bangunan resmi, tapi dibuat sebagai layer visual
// agar toggle Permukiman tampak seperti kumpulan rumah/bangunan, bukan kotak besar.
// Layer ini juga jadi backup jika vector building dari Mapbox tidak muncul pada zoom tertentu.
const settlementFootprintData = generateSettlementFootprints(settlementData);

function generateSettlementFootprints(collection) {
  const features = [];
  collection.features.forEach((area, areaIndex) => {
    const ring = area.geometry.coordinates[0];
    const xs = ring.map(c => c[0]);
    const ys = ring.map(c => c[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const stepX = 0.00115;
    const stepY = 0.00082;
    for (let x = minX + 0.00035; x < maxX - 0.00035; x += stepX) {
      for (let y = minY + 0.00025; y < maxY - 0.00025; y += stepY) {
        const h = seededHash(`${areaIndex}-${Math.round(x * 1e6)}-${Math.round(y * 1e6)}`);
        if (h < 0.28) continue;
        const cx = x + (seededHash(`x-${x}-${y}`) - 0.5) * 0.00032;
        const cy = y + (seededHash(`y-${x}-${y}`) - 0.5) * 0.00022;
        const pt = turf.point([cx, cy]);
        if (!turf.booleanPointInPolygon(pt, area)) continue;
        const w = 0.00022 + seededHash(`w-${x}-${y}`) * 0.00019;
        const hh = 0.00016 + seededHash(`h-${x}-${y}`) * 0.00014;
        const poly = [[
          [cx - w/2, cy - hh/2], [cx + w/2, cy - hh/2], [cx + w/2, cy + hh/2],
          [cx - w/2, cy + hh/2], [cx - w/2, cy - hh/2]
        ]];
        features.push({
          type: 'Feature',
          properties: { name: area.properties.name, jenis: 'Footprint permukiman indikatif' },
          geometry: { type: 'Polygon', coordinates: poly }
        });
      }
    }
  });
  return { type: 'FeatureCollection', features };
}

function seededHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

// ===== MAPBOX TOKEN =====
// Gunakan Mapbox public token. Batasi domain token saat deploy publik.
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
map.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-left');
// GeolocateControl di bottom-right (di bawah NavigationControl, tidak ditimpa quick-action-panel)
const geolocateCtrl = new mapboxgl.GeolocateControl({
  positionOptions: { enableHighAccuracy: true },
  trackUserLocation: true,
  showUserHeading: true,
  showAccuracyCircle: true,
});
map.addControl(geolocateCtrl, 'bottom-right');

// ===== STATE =====
const markers = [];
let activePopup = null;
let floatingValidationPopup = null;
let bufferVisible = false;
let serviceVisible = false;
let clickAnalysisMode = false;
let lastAnalysis = null;
let analysisMarker = null;
let styleReady = false;

const validationDrawer = document.getElementById('validationDrawer');
const validationDrawerBackdrop = document.getElementById('validationDrawerBackdrop');
const validationDrawerContent = document.getElementById('validationDrawerContent');
const validationDrawerBadge = document.getElementById('validationDrawerBadge');
const validationDrawerClose = document.getElementById('validationDrawerClose');
const mapContainerWrap = document.querySelector('.map-container-wrap');

const gameState = {
  active: false,
  round: 0,
  maxRounds: 3,
  totalScore: 0,
  bestScore: 0,
};

const mapLoading = document.getElementById('mapLoading');

map.on('load', async () => {
  styleReady = true;
  await loadRbiGeojsonData();
  initialiseMapContent();
  setTimeout(() => {
    if (mapLoading) {
      mapLoading.classList.add('hidden');
      setTimeout(() => { mapLoading.style.display = 'none'; }, 600);
    }
  }, 800);
});

map.on('style.load', () => {
  // Terpanggil saat ganti basemap. Semua layer custom perlu dipasang lagi,
  // karena Mapbox membuang source/layer saat style berubah. Komputer drama.
  if (!styleReady) return;
  addSupportLayers();
  addRecommendationInteractions();
  addSettlementInteractions();
  if (bufferVisible) addImpactBufferLayers(getActiveFilters());
  if (serviceVisible) updateServiceBuffer();
  if (lastAnalysis) drawAnalysisPoint(lastAnalysis.lng, lastAnalysis.lat);
});

async function loadRbiGeojsonData() {
  async function loadOne(key, fallback, label) {
    try {
      const response = await fetch(rbiGeojsonUrls[key]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.info(`${label} berhasil dimuat:`, data.features?.length || 0, 'fitur');
      return data;
    } catch (error) {
      console.warn(`${label} gagal dimuat. Memakai data fallback bawaan.`, error);
      return fallback;
    }
  }

  rbiAdminData = await loadOne('admin', adminBoundary, 'Administrasi RBI 25K');
  rbiRoadData = await loadOne('road', roadData, 'Jalan RBI 25K');
  rbiRiverData = await loadOne('river', riverData, 'Sungai RBI 25K');
  rbiDataLoaded = true;
}

function initialiseMapContent() {
  addSupportLayers();
  addMarkers(ALL_FACILITY_TYPES);
  addRecommendationInteractions();
  addSettlementInteractions();
  addRbiLayerInteractions();
  updateDashboard();
}

// ===== UTIL MAP LAYER =====
function getFirstSymbolLayerId() {
  const layers = map.getStyle()?.layers || [];
  const symbolLayer = layers.find(layer => layer.type === 'symbol' && layer.layout && layer.layout['text-field']);
  return symbolLayer ? symbolLayer.id : undefined;
}

function addMapLayer(layerConfig) {
  const beforeId = getFirstSymbolLayerId();
  if (beforeId && map.getLayer(beforeId)) map.addLayer(layerConfig, beforeId);
  else map.addLayer(layerConfig);
}

function addSourceIfMissing(id, data) {
  if (!map.getSource(id)) map.addSource(id, { type: 'geojson', data });
  else map.getSource(id).setData(data);
}

function addLayerIfMissing(layer) {
  if (!map.getLayer(layer.id)) addMapLayer(layer);
}

function setLayersVisibility(layerIds, visible) {
  layerIds.forEach(id => {
    if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
  });
}

function removeLayersAndSources(layerIds, sourceIds) {
  layerIds.forEach(id => { if (map.getLayer(id)) map.removeLayer(id); });
  sourceIds.forEach(id => { if (map.getSource(id)) map.removeSource(id); });
}

// ===== SUPPORT LAYERS =====
const supportLayerMap = {
  admin: ['admin-line-rbi'],
  density: ['density-heat', 'density-circle', 'density-label'],
  settlement: ['settlement-footprint-fill', 'settlement-footprint-outline', 'native-building-fill', 'native-building-outline'],
  river: ['river-rbi-line', 'river-rbi-label'],
  road: ['road-rbi-line'],
  recommendation: ['recommendation-circle', 'recommendation-label'],
};

function addSupportLayers() {
  addAdminLayer();
  addDensityLayer();
  addSettlementLayer();
  addRiverLayer();
  addRoadLayer();
  addRecommendationLayer();
  ensureDensityLegend();
  applySupportLayerVisibility();
}

function addAdminLayer() {
  const data = rbiAdminData || adminBoundary;
  addSourceIfMissing('admin-rbi-source', data);
  addLayerIfMissing({
    id: 'admin-line-rbi',
    type: 'line',
    source: 'admin-rbi-source',
    paint: {
      'line-color': '#22c55e',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.2, 14, 2.2, 17, 3.2],
      'line-opacity': 0.9,
      'line-dasharray': [2, 2]
    }
  });
}

function addDensityLayer() {
  // Source polygon tetap dipakai untuk analisis booleanPointInPolygon.
  // Layer visualnya diganti menjadi titik/heatmap supaya tidak menutup peta seperti kotak besar.
  addSourceIfMissing('density-analysis-source', densityData);
  addSourceIfMissing('density-point-source', densityVisualData);

  addLayerIfMissing({
    id: 'density-heat',
    type: 'heatmap',
    source: 'density-point-source',
    maxzoom: 15,
    paint: {
      'heatmap-weight': ['interpolate', ['linear'], ['get', 'value'], 8000, 0.25, 12000, 0.45, 15000, 0.68, 20000, 1],
      'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 10, 0.7, 14, 1.25],
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 10, 22, 14, 48],
      'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 10, 0.16, 14, 0.12, 15, 0],
      'heatmap-color': [
        'interpolate', ['linear'], ['heatmap-density'],
        0, 'rgba(34,197,94,0)',
        0.18, 'rgba(34,197,94,0.38)',
        0.40, 'rgba(234,179,8,0.42)',
        0.65, 'rgba(249,115,22,0.48)',
        0.88, 'rgba(239,68,68,0.56)'
      ]
    }
  });

  addLayerIfMissing({
    id: 'density-circle',
    type: 'circle',
    source: 'density-point-source',
    minzoom: 12,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['get', 'value'], 8000, 10, 12000, 13, 15000, 16, 18000, 20, 22000, 24],
      'circle-color': ['interpolate', ['linear'], ['get', 'value'], 8000, '#22c55e', 12000, '#84cc16', 15000, '#facc15', 18000, '#f97316', 22000, '#ef4444'],
      'circle-opacity': 0.24,
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 1.2,
      'circle-stroke-opacity': 0.85
    }
  });

  addLayerIfMissing({
    id: 'density-label',
    type: 'symbol',
    source: 'density-point-source',
    minzoom: 13,
    layout: {
      'text-field': ['concat', ['get', 'density'], '\n', ['to-string', ['get', 'value']], ' jiwa/km²'],
      'text-size': 9,
      'text-allow-overlap': false,
      'text-offset': [0, 1.2]
    },
    paint: {
      'text-color': '#111827',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1.25
    }
  });

  ensureDensityLegend();
}


function addSettlementLayer() {
  // 1) Layer footprint lokal: selalu muncul, sehingga checkbox Permukiman pasti ada efeknya.
  addSourceIfMissing('settlement-footprint-source', settlementFootprintData);
  addLayerIfMissing({
    id: 'settlement-footprint-fill', type: 'fill', source: 'settlement-footprint-source',
    paint: { 'fill-color': '#a855f7', 'fill-opacity': 0.20 }
  });
  addLayerIfMissing({
    id: 'settlement-footprint-outline', type: 'line', source: 'settlement-footprint-source',
    paint: { 'line-color': '#f5d0fe', 'line-width': 0.55, 'line-opacity': 0.55 }
  });

  // 2) Layer building Mapbox: kalau tersedia, ikut memperkuat bentuk rumah/bangunan di basemap.
  // Beberapa zoom/style tidak selalu menampilkan fitur building, jadi jangan mengandalkan ini sendirian.
  if (map.getSource('composite')) {
    addLayerIfMissing({
      id: 'native-building-fill', type: 'fill', source: 'composite', 'source-layer': 'building', minzoom: 13,
      paint: {
        'fill-color': '#7e22ce',
        'fill-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0.12, 15, 0.24, 17, 0.42]
      }
    });
    addLayerIfMissing({
      id: 'native-building-outline', type: 'line', source: 'composite', 'source-layer': 'building', minzoom: 13,
      paint: {
        'line-color': '#f5d0fe',
        'line-width': ['interpolate', ['linear'], ['zoom'], 13, 0.35, 15, 0.7, 17, 1.1],
        'line-opacity': 0.85
      }
    });
  }
}

function addRiverLayer() {
  const data = rbiRiverData || riverData;
  addSourceIfMissing('river-rbi-source', data);
  addLayerIfMissing({
    id: 'river-rbi-line',
    type: 'line',
    source: 'river-rbi-source',
    paint: {
      'line-color': '#38bdf8',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.4, 14, 2.8, 17, 5.2],
      'line-opacity': 0.92
    }
  });
  addLayerIfMissing({
    id: 'river-rbi-label',
    type: 'symbol',
    source: 'river-rbi-source',
    minzoom: 13,
    layout: {
      'symbol-placement': 'line',
      'text-field': ['coalesce', ['get', 'NAMOBJ'], ['get', 'NAMWS'], ['get', 'NAMDAS'], ['get', 'REMARK'], 'Sungai'],
      'text-size': 11,
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'map'
    },
    paint: { 'text-color': '#075985', 'text-halo-color': '#e0f2fe', 'text-halo-width': 1 }
  });
}

function addRoadLayer() {
  const data = rbiRoadData || roadData;
  addSourceIfMissing('road-rbi-source', data);
  addLayerIfMissing({
    id: 'road-rbi-line',
    type: 'line',
    source: 'road-rbi-source',
    filter: ['match', ['get', 'REMARK'], ['Jalan Arteri', 'Jalan Kolektor'], true, false],
    paint: {
      'line-color': [
        'match', ['get', 'REMARK'],
        'Jalan Arteri', '#f97316',
        'Jalan Kolektor', '#eab308',
        'Jalan Lokal', '#facc15',
        'Jalan Lain', '#fde047',
        '#fef08a'
      ],
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.9, 13, 1.5, 15, 2.8, 17, 4.2],
      'line-opacity': 0.58
    }
  });
}

function addRecommendationLayer() {
  addSourceIfMissing('recommendation-source', recommendationData);
  addLayerIfMissing({
    id: 'recommendation-circle', type: 'circle', source: 'recommendation-source',
    paint: {
      'circle-radius': 9,
      'circle-color': '#a855f7',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 2,
      'circle-opacity': 0.9
    }
  });
  addLayerIfMissing({
    id: 'recommendation-label', type: 'symbol', source: 'recommendation-source',
    layout: { 'text-field': '⭐', 'text-size': 14, 'text-offset': [0, 0], 'text-allow-overlap': true },
    paint: { 'text-color': '#ffffff' }
  });
}


function ensureDensityLegend() {
  if (document.getElementById('densityLegend')) return;
  const host = document.querySelector('.map-container-wrap');
  if (!host) return;
  const legend = document.createElement('div');
  legend.id = 'densityLegend';
  legend.className = 'density-legend hidden';
  legend.innerHTML = `
    <div class="density-legend-title"><i class="fas fa-chart-column"></i> Kepadatan Penduduk</div>
    <div class="density-legend-row"><span style="background:#22c55e"></span><b>&lt; 10.000</b><small>Rendah</small></div>
    <div class="density-legend-row"><span style="background:#84cc16"></span><b>10.000–14.999</b><small>Sedang</small></div>
    <div class="density-legend-row"><span style="background:#facc15"></span><b>15.000–17.999</b><small>Padat</small></div>
    <div class="density-legend-row"><span style="background:#f97316"></span><b>18.000–19.999</b><small>Padat tinggi</small></div>
    <div class="density-legend-row"><span style="background:#ef4444"></span><b>≥ 20.000</b><small>Sangat padat</small></div>
    <div class="density-legend-note">Satuan: jiwa/km² · sumber: data_penduduk_jogja.xlsx · lingkaran = representasi kecamatan</div>
  `;
  host.appendChild(legend);
}

function updateDensityLegendVisibility() {
  const legend = document.getElementById('densityLegend');
  const cb = document.querySelector('.support-layer-cb[value="density"]');
  if (legend && cb) legend.classList.toggle('hidden', !cb.checked);
}

function applySupportLayerVisibility() {
  document.querySelectorAll('.support-layer-cb').forEach(cb => {
    setLayersVisibility(supportLayerMap[cb.value] || [], cb.checked);
  });
  updateDensityLegendVisibility();
}

let recommendationInteractionsAdded = false;
function addRecommendationInteractions() {
  if (recommendationInteractionsAdded) return;
  recommendationInteractionsAdded = true;

  map.on('click', 'recommendation-circle', e => {
    const f = e.features?.[0];
    if (!f) return;
    const [lng, lat] = f.geometry.coordinates;
    const props = f.properties || {};
    const analysis = analyzeLocation(lng, lat, false);
    showPopup(lng, lat, `
      <div class="popup-inner">
        <span class="popup-type-badge popup-type-rec">⭐ ${escapeHtml(props.priority || 'Kandidat')}</span>
        <div class="popup-name">${escapeHtml(props.name || 'Kandidat TPS Baru')}</div>
        <div class="popup-desc">${escapeHtml(props.reason || '-')}</div>
        <div class="popup-divider"></div>
        <div class="popup-desc"><strong>TPS terdekat:</strong> ${escapeHtml(analysis.nearestName)} (${formatMeters(analysis.nearestDistanceM)})</div>
        <div class="popup-desc"><strong>Skor prioritas:</strong> ${analysis.priorityScore}/100</div>
      </div>
    `);
  });

  map.on('mouseenter', 'recommendation-circle', () => { map.getCanvas().style.cursor = 'pointer'; });
  map.on('mouseleave', 'recommendation-circle', () => { map.getCanvas().style.cursor = ''; });
}

let settlementInteractionsAdded = false;
function addSettlementInteractions() {
  if (settlementInteractionsAdded) return;
  settlementInteractionsAdded = true;
  map.on('click', 'settlement-footprint-fill', e => {
    const f = e.features?.[0];
    const lngLat = e.lngLat;
    const props = f?.properties || {};
    const analysis = analyzeLocation(lngLat.lng, lngLat.lat, false);
    showPopup(lngLat.lng, lngLat.lat, `
      <div class="popup-inner">
        <span class="popup-type-badge popup-type-analysis">🏘️ Permukiman</span>
        <div class="popup-name">${escapeHtml(props.name || 'Footprint permukiman')}</div>
        <div class="popup-desc">Layer ini menunjukkan kumpulan footprint bangunan/rumah indikatif. Klik lokasi ini bisa dipakai untuk cek layanan TPS.</div>
        <div class="popup-divider"></div>
        <div class="popup-desc"><strong>TPS/TPA terdekat:</strong> ${escapeHtml(analysis.nearestName)} (${formatMeters(analysis.nearestDistanceM)})</div>
        <div class="popup-desc"><strong>Status pelayanan:</strong> ${escapeHtml(analysis.serviceStatus)}</div>
      </div>
    `);
  });
  map.on('mouseenter', 'settlement-footprint-fill', () => { map.getCanvas().style.cursor = 'pointer'; });
  map.on('mouseleave', 'settlement-footprint-fill', () => { map.getCanvas().style.cursor = clickAnalysisMode || gameState.active ? 'crosshair' : ''; });
}

let rbiLayerInteractionsAdded = false;
function addRbiLayerInteractions() {
  if (rbiLayerInteractionsAdded) return;
  rbiLayerInteractionsAdded = true;

  const popupLayer = (layerId, label, icon, titleFields) => {
    if (!map.getLayer(layerId)) return;
    map.on('click', layerId, e => {
      const f = e.features?.[0];
      if (!f) return;
      const props = f.properties || {};
      const title = titleFields.map(field => props[field]).find(Boolean) || label;
      const remark = props.REMARK || props.LCODE || 'Data RBI 25K';
      showPopup(e.lngLat.lng, e.lngLat.lat, `
        <div class="popup-inner">
          <span class="popup-type-badge popup-type-analysis">${icon} ${label}</span>
          <div class="popup-name">${escapeHtml(title)}</div>
          <div class="popup-desc"><strong>Keterangan:</strong> ${escapeHtml(remark)}</div>
          <div class="popup-source">Sumber layer: SHP RBI 25K hasil konversi ke GeoJSON.</div>
        </div>
      `);
    });
    map.on('mouseenter', layerId, () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', layerId, () => { map.getCanvas().style.cursor = clickAnalysisMode || gameState.active ? 'crosshair' : ''; });
  };

  popupLayer('admin-line-rbi', 'Batas Administrasi', '🟢', ['NAMOBJ', 'REMARK']);
  popupLayer('river-rbi-line', 'Sungai', '💧', ['NAMOBJ', 'NAMWS', 'NAMDAS', 'REMARK']);
  popupLayer('road-rbi-line', 'Jalan', '🛣️', ['NAMRJL', 'REMARK']);
}


// ===== MARKERS =====
function addMarkers(filter = ALL_FACILITY_TYPES) {
  markers.forEach(m => m.remove());
  markers.length = 0;

  // Penting: jika filter = [] berarti user memang ingin semua fasilitas disembunyikan.
  // Jangan fallback ke semua tipe, karena itu yang bikin checkbox terasa rusak. Ya, ini dosa lama.
  const activeTypes = Array.isArray(filter) ? filter : ALL_FACILITY_TYPES;
  const visible = tpsData.filter(d => activeTypes.includes(d.type));

  const countEl = document.getElementById('visibleCount');
  if (countEl) countEl.textContent = visible.length;
  const dashCount = document.getElementById('dashFacilityCount');
  if (dashCount) dashCount.textContent = visible.length;

  visible.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.setAttribute('data-type', loc.type);

    const color = typeColors[loc.type] || '#22c55e';
    const icon = typeIcons[loc.type] || '📍';

    el.innerHTML = `
      <div class="marker-pin" style="background:${color}; box-shadow:0 4px 14px ${color}55;">
        <span class="marker-icon">${icon}</span>
      </div>
      <div class="marker-shadow"></div>
    `;

    injectMarkerCSS();

    el.addEventListener('click', () => {
      // Popup validasi dibuat bisa digeser, jadi map tidak perlu dipaksa zoom terlalu dekat.
      // Offset sedikit ke kiri supaya panel validasi punya ruang tampil di layar.
      const targetZoom = Math.max(map.getZoom(), 14.2);
      map.flyTo({
        center: [loc.lng, loc.lat],
        zoom: targetZoom,
        offset: [-230, 0],
        speed: 1.1
      });
      showPopup(loc.lng, loc.lat, popupHTML(loc));
    });

    const marker = new mapboxgl.Marker({ element: el }).setLngLat([loc.lng, loc.lat]).addTo(map);
    markers.push(marker);
  });
}

function injectMarkerCSS() {
  if (document.getElementById('marker-style')) return;
  const s = document.createElement('style');
  s.id = 'marker-style';
  s.textContent = `
    .custom-marker{cursor:pointer}.marker-pin{width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,.7);transition:all .2s ease;position:relative}.custom-marker:hover .marker-pin{transform:rotate(-45deg) scale(1.2)}.marker-icon{transform:rotate(45deg);font-size:16px;line-height:1}.marker-shadow{width:10px;height:6px;background:rgba(0,0,0,.2);border-radius:50%;margin:2px auto 0;filter:blur(2px)}
  `;
  document.head.appendChild(s);
}

function popupHTML(loc) {
  const risk = classifyFacilityRisk(loc);
  const validation = buildValidationInfo(loc, risk);
  return `
    <div class="popup-inner validation-popup">
      <div class="validation-popup-head">
        <div>
          <span class="popup-type-badge popup-type-${loc.type}">${typeIcons[loc.type]} ${loc.type}</span>
          <div class="popup-name">${escapeHtml(loc.name)}</div>
          <div class="popup-coords">📍 ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</div>
          <div class="popup-drag-hint"><i class="fas fa-up-down-left-right"></i> Tahan area atas untuk geser popup</div>
        </div>
        <div class="confidence-pill ${confidenceClass(validation.confidence)}">
          <strong>${validation.confidence}</strong><span>/100</span>
        </div>
      </div>

      <div class="popup-desc">${escapeHtml(loc.desc)}</div>

      <div class="validation-score-box ${confidenceClass(validation.confidence)} compact-popup-score">
        <div>
          <span>Status Validasi Digital</span>
          <strong>${escapeHtml(validation.status)}</strong>
        </div>
        <small>${validation.confidence}/100</small>
      </div>

      <div class="popup-status-op ${validation.statusOperasional === 'Buka' ? 'status-op-buka' : validation.statusOperasional === 'Tutup' ? 'status-op-tutup' : 'status-op-unknown'}">
        <i class="fas ${validation.statusOperasional === 'Buka' ? 'fa-circle-check' : validation.statusOperasional === 'Tutup' ? 'fa-circle-xmark' : 'fa-circle-question'}"></i>
        Status Operasional: <strong>${escapeHtml(validation.statusOperasional)}</strong>
      </div>

      <div class="popup-quick-list">
        <div><span><i class="fas fa-road"></i> Akses jalan</span><strong>${escapeHtml(validation.aksesJalan)}</strong></div>
        <div><span><i class="fas fa-house"></i> Permukiman</span><strong>${escapeHtml(validation.permukiman)}</strong></div>
        <div><span><i class="fas fa-water"></i> Jarak sungai</span><strong>${formatMeters(risk.riverDistanceM)}</strong></div>
        <div><span><i class="fas fa-triangle-exclamation"></i> Risiko</span><strong>${escapeHtml(risk.label)}</strong></div>
        <div><span><i class="fas fa-people-group"></i> Kelurahan</span><strong>${escapeHtml(validation.kelurahan)}</strong></div>
      </div>

      <div class="popup-ext-links">
        <a href="${escapeHtml(validation.googleMapsUrl)}" target="_blank" rel="noopener" class="ext-link-btn gmaps-btn">
          <i class="fas fa-map-marker-alt"></i> Google Maps
        </a>
        <a href="${escapeHtml(validation.googleEarthUrl)}" target="_blank" rel="noopener" class="ext-link-btn gearth-btn">
          <i class="fas fa-globe"></i> Google Earth
        </a>
        ${validation.osmUrl ? `<a href="${escapeHtml(validation.osmUrl)}" target="_blank" rel="noopener" class="ext-link-btn osm-btn"><i class="fas fa-map"></i> OSM</a>` : ''}
      </div>

      <button
        class="btn-lihat-validasi"
        onclick="openValidationDrawerById(${loc.id})"
        type="button"
      >
        <i class="fas fa-folder-open"></i>
        Lihat Dokumentasi Validasi
        <i class="fas fa-arrow-right"></i>
      </button>

      <div class="popup-source compact-source-note">
        Validasi digital berbasis data sekunder. Buka detail untuk melihat sumber, dokumentasi, dan analisis.
      </div>
    </div>
  `;
}

function buildValidationInfo(loc, risk) {
  const meta = validationData[loc.id] || {};
  const confidence = Number.isFinite(meta.confidence)
    ? meta.confidence
    : (risk.label === 'Risiko Tinggi' ? 76 : 86);
  return {
    kelurahan: meta.kelurahan || 'Perlu cek atribut',
    aksesJalan: meta.aksesJalan || 'Perlu cek Street View',
    permukiman: meta.permukiman || (risk.inSettlement ? 'Padat' : 'Sedang'),
    jarakPermukimanM: Number.isFinite(meta.jarakPermukimanM) ? meta.jarakPermukimanM : (risk.inSettlement ? 100 : 250),
    kepadatan: meta.kepadatan || 'Indikatif',
    confidence,
    status: meta.status || (confidence >= 80 ? 'Sangat Valid' : confidence >= 60 ? 'Cukup Valid' : 'Perlu Verifikasi'),
    statusOperasional: meta.statusOperasional || 'Belum ada Informasi',
    catatan: meta.catatan || 'Data masih berbasis validasi digital, bukan survei lapangan langsung.',
    // Link sources dari Excel
    osmUrl: meta.osmUrl || '',
    sumberBerita: meta.sumberBerita || '',
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`,
    streetViewUrl: `https://www.google.com/maps/@${loc.lat},${loc.lng},18z`,
    // Prioritaskan googleEarthUrl dari Excel, fallback ke generated
    googleEarthUrl: meta.googleEarthUrl || `https://earth.google.com/web/search/${loc.lat},${loc.lng}`,
  };
}

function validationRow(icon, label, value) {
  return `
    <div class="validation-row">
      <span><i class="fas ${icon}"></i> ${escapeHtml(label)}</span>
      <strong><i class="fas fa-check"></i> ${escapeHtml(value)}</strong>
    </div>
  `;
}

function confidenceClass(score) {
  if (score >= 80) return 'valid-high';
  if (score >= 60) return 'valid-mid';
  return 'valid-low';
}

function facilityTypeLabel(type) {
  const labels = {
    TPA: 'TPA (Tempat Pembuangan Akhir)',
    TPS: 'TPS (Tempat Penampungan Sementara)',
    TPST: 'TPST (Tempat Pengolahan Sampah Terpadu)',
    Depo: 'Depo/TPS',
    TPS3R: 'TPS3R (Reduce, Reuse, Recycle)'
  };
  return labels[type] || type;
}

function getValidationSummary() {
  const items = tpsData.map(loc => buildValidationInfo(loc, classifyFacilityRisk(loc)));
  const total = items.length;
  const sangatValid = items.filter(i => i.confidence >= 80).length;
  const cukupValid = items.filter(i => i.confidence >= 60 && i.confidence < 80).length;
  const perluVerifikasi = items.filter(i => i.confidence < 60).length;
  return { total, sangatValid, cukupValid, perluVerifikasi };
}

function scoreBreakdown(validation) {
  const base = [
    { label: 'Koordinat Sesuai', max: 20, value: 20 },
    { label: 'Street View Tersedia', max: 20, value: validation.confidence >= 80 ? 20 : 15 },
    { label: 'Akses Jalan Terlihat', max: 20, value: validation.aksesJalan === 'Baik' ? 20 : 15 },
    { label: 'Data Pendukung Tersedia', max: 15, value: 15 },
  ];
  const used = base.reduce((sum, item) => sum + item.value, 0);
  const last = Math.max(0, validation.confidence - used);
  base.push({ label: 'Buffer & Analisis Spasial', max: 25, value: Math.min(25, last || 15) });
  const total = base.reduce((sum, item) => sum + item.value, 0);
  if (total !== validation.confidence) {
    const diff = validation.confidence - total;
    base[base.length - 1].value = Math.max(0, Math.min(base[base.length - 1].max, base[base.length - 1].value + diff));
  }
  return base;
}

function buildValidationStory(loc, validation, risk) {
  const riskText = risk.label === 'Risiko Tinggi'
    ? 'perlu perhatian lebih karena berada dekat zona sensitif'
    : risk.label === 'Risiko Sedang'
    ? 'masih perlu pemantauan rutin'
    : 'memiliki risiko lingkungan yang relatif terkendali';
  return `${loc.name} berada di kawasan ${validation.permukiman.toLowerCase()} dengan akses jalan ${validation.aksesJalan.toLowerCase()}. Berdasarkan validasi digital, lokasi ini ${riskText}.`;
}


function localAssetSrc(path) {
  if (!path) return '';
  return path.split('/').map((part, index) => index === 0 ? part : encodeURIComponent(part)).join('/');
}

function getLocalValidationImages(loc) {
  return validationImageMap[loc.id] || {};
}

function onlineMapPreviewUrl(loc) {
  const padLng = 0.0032;
  const padLat = 0.0024;
  const bbox = `${loc.lng - padLng},${loc.lat - padLat},${loc.lng + padLng},${loc.lat + padLat}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${loc.lat},${loc.lng}`;
}

function validationDocItem({ title, label, icon, localImg, caption, link, previewUrl }) {
  const imgSrc = localAssetSrc(localImg);
  const hasImage = Boolean(localImg);
  const hasPreview = Boolean(previewUrl);

  const sourceHtml = link
    ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener">Buka sumber</a>`
    : `<span class="validation-doc-local-source">Dokumentasi lokal</span>`;

  return `
    <div class="validation-doc-item">
      <div class="validation-doc-thumb ${hasImage ? 'has-image' : hasPreview ? 'has-online-preview' : ''}">
        ${
          hasImage
            ? `<img src="${imgSrc}" alt="${escapeHtml(title)} ${escapeHtml(label)}" loading="lazy" onerror="this.closest('.validation-doc-thumb').classList.remove('has-image');this.closest('.validation-doc-thumb').innerHTML='<i class=&quot;fas ${icon}&quot;></i><span class=&quot;validation-doc-overlay&quot;>${escapeHtml(label)}</span>';">`
            : hasPreview
              ? `<iframe src="${previewUrl}" loading="lazy" title="Preview peta ${escapeHtml(title)}"></iframe>`
              : `<i class="fas ${icon}"></i>`
        }
        <span class="validation-doc-overlay">${escapeHtml(label)}</span>
      </div>

      <div class="validation-doc-caption">
        ${escapeHtml(caption)}
        <br>
        ${sourceHtml}
      </div>
    </div> 
  `;
}


function bindValidationDrawerTabs() {
  if (!validationDrawerContent) return;
  const tabButtons = validationDrawerContent.querySelectorAll('.validation-step-tab');
  const panels = validationDrawerContent.querySelectorAll('.validation-step-panel');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.validationTab;
      tabButtons.forEach((item) => item.classList.remove('active'));
      panels.forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      validationDrawerContent
        .querySelector(`[data-validation-panel="${target}"]`)
        ?.classList.add('active');
    });
  });
}

function renderValidationDrawer(loc) {
  const risk = classifyFacilityRisk(loc);
  const validation = buildValidationInfo(loc, risk);
  const breakdown = scoreBreakdown(validation);
  const statusIcon = validation.confidence >= 80 ? 'fa-circle-check' : validation.confidence >= 60 ? 'fa-triangle-exclamation' : 'fa-circle-xmark';
  const densityValue = validation.kepadatan || 'Indikatif';
  const nearestSettlement = `± ${formatMeters(validation.jarakPermukimanM)}`;
  const storyText = buildValidationStory(loc, validation, risk);
  const localDocs = getLocalValidationImages(loc);
  const mapPreview = onlineMapPreviewUrl(loc);

  validationDrawerBadge.textContent = `Profil TPS – ${loc.name}`;

  validationDrawerContent.innerHTML = `
    <div class="validation-step-shell">
      <nav class="validation-step-tabs" aria-label="Menu profil validasi TPS">
        <button class="validation-step-tab active" type="button" data-validation-tab="profil">
          <i class="fas fa-location-dot"></i><span>Profil</span>
        </button>
        <button class="validation-step-tab" type="button" data-validation-tab="validasi">
          <i class="fas fa-circle-check"></i><span>Validasi</span>
        </button>
        <button class="validation-step-tab" type="button" data-validation-tab="dokumentasi">
          <i class="fas fa-images"></i><span>Dokumentasi</span>
        </button>
        <button class="validation-step-tab" type="button" data-validation-tab="analisis">
          <i class="fas fa-chart-line"></i><span>Analisis</span>
        </button>
      </nav>

      <div class="validation-step-panels">
        <section class="validation-step-panel active" data-validation-panel="profil">
          <div class="validation-compact-grid validation-compact-grid-3">
            <article class="validation-section-card">
              <h3>Informasi Lokasi</h3>
              <div class="validation-info-list">
  <div class="validation-info-item"><span>Nama</span><strong>${escapeHtml(loc.name)}</strong></div>
  <div class="validation-info-item"><span>Jenis</span><strong>${escapeHtml(facilityTypeLabel(loc.type))}</strong></div>

  <div class="validation-info-item">
    <span>Status Operasional</span>
    <strong class="${validation.statusOperasional === 'Buka' ? 'status-buka' : validation.statusOperasional === 'Tutup' ? 'status-tutup' : 'status-cek'}">
      ${escapeHtml(validation.statusOperasional)}
    </strong>
  </div>

  <div class="validation-info-item"><span>Kelurahan</span><strong>${escapeHtml(validation.kelurahan)}</strong></div>
  <div class="validation-info-item"><span>Koordinat</span><strong>${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}</strong></div>
</div>
            </article>

            <article class="validation-section-card">
              <h3>Kondisi Sekitar</h3>
              <div class="validation-condition-list compact">
                <div class="validation-condition-item"><i class="fas fa-road"></i><div><strong>Akses Jalan</strong><span>${escapeHtml(validation.aksesJalan)}</span></div></div>
                <div class="validation-condition-item"><i class="fas fa-house"></i><div><strong>Permukiman</strong><span>${escapeHtml(validation.permukiman)}</span></div></div>
                <div class="validation-condition-item"><i class="fas fa-people-group"></i><div><strong>Jarak Permukiman</strong><span>${nearestSettlement}</span></div></div>
                <div class="validation-condition-item"><i class="fas fa-triangle-exclamation"></i><div><strong>Risiko Lingkungan</strong><span>${escapeHtml(risk.label)}</span></div></div>
              </div>
            </article>

            <article class="validation-section-card">
              <h3>Confidence Score</h3>
              <div class="validation-score-card-wrap compact-score">
                <div class="validation-score-ring-wrap">
                  <div class="validation-score-ring" style="--score:${validation.confidence}"></div>
                  <div class="validation-score-center"><strong>${validation.confidence}</strong><span>/100</span></div>
                </div>
                <div>
                  <div class="validation-score-title">${escapeHtml(validation.status)}</div>
                  <div class="validation-score-subtext">Validasi digital berdasarkan koordinat, citra, akses jalan, dan analisis spasial awal.</div>
                </div>
              </div>
            </article>
          </div>

          <article class="validation-section-card validation-summary-card">
            <h3>Ringkasan Kondisi</h3>
            <p>${escapeHtml(storyText)}</p>
            <div class="validation-tag-list">
              <span class="validation-tag">BPS</span>
              <span class="validation-tag">Google Maps</span>
              <span class="validation-tag">Street View</span>
              <span class="validation-tag">OSM</span>
              <span class="validation-tag">Google Earth</span>
            </div>
          </article>
        </section>

        <section class="validation-step-panel" data-validation-panel="validasi">
          <div class="validation-compact-grid validation-compact-grid-2">
            <article class="validation-section-card">
              <h3>Validasi & Sumber Data</h3>
              <div class="validation-source-list">
                <div class="validation-source-row"><div class="validation-source-left"><i class="fas fa-location-dot validation-mini-icon-green"></i><div>Koordinat Dicek</div></div><div class="validation-source-ok"><i class="fas fa-check"></i> Valid</div></div>
                <div class="validation-source-row"><div class="validation-source-left"><i class="fas fa-street-view validation-mini-icon-blue"></i><div>Google Street View</div></div><div class="validation-source-ok"><i class="fas fa-check"></i> Cek Manual</div></div>
                <div class="validation-source-row"><div class="validation-source-left"><i class="fas fa-earth-asia validation-mini-icon-emerald"></i><div>Citra Satelit / Google Earth</div></div><div class="validation-source-ok"><i class="fas fa-check"></i> Tersedia</div></div>
                <div class="validation-source-row"><div class="validation-source-left"><i class="fas fa-map validation-mini-icon-slate"></i><div>OpenStreetMap (Jalan & Fasilitas)</div></div><div class="validation-source-ok"><i class="fas fa-check"></i> Tersedia</div></div>
                <div class="validation-source-row"><div class="validation-source-left"><i class="fas fa-users validation-mini-icon-blue"></i><div>Data Kependudukan / Kepadatan</div></div><div class="validation-source-ok"><i class="fas fa-check"></i> Tersedia</div></div>
              </div>
            </article>

            <article class="validation-section-card validation-scale-card">
              <h3>Rincian Penilaian Validasi</h3>
              <div class="validation-score-list">
                ${breakdown.map(item => `
                  <div class="validation-score-row">
                    <div>${escapeHtml(item.label)}</div>
                    <div><strong>${item.value} / ${item.max}</strong></div>
                  </div>
                `).join('')}
              </div>
              <div class="validation-score-total compact-total">
                <span>Total Score</span>
                <strong>${validation.confidence} / 100</strong>
              </div>
              <div class="validation-level"><i class="fas ${statusIcon}"></i> Tingkat Validasi: ${escapeHtml(validation.status)}</div>
            </article>
          </div>
          <article class="validation-section-card validation-note-card">
            <h3>Catatan Metode</h3>
            <p><strong>Virtual Ground Validation (Data Sekunder).</strong> Validasi memakai Google Maps, Street View, Google Earth, OSM, dan data pendukung. Survei lapangan tetap disarankan untuk verifikasi akhir.</p>
          </article>
        </section>

        <section class="validation-step-panel" data-validation-panel="dokumentasi">
          <article class="validation-section-card">
            <h3>Dokumentasi Visual</h3>
            <div class="validation-doc-grid validation-doc-grid-wide">
              ${validationDocItem({ title: loc.name, label: 'Street View / Akses Jalan', icon: 'fa-street-view', localImg: localDocs.jalan, caption: localDocs.jalan ? 'Dokumentasi lokal' : 'Preview peta online', link: validation.streetViewUrl, previewUrl: localDocs.jalan ? '' : mapPreview })}
              ${validationDocItem({ title: loc.name, label: 'Citra Satelit / Lingkungan', icon: 'fa-satellite', localImg: localDocs.citra, caption: localDocs.citra ? 'Dokumentasi lokal' : 'Buka Google Earth', link: validation.googleEarthUrl, previewUrl: localDocs.citra ? '' : mapPreview })}
              ${validationDocItem({ title: loc.name, label: 'Tampak Depan Lokasi', icon: 'fa-image', localImg: localDocs.depan, caption: localDocs.depan ? 'Foto tampak depan lokasi' : 'Belum ada dokumentasi lokal', link: '', previewUrl: '' })}
              </div>
          </article>
          <article class="validation-section-card validation-doc-links">
            <h3>Buka Sumber Eksternal</h3>
            <div class="validation-actions compact-actions">
              <a href="${validation.googleMapsUrl}" target="_blank" rel="noopener"><i class="fas fa-map-location-dot"></i> Google Maps</a>
              <a href="${validation.streetViewUrl}" target="_blank" rel="noopener"><i class="fas fa-street-view"></i> Street View Manual</a>
              <a href="${validation.googleEarthUrl}" target="_blank" rel="noopener"><i class="fas fa-earth-asia"></i> Google Earth</a>
            </div>
          </article>
        </section>

        <section class="validation-step-panel" data-validation-panel="analisis">
          <div class="validation-compact-grid validation-compact-grid-2">
            <article class="validation-section-card">
              <h3>Analisis Spasial Awal</h3>
              <div class="validation-condition-list">
                <div class="validation-condition-item"><i class="fas fa-water"></i><div><strong>Jarak ke Sungai Indikatif</strong><span>${formatMeters(risk.riverDistanceM)}</span></div></div>
                <div class="validation-condition-item"><i class="fas fa-people-group"></i><div><strong>Jarak ke Permukiman Terdekat</strong><span>${nearestSettlement}</span></div></div>
                <div class="validation-condition-item"><i class="fas fa-chart-column"></i><div><strong>Kepadatan Penduduk (500 m)</strong><span>${escapeHtml(densityValue)}</span></div></div>
                <div class="validation-condition-item"><i class="fas fa-road"></i><div><strong>Akses Jalan</strong><span>${escapeHtml(validation.aksesJalan)}</span></div></div>
              </div>
            </article>

            <article class="validation-section-card">
              <h3>Interpretasi Cepat</h3>
              <div class="validation-risk-box ${risk.label === 'Risiko Tinggi' ? 'risk-high' : risk.label === 'Risiko Sedang' ? 'risk-mid' : 'risk-low'}">
                <i class="fas fa-triangle-exclamation"></i>
                <div>
                  <strong>${escapeHtml(risk.label)}</strong>
                  <span>${escapeHtml(storyText)}</span>
                </div>
              </div>
              <div class="validation-method-box"><strong>Catatan:</strong><br>Hasil ini bersifat indikatif dan tetap perlu verifikasi lapangan.</div>
            </article>
          </div>
        </section>
      </div>
    </div>
  `;

  bindValidationDrawerTabs();
}

function openValidationDrawer(loc) {
  if (!validationDrawer || !validationDrawerContent) return;

  // Tutup popup validasi kecil yang sedang terbuka
  removeFloatingValidationPopup();

  if (activePopup) {
    activePopup.remove();
    activePopup = null;
  }

  renderValidationDrawer(loc);
  validationDrawer.classList.add('open');
  validationDrawer.setAttribute('aria-hidden', 'false');
  validationDrawerBackdrop?.classList.add('open');
  mapContainerWrap?.classList.add('drawer-open');
}

function closeValidationDrawer() {
  if (!validationDrawer) return;
  validationDrawer.classList.remove('open');
  validationDrawer.setAttribute('aria-hidden', 'true');
  validationDrawerBackdrop?.classList.remove('open');
  mapContainerWrap?.classList.remove('drawer-open');
}

function openValidationDrawerById(id) {
  const loc = tpsData.find(item => item.id === Number(id));
  if (loc) openValidationDrawer(loc);
}
window.openValidationDrawerById = openValidationDrawerById;

validationDrawerClose?.addEventListener('click', closeValidationDrawer);
validationDrawerBackdrop?.addEventListener('click', closeValidationDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeValidationDrawer();
});

function showPopup(lng, lat, html) {
  const isValidationPopup = html.includes('validation-popup');

  // Popup validasi dibuat sebagai panel bebas (bukan popup Mapbox bawaan),
  // jadi posisinya bisa dipindah-pindah tanpa ikut anchor titik peta.
  if (isValidationPopup) {
    showFloatingValidationPopup(lng, lat, html);
    return;
  }

  removeFloatingValidationPopup();
  if (activePopup) activePopup.remove();

  activePopup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    focusAfterOpen: false,
    offset: [0, -18],
    maxWidth: '360px'
  })
    .setLngLat([lng, lat])
    .setHTML(html)
    .addTo(map);
}

function removeFloatingValidationPopup() {
  if (floatingValidationPopup) {
    floatingValidationPopup.remove();
    floatingValidationPopup = null;
  }
}

function showFloatingValidationPopup(lng, lat, html) {
  if (activePopup) {
    activePopup.remove();
    activePopup = null;
  }
  removeFloatingValidationPopup();

  const wrap = document.createElement('div');
  wrap.className = 'floating-validation-popup';
  wrap.innerHTML = `
    <button type="button" class="floating-popup-close" title="Tutup popup"><i class="fas fa-times"></i></button>
    ${html}
  `;

  const host = document.querySelector('.map-container-wrap') || document.body;
  host.appendChild(wrap);
  floatingValidationPopup = wrap;

  const closeBtn = wrap.querySelector('.floating-popup-close');
  closeBtn?.addEventListener('click', removeFloatingValidationPopup);

// Popup selalu muncul di sisi kanan-tengah peta
// supaya tidak tertutup sidebar maupun header.
requestAnimationFrame(() => {
  const hostRect = host.getBoundingClientRect();
  const panelRect = wrap.getBoundingClientRect();

  const gap = 16;
  const rightGap = 22;
  const topAmanDariNavbar = 72;

  const left = Math.max(
    gap,
    hostRect.width - panelRect.width - rightGap
  );

  const maxTop = Math.max(
    topAmanDariNavbar,
    hostRect.height - panelRect.height - gap
  );

  const idealTop = Math.max(
    topAmanDariNavbar,
    (hostRect.height - panelRect.height) / 2 + 40
  );

  const top = Math.min(idealTop, maxTop);

  wrap.style.left = `${left}px`;
  wrap.style.top = `${top}px`;
  wrap.style.right = 'auto';
  wrap.style.bottom = 'auto';
  wrap.style.transform = 'none';
});

  const handle = wrap.querySelector('.validation-popup-head') || wrap;
  makeFloatingPopupDraggable(wrap, handle, host);
}

function makeFloatingPopupDraggable(panel, handle, host) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  function clampPosition(left, top) {
  const hostRect = host.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();

  const gap = 12;
  const minTop = 12;

  const maxLeft = Math.max(
    gap,
    hostRect.width - panelRect.width - gap
  );

  const maxTop = Math.max(
    minTop,
    hostRect.height - panelRect.height - gap
  );

  return {
    left: Math.max(gap, Math.min(left, maxLeft)),
    top: Math.max(minTop, Math.min(top, maxTop))
  };
}

  function onMove(e) {
    if (!dragging) return;
    const next = clampPosition(startLeft + (e.clientX - startX), startTop + (e.clientY - startY));
    panel.style.left = `${next.left}px`;
    panel.style.top = `${next.top}px`;
    panel.style.right = 'auto';
  }

  function stopDrag() {
    if (!dragging) return;
    dragging = false;
    panel.classList.remove('dragging');
    if (map?.dragPan?.enable) map.dragPan.enable();
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', stopDrag);
    document.removeEventListener('pointercancel', stopDrag);
  }

  handle.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, .floating-popup-close')) return;
    e.preventDefault();
    e.stopPropagation();

    const panelRect = panel.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = panelRect.left - hostRect.left;
    startTop = panelRect.top - hostRect.top;
    panel.classList.add('dragging');
    if (map?.dragPan?.disable) map.dragPan.disable();
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('pointercancel', stopDrag);
  });
}

function makeActivePopupDraggable() {
  if (!activePopup || typeof activePopup.getElement !== 'function') return;

  const popupEl = activePopup.getElement();
  const handle = popupEl?.querySelector('.validation-popup-head');
  if (!popupEl || !handle) return;

  popupEl.classList.add('draggable-popup');
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let dragX = 0;
  let dragY = 0;

  function applyDrag() {
    popupEl.style.setProperty('--popup-drag-x', `${dragX}px`);
    popupEl.style.setProperty('--popup-drag-y', `${dragY}px`);
  }

  function stopDrag() {
    if (!dragging) return;
    dragging = false;
    popupEl.classList.remove('dragging');
    if (map?.dragPan?.enable) map.dragPan.enable();
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', stopDrag);
    document.removeEventListener('pointercancel', stopDrag);
  }

  function onMove(e) {
    if (!dragging) return;
    dragX = baseX + (e.clientX - startX);
    dragY = baseY + (e.clientY - startY);
    applyDrag();
  }

  handle.addEventListener('pointerdown', (e) => {
    // Tombol close tetap berfungsi normal.
    if (e.target.closest('.mapboxgl-popup-close-button, a, button')) return;
    e.preventDefault();
    e.stopPropagation();

    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = dragX;
    baseY = dragY;
    popupEl.classList.add('dragging');

    if (map?.dragPan?.disable) map.dragPan.disable();
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('pointercancel', stopDrag);
  });

  // Saat popup ditutup, pastikan mode drag map balik normal.
  activePopup.on('close', stopDrag);
}

// ===== IMPACT BUFFER 100/250/500 =====
function addImpactBufferLayers(filter = ALL_FACILITY_TYPES) {
  removeImpactBufferLayers();
  const activeTypes = Array.isArray(filter) ? filter : ALL_FACILITY_TYPES;
  const visible = tpsData.filter(d => activeTypes.includes(d.type));
  const radii = [500, 250, 100];
  const colors = { 100: '#ef4444', 250: '#f59e0b', 500: '#22c55e' };
  const opacities = { 100: 0.22, 250: 0.16, 500: 0.10 };

  radii.forEach(radius => {
    const features = visible.map(loc => turf.buffer(turf.point([loc.lng, loc.lat], { name: loc.name, type: loc.type }), radius / 1000, { units: 'kilometers', steps: 48 }));
    const data = { type: 'FeatureCollection', features };
    const sourceId = `impact-buffer-${radius}-source`;
    const fillId = `impact-buffer-${radius}-fill`;
    const lineId = `impact-buffer-${radius}-line`;
    addSourceIfMissing(sourceId, data);
    addLayerIfMissing({ id: fillId, type: 'fill', source: sourceId, paint: { 'fill-color': colors[radius], 'fill-opacity': opacities[radius] } });
    addLayerIfMissing({ id: lineId, type: 'line', source: sourceId, paint: { 'line-color': colors[radius], 'line-width': 1.5, 'line-opacity': 0.75 } });
  });
  bufferVisible = true;
}

function removeImpactBufferLayers() {
  removeLayersAndSources(
    ['impact-buffer-100-fill', 'impact-buffer-100-line', 'impact-buffer-250-fill', 'impact-buffer-250-line', 'impact-buffer-500-fill', 'impact-buffer-500-line'],
    ['impact-buffer-100-source', 'impact-buffer-250-source', 'impact-buffer-500-source']
  );
  bufferVisible = false;
}

// ===== SERVICE BUFFER DINAMIS =====
function getServiceRadiusM() {
  const input = document.getElementById('serviceRadius');
  const val = input ? parseInt(input.value, 10) : 500;
  return Number.isFinite(val) ? val : 500;
}

function updateServiceRadiusLabel() {
  const label = document.getElementById('serviceRadiusValue');
  if (label) label.textContent = getServiceRadiusM();
}

function updateServiceBuffer() {
  removeServiceBuffer(false);
  const radiusM = getServiceRadiusM();
  const activeTypes = getActiveFilters();
  const visible = tpsData.filter(d => activeTypes.includes(d.type));
  const features = visible.map(loc => turf.buffer(turf.point([loc.lng, loc.lat], { name: loc.name, type: loc.type }), radiusM / 1000, { units: 'kilometers', steps: 48 }));
  addSourceIfMissing('service-buffer-source', { type: 'FeatureCollection', features });
  addLayerIfMissing({ id: 'service-buffer-fill', type: 'fill', source: 'service-buffer-source', paint: { 'fill-color': '#14b8a6', 'fill-opacity': 0.13 } });
  addLayerIfMissing({ id: 'service-buffer-line', type: 'line', source: 'service-buffer-source', paint: { 'line-color': '#2dd4bf', 'line-width': 1.8, 'line-opacity': 0.9, 'line-dasharray': [2, 1] } });
  serviceVisible = true;
  const btnClear = document.getElementById('btnClearService');
  if (btnClear) btnClear.style.display = 'inline-flex';
  updateDashboard();
}

function removeServiceBuffer(updateBtn = true) {
  removeLayersAndSources(['service-buffer-fill', 'service-buffer-line'], ['service-buffer-source']);
  serviceVisible = false;
  if (updateBtn) {
    const btnClear = document.getElementById('btnClearService');
    if (btnClear) btnClear.style.display = 'none';
  }
}

// ===== SPATIAL ANALYSIS =====
function analyzeLocation(lng, lat, updateUI = true) {
  const point = turf.point([lng, lat]);
  const radiusM = getServiceRadiusM();
  const nearest = getNearestFacility(lng, lat);
  const nearestDistanceM = nearest ? nearest.distanceKm * 1000 : NaN;
  const serviceStatus = classifyService(nearestDistanceM, radiusM);
  const impactStatus = classifyImpact(nearestDistanceM);
  const riverDistanceM = getNearestLineDistanceM(point, rbiRiverData || riverData);
  const roadDistanceM = getNearestLineDistanceM(point, rbiRoadData || roadData);
  const density = getContainingPolygonProps(point, densityData);
  const settlement = getContainingPolygonProps(point, settlementData);
  const insideSettlement = Boolean(settlement);
  const adminInside = Boolean(getContainingPolygonProps(point, adminBoundary));
  const priorityScore = calculatePriorityScore({ serviceStatus, density, riverDistanceM, roadDistanceM, insideSettlement, adminInside });
  const recommendation = buildRecommendationText({ serviceStatus, density, riverDistanceM, roadDistanceM, insideSettlement, adminInside, priorityScore });

  const analysis = {
    lng, lat,
    nearestName: nearest?.name || '-', nearestType: nearest?.type || '-', nearestDistanceM,
    serviceRadiusM: radiusM,
    serviceStatus: serviceStatus.label,
    impactStatus: impactStatus.label,
    impactLevel: impactStatus.level,
    riverDistanceM,
    roadDistanceM,
    densityName: density?.name || 'Tidak diketahui',
    densityClass: density?.density || 'Tidak diketahui',
    densityValue: density?.value || '',
    insideSettlement: insideSettlement ? 'Ya' : 'Tidak',
    adminInside: adminInside ? 'Di dalam batas indikatif' : 'Di luar batas indikatif',
    priorityScore,
    recommendation,
    timestamp: new Date().toLocaleString('id-ID'),
  };

  if (updateUI) {
    lastAnalysis = analysis;
    drawAnalysisPoint(lng, lat);
    renderAnalysisPanel(analysis);
    updateDashboard();
    showPopup(lng, lat, analysisPopupHTML(analysis));
  }
  return analysis;
}

function getNearestFacility(lng, lat) {
  const activeTypes = getActiveFilters();
  const facilities = tpsData.filter(d => activeTypes.includes(d.type));
  if (!facilities.length) return null;
  const from = turf.point([lng, lat]);
  let best = null;
  facilities.forEach(loc => {
    const dist = turf.distance(from, turf.point([loc.lng, loc.lat]), { units: 'kilometers' });
    if (!best || dist < best.distanceKm) best = { ...loc, distanceKm: dist };
  });
  return best;
}

function getNearestLineDistanceM(point, lineCollection) {
  let min = Infinity;
  const features = lineCollection?.features || [];
  features.forEach(line => {
    try {
      const d = turf.pointToLineDistance(point, line, { units: 'kilometers' }) * 1000;
      if (d < min) min = d;
    } catch (err) {
      // Abaikan geometri rusak agar analisis tetap jalan.
    }
  });
  return Number.isFinite(min) ? min : NaN;
}

function getContainingPolygonProps(point, polygonCollection) {
  return polygonCollection.features.find(f => turf.booleanPointInPolygon(point, f))?.properties || null;
}

function classifyService(distanceM, radiusM) {
  if (!Number.isFinite(distanceM)) return { label: 'Tidak dapat dihitung', level: 'unknown' };
  if (distanceM <= radiusM) return { label: 'Terlayani', level: 'good' };
  if (distanceM <= radiusM * 2) return { label: 'Kurang terlayani', level: 'medium' };
  return { label: 'Belum terlayani', level: 'high' };
}

function classifyImpact(distanceM) {
  if (!Number.isFinite(distanceM)) return { label: 'Tidak diketahui', level: 'unknown' };
  if (distanceM <= 100) return { label: 'Risiko tinggi (≤100 m)', level: 'high' };
  if (distanceM <= 250) return { label: 'Risiko sedang (≤250 m)', level: 'medium' };
  if (distanceM <= 500) return { label: 'Risiko rendah (≤500 m)', level: 'low' };
  return { label: 'Di luar zona dampak 500 m', level: 'safe' };
}

function classifyFacilityRisk(loc) {
  const pt = turf.point([loc.lng, loc.lat]);
  const riverDistanceM = getNearestLineDistanceM(pt, rbiRiverData || riverData);
  const inSettlement = Boolean(getContainingPolygonProps(pt, settlementData));
  let label = 'Risiko Rendah';
  if (riverDistanceM <= 100 || inSettlement) label = 'Risiko Tinggi';
  else if (riverDistanceM <= 250) label = 'Risiko Sedang';
  return { label, riverDistanceM, inSettlement };
}

/**
 * Skor jarak dari sungai (bobot 35%)
 * Sumber: Suryadi et al. (2025) ATASI Journal
 * 0-30m=1 (Tidak sesuai), 31-50m=2 (Kurang sesuai), 51-100m=3 (Sesuai), >100m=4 (Sangat sesuai)
 */
function skorSungai(m) {
  if (!Number.isFinite(m) || m <= 0) return 1;
  if (m <= 30)  return 1;
  if (m <= 50)  return 2;
  if (m <= 100) return 3;
  return 4;
}

/**
 * Skor jarak dari jalan (bobot 35%)
 * 0-30m=2 (Kurang sesuai), 31-50m=3 (Sesuai), 51-100m=4 (Sangat sesuai), >100m=1 (Tidak sesuai)
 */
function skorJalan(m) {
  if (!Number.isFinite(m) || m <= 0) return 2;
  if (m <= 30)  return 2;
  if (m <= 50)  return 3;
  if (m <= 100) return 4;
  return 1;
}

/**
 * Skor jarak dari permukiman (bobot 30%)
 * 0-30m=1 (Tidak sesuai), 31-50m=2 (Kurang sesuai), 51-100m=4 (Sangat sesuai), >100m=3 (Sesuai)
 */
function skorPermukiman(m) {
  if (!Number.isFinite(m) || m <= 0) return 1;
  if (m <= 30)  return 1;
  if (m <= 50)  return 2;
  if (m <= 100) return 4;
  return 3;
}

/**
 * Label skor ke kategori kesesuaian lahan
 */
function labelKesesuaian(nilai) {
  if (nilai >= 3.50) return { label: 'Sangat Sesuai', color: '#198754', icon: '✅' };
  if (nilai >= 2.50) return { label: 'Sesuai',        color: '#8BC34A', icon: '✔️' };
  if (nilai >= 1.75) return { label: 'Kurang Sesuai', color: '#FFC107', icon: '⚠️' };
  return             { label: 'Tidak Sesuai',          color: '#DC3545', icon: '❌' };
}

/**
 * Hitung skor kesesuaian lahan kandidat TPS baru
 * Rumus: (SkorSungai×0.35) + (SkorJalan×0.35) + (SkorPermukiman×0.30)
 * Sumber: Suryadi et al. (2025) Optimalisasi Persebaran TPS, ATASI Journal Vol.1 Agustus 2025
 */
function hitungKesesuaianLahan(riverDistanceM, roadDistanceM, settlementDistanceM) {
  const ss = skorSungai(riverDistanceM);
  const sj = skorJalan(roadDistanceM);
  const sp = skorPermukiman(settlementDistanceM);
  const nilai = (ss * 0.35) + (sj * 0.35) + (sp * 0.30);
  return {
    skorSungai: ss,
    skorJalan: sj,
    skorPermukiman: sp,
    nilaiKesesuaian: Number(nilai.toFixed(2)),
    kategori: labelKesesuaian(nilai),
  };
}

function calculatePriorityScore({ serviceStatus, density, riverDistanceM, roadDistanceM, insideSettlement, adminInside }) {
  if (!adminInside) return 0;

  // Hitung jarak permukiman — gunakan insideSettlement sebagai proxy jika tidak ada data
  // (jika di dalam polygon permukiman, anggap jarak = 15m; jika tidak, estimasi dari densitas)
  let settlementDistanceM = NaN;
  if (insideSettlement) {
    settlementDistanceM = 15; // di dalam permukiman → jarak = ~15m (tidak sesuai per jurnal)
  } else if (density?.density === 'Tinggi') {
    settlementDistanceM = 80;  // dekat permukiman padat
  } else if (density?.density === 'Sedang') {
    settlementDistanceM = 150; // agak jauh
  } else {
    settlementDistanceM = 300; // jauh dari permukiman
  }

  const hasil = hitungKesesuaianLahan(riverDistanceM, roadDistanceM, settlementDistanceM);

  // Simpan breakdown ke lastKesesuaian agar bisa ditampilkan di UI
  window._lastKesesuaian = {
    ...hasil,
    riverDistanceM: Number.isFinite(riverDistanceM) ? Math.round(riverDistanceM) : null,
    roadDistanceM:  Number.isFinite(roadDistanceM)  ? Math.round(roadDistanceM)  : null,
    settlementDistanceM: Math.round(settlementDistanceM),
  };

  // Konversi nilai kesesuaian (1–4) ke skor 0–100 untuk kompatibilitas UI lama
  // Nilai 1=tidak sesuai → ~15, nilai 4=sangat sesuai → ~95
  const skorLegacy = Math.round(((hasil.nilaiKesesuaian - 1) / 3) * 80 + 15);
  return Math.max(0, Math.min(100, skorLegacy));
}

function buildRecommendationText({ serviceStatus, density, riverDistanceM, roadDistanceM, insideSettlement, adminInside, priorityScore }) {
  if (!adminInside) return 'Lokasi berada di luar batas indikatif Kota Yogyakarta, sehingga tidak direkomendasikan dalam area kajian.';
  const reasons = [];
  if (serviceStatus.level === 'high') reasons.push('belum terlayani fasilitas TPS/TPA dalam radius yang dipilih');
  if (density?.density === 'Tinggi') reasons.push('berada pada zona kepadatan penduduk tinggi');
  if (riverDistanceM <= 100) reasons.push('terlalu dekat dengan sungai sehingga perlu dihindari');
  else if (riverDistanceM > 250) reasons.push('cukup jauh dari sungai');
  if (roadDistanceM <= 250) reasons.push('dekat akses jalan utama');
  if (insideSettlement) reasons.push('berada di dalam zona permukiman sehingga perlu kajian lapangan lebih lanjut');

  if (priorityScore >= 70) return `Prioritas tinggi untuk dikaji sebagai lokasi TPS baru karena ${reasons.join(', ')}.`;
  if (priorityScore >= 45) return `Prioritas sedang. Lokasi masih perlu verifikasi lapangan karena ${reasons.join(', ')}.`;
  return `Prioritas rendah. ${reasons.length ? `Catatan: ${reasons.join(', ')}.` : 'Tidak banyak indikator yang mendukung lokasi ini.'}`;
}

function drawAnalysisPoint(lng, lat) {
  if (analysisMarker) analysisMarker.remove();
  const el = document.createElement('div');
  el.className = 'analysis-marker';
  el.innerHTML = '<i class="fas fa-location-dot"></i>';
  analysisMarker = new mapboxgl.Marker({ element: el, anchor: 'bottom' }).setLngLat([lng, lat]).addTo(map);
}

function renderAnalysisPanel(a) {
  const status = document.getElementById('analysisStatus');
  const panel = document.getElementById('analysisPanel');
  const btnDownload = document.getElementById('btnDownloadAnalysis');
  if (status) status.textContent = `Analisis terakhir: ${a.timestamp}`;
  if (btnDownload) btnDownload.disabled = false;
  if (!panel) return;
  panel.classList.remove('empty');
  // Switch to pelayanan tab so user sees the result
  if (window.switchTab) window.switchTab('pelayanan');
  panel.innerHTML = `
    <div class="result-badge ${statusClass(a.serviceStatus)}">${escapeHtml(a.serviceStatus)}</div>
    <div class="analysis-row"><span>Koordinat</span><strong>${a.lat.toFixed(6)}, ${a.lng.toFixed(6)}</strong></div>
    <div class="analysis-row"><span>TPS/TPA terdekat</span><strong>${escapeHtml(a.nearestName)} (${escapeHtml(a.nearestType)})</strong></div>
    <div class="analysis-row"><span>Jarak fasilitas</span><strong>${formatMeters(a.nearestDistanceM)}</strong></div>
    <div class="analysis-row"><span>Zona dampak</span><strong>${escapeHtml(a.impactStatus)}</strong></div>
    <div class="analysis-row"><span>Jarak ke sungai</span><strong>${formatMeters(a.riverDistanceM)}</strong></div>
    <div class="analysis-row"><span>Jarak ke jalan</span><strong>${formatMeters(a.roadDistanceM)}</strong></div>
    <div class="analysis-row"><span>Kepadatan</span><strong>${escapeHtml(a.densityClass)} ${a.densityValue ? `(${a.densityValue}/km²)` : ''}</strong></div>
    <div class="analysis-row"><span>Permukiman</span><strong>${escapeHtml(a.insideSettlement)}</strong></div>
    <div class="score-box"><span>Skor Kesesuaian Lahan</span><strong>${window._lastKesesuaian ? window._lastKesesuaian.nilaiKesesuaian + ' / 4.00' : a.priorityScore + '/100'}</strong></div>
    ${window._lastKesesuaian ? `
    <div class="kesesuaian-panel-block">
      <div class="kp-title">📊 Pembobotan Kesesuaian Lahan <small style="font-weight:400;color:rgba(255,255,255,0.5)">(Suryadi et al., 2025)</small></div>
      <div class="kp-badge" style="background:${window._lastKesesuaian.kategori.color}22;color:${window._lastKesesuaian.kategori.color};border:1px solid ${window._lastKesesuaian.kategori.color}55">
        ${window._lastKesesuaian.kategori.icon} ${escapeHtml(window._lastKesesuaian.kategori.label)}
      </div>
      <div class="kp-rows">
        <div class="kp-row"><span>🌊 Sungai (35%)</span><span>${window._lastKesesuaian.riverDistanceM != null ? window._lastKesesuaian.riverDistanceM+'m' : '-'}</span><strong>Skor ${window._lastKesesuaian.skorSungai}</strong></div>
        <div class="kp-row"><span>🛣️ Jalan (35%)</span><span>${window._lastKesesuaian.roadDistanceM != null ? window._lastKesesuaian.roadDistanceM+'m' : '-'}</span><strong>Skor ${window._lastKesesuaian.skorJalan}</strong></div>
        <div class="kp-row"><span>🏘️ Permukiman (30%)</span><span>${window._lastKesesuaian.settlementDistanceM != null ? window._lastKesesuaian.settlementDistanceM+'m' : '-'}</span><strong>Skor ${window._lastKesesuaian.skorPermukiman}</strong></div>
      </div>
    </div>
    ` : ''}
    <div class="recommendation-box">${escapeHtml(a.recommendation)}</div>
  `;
}

function analysisPopupHTML(a) {
  const k = window._lastKesesuaian || {};
  const kat = k.kategori || { label: '-', color: '#666', icon: '?' };
  const labelSkorSungai = ['','Tidak Sesuai','Kurang Sesuai','Sesuai','Sangat Sesuai'];
  const labelSkorJalan = ['','Tidak Sesuai','Kurang Sesuai','Sesuai','Sangat Sesuai'];
  const labelSkorPermukiman = ['','Tidak Sesuai','Kurang Sesuai','Sesuai','Sangat Sesuai'];
  return `
    <div class="popup-inner">
      <span class="popup-type-badge popup-type-analysis">📍 Hasil Cek Lokasi</span>
      <div class="popup-name">Status: ${escapeHtml(a.serviceStatus)}</div>
      <div class="popup-coords">${a.lat.toFixed(6)}, ${a.lng.toFixed(6)}</div>
      <div class="popup-divider"></div>
      <div class="popup-desc"><strong>TPS/TPA terdekat:</strong> ${escapeHtml(a.nearestName)} (${formatMeters(a.nearestDistanceM)})</div>
      <div class="popup-desc"><strong>Zona dampak:</strong> ${escapeHtml(a.impactStatus)}</div>
      <div class="popup-divider"></div>
      <div class="kesesuaian-header">
        <span class="kesesuaian-title">🏅 Kesesuaian Lahan TPS</span>
        <span class="kesesuaian-badge" style="background:${kat.color}22;color:${kat.color};border:1px solid ${kat.color}55">${kat.icon} ${escapeHtml(kat.label)}</span>
      </div>
      <div class="kesesuaian-nilai">Nilai: <strong style="color:${kat.color}">${k.nilaiKesesuaian !== undefined ? k.nilaiKesesuaian : '-'}</strong> / 4.00</div>
      <div class="kesesuaian-rows">
        <div class="kesesuaian-row">
          <span>🌊 Sungai <small>(35%)</small></span>
          <span>${k.riverDistanceM != null ? k.riverDistanceM+'m' : '-'}</span>
          <span class="kes-skor">Skor ${k.skorSungai || '-'} – ${labelSkorSungai[k.skorSungai] || ''}</span>
        </div>
        <div class="kesesuaian-row">
          <span>🛣️ Jalan <small>(35%)</small></span>
          <span>${k.roadDistanceM != null ? k.roadDistanceM+'m' : '-'}</span>
          <span class="kes-skor">Skor ${k.skorJalan || '-'} – ${labelSkorJalan[k.skorJalan] || ''}</span>
        </div>
        <div class="kesesuaian-row">
          <span>🏘️ Permukiman <small>(30%)</small></span>
          <span>${k.settlementDistanceM != null ? k.settlementDistanceM+'m' : '-'}</span>
          <span class="kes-skor">Skor ${k.skorPermukiman || '-'} – ${labelSkorPermukiman[k.skorPermukiman] || ''}</span>
        </div>
      </div>
      <div class="kesesuaian-sumber">Sumber: Suryadi et al. (2025) ATASI Journal – Optimalisasi Persebaran TPS Berbasis Data Geospasial</div>
      <div class="popup-divider"></div>
      <div class="popup-source">${escapeHtml(a.recommendation)}</div>
    </div>
  `;
}

function statusClass(label) {
  if (label.includes('Belum')) return 'danger';
  if (label.includes('Kurang')) return 'warning';
  if (label.includes('Terlayani')) return 'success';
  return 'neutral';
}

// ===== MINI GAME: MISI TPS CERDAS =====
function startGeoGame() {
  gameState.active = true;
  gameState.round = 0;
  gameState.totalScore = 0;
  gameState.bestScore = 0;
  clickAnalysisMode = false;
  const btnAnalyzeClick = document.getElementById('btnAnalyzeClick');
  if (btnAnalyzeClick) btnAnalyzeClick.classList.remove('active');
  updateClickModeBadge();
  updateGeoGameUI('Misi aktif. Klik 3 lokasi yang menurutmu cocok untuk TPS baru. Sistem akan menilai secara spasial. Ya, akhirnya peta ini punya tujuan selain dipandangi.', 'mid');
  map.getCanvas().style.cursor = 'crosshair';
}

function resetGeoGame() {
  gameState.active = false;
  gameState.round = 0;
  gameState.totalScore = 0;
  gameState.bestScore = 0;
  updateGeoGameUI('Game direset. Tekan mulai untuk mencari lokasi TPS baru terbaik.', '');
  updateClickModeBadge();
  map.getCanvas().style.cursor = clickAnalysisMode ? 'crosshair' : '';
}

function handleGeoGameClick(lng, lat) {
  if (!gameState.active) return;
  const a = analyzeLocation(lng, lat, true);
  const score = a.priorityScore;
  gameState.round += 1;
  gameState.totalScore += score;
  gameState.bestScore = Math.max(gameState.bestScore, score);

  const grade = gradeGameScore(score);
  const feedback = buildGameFeedback(a, grade);
  updateGeoGameUI(feedback, grade.className);
  showPopup(lng, lat, gamePopupHTML(a, grade));
  if (window.switchTab) window.switchTab('game');

  if (gameState.round >= gameState.maxRounds) {
    gameState.active = false;
    const avg = Math.round(gameState.totalScore / gameState.maxRounds);
    const finalGrade = gradeGameScore(avg);
    updateGeoGameUI(`Misi selesai. Rata-rata skor ${avg}/100. Level: ${finalGrade.label}. Skor terbaik ${gameState.bestScore}/100. Catatan: lokasi bagus bukan yang asal kosong, tapi yang logis secara spasial. Menggemparkan, aku tahu.`, finalGrade.className);
    map.getCanvas().style.cursor = clickAnalysisMode ? 'crosshair' : '';
  }
  updateGeoGameNumbers();
  updateClickModeBadge();
}

function gradeGameScore(score) {
  if (score >= 80) return { label: 'Ahli Spasial', className: 'good', icon: '🏆' };
  if (score >= 65) return { label: 'Perencana Layak', className: 'good', icon: '✅' };
  if (score >= 45) return { label: 'Perlu Verifikasi', className: 'mid', icon: '⚠️' };
  return { label: 'Kurang Tepat', className: 'bad', icon: '❌' };
}

function buildGameFeedback(a, grade) {
  const parts = [];
  parts.push(`${grade.icon} Ronde ${gameState.round}/${gameState.maxRounds}: skor ${a.priorityScore}/100 (${grade.label}).`);
  parts.push(`Status: ${a.serviceStatus}; sungai ${formatMeters(a.riverDistanceM)}; jalan ${formatMeters(a.roadDistanceM)}; kepadatan ${a.densityClass}; permukiman: ${a.insideSettlement}.`);
  if (a.priorityScore >= 65) parts.push('Pilihan ini cukup masuk akal untuk kandidat awal. Tetap perlu survei lapangan, karena peta bukan dukun tanah.');
  else parts.push('Coba cari area yang belum terlayani, padat penduduk, dekat jalan, tapi tidak terlalu dekat sungai/permukiman.');
  return parts.join(' ');
}

function updateGeoGameUI(message, className = '') {
  const status = document.getElementById('gameStatus');
  if (status) {
    status.className = `game-status ${className}`.trim();
    status.textContent = message;
  }
  const btn = document.getElementById('btnStartGame');
  if (btn) {
    btn.classList.toggle('active', gameState.active);
    btn.innerHTML = gameState.active
      ? '<i class="fas fa-stop"></i> Akhiri Misi'
      : '<i class="fas fa-play"></i> Mulai Misi';
  }
  updateGeoGameNumbers();
}

function updateGeoGameNumbers() {
  const avg = gameState.round ? Math.round(gameState.totalScore / gameState.round) : 0;
  setText('gameRound', `${gameState.round}/${gameState.maxRounds}`);
  setText('gameBest', gameState.bestScore);
  setText('gameAverage', avg);
}

function gamePopupHTML(a, grade) {
  return `
    <div class="popup-inner">
      <span class="popup-type-badge popup-type-rec">🎮 Misi TPS Cerdas</span>
      <div class="popup-name">${grade.icon} ${escapeHtml(grade.label)} - ${a.priorityScore}/100</div>
      <div class="popup-coords">${a.lat.toFixed(6)}, ${a.lng.toFixed(6)}</div>
      <div class="popup-divider"></div>
      <div class="popup-desc"><strong>Status layanan:</strong> ${escapeHtml(a.serviceStatus)}</div>
      <div class="popup-desc"><strong>Sungai:</strong> ${formatMeters(a.riverDistanceM)} | <strong>Jalan:</strong> ${formatMeters(a.roadDistanceM)}</div>
      <div class="popup-desc"><strong>Kepadatan:</strong> ${escapeHtml(a.densityClass)} | <strong>Permukiman:</strong> ${escapeHtml(a.insideSettlement)}</div>
      <div class="game-popup-score"><strong>Skor ${a.priorityScore}/100</strong><br>${escapeHtml(a.recommendation)}</div>
    </div>
  `;
}

function updateClickModeBadge() {
  const badge = document.getElementById('clickModeBadge');
  if (!badge) return;
  if (gameState.active) {
    badge.classList.remove('hidden');
    badge.innerHTML = '<i class="fas fa-gamepad"></i> Mode game aktif. Klik lokasi kandidat TPS baru.';
    return;
  }
  badge.classList.toggle('hidden', !clickAnalysisMode);
  if (clickAnalysisMode) badge.innerHTML = '<i class="fas fa-location-crosshairs"></i> Mode cek lokasi aktif. Klik titik pada peta.';
}

// ===== DASHBOARD =====
function updateDashboard() {
  const activeTypes = getActiveFilters();
  const visible = tpsData.filter(d => activeTypes.includes(d.type));
  const highRiskCount = visible.filter(loc => classifyFacilityRisk(loc).label === 'Risiko Tinggi').length;
  const underserved = countUnderservedPriorityAreas();

  setText('dashFacilityCount', visible.length);
  setText('dashHighRiskCount', highRiskCount);
  setText('dashUnderservedCount', underserved);
  setText('dashRecommendationCount', recommendationData.features.length);
}

function countUnderservedPriorityAreas() {
  const radiusM = getServiceRadiusM();
  let count = 0;
  densityData.features.forEach(area => {
    if (area.properties.density !== 'Tinggi') return;
    const c = turf.centroid(area);
    const nearest = getNearestFacility(c.geometry.coordinates[0], c.geometry.coordinates[1]);
    if (nearest && nearest.distanceKm * 1000 > radiusM) count += 1;
  });
  return count;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

function performSearch() {
  if (!searchInput || !searchResults) return;
  const q = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';
  if (!q) return;

  const facilityResults = tpsData.filter(d => d.name.toLowerCase().includes(q) || d.type.toLowerCase().includes(q));
  const recResults = recommendationData.features.filter(f => f.properties.name.toLowerCase().includes(q) || f.properties.priority.toLowerCase().includes(q));

  if (facilityResults.length === 0 && recResults.length === 0) {
    searchResults.innerHTML = '<li class="search-empty">Tidak ditemukan</li>';
    return;
  }

  facilityResults.forEach(loc => {
    const li = document.createElement('li');
    li.className = 'search-result-item';
    li.innerHTML = `<span style="font-size:16px">${typeIcons[loc.type]}</span><span>${escapeHtml(loc.name)}</span><span style="margin-left:auto;font-size:10px;padding:2px 7px;border-radius:4px;background:${typeColors[loc.type]}30;color:${typeColors[loc.type]}">${loc.type}</span>`;
    li.addEventListener('click', () => {
      map.flyTo({ center: [loc.lng, loc.lat], zoom: 16, speed: 1.5, offset: [-230, 0] });
      showPopup(loc.lng, loc.lat, popupHTML(loc));
      searchResults.innerHTML = '';
      searchInput.value = '';
    });
    searchResults.appendChild(li);
  });

  recResults.forEach(f => {
    const [lng, lat] = f.geometry.coordinates;
    const li = document.createElement('li');
    li.className = 'search-result-item';
    li.innerHTML = `<span style="font-size:16px">⭐</span><span>${escapeHtml(f.properties.name)}</span><span style="margin-left:auto;font-size:10px;padding:2px 7px;border-radius:4px;background:#a855f730;color:#c084fc">KANDIDAT</span>`;
    li.addEventListener('click', () => {
      map.flyTo({ center: [lng, lat], zoom: 16, speed: 1.5 });
      analyzeLocation(lng, lat, true);
      searchResults.innerHTML = '';
      searchInput.value = '';
    });
    searchResults.appendChild(li);
  });
}

if (searchBtn) searchBtn.addEventListener('click', performSearch);
if (searchInput) searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') performSearch(); });

document.addEventListener('click', e => {
  const clickedSearchButton = searchBtn && searchBtn.contains(e.target);
  if (searchResults && !searchResults.contains(e.target) && e.target !== searchInput && !clickedSearchButton) searchResults.innerHTML = '';
});

// ===== UI EVENTS =====
const btnBuffer = document.getElementById('btnBuffer');
const btnClearBuffer = document.getElementById('btnClearBuffer');
if (btnBuffer) btnBuffer.addEventListener('click', () => {
  addImpactBufferLayers(getActiveFilters());
  if (btnClearBuffer) btnClearBuffer.style.display = 'inline-flex';
});
if (btnClearBuffer) btnClearBuffer.addEventListener('click', () => {
  removeImpactBufferLayers();
  btnClearBuffer.style.display = 'none';
});

const serviceRadius = document.getElementById('serviceRadius');
if (serviceRadius) serviceRadius.addEventListener('input', () => {
  updateServiceRadiusLabel();
  if (serviceVisible) updateServiceBuffer();
  if (lastAnalysis) analyzeLocation(lastAnalysis.lng, lastAnalysis.lat, true);
  updateDashboard();
});

const btnService = document.getElementById('btnService');
if (btnService) btnService.addEventListener('click', updateServiceBuffer);
const btnClearService = document.getElementById('btnClearService');
if (btnClearService) btnClearService.addEventListener('click', () => removeServiceBuffer(true));

function getActiveFilters() {
  const cbs = document.querySelectorAll('.filter-cb');
  const active = [];
  cbs.forEach(cb => { if (cb.checked) active.push(cb.value); });
  return active;
}

function setFacilityFilterState() {
  document.querySelectorAll('.filter-item').forEach(label => {
    const cb = label.querySelector('.filter-cb');
    if (!cb) return;
    label.classList.toggle('is-checked', cb.checked);
  });
}

document.querySelectorAll('.filter-cb').forEach(cb => {
  cb.addEventListener('change', () => {
    setFacilityFilterState();
    const activeFilters = getActiveFilters();
    addMarkers(activeFilters);
    if (bufferVisible) addImpactBufferLayers(activeFilters);
    if (serviceVisible) updateServiceBuffer();
    if (lastAnalysis) analyzeLocation(lastAnalysis.lng, lastAnalysis.lat, true);
    updateDashboard();
  });
});

document.querySelectorAll('.support-layer-cb').forEach(cb => {
  cb.addEventListener('change', () => {
    applySupportLayerVisibility();
    const msg = document.getElementById('layerHint');
    if (msg) msg.textContent = `Layer ${cb.parentElement?.innerText?.trim() || cb.value} ${cb.checked ? 'ditampilkan' : 'disembunyikan'}.`;
  });
});

const btnStreets = document.getElementById('btnStreets');
const btnSatellite = document.getElementById('btnSatellite');
function setStyle(styleUrl) {
  map.setStyle(styleUrl);
}
if (btnStreets) btnStreets.addEventListener('click', () => {
  setStyle('mapbox://styles/mapbox/streets-v12');
  btnStreets.classList.add('active');
  if (btnSatellite) btnSatellite.classList.remove('active');
});
if (btnSatellite) btnSatellite.addEventListener('click', () => {
  setStyle('mapbox://styles/mapbox/satellite-streets-v12');
  btnSatellite.classList.add('active');
  if (btnStreets) btnStreets.classList.remove('active');
});

const btnAnalyzeClick = document.getElementById('btnAnalyzeClick');
const clickModeBadge = document.getElementById('clickModeBadge');
if (btnAnalyzeClick) btnAnalyzeClick.addEventListener('click', () => {
  gameState.active = false;
  updateGeoGameUI('Game dijeda. Mode cek lokasi manual aktif.', '');
  clickAnalysisMode = !clickAnalysisMode;
  btnAnalyzeClick.classList.toggle('active', clickAnalysisMode);
  updateClickModeBadge();
  map.getCanvas().style.cursor = clickAnalysisMode ? 'crosshair' : '';
});

const quickAnalyzeBtn = document.getElementById('quickAnalyzeBtn');
if (quickAnalyzeBtn) quickAnalyzeBtn.addEventListener('click', () => {
  if (btnAnalyzeClick) btnAnalyzeClick.click();
});

map.on('click', e => {
  if (gameState.active) {
    handleGeoGameClick(e.lngLat.lng, e.lngLat.lat);
    return;
  }
  if (!clickAnalysisMode) return;
  analyzeLocation(e.lngLat.lng, e.lngLat.lat, true);
});

const btnUseMyLocation = document.getElementById('btnUseMyLocation');
if (btnUseMyLocation) btnUseMyLocation.addEventListener('click', () => {
  const status = document.getElementById('analysisStatus');
  if (!navigator.geolocation) {
    if (status) status.textContent = 'Browser tidak mendukung geolocation.';
    return;
  }
  if (status) status.textContent = 'Mengambil lokasi perangkat...';
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lng = pos.coords.longitude;
      const lat = pos.coords.latitude;
      map.flyTo({ center: [lng, lat], zoom: 15, speed: 1.2 });
      analyzeLocation(lng, lat, true);
    },
    () => { if (status) status.textContent = 'Gagal mengambil lokasi. Izinkan akses lokasi di browser.'; },
    { enableHighAccuracy: true, timeout: 8000 }
  );
});

const btnStartGame = document.getElementById('btnStartGame');
if (btnStartGame) btnStartGame.addEventListener('click', () => {
  if (gameState.active) resetGeoGame();
  else startGeoGame();
});

const quickGameBtn = document.getElementById('quickGameBtn');
if (quickGameBtn) quickGameBtn.addEventListener('click', () => {
  if (btnStartGame) btnStartGame.click();
});

const btnResetGame = document.getElementById('btnResetGame');
if (btnResetGame) btnResetGame.addEventListener('click', resetGeoGame);

const btnDownloadAnalysis = document.getElementById('btnDownloadAnalysis');
if (btnDownloadAnalysis) btnDownloadAnalysis.addEventListener('click', downloadAnalysisCSV);

const btnReset = document.getElementById('btnReset');
if (btnReset) btnReset.addEventListener('click', () => {
  map.flyTo({ center: [110.383, -7.801], zoom: 13, speed: 1.5 });
  if (activePopup) { activePopup.remove(); activePopup = null; }
});

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

function syncSidebarToggleState() {
  if (!sidebar) return;
  const isCollapsed = sidebar.classList.contains('collapsed');
  document.body.classList.toggle('sidebar-is-collapsed', isCollapsed);
  if (mobileSidebarToggle) {
    mobileSidebarToggle.setAttribute('aria-label', isCollapsed ? 'Buka panel kontrol' : 'Tampilkan panel kontrol');
    mobileSidebarToggle.title = isCollapsed ? 'Buka panel kontrol' : 'Tampilkan panel kontrol';
  }
}

// Sidebar toggle is handled by map-tabs.js in the tabbed layout.
// syncSidebarToggleState() is called from map-tabs.js via updateSidebarToggleIcon().
syncSidebarToggleState();

// ===== CSV =====
function downloadAnalysisCSV() {
  if (!lastAnalysis) return;
  const headers = Object.keys(lastAnalysis);
  const values = headers.map(k => csvCell(lastAnalysis[k]));
  const csv = `${headers.join(',')}\n${values.join(',')}\n`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hasil_analisis_lokasi_tps.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? '').replace(/"/g, '""');
  return `"${text}"`;
}

// ===== FORMATTERS =====
function formatMeters(value) {
  if (!Number.isFinite(value)) return '-';
  if (value >= 1000) return `${(value / 1000).toFixed(2)} km`;
  return `${Math.round(value)} m`;
}

function escapeHtml(input) {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Inisialisasi label radius dan tampilan checkbox sebelum map load selesai.
updateServiceRadiusLabel();
setFacilityFilterState();
