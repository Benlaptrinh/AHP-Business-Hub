const DEFAULT_BG = "https://www.centralcons.vn/wp-content/uploads/2021/11/logo-blue.png";
const LIGHT_BG = "https://www.centralcons.vn/wp-content/uploads/2021/11/logo-white.png";

const LEADERS = [
  {
    name: "Trần Quang Tuấn",
    title: "Chủ tịch - Tổng Giám đốc",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Tuan-copy.png",
    link: "#",
  },
  {
    name: "Vũ Đức Tài",
    title: "Giám đốc Điều hành",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Tai-copy.png",
    link: "#",
  },
  {
    name: "Mai Chánh Thành",
    title: "Giám đốc Điều hành",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Thanh-copy.png",
    link: "#",
  },
  {
    name: "Trần Đăng Khoa",
    title: "Giám đốc Điều hành",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Khoa-copy.png",
    link: "#",
  },
  {
    name: "Mai Thị Kim Dung",
    title: "Giám đốc Tài chính",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Dung-copy.png",
    background: LIGHT_BG,
    link: "#",
  },
  {
    name: "Võ Gia Đông Lan",
    title: "Giám đốc Thương mại",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Lan-copy.png",
    background: LIGHT_BG,
    link: "#",
  },
  {
    name: "Dương Quốc Anh",
    title: "Giám đốc Đấu thầu",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Anh-copy.png",
    background: LIGHT_BG,
    link: "#",
  },
  {
    name: "Lê Văn Bích",
    title: "Giám đốc Thị trường Quốc tế",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Bich-copy.png",
    background: LIGHT_BG,
    link: "#",
  },
  {
    name: "Châu Văn Bằng",
    title: "Giám đốc Cơ điện",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Bang-copy.png",
    link: "#",
  },
  {
    name: "Nguyễn Đức Hậu",
    title: "Giám đốc Cơ điện",
    photo: "https://www.centralcons.vn/wp-content/uploads/2021/11/anh-Hau-copy.png",
    link: "#",
  },
  {
    name: "Dương Đình Thanh",
    title: "Giám đốc Chuyển đổi",
    photo: "https://www.centralcons.vn/wp-content/uploads/2025/08/DUONG-DINH-THANH.png",
    link: "#",
  },
];

const ROWS = [[0], [1, 2, 3], [4, 5, 6], [7, 8, 9, 10]];

export default function AboutLeaders() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mb-6 h-2 bg-[radial-gradient(circle,_rgba(0,0,0,0.12)_1px,_transparent_1px)] bg-[length:12px_12px]" />
      <h1 className="text-3xl font-extrabold uppercase tracking-[0.08em] text-gray-900 md:text-4xl">
        Nhân sự cấp cao
      </h1>

      <div className="mt-10 space-y-12 md:space-y-14">
        {ROWS.map((indices, idx) => (
          <div
            key={idx}
            className="flex flex-wrap items-start justify-center gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12"
          >
            {indices.map((leaderIndex) => (
              <LeaderCard key={LEADERS[leaderIndex].name} {...LEADERS[leaderIndex]} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function LeaderCard({ name, title, photo, background = DEFAULT_BG, link = "#" }) {
  return (
    <article className="flex w-[240px] flex-col items-center text-center md:w-[264px]">
      <div className="relative mx-auto size-[240px] overflow-hidden rounded-full md:size-[264px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e5b]/90 via-[#132c7d]/90 to-[#183588]/80" />
        <span className="pointer-events-none absolute inset-[12px] rounded-full border border-white/50" />
        <span className="pointer-events-none absolute inset-[3px] rounded-full border-[8px] " />
        <div className="relative z-10 flex h-full w-full items-end justify-center pb-7">
          <img
            src={photo}
            alt={name}
            loading="lazy"
            className="h-full w-auto max-w-[88%] object-contain drop-shadow-[0_12px_28px_rgba(10,21,60,0.35)] transition-transform duration-300 ease-out hover:-translate-y-1"
          />
        </div>
      </div>

      <h3 className="mt-5 text-[16px] font-semibold uppercase tracking-wide text-gray-900">
        {name}
      </h3>
      <p className="text-[15px] font-medium text-slate-600">{title}</p>
      <a
        href={link}
        className="mt-3 text-sm font-semibold uppercase tracking-wide text-[#f26b38] hover:text-[#d7531d]"
      >
        Xem thêm &rsaquo;
      </a>
    </article>
  );
}
