Dokumen Kebutuhan Produk (PRD)
Proyek: Simulasi Pembelajaran Luar Angkasa Interaktif 3D
Tanggal Versi: 14 Oktober 2025
Disusun Oleh: Gemini AI
Tujuan Produk: Menyediakan platform pembelajaran berbasis web yang imersif dan interaktif menggunakan model 3D realistis untuk menjelaskan teknologi luar angkasa utama.

1. Visi & Sasaran Produk
Visi: Menjadi sumber daya visual 3D terdepan untuk edukasi teknologi roket dan satelit, meningkatkan pemahaman pengguna melalui interaksi dan animasi yang menarik.

Sasaran Kuantitatif:

Waktu muat model 3D utama kurang dari 3 detik pada koneksi standar.

Tingkat retensi pengguna per sesi minimal 5 menit.

Kompatibilitas penuh pada desktop dan perangkat seluler (fully responsive).

2. Fitur Utama (Kebutuhan Fungsional)
Platform harus menyediakan mode eksplorasi 3D interaktif untuk setiap aset, termasuk kemampuan: Rotate, Zoom, dan kontrol animasi.

A. Model 3D: Modul Roket & Pesawat Ulang-alik Amerika Serikat
|

| ID | Kebutuhan Fungsional | Deskripsi Detail |
| F-USA-01 | Model 3D Interaktif (USA) | Model resolusi tinggi (misalnya: Space Shuttle Discovery dan Roket Pendorong), dapat diputar 360 
∘
  dan diperbesar/diperkecil. |
| F-USA-02 | Anotasi Detail | Klik pada bagian utama (misalnya: Solid Rocket Boosters, External Tank, Orbiter) menampilkan deskripsi teks singkat. |
| F-USA-03 | Simulasi Penerbangan | Opsi animasi peluncuran singkat hingga pemisahan pendorong. |

B. Model 3D: Modul Roket & Pesawat Ulang-alik Rusia (Energiya-Buran)
| ID | Kebutuhan Fungsional | Deskripsi Detail |
| F-RUS-01 | Model 3D Interaktif (Rusia) | Model resolusi tinggi Buran dan Roket Energiya, dapat diputar 360 
∘
  dan diperbesar/diperkecil. |
| F-RUS-02 | Anotasi Detail | Klik pada bagian utama (misalnya: pendorong roket, badan pesawat) menampilkan deskripsi teks singkat. |
| F-RUS-03 | Simulasi Peluncuran | Opsi animasi peluncuran yang menampilkan keseluruhan urutan operasi roket Energiya. |

C. Model 3D: Satelit GEO (Geosynchronous Equatorial Orbit)
| ID | Kebutuhan Fungsional | Deskripsi Detail |
| F-GEO-01 | Model 3D Interaktif (Satelit) | Model satelit GEO (misalnya: Palapa, Telkom) dalam konfigurasi deployed, dapat diputar dan diperbesar. |
| F-GEO-02 | Visualisasi Orbit | Menampilkan satelit berputar mengelilingi model Bumi dengan jalur orbit GEO yang akurat. |
| F-GEO-03 | Penjelasan Fungsi | Opsi untuk menampilkan penjelasan tentang kegunaan (komunikasi, cuaca) dan parameter orbit GEO (35.786 km). |

3. Kebutuhan Pengalaman Pengguna (UX/UI)
Navigasi: Antarmuka navigasi yang bersih dan intuitif (menu samping atau menu atas) untuk beralih antar model.

Kontrol 3D: Kontrol mouse/sentuh yang mudah untuk interaksi 3D (seret untuk memutar, gulir untuk memperbesar).

Desain: Desain modern, minimalis, dan bertema luar angkasa.

4. Kebutuhan Non-Fungsional
Performa: Penggunaan optimasi model 3D (format .gltf atau .glb) dan pemuatan lazy (lazy loading) untuk memastikan kecepatan.

Skalabilitas: Arsitektur harus mendukung penambahan model 3D di masa depan tanpa refactoring besar.

SEO: Halaman harus dapat di-crawl oleh mesin pencari (memanfaatkan Next.js SSR/SSG).

Aksesibilitas: Kontrol interaksi harus dapat diakses melalui keyboard.