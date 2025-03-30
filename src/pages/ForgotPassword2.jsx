import React from 'react';
import { Link } from "react-router-dom";

import imagen1 from "../images/logo.png"


function ForgotPassword2(){

    return(

    <div className="flex flex-col grid justify-items-center content-start md:w-100 p-8 bg-white">
        <div className="flex flex-col items-center">
          <span className="mt-10 text-red-500 text-4xl"><img src={imagen1} alt="Logo" className="w-20" /></span>
          <h2 className="text-2xl font-Roboto-bold mt-2">¿Olvidaste tu contraseña?</h2>
        </div>

        <form className="mt-20 w-full max-w-sm">
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="text"
              className="w-full p-2 border border-black/50 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <Link to="/">
            <div className= "flex flex-col items-center justify-center">
            
              <button
                type="button"
                className="w-60 mt-20 bg-[#FFFFFF] text-[#1A1A1A] py-2 rounded border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF]"
              >
                cambiar
              </button>
            </div>
          </Link>
        </form>

      </div>
      )

}export default ForgotPassword2;