import { ArrowRight, ClipboardCheck, Download, MessageCircle } from "lucide-react";

export default function TopStats() {
  return (
    <section className="relative overflow-hidden py-14 shadow-lg sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-orange-100/50 to-transparent lg:block" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Tiêu đề phụ */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.08em] text-orange-700 sm:text-sm md:text-base">
          THIẾT KẾ &amp; THI CÔNG TRỌN GÓI UY TÍN
        </p>

        {/* Tiêu đề chính */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <svg viewBox="0 0 24 24" fill="#FF6B35" className="size-5">
            <path d="M6.7 5.2C5 6.7 3.9 8.9 3.8 11.3c2.3.1 4.5-1 5.9-2.7-1.3-.9-2.3-2.1-3-3.4zM17.3 5.2c-.7 1.3-1.7 2.5-3 3.4 1.4 1.7 3.6 2.8 5.9 2.7-.1-2.4-1.2-4.6-2.9-6.1zM6.1 13.9c-1 .8-1.8 1.9-2.3 3.2 1.6.3 3.2 0 4.6-.8-.9-.7-1.6-1.4-2.3-2.4zM17.9 13.9c-.6.9-1.4 1.7-2.3 2.4 1.4.8 3 .9 4.6.8-.5-1.3-1.3-2.4-2.3-3.2z" />
          </svg>

          <h2 className="text-center text-xl font-black uppercase tracking-wide text-orange-600 sm:text-2xl md:text-3xl lg:text-4xl">
            Chuyên Biệt Thự - Nhà Phố Tân Cổ Điển
          </h2>

          <svg viewBox="0 0 24 24" fill="#FF6B35" className="size-5">
            <path d="M6.7 5.2C5 6.7 3.9 8.9 3.8 11.3c2.3.1 4.5-1 5.9-2.7-1.3-.9-2.3-2.1-3-3.4zM17.3 5.2c-.7 1.3-1.7 2.5-3 3.4 1.4 1.7 3.6 2.8 5.9 2.7-.1-2.4-1.2-4.6-2.9-6.1zM6.1 13.9c-1 .8-1.8 1.9-2.3 3.2 1.6.3 3.2 0 4.6-.8-.9-.7-1.6-1.4-2.3-2.4zM17.9 13.9c-.6.9-1.4 1.7-2.3 2.4 1.4.8 3 .9 4.6.8-.5-1.3-1.3-2.4-2.3-3.2z" />
          </svg>
        </div>

        {/* Các chỉ số */}
        <div className="mt-10 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {/* 1 */}
          <div className="rounded-lg p-4 shadow-lg">
            <div className="text-[13px] font-bold uppercase tracking-wide text-slate-600 sm:text-sm">
              Dự án hoàn thành
            </div>
            <div className="mt-2 text-4xl font-black leading-none text-orange-600 sm:text-5xl">
              50+
            </div>
            <div className="mt-1 text-sm text-slate-500">dự án</div>
          </div>

          {/* 2 */}
          <div className="shadow-lg rounded-lg p-4">
            <div className="text-[13px] font-bold uppercase tracking-wide text-slate-600 sm:text-sm">
              Khách hàng hài lòng
            </div>
            <div className="mt-2 text-4xl font-black leading-none text-orange-600 sm:text-5xl">
              98%
            </div>
            <div className="mt-1 text-sm text-slate-500">đánh giá 5 sao</div>
          </div>

          {/* 3 */}
          <div className="shadow-lg rounded-lg p-4">
            <div className="text-[13px] font-bold uppercase tracking-wide text-slate-600 sm:text-sm">
              Kinh nghiệm
            </div>
            <div className="mt-2 text-4xl font-black leading-none text-orange-600 sm:text-5xl">
              10+
            </div>
            <div className="mt-1 text-sm text-slate-500">năm</div>
          </div>

          {/* 4 */}
          <div className="shadow-lg rounded-lg p-4">
            <div className="text-[13px] font-bold uppercase tracking-wide text-slate-600 sm:text-sm">
              Khu vực phục vụ
            </div>
            <div className="mt-2 text-4xl font-black leading-none text-orange-600 sm:text-5xl">
              Miền Nam
            </div>
            <div className="mt-1 text-sm text-slate-500">Đà Nẵng - Huế</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center lg:flex-row lg:gap-6">
          <a
            href="tel:0372474500"
            className="inline-flex items-center gap-3 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-700"
          >
            <MessageCircle className="size-4" />
            Gọi tư vấn miễn phí
            <ArrowRight className="size-4" />
          </a>
          <a
            href="https://www.facebook.com/ThietkexaydungAnHongPhat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-orange-200 px-6 py-3 text-sm font-semibold text-orange-600 transition hover:border-orange-400 hover:text-orange-700"
          >
            <Download className="size-4" />
            Tải hồ sơ năng lực
          </a>
          <a
            href="tel:0372474500"
            className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition hover:border-orange-400 hover:text-orange-700"
          >
            <ClipboardCheck className="size-4" />
            Hotline: 0566 666 729
          </a>
        </div>
      </div>
    </section>
  );
}
