import {
  ArrowUpRight,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  Ruler,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HOME_NEWS } from "../../data/homeNews";
import { PROJECTS } from "../../data/projects";

export default function ProjectsDetail() {
  const { id } = useParams();
  let project = null;
  let currentIndex = -1;
  let projectSource = "project";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top khi component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tìm thông tin theo id trong PROJECTS hoặc HOME_NEWS
  const sources = [
    { data: PROJECTS, type: "project" },
    { data: HOME_NEWS, type: "construction-log" },
  ];
  for (const src of sources) {
    const idx = src.data.findIndex((p) => p.id === id);
    if (idx >= 0) {
      project = src.data[idx];
      currentIndex = idx;
      projectSource = src.type;
      break;
    }
  }

  // Không tìm thấy project → về trang /du-an
  if (!project || currentIndex === -1) {
    return <Navigate to="/du-an" replace />;
  }

  const isConstructionLog = projectSource === "construction-log";

  // Lấy 6 dự án liên quan tùy theo nguồn dữ liệu
  let related = [];
  if (isConstructionLog) {
    const sameRegion = HOME_NEWS.filter(
      (p) => p.id !== project.id && project.region && p.region === project.region
    );
    const otherLogs = HOME_NEWS.filter((p) => p.id !== project.id);
    related = sameRegion
      .concat(otherLogs)
      .filter((item, idx, arr) => arr.findIndex((r) => r.id === item.id) === idx)
      .slice(0, 6);
    if (!related.length) {
      related = PROJECTS.slice(0, 6);
    }
  } else {
    related = PROJECTS.filter(
      (p) => p.id !== project.id && (p.category === project.category || p.region === project.region)
    )
      .slice(0, 6)
      .concat(PROJECTS.filter((p) => p.id !== project.id).slice(0, 6))
      .slice(0, 6);
  }

  const infoItems = [
    { label: "Khách hàng", value: project.client || "Đang cập nhật" },
    { label: "Vị trí", value: project.location || "Đang cập nhật" },
    { label: "Phạm vi công việc", value: project.scope || "Đang cập nhật" },
    { label: "Thời gian", value: project.time || "Đang cập nhật" },
  ];

  const overviewImages = project.gallery?.length ? project.gallery : [project.image];

  // Pagination calculations
  const totalPages = Math.ceil(overviewImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = overviewImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const rawParagraphs = Array.isArray(project.paragraphs)
    ? project.paragraphs
    : [project.desc, project.content].filter(Boolean);
  const contentParagraphs = rawParagraphs
    .flatMap((paragraph) => {
      if (typeof paragraph !== "string") return [paragraph];
      return paragraph.split(/\n{2,}/);
    })
    .map((paragraph) => (typeof paragraph === "string" ? paragraph.trim() : paragraph))
    .filter(Boolean);

  const badgeLabel = isConstructionLog
    ? "Nhật ký thi công"
    : project.category === "biet-thu-tan-co-dien"
      ? "Villa"
      : project.category === "nha-pho-hien-dai"
        ? "Nhà phố"
        : project.category === "resort"
          ? "Resort"
          : "Dự án";

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % overviewImages.length);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + overviewImages.length) % overviewImages.length);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section với Parallax */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <img
            src={project.image}
            alt={project.title}
            className="h-[110%] w-full object-cover object-center"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-slate-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/70" />

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/5 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 pt-8">
            <nav className="flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="flex items-center gap-1 transition hover:text-white">
                <Home className="h-4 w-4" />
                <span>Trang chủ</span>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/du-an" className="transition hover:text-white">
                Dự án
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{project.title}</span>
            </nav>
          </div>

          {/* Title */}
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-300">
                  {badgeLabel}
                </span>
              </div>
              <h1 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 text-lg text-white/80">{project.desc?.slice(0, 150)}...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="relative -mt-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-900/5 md:grid-cols-2 lg:grid-cols-4 transition hover:shadow-orange-100">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-orange-500/5" />
                <span className="relative text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
                  {item.label}
                </span>
                <p className="relative mt-2 text-base font-bold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
          <article className="max-w-3xl">
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">{project.title}</h2>
            <div className="mt-6 space-y-6 text-[17px] leading-8 text-slate-700">
              {contentParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="lg:pl-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-600">
                Thông tin dự án
              </h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <InfoLine
                  label="Khách hàng"
                  value={project.client}
                  icon={<Building2 className="size-4" />}
                />
                <InfoLine
                  label="Địa điểm"
                  value={project.location}
                  icon={<MapPin className="size-4" />}
                />
                <InfoLine
                  label="Quy mô"
                  value={project.scope}
                  icon={<Ruler className="size-4" />}
                />
                <InfoLine
                  label="Năm"
                  value={project.time || project.year}
                  icon={<Calendar className="size-4" />}
                />
                {project.region && (
                  <InfoLine
                    label="Khu vực"
                    value={project.region}
                    icon={<UsersRound className="size-4" />}
                  />
                )}
              </div>
              <Link
                to="/du-an"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline"
              >
                Dự án khác
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery với Masonry Layout */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="mb-10">
          <h3 className="text-3xl font-black text-slate-900 md:text-4xl">Hình ảnh tổng quan</h3>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {currentImages.map((img, idx) => {
            const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx;
            return (
              <figure
                key={globalIndex}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-900/5 cursor-pointer transition duration-500 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => openLightbox(globalIndex)}
              >
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-slate-100 p-3 sm:p-4">
                  <img
                    src={img}
                    alt={`${project.title} - Ảnh ${globalIndex + 1}`}
                    className="max-h-full max-w-full object-contain transition duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </figure>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${currentPage === page
                  ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "border-slate-200 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Đóng"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={overviewImages[currentImageIndex]}
              alt={`Ảnh ${currentImageIndex + 1}`}
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
            />
            <div className="mt-4 text-center text-sm text-white/80">
              {currentImageIndex + 1} / {overviewImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Related Projects với Swiper */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-black text-slate-900 md:text-4xl">Dự án tương tự</h3>
              <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
            </div>
            <Link
              to="/du-an"
              className="hidden items-center gap-2 text-sm font-bold text-orange-600 md:flex"
            >
              Xem tất cả
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <button className="related-prev absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl ring-1 ring-slate-900/5 lg:block">
              <ChevronLeft className="h-6 w-6 text-slate-700" />
            </button>
            <button className="related-next absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl ring-1 ring-slate-900/5 lg:block">
              <ChevronRight className="h-6 w-6 text-slate-700" />
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: ".related-prev",
                nextEl: ".related-next",
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-4"
            >
              {related.map((p) => (
                <SwiperSlide key={p.id}>
                  <RelatedCard p={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/du-an"
              className="inline-flex items-center gap-2 rounded-full border-2 border-orange-500 bg-orange-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25"
            >
              Xem tất cả dự án
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoLine({ label, value, icon }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex-shrink-0 text-orange-500">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-800 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

function RelatedCard({ p }) {
  return (
    <Link
      to={`/du-an/${p.id}`}
      className="group block h-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-900/5 transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-orange-500/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transform transition duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-orange-600 backdrop-blur-sm">
          {p.year}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600">
          <MapPin className="h-3 w-3" />
          <span>{p.location}</span>
        </div>
        <h4 className="mb-3 text-lg font-black text-slate-900 line-clamp-2">{p.title}</h4>
        <p className="mb-4 text-sm text-slate-600 line-clamp-2">{p.desc}</p>
        <span className="inline-flex items-center gap-2 text-sm font-bold text-orange-600">
          Xem chi tiết
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
