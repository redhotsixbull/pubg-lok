import type { Metadata } from "next";
import "./globals.css";
import Header from "./component/Header";

export const metadata: Metadata = {
  title: "PUBG Lok",
  description: "감도 계산기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-screen flex flex-col">
          <main className="flex flex-1">
            {/* Left ad */}
            <aside className="hidden lg:block w-[200px] border-r p-2 text-sm text-gray-500">
              {/* 좌측 광고 */}
            </aside>
            <div className="flex-1 p-4">{children}</div>
            {/* Right ad */}
            <aside className="hidden lg:block w-[200px] border-l p-2 text-sm text-gray-500">
              {/* 우측 광고 */}
            </aside>
          </main>
        </div>
        {/* Footer */}
        <footer className="p-4 text-center text-sm text-muted-foreground border-t">
          © 2025 Lok
        </footer>
      </body>
    </html>
  );
}
