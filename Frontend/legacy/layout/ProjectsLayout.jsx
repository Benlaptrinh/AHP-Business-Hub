// ProjectsLayout.jsx
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const CATS = [
  { label: "TẤT CẢ", to: "/du-an" },
  // { label: "BIỆT THỰ TÂN CỔ ĐIỂN", to: "/du-an/noi-khu" },
  { label: "NHÀ PHỐ HIỆN ĐẠI", to: "/du-an/khu-dan-cu" },
  { label: "BIỆT THỰ TÂN CỔ ĐIỂN", to: "/du-an/khach-san-tttm" },
];

export default function ProjectsLayout() {
  const location = useLocation();

  return (
    <div className="bg-white">
      <section className="relative h-[500px]">
        <img
          // src="https://www.centralcons.vn/wp-content/uploads/2022/02/MAIN-IMAGE-2000-x-1080-scaled-e1645354391937.jpg"
          alt="Projects Hero"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-orange-950/85 via-orange-900/60 to-orange-900/35" />
        <div className="relative z-[2] h-full container mx-auto px-4">
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Dự Án AN HỒNG PHÁT
            </h1>
            <nav className="mt-3 flex items-center gap-2 text-white/80" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 opacity-80" />
              <span className="text-white">Dự án</span>
            </nav>
          </div>
        </div>
      </section>

      {/* ========== CATEGORY BAR (sticky) ========== */}
      <div className="bg-orange-900 text-white sticky top-[72px] md:top-[108px] z-30 shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div
            role="tablist"
            aria-label="Danh mục dự án"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3"
          >
            {CATS.map((c) => (
              <NavLink
                key={c.to}
                to={c.to}
                end
                className={({ isActive }) =>
                  [
                    "relative py-1.5 text-sm font-semibold whitespace-nowrap transition-colors",
                    isActive ? "text-orange-200" : "text-white/85 hover:text-white",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {c.label}
                    <span
                      className={[
                        "absolute left-0 -bottom-1 h-[3px] w-full rounded-full transition-opacity duration-200",
                        isActive ? "bg-orange-400 opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
