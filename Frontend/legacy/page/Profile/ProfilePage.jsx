import { Bell, BriefcaseBusiness, CreditCard, LogOut, Mail, MapPin, Phone, Shield } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const TOKEN_KEY = "ahp_access_token";
const USER_KEY = "ahp_auth_user";

function toCurrency(value) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

async function requestWithAuth(path, token) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (typeof window === "undefined") return;

      const token = window.localStorage.getItem(TOKEN_KEY);
      if (!token) {
        window.location.href = "/login?next=%2Fprofile";
        return;
      }

      try {
        const [profileData, paymentData] = await Promise.all([
          requestWithAuth("/users/me", token),
          requestWithAuth("/payments/my", token),
        ]);

        if (!active) return;

        if (profileData.role === "admin") {
          window.location.href = "/admin";
          return;
        }

        setProfile(profileData);
        setPayments(Array.isArray(paymentData) ? paymentData : []);
      } catch (error) {
        if (!active) return;
        const message = error instanceof Error ? error.message : "Không thể tải profile";
        setErrorMessage(message);

        if (message.includes("401") || message.includes("403")) {
          clearSession();
          window.location.href = "/login?next=%2Fprofile";
          return;
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, []);

  const totalPayment = useMemo(
    () => payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    [payments]
  );

  if (loading) {
    return (
      <>
        <div className="h-[72px] md:h-[108px]" />
        <div className="grid min-h-[50vh] place-items-center px-4">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
            Đang tải hồ sơ người dùng...
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <div className="h-[72px] md:h-[108px]" />
        <section className="bg-slate-100 py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
              {errorMessage || "Không thể tải hồ sơ người dùng."}
            </div>
            <div className="mt-4">
              <a
                href="/login"
                className="inline-flex rounded-lg bg-[#001F3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#001633]"
              >
                Quay lại đăng nhập
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="h-[72px] md:h-[108px]" />
      <section className="bg-slate-100 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] px-6 py-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">User Profile</p>
              <h1 className="mt-2 text-3xl font-bold">Xin chào, {profile.name}</h1>
              <p className="mt-1 text-sm text-white/80">Tài khoản người dùng theo dõi công việc và thanh toán</p>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_2fr]">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#001F3F] text-2xl font-bold text-white">
                    {profile.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{profile.name}</p>
                    <p className="text-sm text-slate-500">{profile.email}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-700">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-orange-600" /> {profile.phone || "Chưa cập nhật"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-orange-600" /> {profile.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-600" /> TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  Role hiện tại: <span className="font-semibold">{String(profile.role || "user").toUpperCase()}</span>
                </div>
              </article>

              <article className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Số hóa đơn của tôi</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{payments.length}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Đã thanh toán</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {payments.filter((item) => item.status === "paid").length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Tổng giá trị</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{toCurrency(totalPayment)}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="text-lg font-bold text-slate-900">Tác vụ nhanh</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      <BriefcaseBusiness className="h-4 w-4 text-orange-600" /> Theo dõi Jobs
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      <CreditCard className="h-4 w-4 text-orange-600" /> Lịch sử Payments
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      <Bell className="h-4 w-4 text-orange-600" /> Cài đặt thông báo
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      <Shield className="h-4 w-4 text-orange-600" /> Bảo mật tài khoản
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Về trang chủ
            </Link>
            <a
              href="/login"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Về trang Login
            </a>
            <button
              type="button"
              onClick={() => {
                clearSession();
                window.location.href = "/login";
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              <LogOut className="h-4 w-4" /> Đăng xuất
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
