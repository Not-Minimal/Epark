export default function Settings() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 grid gap-6">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-4 p-6">
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
              className="h-6 w-6 text-gray-500 dark:text-gray-400"
            >
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Método de pago
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Administra tus métodos de pago.
            </p>
          </div>
          <div className="flex items-center p-6">
            <a className="text-blue-500 hover:underline" href="#" rel="ugc">
              Ir a Método de pago
            </a>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-4 p-6">
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
              className="h-6 w-6 text-gray-500 dark:text-gray-400"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Notificaciones
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Configura tus preferencias de notificación.
            </p>
          </div>
          <div className="flex items-center p-6">
            <a className="text-blue-500 hover:underline" href="#" rel="ugc">
              Ir a Notificaciones
            </a>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-4 p-6">
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
              className="h-6 w-6 text-gray-500 dark:text-gray-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Historial de transacciones
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Revisa tu historial de transacciones.
            </p>
          </div>
          <div className="flex items-center p-6">
            <a className="text-blue-500 hover:underline" href="#" rel="ugc">
              Ir a Historial de transacciones
            </a>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-4 p-6">
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
              className="h-6 w-6 text-gray-500 dark:text-gray-400"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Configuración de la cuenta
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Actualiza tu información de cuenta.
            </p>
          </div>
          <div className="flex items-center p-6">
            <a className="text-blue-500 hover:underline" href="#" rel="ugc">
              Ir a Configuración de la cuenta
            </a>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-4 p-6">
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
              className="h-6 w-6 text-gray-500 dark:text-gray-400"
            >
              <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"></path>
              <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"></path>
              <path d="m2 13 6 6"></path>
            </svg>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Ayuda y soporte
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Obtén ayuda y soporte para tu cuenta.
            </p>
          </div>
          <div className="flex items-center p-6">
            <a className="text-blue-500 hover:underline" href="#" rel="ugc">
              Ir a Ayuda y soporte
            </a>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-10 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white">
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
