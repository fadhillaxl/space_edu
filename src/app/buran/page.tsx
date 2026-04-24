"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import MediaShowcase from "@/components/MediaShowcase";


const BURAN_GALLERY_IMAGES_OVERVIEW = [
  "/space-edu-3d/image/buran-gallery/buran17.jpeg",
  "/space-edu-3d/image/buran-gallery/buran16.jpeg",
  "/space-edu-3d/image/buran-gallery/buran15.jpeg",
  "/space-edu-3d/image/buran-gallery/buran14.jpeg",
  "/space-edu-3d/image/buran-gallery/buran13.jpeg",
];

const BURAN_GALLERY_IMAGES_CLOSE = [
  "/space-edu-3d/image/buran-gallery/buran12.jpeg",
  "/space-edu-3d/image/buran-gallery/buran11.jpeg",
  "/space-edu-3d/image/buran-gallery/buran10.jpeg",
  "/space-edu-3d/image/buran-gallery/buran9.jpeg",
];

const BURAN_GALLERY_IMAGES_MODULES = [
  "/space-edu-3d/image/buran-gallery/buran8.jpeg",
  "/space-edu-3d/image/buran-gallery/buran7.jpeg",
  "/space-edu-3d/image/buran-gallery/buran6.jpeg",
  "/space-edu-3d/image/buran-gallery/buran5.jpeg",
];

const BURAN_GALLERY_IMAGES_LANDING = [
  "/space-edu-3d/image/buran-gallery/buran4.jpeg",
  "/space-edu-3d/image/buran-gallery/buran3.jpeg",
  "/space-edu-3d/image/buran-gallery/buran2.jpeg",
  "/space-edu-3d/image/buran-gallery/buran1.jpeg",
];

export default function Page() {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>('');

  const getImagesForGroup = (group: string) => {
    switch (group) {
      case 'Overview':
        return BURAN_GALLERY_IMAGES_OVERVIEW;
      case 'Close-ups':
        return BURAN_GALLERY_IMAGES_CLOSE;
      case 'Modules':
        return BURAN_GALLERY_IMAGES_MODULES;
      case 'Landing Gear':
        return BURAN_GALLERY_IMAGES_LANDING;
      default:
        return [];
    }
  };

  const activeGalleryImages = useMemo(() => getImagesForGroup(activeGroup), [activeGroup]);

  const openGalleryModal = useCallback((galleryType: string, images: string[], index: number) => {
    setActiveGroup(galleryType);
    const normalized = ((index % images.length) + images.length) % images.length;
    setCurrentImageIndex(normalized);
    setZoom(1);
    setImageLoadError(false);
    setIsImageLoading(true);
    setIsGalleryModalOpen(true);
  }, []);

  const closeGalleryModal = useCallback(() => {
    setIsGalleryModalOpen(false);
    setZoom(1);
    setIsImageLoading(false);
    setImageLoadError(false);
    setActiveGroup('');
  }, []);

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + activeGalleryImages.length) % activeGalleryImages.length);
    setZoom(1);
    setImageLoadError(false);
    setIsImageLoading(true);
  }, [activeGalleryImages.length]);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % activeGalleryImages.length);
    setZoom(1);
    setImageLoadError(false);
    setIsImageLoading(true);
  }, [activeGalleryImages.length]);

  const zoomIn = useCallback(() => setZoom((prev) => Math.min(prev + 0.25, 3)), []);
  const zoomOut = useCallback(() => setZoom((prev) => Math.max(prev - 0.25, 0.5)), []);

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
    <main className="p-4 text-white">
      <nav className="sticky top-4 z-10 rounded-lg ring-1 ring-cyan-400/30 bg-[#0b0d17]/90 backdrop-blur p-3">
        <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Navigasi Cepat</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <a href="#gambaran-umum"  className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Gambaran Umum</a>
          <a href="#buran-teknologi" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Teknologi & Rekayasa</a>
          <a href="#buran-simulasi" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Simulasi Interaktif</a>
          <a href="#buran-peluncuran"  className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Peluncuran</a>
          <a href="#buran-gallery" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Gallery</a>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl space-y-6">
        

        <section id="gambaran-umum" className="space-y-4 lg:col-span-7">
          <article className="rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-950/40 to-black/40 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/80">Museum Panel</p>
            <h1 className="mt-2 text-2xl font-semibold">Buran-Energia</h1>
            <p className="mt-3 text-white/80">
              Selamat datang di studi komparatif teknologi luar angkasa. Di panel ini, kita membedah anatomi
              Buran (OK-1K1), sistem yang lahir dari persaingan geopolitik namun menghasilkan inovasi
              otomatisasi yang melampaui masanya.
            </p>
          </article>
    </section>


<section id="buran-sejarah" className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-indigo-300/30 bg-indigo-950/20 p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-indigo-200/80">
      Latar Belakang Historis
    </p>
    <h2 className="mt-1 text-xl font-semibold">Perang Dingin & Perlombaan Teknologi</h2>
    <p className="mt-2 text-white/80">
      Program Buran lahir pada puncak Perang Dingin, ketika Amerika Serikat dan Uni Soviet
      berlomba menguasai teknologi luar angkasa. Setelah keberhasilan program Apollo dan
      munculnya Space Shuttle milik NASA, Uni Soviet melihat adanya potensi ancaman militer
      dari wahana yang dapat digunakan ulang tersebut.
    </p>
    <p className="mt-2 text-white/80">
      Space Shuttle dianggap bukan hanya kendaraan ilmiah, tetapi juga berpotensi membawa
      muatan militer, melakukan pengintaian, bahkan misi strategis dari orbit. Hal ini mendorong
      Uni Soviet untuk mengembangkan sistem tandingan dengan kemampuan yang setara—bahkan
      dalam beberapa aspek, lebih unggul.
    </p>
  </article>


  <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
    <h2 className="mt-1 text-xl font-semibold">Dari Teknologi Militer ke Luar Angkasa</h2>
    <p className="mt-2 text-white/80">
      Akar dari teknologi Buran tidak lepas dari pengembangan militer Soviet, khususnya
      dalam bidang roket balistik antar benua (ICBM). Teknologi roket awal yang digunakan
      untuk membawa hulu ledak nuklir kemudian dikembangkan menjadi kendaraan peluncur
      luar angkasa.
    </p>

    <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80">
      <li>
        Teknologi roket berasal dari pengembangan misil seperti R-7, yang juga digunakan
        untuk meluncurkan satelit pertama dunia, Sputnik.
      </li>
      <li>
        Struktur tangki bahan bakar (tank) bertekanan tinggi dikembangkan dari kebutuhan
        penyimpanan bahan bakar kriogenik seperti oksigen cair dan hidrogen cair.
      </li>
      <li>
        Sistem kontrol dan navigasi berasal dari teknologi militer yang menuntut presisi tinggi.
      </li>
    </ul>
  </article>

<section className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-cyan-300/30 bg-cyan-950/20 p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-cyan-200/80">
      Timeline
    </p>
    <h2 className="mt-1 text-xl font-semibold">Perjalanan Program Buran</h2>

    <ul className="mt-3 space-y-2 text-white/80">
      <li><b>1976</b> – Uni Soviet mulai proyek Buran</li>
      <li><b>1980-an</b> – Pengembangan intensif dan uji coba</li>
      <li><b>1988</b> – Penerbangan pertama (sukses)</li>
      <li><b>1991</b> – Program dihentikan (Uni Soviet bubar)</li>
      <li><b>2002</b> – Buran asli hancur akibat runtuhnya hangar</li>
    </ul>
  </article>
</section>


  <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
    <h2 className="mt-1 text-xl font-semibold">Peran Roket Energia</h2>
    <p className="mt-2 text-white/80">
      Berbeda dengan pendekatan Amerika, Uni Soviet mengembangkan roket Energia sebagai
      sistem peluncur utama yang terpisah dari wahana Buran. Energia dirancang sebagai
      roket super heavy-lift yang mampu membawa berbagai jenis muatan, termasuk Buran
      maupun modul luar angkasa lainnya.
    </p>

    <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80">
      <li>
        Menggunakan empat booster berbasis mesin RD-170 dengan daya dorong sangat besar.
      </li>
      <li>
        Tahap inti menggunakan bahan bakar hidrogen cair dan oksigen cair untuk efisiensi tinggi.
      </li>
      <li>
        Desain modular memungkinkan roket digunakan untuk berbagai misi, tidak hanya Buran.
      </li>
    </ul>
  </article>

  <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
    <h2 className="mt-1 text-xl font-semibold">Struktur Tank & Sistem Bahan Bakar</h2>
    <p className="mt-2 text-white/80">
      Salah satu komponen penting dalam sistem Energia adalah tangki bahan bakar berukuran
      besar yang dirancang untuk menyimpan propelan kriogenik. Tangki ini harus mampu
      menahan suhu ekstrem sekaligus tekanan tinggi selama peluncuran.
    </p>

    <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80">
      <li>
        Tangki hidrogen cair disimpan pada suhu sekitar -253°C, membutuhkan isolasi termal tinggi.
      </li>
      <li>
        Tangki oksigen cair berada pada suhu sekitar -183°C dan berfungsi sebagai oksidator utama.
      </li>
      <li>
        Desain struktur ringan namun kuat menjadi kunci agar rasio dorong tetap optimal.
      </li>
    </ul>
  </article>

  <article className="rounded-2xl border border-red-300/30 bg-red-950/20 p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-red-200/80">
      Titik Balik Sejarah
    </p>
    <h2 className="mt-1 text-xl font-semibold">Akhir Program Buran</h2>
    <p className="mt-2 text-white/80">
      Meskipun secara teknologi sangat maju, program Buran hanya melakukan satu kali
      penerbangan tanpa awak pada tahun 1988. Setelah itu, krisis ekonomi dan runtuhnya
      Uni Soviet pada tahun 1991 menyebabkan proyek ini dihentikan.
    </p>
    <p className="mt-2 text-white/80">
      Pada tahun 2002, unit asli Buran hancur akibat runtuhnya hangar di Baikonur,
      menandai akhir simbolis dari salah satu proyek luar angkasa paling ambisius
      dalam sejarah.
    </p>
  </article>
</section>


<section id="buran-teknologi" className="space-y-4 lg:col-span-7">
          <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
            <h2 className="mt-1 text-xl font-semibold">Arsitektur Peluncuran: Perbedaan Filosofis</h2>
            <p className="mt-2 text-white/80">
              Berbeda dengan Space Shuttle NASA yang merupakan sistem terintegrasi (orbiter bagian dari roket),
              Soviet merancang Energia sebagai roket peluncur mandiri.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80">
              <li>Sistem tanpa mesin utama: Buran tidak memiliki main engine di tubuhnya dan diposisikan sebagai payload.</li>
              <li>Efek kapasitas: ruang kargo lebih luas dan titik berat lebih stabil saat fase pendaratan.</li>
              <li>Energia menggunakan empat booster RD-170 dan tahap inti berbahan bakar hidrogen cair.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
            <h2 className="mt-1 text-xl font-semibold">Anatomi Teknologi: Sistem Kendali dan Otomasi</h2>
            <p className="mt-2 text-white/80">
              Keunggulan mutlak Buran ada pada otomasi penerbangan. Sistem ini dirancang untuk tetap aman saat
              pilot tidak melakukan intervensi langsung.
            </p>

            <h3 className="mt-4 text-lg font-semibold">1. Sistem Komputer Biser-4</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-white/80">
              <li>Empat komputer identik bekerja paralel dengan mekanisme voting untuk redundansi keputusan.</li>
              <li>Data yang menyimpang dari satu jalur komputasi diabaikan agar jalur kontrol tetap stabil.</li>
              <li>Bahasa PROL2 dipakai untuk menekan risiko bug logika pada navigasi orbital.</li>
            </ul>

            <h3 className="mt-4 text-lg font-semibold">2. Sistem Perlindungan Termal (Heat Shield)</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-white/80">
              <li>Saat re-entry, Buran menghadapi suhu hingga sekitar 1.600 C.</li>
              <li>Kurang lebih 38.000 ubin keramik bernomor seri unik dipasang manual pada badan wahana.</li>
              <li>Serat silika murni membantu pelepasan panas cepat setelah fase pemanasan ekstrem.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
            <h2 className="mt-1 text-xl font-semibold">Rekayasa Propulsi: Mesin RD-170</h2>
            <p className="mt-2 text-white/80">
              Di bawah roket Energia terdapat mesin RD-170, salah satu puncak rekayasa mesin roket Uni Soviet.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80">
              <li>Staged combustion cycle membakar ulang gas turbin ke ruang bakar utama untuk efisiensi tinggi.</li>
              <li>Mesin dapat throttleable dan nozelnya bergerak untuk menjaga presisi arah roket.</li>
            </ul>
          </article>


<section id="buran-propulsi" className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-red-300/30 bg-red-950/20 p-5">
    <p className="text-xs uppercase tracking-wide text-red-200/80">
      Sistem Propulsi
    </p>
    <h2 className="mt-1 text-xl font-semibold">Mesin RD-170 & Energia</h2>

    <p className="mt-2 text-white/80">
      Energia menggunakan mesin RD-170, salah satu mesin roket paling kuat yang pernah dibuat.
      Mesin ini menggunakan teknologi staged combustion yang meningkatkan efisiensi pembakaran.
    </p>

    <ul className="mt-3 list-disc pl-5 space-y-2 text-white/80">
      <li>Setiap booster menghasilkan daya dorong sekitar 7.900 kN.</li>
      <li>Menggunakan bahan bakar RP-1 (kerosin) dan oksigen cair.</li>
      <li>Nozzle dapat digerakkan untuk kontrol arah (thrust vectoring).</li>
      <li>Dirancang untuk stabilitas tinggi saat fase ascent.</li>
    </ul>
  </article>
</section>

<section id="buran-navigasi" className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-purple-300/30 bg-purple-950/20 p-5">
    <p className="text-xs uppercase tracking-wide text-purple-200/80">
      Sistem Kendali
    </p>
    <h2 className="mt-1 text-xl font-semibold">Navigasi & Guidance System</h2>

    <p className="mt-2 text-white/80">
      Buran menggunakan sistem navigasi berbasis inersia yang dikombinasikan dengan
      sensor eksternal untuk memastikan posisi dan orientasi tetap akurat selama misi.
    </p>

    <ul className="mt-3 list-disc pl-5 space-y-2 text-white/80">
      <li>Menggunakan gyroscope dan accelerometer untuk menentukan posisi.</li>
      <li>Dikombinasikan dengan radar altimeter saat mendekati pendaratan.</li>
      <li>Sistem mampu melakukan koreksi otomatis terhadap gangguan eksternal.</li>
    </ul>
  </article>
</section>


          <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
            <h2 className="mt-1 text-xl font-semibold">Deteksi Fakta: Mengapa Hanya Satu Penerbangan?</h2>
            <p className="mt-2 text-white/80">
              Teknologi ini hanya terbang sekali pada 15 November 1988 karena faktor lintas domain berikut.
            </p>
            <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full border-collapse text-left text-sm text-white/85">
                <thead>
                  <tr className="border-b border-white/20 bg-white/5">
                    <th className="px-3 py-2 font-semibold">Faktor</th>
                    <th className="px-3 py-2 font-semibold">Penjelasan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2">Ekonomi</td>
                    <td className="px-3 py-2">Runtuhnya ekonomi Uni Soviet memangkas anggaran luar angkasa secara drastis.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-3 py-2">Politik</td>
                    <td className="px-3 py-2">Setelah bubar pada 1991, prioritas militer dan strategis beralih ke program lain.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Tragedi 2002</td>
                    <td className="px-3 py-2">Unit asli Buran hancur akibat runtuhnya hangar di Baikonur, bukan karena kegagalan misi.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

<section className="grid gap-6 lg:grid-cols-12">
  <div className="lg:col-span-7 space-y-4">
          <MediaShowcase
            title="Energia-Buran Showcase"
            description="A combined presentation with video and an interactive 3D viewer."
            referenceUrl="https://www.artstation.com/artwork/LznQv"
            videoSrc="/space-edu-3d/video/RocketLaunchEnergia-Buran720.mp4"
            modelUrl="/space-edu-3d/models/space_shuttle_buran.glb"
          />
  </div>
        </section>


<section id="buran-spesifikasi" className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-yellow-300/30 bg-yellow-950/20 p-5">
    <p className="text-xs uppercase tracking-wide text-yellow-200/80">
      Data Teknis
    </p>
    <h2 className="mt-1 text-xl font-semibold">Spesifikasi Buran</h2>

    <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm text-white/85">
        <tbody>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Panjang</td>
            <td className="px-3 py-2">36,4 meter</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Rentang sayap</td>
            <td className="px-3 py-2">24 meter</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Berat saat peluncuran</td>
            <td className="px-3 py-2">±105 ton</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Kapasitas kargo</td>
            <td className="px-3 py-2">hingga 30 ton</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Orbit</td>
            <td className="px-3 py-2">Low Earth Orbit (LEO)</td>
          </tr>
          <tr>
            <td className="px-3 py-2">Penerbangan</td>
            <td className="px-3 py-2">1 kali (1988, tanpa awak)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</section>


<section id="buran-simulasi" className="space-y-4 lg:col-span-7">
          <article className="rounded-2xl border border-amber-300/30 bg-amber-950/20 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-200/80">Aktivitas Edukasi</p>
            <h2 className="mt-1 text-xl font-semibold">The Automatic Landing</h2>
            <p className="mt-2 text-white/80">
              Pada misi perdananya, komputer Buran mendeteksi angin samping kuat saat pendekatan ke landasan.
              Sistem otomatis mengeksekusi manuver zig-zag untuk mengurangi kecepatan, sempat memicu kepanikan
              pengawas darat, namun berakhir dengan pendaratan mulus. Episode ini menunjukkan respons mesin dapat
              sangat stabil pada kondisi kritis.
            </p>
          </article>
</section>

          <article className="rounded-2xl border border-emerald-300/30 bg-emerald-950/20 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-200/80">Simulasi Interaktif</p>
            <h2 className="mt-1 text-xl font-semibold">Energia: Vertical Ascent</h2>
            <p className="mt-2 text-white/80">
              Coba simulasi peluncuran untuk melihat tantangan rasio dorong terhadap gravitasi pada sistem
              roket bergaya Buran-Energia.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <iframe
                title="Simulasi Rocket Launch"
                src="/space-edu-3d/iframe/SimulasiRocketLaunch.html"
                className="h-[760px] w-full"
                loading="lazy"
              />
            </div>
          </article>


<section id="buran-misi" className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-cyan-300/30 bg-cyan-950/20 p-5">
    <p className="text-xs uppercase tracking-wide text-cyan-200/80">
      Alur Operasional
    </p>
    <h2 className="mt-1 text-xl font-semibold">Tahapan Misi Buran</h2>

    <p className="mt-2 text-white/80">
      Misi Buran dirancang sebagai sistem otomatis penuh, dimulai dari peluncuran
      hingga pendaratan tanpa intervensi manusia secara langsung.
    </p>

    <ol className="mt-4 space-y-3 text-white/80">
      <li>
        <strong>1. Liftoff (Peluncuran)</strong><br/>
        Roket Energia menghasilkan daya dorong besar untuk membawa Buran keluar dari atmosfer bumi.
      </li>

      <li>
        <strong>2. Ascent Phase</strong><br/>
        Booster terpisah secara bertahap, sementara tahap inti terus mendorong hingga mencapai orbit rendah bumi.
      </li>

      <li>
        <strong>3. Orbit Operation</strong><br/>
        Buran melakukan manuver di orbit dan mengandalkan sistem komputer untuk navigasi dan stabilisasi.
      </li>

      <li>
        <strong>4. Re-entry</strong><br/>
        Wahana memasuki atmosfer dengan sudut tertentu untuk menghindari panas berlebih akibat gesekan udara.
      </li>

      <li>
        <strong>5. Automatic Landing</strong><br/>
        Sistem komputer mengendalikan pendaratan sepenuhnya, termasuk koreksi arah akibat angin samping.
      </li>
    </ol>
  </article>
</section>


<section id="buran-fakta" className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-emerald-300/30 bg-emerald-950/20 p-5">
    <p className="text-xs uppercase tracking-wide text-emerald-200/80">
      Fakta Unik
    </p>
    <h2 className="mt-1 text-xl font-semibold">Fakta Menarik Buran</h2>

    <ul className="mt-3 list-disc pl-5 space-y-2 text-white/80">
      <li>Buran adalah satu-satunya space shuttle yang berhasil mendarat sepenuhnya otomatis tanpa awak.</li>
      <li>Hanya melakukan satu kali penerbangan, namun sukses 100% tanpa kegagalan.</li>
      <li>Sistem komputer mampu mengambil keputusan sendiri saat terjadi perubahan kondisi cuaca.</li>
      <li>Desainnya memungkinkan digunakan untuk misi militer maupun sipil.</li>
    </ul>
  </article>
</section>


<section id="buran-perbandingan" className="space-y-4 lg:col-span-7">
  <article className="rounded-2xl border border-blue-300/30 bg-blue-950/20 p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-blue-200/80">
      Analisis Komparatif
    </p>
    <h2 className="mt-1 text-xl font-semibold">Buran vs Space Shuttle</h2>
    <p className="mt-2 text-white/80">
      Meskipun secara visual terlihat mirip, Buran dan Space Shuttle memiliki
      perbedaan mendasar dalam filosofi desain dan sistem operasional.
    </p>

    <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm text-white/85">
        <thead>
          <tr className="bg-white/5 border-b border-white/20">
            <th className="px-3 py-2">Aspek</th>
            <th className="px-3 py-2">Buran</th>
            <th className="px-3 py-2">Space Shuttle</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Mesin utama</td>
            <td className="px-3 py-2">Tidak ada (pakai Energia)</td>
            <td className="px-3 py-2">Ada di orbiter</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Pilot</td>
            <td className="px-3 py-2">Bisa tanpa awak (otomatis)</td>
            <td className="px-3 py-2">Wajib awak manusia</td>
          </tr>
          <tr className="border-b border-white/10">
            <td className="px-3 py-2">Peluncur</td>
            <td className="px-3 py-2">Roket terpisah (Energia)</td>
            <td className="px-3 py-2">Sistem terintegrasi</td>
          </tr>
          <tr>
            <td className="px-3 py-2">Fleksibilitas</td>
            <td className="px-3 py-2">Tinggi (multi-misi)</td>
            <td className="px-3 py-2">Terbatas pada Shuttle</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</section>


          <article id="buran-gallery" className="rounded-2xl border border-white/15 bg-black/30 p-5 scroll-mt-28">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Buran Gallery</p>
            <h2 className="mt-1 text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-white/80">
              Bagian luar Buran relatif terdokumentasi dengan baik, dan saya dapat mengandalkan rencana dan foto asli. Materi referensi tentang desain interior (seperti ruang muatan dan modul) terbatas. Untuk membuat model yang meyakinkan, saya mencurahkan banyak upaya pada desain area ini.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {BURAN_GALLERY_IMAGES_OVERVIEW.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openGalleryModal('Overview', BURAN_GALLERY_IMAGES_OVERVIEW, idx)}
                  className="block overflow-hidden rounded-md ring-1 ring-white/10 hover:ring-cyan-300 focus:outline-none focus:ring-cyan-300"
                >
                  <img src={src} alt={`buran-${idx + 1}`} className="h-40 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-white/70">Klik gambar untuk membuka tampilan penuh</p>
</article>

            <article id="buran-gallery" className="rounded-2xl border border-white/15 bg-black/30 p-5 scroll-mt-28">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Buran Gallery</p>
            <h2 className="mt-1 text-xl font-semibold">Close-ups</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {BURAN_GALLERY_IMAGES_CLOSE.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openGalleryModal('Close-ups', BURAN_GALLERY_IMAGES_CLOSE, idx)}
                  className="block overflow-hidden rounded-md ring-1 ring-white/10 hover:ring-cyan-300 focus:outline-none focus:ring-cyan-300"
                >
                  <img src={src} alt={`buran-${idx + 1}`} className="h-40 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-white/70">Klik gambar untuk membuka tampilan penuh</p>
            </article>

            <article id="buran-gallery" className="rounded-2xl border border-white/15 bg-black/30 p-5 scroll-mt-28">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Buran Gallery</p>
            <h2 className="mt-1 text-xl font-semibold">Modules</h2>
            <p className="mt-2 text-white/80">
              Modul abu-abu adalah modul dok. Bagian bulat bawah terhubung ke kabin utama dan berisi ruang kedap udara. Bagian silindris atas berisi terowongan yang dapat diperpanjang dan dilengkapi dengan sistem dok APAS di bagian atas.
Modul silindris, yang terletak di tengah ruang kargo, merupakan prototipe untuk modul-modul masa depan. Modul ini juga dilengkapi dengan instrumen ilmiah untuk penerbangan uji Buran.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {BURAN_GALLERY_IMAGES_MODULES.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openGalleryModal('Modules', BURAN_GALLERY_IMAGES_MODULES, idx)}
                  className="block overflow-hidden rounded-md ring-1 ring-white/10 hover:ring-cyan-300 focus:outline-none focus:ring-cyan-300"
                >
                  <img src={src} alt={`buran-${idx + 1}`} className="h-40 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-white/70">Klik gambar untuk membuka tampilan penuh</p>
            </article>

            <article id="buran-gallery" className="rounded-2xl border border-white/15 bg-black/30 p-5 scroll-mt-28">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Buran Gallery</p>
            <h2 className="mt-1 text-xl font-semibold">Landing Gear</h2>
            <p className="mt-2 text-white/80">Sistem roda yang digunakan saat pesawat kembali ke bumi, berfungsi menopang beban, menyerap benturan, dan menjaga kestabilan saat pendaratan.</p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {BURAN_GALLERY_IMAGES_LANDING.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openGalleryModal('Landing Gear', BURAN_GALLERY_IMAGES_LANDING, idx)}
                  className="block overflow-hidden rounded-md ring-1 ring-white/10 hover:ring-cyan-300 focus:outline-none focus:ring-cyan-300"
                >
                  <img src={src} alt={`buran-${idx + 1}`} className="h-40 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-white/70">Klik gambar untuk membuka tampilan penuh</p>
          </article>
        </section>
      </div>

      {isGalleryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm md:p-6"
          onClick={closeGalleryModal}
          role="dialog"
          aria-modal="true"
          aria-label="Buran Gallery Modal"
        >
          <div
            className="flex h-[85vh] w-full max-w-6xl flex-col rounded-lg bg-[#0b0d17] ring-1 ring-white/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/10 p-3">
              <p className="text-sm text-white/80">
                {activeGroup} - {currentImageIndex + 1} / {activeGalleryImages.length}
              </p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={zoomOut} className="rounded bg-white/10 px-2 py-1 ring-1 ring-white/20 hover:ring-cyan-300">
                  -
                </button>
                <span className="w-12 text-center text-sm">{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={zoomIn} className="rounded bg-white/10 px-2 py-1 ring-1 ring-white/20 hover:ring-cyan-300">
                  +
                </button>
                <button type="button" onClick={() => setZoom(1)} className="rounded bg-white/10 px-2 py-1 text-sm ring-1 ring-white/20 hover:ring-cyan-300">
                  Reset
                </button>
                <button type="button" onClick={closeGalleryModal} className="rounded bg-white/10 px-2 py-1 ring-1 ring-white/20 hover:ring-red-300">
                  Close
                </button>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[auto_1fr_auto] items-center gap-2 p-3 md:p-4">
              <button
                type="button"
                onClick={goToPrevImage}
                className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 hover:ring-cyan-300"
                aria-label="Previous image"
              >
                {"<"}
              </button>

              <div className="relative flex h-full items-center justify-center overflow-auto rounded-md bg-black/40 ring-1 ring-white/10">
                {isImageLoading && !imageLoadError && <div className="text-sm text-white/70">Loading image...</div>}
                {imageLoadError && <div className="text-sm text-red-300">Image gagal dimuat. Coba gambar lain.</div>}
                <img
                  key={activeGalleryImages[currentImageIndex]}
                  src={activeGalleryImages[currentImageIndex]}
                  alt={`${activeGroup} ${currentImageIndex + 1}`}
                  className={`max-h-full max-w-full object-contain transition-transform duration-200 ${imageLoadError ? "hidden" : "block"}`}
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
    </main>
  );
}
