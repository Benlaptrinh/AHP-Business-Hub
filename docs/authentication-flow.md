# Authentication Flow

## JWT Flow
1. User login thành công.
2. Backend cấp access token.
3. Frontend lưu token an toàn và gửi qua `Authorization: Bearer <token>`.
4. Backend guard xác thực token và role.

## Google OAuth Flow
1. Frontend nhận Google credential.
2. Gửi token/credential về backend.
3. Backend verify với Google và phát hành JWT nội bộ.
