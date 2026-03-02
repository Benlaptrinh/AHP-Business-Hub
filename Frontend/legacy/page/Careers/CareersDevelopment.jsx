import { Link } from "react-router-dom";

export default function CareersDevelopment() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">
          Phát triển nguồn nhân lực
        </h2>

        {/* 2-COLUMN INTRO */}
        <section className="mb-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left content */}
            <div>
              <div className="relative pl-5 md:pl-7">
                <span className="absolute left-0 top-1 h-full w-1 bg-orange-500" />
                <h3 className="text-lg font-bold text-orange-600 md:text-xl">Công tác đào tạo</h3>
                <h3 className="text-lg font-bold text-orange-600 md:text-xl">
                  Phát triển nguồn nhân lực
                </h3>
              </div>
              <p className="mt-4 leading-7 text-slate-700">
                Chúng tôi sử dụng người học & phát triển nghề nghiệp là chìa khoá nâng cao năng lực
                cạnh tranh. Tại CENTRAL, công tác đào tạo triển khai cả online và offline; từ học
                phần nền tảng đến chương trình chuyên sâu theo chức danh. Hệ thống mentor–coach đồng
                hành giúp nhân sự tăng trưởng năng lực, liên tục cập nhật công nghệ – quy trình – an
                toàn.
              </p>
              <Link
                to="/tuyen-dung"
                className="mt-5 inline-block rounded bg-orange-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-orange-700"
              >
                THAM GIA VỚI CHÚNG TÔI
              </Link>
            </div>

            {/* Right avatar circle with C motif */}
            <div className="mx-auto w-full max-w-[420px]">
              <div className="relative aspect-square">
                {/* Big C background - Navy blue circle with cutout */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer navy circle */}
                  <div className="absolute size-[90%] rounded-full bg-indigo-950" />
                  {/* Inner cutout for C shape - positioned to right */}
                  <div className="absolute right-[5%] size-[70%] rounded-full bg-white" />
                </div>
                {/* Person image - construction worker with helmet */}
                <div className="absolute left-[15%] top-1/2 size-[70%] -translate-y-1/2 overflow-hidden rounded-full border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1400&auto=format&fit=crop"
                    alt="Construction Worker"
                    className="size-full object-cover"
                  />
                </div>
                {/* Orange accent circle */}
                <div className="absolute right-[8%] top-[15%] size-16 rounded-full bg-orange-500" />
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE STRIP */}
        <section className="mb-12 bg-gray-50 p-6 text-center md:p-8">
          <p className="mx-auto max-w-5xl text-base font-medium leading-8 text-orange-600 md:text-lg">
            Việc đào tạo giúp cán bộ được áp dụng kiến thức vào thực tế hiệu quả, đồng thời xác định
            lộ trình phát triển phù hợp với mục tiêu của Công ty.
          </p>
        </section>

        {/* THREE PILLARS */}
        <section className="mb-16">
          <div className="grid gap-6 md:grid-cols-3">
            <PolicyCard
              index="01"
              icon={
                <svg
                  className="size-10 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
              title="Đào tạo theo vai trò"
              desc="Hoạt động đào tạo từ lớp nền tảng tới chuyên sâu theo chức danh; đánh giá đầu ra gắn với mục tiêu phát triển lao động."
            />
            <PolicyCard
              index="02"
              icon={
                <svg
                  className="size-10 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
              title="Lộ trình & đánh giá"
              desc="Hệ thống đánh giá năng lực – mục tiêu OKRs; kế hoạch đào tạo cá nhân hoá theo năm/quý, mentor kèm cặp tại công trường."
            />
            <PolicyCard
              index="03"
              icon={
                <svg
                  className="size-10 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              }
              title="Gắn kết & hội nhập"
              desc="Chương trình hội nhập, văn hoá an toàn – kỷ luật; hoạt động gắn kết cộng đồng; chia sẻ & lan toả tri thức nội bộ."
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/tuyen-dung"
              className="inline-block rounded bg-orange-600 px-6 py-2.5 font-semibold text-white shadow hover:bg-orange-700"
            >
              THAM GIA VỚI CHÚNG TÔI
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- Sub components ---------- */
function PolicyCard({ index, icon, title, desc }) {
  return (
    <div className="group rounded-xl bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="mb-4 flex items-start justify-between">
        <div className="text-orange-600 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <h4 className="mb-1 text-2xl font-extrabold text-slate-800 transition-colors group-hover:text-orange-600">
        {index}
      </h4>
      <div className="mb-3 h-0.5 w-12 bg-gray-300 transition-all duration-300 group-hover:w-20 group-hover:bg-orange-600" />
      <h4 className="mb-3 text-base font-bold text-slate-900">{title}</h4>
      <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}
