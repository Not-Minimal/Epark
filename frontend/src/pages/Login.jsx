// import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import Form from "@/components/Form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginSubmit = (data) => {
    login(data)
      .then(() => {
        // Mostar un toast de éxito
        toast({
          title: "Inicio de sesión exitoso",
          description: "Has iniciado sesión exitosamente",
        });
        navigate("/home");
      })
      .catch((error) => {
        // Mostrar un toast de error
        toast({
          variant: "destructive",
          title: "Error",
          description: "Hubo un problema al iniciar sesión",
          status: "error",
          action: (
            <ToastAction
              altText="Crear Cuenta"
              onClick={() => navigate("/register")}
            >
              Crear Cuenta
            </ToastAction>
          ),
        });
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-center  gap-2 p-8 lg:px-6">
        <div className="flex items-center gap-2">
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
          <Link to="/" className="text-xl font-bold">
            E-Park
          </Link>
        </div>
      </header>

      <main className="flex-grow ">
        <div className="flex min-h-full items-center justify-center p-8">
          <div className="max-w-md w-full space-y-6 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Iniciar Sesión</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Inicia sesión para comenzar a usar la aplicación E-Park.
              </p>
            </div>
            <Form
              title="Iniciar sesión"
              fields={[
                {
                  label: "Correo electrónico",
                  name: "email",
                  placeholder: "example@gmail.com",
                  type: "email",
                  required: true,
                },
                {
                  label: "Contraseña",
                  name: "password",
                  placeholder: "**********",
                  type: "password",
                  required: true,
                },
              ]}
              buttonText="Iniciar sesión"
              onSubmit={loginSubmit}
              footerContent={
                <div className="flex items-center justify-between">
                  <span>¿Tienes una cuenta?</span>
                  <Link to="/register" className="underline">
                    Crear Cuenta
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center p-8 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 E-Park. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
