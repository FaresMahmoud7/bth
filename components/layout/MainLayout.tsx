"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define routes that shouldn't have the main Navbar and Footer
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/login";
  
  if (isAdminRoute || isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
