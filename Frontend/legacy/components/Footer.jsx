import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-12">
      {/* viền cam trên cùng */}
      <div className="h-1.5 w-full bg-central-orange" />

      {/* nền xanh + texture nhẹ */}
      <div className="relative w-full bg-central-blue text-white">
        {/* (tùy chọn) lớp noise/texture rất nhẹ */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            color: "#fff",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid grid-cols-12 gap-8">
            {/* Brand (logo + tagline) */}
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/avt.png"
                  alt="AN HỒNG PHÁT Logo"
                  className="h-10 w-10 rounded-full object-contain"
                />
                <div className="leading-tight">
                  <div className="text-xl font-extrabold tracking-wide">AN HỒNG PHÁT</div>
                  <div className="text-[11px] font-bold uppercase text-white/80">
                    Thiết Kế &amp; Xây Dựng
                  </div>
                </div>
              </div>

              {/* (tuỳ chọn) mô tả/ghi chú ngắn */}
              <p className="mt-5 max-w-md text-sm text-white/80">
                Công ty tư vấn thiết kế xây dựng uy tín, chuyên tư vấn thiết kế &amp; thi công biệt
                thự, nhà phố tân cổ điển, công trình dân dụng &amp; công nghiệp trên toàn quốc.
              </p>
            </div>

            {/* Liên hệ */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Liên hệ</h4>

              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 text-white/80" />
                  <span className="text-white/90">Hồ Chí Minh, Việt Nam</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-5 text-white/80" />
                  <a href="tel:0372474500" className="hover:underline">
                    0372474500
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-white/80" />
                  <a href="mailto:xaydunganHongPhat@gmail.com" className="hover:underline">
                    xaydunganHongPhat@gmail.com
                  </a>
                </li>
              </ul>

              <h5 className="mt-5 text-sm font-extrabold uppercase tracking-wide">Website</h5>
              <p className="mt-2 text-sm text-white/90">
                <a
                  href="https://xaydunganhongphat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  xaydunganhongphat.com
                </a>
              </p>
            </div>

            {/* Sitemap + Theo dõi */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Sitemap */}
                <div>
                  <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Sitemap</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    {[
                      "Giới thiệu",
                      "Lĩnh vực hoạt động",
                      "Dự án",
                      // "Tin tức",
                      "Tuyển dụng",
                      "Liên hệ",
                    ].map((t) => (
                      <li key={t}>
                        <a href="#" className="hover:underline">
                          {t}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Theo dõi */}
                <div>
                  <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Theo dõi</h4>
                  <ul className="space-y-2 text-sm text-white/90">
                    <li>
                      <a
                        href="https://www.facebook.com/ThietkexaydungAnHongPhat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:underline"
                      >
                        <Facebook className="size-4" /> Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/@AnHongPhatConstruction"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:underline"
                      >
                        <Youtube className="size-4" /> YouTube
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.tiktok.com/@anhongphat.design"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:underline"
                      >
                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                        </svg>
                        TikTok
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-white/25" />

          {/* Copyright row */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center">
            <div className="text-white/80">
              © {new Date().getFullYear()} AN HỒNG PHÁT. All rights reserved.
            </div>
            <div className="flex items-center gap-5 text-white/80">
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
