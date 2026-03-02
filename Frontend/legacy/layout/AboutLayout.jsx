import { AnimatePresence, motion as Motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const TABS = [
  { label: "Tổng quan", to: "/gioi-thieu/tong-quan" },
  { label: "Tầm nhìn & Giá trị cốt lõi", to: "/gioi-thieu/tam-nhin-gia-tri" },
  // { label: "Chứng nhận & Giải thưởng", to: "/gioi-thieu/chung-nhan-giai-thuong" },
  { label: "Đối tác & Khách hàng", to: "/gioi-thieu/doi-tac-khach-hang" },
];

const MotionDiv = Motion.div;

export default function AboutLayout() {
  const location = useLocation();

  return (
    <div className="bg-white">
      <section className="relative h-[500px] bg-gradient-to-b from-[#8f5f53] via-[#b98b7d] to-[#e3cac0] md:h-[500px] lg:h-[500px]">
        <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Overview</h1>
          <nav
            className="mt-2 flex items-center gap-1 text-sm text-white/80"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="size-4" />
            <span>Giới thiệu</span>
          </nav>
        </div>
      </section>

      {/* SUBNAV sticky cố định */}
      <div className="bg-orange-900 text-white sticky top-[72px] z-30 shadow-sm md:top-[108px]">
        <div className="no-scrollbar container mx-auto overflow-x-auto px-4">
          <div
            role="tablist"
            aria-label="Giới thiệu"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3"
          >
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) => {
                  // Kiểm tra nếu đang ở route gốc /gioi-thieu và đây là tab đầu tiên
                  const isRootAndFirstTab =
                    location.pathname === "/gioi-thieu" && t.to === "/gioi-thieu/tong-quan";
                  const actuallyActive = isActive || isRootAndFirstTab;

                  return `relative py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    actuallyActive ? "text-orange-200" : "text-white/85 hover:text-white"
                  }`;
                }}
              >
                {({ isActive }) => {
                  const isRootAndFirstTab =
                    location.pathname === "/gioi-thieu" && t.to === "/gioi-thieu/tong-quan";
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

      {/* CONTENT AREA: chỉ phần này đổi, hero + tabs giữ nguyên */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={location.pathname}
            className="relative z-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Outlet />
          </MotionDiv>
        </AnimatePresence>
      </div>
    </div>
  );
}
