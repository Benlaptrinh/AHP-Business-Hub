import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

const AWARDS = [
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/ISO-9001.2015-EV-2-scaled.jpg",
    caption: "Chứng nhận ISO 9001:2015",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/ISO-14001.2015-EV-2-scaled.jpg",
    caption: "Giải thưởng An toàn lao động",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/ISO-45001.2018-EV-2-scaled.jpg",
    caption: "Top 10 nhà thầu uy tín",
  },

  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/0303.-Chung-chi-nang-luc-SXD-Hang-2-70.3.2019-den-29.5.2029_page-0002-scaled.jpg",
    caption: "Chứng nhận hệ thống quản lý",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/a74ba360fd125d4c04031.jpg",
    caption: "Bằng khen thành tích thi công",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/ce7167513923997dc0322.jpg",
    caption: "Cúp vàng chất lượng",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/APEA-2022-1.png",
    caption: "Doanh nghiệp xuất sắc (2023)",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/Central-Construction-JSC-CE-1.jpg",
    caption: "Chứng nhận môi trường",
  },
];

const TESTIMONIAL_CERTS = [
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/Chinh-sach-dam-bao-chat-luong_page-0001.jpg",
    caption: "Thư khen – VinGroup",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/F-TOP-50-NHA-TUYEN-DUNG-DUOC-YEU-THICH-NHA-01-01-scaled.jpg",
    caption: "Đánh giá – Phu My Prosperity",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/Chinh-sach-An-toan-Suc-khoe-Moi-truong_page-0001.jpg",
    caption: "Đánh giá – BW Industrial",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/AWARD.png",
    caption: "Đánh giá – Masterise",
  },
];

const HSE = [
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/2021_SGA336_Chung-nhan-an-toan_1.5mil.jpg",
    caption: "Chứng nhận HSE 100.000 giờ an toàn",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/2021_BW-Thoi-Hoa_Chung-nhan-an-toan_500k.jpg",
    caption: "Chứng nhận HSE Năm 2022",
  },
  {
    src: "https://www.centralcons.vn/wp-content/uploads/2021/11/2021_CMC_Chung-nhan-an-toan_700k.jpg",
    caption: "Chứng nhận HSE Năm 2023",
  },
];

export default function AboutAwards() {
  return (
    <div className="py-10 lg:py-14">
      <GallerySection title="Chứng nhận & giải thưởng" items={AWARDS} />
      <GallerySection title="Đánh giá của khách hàng" items={TESTIMONIAL_CERTS} />
      <GallerySection title="Chứng nhận HSE" items={HSE} />
    </div>
  );
}

function GallerySection({ title, items }) {
  const [viewer, setViewer] = React.useState({ open: false, index: 0 });
  const open = (i) => setViewer({ open: true, index: i });
  const close = () => setViewer({ open: false, index: 0 });
  const prev = (e) => {
    e.stopPropagation();
    setViewer((v) => ({ open: true, index: (v.index - 1 + items.length) % items.length }));
  };
  const next = (e) => {
    e.stopPropagation();
    setViewer((v) => ({ open: true, index: (v.index + 1) % items.length }));
  };

  return (
    <section className="container mx-auto mb-12 px-4">
      <h2 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>

      {/* flex-wrap center: hàng còn 1-2 item vẫn nằm giữa */}
      <div className="flex flex-wrap justify-center gap-5">
        {items.map((it, idx) => (
          <figure
            key={idx}
            className="group max-w-[380px] basis-1/2 cursor-zoom-in overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:basis-1/3 lg:basis-1/4"
            onClick={() => open(idx)}
          >
            <img
              src={it.src}
              alt={it.caption}
              className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <figcaption className="border-t border-gray-100 px-3 py-2 text-xs text-gray-700">
              {it.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {viewer.open && (
        <Lightbox item={items[viewer.index]} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}

function Lightbox({ item, onClose, onPrev, onNext }) {
  React.useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.caption}
          className="max-h-[75vh] w-full rounded-lg object-contain shadow-2xl"
        />
        <p className="mt-3 text-center text-sm text-white/90">{item.caption}</p>

        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label="Close"
        >
          <X className="size-5 text-gray-700" />
        </button>
        <button
          onClick={onPrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label="Prev"
        >
          <ChevronLeft className="size-5 text-gray-700" />
        </button>
        <button
          onClick={onNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label="Next"
        >
          <ChevronRight className="size-5 text-gray-700" />
        </button>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
