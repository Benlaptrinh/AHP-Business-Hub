import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JOBS } from "../data/jobs.js";
export default function CareersSection() {
  // chỉ mở 1 job tại một thời điểm; set null nếu muốn tất cả đóng
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((cur) => (cur === id ? null : id));
  };

  // Chỉ lấy 3 jobs đầu tiên
  const displayedJobs = JOBS.slice(0, 3);

  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-12 items-stretch gap-6">
          {/* Banner trái */}
          <div className="col-span-12 md:col-span-7">
            <div className="relative h-full overflow-hidden rounded-md bg-central-blue text-white">
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
                <h3 className="mb-2 text-3xl font-black sm:text-4xl">Tuyển dụng</h3>
                <p className="max-w-xl text-white/90">
                  Chúng tôi luôn tìm kiếm ứng viên tiềm năng cho hợp tác và phát triển bền vững
                </p>

                <Link
                  to="/tuyen-dung/co-hoi-nghe-nghiep"
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-bold text-central-blue hover:opacity-90"
                >
                  Xem tất cả vị trí
                </Link>

                <a
                  href="mailto:tuyendung@anhongphat.com"
                  className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Gửi CV trực tiếp
                </a>
              </div>
            </div>
          </div>

          {/* Danh sách vị trí bên phải (accordion) */}
          <div className="col-span-12 md:col-span-5">
            <div className="h-full divide-y rounded-md border bg-white">
              {displayedJobs.map((j) => {
                const open = openId === j.id;
                return (
                  <div key={j.id} className="p-0">
                    {/* Header dòng job */}
                    <button
                      onClick={() => toggle(j.id)}
                      className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-slate-50 sm:p-1"
                      aria-expanded={open}
                      aria-controls={`job-panel-${j.id}`}
                    >
                      {/* Thumbnail */}
                      <img
                        src={j.thumb}
                        alt={j.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-extrabold leading-snug text-slate-900">
                          {j.title}
                        </div>
                        <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {j.location} • {j.type} • {j.level}
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Hạn nộp: {j.deadline || "Đang nhận hồ sơ"}
                        </div>
                      </div>
                      {open ? (
                        <Minus className="mt-1 size-5 shrink-0 text-slate-500" />
                      ) : (
                        <Plus className="mt-1 size-5 shrink-0 text-slate-500" />
                      )}
                    </button>

                    {/* Panel chi tiết (anim mượt bằng grid-rows) */}
                    <div
                      id={`job-panel-${j.id}`}
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <div className="px-4 pb-4 text-sm text-slate-700 sm:px-5">
                          <p className="mb-2">{j.summary}</p>
                          <ul className="list-disc space-y-1 pl-5">
                            {j.responsibilities?.slice(0, 3).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                          <div className="mt-3 flex gap-3">
                            <a
                              href="mailto:tuyendung@anhongphat.com?subject=Ứng tuyển - "
                              className="inline-block rounded-md bg-central-blue px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
                            >
                              Ứng tuyển
                            </a>
                            <Link
                              to={`/tuyen-dung/co-hoi-nghe-nghiep/${j.id}`}
                              className="inline-block rounded-md border border-central-blue px-3 py-2 text-xs font-semibold text-central-blue hover:bg-central-blue/5"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              *Mặc định chỉ mở 1 mục; nếu muốn mở nhiều mục cùng lúc, mình chỉnh lại logic là xong.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
