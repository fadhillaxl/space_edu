import Link from "next/link";

export default function Page() {
  return (
    <section className="grid gap-6">
      <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
        <h1 className="text-3xl font-bold">Simulasi Pembelajaran Luar Angkasa 3D</h1>
        <p className="mt-2 text-white/70">
          Eksplorasi model 3D interaktif (USA, Rusia, Satelit GEO) dengan kontrol putar, zoom, dan anotasi.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/usa" className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <h2 className="font-semibold">Modul USA</h2>
          <p className="text-sm text-white/70">Space Shuttle dan Roket Pendorong</p>
        </Link>
        <Link href="/buran" className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <h2 className="font-semibold">Modul Rusia</h2>
          <p className="text-sm text-white/70">Energiya-Buran</p>
        </Link>
        <Link href="/geo" className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <h2 className="font-semibold">Modul GEO</h2>
          <p className="text-sm text-white/70">Satelit GEO berorbit Bumi</p>
        </Link>
      </div>
      <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10">
        <h3 className="font-semibold">Aksesibilitas & Kontrol</h3>
        <ul className="mt-2 list-disc pl-6 text-white/80">
          <li>Tab untuk fokus tombol; Enter/Space untuk aktivasi.</li>
          <li>Di kanvas 3D: seret untuk memutar, gulir untuk zoom.</li>
          <li>Tekan &quot;A&quot; untuk menampilkan/sembunyikan anotasi.</li>
          <li>Tekan &quot;Spasi&quot; untuk memicu animasi singkat.</li>
        </ul>
      </div>
    </section>
  );
}