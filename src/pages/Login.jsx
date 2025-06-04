import React from 'react';
import { Link, useNavigate} from "react-router-dom";
import imagen1 from "../images/in-up/sign-in.jpg";
import imagen2 from "../images/logo/logo.png"
import { useTranslation } from 'react-i18next';


export default function Login() {

   // Estado para manejar errores
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async (event) => {
    event.preventDefault(); // <-- evita que se recargue
    navigate('/community');
  };

  return (
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

          <form className="mt-10 w-full max-w-sm space-y-10">
            <div>
              <label className="mt-5 block text-sm font-medium">{t("user")}</label>
              <input
                type="text"
                className="w-full p-2 border border-black/50 rounded-md mt-1"
              />
            </div>

            <div className="mt-20">
              <label className="block text-sm font-medium">{t("password")}</label>
              <input
                type="password"
                className="w-full p-2 border border-black/50 rounded-md mt-1"
              />
            </div>
            <Link to="/forgotP1">
              <p className="grid justify-items-end mt-4 text-sm underline underline-offset-2">
                {t("forgotPass")}</p>
            </Link>

            <button
              type="submit"
              className="w-[110px]  mt-80 mx-[140px] bg-white border border-[#003049] text-[#003049] font-bold py-2 rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#003049] hover:text-white"
              onClick={handleLogin}>
              {t("Sign In")}
            </button>
          </form>

          <p className="mt-[30px] text-sm">
            {t("noAccount")} <Link to="/register" className="text-blue-600 underline underline-offset-2">{t("Sign Up")}</Link>
          </p>
      </div>
    </div>
  );
}
