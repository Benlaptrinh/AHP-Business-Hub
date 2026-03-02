import { Play, X } from "lucide-react";
import { useState } from "react";

const VIDEOS = [
  {
    id: 1,
    title: "AN HỒNG PHÁT — Thiết Kế & Xây Dựng",
    thumbnail: "/assets/image9.png",
    url: "https://www.youtube.com/embed/5hf2he-NLkM",
  },
  {
    id: 2,
    title: "Hành trình phát triển",
    thumbnail: "/assets/image10.png",
    url: "https://www.youtube.com/embed/K8WarQ0S4nI",
  },
  {
    id: 3,
    title: "Văn hoá doanh nghiệp",
    thumbnail: "/assets/image11.png",
    url: "https://www.youtube.com/embed/5hf2he-NLkM",
  },
];

export default function VideosSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="relative py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Videos</h3>

        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
          {VIDEOS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVideo(v)}
              className="group relative block overflow-hidden rounded-md border bg-white shadow-[0_6px_18px_rgba(0,0,0,.06)] focus:outline-none"
            >
              <img
                src={v.thumbnail}
                alt={v.title}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
              {/* Play button */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid size-14 place-items-center rounded-full bg-white/95 text-orange-600 shadow-lg transition group-hover:scale-105">
                  <Play className="size-6" />
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-3">
                <div className="flex items-stretch">
                  <span className="mr-3 w-1.5 bg-orange-600" />
                  <h4 className="text-sm font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow">
                    {v.title}
                  </h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          {/* Container stop propagation */}
          <div
            className="relative aspect-video w-full max-w-3xl rounded-md bg-black shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="size-full rounded-md"
              src={`${activeVideo.url}?autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white transition hover:text-orange-500"
              aria-label="Đóng video"
            >
              <X className="size-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
