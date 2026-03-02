import { Link } from "react-router-dom";
import { HOME_NEWS } from "../data/homeNews";

export default function NewsList() {
  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Nhật Ký Công Trình Đang Thi Công
          </h2>
          {/* đường kẻ mảnh + hoa văn nhẹ */}
          <div className="mt-2 h-[3px] bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
        </div>

        {/* List */}
        <div className="divide-y divide-slate-200">
          {HOME_NEWS.map((n) => (
            <article key={n.id} className="py-5 transition-all hover:bg-gray-50/50 sm:py-6">
              <Link
                to={`/du-an/${n.id}`}
                className="group grid grid-cols-12 items-start gap-4 sm:gap-6"
                aria-label={n.title}
              >
                {/* Thumb */}
                <div className="col-span-12 sm:col-span-3">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-slate-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:aspect-[4/3]">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay khi hover */}
                    <div className="absolute inset-0 bg-central-blue/0 transition-colors duration-300 group-hover:bg-central-blue/10" />
                  </div>
                </div>

                {/* Content */}
                <div className="col-span-12 sm:col-span-9">
                  {/* Category & Date - Đổi màu khi hover */}
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 transition-colors duration-300 group-hover:text-central-orange">
                    {n.location && <span>{n.location}</span>}
                    {n.location && n.time && <span className="mx-1">|</span>}
                    {n.time && <time dateTime={n.time}>{n.time}</time>}
                    {n.client && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="normal-case text-xs font-medium text-slate-500">
                          {n.client}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title - Đổi màu khi hover */}
                  <h3 className="clamp-2 mt-2 text-lg font-extrabold text-slate-900 transition-colors duration-300 group-hover:text-central-blue sm:text-xl">
                    {n.title}
                  </h3>

                  {/* Excerpt - Đổi màu khi hover */}
                  <p className="line-clamp-3 mt-2 text-sm text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
                    {n.desc}
                  </p>

                  {/* Read more link - Hiện khi hover */}
                  <div className="mt-3 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-central-orange">
                      Xem nhật ký
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Xem tất cả */}
        <div className="mt-6 flex justify-end">
          <Link
            to="/du-an"
            className="inline-flex items-center gap-2 text-sm font-semibold text-central-blue hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>
      </div>
    </section>
  );
}
