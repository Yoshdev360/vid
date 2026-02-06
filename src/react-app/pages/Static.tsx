import AppLayout from "@/react-app/components/AppLayout";

interface StaticPageProps {
  title: string;
}

export default function StaticPage({ title }: StaticPageProps) {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto bg-gray-800 p-10 rounded-xl border border-gray-700 animate-fade-in">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">{title}</h1>
        <p className="text-gray-300 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </AppLayout>
  );
}
