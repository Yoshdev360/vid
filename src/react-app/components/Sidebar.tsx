import { useNavigate, useLocation } from "react-router";
import { 
  User, Settings, Video, FolderOpen, Music, Rocket,
  Building, Newspaper, LogOut, Box, Headphones
} from "lucide-react";
import { useAuth } from "@getmocha/users-service/react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
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
        onClick={() => navigate(path)}
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

  return (
    <nav className="hidden lg:flex w-64 bg-gray-800 flex-col justify-between border-r border-gray-700 shrink-0">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <Box className="text-purple-500 w-6 h-6 mr-3" />
          <span className="font-bold text-lg tracking-wide text-white">Motcha IA</span>
        </div>

        <div className="py-4 space-y-1">
          <NavButton icon={User} label="Perfil" path="/profile" />
          <NavButton icon={Settings} label="Configuración" path="/config" />
          <NavButton icon={Video} label="Video" path="/" />
          <NavButton icon={FolderOpen} label="Archivos" path="/files" />
          <NavButton icon={Music} label="Canciones" path="/songs" />
          <NavButton icon={Rocket} label="Misiones" path="/missions" />
          <NavButton icon={Headphones} label="Soporte Técnico" path="/support" />
        </div>
      </div>

      <div className="border-t border-gray-700 py-4">
        <div className="px-6 mb-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
          Legal & Info
        </div>
        <button
          onClick={() => navigate("/about")}
          className="w-full text-left px-6 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 flex items-center"
        >
          <Building className="w-4 h-4 mr-2" /> Nosotros
        </button>
        <button
          onClick={() => navigate("/blog")}
          className="w-full text-left px-6 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 flex items-center"
        >
          <Newspaper className="w-4 h-4 mr-2" /> Blog
        </button>
        <button
          onClick={() => navigate("/terms")}
          className="w-full text-left px-6 py-2 text-xs text-gray-500 hover:text-white"
        >
          Términos y Condiciones
        </button>
        <button
          onClick={() => navigate("/privacy")}
          className="w-full text-left px-6 py-2 text-xs text-gray-500 hover:text-white"
        >
          Políticas de Privacidad
        </button>
        <button
          onClick={() => navigate("/cookies")}
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
  );
}
