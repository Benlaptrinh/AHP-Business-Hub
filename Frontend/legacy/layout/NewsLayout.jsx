import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const TABS = [
  { label: "Tin dự án", to: "/tin-tuc/tin-du-an" },
  { label: "Hoạt động nội bộ", to: "/tin-tuc/hoat-dong-noi-bo" },
  { label: "Hoạt động đào tạo", to: "/tin-tuc/hoat-dong-dao-tao" },
];

export default function NewsLayout() {
  const location = useLocation();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          // src="https://www.centralcons.vn/wp-content/uploads/2021/12/DJI_0683-2-scaled.jpg"
          alt="Tin tức"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] md:object-[center_20%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/80 via-orange-900/40 to-orange-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/45 via-transparent to-orange-950/40" />
        <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent opacity-90" />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-white/70">
              Central News
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-white drop-shadow-sm md:text-4xl lg:text-5xl">
              Tin tức
            </h1>
            <nav
              className="mt-2 flex items-center gap-1 text-sm font-medium text-white/85"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Tin tức</span>
            </nav>
          </div>
        </div>
      </section>

      {/* SUB-TABS */}
      <div className="border-b bg-white sticky top-[72px] md:top-[108px] z-30">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div role="tablist" className="flex gap-6 md:gap-8 min-w-max">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end
                className={({ isActive }) =>
                  `relative -mb-px py-3 text-sm font-semibold whitespace-nowrap ${
                    isActive ? "text-orange-600" : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t.label}
                    <span
                      className={`block mt-3 h-[3px] rounded-full ${
                        isActive ? "bg-orange-600" : "bg-transparent"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="py-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
