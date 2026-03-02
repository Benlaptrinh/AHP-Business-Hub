import {
  Building2,
  Clock3,
  Lightbulb,
  Palette,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export default function ConstructionDnb() {
  const servicePackages = [
    {
      icon: Building2,
      title: "Thiết kế kiến trúc & kết cấu",
      description:
        "Phát triển phương án 2D/3D tối ưu công năng, phối cảnh chuẩn phong cách tân cổ điển và đảm bảo tiêu chuẩn kỹ thuật.",
      bullets: ["Quy hoạch tổng thể khu đất", "Bản vẽ chi tiết kiến trúc, kết cấu, điện nước"],
    },
    {
      icon: Palette,
      title: "Thiết kế & thi công nội thất",
      description:
        "Đồng bộ nội thất cao cấp, lựa chọn vật liệu và màu sắc hài hòa với kiến trúc, thi công chuẩn xác từng chi tiết.",
      bullets: [
        "Styling, lựa chọn décor đồng bộ",
        "Xưởng nội thất riêng đảm bảo tiến độ & chất lượng",
      ],
    },
    {
      icon: Sparkles,
      title: "Nâng cấp - cải tạo công trình",
      description:
        "Cải tạo biệt thự, penthouse, khách sạn theo tiêu chuẩn cao cấp; hạn chế tối đa ảnh hưởng đến sinh hoạt hiện hữu.",
      bullets: [
        "Khảo sát kết cấu hiện trạng",
        "Thi công theo chuẩn an toàn và quy định địa phương",
      ],
    },
  ];

  const capabilityStats = [
    { value: "250+", label: "Dự án hoàn thiện", sub: "Biệt thự, nhà phố, khách sạn cao cấp" },
    { value: "12", label: "Tỉnh thành triển khai", sub: "Từ TP.HCM, Đà Nẵng đến Nha Trang" },
    { value: "5 năm", label: "Bảo hành kết cấu", sub: "Chính sách hậu mãi toàn diện" },
  ];

  const showcase = [
    {
      image: "/assets/File_Nha/30_31_10_2024.JPG",
      title: "Nội Thất Biệt Thự Song Lập – Long An",
      description: "Thiết kế & thi công trọn gói, phong cách tân cổ điển sang trọng.",
    },
    {
      image: "/assets/File_Nha/9_31_10_2024.JPG",
      title: "Không Gian Phòng Khách – HCM",
      description: "Điểm nhấn cầu thang kính, đèn pha lê và hệ tủ nhập khẩu.",
    },
    {
      image: "/assets/File_Nha/8_29_06_2025.JPG",
      title: "Phòng ngủ master – HCM",
      description: "Thiết kế nội thất tinh giản, hệ thống đèn thông minh, vật liệu cao cấp.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Đội ngũ AN HỒNG PHÁT rất chuyên nghiệp, báo cáo tiến độ rõ ràng từng tuần và luôn chủ động đề xuất giải pháp tối ưu chi phí.",
      author: "Anh Trường",
      role: "Chủ biệt thự Riverside Q.2",
    },
    {
      quote:
        "Nhà phố của tôi hoàn thiện đúng hạn dù thi công trong hẻm nhỏ. Từ thiết kế đến nội thất đều đồng bộ, gia đình rất ưng ý.",
      author: "Chị Ngọc",
      role: "Khách hàng dự án Nhà phố Bình Thạnh",
    },
  ];

  return (
    <div className="bg-white">
      {/* ===== Banner + 4 ô lợi ích ===== */}
      <section className="container mx-auto px-4 py-10 lg:py-14">
        <h1 className="mb-6 text-2xl font-extrabold text-orange-600 md:text-3xl">
          Quy Trình Thiết Kế & Thi Công
        </h1>

        {/* Banner chính */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="/assets/imagelo.png"
            alt="Quy trình thiết kế & thi công AN HỒNG PHÁT"
            className="h-[280px] w-full object-cover md:h-[360px] lg:h-[420px]"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Lợi ích */}
        <div className="relative z-10 -mt-10 grid grid-cols-2 gap-4 md:-mt-12 md:grid-cols-4 md:gap-6">
          <BenefitCard icon={Lightbulb} title="Tư vấn thiết kế miễn phí" />
          <BenefitCard icon={Clock3} title="Thi công đúng tiến độ" />
          <BenefitCard icon={PiggyBank} title="Báo giá minh bạch" />
          <BenefitCard icon={Wrench} title="Bảo hành dài hạn" />
        </div>
      </section>

      <section className="bg-orange-50/60">
        <div className="container mx-auto px-4 pb-14 pt-12 lg:pb-18">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
              Dịch vụ chuyên sâu
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
              Giải pháp trọn gói cho từng nhu cầu của bạn
            </h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base">
              Mỗi gói dịch vụ được dẫn dắt bởi đội ngũ chuyên gia riêng, đảm bảo bạn nhận được tư
              vấn và chất lượng thi công tối ưu nhất.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {servicePackages.map((item) => (
              <div
                key={item.title}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                  <item.icon className="size-6" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
                <ul className="mt-auto space-y-2 text-sm text-slate-500">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 size-4 flex-shrink-0 text-orange-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Ảnh trái + Callout (đè lên) + 2 đoạn nội dung ===== */}
      <section className="container mx-auto px-4 pb-14 lg:pb-24">
        <div className="grid items-start gap-8 md:grid-cols-2">
          {/* Ảnh bên trái */}
          <div className="relative z-0">
            <img
              src="/assets/File_Nha/a05a9b9b04e1b4e3444766ced446e50f.jpg"
              alt="Đội ngũ kỹ sư tại Trung tâm D&B"
              className="h-[320px] w-full rounded-3xl object-cover md:h-[440px] lg:h-[520px]"
              loading="lazy"
            />
          </div>

          {/* Nội dung bên phải */}
          <div className="relative">
            {/* CALL OUT – chồng sang ảnh, nằm ~40% chiều cao (desktop) */}
            <div
              className="
                /* chồng            vào ảnh */ /* đẩy
                xuống ~40%        tổng chiều cao ảnh */ /* mobile: gần sát
                phía                          trên */ -mt-2 transition-all md:-ml-16 md:mt-[14%] lg:-ml-24
                lg:mt-[16%]
              "
            >
              <div
                role="note"
                aria-label="Cam kết AN HỒNG PHÁT"
                className="max-w-[780px] rounded-xl bg-orange-600/95 px-6 py-5 text-white shadow-[0_10px_30px_rgba(16,24,40,0.14)] md:px-8"
              >
                <p className="leading-7 md:text-lg">
                  <span className="font-semibold">AN HỒNG PHÁT</span> - công ty tư vấn thiết kế xây
                  dựng - cam kết đồng hành cùng khách hàng từ khâu tư vấn, thiết kế đến thi công và
                  bàn giao, mang đến những công trình biệt thự, nhà phố tân cổ điển chất lượng cao.
                </p>
              </div>
            </div>

            {/* Nội dung mô tả */}
            <div className="mt-6 grid gap-4 leading-7 text-gray-700 md:mt-8 md:grid-cols-1">
              <p>
                Với đội ngũ kiến trúc sư, kỹ sư giàu kinh nghiệm, chúng tôi tư vấn thiết kế miễn
                phí, lập dự toán chi tiết và thi công đúng tiến độ cam kết với chất lượng hoàn thiện
                cao cấp.
              </p>
              <p>
                Quy trình làm việc chuyên nghiệp từ khảo sát, thiết kế, thi công đến nghiệm thu giúp
                AN HỒNG PHÁT kiểm soát chặt chẽ chất lượng và tiến độ, đảm bảo sự hài lòng của khách
                hàng.
              </p>
              <p>
                AN HỒNG PHÁT luôn đặt sự hài lòng của khách hàng lên hàng đầu. Chúng tôi không chỉ
                thi công xây dựng mà còn đồng hành tư vấn phong thủy, lựa chọn vật liệu cao cấp, và
                hỗ trợ hoàn thiện nội thất theo phong cách tân cổ điển châu Âu sang trọng.
              </p>
              <p>
                Mỗi công trình đều được giám sát bởi kỹ sư trưởng dự án, đảm bảo mọi chi tiết từ
                móng, kết cấu, hoàn thiện ngoại thất đến nội thất đều đạt tiêu chuẩn cao nhất. Chúng
                tôi sử dụng vật liệu chính hãng, đội ngũ thợ tay nghề cao được đào tạo bài bản.
              </p>
              <p className="font-medium text-orange-600">
                Cam kết bảo hành dài hạn, hỗ trợ bảo trì định kỳ và luôn sẵn sàng lắng nghe ý kiến
                khách hàng trong suốt quá trình thi công - đó là nền tảng xây dựng thương hiệu An
                Hồng Phát.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14 lg:pb-20">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {capabilityStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-2xl bg-orange-50/60 p-6 text-center ring-1 ring-orange-100"
              >
                <p className="text-4xl font-black text-orange-500 md:text-5xl">{stat.value}</p>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {stat.label}
                </p>
                <p className="text-sm text-slate-600">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Phần QUY TRÌNH 5 BƯỚC ===== */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-14 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-orange-600 md:text-4xl">
            Quy Trình 5 Bước Chuyên Nghiệp
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600 md:mb-14">
            AN HỒNG PHÁT áp dụng quy trình khép kín, đảm bảo mọi dự án được thực hiện bài bản từ A
            đến Z
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProcessStep
              number="01"
              title="Khảo Sát & Tư Vấn"
              description="Đội ngũ kiến trúc sư đến tận nơi khảo sát mặt bằng, lắng nghe nhu cầu và tư vấn giải pháp thiết kế phù hợp với phong thủy, ngân sách và sở thích của gia chủ."
            />
            <ProcessStep
              number="02"
              title="Thiết Kế & Dự Toán"
              description="Lập bản vẽ 2D, 3D chi tiết, phối cảnh nội ngoại thất chân thực. Dự toán minh bạch từng hạng mục, giúp khách hàng chủ động về tài chính."
            />
            <ProcessStep
              number="03"
              title="Ký Hợp Đồng & Chuẩn Bị"
              description="Ký kết hợp đồng rõ ràng, minh bạch. Chuẩn bị giấy tờ pháp lý, xin phép xây dựng, thu mua vật liệu chính hãng và huy động nhân lực thi công."
            />
            <ProcessStep
              number="04"
              title="Thi Công & Giám Sát"
              description="Thi công theo đúng thiết kế và tiến độ cam kết. Kỹ sư trưởng giám sát hàng ngày, báo cáo tiến độ định kỳ cho khách hàng qua hệ thống ERP."
            />
            <ProcessStep
              number="05"
              title="Nghiệm Thu & Bàn Giao"
              description="Kiểm tra chất lượng toàn bộ công trình, sửa chữa hoàn thiện các chi tiết còn thiếu sót. Bàn giao công trình và chứng từ bảo hành cho khách hàng."
            />
            <ProcessStep
              number="🏆"
              title="Bảo Hành & Hỗ Trợ"
              description="Bảo hành dài hạn, hỗ trợ bảo trì định kỳ, luôn sẵn sàng giải đáp thắc mắc và hỗ trợ khách hàng ngay cả sau khi bàn giao công trình."
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">
              Dự án tiêu biểu
            </span>
            <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Hình ảnh thực tế từ công trình AN HỒNG PHÁT
            </h3>
          </div>
          <p className="max-w-xl text-sm text-slate-600 md:text-base">
            Chúng tôi ghi lại từng giai đoạn thi công để khách hàng theo dõi minh bạch. Dưới đây là
            một số khoảnh khắc nổi bật gần đây.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcase.map((item) => (
            <figure
              key={item.title}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <figcaption className="flex flex-1 flex-col gap-2 p-5">
                <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-300">
              Khách hàng nói gì
            </span>
            <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Minh bạch, đúng hẹn và tận tâm trong từng dự án
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <div
                key={item.author}
                className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-lg backdrop-blur-sm"
              >
                <p className="text-lg font-medium leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-auto">
                  <p className="text-base font-semibold text-orange-200">{item.author}</p>
                  <p className="text-sm text-white/70">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAM KẾT CHẤT LƯỢNG ===== */}
      <section className="container mx-auto px-4 py-14 lg:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Cam Kết Chất Lượng
              <span className="block text-orange-600">Từ AN HỒNG PHÁT</span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <CommitmentItem
                title="Vật Liệu Chính Hãng 100%"
                description="Sử dụng vật liệu xây dựng, nội ngoại thất từ các thương hiệu uy tín như Viglacera, Đồng Tâm, Jotun, Dulux, đảm bảo độ bền và thẩm mỹ cao."
              />
              <CommitmentItem
                title="Đội Ngũ Thợ Tay Nghề Cao"
                description="Thợ xây, thợ mộc, thợ sơn đều được đào tạo chuyên sâu, có kinh nghiệm làm việc với kiến trúc tân cổ điển, đảm bảo thi công tỉ mỉ từng chi tiết."
              />
              <CommitmentItem
                title="Tiến Độ Đúng Cam Kết"
                description="Lập kế hoạch thi công chi tiết, phân công rõ ràng. Giám sát tiến độ hàng ngày, xử lý kịp thời các vấn đề phát sinh để không chậm trễ."
              />
              <CommitmentItem
                title="Bảo Hành Toàn Diện"
                description="Bảo hành kết cấu, chống thấm, điện nước, sơn... theo cam kết hợp đồng. Hỗ trợ bảo trì định kỳ và sửa chữa miễn phí trong thời gian bảo hành."
              />
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/assets/CamKet.png"
                alt="Cam kết chất lượng AN HỒNG PHÁT"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-2 right-2 rounded-2xl bg-orange-600 px-6 py-4 text-white shadow-xl md:-bottom-6 md:-right-6 md:px-8 md:py-6">
              <p className="text-3xl font-bold md:text-4xl">98%</p>
              <p className="text-xs md:text-sm">Khách hàng hài lòng</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 py-16">
        <div className="container mx-auto flex flex-col items-start gap-6 px-4 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">
              Sẵn sàng biến ý tưởng thành công trình thực tế?
            </h3>
            <p className="mt-3 max-w-2xl text-sm md:text-base">
              Đặt lịch tư vấn miễn phí cùng đội ngũ kiến trúc sư AN HỒNG PHÁT. Chúng tôi sẽ phân
              tích hiện trạng, đề xuất phương án thiết kế và dự toán tối ưu ngay trong buổi hẹn.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0372474500"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-orange-600 shadow-lg transition hover:bg-orange-100"
            >
              Gọi ngay: 0566 666 729
            </a>
            <a
              href="https://www.facebook.com/messages/t/ThietkexaydungAnHongPhat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Đặt lịch tư vấn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========= Process Step Component ========= */
function ProcessStep({ number, title, description }) {
  return (
    <div className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-orange-300">
      <div className="mb-4 inline-block rounded-xl bg-orange-100 px-4 py-2 text-2xl font-bold text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
        {number}
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

/* ========= Commitment Item Component ========= */
function CommitmentItem({ title, description }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex-shrink-0">
        <div className="flex size-6 items-center justify-center rounded-full bg-orange-600">
          <svg className="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

/* ========= Benefit Card Component ========= */
function BenefitCard({ icon, title }) {
  const IconComp = icon; // ✅ đổi tên để ESLint không cảnh báo

  return (
    <div
      className="
        flex flex-col items-center rounded-2xl border
        border-gray-100 bg-white p-5 text-center shadow-lg transition-transform
        duration-200 hover:-translate-y-0.5 md:p-6
      "
    >
      <div className="flex size-12 items-center justify-center rounded-full border-2 border-orange-300/60 md:size-14">
        <IconComp className="size-5 text-orange-600 md:size-6" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-semibold md:text-base">{title}</p>
    </div>
  );
}
