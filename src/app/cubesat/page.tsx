"use client";

import { useState } from "react";
import VideoPlayer from "@/components/media/VideoPlayer";
import ModelViewer from "@/components/media/ModelViewer";

interface CubeSatFaceProps {
    label: string;
    className?: string;
}

const CubeSatFace: React.FC<CubeSatFaceProps> = ({ label, className = "" }) => (
    <div className={`absolute w-24 h-24 border border-cyan-400/30 bg-black/20 flex items-center justify-center text-cyan-300 text-xs font-semibold ${className}`}>
        {label}
    </div>
);

interface CubeSatProps {
    size?: number;
    faces?: string[];
}

const CubeSat: React.FC<CubeSatProps> = ({ size = 100, faces = ["Front", "Back", "Right", "Left", "Top", "Bottom"] }) => {
    const [isRotating, setIsRotating] = useState(true);

const faceClasses = [
    "transform translate-z-12", // front
    "transform rotate-y-180 translate-z-12", // back
    "transform rotate-y-90 translate-z-12", // right
    "transform -rotate-y-90 translate-z-12", // left
    "transform rotate-x-90 translate-z-12", // top
    "transform -rotate-x-90 translate-z-12", // bottom
];

return (
    <div className="flex flex-col items-center space-y-6 p-4">
        <div
        className="relative preserve-3d cursor-pointer"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            perspective: "1000px",
        }}
        onClick={() => setIsRotating(!isRotating)}
    >
        <div
          className={`relative w-full h-full transform-style-preserve-3d ${isRotating ? "animate-spin" : ""}`}
            style={{
            animation: isRotating ? "spin 10s linear infinite" : "none",
            }}
        >
            {faces.map((face, index) => (
            <CubeSatFace key={face} label={face} className={faceClasses[index]} />
            ))}
        </div>
        </div>
        <p className="text-white/70 text-sm text-center">Click to {isRotating ? "stop" : "start"} rotation</p>
        <style jsx>{`
        .preserve-3d {
            transform-style: preserve-3d;
        }
        .transform-style-preserve-3d {
            transform-style: preserve-3d;
        }
        .translate-z-12 {
            transform: translateZ(48px);
        }
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
        .rotate-y-90 {
            transform: rotateY(90deg);
        }
        .-rotate-y-90 {
            transform: rotateY(-90deg);
        }
        .rotate-x-90 {
            transform: rotateX(90deg);
        }
        .-rotate-x-90 {
            transform: rotateX(-90deg);
        }
        @keyframes spin {
            from {
            transform: rotateX(0) rotateY(0);
            }
            to {
            transform: rotateX(360deg) rotateY(360deg);
            }
        }
    `}</style>
    </div>
);
};

export default function Page() {
    const cubesatParts = [
    { name: "Struktur (1U - 12U)", description: "Menggunakan material ringan seperti Aluminium 7075 atau 6061. Skalabilitas adalah kunci, mulai dari 1U hingga 12U." },
    { name: "COTS Components", description: "Menggunakan komponen Commercial Off-The-Shelf (seperti sensor smartphone) untuk menekan biaya produksi secara drastis." },
    { name: "P-POD Deployer", description: "Sistem peluncur standar yang memastikan CubeSat keluar dari roket tanpa membahayakan satelit utama." },
    ];

    return (
    <main className="p-6 space-y-8 max-w-6xl mx-auto" id="top">
        <nav className="sticky top-4 z-10 rounded-lg ring-1 ring-cyan-400/30 bg-[#0b0d17]/90 backdrop-blur p-3">
        <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Navigasi Cepat</p>
        <div className="flex flex-wrap gap-2 text-sm">
            <a href="#sejarah" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Sejarah</a>
            <a href="#teknologi" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Teknologi</a>
            <a href="#irvine" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Irvine Program</a>
            <a href="#aplikasi" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Aplikasi</a>
            <a href="#media" className="px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/15 hover:ring-cyan-300">Media</a>
        </div>
        </nav>

        <section className="rounded-xl overflow-hidden ring-1 ring-white/10">
        <div className="text-center p-8 bg-gradient-to-r from-cyan-950 to-black">
            <h1 className="text-3xl font-bold text-cyan-300 mb-4">CubeSat Exploration</h1>
            <p className="text-white/75">Discover the miniature satellites revolutionizing space technology</p>
        </div>
        </section>

        <section id="sejarah" className="space-y-6">
            <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-cyan-300 mb-4">Sejarah Cubesat</h2>
                <p className="text-white/75 mb-4">
                Proyek CubeSat dimulai pada tahun 1999 sebagai kolaborasi antara Profesor Jordi Puig-Suari dari California Polytechnic State University dan Profesor Bob Twiggs dari Stanford University.
                </p>
                <p className="text-white/75 mb-4">
                Tujuan awalnya bukan untuk misi militer atau komersial besar, melainkan untuk memberikan kesempatan kepada mahasiswa untuk merancang, membangun, dan menguji satelit fungsional dalam batasan biaya dan waktu yang masuk akal selama masa kuliah mereka.
                </p>
                <p className="text-white/75 mb-4">
                Standar 1U (satu unit) ditetapkan berukuran $10 \times 10 \times 11.35$ cm, yang cukup kecil untuk dibawa sebagai muatan sekunder pada roket peluncur.
                </p>
                <p className="text-white/75 mb-4">Milestones:</p>
                <p className="text-white/75">1999: Standar CubeSat diperkenalkan.</p>
                <p className="text-white/75">2003: Peluncuran pertama CubeSat ke orbit (6 satelit).</p>
                <p className="text-white/75 mb-6">2013: Ledakan jumlah peluncuran komersial.</p>
                <div className="mt-8">
                    <CubeSat />
                </div>
            </article>
        </section>

<section id="model" className="space-y-6">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <ModelViewer title="CubeSat 3D Model" />
            </article>
</section>

        <section id="gallery" className="space-y-6">
            <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-cyan-300 mb-4">CubeSat Illustration</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80">
                        <img
                            src="/space-edu-3d/image/cubesat-gallery/NASA_CUBESAT_ILLUSTRATION.jpg"
                            alt="NASA CubeSat"
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80">
                        <img
                            src="/space-edu-3d/image/cubesat-gallery/NASA_CUBESAT.jpg"
                            alt="NASA CubeSat"
                            className="w-full object-cover"
                        />
                    </div>
                </div>
                <div className="space-y-4 mt-6 text-white/75">
                    <div className="rounded-md bg-black/20 p-4 ring-1 ring-white/10">
                        <p>
                            Beberapa CubeSat terlihat mengorbit di atas Bumi dengan latar ruang angkasa yang gelap dan lengkungan planet yang terlihat jelas di bawahnya. Pada salah satu bagian, tampak CubeSat lebih dekat dengan panel surya yang terbuka untuk menyerap energi matahari, sementara satelit lainnya terlihat berjajar di kejauhan. Gambaran ini menunjukkan bagaimana satelit kecil dapat bekerja secara bersamaan dalam satu orbit, baik untuk komunikasi, penelitian, maupun eksperimen teknologi, dengan desain yang ringkas namun tetap efisien.                        </p>
                    </div>
                </div>
            </article>
        </section>

        <section id="teknologi" className="space-y-6">
            <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-cyan-300 mb-4">Teknologi CubeSat</h2>
                <div className="space-y-4">
                {cubesatParts.map((part, index) => (
                    <div key={index} className="rounded-md bg-black/20 p-4 ring-1 ring-white/10">
                    <h3 className="font-medium text-cyan-200 mb-2">{part.name}</h3>
                    <p className="text-sm text-white/70">{part.description}</p>
                    </div>
                ))}
                </div>
            </article>
        </section>

        <section id="media" className="space-y-6">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <VideoPlayer src="/space-edu-3d/video/CubeSatsVid.mp4" title="CubeSat Video" />
            </article>
        </section>

<section id="irvine" className="space-y-6">
            <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-cyan-300 mb-4">Irvine CubeSat STEM Program (ICSP)</h2>
                <p className="text-white/75 mb-6">Program ini sangat istimewa karena melibatkan siswa SMA di Irvine, California untuk membangun satelit tingkat lanjut.</p>

                <div className="grid md:grid-cols-2 gap-6">
                    <article
                        id="ap101"
                        tabIndex={0}
                        className="group rounded-lg ring-1 ring-white/10 bg-white/5 p-4 scroll-mt-28 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition"
                    >
                        <p className="text-sm font-medium">Irvine 01</p>
                        <p className="text-sm text-white/75">Diluncurkan pada 2018 (setelah beberapa penundaan). Satelit 1U ini membawa kamera resolusi rendah untuk mengambil gambar bintang dan mengajarkan navigasi optik kepada siswa.</p>

                        <p className="text-xs uppercase tracking-wider text-cyan-300 mt-2">Klik untuk detail lengkap</p>
                        <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[1000px] group-hover:opacity-100 group-focus:max-h-[1000px] group-focus:opacity-100 transition-all duration-300">
                            <p className="text-white/75 mt-1">
                            <strong>&quot;Detail pengembangan:&quot;</strong>.
                            </p>
                            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
                            <li>
                                Menggunakan format 1U CubeSat (10x10x10 cm)
                            </li>
                            <li>
                                Dibekali kamera resolusi rendah untuk pengambilan gambar luar angkasa
                            </li>
                            <li>
                                Fokus utama: edukasi navigasi optik dan sistem dasar satelit
                            </li>
                            </ul>

                            <p className="text-white/75 mt-4">
                            <strong>&quot;Fungsi & pembelajaran:&quot;</strong>.
                            </p>
                            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
                            <li>
                                Mengajarkan cara satelit menentukan posisi menggunakan bintang (star tracking)
                            </li>
                            <li>
                                Memberikan data nyata untuk dianalisis siswa
                            </li>
                            <li>
                                Menjadi dasar pengembangan untuk misi berikutnya
                            </li>
                            </ul>

                            <p className="text-white/75 mt-4">
                            <strong>&quot;Tantangan:&quot;</strong>.
                            </p>
                            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
                            <li>
                                Keterbatasan ukuran → semua komponen harus mini
                            </li>
                            <li>
                                Daya listrik terbatas → harus efisien
                            </li>
                            <li>
                                Komunikasi dengan bumi yang terbatas
                            </li>
                            </ul>
                        </div>
                    </article>

                    <article
                        id="ap102"
                        tabIndex={0}
                        className="group rounded-lg ring-1 ring-white/10 bg-white/5 p-4 scroll-mt-28 hover:ring-cyan-300 focus:ring-cyan-300 outline-none transition"
                    >
                        <p className="text-sm font-medium">Irvine 02</p>
                        <p className="text-sm text-white/75">Satelit berikutnya yang lebih canggih, berfokus pada pengujian sistem propulsi elektrik (Electrospray Thruster) untuk manuver di orbit rendah Bumi.</p>

                        <p className="text-xs uppercase tracking-wider text-cyan-300 mt-2">Klik untuk detail lengkap</p>
                        <div className="mt-3 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[1000px] group-hover:opacity-100 group-focus:max-h-[1000px] group-focus:opacity-100 transition-all duration-300">
                            <p className="text-white/75 mt-1">
                            <strong>&quot;Fitur utama:&quot;</strong>.
                            </p>
                            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
                            <li>
                                Fokus pada sistem propulsi elektrik (Electrospray Thruster)
                            </li>
                            <li>
                                Digunakan untuk manuver orbit rendah (LEO)
                            </li>
                            </ul>

                            <p className="text-white/75 mt-4">
                            <strong>&quot;Penjelasan teknis:&quot;</strong>.
                            </p>
                            <ul className="mt-3 list-disc pl-5 text-white/80 space-y-2">
                            <li>
                                Electrospray Thruster bekerja dengan menyemprotkan partikel bermuatan listrik untuk menghasilkan dorongan kecil tapi presisi tinggi
                            </li>
                            <li>
                                Lebih hemat bahan bakar dibanding propulsi konvensional
                            </li>
                            </ul>

                            <p className="text-white/75 mt-4">
                            <strong>&quot;Tujuan dan Manfaat&quot;</strong>.
                            </p>
                            <p className="text-white/75 mt-1">Pengembangan teknologi pada CubeSat ini bertujuan untuk menguji kemampuan satelit berukuran kecil dalam melakukan manuver dan mengubah posisi orbitnya secara mandiri, sehingga tidak hanya berfungsi sebagai objek yang mengorbit secara pasif, tetapi juga mampu menjalankan misi yang lebih dinamis dan kompleks. Dengan adanya kemampuan ini, CubeSat dapat membuka peluang baru dalam pengembangan misi luar angkasa yang lebih canggih, seperti pembentukan formasi satelit yang terkoordinasi, navigasi dengan tingkat presisi yang tinggi, serta pelaksanaan misi eksplorasi berskala kecil yang lebih efisien dan ekonomis. Manfaat dari pengembangan ini sangat relevan untuk kebutuhan teknologi masa depan, terutama dalam meningkatkan fleksibilitas dan efektivitas penggunaan satelit dalam berbagai bidang, termasuk penelitian ilmiah, komunikasi, dan eksplorasi luar angkasa.</p>
                        </div>
                    </article>
                </div>
            </article>
        </section>

        <section id="aplikasi" className="space-y-6">
            <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-cyan-300 mb-4">Aplikasi CubeSat</h2>
                <p className="text-white/75 mb-6">
                    CubeSat digunakan dalam berbagai bidang untuk mendukung penelitian dan teknologi modern.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-md bg-black/20 p-4 ring-1 ring-white/10">
                        <h3 className="text-sm font-medium text-cyan-200 mb-2">Observasi Bumi</h3>
                        <p className="text-sm text-white/70">Pemantauan perubahan iklim, deforestasi, dan manajemen bencana.</p>
                    </div>
                    <div className="rounded-md bg-black/20 p-4 ring-1 ring-white/10">
                        <h3 className="text-sm font-medium text-cyan-200 mb-2">Komunikasi IoT</h3>
                        <p className="text-sm text-white/70">Menyediakan konektivitas global untuk perangkat di area terpencil.</p>
                    </div>
                    <div className="rounded-md bg-black/20 p-4 ring-1 ring-white/10">
                        <h3 className="text-sm font-medium text-cyan-200 mb-2">Eksplorasi Luar Angkasa</h3>
                        <p className="text-sm text-white/70">Misi pendamping ke Mars (seperti MarCO) atau Bulan.</p>
                    </div>
                    <div className="rounded-md bg-black/20 p-4 ring-1 ring-white/10">
                        <h3 className="text-sm font-medium text-cyan-200 mb-2">Eksperimen Biologi</h3>
                        <p className="text-sm text-white/70">Menguji pertumbuhan sel atau benih dalam kondisi mikrogravitasi.</p>
                    </div>
                </div>
            </article>
        </section>

        <div className="pt-8 pb-4 flex justify-center">
        <a href="#top" className="inline-flex text-sm px-4 py-2 rounded-md bg-white/5 ring-1 ring-white/20 hover:ring-cyan-300 transition-colors">
            Kembali ke atas
        </a>
        </div>
    </main>
    );
}