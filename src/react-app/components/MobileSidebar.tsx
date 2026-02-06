import { useNavigate, useLocation } from "react-router";
import { 
  User, Settings, Video, FolderOpen, Music, Rocket,
  Building, Newspaper, LogOut, Box, X
} from "lucide-react";
import { useAuth } from "@getmocha/users-service/react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/auth/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => location.pathname === path;

  const NavButton = ({ 
    icon: Icon, 
    label, 
    path 
  }: { 
    icon: React.ComponentType<{ className?: string }>, 
    label: string, 
    path: string 
  }) => {
    const active = isActive(path);
    return (
      <button
        onClick={() => handleNavigate(path)}
        className={`w-full flex items-center px-6 py-3 transition group ${
          active
            ? "text-gray-100 bg-gray-700 border-l-4 border-purple-500"
            : "text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <Icon className={`w-5 h-5 ${active ? "text-purple-400" : "group-hover:text-purple-400"}`} />
        <span className={`ml-3 ${active ? "font-medium" : ""}`}>{label}</span>
      </button>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      <nav className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 flex flex-col justify-between border-r border-gray-700 z-50 lg:hidden transform transition-transform duration-300">
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-700">
            <div className="flex items-center">
              <Box className="text-purple-500 w-6 h-6 mr-3" />
              <span className="font-bold text-lg tracking-wide text-white">Motcha IA</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-4 space-y-1">
            <NavButton icon={User} label="Perfil" path="/profile" />
            <NavButton icon={Settings} label="Configuración" path="/config" />
            <NavButton icon={Video} label="Video" path="/" />
            <NavButton icon={FolderOpen} label="Archivos" path="/files" />
            <NavButton icon={Music} label="Canciones" path="/songs" />
            <NavButton icon={Rocket} label="Misiones" path="/missions" />
          </div>
        </div>

        <div className="border-t border-gray-700 py-4">
          <div className="px-6 mb-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
            Legal & Info
          </div>
          <button
            onClick={() => handleNavigate("/about")}
            className="w-full text-left px-6 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 flex items-center"
          >
            <Building className="w-4 h-4 mr-2" /> Nosotros
          </button>
          <button
            onClick={() => handleNavigate("/blog")}
            className="w-full text-left px-6 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 flex items-center"
          >
            <Newspaper className="w-4 h-4 mr-2" /> Blog
          </button>
          <button
            onClick={() => handleNavigate("/terms")}
            className="w-full text-left px-6 py-2 text-xs text-gray-500 hover:text-white"
          >
            Términos y Condiciones
          </button>
          <button
            onClick={() => handleNavigate("/privacy")}
            className="w-full text-left px-6 py-2 text-xs text-gray-500 hover:text-white"
          >
            Políticas de Privacidad
          </button>
          <button
            onClick={() => handleNavigate("/cookies")}
            className="w-full text-left px-6 py-2 text-xs text-gray-500 hover:text-white"
          >
            Política de Cookies
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-2 text-sm text-red-400 hover:bg-gray-700 mt-2 flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
          </button>
        </div>
      </nav>
    </>
  );
}
