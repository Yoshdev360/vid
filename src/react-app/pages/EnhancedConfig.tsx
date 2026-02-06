import { useState } from "react";
import AppLayout from "@/react-app/components/AppLayout";
import { 
  Settings, Bell, Globe, Palette, Shield, Key, 
  Download, Trash2, Save, CheckCircle, Mail, Lock
} from "lucide-react";
import { useAuth } from "@getmocha/users-service/react";

export default function EnhancedConfigPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications" | "preferences">("general");
  const [saved, setSaved] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");

  const handleEmailChange = () => {
    alert(`Email actualizado a: ${newEmail}`);
    setShowEmailModal(false);
    setNewEmail("");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Contraseña actualizada exitosamente");
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEnable2FA = () => {
    alert("Autenticación de dos factores habilitada");
    setShow2FAModal(false);
    setTwoFACode("");
  };

  const [config, setConfig] = useState({
    language: "es",
    theme: "dark",
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    videoQuality: "hd",
    autoSave: true,
    dataCollection: true,
  });

  const handleSave = () => {
    // Save configuration logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportData = () => {
    alert("Exportando tus datos... Recibirás un correo con la descarga.");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (confirmed) {
      alert("Cuenta marcada para eliminación. Contacta a soporte para confirmar.");
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Seguridad", icon: Shield },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "preferences", label: "Preferencias", icon: Palette },
  ];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="flex items-center mb-8">
          <Settings className="w-8 h-8 text-purple-500 mr-3" />
          <h2 className="text-3xl font-bold text-white">Configuración</h2>
        </div>

        {saved && (
          <div className="mb-6 bg-green-900 border border-green-600 rounded-lg p-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <span className="text-green-200">Configuración guardada exitosamente</span>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {/* Tabs - Mobile Dropdown, Desktop Tabs */}
          <div className="border-b border-gray-700">
            {/* Mobile: Dropdown */}
            <div className="block sm:hidden p-4">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Desktop: Tabs */}
            <div className="hidden sm:flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center px-6 py-4 font-medium transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-purple-400 border-b-2 border-purple-500 bg-gray-900"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Idioma
                  </label>
                  <select
                    value={config.language}
                    onChange={(e) => setConfig({ ...config, language: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Tema
                  </label>
                  <select
                    value={config.theme}
                    onChange={(e) => setConfig({ ...config, theme: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                  >
                    <option value="dark">Oscuro</option>
                    <option value="light">Claro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">
                    Calidad de Video por Defecto
                  </label>
                  <select
                    value={config.videoQuality}
                    onChange={(e) => setConfig({ ...config, videoQuality: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                  >
                    <option value="4k">4K (Máxima Calidad)</option>
                    <option value="hd">HD (Recomendado)</option>
                    <option value="sd">SD (Menor Costo)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Guardado Automático</p>
                    <p className="text-gray-400 text-sm">Guarda tus proyectos automáticamente</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.autoSave}
                      onChange={(e) => setConfig({ ...config, autoSave: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Mail className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">Correo Electrónico</h3>
                      <p className="text-gray-400 text-sm mb-3">{user?.google_user_data?.email || "No disponible"}</p>
                      <button 
                        onClick={() => setShowEmailModal(true)}
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                      >
                        Cambiar correo →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Lock className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">Contraseña</h3>
                      <p className="text-gray-400 text-sm mb-3">Última actualización: Nunca</p>
                      <button 
                        onClick={() => setShowPasswordModal(true)}
                        className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                      >
                        Cambiar contraseña →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Key className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">Autenticación de Dos Factores</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        Agrega una capa extra de seguridad a tu cuenta
                      </p>
                      <button 
                        onClick={() => setShow2FAModal(true)}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                      >
                        Habilitar 2FA
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <Trash2 className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">Zona de Peligro</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        Estas acciones son permanentes y no se pueden deshacer
                      </p>
                      <div className="space-y-3">
                        <button
                          onClick={handleExportData}
                          className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exportar mis datos
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar mi cuenta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Notificaciones por Email</p>
                    <p className="text-gray-400 text-sm">Recibe actualizaciones importantes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.emailNotifications}
                      onChange={(e) =>
                        setConfig({ ...config, emailNotifications: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Notificaciones Push</p>
                    <p className="text-gray-400 text-sm">Alertas en tiempo real</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.pushNotifications}
                      onChange={(e) =>
                        setConfig({ ...config, pushNotifications: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Emails de Marketing</p>
                    <p className="text-gray-400 text-sm">Ofertas y novedades</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.marketingEmails}
                      onChange={(e) =>
                        setConfig({ ...config, marketingEmails: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Recopilación de Datos</p>
                    <p className="text-gray-400 text-sm">
                      Ayúdanos a mejorar compartiendo datos anónimos de uso
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.dataCollection}
                      onChange={(e) =>
                        setConfig({ ...config, dataCollection: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white font-bold mb-4">Preferencias de Contenido</h3>
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-4 h-4" defaultChecked />
                      Contenido Familiar
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-4 h-4" defaultChecked />
                      Contenido Profesional
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-4 h-4" />
                      Contenido Artístico
                    </label>
                    <label className="flex items-center text-gray-300">
                      <input type="checkbox" className="mr-3 w-4 h-4" />
                      Contenido Educativo
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="border-t border-gray-700 p-6 bg-gray-900">
            <button
              onClick={handleSave}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Email Change Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-600 mx-4">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Cambiar Correo Electrónico</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Correo actual: {user?.google_user_data?.email}
              </p>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none mb-4"
                placeholder="nuevo@email.com"
              />
              <p className="text-gray-500 text-xs mb-6">
                Te enviaremos un código de verificación al nuevo correo
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 rounded text-gray-400 hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEmailChange}
                  className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700"
                >
                  Actualizar Email
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-600 mx-4">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Cambiar Contraseña</h3>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Contraseña Actual</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded text-gray-400 hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700"
                >
                  Actualizar Contraseña
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2FA Setup Modal */}
        {show2FAModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-600 mx-4">
              <div className="flex items-center mb-4">
                <Key className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Configurar 2FA</h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 mb-6 text-center">
                <div className="w-48 h-48 bg-white mx-auto mb-4 flex items-center justify-center rounded-lg">
                  <span className="text-gray-800 text-sm">Código QR</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  Escanea este código con tu aplicación de autenticación
                </p>
                <p className="text-purple-400 font-mono text-xs">
                  ABCD-EFGH-IJKL-MNOP
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">
                  Código de Verificación (6 dígitos)
                </label>
                <input
                  type="text"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white text-center text-2xl tracking-widest focus:border-purple-500 outline-none font-mono"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShow2FAModal(false)}
                  className="px-4 py-2 rounded text-gray-400 hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEnable2FA}
                  className="px-4 py-2 rounded bg-yellow-600 text-white font-bold hover:bg-yellow-700"
                >
                  Habilitar 2FA
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
