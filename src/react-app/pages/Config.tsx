import AppLayout from "@/react-app/components/AppLayout";
import { Settings } from "lucide-react";

export default function ConfigPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center mb-6">
          <Settings className="w-8 h-8 text-purple-500 mr-3" />
          <h2 className="text-2xl font-bold text-white">Configuración</h2>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Idioma</label>
              <select className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white">
                <option>Español</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">
                Notificaciones
              </label>
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span className="text-gray-300">Recibir notificaciones por email</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Tema</label>
              <select className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white">
                <option>Oscuro</option>
                <option>Claro</option>
                <option>Automático</option>
              </select>
            </div>
          </div>
          <button className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded transition">
            Guardar Cambios
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
