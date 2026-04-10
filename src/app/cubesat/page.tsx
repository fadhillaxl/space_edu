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
    <div className="flex flex-col items-center space-y-4">
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
        <p className="text-white/70 text-sm mt-6">Click to {isRotating ? "stop" : "start"} rotation</p>
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
    <main className="p-4 space-y-8 max-w-6xl mx-auto" id="top">
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

        <section id="sejarah" className="grid gap-6">
            <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
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
                <p className="text-white/75 mb-10">2013: Ledakan jumlah peluncuran komersial.</p>
                <CubeSat />
            </article>
        </section>

<section id="model" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
<article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <ModelViewer title="CubeSat 3D Model" />
            </article>
</section>

        <section id="teknologi" className="grid md:grid-cols-2 gap-6">
            <article className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-semibold text-cyan-300 mb-4">Teknologi CubeSat</h2>
                <div className="space-y-3">
                {cubesatParts.map((part, index) => (
                    <div key={index} className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
                    <h3 className="font-medium text-cyan-200">{part.name}</h3>
                    <p className="text-sm text-white/70">{part.description}</p>
                    </div>
                ))}
                </div>
            </article>
        </section>

        <section id="media" className="grid md:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <VideoPlayer src="/public/video/CubesatVid.mp4" title="CubeSat Video" />
            </article>
        </section>

        <section id="irvine" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Irvine CubeSat STEM Program (ICSP)</h2>
        <p className="text-white/75 mb-4">Program ini sangat istimewa karena melibatkan siswa SMA di Irvine, California untuk membangun satelit tingkat lanjut.</p>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <p className="text-sm font-medium">Irvine 01</p>
            <p className="text-sm text-white/75">Diluncurkan pada 2018 (setelah beberapa penundaan). Satelit 1U ini membawa kamera resolusi rendah untuk mengambil gambar bintang dan mengajarkan navigasi optik kepada siswa.</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <p className="text-sm font-medium">Irvine 02</p>
            <p className="text-sm text-white/75">Satelit berikutnya yang lebih canggih, berfokus pada pengujian sistem propulsi elektrik (Electrospray Thruster) untuk manuver di orbit rendah Bumi.</p>
            </div>
        </div>
        </section>

        <section id="aplikasi" className="rounded-lg ring-1 ring-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Aplikasi CubeSat</h2>
        <p className="text-white/75 mb-4">
            CubeSat digunakan dalam berbagai bidang untuk mendukung penelitian dan teknologi modern.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <h3 className="text-sm font-medium text-cyan-200">Observasi Bumi</h3>
            <p className="text-sm text-white/70 mt-2">Pemantauan perubahan iklim, deforestasi, dan manajemen bencana.</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <h3 className="text-sm font-medium text-cyan-200">Komunikasi IoT</h3>
            <p className="text-sm text-white/70 mt-2">Menyediakan konektivitas global untuk perangkat di area terpencil.</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <h3 className="text-sm font-medium text-cyan-200">Eksplorasi Luar Angkasa</h3>
            <p className="text-sm text-white/70 mt-2">Misi pendamping ke Mars (seperti MarCO) atau Bulan.</p>
            </div>
            <div className="rounded-md bg-black/20 p-3 ring-1 ring-white/10">
            <h3 className="text-sm font-medium text-cyan-200">Eksperimen Biologi</h3>
            <p className="text-sm text-white/70 mt-2">Menguji pertumbuhan sel atau benih dalam kondisi mikrogravitasi.</p>
            </div>
        </div>
        </section>

        <div className="pb-4">
        <a href="#top" className="inline-flex text-sm px-3 py-1 rounded-md bg-white/5 ring-1 ring-white/20 hover:ring-cyan-300">
            Kembali ke atas
        </a>
        </div>
    </main>
    );
}