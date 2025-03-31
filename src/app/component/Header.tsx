"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const menuItems = [
    { label: "감도 계산기", href: "/" },
    // { label: "오브젝트 위치 확인", href: "/map" },
  ];

  return (
    <header className="w-full px-6 py-4 border-b border-border bg-card text-card-foreground">
      <nav className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">PUBG 도구</h1>

        <ul className="flex gap-6 text-sm">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors hover:text-primary ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
