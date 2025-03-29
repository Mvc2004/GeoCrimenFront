import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex min-h-screen">
      {/* Imagen a la izquierda */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center p-4">
        <img
          src="/imagen2.png" 
          alt="Escena del crimen"
          className="w-4/5 h-auto object-cover rounded-lg shadow-md"
        />
      </div>
      
      {/* Formulario a la derecha */}
      <div className="flex flex-col items-center justify-center w-full md:w-3/5 p-8 bg-white shadow-lg">
        <div className="flex flex-col items-center">
          <span className="text-red-500 text-4xl">📍</span>
          <h2 className="text-2xl font-bold mt-2">Sign up to GeoCrimen</h2>
        </div>

        <form className="mt-6 w-full max-w-sm">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account? <Link to="/" className="text-blue-600">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
