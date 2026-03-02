import { Clock3, Lightbulb, PiggyBank, Wrench } from "lucide-react";

export default function ConstructionERP() {
  return (
    <div className="bg-white">
      {/* ===== Banner + 4 ô lợi ích ===== */}
      <section className="container mx-auto px-4 py-10 lg:py-14">
        <h1 className="mb-6 text-2xl font-extrabold text-orange-600 md:text-3xl">
          Hệ Thống Quản Lý Dự Án ERP
        </h1>

        {/* Banner chính */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://media.licdn.com/dms/image/v2/C5616AQHjoUo7m7ZMFg/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1661405282288?e=2147483647&v=beta&t=M7vyOsaH-QDICUr_9vRGMvKeOz5vr9RzRIXHi3g2lfE"
            alt="Trung tâm D&B – hình minh họa kiến trúc"
            className="h-[280px] w-full object-cover md:h-[360px] lg:h-[420px]"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Lợi ích */}
        <div className="relative z-10 -mt-10 grid grid-cols-2 gap-4 md:-mt-12 md:grid-cols-4 md:gap-6">
          <BenefitCard icon={Lightbulb} title="Quản lý tập trung" />
          <BenefitCard icon={Clock3} title="Theo dõi tiến độ realtime" />
          <BenefitCard icon={PiggyBank} title="Kiểm soát ngân sách" />
          <BenefitCard icon={Wrench} title="Báo cáo tự động" />
        </div>
      </section>

      {/* ===== Ảnh trái + Callout (đè lên) + 2 đoạn nội dung ===== */}
      <section className="container mx-auto px-4 pb-14 lg:pb-24">
        <div className="grid items-start gap-8 md:grid-cols-2">
          {/* Ảnh bên trái */}
          <div className="relative z-0">
            <img
              src="https://dx.smartosc.com/wp-content/uploads/2022/11/erp-3.jpeg"
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
                aria-label="Thông điệp ERP"
                className="max-w-[780px] rounded-xl bg-orange-600/95 px-6 py-5 text-white shadow-[0_10px_30px_rgba(16,24,40,0.14)] md:px-8"
              >
                <p className="leading-7 md:text-lg">
                  <span className="font-semibold">AN HỒNG PHÁT</span> triển khai hệ thống ERP
                  (Enterprise Resource Planning) hiện đại để quản lý toàn diện mọi khâu từ thiết kế,
                  thu mua vật tư, lập tiến độ thi công đến bàn giao công trình, đảm bảo minh bạch
                  tuyệt đối và kiểm soát chặt chẽ mọi chi tiết dự án.
                </p>
              </div>
            </div>

            {/* Nội dung mô tả */}
            <div className="mt-6 grid gap-4 leading-7 text-gray-700 md:mt-8 md:grid-cols-1">
              <p>
                Hệ thống ERP của AN HỒNG PHÁT tích hợp đồng bộ tất cả các bộ phận: quản lý dự án, kế
                toán tài chính, thu mua vật tư, nhân sự, và chất lượng thi công. Mọi thông tin được
                cập nhật realtime, giúp ban lãnh đạo và khách hàng nắm bắt tình hình công trình bất
                cứ lúc nào.
              </p>
              <p>
                Với ERP, chúng tôi có thể theo dõi chi tiết tiến độ từng hạng mục, kiểm soát ngân
                sách sát sao, cảnh báo tự động khi có sai lệch so với kế hoạch ban đầu. Điều này
                giúp AN HỒNG PHÁT chủ động xử lý vấn đề, đảm bảo không có sự chậm trễ hay phát sinh
                ngoài ý muốn.
              </p>
              <p>
                Khách hàng sẽ được cung cấp tài khoản truy cập hệ thống để theo dõi tiến độ thi
                công, xem báo cáo chi tiết về vật liệu sử dụng, nhân công triển khai, và hình ảnh
                thực tế công trường được cập nhật hàng tuần. Sự minh bạch này tạo nên niềm tin vững
                chắc giữa AN HỒNG PHÁT và quý khách hàng.
              </p>
              <p>
                Đội ngũ quản lý dự án được đào tạo chuyên sâu về vận hành ERP, đảm bảo mọi dữ liệu
                đều được ghi nhận chính xác và xử lý kịp thời. Từ việc đặt hàng vật liệu, lên lịch
                thi công, đến thanh toán cho nhà thầu phụ, tất cả đều được quản lý tự động và khoa
                học.
              </p>
              <p className="font-medium text-orange-600">
                ERP là nền tảng công nghệ giúp AN HỒNG PHÁT vận hành hiệu quả, tiết kiệm chi phí và
                cam kết bàn giao đúng tiến độ, đúng chất lượng cho mọi công trình biệt thự tân cổ
                điển.
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
