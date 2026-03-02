import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
const MotionDiv = motion.div;

const TABS = [
  { label: "Cơ hội nghề nghiệp", to: "/tuyen-dung/co-hoi-nghe-nghiep" },
  { label: "Chính sách nhân sự", to: "/tuyen-dung/chinh-sach-nhan-su" },
  { label: "Phát triển nguồn nhân lực", to: "/tuyen-dung/phat-trien-nguon-nhan-luc" },
  // { label: "Văn hoá ", to: "/tuyen-dung/van-hoa" },
];

export default function CareersLayout() {
  const location = useLocation();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative h-[500px]">
        <img
          // src="https://www.centralcons.vn/wp-content/uploads/2021/11/careers-cover-scaled.jpg"
          alt="Careers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/85 via-orange-900/60 to-orange-900/35" />
        <div className="relative container mx-auto flex h-full items-center px-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">Careers</h1>
            <nav
              className="mt-2 flex items-center gap-1 text-sm text-white/80"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Tuyển dụng</span>
            </nav>
          </div>
        </div>
      </section>

      {/* SUB TABS */}
      <div className="bg-orange-900 text-white sticky top-[72px] md:top-[108px] z-30 shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div
            role="tablist"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3"
          >
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) => {
                  // Kiểm tra nếu đang ở route gốc và đây là tab đầu tiên
                  const isRootAndFirstTab =
                    location.pathname === "/tuyen-dung" &&
                    t.to === "/tuyen-dung/co-hoi-nghe-nghiep";
                  const actuallyActive = isActive || isRootAndFirstTab;

                  return `relative py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    actuallyActive ? "text-orange-200" : "text-white/85 hover:text-white"
                  }`;
                }}
              >
                {({ isActive }) => {
                  const isRootAndFirstTab =
                    location.pathname === "/tuyen-dung" &&
                    t.to === "/tuyen-dung/co-hoi-nghe-nghiep";
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

      {/* NỘI DUNG TAB */}
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
