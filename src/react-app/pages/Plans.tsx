import AppLayout from "@/react-app/components/AppLayout";
import { useProfile } from "@/react-app/hooks/useProfile";
import { useNavigate } from "react-router";
import { Check, Plus } from "lucide-react";
import { useScrollAnimation } from "@/react-app/hooks/useScrollAnimation";

export default function PlansPage() {
  const { updateCoins } = useProfile();
  const navigate = useNavigate();

  const plans = [
    {
      name: "Básico",
      price: "$0",
      priceValue: 0,
      coins: "50",
      features: ["Calidad SD", "Marca de Agua", "Soporte Standard"],
      recommended: false,
    },
    {
      name: "Pro",
      price: "$19",
      priceValue: 19,
      coins: "500",
      features: [
        "Calidad HD",
        "Sin Marca de Agua",
        "Regeneraciones Baratas",
        "Soporte Prioritario",
      ],
      recommended: true,
    },
    {
      name: "Ilimitado",
      price: "$99",
      priceValue: 99,
      coins: "∞",
      features: ["Calidad 4K", "Todo Ilimitado", "API Access", "Manager Dedicado"],
      recommended: false,
    },
  ];

  const handleBuyCoins = (amount: number, price: number) => {
    navigate("/checkout", {
      state: {
        item: {
          type: "coins",
          amount,
          price,
          description: `Paquete de ${amount} Monedas`,
        },
      },
    });
  };

  const handleSelectPlan = (planName: string, price: number) => {
    navigate("/checkout", {
      state: {
        item: {
          type: "plan",
          planName,
          price,
          description: `Suscripción Mensual`,
        },
      },
    });
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Elige tu Plan</h2>
          <p className="text-gray-400">
            Potencia tu creatividad con más monedas y funciones exclusivas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} handleSelectPlan={handleSelectPlan} />
          ))}
        </div>
              
        <div className="mt-12 text-center bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-2">¿Solo necesitas monedas?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Recarga tu saldo sin suscripción mensual.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleBuyCoins(100, 5)}
              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-900 px-6 py-2 rounded font-bold transition flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              100 Monedas ($5)
            </button>
            <button
              onClick={() => handleBuyCoins(500, 20)}
              className="bg-yellow-500 text-black hover:bg-yellow-600 px-6 py-2 rounded font-bold transition flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              500 Monedas ($20)
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function PlanCard({ plan, index, handleSelectPlan }: any) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`bg-gray-800 rounded-xl p-8 border flex flex-col relative transition-all duration-700 ${
        plan.recommended
          ? "border-purple-500 transform scale-105 shadow-2xl z-10"
          : "border-gray-700"
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {plan.recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          Recomendado
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
      <div className="text-4xl font-bold text-white mb-4">
        {plan.price}
        <span className="text-sm text-gray-400 font-normal">/mes</span>
      </div>
      <div className="bg-gray-900 rounded p-4 mb-6 text-center">
        <span className="text-yellow-400 font-bold text-xl">🪙 {plan.coins}</span> monedas
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="text-gray-300 text-sm flex items-center">
            <Check className="text-green-500 w-4 h-4 mr-2" /> {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() => handleSelectPlan(plan.name, plan.priceValue)}
        disabled={plan.priceValue === 0}
        className={`w-full font-bold py-3 rounded transition ${
          plan.recommended
            ? "bg-purple-600 hover:bg-purple-700"
            : plan.priceValue === 0
            ? "bg-gray-700 cursor-not-allowed opacity-50"
            : "bg-gray-700 hover:bg-gray-600"
        } text-white`}
      >
        {plan.priceValue === 0 ? "Plan Actual" : "Seleccionar"}
      </button>
    </div>
  );
}
