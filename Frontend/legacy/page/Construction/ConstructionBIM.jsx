import { Clock3, Lightbulb, PiggyBank, Wrench } from "lucide-react";

export default function ConstructionBIM() {
  return (
    <div className="bg-white">
      {/* ===== Banner + 4 ô lợi ích ===== */}
      <section className="container mx-auto px-4 py-10 lg:py-14">
        <h1 className="mb-6 text-2xl font-extrabold text-orange-600 md:text-3xl">
          Công Nghệ BIM - Thiết Kế Thông Minh
        </h1>

        {/* Banner chính */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://www.centralcons.vn/wp-content/uploads/2021/11/bim-scaled.jpg"
            alt="Trung tâm D&B – hình minh họa kiến trúc"
            className="h-[280px] w-full object-cover md:h-[360px] lg:h-[420px]"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Lợi ích */}
        <div className="relative z-10 -mt-10 grid grid-cols-2 gap-4 md:-mt-12 md:grid-cols-4 md:gap-6">
          <BenefitCard icon={Lightbulb} title="Thiết kế 3D chi tiết" />
          <BenefitCard icon={Clock3} title="Phát hiện sớm va chạm" />
          <BenefitCard icon={PiggyBank} title="Tiết kiệm vật liệu" />
          <BenefitCard icon={Wrench} title="Thi công chính xác cao" />
        </div>
      </section>

      {/* ===== Ảnh trái + Callout (đè lên) + 2 đoạn nội dung ===== */}
      <section className="container mx-auto px-4 pb-14 lg:pb-24">
        <div className="grid items-start gap-8 md:grid-cols-2">
          {/* Ảnh bên trái */}
          <div className="relative z-0">
            <img
              src="https://www.centralcons.vn/wp-content/uploads/2021/11/IMG_0883-2-scaled.jpg"
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
                aria-label="Thông điệp BIM"
                className="max-w-[780px] rounded-xl bg-orange-600/95 px-6 py-5 text-white shadow-[0_10px_30px_rgba(16,24,40,0.14)] md:px-8"
              >
                <p className="leading-7 md:text-lg">
                  <span className="font-semibold">AN HỒNG PHÁT</span> ứng dụng công nghệ BIM
                  (Building Information Modeling) tiên tiến vào quy trình thiết kế và thi công, đảm
                  bảo mọi chi tiết được mô phỏng chính xác 3D trước khi khởi công, giúp tối ưu hóa
                  chi phí và thời gian xây dựng.
                </p>
              </div>
            </div>

            {/* Nội dung mô tả */}
            <div className="mt-6 grid gap-4 leading-7 text-gray-700 md:mt-8 md:grid-cols-1">
              <p>
                Công nghệ BIM cho phép AN HỒNG PHÁT tạo mô hình 3D chi tiết của toàn bộ công trình
                trước khi thi công. Mọi kết cấu, hệ thống điện nước, nội thất đều được mô phỏng
                chính xác, giúp phát hiện và giải quyết các vấn đề tiềm ẩn ngay từ giai đoạn thiết
                kế.
              </p>
              <p>
                Với BIM, chúng tôi có thể kiểm soát từng chi tiết kỹ thuật, tính toán chính xác khối
                lượng vật liệu, dự phòng va chạm giữa các hệ thống kỹ thuật, đồng thời tối ưu hóa
                quy trình thi công để rút ngắn thời gian và tiết kiệm chi phí cho khách hàng.
              </p>
              <p>
                Đội ngũ kỹ sư BIM chuyên nghiệp của AN HỒNG PHÁT được đào tạo bài bản, sử dụng các
                phần mềm hàng đầu như Revit, ArchiCAD, SketchUp để mang đến những bản vẽ thiết kế
                hoàn hảo nhất. Mỗi dự án đều được mô phỏng 360 độ, giúp quý khách hàng hình dung rõ
                ràng ngôi nhà mơ ước trước khi khởi công.
              </p>
              <p className="font-medium text-orange-600">
                BIM không chỉ là công nghệ, mà là cam kết của AN HỒNG PHÁT về sự minh bạch, chính
                xác và chuyên nghiệp trong từng công trình kiến trúc tân cổ điển.
              </p>
            </div>
          </div>
        </div>
      </section>
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
