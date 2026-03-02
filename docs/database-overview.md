# Database Overview (MySQL)

## Core Entities
- `users`
- `projects`
- `jobs`
- `payments`

## Design Notes
- Chuẩn hóa quan hệ khóa ngoại cho tính toàn vẹn dữ liệu.
- Ưu tiên index cho cột filter/search thường dùng.
- Tách dữ liệu auth và business để giảm coupling.
