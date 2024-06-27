import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-center gap-2 p-8 lg:px-6 ">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M9 9a3 3 0 1 1 6 0"></path>
            <path d="M12 12v3"></path>
            <path d="M11 15h2"></path>
            <path d="M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3"></path>
            <path d="M12 19v3"></path>
          </svg>
          E-Park
        </Link>
      </header>
      <main className="flex-grow">
        <div className="flex flex-col min-h-full items-center justify-center p-8">
          <h1 className="text-4xl font-bold">Error 404</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            La página que estás buscando no existe.
          </p>
          <Link
            to="/"
            className="mt-6 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Ir a Página Principal
          </Link>
        </div>
      </main>
      <footer className="flex w-full items-center justify-center p-8 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 E-Park. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
