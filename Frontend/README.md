# AHP Digital Platform (Next.js)

Frontend cho hệ thống AHP.

## 1. Cài đặt

```bash
npm install
cp .env.example .env.local
```

## 2. Biến môi trường

- `NEXT_PUBLIC_API_URL` (mặc định API NestJS local: `http://localhost:8080`)

## 3. Chạy local

```bash
npm run dev
```

App chạy tại `http://localhost:3000`.

## 4. Route chính

- Public site legacy: `/`
- Login: `/login`
- User profile: `/profile`
- Admin dashboard: `/admin`
- Admin CRUD:
  - `/admin/projects`
  - `/admin/jobs`
  - `/admin/payments`
  - `/admin/users`

## 5. Kết nối backend

Frontend gọi trực tiếp các endpoint trong `ahp-api`:

- Auth: `/auth/google/login`, `/auth/google/callback`, `/auth/dev-login`, `/auth/me`
- User: `/users/me`, `/users`, `/users/stats`
- Projects: `/projects`, `/projects/stats`
- Jobs: `/jobs`, `/jobs/stats`
- Payments: `/payments`, `/payments/my`, `/payments/stats`

## 6. Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```
