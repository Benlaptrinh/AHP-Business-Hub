import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

// alias viết Hoa để ESLint xem như component (và thật sự “đang dùng”)
const MotionDiv = motion.div;

const TABS = [
  { label: "Trung tâm D&B", to: "/nang-luc-thi-cong/trung-tam-dnb" },
  { label: "Lĩnh vực hoạt động", to: "/nang-luc-thi-cong/linh-vuc-hoat-dong" },

  // { label: "Công nghệ BIM", to: "/nang-luc-thi-cong/cong-nghe-bim" },
  // { label: "Quản lý ERP", to: "/nang-luc-thi-cong/quan-ly-erp" },
];

export default function ConstructionLayout() {
  const location = useLocation();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative h-[500px]">
        <img
          // src="https://www.centralcons.vn/wp-content/uploads/2021/11/DJI_0682-2-scaled.jpg"
          alt="What We Do"
          className="absolute inset-0 size-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/85 via-orange-900/60 to-orange-900/35" />
        <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">What We Do</h1>
          <nav
            className="mt-2 flex items-center gap-1 text-sm text-white/80"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-4" />
            <span>Trung tâm D&B</span>
          </nav>
        </div>
      </section>

      {/* SUB TABS */}
      <div className="bg-orange-900 text-white sticky top-[72px] z-30 shadow-sm md:top-[108px]">
        <div className="no-scrollbar container mx-auto overflow-x-auto px-4">
          <div
            role="tablist"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3"
          >
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) => {
                  // Kiểm tra nếu đang ở route gốc và đây là tab "Trung tâm D&B"
                  const isRootAndFirstTab =
                    location.pathname === "/nang-luc-thi-cong" &&
                    t.to === "/nang-luc-thi-cong/trung-tam-dnb";
                  const actuallyActive = isActive || isRootAndFirstTab;

                  return `relative py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    actuallyActive ? "text-orange-200" : "text-white/85 hover:text-white"
                  }`;
                }}
              >
                {({ isActive }) => {
                  const isRootAndFirstTab =
                    location.pathname === "/nang-luc-thi-cong" &&
                    t.to === "/nang-luc-thi-cong/trung-tam-dnb";
                  const actuallyActive = isActive || isRootAndFirstTab;

                  return (
                    <>
                      {t.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-[3px] w-full rounded-full transition-opacity duration-200 ${
                          actuallyActive ? "bg-orange-400 opacity-100" : "opacity-0"
                        }`}
                      />
                    </>
                  );
                }}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT (chỉ phần này đổi) */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={location.pathname}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="py-8"
          >
            <Outlet />
          </MotionDiv>
        </AnimatePresence>
      </div>
    </div>
  );
}
