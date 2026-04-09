"use client";

import MediaShowcase from "@/components/MediaShowcase";

export default function Page() {
  return (
    <main className="p-4 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-12">
        <section className="lg:col-span-5 lg:sticky lg:top-4 lg:self-start">
          <MediaShowcase
            title="Energia-Buran Showcase"
            description="A combined presentation with video, images, and an interactive 3D viewer."
            referenceUrl="https://www.artstation.com/artwork/LznQv"
            videoSrc="/space-edu-3d/video/RocketLaunchEnergia-Buran720.mp4"
            imageSrcs={["/space-edu-3d/globe.svg", "/space-edu-3d/window.svg", "/space-edu-3d/file.svg"]}
            modelUrl="/space-edu-3d/models/space_shuttle_buran.glb"
          />
        </section>

        <section className="space-y-4 lg:col-span-7">
          <article className="rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-950/40 to-black/40 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/80">Museum Panel</p>
            <h1 className="mt-2 text-2xl font-semibold">Buran-Energia</h1>
            <p className="mt-3 text-white/80">
              Selamat datang di studi komparatif teknologi luar angkasa. Di panel ini, kita membedah anatomi
              Buran (OK-1K1), sistem yang lahir dari persaingan geopolitik namun menghasilkan inovasi
              otomatisasi yang melampaui masanya.
            </p>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Section I</p>
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
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Section II</p>
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
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Section III</p>
            <h2 className="mt-1 text-xl font-semibold">Rekayasa Propulsi: Mesin RD-170</h2>
            <p className="mt-2 text-white/80">
              Di bawah roket Energia terdapat mesin RD-170, salah satu puncak rekayasa mesin roket Uni Soviet.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-white/80">
              <li>Staged combustion cycle membakar ulang gas turbin ke ruang bakar utama untuk efisiensi tinggi.</li>
              <li>Mesin dapat throttleable dan nozelnya bergerak untuk menjaga presisi arah roket.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/15 bg-black/30 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">Section IV</p>
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
      </div>
    </main>
  );
}
