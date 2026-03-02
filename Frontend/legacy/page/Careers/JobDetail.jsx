// src/page/Careers/JobDetail.jsx
import { Link, Navigate, useParams } from "react-router-dom";
import { getRelatedJobs, JOBS, toSlug } from "../../data/jobs";

export default function JobDetail() {
  const { idOrSlug } = useParams(); // nhận id hoặc slug
  let job = null;
  let currentIndex = -1;

  // Thử theo id number
  if (/^\d+$/.test(idOrSlug)) {
    const nid = Number(idOrSlug);
    currentIndex = JOBS.findIndex((j) => j.id === nid);
    if (currentIndex >= 0) job = JOBS[currentIndex];
  }
  // Nếu chưa có -> theo slug
  if (!job) {
    const slug = idOrSlug?.toLowerCase();
    currentIndex = JOBS.findIndex((j) => toSlug(j.title) === slug);
    if (currentIndex >= 0) job = JOBS[currentIndex];
  }

  if (!job) return <Navigate to="/tuyen-dung/co-hoi-nghe-nghiep" replace />;

  const related = getRelatedJobs(currentIndex);

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative">
        <img
          src={job.thumb}
          alt={job.title}
          className="h-[280px] md:h-[360px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-0 container mx-auto px-4 flex items-end pb-6">
          <div>
            <p className="text-white/80 text-sm">Careers</p>
            <h1 className="mt-1 text-2xl md:text-4xl font-extrabold text-white">{job.title}</h1>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="container mx-auto px-4 py-8 md:py-10 grid lg:grid-cols-[320px,1fr] gap-8">
        {/* SIDEBAR */}
        <aside className="h-max rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-900">Thông tin chung</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <InfoItem label="Phòng ban" value={job.dept} />
            <InfoItem label="Địa điểm" value={job.location} />
            <InfoItem label="Hình thức" value={job.type} />
            <InfoItem label="Cấp bậc" value={job.level} />
            <InfoItem
              label="Số lượng"
              value={<span className="font-semibold">{job.slots} vị trí</span>}
            />
            <InfoItem label="Hạn nộp" value={job.deadline} />
          </div>
          <Link
            to="#apply"
            className="mt-4 inline-block w-full rounded-lg bg-orange-600 px-4 py-2 text-center font-semibold text-white hover:bg-orange-700"
          >
            Ứng tuyển ngay
          </Link>
        </aside>

        {/* MAIN */}
        <main className="space-y-8">
          <Block title="Mô tả ngắn">
            <p className="text-gray-700 leading-7">{job.summary}</p>
          </Block>

          <Block title="Mô tả công việc">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.responsibilities?.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </Block>

          <Block title="Yêu cầu">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.requirements?.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </Block>

          <Block title="Quyền lợi">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {job.benefits?.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </Block>

          {/* APPLY FORM */}
          <Block id="apply" title="Ứng tuyển vị trí này">
            <ApplyForm defaultPosition={job.title} />
          </Block>

          {/* RELATED JOBS */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-extrabold text-slate-900">Vị trí liên quan</h3>
              <span className="h-[2px] w-20 bg-orange-500 rounded" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((r) => (
                <RelatedCard key={r.id} job={r} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                to="/tuyen-dung/co-hoi-nghe-nghiep"
                className="text-orange-600 font-semibold hover:underline"
              >
                Xem tất cả cơ hội &rsaquo;
              </Link>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-24 shrink-0 text-gray-500">{label}</span>
      <span className="text-slate-900/90">{value}</span>
    </div>
  );
}

function Block({ title, children, id }) {
  return (
    <section id={id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg md:text-xl font-extrabold text-slate-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ApplyForm({ defaultPosition }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="text-sm text-gray-600">Họ và tên *</label>
        <input className="mt-1 w-full rounded-lg border px-3 py-2" required />
      </div>
      <div>
        <label className="text-sm text-gray-600">Vị trí ứng tuyển *</label>
        <input
          className="mt-1 w-full rounded-lg border px-3 py-2"
          defaultValue={defaultPosition}
          required
        />
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
      <button className="md:col-span-2 mt-2 w-full rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700">
        Gửi hồ sơ
      </button>
    </form>
  );
}

function RelatedCard({ job }) {
  return (
    <Link
      to={`/tuyen-dung/co-hoi-nghe-nghiep/${job.id}`}
      className="block rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={job.thumb}
          alt={job.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h4 className="font-extrabold text-slate-900">{job.title}</h4>
        <p className="mt-1 text-sm text-gray-600">
          {job.location} • <span className="text-orange-600">{job.slots} vị trí</span>
        </p>
        <span className="mt-2 inline-block text-sm font-semibold text-orange-600">
          Xem chi tiết &rsaquo;
        </span>
      </div>
    </Link>
  );
}
