import { ChevronDown, Facebook, Globe, Menu, Search, User, Youtube } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { JOBS } from "../data/jobs";
import { NEWS } from "../data/news";
import { PROJECTS } from "../data/projects";

const TOKEN_KEY = "ahp_access_token";
const USER_KEY = "ahp_auth_user";
const ADMIN_EMAILS = new Set([
  "admin@anhongphat.vn",
  "ceo@anhongphat.vn",
  "techlead@anhongphat.vn",
  "uktaongu747@gmail.com",
]);

const NAV = [
  { label: "TRANG CHỦ", href: "/" },
  {
    label: "GIỚI THIỆU",
    href: "/gioi-thieu",
    children: [
      { label: "Tổng quan", href: "/gioi-thieu/tong-quan" },
      { label: "Tầm nhìn & Giá trị", href: "/gioi-thieu/tam-nhin-gia-tri" },
      { label: "Đối tác & Khách hàng", href: "/gioi-thieu/doi-tac-khach-hang" },
    ],
  },
  {
    label: "NĂNG LỰC THI CÔNG",
    href: "/nang-luc-thi-cong",
    children: [
      { label: "Lĩnh vực hoạt động", href: "/nang-luc-thi-cong/linh-vuc-hoat-dong" },
      { label: "Trung tâm D&B", href: "/nang-luc-thi-cong/trung-tam-dnb" },
    ],
  },
  {
    label: "DỰ ÁN",
    href: "/du-an",
    children: [
      { label: "Tất Cả", href: "/du-an" },
      { label: "Nhà Phố Hiện Đại", href: "/du-an/khu-dan-cu" },
      { label: "Biệt Thự Tân Cổ Điển", href: "/du-an/khach-san-tttm" },
    ],
  },
  {
    label: "TUYỂN DỤNG",
    href: "/tuyen-dung",
    children: [
      { label: "Cơ hội nghề nghiệp", href: "/tuyen-dung/co-hoi-nghe-nghiep" },
      { label: "Chính sách nhân sự", href: "/tuyen-dung/chinh-sach-nhan-su" },
      { label: "Phát triển nguồn nhân lực", href: "/tuyen-dung/phat-trien-nguon-nhan-luc" },
    ],
  },
];

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function readSessionUser() {
  if (typeof window === "undefined") return null;

  const token = window.localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isAdminUser(user) {
  if (!user) return false;

  if (String(user.role || "").toLowerCase() === "admin") {
    return true;
  }

  const email = String(user.email || "")
    .trim()
    .toLowerCase();

  return ADMIN_EMAILS.has(email);
}

function SearchSection({ title, items, onItemClick }) {
  if (!items.length) return null;

  return (
    <div>
      <h3 className="mb-2 text-xs font-bold uppercase text-gray-400">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            onClick={onItemClick}
            className="block rounded p-2 transition-colors hover:bg-orange-50"
          >
            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
            <p className="mt-0.5 text-xs text-gray-500">{item.meta}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionUser, setSessionUser] = useState(() => readSessionUser());
  const searchInputRef = useRef(null);
  const location = useLocation();
  const isLoggedIn = Boolean(sessionUser?.email);
  const isAdmin = isAdminUser(sessionUser);
  const accountHref = !isLoggedIn ? '/login' : isAdmin ? '/admin' : '/profile';
  const accountLabel = !isLoggedIn ? 'Đăng nhập' : isAdmin ? 'Admin' : 'Profile';
  const mobileAccountLabel = !isLoggedIn ? 'Đăng nhập' : isAdmin ? 'Vào Admin' : 'Vào Profile';
  const useLegacyRouteForAccount = accountHref === "/profile";

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  const handleLogout = useCallback(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setSessionUser(null);
    window.location.href = "/";
  }, []);

  const activeMap = useMemo(() => {
    const { pathname } = location;
    const map = new Map();

    NAV.forEach((item) => {
      if (item.href === "/") {
        map.set(item.href, pathname === "/");
        return;
      }

      const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
      if (isActive) {
        map.set(item.href, true);
        return;
      }

      const hasActiveChild = item.children?.some(
        (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
      );
      map.set(item.href, Boolean(hasActiveChild));
    });

    return map;
  }, [location]);

  const searchResults = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);
    if (normalizedQuery.length < 2) {
      return {
        canSearch: false,
        total: 0,
        news: [],
        jobs: [],
        projects: [],
      };
    }

    const match = (value) => normalizeText(value).includes(normalizedQuery);

    const news = NEWS.filter((item) => match(`${item.title} ${item.excerpt || ""}`))
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        to: `/tin-tuc/${item.slug || item.id}`,
        title: item.title,
        meta: `${item.category} • ${item.date}`,
      }));

    const jobs = JOBS.filter((item) =>
      match(`${item.title} ${item.dept || ""} ${item.location || ""} ${item.summary || ""}`)
    )
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        to: `/tuyen-dung/co-hoi-nghe-nghiep/${item.id}`,
        title: item.title,
        meta: `${item.location} • ${item.slots} vị trí`,
      }));

    const projects = PROJECTS.filter((item) =>
      match(`${item.title} ${item.location || ""} ${item.desc || ""}`)
    )
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        to: `/du-an/${item.id}`,
        title: item.title,
        meta: `${item.location || "Đang cập nhật"} • ${item.year || "Năm nay"}`,
      }));

    return {
      canSearch: true,
      total: news.length + jobs.length + projects.length,
      news,
      jobs,
      projects,
    };
  }, [searchQuery]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchOpen &&
        !event.target.closest(".search-panel") &&
        !event.target.closest(".search-btn")
      ) {
        closeSearch();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeSearch();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeSearch]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSub(null);
    closeSearch();
  }, [location.pathname, closeSearch]);

  useEffect(() => {
    const syncSession = () => setSessionUser(readSessionUser());

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener("focus", syncSession);
    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("focus", syncSession);
    };
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 bg-white transition-shadow",
        scrolled && "shadow-md"
      )}
    >
      <div className="hidden border-b border-gray-200 md:block">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-[13px]">
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/ThietkexaydungAnHongPhat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-500 transition-colors hover:text-blue-600"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="https://www.youtube.com/@AnHongPhatConstruction"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-500 transition-colors hover:text-red-600"
            >
              <Youtube className="size-4" />
            </a>
            <a
              href="https://www.tiktok.com/@anhongphat.design"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-gray-500 transition-colors hover:text-gray-900"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <a
              href="tel:0372474500"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-orange-600"
            >
              <User className="size-3.5" />
              <span className="font-medium">0372474500</span>
            </a>
            <span className="text-gray-300">|</span>
            <button className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-orange-600">
              <Globe className="size-3.5" />
              <span>VI</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-transparent">
        <div className="container mx-auto px-4">
          <div className="flex h-[72px] items-center gap-4">
            <Link
              to="/"
              className="inline-flex shrink-0 items-center gap-2.5 text-[#800000] transition-colors duration-300"
              aria-label="AN HỒNG PHÁT"
            >
              <img
                src="/assets/avt.png"
                alt="AN HỒNG PHÁT Logo"
                className="h-10 w-10 rounded-full object-contain"
              />
              <span className="inline-block text-base font-bold tracking-tight sm:text-xl">
                AN HỒNG PHÁT
              </span>
            </Link>

            <nav className="relative z-40 ml-8 hidden items-center lg:flex xl:ml-12">
              {NAV.map((item) => (
                <div key={item.label} className="group relative">
                  <Link
                    to={item.href}
                    className={cx(
                      "relative inline-flex h-[72px] items-center px-3 text-[13px] font-semibold uppercase tracking-wide transition-all xl:px-4",
                      activeMap.get(item.href)
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {item.label}
                      {item.children && (
                        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
                      )}
                    </span>
                    <span
                      className={cx(
                        "absolute bottom-0 left-0 right-0 h-0.5 transition-all",
                        activeMap.get(item.href)
                          ? "bg-orange-600"
                          : "bg-transparent group-hover:bg-orange-600"
                      )}
                    />
                  </Link>

                  {item.children && (
                    <div
                      role="menu"
                      className="invisible absolute left-0 top-full z-[100] min-w-[260px] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                    >
                      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white py-2 shadow-xl">
                        {item.children.map((child) => {
                          const childActive =
                            location.pathname === child.href ||
                            location.pathname.startsWith(`${child.href}/`);

                          return (
                            <Link
                              key={child.label}
                              to={child.href}
                              className={cx(
                                "block px-5 py-2.5 text-sm transition-colors",
                                childActive
                                  ? "bg-orange-50 font-semibold text-orange-600"
                                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                              )}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              {useLegacyRouteForAccount ? (
                <Link
                  to={accountHref}
                  className={cx(
                    "hidden h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors lg:inline-flex",
                    isLoggedIn
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  )}
                >
                  <User className="size-4" />
                  <span>{accountLabel}</span>
                </Link>
              ) : (
                <a
                  href={accountHref}
                  className={cx(
                    "hidden h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors lg:inline-flex",
                    isLoggedIn
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  )}
                >
                  <User className="size-4" />
                  <span>{accountLabel}</span>
                </a>
              )}

              <div className="relative">
                <button
                  aria-label="Tìm kiếm"
                  onClick={() => setSearchOpen((prev) => !prev)}
                  className="search-btn grid size-10 place-items-center rounded-full text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <Search className="size-5" />
                </button>

                <div
                  className={cx(
                    "search-panel absolute right-0 top-full z-[100] mt-2 w-[90vw] max-w-[360px] rounded-lg border border-gray-200 bg-white shadow-2xl transition-all duration-300",
                    searchOpen
                      ? "visible translate-y-0"
                      : "invisible -translate-y-2 pointer-events-none"
                  )}
                >
                  <div className="p-4">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Tìm kiếm tin tức, dự án, tuyển dụng..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="h-12 w-full rounded-lg border-2 border-gray-200 px-4 text-base transition-colors focus:border-orange-500 focus:outline-none"
                    />

                    {searchQuery && (
                      <div className="mt-4 max-h-[420px] space-y-4 overflow-y-auto">
                        <p className="text-sm text-gray-500">
                          Kết quả tìm kiếm cho:{" "}
                          <span className="font-semibold text-gray-900">{searchQuery}</span>
                        </p>

                        {!searchResults.canSearch && (
                          <p className="text-xs text-gray-500">
                            Nhập ít nhất 2 ký tự để hiển thị kết quả.
                          </p>
                        )}

                        {searchResults.canSearch && (
                          <>
                            <SearchSection
                              title="TIN TỨC"
                              items={searchResults.news}
                              onItemClick={closeSearch}
                            />
                            <SearchSection
                              title="TUYỂN DỤNG"
                              items={searchResults.jobs}
                              onItemClick={closeSearch}
                            />
                            <SearchSection
                              title="DỰ ÁN"
                              items={searchResults.projects}
                              onItemClick={closeSearch}
                            />

                            {searchResults.total === 0 && (
                              <div className="py-6 text-center text-gray-500">
                                <p className="text-sm">Không tìm thấy kết quả phù hợp</p>
                                <p className="mt-1 text-xs">Thử từ khóa khác hoặc ngắn gọn hơn</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                className="inline-flex size-10 items-center justify-center rounded-md border border-gray-200 transition-colors hover:bg-gray-50 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Mở menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cx(
          "fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <aside
        className={cx(
          "fixed bottom-0 left-0 top-0 z-[70] flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-label="Menu di động"
      >
        <div className="flex h-16 items-center justify-between border-b bg-gradient-to-r from-orange-50 to-white px-4">
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2.5 text-[#800000]"
            aria-label="AN HỒNG PHÁT"
          >
            <img
              src="/assets/avt.png"
              alt="AN HỒNG PHÁT Logo"
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className="inline-block text-base font-bold tracking-tight">AN HỒNG PHÁT</span>
          </Link>
          <button
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50"
            onClick={() => setMobileOpen(false)}
          >
            Đóng
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {NAV.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const open = mobileSub === item.label;
            const isActive = activeMap.get(item.href);

            return (
              <div key={item.label} className="border-b border-gray-100">
                {hasChildren ? (
                  <>
                    <button
                      className={cx(
                        "flex w-full items-center justify-between px-4 py-3.5 text-left text-[15px] font-semibold transition-colors",
                        isActive ? "text-orange-600" : "text-gray-800"
                      )}
                      onClick={() => setMobileSub(open ? null : item.label)}
                      aria-expanded={open}
                    >
                      <span className="uppercase tracking-wide">{item.label}</span>
                      <ChevronDown
                        className={cx(
                          "h-4 w-4 transition-transform duration-200",
                          open && "rotate-180"
                        )}
                      />
                    </button>

                    <div
                      className={cx(
                        "grid transition-all duration-300",
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="mx-2 mb-2 rounded-lg bg-gray-50">
                          {item.children.map((child) => {
                            const childActive =
                              location.pathname === child.href ||
                              location.pathname.startsWith(`${child.href}/`);

                            return (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => setMobileOpen(false)}
                                className={cx(
                                  "block py-2.5 pl-6 pr-4 text-sm transition-colors",
                                  childActive
                                    ? "font-semibold text-orange-600"
                                    : "text-gray-700 hover:text-orange-600"
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cx(
                      "block px-4 py-3.5 text-[15px] font-semibold uppercase tracking-wide transition-colors",
                      isActive ? "text-orange-600" : "text-gray-800 hover:text-orange-600"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="space-y-2 border-t bg-gray-50 p-4">
          {useLegacyRouteForAccount ? (
            <Link
              to={accountHref}
              onClick={() => setMobileOpen(false)}
              className={cx(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
                isLoggedIn
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-[#001F3F] text-white hover:bg-[#001633]"
              )}
            >
              <User className="size-4" />
              {mobileAccountLabel}
            </Link>
          ) : (
            <a
              href={accountHref}
              onClick={() => setMobileOpen(false)}
              className={cx(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
                isLoggedIn
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-[#001F3F] text-white hover:bg-[#001633]"
              )}
            >
              <User className="size-4" />
              {mobileAccountLabel}
            </a>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 font-semibold text-rose-700 transition-colors hover:bg-rose-100"
            >
              Đăng xuất
            </button>
          )}

          <a
            href="tel:0372474500"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-600 font-semibold text-white transition-colors hover:bg-orange-700"
          >
            <User className="size-4" /> Liên hệ: 0372474500
          </a>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <a
              href="https://xaydunganhongphat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 transition-colors hover:bg-white"
            >
              <Globe className="size-4" /> Website
            </a>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 transition-colors hover:bg-white">
              <Globe className="size-4" /> VI
            </button>
          </div>
        </div>
      </aside>
    </header>
  );
}
