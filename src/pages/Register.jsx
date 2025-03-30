import { Link } from "react-router-dom";
import imagen1 from "../images/logo.png"
import imagen2 from "../images/imagensign-up.jpeg"


function Register() {
  return (
    <div className="flex min-h-screen">
      {/* Imagen a la izquierda */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center p-0">
        <img
          src={imagen2} 
          alt="Escena del crimen"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
      
      {/* Formulario a la derecha */}
      <div className="flex flex-col items-center justify-center w-full md:w-3/5 p-8 bg-white shadow-lg">
        <div className="flex flex-col items-center">
          <span className="text-red-500 text-4xl"><img src={imagen1} alt="Imagen sign up" className="w-20" /></span>
          <h2 className="text-2xl font-bold mt-2">Sign up to GeoCrimen</h2>
        </div>

        <form className="mt-10 w-full max-w-sm">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              className="w-full p-2 border border-black/50 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-black/50 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-black/50 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className= "flex flex-col items-center justify-center">
            <p className="mt-10 text-sm">
              Already have an account? <Link to="/" className="text-blue-600 underline">Sign in</Link>
            </p>
          </div>

          <Link to="/community">
            <div className= "flex flex-col items-center justify-center">
            
              <button
                type="button"
                className="w-60 mt-10 bg-[#FFFFFF] text-[#1A1A1A] py-2 rounded border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFFFFF]"
              >
              Sign up
              </button>
            </div>
          </Link>
        </form>

      </div>
    </div>
  );
}
export default Register;

