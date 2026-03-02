import { Quote } from "lucide-react";

export default function AboutMessage() {
  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Thông điệp </h1>
      </section>

      {/* Top block: portrait + quote box */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* Portrait with brand circle */}
          <div className="lg:col-span-6">
            {/* <div className="relative overflow-hidden rounded-2xl bg-white">
              <div className="absolute left-1/2 top-6 size-[360px] -translate-x-1/2 rounded-full bg-orange-600/95" />
              <div className="absolute left-[54%] top-[54px] size-[280px] -translate-x-1/2 rounded-full bg-white" />
              <img
                src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/387148707_725304822949813_144723629684317130_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=C29-10SAPQ0Q7kNvwFDSW40&_nc_oc=AdlmOMjddyGOUqlOcyw7YnmMqUlSicoX2a46OmHgbJAOo4NJcgu1hhu4GG5Lq167avY&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=5OxFQ1tRXUyCAAs9sXgT0w&oh=00_AfeL2jKqyJuz6XEsplABWFczEBHAAIbpHNlSv2Vk8T6VyQ&oe=69023A32"
                alt="Logo AN HỒNG PHÁT"
                className="relative z-10 mx-auto w-full max-w-[280px] object-contain pt-10 p-8"
                loading="lazy"
              />
            </div> */}
          </div>

          {/* Quote card + bg building */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">
              {/* building bg (phải nhạt) */}
              <img
                src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1400&auto=format&fit=crop"
                alt=""
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 object-cover opacity-30 md:block"
                loading="lazy"
              />
              <div className="relative z-10">
                <div className="flex items-start gap-3 leading-relaxed text-gray-700">
                  <Quote className="mt-1 size-6 shrink-0 text-orange-600" />
                  <p>
                    AN HỒNG PHÁT được tạo dựng bởi đam mê kiến trúc và khát vọng mang đến những công
                    trình biệt thự, nhà phố tân cổ điển đẳng cấp cho gia đình Việt. Mỗi công trình
                    chúng tôi thiết kế và xây dựng đều thể hiện sự tinh tế trong từng đường nét, kết
                    hợp hài hòa giữa vẻ đẹp cổ điển Châu Âu và công năng hiện đại.
                  </p>
                </div>
                <div className="mt-5">
                  <p className="font-bold text-gray-900">Đại diện AN HỒNG PHÁT</p>
                  <p className="text-sm text-gray-600">Nhà sáng lập – Giám đốc điều hành</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body text + right image */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="leading-7 text-gray-700 lg:col-span-7">
            <p className="mb-4">
              AN HỒNG PHÁT là công ty tư vấn thiết kế xây dựng chuyên thiết kế và thi công các công
              trình biệt thự, nhà phố với phong cách tân cổ điển Châu Âu, mang đến không gian sống
              đẳng cấp và sang trọng. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào đã hoàn thành
              nhiều dự án tại khu vực Miền Trung và Miền Nam, nhận được sự tin tưởng và đánh giá cao
              từ khách hàng.
            </p>
            <p className="mb-4">
              Đội ngũ kiến trúc sư, kỹ sư của AN HỒNG PHÁT được đào tạo bài bản, giàu kinh nghiệm
              trong lĩnh vực thiết kế và thi công công trình tân cổ điển. Chúng tôi áp dụng quy
              trình làm việc chuyên nghiệp, cam kết chất lượng hoàn thiện cao cấp, đúng tiến độ và
              phù hợp với ngân sách của từng gia đình.
            </p>
            <p>
              Chúng tôi trân trọng sự tin tưởng của Quý khách hàng và cam kết đồng hành cùng bạn
              trong hành trình kiến tạo tổ ấm mơ ước. AN HỒNG PHÁT - Nơi kiến trúc tân cổ điển trở
              thành hiện thực.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <img
                src="https://www.centralcons.vn/wp-content/uploads/2021/11/ceo-message2-720x450.jpg"
                alt="Công trình & kỹ thuật"
                className="h-[280px] w-full object-cover md:h-[360px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
