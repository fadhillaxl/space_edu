"use client";

import { Canvas } from "@react-three/fiber";
import { Bounds, Center, OrbitControls } from "@react-three/drei";
import GeoScene from "@/components/GeoScene";
import { GLTFModelSuspense } from "@/components/Model";

export default function Page() {
  return (
    <main className="p-4 space-y-6 max-w-6xl mx-auto" id="top">
      <nav className="sticky top-4 z-10 rounded-lg ring-1 ring-cyan-400/30 bg-[#0b0d17]/90 backdrop-blur p-3">
        <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Navigasi Cepat</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="#geo-visual" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Visual GEO</a>
          <a href="#satria-overview" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Ikhtisar</a>
          <a href="#satria-specs" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Spesifikasi</a>
          <a href="#satria-hts" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">HTS</a>
          <a href="#satria-ecosystem" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Pemanfaatan</a>
          <a href="#orbiter-tech" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Detail STS</a>
        </div>
      </nav>
      
      <header className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
        <h1 className="text-2xl font-semibold">Modul Satelit GEO - SATRIA-1</h1>
        <p className="text-white/70 mt-1">
          Visualisasi orbit GEO, misi SATRIA-1, teknologi HTS, serta modul pembanding teknologi sistem antariksa.
        </p>
      </header>

      <section id="satria-overview" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
        <h2 className="text-xl font-semibold">SATRIA-1 Mission Control</h2>
        <p className="text-white/75 mt-2">
          SATRIA-1 adalah satelit multifungsi Republik Indonesia untuk memangkas kesenjangan digital wilayah 3T. Operasi utama satelit berada
          pada slot orbit geostasioner 146 derajat BT.
        </p>
        <p className="text-white/75 mt-2">
          Misi ini menjadi tonggak penting infrastruktur telekomunikasi Indonesia untuk menghubungkan layanan publik secara merata dari orbit
          geostasioner.
        </p>
        <div className="orbit-container mt-4">
          <div className="earth"></div>
          <div className="satellite-path">
            <div className="satellite-icon"></div>
          </div>
          <p className="orbit-caption">Visualisasi Orbit Geostasioner (GEO)</p>
        </div>
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <p className="text-sm text-white/70">Slot orbit</p>
            <p className="font-semibold mt-1">146 derajat BT</p>
          </div>
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <p className="text-sm text-white/70">Kapasitas</p>
            <p className="font-semibold mt-1">150 Gbps</p>
          </div>
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <p className="text-sm text-white/70">Target layanan</p>
            <p className="font-semibold mt-1">150.000 titik layanan publik</p>
          </div>
        </div>
      </section>


<section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Dasar Orbit Satelit</h3>
  <p className="text-white/75 mt-2">
    Satelit seperti SATRIA-1 beroperasi di orbit geostasioner (GEO), yaitu orbit
    pada ketinggian sekitar 35.786 km di atas permukaan bumi. Pada orbit ini,
    satelit bergerak mengikuti rotasi bumi sehingga terlihat “diam” dari permukaan.
  </p>

  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li>LEO: 100 – 2.000 km (satelit pengamatan bumi, Starlink)</li>
    <li>MEO: di antara LEO dan GEO (GPS, navigasi)</li>
    <li><strong>GEO:</strong> 35.786 km (komunikasi seperti SATRIA-1)</li>
  </ul>

  <p className="text-white/75 mt-2">
    Orbit GEO dipilih karena memungkinkan koneksi stabil tanpa perlu antena bergerak di bumi.
  </p>
</section>


      <div className="grid md:grid-cols-2 gap-6 items-start">
        <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
          <h3 className="font-semibold text-lg">Peluncuran & Wahana</h3>
          <p className="text-white/75 mt-2">
            SATRIA-1 diluncurkan menggunakan SpaceX Falcon 9 (B1067) dari Cape Canaveral, Florida pada 18 Juni 2023. Satelit diproduksi oleh
            Thales Alenia Space.
          </p>
          <p className="text-white/75 mt-2">
            Falcon 9 mengantar satelit ke Geostationary Transfer Orbit (GTO), lalu satelit melanjutkan fase orbit raising secara mandiri.
          </p>
        </article>


<section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Tahapan Peluncuran Satelit</h3>
  <p className="text-white/75 mt-2">
    Peluncuran satelit tidak langsung menuju orbit tujuan, tetapi melalui beberapa tahap penting.
  </p>

  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li><strong>Vertical Ascent:</strong> roket naik lurus dari landasan</li>
    <li><strong>Pitch Over:</strong> roket mulai miring mengikuti arah orbit</li>
    <li><strong>Gravity Turn:</strong> memanfaatkan gravitasi bumi untuk efisiensi bahan bakar</li>
    <li><strong>Orbit Injection:</strong> satelit dilepas ke orbit transfer (GTO)</li>
  </ul>

  <p className="text-white/75 mt-2">
    Setelah itu, SATRIA-1 melakukan manuver sendiri untuk mencapai orbit GEO.
  </p>
</section>


        <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
          <h3 className="font-semibold text-lg">Konsep Orbit Raising</h3>
          <p className="text-white/75 mt-2">
            Pasca lepas dari roket, SATRIA-1 menyalakan sistem Full Electric Propulsion (EOR) untuk menaikkan orbit secara bertahap hingga
            mencapai orbit GEO di ketinggian sekitar 35.786 km.
          </p>
          <p className="text-white/75 mt-2">
            Pendekatan ini efisien untuk satelit modern dan menjadi bagian dari platform Spacebus NEO 200.
          </p>
        </article>
      </div>

<section id="geo-visual" className="grid gap-4 scroll-mt-28">
        <GeoScene />
        <div className="rounded-lg ring-1 ring-white/10 overflow-hidden">
          <div className="p-2 border-b border-white/10 text-sm">3D Viewer</div>
          <div className="h-[500px]">
            <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45, near: 0.1, far: 200 }}>
              <ambientLight intensity={0.65} />
              <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
              <Bounds fit clip observe margin={1.1}>
                <Center>
                  <GLTFModelSuspense url="/space-edu-3d/models/Satelit_Satria.glb" scale={0.35} position={[0, 0, 0]} />
                </Center>
              </Bounds>
              <OrbitControls
                makeDefault
                enableDamping
                enablePan={false}
                enableZoom
                enableRotate
                target={[0, 0, 0]}
                minDistance={1.8}
                maxDistance={10}
                minPolarAngle={0.35}
                maxPolarAngle={Math.PI - 0.35}
                rotateSpeed={0.8}
                zoomSpeed={0.9}
                dampingFactor={0.08}
              />
            </Canvas>
          </div>
        </div>
      </section>

      <section id="satria-specs" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
        <h3 className="font-semibold text-lg">Spesifikasi Teknis & Peluncuran</h3>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10"><strong>Orbit:</strong> Geostationary Orbit (GEO)</div>
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10"><strong>Slot Orbit:</strong> 146 derajat Bujur Timur (BT)</div>
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10"><strong>Kapasitas:</strong> 150 Gbps</div>
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10"><strong>Platform:</strong> Spacebus NEO 200 (Full Electric Propulsion)</div>
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10"><strong>Satelit:</strong> Thales Alenia Space</div>
          <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10"><strong>Roket:</strong> SpaceX Falcon 9</div>
        </div>
      </section>


      <section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Keuntungan Lokasi Peluncuran</h3>
  <p className="text-white/75 mt-2">
    Roket biasanya diluncurkan dari lokasi dekat khatulistiwa karena bumi
    berputar ke arah timur, memberikan “dorongan awal” alami bagi roket.
  </p>

  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li>Menghemat bahan bakar peluncuran</li>
    <li>Lebih efisien untuk menuju orbit GEO</li>
    <li>Mengurangi kebutuhan perubahan arah orbit (delta-V)</li>
  </ul>

  <p className="text-white/75 mt-2">
    Itulah kenapa banyak launch site besar berada di dekat garis ekuator.
  </p>
</section>


<section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Perjalanan Menuju Orbit GEO</h3>
  <p className="text-white/75 mt-2">
    Setelah diluncurkan oleh Falcon 9, SATRIA-1 tidak langsung berada di orbit
    geostasioner. Satelit ditempatkan terlebih dahulu di orbit transfer (GTO).
  </p>

  <p className="text-white/75 mt-2">
    Dari orbit ini, satelit menggunakan sistem propulsi listrik untuk menaikkan
    orbit secara bertahap hingga mencapai posisi akhir di GEO.
  </p>

  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li>Lebih hemat bahan bakar dibanding roket kimia</li>
    <li>Proses lebih lama (mingguan hingga bulanan)</li>
    <li>Efisiensi tinggi untuk satelit modern</li>
  </ul>
</section>


      <section id="satria-hts" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
        <h3 className="font-semibold text-lg">Teknologi High Throughput Satellite (HTS)</h3>
        <p className="text-white/75 mt-2">
          SATRIA-1 menggunakan arsitektur HTS dengan multiple spot beams untuk throughput tinggi dan pemanfaatan spektrum yang lebih efisien.
        </p>
        <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
          <li><strong>Ka-Band Spectrum:</strong> frekuensi tinggi untuk transmisi data cepat.</li>
          <li><strong>Spot Beam Technology:</strong> frequency reuse antar area berbeda untuk meningkatkan kapasitas.</li>
          <li><strong>Ground Segment:</strong> terhubung ke 11 stasiun bumi (gateway) di Indonesia.</li>
          <li><strong>Bandwidth Tinggi:</strong> kapasitas lebih besar dibanding satelit komunikasi konvensional.</li>
        </ul>
      </section>

      <section id="satria-ecosystem" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
        <h3 className="font-semibold text-lg">Pemanfaatan & Ekosistem KPBU</h3>
        <p className="text-white/75 mt-2">
          Proyek SATRIA-1 berjalan dengan skema KPBU/PPP. BAKTI Kominfo bertindak sebagai PJPK, sedangkan PT Satelit Nusantara Tiga sebagai
          badan usaha pelaksana teknis.
        </p>
        <p className="text-white/75 mt-2">
          Layanan difokuskan untuk sekolah, fasilitas kesehatan, kantor pemerintahan daerah, serta titik keamanan di wilayah 3T melalui skema
          Availability Payment (AP).
        </p>
        <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
          <li><strong>Sektor Pendidikan:</strong> sekolah dan pesantren.</li>
          <li><strong>Sektor Kesehatan:</strong> puskesmas dan rumah sakit daerah.</li>
          <li><strong>Sektor Keamanan:</strong> pos TNI/Polri di perbatasan.</li>
          <li><strong>Pemerintahan Daerah:</strong> kantor desa dan kantor camat.</li>
        </ul>
        <p className="text-white/75 mt-2">
          Skema AP memastikan pemerintah membayar layanan berkala setelah satelit beroperasi sesuai standar, sehingga tidak membebani APBN
          secara langsung di awal konstruksi.
        </p>
      </section>


<section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Fun Fact SATRIA-1</h3>
  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li>Salah satu satelit internet terbesar di Asia</li>
    <li>Melayani daerah 3T (tertinggal, terdepan, terluar)</li>
    <li>Fokus utama: pendidikan, kesehatan, dan pemerintahan</li>
  </ul>
</section>

          <section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Cara Kerja Satelit GEO</h3>
  <p className="text-white/75 mt-2">
    Satelit geostasioner seperti SATRIA-1 berada di ketinggian sekitar 35.786 km di atas permukaan bumi.
    Pada posisi ini, satelit bergerak mengikuti rotasi bumi sehingga terlihat “diam” dari permukaan.
  </p>
  <p className="text-white/75 mt-2">
    Hal ini memungkinkan antena di bumi tidak perlu bergerak mengikuti satelit, sehingga sangat cocok
    untuk layanan komunikasi seperti internet, televisi, dan jaringan pemerintahan.
  </p>
  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
    <li>Sinyal dikirim dari stasiun bumi ke satelit (uplink)</li>
    <li>Satelit memproses dan memantulkan sinyal</li>
    <li>Sinyal dikirim kembali ke pengguna (downlink)</li>
  </ul>
</section>

<section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Tantangan Operasi di Orbit</h3>
  <p className="text-white/75 mt-2">
    Mengoperasikan satelit di orbit geostasioner bukan hal mudah. SATRIA-1 harus mampu bertahan
    di lingkungan ekstrem selama bertahun-tahun tanpa perbaikan langsung.
  </p>
  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li><strong>Radiasi luar angkasa:</strong> dapat merusak komponen elektronik</li>
    <li><strong>Suhu ekstrem:</strong> bisa sangat panas atau sangat dingin</li>
    <li><strong>Keterlambatan sinyal (latency):</strong> karena jarak sangat jauh dari bumi</li>
    <li><strong>Manuver posisi:</strong> harus tetap stabil di slot orbit</li>
  </ul>
</section>


<section className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
  <h3 className="font-semibold text-lg">Ground Segment (Stasiun Bumi)</h3>
  <p className="text-white/75 mt-2">
    Selain satelit di orbit, sistem SATRIA-1 juga didukung oleh jaringan stasiun bumi (gateway)
    yang tersebar di Indonesia.
  </p>
  <p className="text-white/75 mt-2">
    Gateway ini berfungsi sebagai penghubung utama antara internet global dan satelit,
    lalu mendistribusikan koneksi ke wilayah 3T.
  </p>
  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-1">
    <li>Mengirim dan menerima data dari satelit</li>
    <li>Mengelola trafik jaringan</li>
    <li>Menjamin kestabilan koneksi</li>
  </ul>
</section>


      <section className="rounded-lg ring-1 ring-emerald-300/30 bg-emerald-950/20 p-5">
  <p className="text-xs uppercase tracking-wide text-emerald-200/80">
    Dampak Nyata
  </p>
  <h3 className="font-semibold text-lg">Manfaat SATRIA-1 untuk Indonesia</h3>
  <p className="text-white/75 mt-2">
    SATRIA-1 dirancang untuk mengurangi kesenjangan digital di wilayah 3T
    (terdepan, terluar, tertinggal).
  </p>
  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li><strong>Pendidikan:</strong> akses internet untuk sekolah terpencil</li>
    <li><strong>Kesehatan:</strong> mendukung telemedicine</li>
    <li><strong>Pemerintahan:</strong> digitalisasi layanan publik</li>
    <li><strong>Keamanan:</strong> komunikasi di wilayah perbatasan</li>
  </ul>
  <p className="text-white/75 mt-2">
    Dengan ini, satelit tidak hanya teknologi, tapi juga solusi nyata untuk pemerataan akses digital.
  </p>
</section>

<section className="rounded-lg ring-1 ring-white/10 bg-black/30 p-5">
  <h3 className="font-semibold text-lg">Fakta Singkat SATRIA-1</h3>
  <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
    <li>Salah satu satelit internet terbesar di Asia Tenggara</li>
    <li>Menggunakan teknologi full electric propulsion</li>
    <li>Dirancang beroperasi lebih dari 15 tahun</li>
    <li>Menjangkau ratusan ribu titik layanan publik</li>
  </ul>
</section>

      <div className="pb-4">
        <a href="#top" className="inline-flex text-sm px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/20 hover:ring-cyan-300">
          Kembali ke atas
        </a>
      </div>

      <style jsx>{`
        .orbit-container {
          position: relative;
          height: 280px;
          background: radial-gradient(circle, #1a1a2e 0%, #000 70%);
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #333;
        }

        .earth {
          position: absolute;
          width: 80px;
          height: 80px;
          background: #2a6fdb;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px #2a6fdb;
        }

        .satellite-path {
          position: absolute;
          width: 220px;
          height: 220px;
          border: 1px dashed #555;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .satellite-icon {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #ffcc00;
          border-radius: 2px;
          top: -7px;
          left: 50%;
          animation: rotateOrbit 10s linear infinite;
          transform-origin: 0 117px;
        }

        .orbit-caption {
          position: absolute;
          bottom: 8px;
          width: 100%;
          text-align: center;
          font-size: 12px;
        }

        .reentry-anim {
          width: 100%;
          min-height: 140px;
          background: linear-gradient(90deg, #121212, #ff4500);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px;
        }

        .shuttle-svg {
          width: 60px;
          fill: white;
          animation: shake 0.1s infinite;
        }

        .thermal-tile {
          width: 22px;
          height: 22px;
          background: #222;
          border: 1px solid #444;
          border-radius: 2px;
          display: inline-block;
        }

        @keyframes rotateOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shake {
          0% {
            transform: translate(1px, 1px);
          }
          50% {
            transform: translate(-1px, -1px);
          }
          100% {
            transform: translate(1px, -1px);
          }
        }
      `}</style>
    </main>
  );
}
