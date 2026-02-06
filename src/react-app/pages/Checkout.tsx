import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import AppLayout from "@/react-app/components/AppLayout";
import { CreditCard, Lock, CheckCircle, ArrowLeft, Coins, Crown } from "lucide-react";
import { useProfile } from "@/react-app/hooks/useProfile";

interface CheckoutItem {
  type: "coins" | "plan";
  amount?: number;
  planName?: string;
  price: number;
  description: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCoins } = useProfile();
  const item: CheckoutItem = location.state?.item;

  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    billingEmail: "",
  });

  if (!item) {
    return (
      <AppLayout>
        <div className="text-center mt-20">
          <p className="text-gray-400">No hay artículos para procesar</p>
          <button
            onClick={() => navigate("/plans")}
            className="mt-4 text-purple-400 hover:text-purple-300"
          >
            Volver a Planes
          </button>
        </div>
      </AppLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (item.type === "coins" && item.amount) {
      await updateCoins(item.amount, `Compra de ${item.amount} monedas`);
    }

    setSuccess(true);
    setIsProcessing(false);

    // Redirect after success
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (success) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="bg-gray-800 rounded-xl p-12 border border-green-600">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">¡Pago Exitoso!</h2>
            <p className="text-gray-300 mb-8">
              {item.type === "coins"
                ? `Has recibido ${item.amount} monedas en tu cuenta`
                : `Tu plan ${item.planName} está ahora activo`}
            </p>
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Total Pagado</span>
                <span className="text-white font-bold text-xl">${(item.price * 1.16).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Método de Pago</span>
                <span className="text-white">•••• {paymentData.cardNumber.slice(-4)}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Recibirás un recibo por correo electrónico en breve
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Continuar
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">Información de Pago</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Facturación
                  </label>
                  <input
                    type="email"
                    value={paymentData.billingEmail}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, billingEmail: e.target.value })
                    }
                    required
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setPaymentData({ ...paymentData, cardNumber: value });
                    }}
                    required
                    maxLength={16}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none font-mono"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre en la Tarjeta
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardName}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, cardName: e.target.value })
                    }
                    required
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                    placeholder="JUAN PÉREZ"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Fecha de Vencimiento
                    </label>
                    <input
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        setPaymentData({ ...paymentData, expiryDate: value });
                      }}
                      required
                      maxLength={5}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none font-mono"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                    <input
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setPaymentData({ ...paymentData, cvv: value });
                      }}
                      required
                      maxLength={4}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none font-mono"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-start">
                  <Lock className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-gray-300 font-medium mb-1">Pago 100% Seguro</p>
                    <p className="text-gray-500 text-xs">
                      Utilizamos encriptación SSL de 256 bits. Tu información está protegida.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-lg transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                      Procesando pago...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Pagar ${(item.price * 1.16).toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-4">
              <h3 className="text-lg font-bold text-white mb-6">Resumen del Pedido</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  {item.type === "coins" ? (
                    <Coins className="w-8 h-8 text-yellow-400 mr-3" />
                  ) : (
                    <Crown className="w-8 h-8 text-purple-400 mr-3" />
                  )}
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.description}</p>
                    {item.type === "coins" && (
                      <p className="text-gray-400 text-sm">{item.amount} Monedas</p>
                    )}
                    {item.type === "plan" && (
                      <p className="text-gray-400 text-sm">Plan {item.planName}</p>
                    )}
                  </div>
                  <div className="text-white font-bold">${item.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-gray-400 mb-2">
                  <span>Subtotal</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 mb-2">
                  <span>Impuestos (16%)</span>
                  <span>${(item.price * 0.16).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-gray-700">
                  <span>Total</span>
                  <span>${(item.price * 1.16).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <p className="text-gray-400 text-xs leading-relaxed">
                  Al completar esta compra, aceptas nuestros{" "}
                  <button className="text-purple-400 hover:underline">
                    Términos de Servicio
                  </button>{" "}
                  y{" "}
                  <button className="text-purple-400 hover:underline">
                    Política de Reembolso
                  </button>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
