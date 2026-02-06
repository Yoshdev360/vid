import { useState, useEffect } from "react";
import { useAuth } from "@getmocha/users-service/react";
import AppLayout from "@/react-app/components/AppLayout";
import { 
  MessageSquare, Send, Clock, CheckCircle2, AlertCircle, 
  HelpCircle, Loader2, ChevronDown, ChevronUp 
} from "lucide-react";

interface Ticket {
  id: number;
  subject: string;
  category: string;
  message: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

interface Response {
  id: number;
  ticket_id: number;
  is_staff: boolean;
  message: string;
  created_at: string;
}

export default function SupportPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [responses, setResponses] = useState<Record<number, Response[]>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
  
  // Form state
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("queja");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await fetch("/api/support/tickets");
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadResponses = async (ticketId: number) => {
    if (responses[ticketId]) return; // Already loaded
    
    try {
      const res = await fetch(`/api/support/tickets/${ticketId}/responses`);
      if (res.ok) {
        const data = await res.json();
        setResponses(prev => ({ ...prev, [ticketId]: data }));
      }
    } catch (error) {
      console.error("Error loading responses:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, category, message }),
      });

      if (res.ok) {
        setSubject("");
        setMessage("");
        setCategory("queja");
        await loadTickets();
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTicket = async (ticketId: number) => {
    if (expandedTicket === ticketId) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketId);
      await loadResponses(ticketId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "in_progress": return "text-blue-400 bg-blue-500/10 border-blue-500/30";
      case "resolved": return "text-green-400 bg-green-500/10 border-green-500/30";
      case "closed": return "text-gray-400 bg-gray-500/10 border-gray-500/30";
      default: return "text-gray-400 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertCircle className="w-4 h-4" />;
      case "in_progress": return <Clock className="w-4 h-4" />;
      case "resolved": return <CheckCircle2 className="w-4 h-4" />;
      case "closed": return <CheckCircle2 className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Abierto";
      case "in_progress": return "En Progreso";
      case "resolved": return "Resuelto";
      case "closed": return "Cerrado";
      default: return status;
    }
  };

  const getTimeElapsed = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours} h`;
    return `${diffDays} d`;
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">Soporte Técnico</h1>
            </div>
            <p className="text-gray-400">
              Envía tus quejas, sugerencias o consultas. Nuestro equipo te responderá pronto.
            </p>
          </div>

          {/* New Ticket Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-purple-400" />
              Nuevo Ticket
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="queja">Queja</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="pregunta">Pregunta</option>
                  <option value="bug">Reporte de Error</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Describe brevemente tu problema o sugerencia"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Proporciona todos los detalles posibles..."
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Ticket
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Existing Tickets */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Mis Tickets</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No tienes tickets aún</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-gray-700/50 rounded-lg border border-gray-600 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleTicket(ticket.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-700/70 transition"
                    >
                      <div className="flex items-start gap-3 flex-1 text-left">
                        <div className={`mt-1 px-2 py-1 rounded-md border flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          <span className="text-xs font-medium">{getStatusText(ticket.status)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{ticket.subject}</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                            <span className="capitalize">{ticket.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Hace {getTimeElapsed(ticket.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedTicket === ticket.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {expandedTicket === ticket.id && (
                      <div className="p-4 border-t border-gray-600 bg-gray-800/30">
                        <div className="mb-4">
                          <p className="text-sm text-gray-300 mb-2 font-medium">Tu mensaje:</p>
                          <p className="text-sm text-gray-400 bg-gray-900/50 p-3 rounded">{ticket.message}</p>
                        </div>

                        {responses[ticket.id] && responses[ticket.id].length > 0 && (
                          <div className="space-y-3">
                            <p className="text-sm text-gray-300 font-medium">Respuestas:</p>
                            {responses[ticket.id].map((response) => (
                              <div
                                key={response.id}
                                className={`p-3 rounded ${
                                  response.is_staff
                                    ? "bg-purple-900/30 border border-purple-700/30"
                                    : "bg-gray-900/50"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-purple-400">
                                    {response.is_staff ? "Equipo de Soporte" : "Tú"}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    • {new Date(response.created_at).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">{response.message}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {ticket.status === "resolved" && (
                          <div className="mt-3 p-3 bg-green-900/20 border border-green-700/30 rounded flex items-center gap-2 text-sm text-green-400">
                            <CheckCircle2 className="w-4 h-4" />
                            Este ticket ha sido marcado como resuelto
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm text-blue-300 font-medium mb-1">Tiempo de Respuesta</p>
                <p className="text-sm text-blue-200/70">
                  Nuestro equipo responde tickets en un promedio de 24-48 horas. 
                  Los tickets urgentes o críticos se priorizan y pueden recibir respuesta más rápida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
