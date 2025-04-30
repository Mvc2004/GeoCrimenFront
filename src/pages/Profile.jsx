import { useState } from "react";
import { Link } from "react-router-dom";
import imagen1 from "../images/usuario.png";
import { PencilSquareIcon, UserCircleIcon} from '@heroicons/react/24/solid'

function Profile() {
  
  const [isEditable, setIsEditable] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    username: "Usuario123",
    email: "usuario@email.com",
    password: "********",
  });

  const handleEditClick = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-64-screen bg-gradient-to-b from-white via-gay-400 to-gray-500">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Partición izquierda */}
        <div className="flex flex-col w-full md:w-1/5 p-8 bg-s">
          <div className="grid justify-items-center bg-white"></div>
        </div>

        {/* Partición central */}
        <div className="w-full md:w-3/5 p-8 bg-gradient-to-b from-white via-gay-400 to-gray-500">
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center">
              <span className="mt-10 text-black text-4xl">
                <UserCircleIcon className="w-40 text-gray-500" />
              </span>
            </div>

            <div className="mt-10 relative flex flex-col rounded-xl bg-white/50 backdrop-blur-lg">
              <form className="mt-5 ml-5 mr-5 mb-5 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  {/* Username */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label className="block mb-2 text-sm text-black">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      readOnly={!isEditable.username}
                      onChange={handleChange}
                      placeholder="Your Username"
                      className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 pr-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("username")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label className="block mb-2 text-sm text-slate-600">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly={!isEditable.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 pr-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("email")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label className="block mb-2 text-sm text-slate-600">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      readOnly={!isEditable.password}
                      onChange={handleChange}
                      placeholder="Your Password"
                      className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 pr-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("password")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                  </div>
                </div>

                {/* Botón */}
                <button
                  type="button"
                  className="mt-8 w-full rounded-md bg-[#2E8B57] font-bold py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-500 focus:shadow-none active:bg-[#2E8B57]-700 hover:bg-[#2E8B57]-900 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Partición derecha */}
        <div className="w-full md:w-1/5 p-8 bg-gradient-to-b from-white via-gay-400 to-gray-500">
          <Link to="/">
            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                className="w-40 mt-4 bg-[#1A1A1A] text-[#D32F2F] font-bold py-2 rounded-md text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-500 focus:shadow-none active:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100"
              >
                Delete Account
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
