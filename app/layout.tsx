import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "百万咨询室",
  description: "向世界顶尖思想家请教，一个问题，多位大师的智慧。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
