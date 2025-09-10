import React, { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {showHeader && <Header />}
      {children}
      <main className="flex-grow"></main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
