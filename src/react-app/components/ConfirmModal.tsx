import { Coins } from "lucide-react";

interface ConfirmModalProps {
  cost: number;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ cost, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-6 border border-gray-600 transform transition-all scale-100">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center">
          <Coins className="text-yellow-500 w-6 h-6 mr-2" />
          Costo Extra
        </h3>
        <p className="text-gray-400 mb-2">{message}</p>
        <p className="text-yellow-500 font-bold mb-6 text-lg">Costo: {cost} Monedas</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded text-gray-400 hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-purple-600 text-white font-bold hover:bg-purple-700"
          >
            Pagar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
