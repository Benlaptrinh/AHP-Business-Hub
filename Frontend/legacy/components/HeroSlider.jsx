import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Slide data - sử dụng ảnh local từ folder public/assets/HeroSlider
const SLIDES = [
  {
    id: 1,
    image: "/assets/HeroSlider/image1.png",
    title: "Biệt thự tân cổ điển – Đẳng cấp Châu Âu",
    alt: "Biệt thự tân cổ điển AN HỒNG PHÁT",
  },
  {
    id: 2,
    image: "/assets/HeroSlider/image2.png",
    title: "Nhà phố hiện đại – Tối ưu không gian sống",
    alt: "Nhà phố hiện đại AN HỒNG PHÁT",
  },
  {
    id: 3,
    image: "/assets/HeroSlider/image3.png",
    title: "Thi công chất lượng – Bàn giao đúng hẹn",
    alt: "Thi công xây dựng AN HỒNG PHÁT",
  },
];

const HeroSlider = () => {
  return (
    <section className="relative w-full select-none">
      {/* Custom Navigation Buttons */}
      <button
        className="hero-slider-prev absolute left-4 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-md bg-orange-600/90 text-white shadow-xl transition-all hover:scale-110 hover:bg-orange-700 md:left-8 md:size-14 lg:left-12"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-6 md:size-7" />
      </button>

      <button
        className="hero-slider-next absolute right-4 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-md bg-orange-600/90 text-white shadow-xl transition-all hover:scale-110 hover:bg-orange-700 md:right-8 md:size-14 lg:right-12"
        aria-label="Next slide"
      >
        <ChevronRight className="size-6 md:size-7" />
      </button>

      {/* Swiper Slider - Full Width */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        speed={800}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet bg-white/60",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        navigation={{
          nextEl: ".hero-slider-next",
          prevEl: ".hero-slider-prev",
        }}
        className="h-[55vh] max-h-[800px] min-h-[400px] w-full sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh]"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="size-full object-cover"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            {/* Text Content */}
            <div className="absolute bottom-8 left-6 z-10 max-w-4xl sm:bottom-12 sm:left-10 md:bottom-16 md:left-16 lg:bottom-20 lg:left-24">
              <div className="flex items-stretch">
                {/* Orange Accent Bar */}
                <span className="mr-3 w-1 shrink-0 bg-orange-600 sm:w-1.5 md:mr-5 md:w-2" />

                {/* Title Box */}
                <div className="rounded-sm bg-orange-600/90 px-5 py-3 text-white shadow-2xl backdrop-blur-sm sm:px-7 sm:py-4 md:px-10 md:py-6">
                  <h3 className="text-base font-bold uppercase leading-tight tracking-wide sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
