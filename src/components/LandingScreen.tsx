import { useState, useEffect } from "react";
import { authClient, emailSignUp, googleSignUp } from "../utils/auth-client";
import { useLocation, useNavigate } from "react-router-dom";

const LandingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUsername =
    (location.state as { username?: string })?.username || "";
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Si viene un username del Home, verificamos su disponibilidad
    if (initialUsername) {
      checkAvailability();
    }
  }, []);

  const handleUsernameChange = (value: string) => {
    setUsername(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
    setIsAvailable(false);
  };

  const checkAvailability = () => {
    // Simulación de verificación
    setIsAvailable(username.length >= 3);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (username && isAvailable) {
      try {
        await googleSignUp();
        setTimeout(() => {}, 1000);
        const { data, error } = await authClient.updateUser({
          username: username,
        });
        if (error) {
          setErrorMessage(error.message || "Usuario no valido");
        } else {
          navigate("/app");
        }
      } catch (error: unknown) {
        console.error("Error during Google sign-in:", error);
        setErrorMessage(
          error.message || "Error durante el inicio de sesión con Google",
        );
      }
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (username && isAvailable && email && password && name) {
      try {
        await emailSignUp(email, password, username, name);
        navigate("/app");
      } catch (error: unknown) {
        console.error("Error during email sign-up:", error);
        if (error?.code === "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER") {
          setErrorMessage(
            "Este nombre de usuario ya está en uso. Por favor, elige otro.",
          );
        } else {
          setErrorMessage(
            error.message || "Error durante el registro con correo",
          );
        }
      }
    } else if (!name) {
      setErrorMessage("Por favor ingresa tu nombre completo");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
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
              <h1
                className="relative text-[6rem] leading-none font-normal font-['Modernia'] bg-gradient-to-r from-blue-600 to-purple-600 
                bg-clip-text text-transparent transition-all duration-500
                hover:from-blue-500 hover:to-purple-500"
              >
                K
              </h1>
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
                    onBlur={checkAvailability}
                    className="block w-full pl-[7.5rem] pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="mi-nombre"
                    required
                    minLength={3}
                  />
                  {isAvailable !== null && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      {isAvailable ? (
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
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500 pl-3">
                  Esta será tu URL personal. Usa solo letras minúsculas, números
                  y guiones.
                </p>
                {!isAvailable && username.length > 0 && (
                  <p className="mt-1 text-xs text-red-500 pl-3">
                    El nombre debe tener al menos 3 caracteres y estar
                    disponible.
                  </p>
                )}
              </div>

              {!showEmailForm ? (
                <>
                  {/* Botón de Google */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white text-gray-700 py-3 px-4 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm
                      flex items-center justify-center gap-3 relative group"
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
                    <span className="relative">Continuar con Google</span>
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
                    className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300"
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
                    disabled={!isAvailable || !email || !password || !name}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] rounded-xl"
                    />
                    <span className="relative">Crear mi Kasbu</span>
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
        {errorMessage && (
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
              {errorMessage}
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
