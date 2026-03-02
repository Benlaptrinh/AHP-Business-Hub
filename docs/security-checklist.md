# Security Checklist

- Validate input ở DTO và middleware.
- Không commit secret vào repo.
- Dùng `HttpOnly`/secure strategy khi lưu token (nếu dùng cookie).
- Áp dụng role guard cho route nhạy cảm.
- Cấu hình CORS theo origin cụ thể.
- Theo dõi dependency vulnerabilities định kỳ.
