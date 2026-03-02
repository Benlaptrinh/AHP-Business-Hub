# Troubleshooting

## API không lên
- Kiểm tra `.env` backend.
- Kiểm tra port `8080` có bị chiếm không.

## Frontend không gọi được API
- Kiểm tra `NEXT_PUBLIC_API_URL`.
- Kiểm tra CORS `FRONTEND_ORIGIN` ở backend.

## Lỗi DB connection
- Kiểm tra MySQL container đang chạy.
- Xác nhận thông tin user/password/database.
