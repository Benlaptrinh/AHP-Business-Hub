export const toSlug = (str = "") =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/** Dữ liệu mẫu (12 job) */
export const JOBS = [
  {
    id: 1,
    title: "Giám sát xây dựng (Civil Supervisor)",
    dept: "Khối thi công",
    location: "Hà Nội, TP.HCM",
    type: "Full-time",
    level: "Senior",
    slots: 7,
    deadline: "31/12/2025",
    thumb:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    summary:
      "Giám sát thi công kết cấu & hoàn thiện, đảm bảo ATLĐ – chất lượng – tiến độ tại dự án.",
    responsibilities: [
      "Tổ chức, giám sát thi công theo hồ sơ, biện pháp đã duyệt.",
      "Kiểm soát ATLĐ, môi trường, 5S khu vực phụ trách.",
      "Phối hợp nghiệm thu nội bộ/TVGS/Chủ đầu tư.",
      "Quản lý khối lượng, nhật ký, hồ sơ hoàn công.",
    ],
    requirements: [
      "Tốt nghiệp ĐH/CĐ ngành Xây dựng, 2–5 năm kinh nghiệm tương đương.",
      "Ưu tiên đã thi công dự án cao tầng, nhà công nghiệp.",
      "Hiểu biết tiêu chuẩn, quy định pháp luật về ATLĐ.",
      "Chủ động, giao tiếp & phối hợp tốt.",
    ],
    benefits: [
      "Thu nhập cạnh tranh + phụ cấp công trường.",
      "Bảo hiểm đầy đủ & khám sức khoẻ định kỳ.",
      "Lộ trình thăng tiến, chương trình đào tạo nội bộ.",
      "Môi trường chuyên nghiệp, minh bạch.",
    ],
  },
  {
    id: 2,
    title: "Kỹ sư xây dựng (Site Engineer)",
    dept: "Khối thi công",
    location: "TP.HCM",
    type: "Full-time",
    level: "Junior–Mid",
    slots: 8,
    deadline: "30/11/2025",
    thumb:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
    summary: "Triển khai bản vẽ, kiểm soát khối lượng, hồ sơ & phối hợp thi công tại hiện trường.",
    responsibilities: [
      "Triển khai bản vẽ thi công, shop drawing.",
      "Theo dõi khối lượng, vật tư & tiến độ khu vực được giao.",
      "Lập biện pháp, checklist & nghiệm thu.",
    ],
    requirements: [
      "Tốt nghiệp chuyên ngành XDDD & CN, cầu đường…",
      "1–3 năm kinh nghiệm, nhận fresher có mentor.",
      "Biết AutoCAD, Excel; ưu tiên biết Revit/Navisworks.",
    ],
    benefits: [
      "Thu nhập theo năng lực + phụ cấp site.",
      "Thưởng dự án & KPI; phúc lợi đầy đủ.",
      "Cơ hội học & rotate dự án đa dạng.",
    ],
  },
  {
    id: 3,
    title: "Giám sát An toàn (HSE)",
    dept: "Khối thi công",
    location: "Đà Nẵng",
    type: "Full-time",
    level: "All Levels",
    slots: 4,
    deadline: "31/10/2025",
    thumb:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    summary: "Giám sát và đào tạo ATLĐ, phối hợp điều tra xử lý sự cố/rủi ro tại dự án.",
    responsibilities: [
      "Giám sát ATLĐ, PCCC; kiểm tra 5S & PPE.",
      "Đào tạo nhận việc & định kỳ an toàn cho nhà thầu.",
      "Phối hợp khắc phục NCR & cải tiến hiện trường.",
    ],
    requirements: [
      "Ưu tiên chứng chỉ HSE/ATLĐ; kinh nghiệm site là lợi thế.",
      "Giao tiếp & thuyết trình tốt.",
    ],
    benefits: ["Phụ cấp an toàn, đầy đủ trang bị bảo hộ.", "Lộ trình HSE chuyên nghiệp."],
  },
  {
    id: 4,
    title: "Nhân viên Tuyển dụng (Talent Acquisition Executive)",
    dept: "Khối Nhân sự",
    location: "Hà Nội",
    type: "Full-time",
    level: "Junior–Mid",
    slots: 2,
    deadline: "30/11/2025",
    thumb:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    summary: "Tìm kiếm, phỏng vấn và đề xuất nhân sự phù hợp cho các vị trí tại công ty.",
    responsibilities: [
      "Lập kế hoạch tuyển dụng & triển khai đăng tuyển.",
      "Sàng lọc hồ sơ, phỏng vấn sơ bộ & phối hợp phỏng vấn chuyên môn.",
      "Theo dõi ứng viên & báo cáo tiến độ.",
    ],
    requirements: [
      "Tốt nghiệp ĐH ngành Quản trị nhân lực, Kinh tế, hoặc tương đương.",
      "Kỹ năng giao tiếp, phỏng vấn và thuyết phục tốt.",
      "Ưu tiên có kinh nghiệm tuyển dụng ngành xây dựng/kỹ thuật.",
    ],
    benefits: [
      "Lương thưởng theo hiệu quả tuyển dụng.",
      "Được đào tạo về kỹ năng HR chuyên sâu.",
      "Môi trường năng động, thân thiện.",
    ],
  },
  {
    id: 5,
    title: "Chuyên viên Marketing (Marketing Executive)",
    dept: "Khối Truyền thông",
    location: "TP.HCM",
    type: "Full-time",
    level: "Mid-Level",
    slots: 3,
    deadline: "15/12/2025",
    thumb:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    summary: "Lên kế hoạch, triển khai và đo lường hiệu quả các chiến dịch marketing.",
    responsibilities: [
      "Lên kế hoạch truyền thông thương hiệu & tuyển dụng.",
      "Quản lý kênh social media, viết nội dung định kỳ.",
      "Theo dõi hiệu quả & báo cáo chiến dịch.",
    ],
    requirements: [
      "Tốt nghiệp chuyên ngành Marketing, Truyền thông hoặc PR.",
      "Có kỹ năng viết content & sử dụng công cụ digital marketing.",
    ],
    benefits: [
      "Thưởng dự án & KPI rõ ràng.",
      "Được tham gia các khóa học nâng cao kỹ năng.",
      "Môi trường trẻ trung, sáng tạo.",
    ],
  },
  {
    id: 6,
    title: "Chuyên viên Kế toán (Accountant)",
    dept: "Khối Tài chính – Kế toán",
    location: "Bình Dương",
    type: "Full-time",
    level: "Mid-Level",
    slots: 2,
    deadline: "30/11/2025",
    thumb:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    summary: "Thực hiện nghiệp vụ kế toán tổng hợp, báo cáo tài chính và kiểm soát chi phí dự án.",
    responsibilities: [
      "Hạch toán, theo dõi công nợ & chi phí dự án.",
      "Lập báo cáo tài chính định kỳ.",
      "Phối hợp kiểm toán & cơ quan thuế khi cần.",
    ],
    requirements: [
      "Tốt nghiệp chuyên ngành kế toán, tài chính.",
      "Thành thạo Excel & phần mềm kế toán (MISA, FAST...).",
      "Kinh nghiệm tối thiểu 2 năm.",
    ],
    benefits: [
      "Lương tháng 13 & thưởng hiệu quả công việc.",
      "Được hỗ trợ học chứng chỉ kế toán trưởng.",
    ],
  },
  {
    id: 7,
    title: "Thiết kế nội thất (Interior Designer)",
    dept: "Khối Thiết kế",
    location: "Hà Nội",
    type: "Full-time",
    level: "Mid–Senior",
    slots: 3,
    deadline: "31/12/2025",
    thumb:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    summary: "Thiết kế concept & triển khai bản vẽ nội thất cho văn phòng, công trình dân dụng.",
    responsibilities: [
      "Phát triển concept & moodboard cho dự án.",
      "Dựng phối cảnh 3D, triển khai hồ sơ thi công.",
      "Phối hợp kỹ sư đảm bảo tính khả thi.",
    ],
    requirements: [
      "Thành thạo AutoCAD, SketchUp, 3DsMax, Photoshop.",
      "Kinh nghiệm tối thiểu 2 năm trong lĩnh vực thiết kế nội thất.",
    ],
    benefits: [
      "Lương cạnh tranh, thưởng dự án.",
      "Làm việc với các thương hiệu & vật liệu cao cấp.",
    ],
  },
  {
    id: 8,
    title: "Nhân viên IT Helpdesk",
    dept: "Khối Công nghệ thông tin",
    location: "TP.HCM",
    type: "Full-time",
    level: "Junior",
    slots: 2,
    deadline: "30/11/2025",
    thumb:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    summary: "Hỗ trợ người dùng, bảo trì hệ thống, cài đặt & xử lý sự cố máy tính, mạng nội bộ.",
    responsibilities: [
      "Hỗ trợ kỹ thuật cho nhân viên văn phòng.",
      "Bảo trì, lắp đặt thiết bị mạng, máy tính.",
      "Cập nhật phần mềm & sao lưu dữ liệu định kỳ.",
    ],
    requirements: [
      "Hiểu biết cơ bản về mạng LAN, Windows, Office.",
      "Ưu tiên có chứng chỉ MCSA, CCNA.",
    ],
    benefits: ["Được đào tạo nâng cao chuyên môn IT.", "Phụ cấp ăn trưa, điện thoại, gửi xe."],
  },
  {
    id: 9,
    title: "Project Manager (Quản lý dự án)",
    dept: "Khối Quản lý dự án",
    location: "Hà Nội, Đà Nẵng",
    type: "Full-time",
    level: "Senior",
    slots: 1,
    deadline: "15/12/2025",
    thumb:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    summary: "Quản lý tiến độ, chi phí, chất lượng & nhân sự dự án đảm bảo bàn giao đúng kế hoạch.",
    responsibilities: [
      "Lập kế hoạch & giám sát toàn bộ tiến độ thi công.",
      "Điều phối các nhóm kỹ sư, giám sát, nhà thầu phụ.",
      "Báo cáo định kỳ cho Ban Giám đốc.",
    ],
    requirements: [
      "Tối thiểu 7 năm kinh nghiệm thi công/QLDA.",
      "Kỹ năng giao tiếp & tổ chức tốt.",
    ],
    benefits: ["Thưởng dự án theo hiệu quả.", "Xe công tác, điện thoại, laptop công ty cấp."],
  },
  {
    id: 10,
    title: "Nhân viên Hành chính (Admin Executive)",
    dept: "Khối Hành chính",
    location: "Hà Nội",
    type: "Full-time",
    level: "Junior",
    slots: 2,
    deadline: "31/10/2025",
    thumb:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    summary: "Quản lý văn phòng phẩm, công tác hậu cần & hỗ trợ sự kiện nội bộ của công ty.",
    responsibilities: [
      "Quản lý tài sản, thiết bị & công cụ văn phòng.",
      "Tổ chức sự kiện nội bộ, sinh nhật, team building.",
      "Làm việc với nhà cung cấp dịch vụ.",
    ],
    requirements: [
      "Cẩn thận, giao tiếp tốt, xử lý tình huống linh hoạt.",
      "Thành thạo tin học văn phòng.",
    ],
    benefits: [
      "Thưởng hiệu quả công việc, du lịch hằng năm.",
      "Môi trường thân thiện, nhiều hoạt động nội bộ.",
    ],
  },
  {
    id: 11,
    title: "Chuyên viên Pháp chế (Legal Executive)",
    dept: "Khối Pháp chế",
    location: "TP.HCM",
    type: "Full-time",
    level: "Mid–Senior",
    slots: 1,
    deadline: "30/12/2025",
    thumb:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
    summary: "Soạn thảo, thẩm định hợp đồng, tư vấn pháp lý & xử lý tranh chấp doanh nghiệp.",
    responsibilities: [
      "Thẩm định hợp đồng & tài liệu pháp lý.",
      "Tư vấn cho các bộ phận về quy định pháp luật.",
      "Làm việc với cơ quan chức năng khi cần.",
    ],
    requirements: [
      "Tốt nghiệp Luật, có chứng chỉ hành nghề luật sư là lợi thế.",
      "Ít nhất 3 năm kinh nghiệm trong pháp chế doanh nghiệp.",
    ],
    benefits: ["Bảo hiểm sức khỏe nâng cao.", "Thưởng cuối năm hấp dẫn."],
  },
  {
    id: 12,
    title: "Nhân viên Hỗ trợ khách hàng (Customer Support)",
    dept: "Khối Dịch vụ khách hàng",
    location: "Toàn quốc (Remote)",
    type: "Full-time",
    level: "All Levels",
    slots: 5,
    deadline: "31/12/2025",
    thumb:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1200&auto=format&fit=crop",
    summary: "Tiếp nhận & xử lý yêu cầu khách hàng, đảm bảo trải nghiệm dịch vụ chuyên nghiệp.",
    responsibilities: [
      "Tiếp nhận & phản hồi yêu cầu khách hàng qua điện thoại/email.",
      "Theo dõi tiến trình xử lý & cập nhật kết quả.",
      "Phối hợp nội bộ để giải quyết khiếu nại.",
    ],
    requirements: [
      "Kỹ năng giao tiếp & xử lý tình huống tốt.",
      "Ưu tiên ứng viên có kinh nghiệm CSKH.",
    ],
    benefits: ["Làm việc remote linh hoạt.", "Thưởng hiệu quả & KPI hằng tháng."],
  },
];

/** Lấy 2 job liên quan */
export const getRelatedJobs = (idx) => [
  JOBS[(idx + 1) % JOBS.length],
  JOBS[(idx + 2) % JOBS.length],
];
