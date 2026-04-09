"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import MediaShowcase from "@/components/MediaShowcase";

const USA_GALLERY_IMAGES = [
  "/space-edu-3d/image/usa-gallery/shuttle-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-2.png",
  "/space-edu-3d/image/usa-gallery/shuttle-3.png",
  "/space-edu-3d/image/usa-gallery/shuttle-4.png",
  "/space-edu-3d/image/usa-gallery/shuttle-5.png",
  "/space-edu-3d/image/usa-gallery/shuttle-6.png",
  "/space-edu-3d/image/usa-gallery/shuttle-7.png",
  "/space-edu-3d/image/usa-gallery/shuttle-8.png",
  "/space-edu-3d/image/usa-gallery/shuttle-9.png",
  "/space-edu-3d/image/usa-gallery/shuttle-10-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-11-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-12-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-13-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-14-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-15-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-16-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-17-1.png",
  "/space-edu-3d/image/usa-gallery/shuttle-18.png",
];

export default function Page() {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const totalImages = USA_GALLERY_IMAGES.length;
  const currentImageSrc = useMemo(() => USA_GALLERY_IMAGES[currentImageIndex], [currentImageIndex]);

  const openGalleryModal = useCallback(
    (index: number) => {
      const normalized = ((index % totalImages) + totalImages) % totalImages;
      setCurrentImageIndex(normalized);
      setZoom(1);
      setImageLoadError(false);
      setIsImageLoading(true);
      setIsGalleryModalOpen(true);
    },
    [totalImages]
  );

  const closeGalleryModal = useCallback(() => {
    setIsGalleryModalOpen(false);
    setZoom(1);
    setIsImageLoading(false);
    setImageLoadError(false);
  }, []);

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setZoom(1);
    setImageLoadError(false);
    setIsImageLoading(true);
  }, [totalImages]);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    setZoom(1);
    setImageLoadError(false);
    setIsImageLoading(true);
  }, [totalImages]);

  const zoomIn = useCallback(() => setZoom((prev) => Math.min(prev + 0.25, 3)), []);
  const zoomOut = useCallback(() => setZoom((prev) => Math.max(prev - 0.25, 0.5)), []);

  const handlePreviewNavigateAndOpen = useCallback(
    (index: number) => {
      const gallerySection = document.getElementById("usa-gallery");
      gallerySection?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#usa-gallery");
      openGalleryModal(index);
    },
    [openGalleryModal]
  );

  useEffect(() => {
    if (!isGalleryModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGalleryModal();
      if (event.key === "ArrowLeft") goToPrevImage();
      if (event.key === "ArrowRight") goToNextImage();
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-") zoomOut();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isGalleryModalOpen, closeGalleryModal, goToPrevImage, goToNextImage, zoomIn, zoomOut]);

  return (
    <main className="p-4 space-y-8 max-w-6xl mx-auto" id="top">
      <MediaShowcase
        title="USA Shuttle Showcase"
        description="Video, images, and interactive 3D viewer for Space Shuttle Atlantis."
        videoSrc="/space-edu-3d/video/Shuttle-launch720p.mp4"
        imageSrcs={USA_GALLERY_IMAGES}
        onImagePreviewClick={handlePreviewNavigateAndOpen}
        modelUrl="/space-edu-3d/models/space_shuttle_atlantis.glb"
      />

      <div className="rounded-xl overflow-hidden ring-1 ring-white/10">
        <div className="usa-shuttle-container">
          <div className="usa-rocket" />
        </div>
      </div>

      <nav className="sticky top-4 z-10 rounded-lg ring-1 ring-cyan-400/30 bg-[#0b0d17]/90 backdrop-blur p-3">
        <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Navigasi Cepat</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="#goals" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Tujuan</a>
          <a href="#home" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Gambaran Umum</a>
          <a href="#history" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Sejarah</a>
          <a href="#tech" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Teknologi</a>
          <a href="#ap101" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">AP-101</a>
          <a href="#rs25" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">RS-25</a>
          <a href="#orbiter-detail" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Detail Orbiter</a>
          <a href="#usa-gallery" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Gallery</a>
          <a href="#launch" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Peluncuran</a>
        </div>
      </nav>

      <section className="grid gap-6" aria-label="Modul edukasi Space Shuttle">
        <header className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold mt-1">Space Shuttle Program (USA)</h2>
          <p className="text-white/75 mt-2">
            Alur belajar disusun dari konteks dasar, sejarah, sistem teknis inti, hingga studi kasus peluncuran agar materi lebih mudah
            dipahami secara bertahap.
          </p>
        </header>

        <article id="goals" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
          <h3 className="font-semibold text-lg">Tujuan Pembelajaran</h3>
          <div className="grid md:grid-cols-3 gap-3 mt-3">
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
              <p className="text-sm font-medium">1. Memahami konteks program</p>
              <p className="text-sm text-white/75 mt-1">Mengapa NASA beralih ke sistem reusable setelah era Apollo.</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
              <p className="text-sm font-medium">2. Menguasai komponen inti</p>
              <p className="text-sm text-white/75 mt-1">Peran Orbiter, External Tank, dan SRB dalam fase peluncuran.</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
              <p className="text-sm font-medium">3. Menilai aspek keselamatan</p>
              <p className="text-sm text-white/75 mt-1">Belajar dari keberhasilan dan tragedi untuk desain misi modern.</p>
            </div>
          </div>
        </article>

        <article id="home" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
          <h3 className="font-semibold text-lg">Home - Gambaran Umum Program</h3>
          <p className="text-white/75 mt-2">
            Selamat datang di modul interaktif sistem transportasi ruang angkasa (STS) Amerika Serikat. Space Shuttle adalah pesawat luar
            angkasa pertama yang dapat digunakan kembali (reusable) yang mengubah cara manusia mengakses orbit bumi rendah.
          </p>
          <div className="grid md:grid-cols-3 gap-3 mt-3">
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
              <p className="text-sm text-white/70">Penerbangan pertama</p>
              <p className="text-base font-semibold mt-1">STS-1 (Columbia), 12 April 1981</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
              <p className="text-sm text-white/70">Total misi</p>
              <p className="text-base font-semibold mt-1">135 penerbangan</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
              <p className="text-sm text-white/70">Kecepatan orbit</p>
              <p className="text-base font-semibold mt-1">28.000 km/jam</p>
            </div>
          </div>
        </article>

        <div className="grid md:grid-cols-2 gap-6">
          <article id="history" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
            <h3 className="font-semibold text-lg">Sejarah & Latar Belakang</h3>
            <p className="text-white/75 mt-2">
              Setelah program Apollo (pendaratan di bulan), NASA membutuhkan cara yang lebih murah dan rutin untuk mengirim astronot dan kargo
              ke luar angkasa.
            </p>
            <p className="text-white/75 mt-2">
              Ide awalnya adalah membuat &quot;bus luar angkasa&quot;. Lima pengorbit utama yang pernah terbang adalah <strong>Columbia, Challenger,
              Discovery, Atlantis</strong>, dan <strong>Endeavour</strong>.
            </p>
            <p className="text-white/75 mt-2">
              Meskipun penuh prestasi, program ini juga mengalami dua tragedi besar (Challenger 1986 dan Columbia 2003) yang memberikan
              pelajaran berharga bagi keselamatan penerbangan antariksa modern.
            </p>
          </article>

          <article id="tech" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
            <h3 className="font-semibold text-lg">Teknologi Roket (3 Komponen Utama)</h3>
            <p className="text-white/75 mt-2">Space Shuttle bukan sekadar pesawat, melainkan sistem tiga komponen utama:</p>
            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
              <li>
                <strong>1. Orbiter:</strong> Pesawat yang menampung kru dan kargo. Menggunakan ubin keramik khusus untuk menahan suhu ekstrem
                saat masuk kembali ke atmosfer.
              </li>
              <li>
                <strong>2. External Tank (ET):</strong> Tangki oranye besar berisi hidrogen cair dan oksigen cair. Ini adalah satu-satunya
                bagian yang tidak bisa digunakan kembali.
              </li>
              <li>
                <strong>3. Solid Rocket Boosters (SRB):</strong> Dua roket putih di samping yang memberikan 71% dorongan saat lepas landas.
              </li>
            </ul>
          </article>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <article
            id="ap101"
            tabIndex={0}
            className="group rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition"
          >
            <h3 className="font-semibold text-lg">Otak Digital - IBM AP-101</h3>
            <p className="text-white/75 mt-2">
              Space Shuttle menggunakan sistem komputer yang sangat unik yang disebut <strong>General Purpose Computer (GPC)</strong>.
              Keandalan adalah segalanya di luar angkasa.
            </p>
            <p className="text-xs uppercase tracking-wider text-cyan-300 mt-2">Hover / Focus untuk detail lengkap</p>
            <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[1000px] group-hover:opacity-100 group-focus:max-h-[1000px] group-focus:opacity-100 transition-all duration-300">
              <p className="text-white/75 mt-1">
                Sistem komputer Space Shuttle didesain dengan prinsip <strong>&quot;Fail-Operational/Fail-Safe&quot;</strong>.
              </p>
              <p className="text-white/75 mt-2">
                Jika 1 komputer mati, misi tetap lanjut. Jika 2 komputer mati, misi harus dibatalkan tetapi kru tetap bisa pulang dengan aman.
              </p>
              <p className="text-white/75 mt-2">
                Trivia: Komputer ini sangat lambat menurut standar sekarang, tetapi mereka sangat stabil karena tidak menjalankan aplikasi latar
                belakang seperti Windows atau Android; mereka hanya fokus pada navigasi dan kontrol mesin.
              </p>
              <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
                <li>
                  <strong>Redundansi 5x:</strong> Shuttle membawa 5 komputer identik. 4 berjalan secara paralel (Voting System) dan 1 sebagai
                  cadangan (BFS) jika terjadi software glitch massal.
                </li>
                <li>
                  <strong>Memori:</strong> Awalnya hanya memiliki 416 KB RAM. Jauh lebih kecil dari HP modern, namun cukup untuk menerbangkan
                  pesawat seberat 2.000 ton ke orbit.
                </li>
                <li>
                  <strong>Bahasa Pemrograman:</strong> Menggunakan <strong>HAL/S</strong> (High-order Assembly Language for Systems), bahasa
                  yang dirancang khusus agar tidak bisa melakukan kesalahan fatal (error-proof).
                </li>
              </ul>
            </div>
          </article>

          <article
            id="rs25"
            tabIndex={0}
            className="group rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition"
          >
            <h3 className="font-semibold text-lg">Otot Utama - Mesin RS-25 (SSME)</h3>
            <p className="text-white/75 mt-2">
              RS-25 adalah mahakarya teknik mesin. Ini adalah mesin roket berbahan bakar cair pertama yang dapat digunakan kembali berkali-kali.
            </p>
            <p className="text-xs uppercase tracking-wider text-cyan-300 mt-2">Hover / Focus untuk detail lengkap</p>
            <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[1200px] group-hover:opacity-100 group-focus:max-h-[1200px] group-focus:opacity-100 transition-all duration-300">
              <div className="mt-1">
                <div className="rs25-nozzle"></div>
                <div className="exhaust"></div>
              </div>
              <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
                <li>
                  <strong>Bahan Bakar:</strong> Menggabungkan Hidrogen Cair (LH2) dan Oksigen Cair (LOX). Hasil pembakarannya hanyalah{" "}
                  <strong>uap air panas</strong>.
                </li>
                <li>
                  <strong>Suhu Ekstrem:</strong> Suhu di dalam ruang bakar mencapai 3.300°C, namun pipa-pipa hidrogen dingin membungkus mesin
                  agar logamnya tidak meleleh.
                </li>
                <li>
                  <strong>Tekanan:</strong> Pompa bahan bakarnya sangat kuat sehingga bisa mengosongkan kolam renang ukuran Olimpiade dalam
                  waktu kurang dari 25 detik.
                </li>
                <li>Setiap peluncuran menggunakan 3 mesin RS-25 yang bekerja selama 8,5 menit tanpa henti untuk mendorong Shuttle mencapai kecepatan orbital.</li>
                <li>Mesin ini adalah mesin dengan efisiensi tertinggi di dunia pada masanya.</li>
                <li>
                  <strong>Staged Combustion Cycle:</strong> RS-25 membakar kembali gas sisa dari pompa untuk memastikan hampir 100% bahan bakar
                  berubah menjadi daya dorong.
                </li>
                <li>
                  <strong>Throttleable:</strong> Tidak seperti roket pendorong (SRB) yang jika sudah menyala tidak bisa dimatikan, RS-25 bisa
                  diatur kekuatannya (65% hingga 109%) oleh pilot atau komputer pusat.
                </li>
              </ul>
              <p className="text-white/75 mt-3">
                Mengapa keduanya penting? Tanpa RS-25, Shuttle tidak akan pernah memiliki daya angkat yang cukup efisien untuk membawa kargo berat
                seperti satelit atau modul Stasiun Luar Angkasa Internasional (ISS). Tanpa AP-101, manusia tidak mungkin bisa mengontrol
                stabilitas Shuttle yang secara aerodinamis sangat tidak stabil saat proses re-entry (masuk kembali ke bumi).
              </p>
            </div>
          </article>
        </div>

        <article id="launch" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
          <h3 className="font-semibold text-lg">Bagaimana Kerja di Lokasi Peluncuran</h3>
          <p className="text-white/75 mt-2">
            Momen peluncuran ikonik terakhir Space Shuttle Atlantis (STS-135) pada 2011 menandai berakhirnya era Shuttle.
          </p>
          <p className="text-white/75 mt-2">
            Peluncuran melibatkan launchpad, lokasi pengisian bahan bakar, under ground command center, fasilitas storage, fasilitas rocket
            erection, penangkal petir, supply air jumlah besar dan lain sebagainya.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg overflow-hidden ring-1 ring-white/10">
              <video
                className="w-full aspect-video"
                controls
                preload="metadata"
                src="/space-edu-3d/video/SpaceShuttleLaunchindiegun720p.mp4"
              />
            </div>
            <div className="rounded-lg overflow-hidden ring-1 ring-white/10">
              <video
                className="w-full aspect-video"
                controls
                preload="metadata"
                src="/space-edu-3d/video/HowdidSpaceShuttleLaunchJaredOwen720p.mp4"
              />
            </div>
          </div>
          <div className="mt-5">
            <a href="#top" className="inline-flex text-sm px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/20 hover:ring-cyan-300">
              Kembali ke atas
            </a>
          </div>
        </article>

        <article id="orbiter-detail" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
          <h3 className="font-semibold text-lg">Detail Teknologi Orbiter (Hover Learning)</h3>
          <p className="text-white/75 mt-2">
            Arahkan kursor ke setiap kartu untuk membuka detail. Di mobile, detail dapat dibuka dengan tap/focus pada kartu.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <section tabIndex={0} className="group rounded-lg bg-black/20 p-4 ring-1 ring-white/10 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition">
              <h4 className="font-semibold">Arsitektur Rangka (Airframe)</h4>
              <p className="text-sm text-white/70 mt-1">Struktur aluminium + titanium, delta-wing, dan pembagian fuselage.</p>
              <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 group-focus:max-h-[500px] group-focus:opacity-100 transition-all duration-300">
                <p className="text-sm text-white/80">
                  Pesawat pengorbit (Orbiter) dibangun menggunakan aluminium kelas pesawat terbang, namun diperkuat dengan struktur
                  <strong> titanium</strong> di area mesin untuk menahan beban dorong yang masif.
                </p>
                <p className="text-sm text-white/80 mt-2">
                  Shuttle menggunakan desain delta-wing yang memungkinkannya meluncur seperti pesawat saat mendarat, meskipun tanpa tenaga
                  mesin (hanya gliding). Rangka aluminium dipilih karena ringan, tetapi membutuhkan isolasi panas total karena aluminium akan
                  meleleh pada suhu re-entry.
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-white/80 space-y-1">
                  <li><strong>Fuselage depan:</strong> kokpit bertekanan untuk kru.</li>
                  <li><strong>Mid-fuselage:</strong> ruang kargo terbuka sepanjang 18 meter.</li>
                  <li><strong>Fuselage belakang:</strong> menopang tiga RS-25 dan dua OMS.</li>
                </ul>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  
                  <a
                    href="#usa-gallery"
                    className="rounded-md ring-1 ring-white/10 bg-black/30 p-3 text-sm text-white/80 hover:ring-cyan-300"
                  >
                    Buka galeri Shuttle lengkap di halaman ini.
                  </a>
                </div>
              </div>
            </section>

            <section tabIndex={0} className="group rounded-lg bg-black/20 p-4 ring-1 ring-white/10 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition">
              <h4 className="font-semibold">Cargo Bay & Canadarm (SRMS)</h4>
              <p className="text-sm text-white/70 mt-1">Pintu kargo sebagai radiator + lengan robot 6 sendi.</p>
              <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 group-focus:max-h-[500px] group-focus:opacity-100 transition-all duration-300">
                <p className="text-sm text-white/80">
                  Pintu kargo bukan hanya untuk menyimpan satelit, tapi juga berfungsi sebagai <strong>radiator panas</strong>. Jika pintu
                  tidak terbuka di orbit, Shuttle dapat mengalami overheat.
                </p>
                <p className="text-sm text-white/80 mt-2">
                  Pintu kargo adalah struktur besar sepanjang 18 meter yang digerakkan motor listrik presisi tinggi. Sisi dalam pintu dilapisi
                  panel pendingin untuk membuang panas berlebih dari sistem elektronik ke ruang hampa.
                </p>
                <p className="text-sm text-white/80 mt-2">
                  Shuttle Remote Manipulator System (SRMS/Canadarm) dibuat oleh Kanada, memiliki 6 sendi yang meniru lengan manusia untuk
                  melepas satelit, menangkap Teleskop Hubble, dan membantu astronot saat spacewalk.
                </p>
                
              </div>
            </section>

            <section tabIndex={0} className="group rounded-lg bg-black/20 p-4 ring-1 ring-white/10 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition">
              <h4 className="font-semibold">Mesin & Propulsi</h4>
              <p className="text-sm text-white/70 mt-1">RS-25 untuk dorong utama, OMS untuk manuver orbit.</p>
              <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 group-focus:max-h-[500px] group-focus:opacity-100 transition-all duration-300">
                <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
                  <li><strong>RS-25:</strong> memakai LH2 + LOX dari tangki eksternal untuk fase utama.</li>
                  <li><strong>OMS:</strong> memakai MMH + N2O4 (hypergolic), terbakar otomatis saat bersentuhan.</li>
                  <li>Konfigurasi ini dipilih karena andal untuk koreksi dan perubahan orbit di ruang hampa.</li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  Berbeda dengan mesin utama, OMS memakai Monomethylhydrazine (MMH) dan Nitrogen Tetroxide. Keunggulannya: tidak perlu pemicu
                  api karena bereaksi spontan saat bertemu, sehingga sangat andal untuk manuver orbit.
                </p>
              </div>
            </section>

            <section tabIndex={0} className="group rounded-lg bg-black/20 p-4 ring-1 ring-white/10 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition">
              <h4 className="font-semibold">Kokpit & Kehidupan Kru</h4>
              <p className="text-sm text-white/70 mt-1">Flight deck, mid-deck, airlock, dan sistem atmosfer kabin.</p>
              <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 group-focus:max-h-[500px] group-focus:opacity-100 transition-all duration-300">
                <p className="text-sm text-white/80">
                  Kokpit Shuttle memiliki lebih dari 2.000 saklar dan kontrol manual. Flight deck dipakai pilot dan komandan untuk
                  mengendalikan pesawat sekaligus memantau kargo serta mengoperasikan lengan robot.
                </p>
                <p className="text-sm text-white/80 mt-2">
                  Mid-deck dipakai astronot untuk makan, tidur, eksperimen, dan akses airlock menuju luar angkasa. Astronot bekerja dalam
                  lingkungan 1 atmosfer (mendekati kondisi Bumi) dengan pengolah CO2 berbasis Lithium Hydroxide (LiOH).
                </p>
              </div>
            </section>

            <section tabIndex={0} className="group rounded-lg bg-black/20 p-4 ring-1 ring-white/10 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition md:col-span-2">
              <h4 className="font-semibold">TPS & Re-entry</h4>
              <p className="text-sm text-white/70 mt-1">Perlindungan panas hingga sekitar 1.650°C saat masuk atmosfer.</p>
              <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[900px] group-hover:opacity-100 group-focus:max-h-[900px] group-focus:opacity-100 transition-all duration-300">
                <p className="text-sm text-white/80">
                  Thermal Protection System (TPS) adalah teknologi kritis. Setiap ubin silika memiliki nomor unik karena bentuknya mengikuti
                  lekukan pesawat. Pada area paling panas (hidung dan leading edge), digunakan Reinforced Carbon-Carbon (RCC).
                </p>
                <p className="text-sm text-white/80 mt-2">
                  Saat kembali ke Bumi, gesekan udara dapat menciptakan suhu hingga sekitar <strong>1.650°C</strong>. Ubin silika terdiri dari
                  sekitar 90% udara dan 10% serat silika, sehingga menjadi isolator panas sangat efektif.
                </p>
                <div className="mt-3 rounded-md bg-gradient-to-r from-[#121212] to-[#ff4500] p-4 ring-1 ring-white/10 flex items-center justify-center gap-4">
                  <svg className="orbiter-shuttle-svg" viewBox="0 0 100 100" aria-label="Simulasi shuttle re-entry">
                    <path d="M50,10 L80,80 L50,70 L20,80 Z" />
                  </svg>
                  <p className="text-sm font-semibold">Simulasi Re-entry: Udara Terionisasi (Plasma)</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Visual Ubin TPS</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <span key={i} className="thermal-tile" />
                    ))}
                  </div>
                </div>
                <ul className="mt-2 list-disc pl-5 text-sm text-white/80 space-y-1">
                  <li><strong>Black silica tiles:</strong> melindungi bagian perut orbiter.</li>
                  <li><strong>RCC:</strong> tahan panas ekstrem di area frontal.</li>
                </ul>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div className="rounded-lg overflow-hidden ring-1 ring-white/10">
                    <iframe
                      className="w-full aspect-video"
                      src="https://www.youtube.com/embed/52IZNyLN2w8"
                      title="Simulasi re-entry"
                      allowFullScreen
                    />
                  </div>
                  <div className="rounded-md bg-black/30 flex items-center justify-center p-4 ring-1 ring-white/10">
                    <p className="text-sm font-semibold">Ubin silika dan RCC menjaga orbiter saat fase panas ekstrem re-entry.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>

        <article id="usa-gallery" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5 scroll-mt-28">
          <h3 className="font-semibold text-lg">USA Shuttle Gallery</h3>
          <p className="text-white/75 mt-2">
            Galeri gambar dari folder <code>/public/image/usa-gallery</code>. Klik preview untuk membuka modal full image.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {USA_GALLERY_IMAGES.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => openGalleryModal(idx)}
                className="block rounded-md overflow-hidden ring-1 ring-white/10 hover:ring-cyan-300 focus:ring-cyan-300 focus:outline-none"
              >
                <img src={src} alt={`usa-shuttle-${idx + 1}`} className="w-full h-40 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </article>
      </section>

      {isGalleryModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-3 md:p-6 flex items-center justify-center"
          onClick={closeGalleryModal}
          role="dialog"
          aria-modal="true"
          aria-label="USA Shuttle Gallery Modal"
        >
          <div
            className="w-full max-w-6xl h-[85vh] rounded-lg bg-[#0b0d17] ring-1 ring-white/20 flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-3 border-b border-white/10 flex items-center justify-between gap-2">
              <p className="text-sm text-white/80">
                {currentImageIndex + 1} / {totalImages}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={zoomOut} className="px-2 py-1 rounded bg-white/10 ring-1 ring-white/20 hover:ring-cyan-300">
                  -
                </button>
                <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={zoomIn} className="px-2 py-1 rounded bg-white/10 ring-1 ring-white/20 hover:ring-cyan-300">
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="px-2 py-1 rounded bg-white/10 ring-1 ring-white/20 hover:ring-cyan-300 text-sm"
                >
                  Reset
                </button>
                <button type="button" onClick={closeGalleryModal} className="px-2 py-1 rounded bg-white/10 ring-1 ring-white/20 hover:ring-red-300">
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 p-3 md:p-4 grid grid-cols-[auto_1fr_auto] gap-2 items-center">
              <button
                type="button"
                onClick={goToPrevImage}
                className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 hover:ring-cyan-300"
                aria-label="Previous image"
              >
                {"<"}
              </button>

              <div className="relative h-full overflow-auto rounded-md ring-1 ring-white/10 bg-black/40 flex items-center justify-center">
                {isImageLoading && !imageLoadError && <div className="text-sm text-white/70">Loading image...</div>}
                {imageLoadError && <div className="text-sm text-red-300">Image gagal dimuat. Coba gambar lain.</div>}
                <img
                  key={currentImageSrc}
                  src={currentImageSrc}
                  alt={`USA Shuttle ${currentImageIndex + 1}`}
                  className={`max-w-full max-h-full object-contain transition-transform duration-200 ${imageLoadError ? "hidden" : "block"}`}
                  style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
                  onLoad={() => {
                    setIsImageLoading(false);
                    setImageLoadError(false);
                  }}
                  onError={() => {
                    setIsImageLoading(false);
                    setImageLoadError(true);
                  }}
                />
              </div>

              <button
                type="button"
                onClick={goToNextImage}
                className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 hover:ring-cyan-300"
                aria-label="Next image"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .usa-shuttle-container {
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle, #1b2735 0%, #090a0f 100%);
        }

        .usa-rocket {
          width: 60px;
          height: 120px;
          background: #e0e0e0;
          border-radius: 50% 50% 10% 10%;
          position: relative;
          animation: usa-vibrate 0.1s infinite;
        }

        .usa-rocket::after {
          content: "";
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: orange;
          filter: blur(10px);
          border-radius: 50%;
          animation: usa-flame 0.2s infinite;
        }

        .rs25-nozzle {
          width: 100px;
          height: 120px;
          background: #444;
          margin: 20px auto;
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
          position: relative;
          background: linear-gradient(to bottom, #555, #222);
        }

        .exhaust {
          width: 80px;
          height: 150px;
          background: linear-gradient(to bottom, #00f2ff, transparent);
          margin: -10px auto 0;
          filter: blur(8px);
          opacity: 0.7;
          border-radius: 0 0 50% 50%;
        }

        .thermal-tile {
          width: 22px;
          height: 22px;
          background: #222;
          border: 1px solid #444;
          border-radius: 2px;
          display: inline-block;
        }

        .orbiter-shuttle-svg {
          width: 70px;
          fill: #fff;
          animation: orbiter-shake 0.1s infinite;
        }

        @keyframes usa-vibrate {
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

        @keyframes usa-flame {
          0% {
            height: 30px;
            opacity: 0.8;
          }
          100% {
            height: 50px;
            opacity: 1;
          }
        }

        @keyframes orbiter-shake {
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
