import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NEWS, NEWS_CATEGORIES } from "../../data/news";

// ===== helpers =====
function formatDate(iso) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return { d: dd, m: `TH${mm}` };
}
function byNewest(a, b) {
  return new Date(b.date) - new Date(a.date);
}

const PAGE_SIZE = 6; // bạn có thể chỉnh 6/9/12 tuỳ ý

export default function NewsListPage({ title, category = NEWS_CATEGORIES.PROJECTS.key }) {
  const [search, setSearch] = useSearchParams();
  const pageFromUrl = Number(search.get("page") || 1);

  // Lọc theo category nếu có, sau đó sắp xếp mới -> cũ
  const sorted = React.useMemo(() => {
    const baseList = NEWS.filter((n) => n.category === category).slice(0, 15);
    return [...baseList].sort(byNewest);
  }, [category]);

  const [featured, rightList, rest] = React.useMemo(() => {
    if (!sorted.length) return [null, [], []];
    return [sorted[0], sorted.slice(1, 4), sorted.slice(4)];
  }, [sorted]);

  // ===== Pagination cho phần "Tin tức khác" =====
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, pageFromUrl), totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const paged = rest.slice(start, start + PAGE_SIZE);

  const goPage = (p) => {
    setSearch(p > 1 ? { page: String(p) } : {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categoryInfo = React.useMemo(() => {
    if (!category) return null;
    return Object.values(NEWS_CATEGORIES).find((c) => c.key === category) || null;
  }, [category]);

  const displayTitle = title ?? categoryInfo?.label ?? "Tin tức";

  if (!featured) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800">{displayTitle}</h2>
        <p className="mt-2 text-slate-500">Hiện chưa có tin tức phù hợp với danh mục này.</p>
        <Link to="/tin-tuc" className="mt-4 inline-block text-orange-600 font-semibold">
          Quay lại trang tin tức &rsaquo;
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* ==== VÙNG TIN NỔI BẬT ==== */}
      <section className="container mx-auto px-4 pt-4">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{displayTitle}</h1>
          <div className="mt-2 h-[3px] w-16 rounded bg-orange-500" />
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* card nổi bật bên trái */}
          <Link
            to={`/tin-tuc/${featured.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="aspect-[16/9] w-full">
              <img
                src={featured.cover}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="eager"
              />
            </div>

            {/* date badge */}
            <div className="absolute left-4 top-4 rounded-xl bg-white/95 px-3 py-2 text-center shadow">
              <div className="text-2xl font-extrabold leading-none text-slate-900">
                {formatDate(featured.date).d}
              </div>
              <div className="mt-1 text-[11px] font-semibold tracking-wider text-gray-500">
                {formatDate(featured.date).m}
              </div>
            </div>

            <div className="bg-gray-50 p-5 md:p-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-orange-600">
                {featured.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-gray-700 md:text-lg">{featured.excerpt}</p>
              <span className="mt-4 inline-block font-semibold text-orange-600">
                Xem thêm &rsaquo;
              </span>
            </div>
          </Link>

          {/* cột phải: 3 bài mới */}
          <aside className="space-y-4">
            {rightList.map((n) => (
              <Link
                key={n.id}
                to={`/tin-tuc/${n.slug}`}
                className="group flex gap-3 rounded-2xl border border-gray-200 p-3 shadow-sm transition hover:shadow-md"
              >
                <div className="h-20 w-28 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={n.cover}
                    alt={n.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-gray-500">
                    {formatDate(n.date).d} <span className="ml-1">{formatDate(n.date).m}</span>
                  </div>
                  <h3 className="line-clamp-2 font-bold text-slate-900 group-hover:text-orange-600">
                    {n.title}
                  </h3>
                  <span className="mt-1 inline-block text-[12px] font-semibold text-orange-600">
                    Xem thêm &rsaquo;
                  </span>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      {/* ===== TIN TỨC KHÁC ===== */}
      <section className="container mx-auto px-4 pt-8 pb-12">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900">Tin tức khác</h2>
          <span className="h-[2px] w-16 rounded bg-orange-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paged.map((n) => (
            <Link
              key={n.id}
              to={`/tin-tuc/${n.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={n.cover}
                  alt={n.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="text-[11px] font-semibold text-gray-500">
                  {formatDate(n.date).d} <span className="ml-1">{formatDate(n.date).m}</span>
                </div>
                <h3 className="mt-1 line-clamp-2 font-bold text-slate-900 group-hover:text-orange-600">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{n.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-orange-600">
                  Xem chi tiết &rsaquo;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1">
            <button
              onClick={() => goPage(page - 1)}
              disabled={page === 1}
              className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={`rounded-lg border px-3 py-1 text-sm ${
                  p === page ? "border-orange-600 bg-orange-600 text-white" : "hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goPage(page + 1)}
              disabled={page === totalPages}
              className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40"
            >
              ›
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
