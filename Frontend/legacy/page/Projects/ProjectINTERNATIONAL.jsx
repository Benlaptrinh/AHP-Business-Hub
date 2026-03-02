import { Link, useSearchParams } from "react-router-dom";
import { PROJECTS, PROJECT_CATEGORIES } from "../../data/projects";

const PAGE_SIZE = 6;

export default function ProjectINTERNATIONAL() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page") || 1));

  // Lọc dự án theo category INTERNATIONAL
  const filteredProjects = PROJECTS.filter((p) => p.category === PROJECT_CATEGORIES.INTERNATIONAL);

  const total = filteredProjects.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = filteredProjects.slice(start, end);

  const goPage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setParams(next === 1 ? {} : { page: String(next) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Dự Án Quốc Tế</h2>

      {/* 1 hàng = 1 item */}
      <div className="space-y-6 md:space-y-8">
        {pageData.map((p) => (
          <Link
            key={p.id}
            to={`/du-an/${p.id}`}
            className="block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="grid md:grid-cols-[320px,1fr]">
              {/* ảnh trái */}
              <div className="overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-[200px] md:h-[220px] object-cover"
                  loading="lazy"
                />
              </div>
              {/* nội dung phải */}
              <div className="p-5 md:p-6 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900">{p.title}</h3>
                <p className="text-slate-600 text-sm md:text-[15px] mt-2 line-clamp-2">{p.desc}</p>
                <span className="mt-3 text-orange-600 font-semibold text-sm">
                  Xem chi tiết &rsaquo;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* phân trang */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1">
          <button
            onClick={() => goPage(page - 1)}
            disabled={page <= 1}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-40"
          >
            Trước
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <button
                key={n}
                onClick={() => goPage(n)}
                className={`px-3 py-2 text-sm rounded-lg border ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            );
          })}
          <button
            onClick={() => goPage(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-40"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
