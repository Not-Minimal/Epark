import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="flex items-center justify-center gap-2 p-8 lg:px-6 ">
        <a className="flex items-center gap-2" rel="ugc">
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
          <Link to="/" className="text-xl font-bold ">
            E-Park
          </Link>
        </a>
      </header>
      <main className="flex-1">
        <section id="Hero2" className="bg-white dark:bg-black">
          <div className="flex flex-col justify-between px-8 mx-auto max-w-screen-xl text-center lg:py-16 lg:flex-row">
            <div className="mb-4 lg:mb-0 lg:pt-32 lg:max-w-lg lg:pr-5">
              <div>
                <h1 className="lg:text-7xl mx-auto my-6 max-w-2xl font-display text-5xl font-medium tracking-tight text-slate-900 dark:text-white sm:text-7xl">
                  Gestiona tu Estacionamiento con
                  <span className="relative whitespace-nowrap text-green-400">
                    <span className="relative"> E-Park.</span>
                  </span>
                </h1>
                <p className="mx-auto mt-8 mb-12 max-w-2xl text-xl tracking-tight text-slate-900 dark:text-slate-100">
                  Descubra el futuro del aparcamiento con e-park, nuestra nueva
                  aplicacion de estacionamiento en linea y seguro.
                </p>
              </div>
              <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <Link
                  to="/login"
                  className="inline-flex justify-center items-center py-3 px-4 text-base font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 shadow-lg shadow-green-400/100"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Crear Cuenta
                </Link>
              </div>
            </div>
            <div>
              <img
                src="/src/assets/Dashboard.png"
                className="object-cover object-top w-full h-64 mx-auto lg:h-auto xl:mr-24 md:max-w-sm"
                alt=""
              ></img>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full items-center justify-center p-8 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 e-park. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
