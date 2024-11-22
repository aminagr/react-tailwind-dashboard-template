import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import '../css/login.css';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          remember_me: rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);  
  };

  return (
    <div className="w-3/4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Bienvenue !
      </h1>
      <form className="login-form space-y-4" onSubmit={handleLogin}>
        <div className="relative">
          <FaEnvelope className="absolute left-2 top-3 text-white" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Mot de passe"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}  
            className="absolute right-2 top-3 text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-500 rounded focus:ring-indigo-500 focus:ring-2"
          />
          <label htmlFor="rememberMe" className="ml-2 text-white text-sm">
            Se rappeler de moi
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full py-2 bg-white text-indigo-600 text-lg font-bold uppercase rounded-full hover:bg-gray-200">
          Connexion
        </button>
      </form>
      <a
        href="#"
        className="block text-center text-sm text-white mt-4 hover:underline"
        onClick={handleForgotPassword}
      >
        Mot de passe oublié ?
      </a>
    </div>
  );
};

export default LoginForm;
