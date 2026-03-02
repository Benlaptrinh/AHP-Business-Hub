import { Link } from "react-router-dom";

export default function CareersPolicies() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-orange-600 md:text-3xl">
          Chính Sách Nhân Sự & Phúc Lợi
        </h2>

        {/* BLOCK 1: Intro (image left, orange panel right) */}
        <section className="mb-12 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
          <div className="grid items-stretch md:grid-cols-2">
            <img
              src="/assets/Doingu.png"
              alt="Đội ngũ AN HỒNG PHÁT"
              className="h-full w-full object-cover"
            />
            <div className="relative bg-gradient-to-br from-orange-950 to-orange-900 p-6 text-white md:p-10">
              <div className="absolute inset-y-0 left-0 w-1 bg-orange-500" />
              <div className="relative ml-4 md:ml-6">
                <h3 className="mb-4 text-xl font-bold md:text-2xl">
                  Đội Ngũ - Trái Tim AN HỒNG PHÁT
                </h3>
                <p className="leading-7 md:text-lg md:leading-8">
                  <span className="font-semibold">AN HỒNG PHÁT</span> - công ty tư vấn thiết kế xây
                  dựng - tin rằng nguồn nhân lực chất lượng là nền tảng của mọi thành công. Chính
                  sách nhân sự của chúng tôi được xây dựng đồng bộ từ tuyển dụng, đào tạo, phát
                  triển nghề nghiệp đến lương thưởng và phúc lợi đãi ngộ, nhằm tạo môi trường làm
                  việc chuyên nghiệp, công bằng và gắn bó lâu dài.
                </p>
                <p className="mt-4 text-orange-200">
                  Chúng tôi đề cao đạo đức nghề nghiệp, tinh thần trách nhiệm và sự sáng tạo trong
                  từng công trình.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 2: Compensation card */}
        {/* <section className="mb-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
            <div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
                Chính sách lương, thưởng, phúc lợi đãi ngộ
              </h3>
              <p className="text-gray-700 leading-7">
                CENTRAL tạo dựng hệ thống đãi ngộ cạnh tranh theo quy chế rõ ràng: lương theo hiệu
                quả công việc, thưởng theo thành tích hàng năm/quý, phúc lợi đa dạng (bảo hiểm, chăm
                sóc sức khoẻ, nghỉ mát, team building, phụ cấp công trường…). Cơ chế xét nâng lương
                định kỳ minh bạch.
              </p>
              <ul className="mt-4 grid gap-2 text-gray-800">
                <li>• Thưởng dự án &amp; thưởng hiệu suất</li>
                <li>• Gói bảo hiểm mở rộng &amp; khám sức khoẻ định kỳ</li>
                <li>• Hỗ trợ ăn ở, đi lại tại công trường</li>
                <li>• Nghỉ phép, du lịch, hoạt động gắn kết định kỳ</li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-xl">
              <img
                src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRtpmJZH2KQpgqP2d6MfMvp3s2o0r2rPqO-BMCEioMy2kg-0onH"
                alt="Welfare"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section> */}
        {/* BLOCK 2: Compensation (refined) */}
        <section className="mb-12 rounded-[28px] border border-gray-200 bg-white shadow-lg">
          <div className="grid items-center md:grid-cols-2">
            {/* Text */}
            <div className="p-6 md:p-10">
              <div className="relative pl-5 md:pl-7">
                {/* Accent bar */}
                <span className="absolute left-0 top-1 h-8 w-1 bg-orange-500 md:h-10" />
                <h3 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Lương, Thưởng & Phúc Lợi Cạnh Tranh
                </h3>
              </div>

              <p className="mt-5 max-w-2xl leading-7 text-slate-700 md:leading-8">
                <span className="font-semibold text-orange-600">AN HỒNG PHÁT</span> xây dựng hệ
                thống đãi ngộ minh bạch và cạnh tranh: lương theo năng lực và hiệu quả công việc,
                thưởng theo thành tích dự án và kết quả kinh doanh hàng quý/năm. Chúng tôi cam kết
                tạo môi trường thu nhập xứng đáng với công sức và cống hiến của mỗi thành viên.
              </p>

              {/* Bullets */}
              <ul className="mt-6 space-y-3 text-slate-800">
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>
                    <strong>Lương cạnh tranh:</strong> Trả theo năng lực, xét tăng lương định kỳ 6
                    tháng/lần
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>
                    <strong>Thưởng dự án:</strong> Thưởng hoàn thành đúng tiến độ, thưởng hiệu suất
                    cao
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>
                    <strong>Bảo hiểm đầy đủ:</strong> BHXH, BHYT, BHTN + gói bảo hiểm sức khỏe mở
                    rộng
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>
                    <strong>Phụ cấp công trường:</strong> Hỗ trợ ăn uống, đi lại, ở lại công trường
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>
                    <strong>Du lịch & team building:</strong> Nghỉ mát hàng năm, hoạt động gắn kết
                    định kỳ
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>
                    <strong>Thưởng lễ tết:</strong> Quà tết, thưởng 30/4, 2/9 và các ngày lễ lớn
                  </span>
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="p-4 md:p-6">
              <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-gray-200">
                <img
                  src="/assets/PhucLoi.png"
                  alt="Phúc lợi nhân viên AN HỒNG PHÁT"
                  className="h-full w-full object-cover md:aspect-[16/10]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* BLOCK 3: Culture card on right */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-orange-50 to-white shadow-lg">
          <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src="/assets/File_Nha/53_29_06_2025.JPG"
                alt="Văn hóa AN HỒNG PHÁT"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-orange-600 md:text-2xl">
                Văn Hóa Doanh Nghiệp
              </h3>
              <p className="leading-7 text-gray-700">
                <span className="font-semibold">AN HỒNG PHÁT</span> xây dựng văn hóa làm việc chuyên
                nghiệp, đề cao tinh thần trách nhiệm, sự tôn trọng và công bằng. Chúng tôi khuyến
                khích sáng tạo, hợp tác giữa các bộ phận, lấy chất lượng công trình và sự hài lòng
                của khách hàng làm thước đo thành công.
              </p>
              <p className="mt-3 leading-7 text-gray-700">
                Đội ngũ AN HỒNG PHÁT được đào tạo nội bộ thường xuyên, có cơ hội phát triển nghề
                nghiệp rõ ràng từ nhân viên lên trưởng nhóm, quản lý dự án và các vị trí lãnh đạo.
              </p>
              <Link
                to="/tuyen-dung"
                className="mt-5 inline-block rounded-md bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl"
              >
                Xem Vị Trí Tuyển Dụng
              </Link>
            </div>
          </div>
        </section>

        {/* BLOCK 4: Development & Training */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-10">
          <div className="relative pl-5 md:pl-7">
            <span className="absolute left-0 top-1 h-8 w-1 bg-orange-500 md:h-10" />
            <h3 className="mb-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
              Đào Tạo & Phát Triển Nghề Nghiệp
            </h3>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TrainingCard
              title="Đào Tạo Nội Bộ"
              description="Các khóa học về kỹ thuật thi công, quản lý dự án, an toàn lao động và kỹ năng mềm được tổ chức định kỳ bởi chuyên gia trong ngành."
            />
            <TrainingCard
              title="Mentoring & Coaching"
              description="Nhân viên mới được gắn với mentor giàu kinh nghiệm, hỗ trợ học hỏi và phát triển kỹ năng nghề nghiệp trong môi trường thực tế."
            />
            <TrainingCard
              title="Lộ Trình Thăng Tiến"
              description="Cơ chế đánh giá năng lực minh bạch, xét thăng tiến định kỳ dựa trên hiệu suất công việc và đóng góp cho công ty."
            />
          </div>
        </section>

        {/* BLOCK 5: Work Environment */}
        <section className="mb-16 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg md:p-10">
          <div className="relative pl-5 md:pl-7">
            <span className="absolute left-0 top-1 h-8 w-1 bg-orange-500 md:h-10" />
            <h3 className="mb-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
              Môi Trường Làm Việc
            </h3>
          </div>

          <div className="mt-6 grid gap-4 leading-7 text-gray-700 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-orange-600">⏰ Giờ làm việc linh hoạt</h4>
              <p>
                Giờ hành chính từ 8h-17h, nghỉ trưa 1.5 tiếng. Linh động điều chỉnh theo tiến độ dự
                án.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-600">🏢 Văn phòng hiện đại</h4>
              <p>
                Văn phòng tại Đà Nẵng được trang bị đầy đủ tiện nghi, máy lạnh, wifi tốc độ cao.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-600">🛡️ An toàn lao động</h4>
              <p>
                Trang bị đầy đủ thiết bị bảo hộ, đào tạo an toàn lao động định kỳ cho nhân viên công
                trường.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-orange-600">🎉 Sự kiện nội bộ</h4>
              <p>
                Tổ chức sinh nhật, year-end party, team building, du lịch hàng năm để gắn kết đội
                ngũ.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-orange-600 p-6 text-center text-white">
            <p className="text-lg font-semibold md:text-xl">
              &quot;AN HỒNG PHÁT không chỉ tìm kiếm nhân viên, mà tìm kiếm những đồng đội gắn bó lâu
              dài, cùng nhau xây dựng những công trình kiến trúc tân cổ điển đẳng cấp.&quot;
            </p>
            <p className="mt-3 text-sm text-orange-200">— Ban Giám Đốc AN HỒNG PHÁT</p>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ----------------- small components ----------------- */
function TrainingCard({ title, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-orange-300">
      <h4 className="mb-2 text-lg font-bold text-gray-900">{title}</h4>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
