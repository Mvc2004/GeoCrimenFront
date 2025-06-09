import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import imagen1 from "../images/in-up/sign-in.jpg";
import imagen2 from "../images/logo/logo.png"
import { useTranslation } from 'react-i18next';
import { AccessibilityProvider } from './AccessibilityContext';
import AccesibilidadButton from './AccesibilidadButton';


export default function Login() {
  const [email, setEmail] = useState("");            
  const [contrasenia, setContrasenia] = useState(""); 
  const [captchaToken, setCaptchaToken] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async (event) => {
    event.preventDefault(); 
    if (!captchaToken) {
      setErrorCaptcha(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/login", { // cambia la URL según tu backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasenia, token: captchaToken }),
      });
      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }
      const data = await response.json();
      localStorage.setItem("id_usuario", data.id_usuario);
      console.log("Inicio de sesión exitoso:", data);
      navigate('/community', { replace: true });
    } catch (error) {
      alert("Inicio de sesión fallido: " + error.message);
    }
  };

  return (
    <AccessibilityProvider>
      <AccesibilidadButton/>

      <div className="flex min-h-screen rounded-xl">
        {/* Imagen a la izquierda */}
        <div className="hidden md:flex md:w-2/5 items-center justify-center p-0">
          <img
            src={imagen1} 
            alt="Escena del crimen"
            className="w-full h-full object-cover shadow-lg"
          />
        </div>
        
        {/* Formulario a la derecha */}
        <div className="flex flex-col items-center justify-center w-full md:w-3/5 p-8 bg-white shadow-lg">
            <div className="flex flex-col items-center mt-10">
              <img src={imagen2} alt="Logo" className="w-20" />            
              <h2 className="text-4xl font-bold mt-2">{t("SignInText")}</h2>
            </div>

          <form className="mt-10 w-full max-w-sm space-y-10" onSubmit={handleLogin}>
          <div>
            <label className="mt-5 block text-sm font-medium">{t("user")}</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-black/50 rounded-md mt-1"
              required
            />
          </div>

          <div className="mt-20">
            <label className="block text-sm font-medium">{t("password")}</label>
            <input
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              className="w-full p-2 border border-black/50 rounded-md mt-1"
              required
            />
          </div>
          <div className="mt-5">
            <ReCAPTCHA
              sitekey="6Ld2xVorAAAAAMuzUboIkMOLPSFaXjY6MHvCQjSZ" // 👈 Tu clave de sitio
              onChange={(token) => {
                setCaptchaToken(token);
                setErrorCaptcha(false);
              }}
            />
            {errorCaptcha && (
              <p className="text-sm text-red-500 mt-2">
                Por favor verifica que no eres un robot.
              </p>
            )}
          </div>

          <Link to="/forgotP1">
            <p className="grid justify-items-end mt-4 text-sm underline underline-offset-2">
              {t("forgotPass")}
            </p>
          </Link>

          <button
            type="submit"
            className="w-[110px] mt-80 mx-[140px] bg-white border border-[#003049] text-[#003049] font-bold py-2 rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#003049] hover:text-white"
          >
            {t("Sign In")}
          </button>
        </form>

        <p className="mt-[30px] text-sm">
          {t("noAccount")}{" "}
          <Link to="/register" className="text-blue-600 underline underline-offset-2">
            {t("Sign Up")}
          </Link>
        </p>
      </div>
      </div>
    </AccessibilityProvider>
  );
}
