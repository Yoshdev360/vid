import AppLayout from "@/react-app/components/AppLayout";
import { Music, Construction } from "lucide-react";

export default function SongsPage() {
  return (
    <AppLayout>
      <div className="text-center mt-20 text-gray-500 animate-fade-in">
        <Construction className="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <Music className="w-12 h-12 mx-auto mb-4 text-purple-500" />
        <h2 className="text-2xl font-bold text-white mb-2">Canciones</h2>
        <p>Sección en construcción</p>
      </div>
    </AppLayout>
  );
}
