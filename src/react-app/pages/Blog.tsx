import AppLayout from "@/react-app/components/AppLayout";
import { Calendar, User, ArrowRight, TrendingUp, Sparkles, Video, Clock } from "lucide-react";
import { useScrollAnimation } from "@/react-app/hooks/useScrollAnimation";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export default function BlogPage() {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "El Futuro de la Creación de Videos con IA",
      excerpt: "Descubre cómo la inteligencia artificial está revolucionando la industria del video y cómo Motcha IA lidera esta transformación...",
      author: "María García",
      date: "2 de Diciembre, 2025",
      readTime: "5 min",
      category: "Tecnología",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "10 Consejos para Videos Memorables",
      excerpt: "Aprende las mejores prácticas para crear videos que cautiven a tu audiencia y dejen una impresión duradera...",
      author: "Carlos Ruiz",
      date: "28 de Noviembre, 2025",
      readTime: "8 min",
      category: "Tutoriales",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    },
    {
      id: 3,
      title: "Historias de Éxito: Usuarios de Motcha IA",
      excerpt: "Conoce cómo nuestros usuarios están utilizando Motcha IA para transformar sus ideas en realidad...",
      author: "Ana Martínez",
      date: "25 de Noviembre, 2025",
      readTime: "6 min",
      category: "Casos de Éxito",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80",
    },
    {
      id: 4,
      title: "Nuevas Funciones: Lo que Viene en 2026",
      excerpt: "Echa un vistazo exclusivo a las características emocionantes que estamos desarrollando para el próximo año...",
      author: "Luis Fernández",
      date: "20 de Noviembre, 2025",
      readTime: "4 min",
      category: "Novedades",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    },
    {
      id: 5,
      title: "Optimización de Rendimiento: Tips Profesionales",
      excerpt: "Maximiza la eficiencia de tu flujo de trabajo con estos consejos de optimización avanzados...",
      author: "Patricia López",
      date: "15 de Noviembre, 2025",
      readTime: "7 min",
      category: "Tutoriales",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
      id: 6,
      title: "IA Generativa: El Arte de lo Posible",
      excerpt: "Explora las capacidades ilimitadas de la inteligencia artificial generativa en la creación de contenido...",
      author: "Roberto Sánchez",
      date: "10 de Noviembre, 2025",
      readTime: "10 min",
      category: "Tecnología",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
  ];

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
            <h1 className="text-4xl font-bold text-white">Blog de Motcha IA</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Descubre las últimas tendencias, tutoriales y noticias sobre creación de video con IA
          </p>
        </div>

        {featuredPost && (
          <div className="mb-12 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl hover:border-purple-500 transition group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  DESTACADO
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                  <span className="px-2 py-1 bg-gray-900 rounded text-purple-400">{featuredPost.category}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{featuredPost.date}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{featuredPost.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <User className="w-5 h-5 mr-2" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <button className="flex items-center text-purple-400 hover:text-purple-300 font-semibold">
                    Leer más <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Artículos Recientes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
              

        <div className="mt-12 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 text-center border border-purple-600">
          <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">¿Quieres contribuir al blog?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Comparte tu experiencia con Motcha IA y ayuda a otros usuarios a aprovechar al máximo la plataforma
          </p>
          <button className="bg-white hover:bg-gray-100 text-purple-900 font-bold py-3 px-8 rounded-lg transition">
            Enviar Artículo
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function BlogPostCard({ post, index }: { post: BlogPost, index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-700 group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-90 text-purple-400 px-2 py-1 rounded text-xs font-bold">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{post.date}</span>
          <span>•</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{post.readTime}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author}</span>
          </div>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
            Leer →
          </button>
        </div>
      </div>
    </div>
  );
}
