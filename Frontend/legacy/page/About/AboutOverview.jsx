import {
  Award,
  Building2,
  Clock,
  Compass,
  Download,
  HardHat,
  Ruler,
  Sparkles,
  UsersRound,
} from "lucide-react";

function DtDd({ dt, dd, className = "" }) {
  return (
    <div className={className}>
      <dt className="mb-1 text-gray-500">{dt}</dt>
      <dd className="text-[14px] font-semibold leading-snug text-gray-900 whitespace-nowrap">
        {dd}
      </dd>
    </div>
  );
}

export default function AboutOverview() {
  const highlightStats = [
    {
      icon: Building2,
      value: "180+",
      label: "Công trình bàn giao",
      description: "Biệt thự, nhà phố và khách sạn cao cấp trên khắp cả nước.",
    },
    {
      icon: UsersRound,
      value: "50+",
      label: "Kiến trúc sư & kỹ sư",
      description: "Đội ngũ nội bộ giàu kinh nghiệm, am hiểu vật liệu và công nghệ thi công.",
    },
    {
      icon: Award,
      value: "98%",
      label: "Khách hàng hài lòng",
      description: "Tối ưu giải pháp, đồng hành hậu bảo hành trọn gói và minh bạch chi phí.",
    },
    {
      icon: Clock,
      value: "8 năm",
      label: "Kinh nghiệm thị trường",
      description: "Tích lũy quy trình quản lý dự án hiện đại, kiểm soát tiến độ và chất lượng.",
    },
  ];

  const coreValues = [
    {
      title: "Tận tâm với từng chi tiết",
      description:
        "Thiết kế chuẩn chỉnh từ công năng đến thẩm mỹ, đảm bảo công trình bền vững theo thời gian.",
    },
    {
      title: "Sáng tạo dựa trên dữ liệu",
      description:
        "Ứng dụng BIM, mô phỏng ánh sáng và thông gió để tối ưu không gian sống, giảm chi phí vận hành.",
    },
    {
      title: "Hợp tác minh bạch",
      description:
        "Báo cáo tiến độ định kỳ, nhật ký công trường online và chính sách bảo hành rõ ràng.",
    },
    {
      title: "Phát triển bền vững",
      description:
        "Ưu tiên vật liệu thân thiện môi trường, giải pháp tiết kiệm năng lượng song hành cảnh quan địa phương.",
    },
  ];

  const capabilities = [
    {
      icon: Sparkles,
      title: "Thiết kế kiến trúc & nội thất",
      description:
        "Chuyên sâu phong cách tân cổ điển, luxury; cân bằng tỷ lệ vàng, ánh sáng và vật liệu cao cấp.",
    },
    {
      icon: Compass,
      title: "Quản lý dự án & pháp lý",
      description:
        "Tư vấn xin phép xây dựng, lập hồ sơ thẩm định, quản lý ngân sách và tiến độ bằng KPI rõ ràng.",
    },
    {
      icon: HardHat,
      title: "Thi công trọn gói",
      description:
        "Đội thi công nội bộ, giám sát 24/7, kiểm soát chất lượng theo checklist hơn 120 hạng mục.",
    },
    {
      icon: Ruler,
      title: "Hoàn thiện & bảo hành",
      description:
        "Dịch vụ decor, styling, chăm sóc định kỳ sau bàn giao kèm gói bảo hành kết cấu lên đến 5 năm.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 py-10 lg:py-14">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Tổng Quan</h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <img
                src="/assets/mew.png"
                alt="Biệt thự AN HỒNG PHÁT"
                className="h-[320px] w-full object-cover md:h-[420px]"
                loading="lazy"
              />
              <div className="absolute left-4 top-4 rounded-xl bg-white/95 px-4 py-2 shadow">
                <p className="text-xs text-gray-500">Slogan</p>
                <p className="text-lg font-extrabold tracking-wide text-gray-900">
                  THIẾT KẾ & XÂY DỰNG
                  <br />
                  TRỌN GÓI
                </p>
              </div>
              <div className="absolute right-4 bottom-4 max-w-[calc(100%-2rem)] rounded-sm bg-orange-600 px-4 py-3 text-[13px] text-white shadow-md md:right-4 md:top-1/2 md:max-w-[260px] md:-translate-y-1/2 md:bottom-auto">
                Chuyên thiết kế và thi công biệt thự, nhà phố phong cách tân cổ điển Châu Âu
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-200 p-5 md:p-6">
              <dl className="grid grid-cols-2 gap-x-3 gap-y-4 text-[14px]">
                <div className="col-span-full">
                  <dt className="mb-1 text-gray-500">Tên đầy đủ</dt>
                  <dd className="text-[15px] font-bold leading-tight text-gray-900 whitespace-nowrap md:text-[16px]">
                    CÔNG TY THIẾT KẾ XÂY DỰNG AN HỒNG PHÁT
                  </dd>
                </div>

                <DtDd dt="Tên viết tắt" dd="AN HỒNG PHÁT" />
                <DtDd dt="Điện thoại" dd="0372474500" />
                <DtDd dt="Trụ sở chính" dd="Thành Phố Thủ Đức, Việt Nam" />
                <DtDd dt="Fax" dd="0372474500" />
                <DtDd
                  dt="Website"
                  dd={
                    <a
                      className="font-semibold text-orange-600 hover:underline"
                      href="https://xaydunganhongphat.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      xaydunganhongphat.com
                    </a>
                  }
                />
                <DtDd
                  dt="Email"
                  dd={
                    <a
                      className="font-semibold text-orange-600 hover:underline"
                      href="mailto:xaydunganHongPhat@gmail.com"
                    >
                      xaydunganHongPhat@gmail.com
                    </a>
                  }
                />
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-orange-50 via-white to-white">
        <div className="container mx-auto px-4 pb-12 lg:pb-16">
          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-2 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
                Năng lực cốt lõi
              </span>
              <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                Những con số nói lên chất lượng
              </h3>
              <p className="text-sm text-slate-600 md:text-base">
                Chúng tôi xây dựng thương hiệu bằng sự nhất quán trong mỗi dự án, từ ý tưởng đến khi
                bàn giao chìa khóa.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {highlightStats.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-3 rounded-2xl border border-orange-100/60 bg-orange-50/40 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <item.icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-3xl font-black text-slate-900">{item.value}</p>
                    <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                      {item.label}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-10 lg:pb-16">
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <h3 className="mb-4 text-xl font-extrabold text-orange-600 md:text-2xl">
              &quot;Thiết Kế Tinh Tế, Thi Công Chất Lượng&quot;
            </h3>
            <p className="leading-7 text-gray-700">
              AN HỒNG PHÁT là công ty tư vấn thiết kế xây dựng được thành lập với sứ mệnh mang đến
              những công trình kiến trúc tân cổ điển đẳng cấp, kết hợp hài hòa giữa vẻ đẹp truyền
              thống Châu Âu và tiện nghi hiện đại. Chúng tôi thiết kế và thi công biệt thự, nhà phố
              với phong cách sang trọng, tạo nên không gian sống đẳng cấp cho gia đình Việt.
            </p>
            <p className="mt-4 leading-7 text-gray-700">
              Với đội ngũ kiến trúc sư, kỹ sư giàu kinh nghiệm và quy trình thi công chuyên nghiệp,
              AN HỒNG PHÁT cam kết mang đến chất lượng hoàn thiện cao cấp, đúng tiến độ và phù hợp
              với ngân sách của Quý khách hàng.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {coreValues.map((value) => (
                <li
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
                >
                  <h4 className="text-base font-semibold text-slate-900">{value.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <img
                src="/assets/File_Nha/24_31_10_2024.JPG"
                alt="Công trình AN HỒNG PHÁT"
                className="h-[260px] w-full object-cover md:h-[340px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="mb-8 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
              Năng lực triển khai
            </span>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              Giải pháp toàn diện cho từng dự án
            </h3>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                <item.icon className="size-6" />
              </span>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-r from-white via-orange-50 to-white shadow-lg">
          <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr),320px] md:p-10">
            <div className="flex flex-col justify-center text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
                Tài liệu năng lực
              </span>
              <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                Khám phá Portfolio mới nhất của AN HỒNG PHÁT
              </h3>
              <p className="mt-4 text-sm text-slate-600 md:text-base">
                Tải về trọn bộ hồ sơ năng lực, bảng vật liệu, quy trình thi công và các công trình
                tiêu biểu được cập nhật liên tục. Giúp bạn có cái nhìn toàn cảnh trước khi ra quyết
                định hợp tác.
              </p>
              <a
                href="https://www.facebook.com/ThietkexaydungAnHongPhat"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-700"
              >
                <Download className="size-4" /> Xem Portfolio Facebook
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-inner">
              <img
                src="/assets/avt.png"
                alt="Logo AN HỒNG PHÁT"
                className="h-full w-full bg-white p-6 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
