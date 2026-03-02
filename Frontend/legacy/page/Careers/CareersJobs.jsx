import { Link } from "react-router-dom";
import { JOBS } from "../../data/jobs";
function JobCard({ job }) {
  return (
    <Link
      to={`/tuyen-dung/co-hoi-nghe-nghiep/${job.id}`} // ✅ dẫn đến trang chi tiết
      className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:-translate-y-1 md:p-7 lg:p-8"
    >
      {/* Mobile: Stack layout, Desktop: Flex layout */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6 lg:gap-8">
        <img
          src={job.thumb}
          alt={job.title}
          className="h-40 w-full rounded-xl object-cover md:h-32 md:w-40 md:flex-none lg:h-36 lg:w-44"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold text-slate-900 hover:text-orange-600 md:text-xl lg:text-2xl">
            {job.title}
          </h3>
          <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600 md:mt-2 md:flex-row md:gap-0 lg:text-base">
            <span>Phòng ban: {job.dept}</span>
            <span className="hidden md:inline"> • </span>
            <span>Địa điểm: {job.location}</span>
            <span className="hidden md:inline"> • </span>
            <span className="font-semibold text-orange-600">{job.slots} vị trí</span>
          </div>
          <p className="mt-3 line-clamp-2 text-[15px] text-gray-700 md:mt-3 lg:text-base lg:line-clamp-3 lg:leading-relaxed">
            {job.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function CareersJobs() {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Cơ hội nghề nghiệp</h2>
      <p className="mt-2 text-gray-700 md:max-w-lg">
        Hãy khám phá các vị trí đang mở và nộp hồ sơ để cùng AN HỒNG PHÁT xây dựng tương lai.
      </p>

      {/* ✅ Duyệt vòng lặp JOBS từ DB */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-8 lg:gap-10 xl:gap-12">
        {JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* ✅ FORM ỨNG TUYỂN */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[420px,1fr]">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=1600&auto=format&fit=crop"
            alt="Apply"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-white"
        >
          <h3 className="text-xl font-extrabold text-slate-900">Ứng tuyển ngay</h3>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-gray-600">Họ và tên *</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" required />
            </div>
            <div>
              <label className="text-sm text-gray-600">Vị trí ứng tuyển *</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" required />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email *</label>
              <input type="email" className="mt-1 w-full rounded-lg border px-3 py-2" required />
            </div>
            <div>
              <label className="text-sm text-gray-600">Điện thoại *</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" required />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Nội dung</label>
              <textarea rows={4} className="mt-1 w-full rounded-lg border px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Upload CV (PDF/DOC)</label>
              <input type="file" className="mt-1 block w-full text-sm" />
            </div>
          </div>

          <button className="mt-4 rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700">
            Gửi hồ sơ
          </button>
        </form>
      </div>
    </>
  );
}
