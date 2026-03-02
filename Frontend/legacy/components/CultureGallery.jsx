const CULTURE = [
  { id: 1, title: "5 Nguyên tắc phát triển bền vững", img: "/assets/image6.png" },
  { id: 2, title: "Hướng dẫn quy cách sử dụng logo", img: "/assets/image7.png" },
  { id: 3, title: "Tạp chí nội bộ Central", img: "/assets/image8.png" },
];

export default function CultureGallery() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Văn hoá </h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CULTURE.map((c) => (
            <a
              key={c.id}
              href="#"
              className="group block overflow-hidden rounded-md border bg-white shadow-[0_6px_18px_rgba(0,0,0,.06)]"
            >
              <div className="relative">
                <img
                  src={c.img}
                  alt={c.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-x-4 bottom-3">
                  <div className="flex items-stretch">
                    <span className="mr-3 w-1.5 bg-central-orange" />
                    <h4 className="text-sm font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow">
                      {c.title}
                    </h4>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
