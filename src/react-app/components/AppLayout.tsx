import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";
import AnimatedBackground from "./AnimatedBackground";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-gray-900 overflow-hidden relative">
      <AnimatedBackground />
      <Sidebar />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen relative bg-transparent z-10">
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
