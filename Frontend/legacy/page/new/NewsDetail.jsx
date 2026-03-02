// src/page/new/NewsDetail.jsx
import { ChevronRight, Facebook, LinkIcon, Linkedin } from "lucide-react";
import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { NEWS, NEWS_CATEGORIES } from "../../data/news";

export default function NewsDetail() {
  const { idOrSlug } = useParams();
  const article = findArticle(idOrSlug);
  const [copied, setCopied] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState("");

  const latestNews = React.useMemo(
    () =>
      [...NEWS]
        .sort(byNewest)
        .filter((n) => n.id !== article?.id)
        .slice(0, 6),
    [article?.id]
  );

  const handleCopyLink = React.useCallback(() => {
    if (!shareUrl) return;
    try {
      navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  }, [shareUrl]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, [article?.id]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [article?.slug, article?.id]);

  if (!article) return <Navigate to="/tin-tuc" replace />;

  const categoryInfo = Object.values(NEWS_CATEGORIES).find((c) => c.key === article.category);
  const related = pickRelated(article);

  return (
    <div className="bg-white">
      <section className="relative h-[500px] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/35 to-slate-900/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/45" />
        <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent opacity-90" />
        <div className="relative z-20 h-full">
          <div className="container mx-auto flex h-full flex-col justify-end px-4 pb-16">
            <div className="max-w-2xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
                {categoryInfo?.label || "Tin tức"}
              </p>
              <h1 className="mt-3 text-3xl font-extrabold md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <nav
                className="mt-3 flex items-center gap-3 text-sm text-white/80"
                aria-label="Breadcrumb"
              >
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link to="/tin-tuc" className="hover:text-white">
                  Tin tức
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="border-b border-slate-200 pb-6 pt-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
              {categoryInfo?.label || article.category}
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <time dateTime={article.date} className="font-medium text-slate-600">
              {fmtDate(article.date)}
            </time>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              <span>Chia sẻ</span>
              <div className="flex items-center gap-2 text-slate-500">
                <a
                  href={
                    shareUrl
                      ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-500"
                >
                  <Facebook className="size-4" />
                </a>
                <a
                  href={
                    shareUrl
                      ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-500"
                >
                  <Linkedin className="size-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-500"
                  type="button"
                >
                  <LinkIcon className="size-4" />
                </button>
              </div>
              {copied && (
                <span className="ml-2 text-[10px] font-semibold text-orange-500">Đã sao chép</span>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr),320px]">
          <article className="max-w-3xl">
            {article.excerpt && (
              <div className="mb-8 rounded-2xl border border-orange-100 bg-orange-50/40 p-6 shadow-sm">
                <p className="text-lg font-medium leading-7 text-slate-700">{article.excerpt}</p>
              </div>
            )}

            <ContentRenderer blocks={article.blocks} />

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500">
              <span className="font-semibold text-slate-700">Chia sẻ bài viết:</span>
              <div className="flex items-center gap-2">
                <a
                  href={
                    shareUrl
                      ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-500"
                >
                  <Facebook className="size-4" />
                </a>
                <a
                  href={
                    shareUrl
                      ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-500"
                >
                  <Linkedin className="size-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-orange-500 hover:text-orange-500"
                  type="button"
                >
                  <LinkIcon className="size-4" />
                </button>
              </div>
              {copied && (
                <span className="text-xs font-semibold text-orange-500">Đã sao chép liên kết</span>
              )}
            </div>
          </article>

          <aside className="lg:pl-6">
            <div className="sticky top-32 space-y-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Tin mới
                </h3>
                <div className="mt-4 space-y-4">
                  {latestNews.map((n) => (
                    <Link
                      key={n.id}
                      to={`/tin-tuc/${n.slug}`}
                      className="group flex gap-3 border-b border-slate-100 pb-4 last:border-b-0"
                    >
                      <div className="h-16 w-20 overflow-hidden rounded-lg bg-slate-50">
                        <img
                          src={n.cover}
                          alt={n.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          {fmtDate(n.date)}
                        </div>
                        <div className="mt-1 text-sm font-semibold leading-5 text-slate-700 transition group-hover:text-orange-600">
                          {n.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Liên hệ truyền thông
                </h4>
                <p className="mt-3 text-sm text-slate-600">
                  Email:{" "}
                  <a href="mailto:contact@centralcons.vn" className="font-semibold text-orange-600">
                    contact@centralcons.vn
                  </a>
                </p>
                <p className="text-sm text-slate-600">Hotline: (+84) 28 3620 3515</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 pt-12">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-extrabold md:text-2xl">Bài viết liên quan</h2>
          <span className="h-[2px] w-16 rounded bg-orange-500" />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((n) => (
            <RelatedCard key={n.id} n={n} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/tin-tuc"
            className="inline-block text-sm font-semibold text-orange-600 hover:underline"
          >
            Xem thêm tin tức &rsaquo;
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function findArticle(idOrSlug) {
  if (!idOrSlug) return null;
  if (/^\d+$/.test(idOrSlug)) return NEWS.find((n) => n.id === Number(idOrSlug)) || null;
  return NEWS.find((n) => n.slug === idOrSlug) || null;
}

function pickRelated(article) {
  // Nếu có relatedIds -> lấy theo relatedIds, đủ 2 cái
  if (article.relatedIds?.length) {
    const list = article.relatedIds.map((rid) => NEWS.find((n) => n.id === rid)).filter(Boolean);
    if (list.length >= 3) return list.slice(0, 3);
    if (list.length) return list;
  }
  // Ngược lại, chọn 2 bài cùng category (loại trừ chính nó)
  const sameCate = NEWS.filter((n) => n.category === article.category && n.id !== article.id);
  if (sameCate.length >= 3) return sameCate.slice(0, 3);
  if (sameCate.length) return sameCate;
  // Fallback
  return NEWS.filter((n) => n.id !== article.id).slice(0, 3);
}

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return iso;
  }
}

function byNewest(a, b) {
  return new Date(b.date) - new Date(a.date);
}

/* --------------- content renderer --------------- */

function ContentRenderer({ blocks = [] }) {
  if (!blocks.length) return null;

  const renderImageFigure = (src, caption, idx, keyProp) => {
    if (!src) return null;
    return (
      <figure key={keyProp} className="overflow-hidden rounded-3xl bg-white shadow-lg">
        <img
          src={src}
          alt={caption || `news-image-${idx}`}
          className="w-full object-cover"
          loading="lazy"
        />
        {caption && (
          <figcaption className="px-5 pb-5 pt-4 text-center text-sm text-slate-500">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  };

  return (
    <div className="space-y-8">
      {blocks.map((b, i) => {
        const blockImageSrc = b.src || b.cover;
        const media = renderImageFigure(blockImageSrc, b.caption, i);

        switch (b.type) {
          case "p":
            if (media) {
              return (
                <div key={i} className="space-y-4">
                  {media}
                  <p className="text-[17px] leading-8 text-slate-700">{b.text}</p>
                </div>
              );
            }
            return (
              <p key={i} className="text-[17px] leading-8 text-slate-700">
                {b.text}
              </p>
            );
          case "h2":
            if (media) {
              return (
                <div key={i} className="space-y-4">
                  {media}
                  <h2 className="pt-4 text-2xl font-extrabold uppercase tracking-wide text-slate-900">
                    {b.text}
                  </h2>
                </div>
              );
            }
            return (
              <h2
                key={i}
                className="pt-4 text-2xl font-extrabold uppercase tracking-wide text-slate-900"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-3 text-xl font-bold text-slate-900">
                {b.text}
              </h3>
            );
          case "quote":
            if (media) {
              return (
                <div key={i} className="space-y-4">
                  {media}
                  <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-700">
                    {b.text}
                    {b.cite && (
                      <cite className="block not-italic text-slate-500 mt-1">— {b.cite}</cite>
                    )}
                  </blockquote>
                </div>
              );
            }
            return (
              <blockquote
                key={i}
                className="border-l-4 border-orange-500 pl-4 italic text-slate-700"
              >
                {b.text}
                {b.cite && <cite className="block not-italic text-slate-500 mt-1">— {b.cite}</cite>}
              </blockquote>
            );
          case "img":
            return renderImageFigure(blockImageSrc, b.caption, i, i);
          case "list":
            return (
              <ul key={i} className="list-disc pl-6 text-slate-800 leading-7 space-y-1">
                {b.items?.map((li, idx) => (
                  <li key={idx}>{li}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* --------------- related card --------------- */

function RelatedCard({ n }) {
  return (
    <Link
      to={`/tin-tuc/${n.slug}`}
      className="block rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={n.cover}
          alt={n.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="text-[11px] text-slate-500">
          {fmtDate(n.date)} • {n.category}
        </div>
        <h3 className="mt-1 text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
          {n.title}
        </h3>
        <span className="mt-2 inline-block text-orange-600 text-sm font-semibold hover:underline">
          Xem chi tiết &rsaquo;
        </span>
      </div>
    </Link>
  );
}
