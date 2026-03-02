import { Building2, Home, Hotel, Palette, ShieldCheck } from "lucide-react";

function IcManage() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-8 text-orange-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3v4m0 10v4M4 12h4m8 0h4M6.5 6.5l2.8 2.8M14.7 14.7l2.8 2.8M6.5 17.5l2.8-2.8M14.7 9.3l2.8-2.8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IcQuality() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-8 text-orange-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 2l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 16.8 6.5 19.2l1-6.2L3 8.6l6.2-.9L12 2z" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  );
}
function IcProgress() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-8 text-orange-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 12a9 9 0 1 0 9-9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}

export default function ConstructionSectors() {
  const sectorCards = [
    {
      icon: Building2,
      title: "Biệt thự Tân cổ điển",
      description:
        "Thiết kế kiến trúc và nội thất trọn gói, tỉ lệ vàng chuẩn châu Âu cùng hệ thống chiếu sáng, thông gió tối ưu.",
      highlights: ["Bản vẽ 2D/3D chi tiết", "Vật liệu ngoại nhập chọn lọc", "Styling đồng bộ"],
    },
    {
      icon: Home,
      title: "Nhà phố & shophouse",
      description:
        "Giải pháp thông minh cho mặt bằng hẹp, tối ưu công năng kinh doanh và không gian sống cho gia đình đa thế hệ.",
      highlights: ["Giải pháp cách âm, chống nóng", "Thiết kế mặt tiền nhận diện thương hiệu"],
    },
    {
      icon: Hotel,
      title: "Khách sạn & homestay",
      description:
        "Thiết kế trải nghiệm lưu trú cao cấp, kết hợp câu chuyện thương hiệu với tiêu chuẩn an toàn và vận hành.",
      highlights: ["Quy hoạch sảnh & tiện ích", "Hệ thống MEP tiêu chuẩn du lịch"],
    },
    {
      icon: Palette,
      title: "Nội thất cao cấp",
      description:
        "Xưởng nội thất riêng sản xuất theo yêu cầu, kiểm soát chất lượng từ vật liệu đến hoàn thiện tại công trình.",
      highlights: ["Quy trình kiểm duyệt 5 bước", "Bảo hành & bảo trì định kỳ"],
    },
  ];

  const differentiators = [
    { value: "180+", label: "Dự án trọn gói", desc: "Biệt thự, nhà phố, khách sạn trên toàn quốc." },
    { value: "30+", label: "Chuyên gia in-house", desc: "Kiến trúc sư, kỹ sư, stylist nội thất." },
    { value: "4.8/5", label: "Đánh giá khách hàng", desc: "Theo khảo sát hài lòng 2024." },
  ];

  const processSteps = [
    {
      title: "Khảo sát & ý tưởng",
      desc: "Phân tích nhu cầu, đo đạc hiện trạng, đề xuất concept thiết kế và ngân sách dự kiến.",
    },
    {
      title: "Thiết kế & thẩm định",
      desc: "Phát triển hồ sơ 2D/3D, phối cảnh photorealistic, thống nhất vật liệu và tiến độ chi tiết.",
    },
    {
      title: "Thi công & bàn giao",
      desc: "Thi công trọn gói, giám sát 24/7, nghiệm thu từng hạng mục trước khi bàn giao chìa khóa.",
    },
  ];

  return (
    <section className="pb-3">
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
        THIẾT KẾ TINH TẾ, THI CÔNG CHẤT LƯỢNG
      </h2>

      {/* ===== Block 1: Thiết kế & Thi công ===== */}
      <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-2">
        {/* Text box */}
        <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7">
          <h3 className="text-xl font-extrabold text-orange-600 md:text-2xl">
            Thiết Kế & Thi Công Trọn Gói
          </h3>
          <p className="mt-3 leading-7 text-gray-700">
            AN HỒNG PHÁT chuyên thiết kế và thi công trọn gói các công trình biệt thự, nhà phố với
            phong cách tân cổ điển Châu Âu. Từ khâu tư vấn, thiết kế bản vẽ, thi công xây dựng đến
            hoàn thiện nội ngoại thất, chúng tôi đồng hành cùng khách hàng trong suốt quá trình kiến
            tạo ngôi nhà mơ ước với chất lượng cao cấp và tiến độ đúng hẹn.
          </p>

          {/* Bullets */}
          <ul className="mt-4 space-y-2 leading-7 text-gray-800">
            {[
              "Thiết kế kiến trúc tân cổ điển độc đáo, phù hợp phong thủy.",
              "Thi công chất lượng cao với đội ngũ thợ lành nghề.",
              "Bàn giao đúng tiến độ, minh bạch chi phí.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-[7px] inline-block size-1.5 rounded-full bg-orange-600" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* 3 mini features */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center">
              <IcManage />
              <span className="mt-2 text-[13px] text-gray-700">Quản lý</span>
            </div>
            <div className="flex flex-col items-center">
              <IcQuality />
              <span className="mt-2 text-[13px] text-gray-700">Chất lượng</span>
            </div>
            <div className="flex flex-col items-center">
              <IcProgress />
              <span className="mt-2 text-[13px] text-gray-700">Tiến độ</span>
            </div>
          </div>
        </article>

        {/* Photo box */}
        <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <img
            src="/assets/CongTruong.png"
            alt="Công trường CENTRAL"
            className="size-full object-cover md:h-[420px]"
            loading="lazy"
          />
        </figure>
      </div>

      {/* ===== Cards: Lĩnh vực thế mạnh ===== */}
      <div className="mt-14 rounded-3xl border border-orange-100 bg-orange-50/40 p-6 shadow-sm md:p-8">
        <div className="mb-6 flex flex-col gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
            Lĩnh vực hoạt động
          </span>
          <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Giải pháp toàn diện cho từng loại hình
          </h3>
          <p className="mx-auto max-w-3xl text-sm text-gray-600 md:text-base">
            AN HỒNG PHÁT sở hữu đội ngũ chuyên trách cho từng lĩnh vực, đảm bảo mỗi công trình đều
            được thiết kế và thi công theo quy chuẩn riêng biệt.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {sectorCards.map((card) => (
            <div
              key={card.title}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-white/70 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                <card.icon className="size-6" />
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{card.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
              <ul className="mt-auto space-y-2 text-sm text-gray-500">
                {card.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 size-4 flex-shrink-0 text-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Highlights ===== */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {differentiators.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
          >
            <p className="text-4xl font-black text-orange-500 md:text-5xl">{item.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
              {item.label}
            </p>
            <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ===== Block 2: Phong cách Tân Cổ Điển ===== */}
      <div className="mt-20 grid grid-cols-1   items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
        {/* Text trái */}
        <article className="max-w-prose justify-self-start lg:justify-self-end">
          <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-orange-600 md:text-4xl">
            Phong Cách Tân Cổ Điển
          </h3>
          <p className="mb-3 leading-7 text-gray-700">
            AN HỒNG PHÁT chuyên thiết kế và thi công các công trình biệt thự, nhà phố với phong cách
            tân cổ điển Châu Âu sang trọng. Mỗi công trình đều được chúng tôi chăm chút từng chi
            tiết, kết hợp hài hòa giữa vẻ đẹp kiến trúc truyền thống và tiện nghi hiện đại, tạo nên
            không gian sống đẳng cấp cho gia đình Việt.
          </p>
        </article>

        {/* Ảnh giữa (mask tròn) */}
        <div className="justify-self-center">
          <div className="relative aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            {/* vòng tròn nền lớn (cam) */}
            <div className="absolute inset-0 rounded-full bg-orange-950" />
            {/* nhẫn trắng gợi hình chữ C */}
            <div className="absolute right-0 top-1/2 size-[70%] -translate-y-1/2 rounded-full bg-white" />
            {/* vòng tròn cam nhỏ */}
            <div className="absolute left-[35%] top-[43%] size-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500" />
            {/* Ảnh (mask tròn) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-full">
              <img
                src="/assets/image14.png"
                alt="AN HỒNG PHÁT Team"
                className="w-[105%] object-contain md:w-[110%] lg:w-[115%]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Text phải */}
        <article className="max-w-prose leading-7 text-gray-700 lg:justify-self-start lg:text-right">
          <p>
            Với đội ngũ kiến trúc sư, kỹ sư giàu kinh nghiệm và đội thợ lành nghề, AN HỒNG PHÁT cam
            kết mang đến chất lượng hoàn thiện cao cấp, từ kết cấu xây dựng, hệ thống điện nước, đến
            hoàn thiện nội ngoại thất với vật liệu cao cấp. Mỗi công trình đều được giám sát chặt
            chẽ để đảm bảo tiêu chuẩn chất lượng và bàn giao đúng tiến độ cam kết.
          </p>

          <a
            href="/du-an"
            className="mt-4 inline-block text-sm font-semibold text-orange-600 hover:text-orange-700 lg:ml-auto"
          >
            Khám phá dự án &rsaquo;
          </a>
        </article>
      </div>

      {/* ===== Quy trình ngắn gọn ===== */}
      <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <div className="mb-8 flex flex-col gap-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
            Lộ trình hợp tác
          </span>
          <h3 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Đồng hành cùng khách hàng từ ý tưởng đến bàn giao
          </h3>
          <p className="mx-auto max-w-3xl text-sm text-gray-600 md:text-base">
            Mỗi dự án được quản lý theo checklist hơn 120 hạng mục, cập nhật tiến độ liên tục qua
            hệ thống ERP để bạn an tâm ở mọi giai đoạn.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, idx) => (
            <div
              key={step.title}
              className="group flex flex-col gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-orange-600 shadow group-hover:bg-orange-600 group-hover:text-white">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
              <p className="text-sm leading-relaxed text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div className="mt-16 rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 p-8 text-white shadow-lg md:flex md:items-center md:justify-between md:gap-8 md:p-10">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold md:text-3xl">Bạn muốn được tư vấn giải pháp phù hợp?</h3>
          <p className="mt-3 text-sm md:text-base">
            Hãy để AN HỒNG PHÁT đề xuất phương án thiết kế – thi công tối ưu cho quỹ đất, ngân sách
            và phong cách bạn yêu thích. Chúng tôi luôn sẵn sàng lên lịch gặp gỡ trong 24h.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 text-sm font-semibold md:mt-0 md:flex-row">
          <a
            href="tel:0372474500"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-orange-600 shadow-lg transition hover:bg-orange-100"
          >
            Gọi tư vấn: 0566 666 729
          </a>
          <a
            href="mailto:xaydunganHongPhat@gmail.com"
            className="inline-flex items-center justify-center rounded-full border border-white/80 px-6 py-3 hover:bg-white/10"
          >
            Gửi yêu cầu qua email
          </a>
        </div>
      </div>
    </section>
  );
}
