Rekomendasi Tumpukan Teknologi (Tech Stack)
Proyek: Simulasi Pembelajaran Luar Angkasa Interaktif 3D
Persyaratan Dasar: Wajib menggunakan Next.js (React Framework).

1. Tumpukan Teknologi Inti (Full Stack)
| Kategori | Teknologi | Alasan Pemilihan |
| Frontend Framework | Next.js (React) | Diwajibkan oleh klien. Menyediakan Server-Side Rendering (SSR) dan Static Site Generation (SSG) untuk performa dan SEO yang lebih baik, sangat penting untuk pengalaman web yang cepat. |
| 3D Rendering | React Three Fiber (r3f) & Drei | r3f adalah lapisan abstraksi yang memungkinkan penggunaan Three.js (library WebGL standar industri) secara deklaratif di dalam komponen React. Ini mempermudah manajemen state dan integrasi dengan ekosistem Next.js/React. |
| Desain & Styling | Tailwind CSS | Pendekatan utility-first untuk styling yang sangat cepat dan memastikan desain yang responsif penuh, penting untuk kompatibilitas seluler. |
| Asset Management | GLTF/GLB Format | Format standar industri untuk model 3D terkompresi. Digunakan bersama dengan useGLTF dari Drei untuk pemuatan model yang efisien. |
| Hosting & Deployment | Vercel | Integrasi tanpa gesekan (zero-config) dengan Next.js, menyediakan CDN global dan deployment yang sangat cepat. |

2. Detail Implementasi Teknis
A. Frontend (Next.js & React)
Struktur Aplikasi: Menggunakan fitur App Router terbaru Next.js untuk routing yang modern dan data fetching yang efisien.

Model 3D: Setiap model (Roket USA, Energiya-Buran, Satelit GEO) harus dienkapsulasi sebagai Komponen React terpisah.

Canvas 3D: Menggunakan <Canvas> dari r3f sebagai entry point WebGL.

Optimasi:

Menggunakan komponen <Suspense> dari React untuk fallback saat model 3D sedang dimuat (loading state).

Memastikan semua model 3D dioptimalkan ukurannya (menggunakan alat seperti gltf-pipeline) agar ukuran file sekecil mungkin.

B. Interaksi 3D
Kontrol Kamera: Menggunakan <OrbitControls> dari Drei untuk menyediakan fungsi putar, zoom, dan pan secara default.

Interaktivitas (Anotasi): Menggunakan event handlers dari r3f (misalnya onClick) pada mesh 3D untuk memicu tampilan anotasi (deskripsi teks) yang diimplementasikan sebagai DOM HTML yang dilapiskan di atas kanvas 3D (menggunakan <Html> dari Drei).

Animasi: Menggunakan hooks useFrame dari r3f untuk menjalankan logika animasi per frame. Untuk animasi kompleks (misalnya peluncuran roket), akan digunakan mixer Three.js yang diimpor dari file .gltf yang sudah dianimasikan.

3. Diagram Arsitektur (Sederhana)
graph TD
    A[Pengguna] --> B(Peramban Web);
    B --> C{Next.js Frontend};
    C --> D[Komponen React Biasa];
    C --> E[Komponen 3D / Canvas r3f];
    E --> F(Three.js / WebGL);
    F --> G[Aset 3D (.gltf/.glb) dari CDN];
    C --> H[Server Side Rendering (Vercel)];
    style E fill:#f9f,stroke:#333
    style C fill:#ccf,stroke:#333


Ringkasan Keunggulan Next.js + r3f: Kombinasi ini menawarkan performa rendering 3D tingkat tinggi (berkat akselerasi GPU oleh Three.js/r3f) sambil mempertahankan kecepatan muat awal dan SEO yang sangat baik (berkat Next.js).