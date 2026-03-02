import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Logo demo – thay bằng logo thật (PNG/SVG nền trong suốt)
const LOGOS = [
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=Nova+Land",
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=BIM+Group",
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=Trung+Thuy+Group",
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=BW+Industrial",
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=MIK",
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=SunGroup",
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=Vinhomes",
  "https://dummyimage.com/200x72/ffffff/0a0a0a&text=Masterise",
];

export default function ClientsPartners() {
  return (
    <section className="bg-[linear-gradient(0deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_26px] py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Khách hàng và đối tác
          </h3>
          <a href="#" className="text-sm font-semibold text-central-blue hover:underline">
            Xem tất cả →
          </a>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-7xl px-4 pb-12 sm:px-6">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2400, pauseOnMouseEnter: true, disableOnInteraction: false }}
          loop
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 2.2, spaceBetween: 16 },
            480: { slidesPerView: 3, spaceBetween: 18 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 28 },
          }}
          className="clients-partners-swiper"
        >
          {LOGOS.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="grid h-20 place-items-center rounded-md border bg-white shadow-sm">
                <img
                  src={src}
                  alt={`Logo ${i + 1}`}
                  className="max-h-12 object-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
