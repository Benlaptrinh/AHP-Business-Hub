# API Conventions

## Response Structure
```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

## Error Structure
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## HTTP Rules
- `200/201`: thành công
- `400`: dữ liệu đầu vào không hợp lệ
- `401/403`: chưa xác thực hoặc không đủ quyền
- `500`: lỗi hệ thống
