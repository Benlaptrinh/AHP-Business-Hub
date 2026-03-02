import React from "react";

const CUSTOMERS = [
  { alt: "Vingroup", src: "https://ashui.com/awards/wp-content/uploads/2015/08/Vingroup.jpg" },
  { alt: "Vinhomes", src: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Vinhomes.png" },
  { alt: "SSG Group", src: "https://mydinhpearl.com.vn/pictures/catalog/tap-doan-ssg.jpg" },
  {
    alt: "REE",
    src: "https://angialand.com.vn/wp-content/uploads/2020/02/logo-du-an-empire-city-quan-2.png",
  },
  {
    alt: "Empire City",
    src: "data:image/jpeg;base64,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",
  },
  {
    alt: "Masterise",
    src: "https://masterisehomesbysalereal.vn/wp-content/uploads/2024/05/logo-masterise-homes-1024x1024.jpeg",
  },
  {
    alt: "TTC",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Logo_of_the_Toronto_Transit_Commission.svg/2560px-Logo_of_the_Toronto_Transit_Commission.svg.png",
  },
  { alt: "SonKim Land", src: "https://i.ytimg.com/vi/lG0u3KrPqOc/mqdefault.jpg" },
  { alt: "Nam Long", src: "https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-Nam-Long.png" },
  {
    alt: "BW Industrial",
    src: "https://sanketoan.vn/public/library_employer/ngan.th@bwidjsc.com-31905/images/download.png",
  },
  {
    alt: "Gotec Land",
    src: "https://saigonrealestate.vn/wp-content/uploads/2021/09/logo-Gotec-Land-feature.png",
  },
];

const BUILD_PARTNERS = [
  {
    alt: "Shimizu",
    src: "https://download.logo.wine/logo/Shimizu_Corporation/Shimizu_Corporation-Logo.wine.png",
  },
  {
    alt: "Turner",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQB3vaN-hJnrFOrD-5dd57OQT6VHWBjeJyCg&s",
  },
  {
    alt: "Artelia",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbwTuZKHrsTBoDyDI8OTCN6cC7FbT11k7rQ&s",
  },
  {
    alt: "Archetype",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxptW8kdpUAk8FTc9nR3MiKMoaI6OZzFNs3Q&s",
  },
  {
    alt: "Arcadis",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Arcadis_logo.svg/2560px-Arcadis_logo.svg.png",
  },
  {
    alt: "Hyundai E&C",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgc1WUqs20kqQkVnr7DumIA2am33gy8e_h-Q&s",
  },
];

const FIN_PARTNERS = [
  {
    alt: "Techcombank",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Techcombank_logo.png",
  },
  {
    alt: "Vietcombank",
    src: "https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-Vietcombank.png",
  },
  { alt: "VIB", src: "https://upload.wikimedia.org/wikipedia/commons/5/55/LOGO-VIB-Blue.png" },
  {
    alt: "BIDV",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_BIDV.svg/2560px-Logo_BIDV.svg.png",
  },
  {
    alt: "MB Bank",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSL0gc4BbR6UcvWwe9oD2-9BuXoAiswlfkhw&s",
  },
  {
    alt: "VPBank",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/VPBank_logo.svg/2560px-VPBank_logo.svg.png",
  },
  {
    alt: "VietinBank",
    src: "https://iocrealty.com/wp-content/uploads/images/y-nghia-sau-sac-dang-sau-thiet-ke-logo-vietinbank-0.png",
  },
];

export default function AboutPartners() {
  return (
    <div className="py-10 lg:py-14">
      <LogoGrid title="Khách hàng" items={CUSTOMERS} />
      <LogoGrid title="Đối tác xây dựng" items={BUILD_PARTNERS} />
      <LogoGrid title="Đối tác tài chính" items={FIN_PARTNERS} />
    </div>
  );
}

function LogoGrid({ title, items }) {
  return (
    <section className="container mx-auto mb-12 px-4">
      <h2 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>

      {/* flex-wrap + justify-center để hàng thiếu tự căn giữa */}
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">
        {items.map((it, idx) => (
          <LogoItem key={idx} alt={it.alt} src={it.src} />
        ))}
      </div>
    </section>
  );
}

function LogoItem({ alt, src }) {
  const [err, setErr] = React.useState(false);

  return (
    <div className="flex h-[44px] w-[160px] items-center justify-center md:h-[56px] md:w-[190px] lg:h-[64px] lg:w-[220px]">
      {!err ? (
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          className="max-h-full max-w-full object-contain" // <- bỏ filter & hover
          loading="lazy"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <img
            src="/partners/_fallback.svg"
            alt={alt}
            className="h-[28px] opacity-70 md:h-[36px]"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
