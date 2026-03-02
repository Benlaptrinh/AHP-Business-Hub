import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "AN HỒNG PHÁT - Thiết Kế & Xây Dựng",
  description:
    "An Hồng Phát - Công ty thiết kế & thi công xây dựng uy tín. Chuyên nhà phố, biệt thự, công trình dân dụng & công nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
