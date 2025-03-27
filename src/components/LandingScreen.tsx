import { useState, useEffect, useRef } from "react";
import { authClient, emailSignUp, googleSignUp } from "../utils/auth-client";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import LoadingModal from "./LoadingModal";

interface AuthError {
  message?: string;
  code?: string;
}

interface LandingScreenProps {
  onLogin: () => void;
}

const LandingScreen = ({ onLogin }: LandingScreenProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUsername =
    (location.state as { username?: string })?.username || "";
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const checkTimeout = useRef<number | null>(null);
  const [error, setError] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          navigate("/beta");
          return;
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }

      setMounted(true);
      if (initialUsername) {
        checkAvailability(initialUsername);
      }
    };

    checkSession();
  }, [navigate, initialUsername]);

  const handleUsernameChange = (value: string) => {
    const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setUsername(sanitizedValue);

    // Si el valor es menor a 3 caracteres, marcamos como no disponible
    if (sanitizedValue.length < 3) {
      setIsAvailable(false);
      return;
    }

    // Debounce para no hacer demasiadas llamadas al servidor
    if (checkTimeout.current) {
      clearTimeout(checkTimeout.current);
    }

    checkTimeout.current = setTimeout(() => {
      checkAvailability(sanitizedValue);
    }, 300);
  };

  const checkAvailability = async (value: string) => {
    if (!value || value.length < 3) {
      setIsAvailable(false);
      return;
    }

    setIsCheckingUsername(true);
    try {
      const response = await fetch(
        `https://back.kasbu.com/check-username/${value}`,
      );
      const data = await response.json();
      setIsAvailable(!data.exists);
    } catch (error) {
      console.error("Error checking username:", error);
      setIsAvailable(false);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (!username || username.length < 3) {
        setError("El nombre de usuario debe tener al menos 3 caracteres");
        return;
      }
      setShowLoadingModal(true);
      const result = await googleSignUp(username);
      if (!result) {
        setError("Error durante el inicio de sesión con Google");
        setShowLoadingModal(false);
        return;
      }
      setTimeout(() => 1000);
      await authClient.updateUser({
        username: username,
      });
      setError("Una disculpa, hubo un error ");
      // Navegamos a la página beta con el username en el estado
      navigate("/beta", { state: { username: username } });
    } catch (error) {
      console.error("Error during Google sign up:", error);
      setError("Hubo un problema al iniciar sesión con Google");
      setShowLoadingModal(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (username && isAvailable && email && password && name) {
      setIsLoading(true);
      try {
        await emailSignUp(email, password, username, name);
        navigate("/beta");
      } catch (error) {
        const authError = error as AuthError;
        console.error("Error during email sign-up:", error);
        if (authError.code === "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER") {
          setError(
            "Este nombre de usuario ya está en uso. Por favor, elige otro.",
          );
        } else {
          setError(authError.message || "Error durante el registro con correo");
        }
      } finally {
        setIsLoading(false);
      }
    } else if (!name) {
      setError("Por favor ingresa tu nombre completo");
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full bg-white overflow-hidden transition-opacity duration-500
      ${showLoadingModal ? "opacity-0" : "opacity-100"}`}
    >
      <LoadingModal
        isOpen={showLoadingModal}
        message="Iniciando sesión con Google..."
      />
      {/* Fondo decorativo */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)]" />
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/5 to-purple-600/5
              animate-float-slow transform -translate-x-1/2 -translate-y-1/2
              ${
                i === 0
                  ? "top-1/4 left-1/4 delay-0"
                  : i === 1
                    ? "top-3/4 left-3/4 delay-1000"
                    : "top-1/2 left-2/3 delay-2000"
              }`}
            style={{
              animationDuration: `${20 + i * 5}s`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo y título */}
          <div className="text-center mb-8">
            {/* Logo con efecto de brillo */}
            <div className="relative mb-6 group">
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl 
                group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500"
              />
              <img
                src="/images/Kasbu.png"
                alt="Kasbu Logo"
                className="relative w-24 h-24 object-contain mx-auto transition-all duration-500
                hover:scale-105"
              />
            </div>
            <p className="text-gray-600">Crea tu espacio digital único</p>
          </div>

          {/* Formulario */}
          <form className="bg-white rounded-2xl p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_32px_-8px_rgba(0,0,0,0.1)]">
            <div className="space-y-6">
              {/* Campo de usuario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Elige tu nombre de usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-gray-600 font-medium">
                      kasbu.com/
                    </span>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    onBlur={() => checkAvailability(username)}
                    className="block w-full pl-[calc(7.5rem-0.5rem)] pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="mi-nombre"
                    required
                    minLength={3}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {isCheckingUsername ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      isAvailable !== null &&
                      (isAvailable ? (
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ))
                    )}
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 pl-3">
                  Esta será tu URL personal. Usa solo letras minúsculas, números
                  y guiones.
                </p>
                {username.length > 0 && (
                  <p
                    className={`mt-1 text-xs pl-3 ${isAvailable ? "text-green-500" : "text-red-500"}`}
                  >
                    {username.length < 3
                      ? "El nombre debe tener al menos 3 caracteres"
                      : /[^a-z0-9-]/.test(username)
                        ? "Solo puedes usar letras minúsculas, números y guiones"
                        : isAvailable === false
                          ? "Este nombre de usuario no está disponible"
                          : isAvailable === true
                            ? "¡Este nombre de usuario está disponible!"
                            : null}
                  </p>
                )}
              </div>

              {!showEmailForm ? (
                <>
                  {/* Botón de Google */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={
                      !username ||
                      username.length < 3 ||
                      isAvailable === false ||
                      isCheckingUsername
                    }
                    className="w-full bg-white text-gray-700 py-3 px-4 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm
                      flex items-center justify-center gap-3 relative group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="relative">
                      {isCheckingUsername
                        ? "Verificando usuario..."
                        : "Continuar con Google"}
                    </span>
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">O</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowEmailForm(true)}
                    disabled={
                      !username ||
                      username.length < 3 ||
                      isAvailable === false ||
                      isCheckingUsername
                    }
                    className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                  >
                    Continuar con correo
                  </button>
                </>
              ) : (
                <>
                  {/* Campo de nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  {/* Campo de correo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  {/* Campo de contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>

                  {/* Botón de registro */}
                  <button
                    type="button"
                    onClick={handleEmailSignUp}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium 
                      hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 
                      disabled:opacity-50 disabled:cursor-not-allowed group relative"
                    disabled={
                      !username ||
                      username.length < 3 ||
                      isAvailable === false ||
                      !email ||
                      !password ||
                      !name ||
                      isLoading ||
                      isCheckingUsername
                    }
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] rounded-xl"
                    />
                    <div className="flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="relative">Creando cuenta...</span>
                        </>
                      ) : (
                        <span className="relative">Crear mi Kasbu</span>
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="w-full text-gray-600 py-2 rounded-xl font-medium hover:text-gray-800 transition-all duration-300"
                  >
                    Volver
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm max-w-md">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Al registrarte, aceptas nuestros{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Términos y condiciones
          </a>{" "}
          y{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Política de privacidad
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
