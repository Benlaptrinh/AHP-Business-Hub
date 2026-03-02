export const NEWS_CATEGORIES = {
  PROJECTS: { key: "tin-du-an", label: "Tin dự án" },
  INTERNAL: { key: "noi-bo", label: "Hoạt động nội bộ" },
  TRAINING: { key: "dao-tao", label: "Hoạt động đào tạo" },
};

const PROJECTS_IMAGES = Array.from(
  { length: 15 },
  (_, idx) => `/assets/news/PROJECTS/image${idx + 1}.png`
);
const INTERNAL_IMAGES = Array.from(
  { length: 15 },
  (_, idx) => `/assets/news/INTERNAL/image${idx + 1}.png`
);
const TRAINING_IMAGES = Array.from(
  { length: 11 },
  (_, idx) => `/assets/news/TRAINING/image${idx + 1}.png`
);

const CATEGORY_IMAGE_POOL = {
  [NEWS_CATEGORIES.PROJECTS.key]: PROJECTS_IMAGES,
  [NEWS_CATEGORIES.INTERNAL.key]: INTERNAL_IMAGES,
  [NEWS_CATEGORIES.TRAINING.key]: TRAINING_IMAGES,
  default: [...new Set([...PROJECTS_IMAGES, ...INTERNAL_IMAGES, ...TRAINING_IMAGES])],
};

const CATEGORY_CAPTION = {
  [NEWS_CATEGORIES.PROJECTS.key]: "Tiến độ thi công dự án biệt thự tân cổ điển AN HỒNG PHÁT",
  [NEWS_CATEGORIES.INTERNAL.key]: "Hoạt động nội bộ & văn hóa doanh nghiệp AN HỒNG PHÁT",
  [NEWS_CATEGORIES.TRAINING.key]: "Chương trình đào tạo & nâng cao kỹ năng tại AN HỒNG PHÁT",
};

const IMAGE_BLOCK_PREFERRED_TYPES = new Set(["p", "quote", "h2", "h3"]);
const DEFAULT_CAPTION = "Hình ảnh công trình tiêu biểu của AN HỒNG PHÁT";

const enrichTextBlock = (block, article) => {
  if (!block || typeof block.text !== "string") return;
  const text = block.text.trim();
  if (!text) return;

  const prefix =
    article?.excerpt ||
    "AN HỒNG PHÁT cam kết mang đến những công trình chất lượng, đúng tiến độ và thẩm mỹ cao cho khách hàng.";
  const suffix =
    article?.category === NEWS_CATEGORIES.TRAINING.key
      ? "Chương trình nhấn mạnh trải nghiệm thực tế và xây dựng năng lực dài hạn cho đội ngũ kỹ sư trẻ."
      : article?.category === NEWS_CATEGORIES.INTERNAL.key
        ? "Hoạt động phản ánh tinh thần đoàn kết và văn hóa đổi mới của tập thể AN HỒNG PHÁT."
        : "Dự án khai thác tối ưu nguồn lực, mang lại giá trị thiết thực cho cộng đồng và đối tác.";

  if (text.length > 200) {
    block.text = text;
    return;
  }

  const extended = `${text} ${suffix}`;
  block.text = extended.length < 220 ? `${prefix} ${extended}` : `${prefix} ${text} ${suffix}`;
};

const ensureFiveImages = (article) => {
  if (!article) return;
  if (!Array.isArray(article.blocks)) {
    article.blocks = [];
  }

  const pool = CATEGORY_IMAGE_POOL[article.category] || CATEGORY_IMAGE_POOL.default;
  const captionBase = CATEGORY_CAPTION[article.category] || DEFAULT_CAPTION;

  const used = new Set(
    [article.cover, ...article.blocks.flatMap((block) => [block?.src, block?.cover])].filter(
      Boolean
    )
  );

  let poolIndex = 0;
  const nextImage = () => {
    if (!pool?.length) return null;
    for (let offset = 0; offset < pool.length; offset += 1) {
      const candidate = pool[(poolIndex + offset) % pool.length];
      if (!used.has(candidate)) {
        poolIndex = (poolIndex + offset + 1) % pool.length;
        used.add(candidate);
        return candidate;
      }
    }
    const fallback = pool[poolIndex % pool.length];
    poolIndex = (poolIndex + 1) % pool.length;
    used.add(fallback);
    return fallback;
  };

  const countImages = () =>
    article.blocks.reduce(
      (total, block) =>
        total + (block && (block.type === "img" || block.src || block.cover) ? 1 : 0),
      0
    );

  article.blocks.forEach((block) => enrichTextBlock(block, article));

  let imageCount = countImages();
  for (const block of article.blocks) {
    if (imageCount >= 5) break;
    if (!block || block.src || block.cover) continue;
    if (!IMAGE_BLOCK_PREFERRED_TYPES.has(block.type)) continue;
    const imgSrc = nextImage();
    if (!imgSrc) break;
    block.src = imgSrc;
    imageCount += 1;
  }

  let extraIndex = 0;
  while (imageCount < 5) {
    const imgSrc = nextImage();
    if (!imgSrc) break;
    extraIndex += 1;
    article.blocks.push({
      type: "img",
      src: imgSrc,
      caption: extraIndex === 1 ? captionBase : `${captionBase} ${extraIndex}`,
    });
    imageCount += 1;
  }
};

export const NEWS = [
  // ===== BÀI VIẾT MỚI VỀ AN HỒNG PHÁT =====
  {
    id: 5001,
    slug: "an-hong-phat-hoan-thanh-biet-thu-tan-co-dien-da-nang",
    title: "AN HỒNG PHÁT hoàn thành biệt thự tân cổ điển 3 tầng tại Đà Nẵng",
    date: "2025-10-20",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image1.png",
    excerpt:
      "Biệt thự diện tích 180m² với phong cách tân cổ điển châu Âu, kết hợp hài hòa giữa kiến trúc truyền thống và tiện nghi hiện đại được bàn giao đúng tiến độ.",
    blocks: [
      {
        type: "p",
        text: "Sau 10 tháng thi công, AN HỒNG PHÁT đã chính thức bàn giao biệt thự 3 tầng phong cách tân cổ điển cho gia đình anh Tuấn tại khu đô thị mới Đà Nẵng. Công trình nổi bật với hệ thống cột trụ đá hoa cương nhập khẩu, mái vòm nghệ thuật và hệ thống cửa sổ arched đặc trưng.",
      },
      {
        type: "h2",
        text: "Thiết kế tinh tế, thi công chất lượng",
      },
      {
        type: "p",
        text: "Biệt thư được thiết kế với 5 phòng ngủ, phòng khách rộng 60m², bếp hiện đại và sân vườn tràn ngập ánh sáng tự nhiên. Chủ đầu tư đặc biệt hài lòng với chất lượng hoàn thiện và sự tận tâm của đội ngũ thi công.",
      },
      {
        type: "quote",
        text: "Tôi rất ấn tượng với chuyên môn và sự tận tâm của AN HỒNG PHÁT. Từ giai đoạn thiết kế đến thi công, mọi chi tiết đều được chăm chút kỹ lưỡng.",
        cite: "Anh Nguyễn Văn Tuấn - Chủ đầu tư",
      },
      {
        type: "img",
        // src: "/assets/news/PROJECTS/image2.png",
        src: "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/532157701_1200772205403070_5087755256773003484_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BPnNnz5NCYkQ7kNvwFhUMq3&_nc_oc=AdkepmttO3-lIh5gk1gmxapGpY6Cnz23QfS6r9ysBUuhjKS6hn6DB9V6ohDUG0UsBS0&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=e2pUZka3FvK-WyiuLlfw4A&oh=00_AfduBEVknPMcOURLL0lOLJY7xGtXkl3trfIS8jZ3IGUOSg&oe=69022391",
        caption: "Tổng thể biệt thự tân cổ điển 3 tầng tại Đà Nẵng",
      },
    ],
    relatedIds: [5002, 5003],
  },
  {
    id: 5002,
    slug: "khoi-cong-nha-pho-5-tang-hien-dai-hue",
    title: "Khởi công nhà phố 5 tầng hiện đại tại trung tâm Huế",
    date: "2025-10-15",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image3.png",
    excerpt:
      "AN HỒNG PHÁT chính thức khởi công dự án nhà phố 5 tầng mặt tiền 5m với thiết kế hiện đại, tối ưu công năng sử dụng tại vị trí đắc địa trung tâm cố đô.",
    blocks: [
      {
        type: "p",
        text: "Dự án nhà phố 5 tầng nằm trên trục đường chính của thành phố Huế với diện tích 5x20m. Thiết kế hiện đại tối giản kết hợp màu sắc trung tính tạo nên vẻ thanh lịch, sang trọng.",
      },
      {
        type: "h2",
        text: "Tối ưu không gian sống",
      },
      {
        type: "p",
        text: "Với 5 tầng được bố trí thông minh: tầng 1 làm garage và phòng khách, tầng 2-4 là phòng ngủ, tầng 5 là sân thượng sân vườn. Mặt tiền kính hiện đại kết hợp hệ thống ánh sáng tự nhiên tối ưu.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image4.png",
        caption: "Phối cảnh nhà phố 5 tầng hiện đại tại Huế",
      },
    ],
    relatedIds: [5001, 5004],
  },
  {
    id: 5003,
    slug: "xu-huong-thiet-ke-nha-pho-2025",
    title: "Top 5 mẫu nhà phố được yêu thích nhất năm 2025",
    date: "2025-10-10",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image5.png",
    excerpt:
      "Phong cách tân cổ điển vẫn dẫn đầu với 45% lựa chọn, theo sau là phong cách hiện đại tối giản. Màu sắc trung tính và xu hướng nhà phố 4-5 tầng đang rất được ưa chuộng.",
    blocks: [
      {
        type: "p",
        text: "Theo khảo sát của AN HỒNG PHÁT từ hơn 500 khách hàng trong năm 2025, phong cách tân cổ điển châu Âu vẫn giữ vững vị trí số 1 với 45% lựa chọn, tiếp theo là phong cách hiện đại tối giản 35% và phong cách Indochine 20%.",
      },
      {
        type: "h2",
        text: "Màu sắc trung tính lên ngôi",
      },
      {
        type: "p",
        text: "Màu be, xám, trắng ngà và các tông màu pastel đang được ưa chuộng bởi tính thẩm mỹ cao và dễ phối hợp nội thất. Đặc biệt, xu hướng kết hợp nhiều chất liệu như đá tự nhiên, gỗ và kính đang rất hot.",
      },
      {
        type: "list",
        items: ["Tân cổ điển châu Âu - 45%", "Hiện đại tối giản - 35%", "Indochine - 20%"],
      },
      {
        type: "quote",
        text: "Khách hàng ngày càng quan tâm đến tính thẩm mỹ bền vững và công năng sử dụng linh hoạt hơn là xu hướng nhất thời.",
        cite: "KTS Nguyễn Minh Hải - AN HỒNG PHÁT",
      },
    ],
    relatedIds: [5001, 5002],
  },
  {
    id: 5004,
    slug: "workshop-xu-huong-thiet-ke-2025-da-nang",
    title: "AN HỒNG PHÁT tổ chức workshop 'Xu hướng thiết kế 2025' tại Đà Nẵng",
    date: "2025-10-05",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image1.png",
    excerpt:
      "Hơn 50 kiến trúc sư, kỹ sư xây dựng và chủ đầu tư đã tham gia workshop do AN HỒNG PHÁT tổ chức để cập nhật xu hướng kiến trúc mới nhất.",
    blocks: [
      {
        type: "p",
        text: "Workshop diễn ra tại khách sạn Brilliant Đà Nẵng với sự tham gia của các chuyên gia hàng đầu trong lĩnh vực kiến trúc và xây dựng. Chương trình tập trung vào 3 chủ đề chính: kiến trúc bền vững, ứng dụng công nghệ BIM và xu hướng thiết kế 2025.",
      },
      {
        type: "h2",
        text: "Chia sẻ kinh nghiệm thực tế",
      },
      {
        type: "p",
        text: "Đại diện AN HỒNG PHÁT đã trình bày case study về 10 dự án tiêu biểu đã hoàn thành, chia sẻ kinh nghiệm xử lý kỹ thuật và tối ưu chi phí thi công. Các chủ đầu tư rất quan tâm đến phần thảo luận về quản lý tiến độ và kiểm soát chất lượng.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image2.png",
        caption: "Hình ảnh workshop 'Xu hướng thiết kế 2025' tại Đà Nẵng",
      },
    ],
    relatedIds: [5003, 5005],
  },
  {
    id: 5005,
    slug: "ban-giao-villa-vuon-hoi-an",
    title: "Bàn giao villa vườn 2 tầng tại Hội An - Khách hàng hài lòng 100%",
    date: "2025-09-28",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image6.png",
    excerpt:
      "Villa vườn diện tích 250m² với kiến trúc hòa quyện thiên nhiên, sử dụng vật liệu thân thiện môi trường được bàn giao cho gia đình anh Minh tại Hội An.",
    blocks: [
      {
        type: "p",
        text: "Ngôi villa nằm giữa khu vực xanh mát của Hội An, được thiết kế với triết lý 'sống gần gũi thiên nhiên'. Toàn bộ không gian mở, tận dụng tối đa ánh sáng tự nhiên và gió trời.",
      },
      {
        type: "h2",
        text: "Vật liệu thân thiện môi trường",
      },
      {
        type: "p",
        text: "AN HỒNG PHÁT đã sử dụng 100% gỗ tự nhiên được chứng nhận FSC, gạch terrazzo từ vật liệu tái chế và hệ thống thu gom nước mưa. Villa còn được trang bị pin mặt trời công suất 5kW để tiết kiệm năng lượng.",
      },
      {
        type: "quote",
        text: "Tôi rất hài lòng với chất lượng thi công và sự tận tâm của đội ngũ AN HỒNG PHÁT. Ngôi nhà này đã vượt xa mong đợi của gia đình tôi.",
        cite: "Anh Trần Hoàng Minh - Chủ nhà",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image7.png",
        caption: "Villa vườn 2 tầng hòa quyện thiên nhiên tại Hội An",
      },
    ],
    relatedIds: [5001, 5004],
  },
  // ===== KẾT THÚC BÀI VIẾT AN HỒNG PHÁT =====

  {
    id: 3001,
    slug: "central-eco-park-ha-noi",
    title: "CENTRAL khánh thành khu phức hợp Eco Park Hà Nội – chuẩn sống xanh giữa lòng Thủ đô",
    date: "2025-07-02",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image1.png",
    excerpt:
      "Ngày 02/07/2025, CENTRAL chính thức khánh thành khu phức hợp Eco Park Hà Nội – biểu tượng của xu hướng sống xanh và bền vững tại Việt Nam.",
    blocks: [
      {
        type: "p",
        src: "/assets/news/PROJECTS/image13.png",

        text: "Lễ khánh thành khu phức hợp Eco Park Hà Nội diễn ra với sự tham dự của đại diện Bộ Xây dựng, chính quyền địa phương và các đối tác chiến lược.",
      },
      {
        type: "h2",
        src: "/assets/news/PROJECTS/image12.png",

        text: "Không gian sống hòa hợp thiên nhiên",
      },
      {
        type: "p",
        src: "/assets/news/PROJECTS/image15.png",

        text: "Dự án được xây dựng trên tổng diện tích 12ha với mật độ cây xanh trên 60%, mang lại môi trường sống cân bằng giữa công việc và nghỉ dưỡng.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image14.png",
        caption: "Toàn cảnh khu phức hợp Eco Park Hà Nội ngày khánh thành",
      },
      {
        type: "quote",
        src: "/assets/news/PROJECTS/image11.png",

        text: "CENTRAL cam kết kiến tạo những không gian sống bền vững và giàu trải nghiệm cho cư dân đô thị.",
        cite: "Ông Nguyễn Văn Minh – Giám đốc Dự án CENTRAL",
      },
    ],
    relatedIds: [3002, 3003],
  },
  {
    id: 3002,
    slug: "central-nha-may-vat-lieu-xanh-binh-duong",
    title: "Khởi công nhà máy sản xuất vật liệu xanh tại Bình Dương",
    date: "2025-06-22",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image2.png",
    excerpt:
      "CENTRAL phối hợp cùng đối tác Nhật Bản khởi công nhà máy sản xuất vật liệu thân thiện môi trường đầu tiên tại Bình Dương.",
    blocks: [
      {
        type: "p",
        text: "Nhà máy có công suất 150.000 tấn/năm, tập trung sản xuất vật liệu xanh phục vụ xây dựng đô thị thông minh tại miền Nam.",
      },
      {
        type: "h2",
        text: "Dây chuyền công nghệ Nhật Bản",
      },
      {
        type: "p",
        text: "Toàn bộ dây chuyền sản xuất được nhập khẩu từ Nhật Bản, đảm bảo tiết kiệm năng lượng và giảm phát thải CO₂ tới 30%.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image14.png",
        caption: "Lễ khởi công nhà máy vật liệu xanh Bình Dương",
      },
    ],
    relatedIds: [3001, 3004],
  },
  {
    id: 3003,
    slug: "central-du-an-nang-luong-tai-tao-ninh-thuan",
    title: "Triển khai dự án năng lượng tái tạo tại Ninh Thuận",
    date: "2025-05-10",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image3.png",

    excerpt:
      "CENTRAL khởi động dự án năng lượng mặt trời 120MW tại Ninh Thuận, hướng tới mục tiêu phát triển xanh bền vững.",
    blocks: [
      {
        type: "p",
        text: "Dự án sử dụng tấm pin thế hệ mới với hiệu suất chuyển đổi năng lượng lên đến 23%, kết hợp hệ thống lưu trữ thông minh phục vụ phụ tải địa phương.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image13.png",
        caption: "Khu vực thi công dự án năng lượng mặt trời tại Ninh Thuận",
      },
      {
        type: "quote",
        text: "Chúng tôi cam kết mang năng lượng sạch đến với mọi vùng miền Việt Nam.",
        cite: "Ông Lê Quốc Phong – Giám đốc Dự án CENTRAL",
      },
    ],
    relatedIds: [3001, 3005],
  },
  {
    id: 3004,
    slug: "central-gioi-thieu-mo-hinh-do-thi-thong-minh-hue",
    title: "Trình diễn mô hình đô thị thông minh tại Huế",
    date: "2025-06-02",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image4.png",
    excerpt:
      "CENTRAL hợp tác cùng Đại học Huế ra mắt mô hình đô thị thông minh ứng dụng trí tuệ nhân tạo và IoT.",
    blocks: [
      {
        type: "p",
        text: "Mô hình giúp sinh viên và kỹ sư trẻ trải nghiệm các giải pháp quản lý năng lượng, hạ tầng giao thông và cảnh báo ngập thông minh.",
      },
      {
        type: "list",
        items: [
          "Hệ thống cảm biến năng lượng mặt trời",
          "Trung tâm giám sát dữ liệu thời gian thực",
          "Ứng dụng AI điều phối giao thông đô thị",
        ],
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image12.png",
        caption: "Sinh viên trải nghiệm mô hình đô thị thông minh tại Huế",
      },
    ],
    relatedIds: [3002, 3006],
  },
  {
    id: 3005,
    slug: "central-campus-xanh-tphcm",
    title: "Khởi công khu campus xanh tại TP.HCM",
    date: "2025-05-28",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image5.png",
    excerpt:
      "CENTRAL khởi công khu campus mới – nơi làm việc kết hợp không gian học tập, nghiên cứu và sáng tạo cho thế hệ kỹ sư trẻ.",
    blocks: [
      {
        type: "p",
        text: "Khu campus xanh được thiết kế mở, tích hợp trung tâm nghiên cứu năng lượng tái tạo và không gian sinh hoạt cộng đồng.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image11.png",
        caption: "Phối cảnh khu campus xanh của CENTRAL tại TP.HCM",
      },
    ],
    relatedIds: [3003, 3007],
  },
  {
    id: 3006,
    slug: "central-trung-tam-du-lieu-bac-ninh",
    title: "CENTRAL khởi công trung tâm dữ liệu Bắc Ninh",
    date: "2025-05-18",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image6.png",
    excerpt:
      "Dự án trung tâm dữ liệu tier IV tại Bắc Ninh đánh dấu bước tiến mới của CENTRAL trong mảng hạ tầng số.",
    blocks: [
      {
        type: "p",
        text: "Trung tâm dữ liệu sở hữu công nghệ làm mát hai tầng, đáp ứng tiêu chuẩn uptime 99,995% cho các khách hàng tài chính và viễn thông.",
      },
      {
        type: "h2",
        text: "Hạ tầng số hoá vùng kinh tế trọng điểm",
      },
      {
        type: "p",
        src: "/assets/news/PROJECTS/image10.png",

        text: "Công trình được xây dựng theo mô-đun linh hoạt, sẵn sàng mở rộng lên 40MW công suất xử lý trong giai đoạn tiếp theo.",
      },
    ],
    relatedIds: [3004, 3008],
  },
  {
    id: 3007,
    slug: "central-benh-vien-thong-minh-da-nang",
    title: "Bắt đầu thi công Bệnh viện Thông minh Đà Nẵng",
    date: "2025-04-30",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image7.png",

    excerpt:
      "CENTRAL chính thức khởi công tổ hợp Bệnh viện Thông minh Đà Nẵng với hệ thống điều hành chăm sóc sức khỏe bằng AI.",
    blocks: [
      {
        type: "p",
        src: "/assets/news/PROJECTS/image9.png",

        text: "Công trình gồm 500 giường, tích hợp trung tâm chẩn đoán hình ảnh và khu phục hồi chức năng đạt chuẩn quốc tế.",
      },
      {
        type: "quote",

        text: "Bệnh viện hướng tới mô hình chăm sóc lấy bệnh nhân làm trung tâm với công nghệ hỗ trợ bác sĩ theo thời gian thực.",
        cite: "Bà Phạm Thu Hà – Giám đốc Điều hành Dự án",
      },
    ],
    relatedIds: [3005, 3009],
  },
  {
    id: 3008,
    slug: "central-luxury-resort-phu-quoc",
    title: "CENTRAL ký hợp đồng xây dựng Luxury Resort tại Phú Quốc",
    date: "2025-04-20",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image13.png",

    excerpt:
      "Tổ hợp nghỉ dưỡng 6 sao tại bãi Trường Phú Quốc sẽ được CENTRAL thi công trong 24 tháng với tiêu chuẩn quốc tế.",
    blocks: [
      {
        type: "p",
        text: "Dự án gồm 320 phòng khách sạn, khu villa biển riêng tư và trung tâm hội nghị 1.200 chỗ, chú trọng vật liệu thân thiện môi trường.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image8.png",
        caption: "Phối cảnh khu nghỉ dưỡng cao cấp tại Phú Quốc",
      },
    ],
    relatedIds: [3006, 3010],
  },
  {
    id: 3009,
    slug: "central-ben-cang-logistics-can-tho",
    title: "Khởi công bến cảng logistics Cần Thơ",
    date: "2025-04-12",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image8.png",

    excerpt:
      "Dự án bến cảng logistics Cần Thơ giúp nâng công suất vận chuyển hàng hóa vùng Đồng bằng sông Cửu Long lên 18 triệu tấn/năm.",
    blocks: [
      {
        type: "p",
        src: "/assets/news/PROJECTS/image7.png",

        text: "Công trình gồm cầu cảng 420m, kho bãi 15ha và trung tâm điều hành được tự động hoá bằng hệ thống quản lý container hiện đại.",
      },
      {
        type: "list",
        items: [
          "Hệ thống cần cẩu ship-to-shore thế hệ mới",
          "Kho lạnh 20.000 pallet cho nông sản",
          "Trung tâm dữ liệu điều phối thông minh",
        ],
      },
    ],
    relatedIds: [3007, 3008],
  },
  {
    id: 3010,
    slug: "central-to-hop-giao-thong-do-thi-bac-giang",
    title: "CENTRAL trúng thầu tổ hợp giao thông đô thị Bắc Giang",
    date: "2025-04-01",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image9.png",

    excerpt:
      "Tổ hợp giao thông gồm nhà ga trung chuyển, bến xe liền kề và tuyến metro nội đô sẽ tạo cú hích mới cho Bắc Giang.",
    blocks: [
      {
        type: "p",
        text: "Dự án sử dụng kết cấu thép nhẹ, mái năng lượng mặt trời và hệ thống bán vé không tiếp xúc, phục vụ 80.000 lượt khách mỗi ngày.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image7.png",
        caption: "Mô hình tổ hợp giao thông đô thị Bắc Giang",
      },
    ],
    relatedIds: [3008, 3009],
  },
  {
    id: 3011,
    slug: "central-pho-thi-eco-quarter-hoi-an",
    title: "CENTRAL khởi công phố thị Eco Quarter tại Hội An",
    date: "2025-03-28",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image14.png",

    excerpt:
      "Phố thị Eco Quarter mang lại không gian sống sinh thái ven sông Thu Bồn với hệ thống tiện ích xanh đồng bộ.",
    blocks: [
      {
        type: "p",
        src: "/assets/news/PROJECTS/image6.png",

        text: "Dự án gồm khu nhà phố, căn hộ dịch vụ và bến thuyền du lịch, áp dụng giải pháp thu gom nước mưa và năng lượng mặt trời.",
      },
      {
        type: "list",
        items: [
          "Công viên ven sông dài 1,5km",
          "Phố thương mại đặc sản Hội An",
          "Trung tâm trải nghiệm văn hóa bản địa",
        ],
      },
    ],
    relatedIds: [3009, 3012],
  },
  {
    id: 3012,
    slug: "central-nha-may-pin-lithium-vung-tau",
    title: "CENTRAL xây dựng nhà máy pin lithium tại Vũng Tàu",
    date: "2025-03-15",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image10.png",

    excerpt:
      "Nhà máy pin lithium 30GW đầu tiên tại Việt Nam được CENTRAL thi công với công nghệ siêu sạch phục vụ ngành xe điện.",
    blocks: [
      {
        type: "p",
        text: "Công trình sử dụng kết cấu lắp ghép nhanh, hệ thống lọc không khí tiêu chuẩn ISO 14644 và giải pháp giám sát môi trường 24/7.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image5.png",
        caption: "Phối cảnh nhà máy pin lithium tại Vũng Tàu",
      },
    ],
    relatedIds: [3011, 3013],
  },
  {
    id: 3013,
    slug: "central-trung-tam-hoi-nghi-quoc-te-ha-long",
    title: "Trung tâm Hội nghị Quốc tế Hạ Long được CENTRAL triển khai",
    date: "2025-02-28",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image11.png",
    excerpt:
      "Trung tâm hội nghị 5.000 chỗ ngồi tại Hạ Long được thiết kế với mái lượn sóng cảm hứng từ kỳ quan thiên nhiên thế giới.",
    blocks: [
      {
        type: "p",
        src: "/assets/news/PROJECTS/image4.png",
        text: "CENTRAL ứng dụng hệ thống điều hòa thông minh và mô hình BIM để điều phối thi công kết cấu mái phức tạp.",
      },
      {
        type: "quote",
        text: "Công trình sẽ là điểm đến của những sự kiện quốc tế lớn, góp phần nâng tầm du lịch Quảng Ninh.",
        cite: "Ông Vũ Xuân Lộc – Giám đốc Dự án",
      },
    ],
    relatedIds: [3012, 3014],
  },
  {
    id: 3014,
    slug: "central-khu-cong-nghiep-sinh-thai-thai-binh",
    title: "CENTRAL triển khai khu công nghiệp sinh thái Thái Bình",
    date: "2025-02-20",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image12.png",
    excerpt:
      "Khu công nghiệp sinh thái Thái Bình hướng đến mô hình “zero waste” với mạng lưới tái chế và năng lượng tái tạo khép kín.",
    blocks: [
      {
        type: "p",

        text: "Dự án sử dụng hệ thống pin mặt trời mái nhà 45MWp, trạm xử lý nước thải tái sử dụng 80% và trung tâm logistics xanh.",
      },
      {
        type: "img",
        src: "/assets/news/PROJECTS/image3.png",
        caption: "Hạ tầng khu công nghiệp sinh thái Thái Bình đang được thi công",
      },
    ],
    relatedIds: [3013, 3015],
  },
  {
    id: 3015,
    slug: "central-nha-o-xa-hoi-thong-minh-binh-duong",
    title: "Khởi công khu nhà ở xã hội thông minh tại Bình Dương",
    date: "2025-02-05",
    category: NEWS_CATEGORIES.PROJECTS.key,
    cover: "/assets/news/PROJECTS/image15.png",

    excerpt:
      "CENTRAL phát triển khu nhà ở xã hội 4.000 căn tại Bình Dương với giải pháp nhà ở thông minh, tiện ích chung đa dạng.",
    blocks: [
      {
        type: "p",
        src: "/assets/news/PROJECTS/image2.png",

        text: "Cư dân được trang bị ứng dụng quản lý tòa nhà, điểm đón xe buýt điện và hệ thống thu gom rác khép kín.",
      },
      {
        type: "quote",
        text: "Chúng tôi mong muốn mang đến không gian sống hiện đại, giá phù hợp cho công nhân và chuyên gia tại Bình Dương.",
        cite: "Bà Nguyễn Thảo Vy – Giám đốc Phát triển Dự án",
      },
    ],
    relatedIds: [3014, 3005],
  },
  {
    id: 3101,
    slug: "central-top-10-doanh-nghiep-esg",
    title: "CENTRAL được vinh danh Top 10 doanh nghiệp ESG Việt Nam xanh 2025",
    date: "2025-06-28",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image1.png",

    excerpt:
      "CENTRAL nhận giải Top 10 doanh nghiệp ESG Việt Nam Xanh 2025 nhờ chiến lược phát triển bền vững và giảm phát thải ấn tượng.",
    blocks: [
      {
        type: "p",
        cover: "/assets/news/INTERNAL/image15.png",

        text: "Giải thưởng do Bộ Tài nguyên & Môi trường phối hợp cùng Tạp chí Kinh tế Xanh bình chọn dựa trên 5 tiêu chí quản trị môi trường.",
      },
      {
        type: "quote",
        text: "Chúng tôi xem ESG là nền tảng để CENTRAL tăng trưởng bền vững và mang lại giá trị cộng đồng lâu dài.",
        cite: "Ông Trần Hoài Nam – Tổng Giám đốc CENTRAL",
      },
    ],
    relatedIds: [3102, 3103],
  },
  {
    id: 3102,
    slug: "central-vietnam-construction-awards-2025",
    title: "CENTRAL thắng lớn tại Vietnam Construction Awards 2025",
    date: "2025-06-18",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image2.png",

    excerpt:
      "Doanh nghiệp nhận 3 hạng mục quan trọng tại Vietnam Construction Awards 2025, khẳng định vị thế tổng thầu hàng đầu Việt Nam.",
    blocks: [
      {
        type: "p",
        text: "Các giải thưởng gồm Tổng thầu của năm, Dự án bền vững tiêu biểu và Doanh nghiệp ứng dụng chuyển đổi số xuất sắc.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image14.png",
        caption: "Đội ngũ CENTRAL tại lễ trao giải Vietnam Construction Awards 2025",
      },
    ],
    relatedIds: [3101, 3104],
  },
  {
    id: 3103,
    slug: "central-team-building-2025-phu-quoc",
    title: "CENTRAL Team Building 2025 – Phú Quốc: Khơi nguồn nội lực",
    date: "2025-06-10",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image3.png",

    excerpt:
      "Hơn 1.000 thành viên CENTRAL cùng trải nghiệm hành trình 3 ngày 2 đêm tại Phú Quốc với chủ đề “Khơi nguồn nội lực”.",
    blocks: [
      {
        type: "p",
        text: "Chương trình tái tạo năng lượng gồm chuỗi hoạt động thể thao biển, workshop truyền cảm hứng và đêm gala tôn vinh tập thể xuất sắc.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image13.png",
        caption: "Không khí sôi động tại CENTRAL Team Building 2025",
      },
    ],
    relatedIds: [3101, 3105],
  },
  {
    id: 3104,
    slug: "central-tri-an-nhan-su-ky-niem-thanh-lap",
    title: "CENTRAL tổ chức lễ tri ân nhân sự nhân dịp kỷ niệm thành lập",
    date: "2025-05-23",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image4.png",

    excerpt:
      "Buổi lễ tri ân diễn ra tại TP.HCM, ghi nhận đóng góp của các cá nhân gắn bó lâu năm và trao phần thưởng đặc biệt.",
    blocks: [
      {
        type: "p",
        text: "Ban lãnh đạo gửi lời cảm ơn đến hơn 200 nhân sự cống hiến trên 5 năm, đồng thời công bố chiến lược nhân sự 2025-2030.",
      },
      {
        type: "quote",
        text: "CENTRAL luôn xem con người là tài sản quý giá nhất, là động lực cho mọi bước chuyển mình.",
        cite: "Bà Nguyễn Diệu Linh – Giám đốc Nhân sự",
      },
    ],
    relatedIds: [3102, 3106],
  },
  {
    id: 3105,
    slug: "central-hanh-trinh-chap-canh-uoc-mo",
    title: "Hành trình chắp cánh ước mơ của CENTRAL đến với điểm trường Đà Nẵng",
    date: "2025-05-15",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image5.png",

    excerpt:
      "Chương trình thiện nguyện “Chắp cánh ước mơ” trao tặng thư viện và sân chơi mới cho học sinh vùng ven TP. Đà Nẵng.",
    blocks: [
      {
        type: "p",
        text: "Đội ngũ CENTRAL cùng đoàn địa phương hoàn thiện thư viện 1.200 đầu sách và khu sinh hoạt ngoài trời cho 600 em học sinh.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image12.png",
        caption: "Niềm vui của các em học sinh trong ngày bàn giao thư viện",
      },
    ],
    relatedIds: [3103, 3107],
  },
  {
    id: 3106,
    slug: "central-profit500-2025",
    title: "CENTRAL được vinh danh Top 500 doanh nghiệp lợi nhuận tốt nhất Việt Nam 2025",
    date: "2025-05-08",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image6.png",

    excerpt:
      "CENTRAL lần thứ 5 liên tiếp góp mặt trong bảng xếp hạng PROFIT500, khẳng định sức khỏe tài chính vững mạnh.",
    blocks: [
      {
        type: "p",
        text: "Doanh thu tăng trưởng 18% và lợi nhuận sau thuế tăng 22% so với năm trước nhờ chiến lược đa dạng hóa dự án.",
      },
      {
        type: "quote",
        text: "Kết quả này đến từ sự kiên định của tập thể CENTRAL trong quản trị rủi ro và đổi mới mô hình vận hành.",
        cite: "Ông Nguyễn Xuân Vĩnh – Giám đốc Tài chính",
      },
    ],
    relatedIds: [3104, 3108],
  },
  {
    id: 3107,
    slug: "central-vinh-danh-nha-thau-chuyen-nghiep",
    title: "CENTRAL tiếp tục được vinh danh Nhà thầu xây dựng uy tín 2025",
    date: "2025-05-02",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image7.png",

    excerpt:
      "Giải thưởng do Vietnam Report và Báo VietNamNet công bố dựa trên khảo sát khách hàng, đối tác và hoạt động truyền thông.",
    blocks: [
      {
        type: "p",
        text: "CENTRAL nằm trong Top 3 nhà thầu uy tín nhất ở cả 3 tiêu chí: năng lực tài chính, kinh nghiệm và truyền thông.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image11.png",
        caption: "Đại diện CENTRAL nhận cúp vinh danh nhà thầu uy tín 2025",
      },
    ],
    relatedIds: [3105, 3109],
  },
  {
    id: 3108,
    slug: "central-tham-du-vietnam-ceo-summit-2025",
    title: "CENTRAL tham dự Vietnam CEO Summit 2025",
    date: "2025-04-28",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image8.png",

    excerpt:
      "Lãnh đạo CENTRAL chia sẻ kinh nghiệm chuyển đổi số trong quản trị vận hành tại diễn đàn Vietnam CEO Summit 2025.",
    blocks: [
      {
        type: "p",
        text: "Bài tham luận của CENTRAL nhấn mạnh mô hình dữ liệu tập trung giúp tối ưu tiến độ thi công và minh bạch tài chính.",
      },
      {
        type: "list",
        items: [
          "Ứng dụng BIM trong điều phối dự án",
          "Nền tảng quản lý rủi ro theo thời gian thực",
          "Phát triển văn hóa số cho đội ngũ hiện trường",
        ],
      },
    ],
    relatedIds: [3106, 3110],
  },
  {
    id: 3109,
    slug: "central-chuong-trinh-kham-suc-khoe-2025",
    title: "CENTRAL tổ chức chương trình khám sức khỏe định kỳ 2025",
    date: "2025-04-12",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image9.png",

    excerpt:
      "Gần 2.000 cán bộ nhân viên CENTRAL tại Hà Nội và TP.HCM tham gia chương trình khám sức khỏe tổng quát định kỳ.",
    blocks: [
      {
        type: "p",
        text: "Chương trình bao gồm các gói kiểm tra chuyên sâu về tim mạch, mắt – tai – mũi – họng, sức khỏe nghề nghiệp và tư vấn dinh dưỡng.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image10.png",
        caption: "Nhân viên CENTRAL tham gia khám sức khỏe định kỳ 2025",
      },
    ],
    relatedIds: [3107, 3108],
  },
  {
    id: 3110,
    slug: "central-ngay-hoi-sang-tao-ky-su-tre",
    title: "Ngày hội Sáng tạo kỹ sư trẻ CENTRAL 2025",
    date: "2025-04-05",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image10.png",

    excerpt:
      "Ngày hội Sáng tạo quy tụ hơn 40 nhóm kỹ sư trẻ với các giải pháp cải tiến thi công và an toàn lao động.",
    blocks: [
      {
        type: "p",
        text: "Ban giám khảo chọn ra 6 sáng kiến xuất sắc để đưa vào thử nghiệm tại các công trường trọng điểm của CENTRAL.",
      },
      {
        type: "quote",
        text: "Chúng tôi khuyến khích văn hóa cải tiến liên tục, nơi mỗi ý tưởng đều có cơ hội trở thành chuẩn mực mới.",
        cite: "Ông Lê Trung Kiên – Giám đốc Khối Thi công",
      },
    ],
    relatedIds: [3108, 3109],
  },
  {
    id: 3111,
    slug: "central-trao-giai-sang-kien-an-toan-2025",
    title: "CENTRAL trao giải sáng kiến an toàn lao động 2025",
    date: "2025-03-30",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image11.png",

    excerpt:
      "10 sáng kiến cải tiến an toàn tại công trường được vinh danh, giúp giảm 35% sự cố tiềm ẩn trong nửa đầu năm 2025.",
    blocks: [
      {
        type: "p",
        text: "Giải thưởng quy tụ hơn 120 đề xuất từ các ban chỉ huy dự án, tập trung vào giải pháp quan sát thông minh và huấn luyện thực tế ảo.",
      },
      {
        type: "quote",
        text: "Tinh thần chủ động sáng kiến giúp CENTRAL tạo ra môi trường làm việc an toàn, hiệu quả.",
        cite: "Ông Đặng Hữu Phước – Giám đốc Khối An toàn",
      },
    ],
    relatedIds: [3109, 3112],
  },
  {
    id: 3112,
    slug: "central-chuong-trinh-suc-khoe-tinh-than-2025",
    title: "Ra mắt chương trình chăm sóc sức khỏe tinh thần 2025",
    date: "2025-03-18",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image12.png",

    excerpt:
      "CENTRAL giới thiệu chương trình tư vấn tâm lý và hoạt động thể thao định kỳ nhằm nâng cao trải nghiệm nhân viên.",
    blocks: [
      {
        type: "p",
        text: "Chương trình bao gồm app chăm sóc sức khỏe tinh thần, câu lạc bộ yoga – chạy bộ và dịch vụ tư vấn 1-1 với chuyên gia.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image9.png",
        caption: "Nhân viên CENTRAL tham gia buổi workshop về sức khỏe tinh thần",
      },
    ],
    relatedIds: [3111, 3113],
  },
  {
    id: 3113,
    slug: "central-thuong-viet-nu-2025",
    title: "CENTRAL tôn vinh phụ nữ ngành xây dựng 2025",
    date: "2025-03-08",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image13.png",

    excerpt:
      "Chương trình “Nữ kiến tạo tương lai” tôn vinh các nữ kỹ sư và quản lý dự án với nhiều thành tích nổi bật.",
    blocks: [
      {
        type: "p",
        text: "Sự kiện quy tụ hơn 400 nữ nhân sự, chia sẻ câu chuyện phát triển nghề nghiệp, mentoring và trao học bổng cho con em cán bộ.",
      },
      {
        type: "list",
        items: [
          "Diễn đàn nữ lãnh đạo CENTRAL",
          "Workshop cân bằng công việc – cuộc sống",
          "Trao giải Nữ kỹ sư trẻ tiêu biểu",
        ],
      },
    ],
    relatedIds: [3112, 3114],
  },
  {
    id: 3114,
    slug: "central-le-phat-dong-thang-nhan-vien-tinh-nguyen",
    title: "Phát động Tháng nhân viên tình nguyện CENTRAL 2025",
    date: "2025-02-25",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image14.png",

    excerpt:
      "CENTRAL kêu gọi cán bộ nhân viên tham gia 3.000 giờ tình nguyện hỗ trợ cộng đồng tại các địa phương có dự án.",
    blocks: [
      {
        type: "p",
        text: "Chương trình tập trung vào cải tạo trường học vùng sâu, cấp nước sạch và phổ biến kiến thức an toàn xây dựng cho thanh thiếu niên.",
      },
      {
        type: "img",
        src: "/assets/news/INTERNAL/image6.png",
        caption: "Đội tình nguyện CENTRAL trong hoạt động sơn sửa trường tiểu học",
      },
    ],
    relatedIds: [3113, 3115],
  },
  {
    id: 3115,
    slug: "central-khoi-dong-quy-phuc-loi-gia-dinh",
    title: "Khởi động Quỹ phúc lợi gia đình CENTRAL",
    date: "2025-02-10",
    category: NEWS_CATEGORIES.INTERNAL.key,
    cover: "/assets/news/INTERNAL/image15.png",

    excerpt:
      "Quỹ phúc lợi gia đình hỗ trợ học bổng, bảo hiểm sức khỏe và chương trình phát triển trẻ em cho gia đình cán bộ nhân viên.",
    blocks: [
      {
        type: "p",
        cover: "/assets/news/INTERNAL/image5.png",

        text: "Trong năm 2025, Quỹ dự kiến trao 500 suất học bổng, tài trợ lớp học STEAM và bảo hiểm sức khỏe mở rộng cho thân nhân.",
      },
      {
        type: "quote",
        cover: "/assets/news/INTERNAL/image5.png",

        text: "Chúng tôi mong muốn đồng hành cùng gia đình nhân viên, tạo hậu phương vững chắc để mọi người yên tâm cống hiến.",
        cite: "Bà Trần Hồng Ngọc – Trưởng ban Phúc lợi",
      },
    ],
    relatedIds: [3114, 3105],
  },
  {
    id: 3201,
    slug: "central-dao-tao-tan-ky-su-2025",
    title: "CENTRAL tổ chức chương trình đào tạo tân kỹ sư 2025",
    date: "2025-06-01",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image1.png",
    excerpt:
      "Chương trình đào tạo tân kỹ sư 2025 giúp các thành viên mới thích nghi nhanh với phương pháp thi công và văn hóa CENTRAL.",
    blocks: [
      {
        type: "p",
        text: "Khóa học kéo dài 6 tuần, bao gồm đào tạo công trường, mô phỏng BIM và kỹ năng lãnh đạo dự án.",
      },
      {
        type: "img",
        src: "/assets/news/TRAINING/image6.png",
        caption: "Buổi khai giảng chương trình đào tạo tân kỹ sư CENTRAL 2025",
      },
    ],
    relatedIds: [3202, 3203],
  },
  {
    id: 3202,
    slug: "central-tai-tro-dai-hoc-su-pham-ky-thuat",
    title: "CENTRAL đồng hành tài trợ tại Đại học Sư phạm Kỹ thuật TP.HCM",
    date: "2025-05-28",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image2.png",
    excerpt:
      "CENTRAL tài trợ phòng thí nghiệm vật liệu mới và học bổng cho sinh viên xây dựng trường Đại học Sư phạm Kỹ thuật TP.HCM.",
    blocks: [
      {
        type: "p",
        text: "Không gian thí nghiệm mới hỗ trợ sinh viên thử nghiệm vật liệu bền vững, đồng thời triển khai các đồ án kết hợp doanh nghiệp.",
      },
      {
        type: "list",
        items: [
          "Trao 20 suất học bổng cho sinh viên xuất sắc",
          "Cung cấp thiết bị đo đạc hiện trường",
          "Ký kết chương trình thực tập 3 tháng tại công trường CENTRAL",
        ],
      },
    ],
    relatedIds: [3201, 3204],
  },
  {
    id: 3203,
    slug: "central-ngay-hoi-nghe-nghiep-job-fair-2025",
    title: "CENTRAL tham dự Ngày hội nghề nghiệp Job Fair 2025",
    date: "2025-05-27",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image3.png",
    excerpt:
      "Tại Job Fair 2025, CENTRAL giới thiệu 150 vị trí thực tập và kỹ sư hiện trường cho sinh viên khối kỹ thuật.",
    blocks: [
      {
        type: "p",
        text: "Gian hàng CENTRAL thu hút đông đảo sinh viên nhờ trải nghiệm VR mô phỏng công trường và chương trình mentoring cùng kỹ sư trưởng.",
      },
      {
        type: "img",
        src: "/assets/news/TRAINING/image7.png",
        caption: "Sinh viên tìm hiểu cơ hội nghề nghiệp tại gian hàng CENTRAL",
      },
    ],
    relatedIds: [3201, 3205],
  },
  {
    id: 3204,
    slug: "central-chao-don-sinh-vien-thuc-tap-2025",
    title: "CENTRAL chào đón sinh viên thực tập năm 2025",
    date: "2025-05-20",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image4.png",
    excerpt:
      "Trên 60 sinh viên kiến trúc – xây dựng bắt đầu kỳ thực tập tốt nghiệp tại các dự án trọng điểm của CENTRAL.",
    blocks: [
      {
        type: "p",
        text: "Các bạn trẻ được phân nhóm theo chuyên môn kết cấu, MEP và quản lý dự án với lộ trình huấn luyện rõ ràng.",
      },
      {
        type: "quote",
        text: "Chúng tôi mong muốn tạo môi trường thực tế để sinh viên cọ xát và phát triển nghề nghiệp bền vững.",
        cite: "Ông Nguyễn Thành Tâm – Giám đốc Khối Đào tạo",
      },
    ],
    relatedIds: [3202, 3206],
  },
  {
    id: 3205,
    slug: "central-ky-ket-hop-tac-dao-tao-truong-dai-hoc",
    title: "CENTRAL ký kết hợp tác đào tạo với các trường đại học",
    date: "2025-05-16",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image5.png",
    excerpt:
      "CENTRAL ký MOU cùng 5 trường đại học về chương trình thực tập, nghiên cứu ứng dụng và ươm mầm kỹ sư trẻ.",
    blocks: [
      {
        type: "p",
        text: "Thỏa thuận tập trung vào việc chia sẻ tài nguyên giảng viên, tổ chức workshop chuyên sâu và tài trợ phòng lab xây dựng thông minh.",
      },
      {
        type: "img",
        src: "/assets/news/TRAINING/image8.png",
        caption: "Lễ ký kết hợp tác đào tạo giữa CENTRAL và các trường đại học",
      },
    ],
    relatedIds: [3203, 3207],
  },
  {
    id: 3206,
    slug: "central-to-chuc-workshop-force-nhat-ban",
    title: "CENTRAL tổ chức workshop FORCE Nhật Bản",
    date: "2025-05-12",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image6.png",
    excerpt:
      "Workshop FORCE mang đến trải nghiệm thực tế về phương pháp thi công tiêu chuẩn Nhật Bản cho 80 kỹ sư trẻ CENTRAL.",
    blocks: [
      {
        type: "p",
        text: "Diễn giả từ đối tác Nhật Bản chia sẻ quy trình quản lý hiện trường, tiêu chuẩn an toàn và bài học triển khai dự án cao tầng.",
      },
      {
        type: "list",
        items: [
          "Thực hành mô phỏng thi công với VR",
          "Ứng dụng lean construction",
          "Kỹ năng giao tiếp đa văn hóa trên công trường",
        ],
      },
    ],
    relatedIds: [3204, 3208],
  },
  {
    id: 3207,
    slug: "central-gioi-thieu-chuong-trinh-horenso",
    title: "Chương trình đào tạo Horenso cho đội ngũ quản lý dự án",
    date: "2025-05-05",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image7.png",
    excerpt:
      "Horenso – phương pháp quản lý kiểu Nhật giúp chuẩn hóa giao tiếp, chủ động cập nhật tiến độ và xử lý sự cố tại công trường.",
    blocks: [
      {
        type: "p",
        text: "Chương trình đào tạo nhấn mạnh việc báo cáo – liên lạc – thảo luận liên tục giữa ban chỉ huy và chủ đầu tư.",
      },
      {
        type: "img",
        src: "/assets/news/TRAINING/image9.png",
        caption: "Buổi đào tạo Horenso với sự tham gia của các chỉ huy trưởng",
      },
    ],
    relatedIds: [3205, 3209],
  },
  {
    id: 3208,
    slug: "central-khoa-huan-luyen-an-toan-thi-cong",
    title: "Khai giảng khóa huấn luyện an toàn thi công 2025",
    date: "2025-04-28",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image8.png",
    excerpt:
      "Khóa huấn luyện an toàn 2025 tập trung vào thực hành xử lý tình huống khẩn cấp và ứng dụng công nghệ nhận diện rủi ro.",
    blocks: [
      {
        type: "p",
        text: "Người học được trải nghiệm hệ thống cảnh báo AI, thiết bị bảo hộ thông minh và quy trình ứng phó sự cố hiện trường.",
      },
      {
        type: "quote",
        text: "An toàn là giá trị cốt lõi – chúng tôi đầu tư nghiêm túc cho đào tạo nhằm bảo vệ mọi thành viên CENTRAL.",
        cite: "Ông Phạm Hoàng Dũng – Giám đốc An toàn",
      },
    ],
    relatedIds: [3206, 3210],
  },
  {
    id: 3209,
    slug: "central-tap-huan-bim-cho-ky-su-tre",
    title: "Tập huấn BIM nâng cao cho kỹ sư trẻ CENTRAL",
    date: "2025-04-20",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image9.png",
    excerpt:
      "Khóa tập huấn BIM nâng cao giúp kỹ sư trẻ làm chủ quy trình phối hợp mô hình 3D và quản lý khối lượng thi công.",
    blocks: [
      {
        type: "p",
        text: "Học viên thực hành xử lý xung đột trên mô hình BIM, trích xuất dữ liệu và kết nối với hệ thống ERP của CENTRAL.",
      },
      {
        type: "img",
        src: "/assets/news/TRAINING/image10.png",
        caption: "Kỹ sư trẻ CENTRAL trong buổi tập huấn BIM nâng cao",
      },
    ],
    relatedIds: [3207, 3208],
  },
  {
    id: 3210,
    slug: "central-trao-hoc-bong-ky-su-tre-2025",
    title: "CENTRAL trao 30 suất học bổng cho sinh viên kỹ sư trẻ 2025",
    date: "2025-04-15",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image10.png",
    excerpt:
      "Chương trình học bổng 2025 hỗ trợ sinh viên ngành xây dựng, kiến trúc có hoàn cảnh khó khăn và thành tích học tập xuất sắc.",
    blocks: [
      {
        type: "p",
        text: "CENTRAL còn tổ chức mentoring 1-1 giữa lãnh đạo dự án và sinh viên, tạo cơ hội phát triển nghề nghiệp dài hạn.",
      },
      {
        type: "list",
        items: [
          "30 suất học bổng trị giá 15 triệu đồng/suất",
          "Chương trình cố vấn nghề nghiệp 6 tháng",
          "Cơ hội thực tập tại các dự án trọng điểm",
        ],
      },
    ],
    relatedIds: [3208, 3209],
  },
  {
    id: 3211,
    slug: "central-chuong-trinh-mentor-ky-su",
    title: "Ra mắt chương trình Mentor Kỹ sư 2025",
    date: "2025-03-25",
    category: NEWS_CATEGORIES.TRAINING.key,
    cover: "/assets/news/TRAINING/image11.png",
    excerpt:
      "Chương trình Mentor ghép đôi 60 lãnh đạo dự án với kỹ sư trẻ nhằm tăng tốc phát triển năng lực trong 12 tháng.",
    blocks: [
      {
        type: "p",
        text: "Học viên được định hướng lộ trình nghề nghiệp, tham gia dự án thực tế và nhận phản hồi định kỳ từ mentor.",
      },
      {
        type: "list",
        items: [
          "6 buổi coaching 1-1 mỗi quý",
          "Workshop kỹ năng lãnh đạo hiện trường",
          "Diễn đàn chia sẻ kinh nghiệm quản lý dự án",
        ],
      },
    ],
    relatedIds: [3209, 3212],
  },
];

NEWS.forEach(ensureFiveImages);
