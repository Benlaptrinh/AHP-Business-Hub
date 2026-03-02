# AHP API (NestJS)

Backend API cho `ahp-digital-platform`.

## 1. Cài đặt

```bash
npm install
cp .env.example .env
```

## 2. Chạy local

```bash
npm run start:dev
```

Mặc định API chạy ở `http://localhost:8080`.

## 3. Biến môi trường

Xem file `.env.example`:

- `PORT`
- `FRONTEND_ORIGIN`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET` (required cho flow OAuth redirect phía backend)
- `GOOGLE_REDIRECT_URI` (required cho flow OAuth redirect phía backend)
- `GOOGLE_SCOPE` (optional, mặc định: `openid,profile,email`)
- `ADMIN_EMAILS` (danh sách email admin, cách nhau bởi dấu phẩy)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_FOLDER`
- `PAYPAL_MODE`, `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`
- `MAIL_ENABLED`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`

## 4. Auth flow

### Google login (backend OAuth redirect)

1) `GET /auth/google/login?next=/admin`  
2) Google callback về `GET /auth/google/callback`  
3) Backend redirect về frontend `/login/callback?accessToken=...`

Lưu ý: trong Google Cloud Console, `Authorized redirect URI` phải khớp `GOOGLE_REDIRECT_URI`
(ví dụ local: `http://localhost:8080/auth/google/callback`).

### Google login (client gửi idToken - tương thích ngược)

`POST /auth/google`

Body:

```json
{
  "idToken": "google-id-token"
}
```

Response:

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": "...",
    "email": "admin@anhongphat.vn",
    "name": "...",
    "picture": "...",
    "role": "admin"
  }
}
```

### Get current user

`GET /auth/me` với header `Authorization: Bearer <token>`.

### Dev login (local only)

`POST /auth/dev-login`

Body:

```json
{
  "email": "admin@anhongphat.vn",
  "name": "Dev Admin"
}
```

## 5. API modules (UI-ready)

- `projects`
- `jobs`
- `payments`
- `users`
- `uploads` (Cloudinary)
- `mail` (SMTP)

Các endpoint `POST/PATCH/DELETE` và stats admin đã có guard role `admin`.

## 6. Upload ảnh Cloudinary (admin)

`POST /uploads/image` (multipart/form-data, field: `file`)

`DELETE /uploads/image`

Body:

```json
{
  "publicId": "ahp-digital-platform/example_public_id"
}
```

## 7. PayPal sandbox

### Tạo order

`POST /payments/paypal/create-order`

Body:

```json
{
  "amount": 120.5,
  "currency": "USD",
  "description": "AHP service payment",
  "invoiceId": "INV-2026-0200",
  "customerName": "Nguyen Van A",
  "customerEmail": "user@gmail.com"
}
```

### Capture order

`POST /payments/paypal/capture-order`

Body:

```json
{
  "orderId": "5O190127TN364715T",
  "invoiceId": "INV-2026-0200"
}
```

Capture thành công sẽ lưu record payment và tự gửi email receipt nếu SMTP đã cấu hình.

## 8. Gửi mail test (admin)

`POST /mail/test`

Body:

```json
{
  "to": "someone@example.com",
  "subject": "AHP test",
  "message": "Mail test from AHP API"
}
```

## 9. Scripts

```bash
npm run start:dev
npm run build
npm run test
npm run lint
```
