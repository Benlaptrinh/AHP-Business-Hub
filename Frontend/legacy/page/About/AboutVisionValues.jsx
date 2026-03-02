const VALUES = [
  {
    no: "01",
    title: "NIỀM TIN",
    desc: "AN HỒNG PHÁT xây dựng niềm tin với khách hàng bằng chất lượng thi công vượt trội, đúng tiến độ và cam kết bảo hành dài hạn cho mọi công trình biệt thự, nhà phố tân cổ điển.",
  },
  {
    no: "02",
    title: "CHÍNH TRỰC",
    desc: "Minh bạch trong báo giá, rõ ràng trong hợp đồng và trung thực trong thi công. Đây là nền tảng để AN HỒNG PHÁT phát triển bền vững cùng sự tin tưởng của khách hàng.",
  },
  {
    no: "03",
    title: "TÔN TRỌNG",
    desc: "Chúng tôi luôn lắng nghe và tôn trọng mong muốn của khách hàng, từ khâu thiết kế đến hoàn thiện, tạo nên ngôi nhà đúng ý tưởng và phong cách riêng của từng gia đình.",
  },
  {
    no: "04",
    title: "CHẤT LƯỢNG",
    desc: "Từ vật liệu xây dựng, kỹ thuật thi công đến hoàn thiện nội ngoại thất, AN HỒNG PHÁT cam kết mang đến chất lượng cao cấp với tiêu chuẩn tân cổ điển Châu Âu.",
  },
  {
    no: "05",
    title: "SÁNG TẠO",
    desc: "Đội ngũ kiến trúc sư luôn sáng tạo trong thiết kế, kết hợp hài hòa giữa vẻ đẹp cổ điển và công năng hiện đại, tạo nên những công trình độc đáo và ấn tượng.",
  },
];

export default function AboutVisionValues() {
  return (
    <section className="py-10 lg:py-14">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Tầm nhìn</h1>

      <div className="relative mt-8">
        <div className="relative h-[280px] md:h-[420px] lg:h-[460px]">
          <img
            src="/assets/File_Nha/5_29_06_2025.JPG"
            alt="Vision"
            className="
              absolute right-0 top-0 h-full w-full object-cover rounded-2xl
              md:w-[70%] md:rounded-l-2xl md:rounded-r-none
            "
            loading="eager"
          />

          {/* Overlay tối để text dễ đọc hơn trên mobile */}
          <div className="absolute inset-0 bg-black/30 rounded-2xl md:hidden" />

          {/* Khối text đè - responsive tốt hơn */}
          <div
            className="
            absolute
            left-4 bottom-4 md:left-12 md:top-1/2 md:-translate-y-1/2 md:bottom-auto
            max-w-[calc(100%-2rem)] md:max-w-[520px]
            rounded-lg bg-orange-600 px-4 py-3 md:px-6 md:py-5
            text-white shadow-lg
            before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white
          "
          >
            <p className="text-sm leading-6 font-semibold md:text-lg md:leading-8">
              Trở thành công ty tư vấn thiết kế xây dựng hàng đầu, chuyên thiết kế & thi công biệt
              thự, nhà phố tân cổ điển khu vực Miền Trung - Miền Nam
            </p>
          </div>
        </div>
      </div>

      {/* ====== GIÁ TRỊ CỐT LÕI ====== */}
      <h2 className="mt-10 text-2xl font-extrabold tracking-tight md:text-3xl">Giá trị cốt lõi</h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Hàng 1: Ảnh (2 cột) */}
        <figure className="h-[240px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm md:h-[423px] lg:col-span-2">
          <img
            src="/assets/File_Nha/17_29_06_2025.JPG"
            alt="Build trust create value"
            className="size-full object-cover"
            loading="lazy"
          />
        </figure>

        {/* Hàng 1: 01 */}
        <ValueCard {...VALUES[0]} className="md:h-[423px]" />

        {/* Hàng 2: 02, 03, 04 */}
        <ValueCard {...VALUES[1]} className="md:h-[423px]" />
        <ValueCard {...VALUES[2]} className="md:h-[423px]" />
        <ValueCard {...VALUES[3]} className="md:h-[423px]" />

        {/* Hàng 3: 05 + Ảnh 2 cột */}
        <ValueCard {...VALUES[4]} className="md:h-[423px]" />
        <figure className="h-[240px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm md:h-[423px] lg:col-span-2">
          <img
            src="/assets/File_Nha/21_17_09_2024.JPG"
            alt="Team at site"
            className="size-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}

/* === Card giá trị cốt lõi có hover đẹp === */
function ValueCard({ no, title, desc, className = "" }) {
  return (
    <article
      className={`group flex min-h-[200px] flex-col overflow-hidden rounded-2xl border
                  border-gray-200 bg-white p-6 shadow-lg
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:border-orange-600/50 hover:bg-orange-950 hover:shadow-xl
                  ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-orange-600 transition-colors group-hover:text-orange-300">
          {no}
        </span>
        <span
          className="rounded border border-orange-200 bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-500
                     transition-colors group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white/90"
        >
          icon
        </span>
      </div>

      <h3
        className="mt-3 font-extrabold tracking-wide text-gray-900
                   transition-colors group-hover:text-white"
      >
        {title}
      </h3>

      <div
        className="mt-2 h-[2px] w-10 rounded-full bg-gray-300
                   transition-colors group-hover:bg-white/70"
      />

      <p
        className="mt-3 text-sm leading-6 text-gray-700
                   transition-colors group-hover:text-white/90"
      >
        {desc}
      </p>
    </article>
  );
}
