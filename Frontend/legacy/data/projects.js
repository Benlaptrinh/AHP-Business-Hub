export const PROJECT_CATEGORIES = {
  VILLA: "biet-thu-tan-co-dien",
  TOWNHOUSE: "nha-pho-hien-dai",
};

const PROJECTS_SOURCE = [
  {
    id: "biet-thu-tan-co-dien-hue-1",
    title: "Biệt Thự Gia Đình Anh Minh - Thủ Đức, TP.HCM (2024)",
    desc: "Căn biệt thự 3 tầng này nằm trong khu compound yên tĩnh ở Thủ Đức, được anh Minh thiết kế theo phong cách tân cổ điển Pháp mà gia đình anh rất yêu thích. Tổng diện tích xây dựng 450m² với sân vườn 200m² trồng nhiều cây xanh và có bể bơi nhỏ xinh cho các con vui chơi. Màu trắng kem chủ đạo tạo cảm giác thoáng mát, những cột trụ và chi tiết chạm khắc làm điểm nhấn nhẹ nhàng không quá rườm rà. Nhà có đủ không gian cho cả gia đình đông người, từ phòng khách rộng đến bếp hiện đại, phòng ngủ master có ban công riêng ngắm cảnh. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/1_29_06_2025.JPG",
    gallery: Array.from({ length: 18 }, (_, i) => `/assets/File_Nha/${i + 1}_29_06_2025.JPG`),
    client: "Gia đình anh Minh",
    location: "Vĩnh Long",
    scope: "Thiết kế kiến trúc, nội thất và thi công hoàn thiện",
    time: "2024",
    content:
      "Khi anh Minh quyết định xây nhà mới cho gia đình, anh muốn một không gian vừa đẹp mắt vừa thực tế để cả nhà sinh hoạt thoải mái. Căn biệt thự 3 tầng này được xây trên mảnh đất 650m² trong khu compound an ninh, yên tĩnh ở Thủ Đức.\n\nMặt tiền nhà thiết kế theo kiểu tân cổ điển với những cột trụ cao, ban công sắt uốn cong nhẹ nhàng và mái ngói màu đỏ trầm. Cổng vào rộng rãi, lối đi lát đá granite dẫn vào nhà qua khu vườn nhỏ trồng nhiều cây bóng mát. Bên hông nhà có bể bơi dài 12m cho các con tập bơi, xung quanh bể là khu deck gỗ để đặt ghế nằm nghỉ ngơi cuối tuần.\n\nTầng 1 là khu sinh hoạt chung: phòng khách rộng 50m² với trần cao 4m, đèn chùm lớn và sofa da nhập khẩu xếp thành chữ U. Bếp được thiết kế mở liền với phòng ăn, có bàn đảo lớn tiện nấu nướng, tủ bếp gỗ sơn trắng và máy móc điện tử hiện đại. Ngoài ra còn có phòng làm việc nhỏ và toilet khách.\n\nTầng 2 dành cho các phòng ngủ: phòng master 45m² có phòng thay đồ riêng, phòng tắm rộng với bồn tắm nằm và vòi sen đứng. Hai phòng ngủ cho các con, mỗi phòng đều có ban công riêng và nhà vệ sinh trong. Tầng 3 là phòng đa năng để tập gym, xem phim và phơi đồ.\n\nNội thất trong nhà chọn tông màu nhẹ nhàng, gỗ tự nhiên kết hợp với đá marble trắng. Hệ thống điều hòa multi, camera an ninh và smarthome giúp sinh hoạt tiện lợi hơn. Nhìn chung là một ngôi nhà đẹp, thoáng mát và rất phù hợp cho gia đình đông người. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2024,
    region: "Miền Nam",
  },
  {
    id: "biet-thu-tan-co-dien-da-nang-2",
    title: "Villa Gia Đình Chị Hương - Quận 9, TP.HCM (2023)",
    desc: "Chị Hương làm kinh doanh nên muốn căn villa vừa hiện đại vừa có chút cổ điển để trông sang nhưng không quá cầu kỳ. Căn nhà 2 tầng này có tổng diện tích 380m², sân vườn 150m² trồng nhiều cây xanh và hoa tươi, garage rộng đủ để 3 chiếc xe. Mặt tiền dùng kính cách nhiệt nên nhà mát hơn, ban công rộng để ngồi uống cà phê buổi chiều. Trong nhà chọn màu trắng xám chủ đạo trông sạch sẽ, thoáng đãng, kết hợp gỗ veneer và đá nhân tạo bền đẹp dễ vệ sinh. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/19_29_06_2025.JPG",
    gallery: Array.from({ length: 18 }, (_, i) => `/assets/File_Nha/${i + 19}_29_06_2025.JPG`),

    client: "Gia đình chị Hương",
    location: "Đồng Tháp",
    scope: "Thiết kế và thi công trọn gói",
    time: "2023",
    content:
      "Chị Hương chọn mảnh đất góc trong khu villa Quận 9 để xây nhà mới, vị trí đẹp, thoáng mát và yên tĩnh. Điểm đặc biệt của căn villa này là mặt tiền dùng kính Low-E cách nhiệt, vừa cho ánh sáng tự nhiên vào nhà vừa không bị nóng như kính thường. Nhìn từ ngoài vào rất hiện đại nhưng vẫn giữ được nét cổ điển ở phần mái và cột trang trí.\n\nTầng 1 của nhà thiết kế theo kiểu mở, phòng khách liền bếp và phòng ăn tạo không gian rộng rãi cho gia đình sum họp. Phòng khách có sofa góc lớn màu xám, bàn trà đá marble và tivi 75 inch gắn tường. Bếp hiện đại với tủ bếp acrylic trắng bóng, bếp từ, máy hút mùi âm trần và đầy đủ thiết bị như lò nướng, máy rửa bát, tủ lạnh side by side. Bàn đảo ở giữa bếp vừa để chuẩn bị đồ ăn vừa là quầy bar nhỏ. Ngoài ra tầng 1 còn có phòng làm việc riêng cho chị và toilet khách.\n\nTầng 2 có 3 phòng ngủ, phòng master rộng 35m² có phòng thay đồ walk-in và phòng tắm riêng với bồn tắm nằm, vòi sen đứng và 2 lavabo. Ban công phòng master hướng ra vườn sau, trồng nhiều cây xanh nên view rất đẹp. Hai phòng ngủ còn lại dành cho các con, mỗi phòng đều có tủ âm tường và ban công nhỏ. Có thêm 1 phòng vệ sinh chung cho 2 phòng này.\n\nSân vườn phía trước trồng cỏ nhung, cây bóng mát và có lối đi lát đá. Garage rộng để được 3 xe, có cửa cuốn tự động và hệ thống sạc xe điện. Sân sau có khu vực deck gỗ nhựa composite để đặt bàn ghế ngoài trời, tối cuối tuần gia đình hay ngồi đây uống trà tán gẫu.\n\nToàn bộ nhà dùng hệ thống smarthome điều khiển đèn, điều hòa, rèm cửa qua app điện thoại. Hệ thống camera an ninh lắp đầy đủ trong ngoài. Tường nhà sơn màu trắng kem, sàn lát gỗ công nghiệp màu nâu sáng. Nhìn chung căn villa này vừa đẹp vừa tiện nghi, phù hợp cho gia đình trẻ hiện đại.Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2023,
    region: "Miền Nam",
  },
  {
    id: "biet-thu-tan-co-dien-quang-nam-3",
    title: "Villa Gia Đình Anh Tuấn - Trà Vinh (2024)",
    desc: "Biệt thự 2 tầng phong cách tân cổ điển Ý với hệ thống cột đôi tráng lệ, kiến trúc đối xứng hoàn hảo và sân vườn xanh mát bao quanh. Dự án được hoàn thiện với vật liệu cao cấp nhập khẩu từ Ý, kết hợp giữa nét đẹp cổ điển Địa Trung Hải và thiết kế hiện đại, mang đến không gian sống đẳng cấp quý tộc cho gia chủ tại Hội An. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/6_09_09_2024.JPG",
    gallery: Array.from({ length: 16 }, (_, i) => `/assets/File_Nha/${i + 7}_09_09_2024.JPG`),
    client: "Gia đình anh Tuấn",
    location: "Trà Vinh",
    scope: "Thiết kế kiến trúc, cảnh quan và thi công",
    time: "2024",
    content:
      "Kết hợp nét đẹp cổ điển Ý với vật liệu cao cấp, tạo không gian sống đẳng cấp. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2024,
    region: "Miền Nam",
  },
  {
    id: "biet-thu-tan-co-dien-tphcm-4",
    title: "Biệt Thự Gia Đình Anh Hoàng - Sóc Trăng - Miền Tây (2023)",
    desc: "Biệt thự 3 tầng phong cách tân cổ điển Pháp với mái Mansard đặc trưng, hệ thống cửa sổ cung tinh tế và ban công sắt uốn lượn đầy nghệ thuật. Nội thất được hoàn thiện bằng gỗ óc chó cao cấp, đá marble nhập khẩu và các chi tiết chạm khắc thủ công, tạo nên không gian sống sang trọng và ấm cúng cho gia đình tại trung tâm Sài Gòn. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/40_09_09_2024.JPG",
    gallery: Array.from({ length: 19 }, (_, i) => `/assets/File_Nha/${i + 23}_09_09_2024.JPG`),
    client: "Gia đình anh Hoàng",
    location: "Sóc Trăng",
    scope: "Thiết kế và thi công hoàn thiện",
    time: "2023",
    content:
      "Phong cách tân cổ điển Pháp sang trọng với nội thất gỗ óc chó cao cấp. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2023,
    region: "Miền Nam",
  },
  {
    id: "biet-thu-tan-co-dien-binh-duong-5",
    title: "Biệt Thự Gia Đình Chị Lan - Bến Tre - Miền Tây (2024)",
    desc: "Căn biệt thự 2 tầng phong cách tân cổ điển Mỹ với mặt tiền đối xứng hoàn hảo, hệ thống cửa kính lớn tận dụng tối đa ánh sáng tự nhiên và không gian mở hiện đại. Thiết kế mang đến sự kết hợp độc đáo giữa nét cổ điển Mỹ truyền thống và công năng sống hiện đại, với nội thất gọn gàng, tiện nghi và thân thiện với môi trường. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/a05a9b9b04e1b4e3444766ced446e50f.jpg",
    gallery: Array.from({ length: 39 }, (_, i) => `/assets/File_Nha/${i + 2}_17_09_2024.JPG`),

    client: "Gia đình chị Lan",
    location: "Kiên Giang",
    scope: "Thiết kế kiến trúc, nội thất và thi công",
    time: "2024",
    content:
      "Thiết kế mở, tận dụng ánh sáng tự nhiên với phong cách tân cổ điển hiện đại. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2024,
    region: "TP.HCM",
  },
  {
    id: "biet-thu-tan-co-dien-ha-noi-6",
    title: "Biệt Thự Gia Đình Anh Đức - Cần Thơ (2023)",
    desc: "Biệt thự 3 tầng kết hợp tinh tế giữa phong cách tân cổ điển Châu Âu và nét đẹp văn hóa Bắc Bộ truyền thống. Kiến trúc uy nghi với hệ thống cột trụ cao, mái ngói đỏ đặc trưng và chi tiết chạm khắc thủ công tinh xảo. Không gian nội thất ấm cúng, sang trọng, phù hợp với khí hậu miền Bắc, mang đến sự kết hợp hoàn hảo giữa cổ điển và hiện đại. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/1_31_10_2024.JPG",
    gallery: Array.from(
      { length: 34 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 2}_31_10_2024.JPG`
    ),

    client: "Gia đình anh Đức",
    location: "Cần Thơ",
    scope: "Thiết kế và thi công trọn gói",
    time: "2023",
    content:
      "Kiến trúc uy nghi với hệ thống cột trụ cao, mái ngói đỏ và chi tiết chạm khắc tinh xảo. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2023,
    region: "Miền Tây",
  },
  {
    id: "biet-thu-tan-co-dien-dong-nai-7",
    title: "Biệt Thự Gia Đình Anh Bình - An Giang, Việt Nam (2024)",
    desc: "Biệt thự vườn 2 tầng phong cách tân cổ điển với sân vườn rộng hơn 500m², hồ cá Koi Nhật Bản và khu BBQ ngoài trời. Thiết kế hướng đến không gian sống gần gũi thiên nhiên, kết hợp giữa vẻ đẹp kiến trúc cổ điển Châu Âu và môi trường sinh thái xanh mát, mang lại cảm giác thư thái và yên bình cho gia chủ. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/1_26_11_2024.JPG",
    gallery: Array.from(
      { length: 24 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 2}_31_10_2024.JPG`
    ),

    client: "Gia đình anh Bình",
    location: "An Giang, Việt Nam",
    scope: "Thiết kế kiến trúc, cảnh quan và thi công",
    time: "2024",
    content:
      "Kết hợp không gian sống gần gũi thiên nhiên với phong cách kiến trúc cổ điển Châu Âu. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2024,
    region: "Miền Tây",
  },
  {
    id: "biet-thu-tan-co-dien-nha-trang-8",
    title: "Villa Gia Đình Chị Mai - Long An (2023)",
    desc: "Biệt thự view biển 3 tầng phong cách tân cổ điển Địa Trung Hải với tông màu trắng chủ đạo, mái ngói đỏ cam và hệ thống cửa sổ arched đặc trưng. Thiết kế mở hướng biển, tận dụng tối đa view đẹp và gió biển tự nhiên, tạo nên không gian sống nghỉ dưỡng lý tưởng. Nội thất phong cách coastal với gam màu xanh biển - trắng, mang lại cảm giác thư thái và sang trọng. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/1_27_11_2024.JPG",
    gallery: Array.from(
      { length: 5 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 2}_27_11_2024.JPG`
    ),
    client: "Gia đình chị Mai",
    location: "Long An",
    scope: "Thiết kế và thi công hoàn thiện",
    time: "2023",
    content:
      "Thiết kế mở hướng biển, tận dụng view đẹp với phong cách tân cổ điển sang trọng. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2023,
    region: "Miền Tây",
  },
  {
    id: "nha-pho-hien-dai-da-nang-1",
    title: "Nhà Phố Gia Đình Anh Tân - Bến Tre, Miền Tây (2024)",
    desc: "Nhà phố 4 tầng phong cách hiện đại tối giản với mặt tiền kính Low-E tiết kiệm năng lượng, hệ thống giếng trời tự nhiên và sân thượng sky garden xanh mát. Thiết kế tối ưu hóa không gian sinh hoạt, ánh sáng tự nhiên tràn ngập mỗi góc nhà, kết hợp công nghệ smarthome hiện đại và vật liệu thân thiện môi trường, mang lại không gian sống tiện nghi và bền vững. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/2_11_12_2024.JPG",
    gallery: Array.from(
      { length: 10 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 3}_11_12_2024.JPG`
    ),
    client: "Gia đình anh Tân",
    location: "Hậu Giang",
    scope: "Thiết kế kiến trúc, nội thất và thi công",
    time: "2024",
    content:
      "Thiết kế hiện đại với hệ thống kính Low-E, giếng trời và không gian xanh xen kẽ. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.TOWNHOUSE,
    year: 2024,
    region: "Miền Nam",
  },
  {
    id: "nha-pho-hien-dai-hcm-2",
    title: "Nhà Phố Gia Đình Chị Thu - Long An  Miền Tây (2023)",
    desc: "Nhà phố 5 tầng phong cách hiện đại với thiết kế thông minh tối ưu diện tích hẹp, phòng khách liên thông, bếp mở hiện đại và sân thượng BBQ. Mỗi tầng được bố trí khoa học với giếng trời xuyên suốt, đảm bảo thông gió và ánh sáng tự nhiên. Nội thất tông màu trắng - xám, đơn giản nhưng tinh tế, phù hợp với gia đình trẻ yêu thích phong cách sống đô thị hiện đại. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/1_16_02_2025.JPG",
    gallery: Array.from(
      { length: 19 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 2}_16_02_2025.JPG`
    ),
    client: "Gia đình chị Thu",
    location: "Tây Ninh",
    scope: "Thiết kế và thi công hoàn thiện",
    time: "2023",
    content:
      "Thiết kế tối ưu công năng với phòng khách liên thông, bếp mở và sân thượng BBQ. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.TOWNHOUSE,
    year: 2023,
    region: "Miền Nam",
  },
  {
    id: "nha-pho-hien-dai-ha-noi-3",
    title: "Nhà Phố Gia Đình Anh Thành - Tiền Giang (2024)",
    desc: "Nhà phố 4 tầng phong cách contemporary thanh lịch với tông màu trắng - xám chủ đạo, vật liệu gỗ tự nhiên ấm áp và không gian mở tràn ngập ánh sáng. Thiết kế đơn giản nhưng tinh tế, kết hợp giữa nội thất Scandinavian và công năng sống hiện đại, tạo nên không gian sống thoáng đãng, gần gũi thiên nhiên ngay giữa lòng Hà Nội. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/1_26_02_2025.JPG",
    gallery: Array.from(
      { length: 20 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 2}_26_02_2025.JPG`
    ),
    client: "Gia đình anh Thành",
    location: "Tiền Giang",
    scope: "Thiết kế kiến trúc, nội thất và thi công",
    time: "2024",
    content:
      "Thiết kế contemporary thanh lịch với không gian mở, ánh sáng tự nhiên tràn ngập. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.TOWNHOUSE,
    year: 2024,
    region: "Miền Tây",
  },
  {
    id: "nha-pho-hien-dai-binh-thanh-4",
    title: "Nhà Phố Gia Đình Anh Phong -  Tây Ninh  (2023)",
    desc: "Nhà phố 5 tầng phong cách urban hiện đại với garage ô tô tầng trệt, thang máy gia đình và hệ thống smarthome toàn diện điều khiển bằng giọng nói và ứng dụng mobile. Thiết kế tối ưu công năng với đầy đủ tiện nghi: phòng gym, phòng giải trí, phòng làm việc riêng và rooftop garden, đáp ứng mọi nhu cầu của gia đình hiện đại. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/1_05_03_2025.JPG",
    gallery: Array.from(
      { length: 17 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 2}_05_03_2025.JPG`
    ),
    client: "Gia đình anh Phong",
    location: "Long An",
    scope: "Thiết kế và thi công trọn gói",
    time: "2023",
    content:
      "Thiết kế urban thông minh với đầy đủ tiện nghi hiện đại và hệ thống smarthome. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.TOWNHOUSE,
    year: 2023,
    region: "Miền Nam",
  },
  {
    id: "nha-pho-hien-dai-hai-chau-5",
    title: "Nhà Phố Gia Đình Chị Trang - Bến Tre (2024)",
    desc: "Nhà phố 4 tầng phong cách minimalist với thiết kế tối giản, công năng tối ưu và tông màu trắng tinh khôi chủ đạo. Nội thất gọn gàng, tiện nghi, không gian sống đơn giản nhưng đầy đủ công năng với bếp hiện đại, phòng khách thoáng mát và sân thượng thư giãn. Phù hợp với gia đình yêu thích phong cách sống tối giản và thân thiện môi trường. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/18_27_03_2025.JPG",
    gallery: Array.from(
      { length: 22 }, // vì từ 2 → 35 có 34 ảnh
      (_, i) => `/assets/File_Nha/${i + 20}_27_03_2025.JPG`
    ),
    client: "Gia đình chị Trang",
    location: "Bến Tre",
    scope: "Thiết kế kiến trúc, nội thất và thi công",
    time: "2024",
    content:
      "Phong cách minimalist với tông màu trắng chủ đạo, nội thất gọn gàng và tiện nghi. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.TOWNHOUSE,
    year: 2024,
    region: "Miền Tây",
  },
  {
    id: "biet-thu-tan-co-dien-da-nang-2",
    title: "Villa Gia Đình Chị Hương - Quận 9, TP.HCM (2023)",
    desc: "Chị Hương làm kinh doanh nên muốn căn villa vừa hiện đại vừa có chút cổ điển để trông sang nhưng không quá cầu kỳ. Căn nhà 2 tầng này có tổng diện tích 380m², sân vườn 150m² trồng nhiều cây xanh và hoa tươi, garage rộng đủ để 3 chiếc xe. Mặt tiền dùng kính cách nhiệt nên nhà mát hơn, ban công rộng để ngồi uống cà phê buổi chiều. Trong nhà chọn màu trắng xám chủ đạo trông sạch sẽ, thoáng đãng, kết hợp gỗ veneer và đá nhân tạo bền đẹp dễ vệ sinh. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/19_29_06_2025.JPG",
    gallery: Array.from({ length: 18 }, (_, i) => `/assets/File_Nha/${i + 19}_29_06_2025.JPG`),

    client: "Gia đình chị Hương",
    location: "Đồng Tháp",
    scope: "Thiết kế và thi công trọn gói",
    time: "2023",
    content:
      "Chị Hương chọn mảnh đất góc trong khu villa Quận 9 để xây nhà mới, vị trí đẹp, thoáng mát và yên tĩnh. Điểm đặc biệt của căn villa này là mặt tiền dùng kính Low-E cách nhiệt, vừa cho ánh sáng tự nhiên vào nhà vừa không bị nóng như kính thường. Nhìn từ ngoài vào rất hiện đại nhưng vẫn giữ được nét cổ điển ở phần mái và cột trang trí.\n\nTầng 1 của nhà thiết kế theo kiểu mở, phòng khách liền bếp và phòng ăn tạo không gian rộng rãi cho gia đình sum họp. Phòng khách có sofa góc lớn màu xám, bàn trà đá marble và tivi 75 inch gắn tường. Bếp hiện đại với tủ bếp acrylic trắng bóng, bếp từ, máy hút mùi âm trần và đầy đủ thiết bị như lò nướng, máy rửa bát, tủ lạnh side by side. Bàn đảo ở giữa bếp vừa để chuẩn bị đồ ăn vừa là quầy bar nhỏ. Ngoài ra tầng 1 còn có phòng làm việc riêng cho chị và toilet khách.\n\nTầng 2 có 3 phòng ngủ, phòng master rộng 35m² có phòng thay đồ walk-in và phòng tắm riêng với bồn tắm nằm, vòi sen đứng và 2 lavabo. Ban công phòng master hướng ra vườn sau, trồng nhiều cây xanh nên view rất đẹp. Hai phòng ngủ còn lại dành cho các con, mỗi phòng đều có tủ âm tường và ban công nhỏ. Có thêm 1 phòng vệ sinh chung cho 2 phòng này.\n\nSân vườn phía trước trồng cỏ nhung, cây bóng mát và có lối đi lát đá. Garage rộng để được 3 xe, có cửa cuốn tự động và hệ thống sạc xe điện. Sân sau có khu vực deck gỗ nhựa composite để đặt bàn ghế ngoài trời, tối cuối tuần gia đình hay ngồi đây uống trà tán gẫu.\n\nToàn bộ nhà dùng hệ thống smarthome điều khiển đèn, điều hòa, rèm cửa qua app điện thoại. Hệ thống camera an ninh lắp đầy đủ trong ngoài. Tường nhà sơn màu trắng kem, sàn lát gỗ công nghiệp màu nâu sáng. Nhìn chung căn villa này vừa đẹp vừa tiện nghi, phù hợp cho gia đình trẻ hiện đại.Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2023,
    region: "Miền Nam",
  },
  {
    id: "biet-thu-tan-co-dien-quang-nam-3",
    title: "Villa Gia Đình Anh Tuấn - Bình Tân, TP.HCM (2024)",
    desc: "Biệt thự 2 tầng phong cách tân cổ điển Ý với hệ thống cột đôi tráng lệ, kiến trúc đối xứng hoàn hảo và sân vườn xanh mát bao quanh. Dự án được hoàn thiện với vật liệu cao cấp nhập khẩu từ Ý, kết hợp giữa nét đẹp cổ điển Địa Trung Hải và thiết kế hiện đại, mang đến không gian sống đẳng cấp quý tộc cho gia chủ tại Hội An. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/6_09_09_2024.JPG",
    gallery: Array.from({ length: 16 }, (_, i) => `/assets/File_Nha/${i + 7}_09_09_2024.JPG`),
    client: "Gia đình anh Tuấn",
    location: "Trà Vinh",
    scope: "Thiết kế kiến trúc, cảnh quan và thi công",
    time: "2024",
    content:
      "Kết hợp nét đẹp cổ điển Ý với vật liệu cao cấp, tạo không gian sống đẳng cấp. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2024,
    region: "Miền Nam",
  },
  {
    id: "biet-thu-tan-co-dien-tphcm-4",
    title: "Biệt Thự Gia Đình Anh Hoàng - Sóc Trăng (2023)",
    desc: "Biệt thự 3 tầng phong cách tân cổ điển Pháp với mái Mansard đặc trưng, hệ thống cửa sổ cung tinh tế và ban công sắt uốn lượn đầy nghệ thuật. Nội thất được hoàn thiện bằng gỗ óc chó cao cấp, đá marble nhập khẩu và các chi tiết chạm khắc thủ công, tạo nên không gian sống sang trọng và ấm cúng cho gia đình tại trung tâm Sài Gòn. Căn nhà này được thiết kế theo nhu cầu sinh hoạt của gia đình miền Nam, thiết kế thoáng mát, dễ chịu, có nhiều ánh sáng tự nhiên. Không gian được sắp xếp hợp lý, vừa đẹp vừa tiện, phù hợp cho sinh hoạt hằng ngày. Buổi sáng uống cà phê trước sân, chiều về ngồi trò chuyện cùng người thân — cảm giác bình yên, gần gũi.",
    image: "/assets/File_Nha/40_09_09_2024.JPG",
    gallery: Array.from({ length: 19 }, (_, i) => `/assets/File_Nha/${i + 23}_09_09_2024.JPG`),
    client: "Gia đình anh Hoàng",
    location: "Sóc Trăng",
    scope: "Thiết kế và thi công hoàn thiện",
    time: "2023",
    content:
      "Phong cách tân cổ điển Pháp sang trọng với nội thất gỗ óc chó cao cấp. Không gian bên trong được bố trí ấm cúng, từng phòng đều đón ánh sáng và gió trời tự nhiên. Nội thất được chọn lựa kỹ, màu sắc nhẹ nhàng, dễ chịu, mang phong cách miền Nam thân thiện, thoải mái mà vẫn tinh tế. Tất cả tạo nên một mái ấm đúng nghĩa, nơi ai cũng muốn quay về sau một ngày dài.",
    category: PROJECT_CATEGORIES.VILLA,
    year: 2023,
    region: "Miền Nam",
  },
];

export const PROJECTS = PROJECTS_SOURCE.filter(
  (item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index
);
