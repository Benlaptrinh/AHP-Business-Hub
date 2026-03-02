import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PROJECTS } from "../data/projects";

export default function ProjectsCarousel() {
  // Lấy 6 dự án ngẫu nhiên
  const featuredProjects = useMemo(() => {
    const shuffled = [...PROJECTS].sort(() => Math.random() - 0.5);
    const deduped = [];
    const seen = new Set();

    for (const project of shuffled) {
      if (seen.has(project.id)) continue;
      seen.add(project.id);
      deduped.push(project);
      if (deduped.length === 6) break;
    }

    return deduped;
  }, []);
  return (
    <section className="relative py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl font-extrabold text-central-orange sm:text-3xl">Dự án</h2>
          <div className="mt-2 h-[3px] w-24 bg-central-orange" />
        </div>
      </div>

      {/* Custom nav buttons (đặt ngoài để tràn mép) */}
      <button
        className="projects-prev absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded bg-central-blue text-white/90 hover:opacity-90 sm:left-4"
        aria-label="Previous"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        className="projects-next absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded bg-central-blue text-white/90 hover:opacity-90 sm:right-4"
        aria-label="Next"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="mx-auto max-w-[1600px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          speed={700}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ nextEl: ".projects-next", prevEl: ".projects-prev" }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.05 }, // hơi lộ item kế bên
            640: { slidesPerView: 1.5 }, // tablet dọc
            768: { slidesPerView: 2 }, // tablet ngang
            1024: { slidesPerView: 3 }, // desktop
            1440: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className="px-4 sm:px-6"
        >
          {featuredProjects.map((p) => (
            <SwiperSlide key={p.id}>
              <Link to={`/du-an/${p.id}`} className="block h-full">
                <article className="group relative h-full">
                  <div className="relative overflow-hidden rounded-sm shadow-[0_6px_20px_rgba(0,0,0,.08)]">
                    {/* Image */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay mờ + gradient dưới */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Caption */}
                    <div className="absolute inset-x-4 bottom-4">
                      <div className="flex items-stretch">
                        <span className="mr-3 w-1.5 bg-central-orange" />
                        <h3 className="text-sm font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow sm:text-base md:text-lg">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
