import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { PencilSquareIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import imagen1 from "../images/imgfondo/perfil.jpg";


function Profile() {

  const navigate = useNavigate();

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
    
<div
  className="w-full min-h-screen bg-cover bg-center relative bg-opacity backdrop-blur-lg"
><img
    src={imagen1}
    alt="Fondo"
    className="absolute inset-0 w-full h-full object-cover blur-md"
  />

  {/* Contenido encima de la imagen */}
  <div className="flex flex-col md:flex-row w-full min-h-screen relative z-10">
    {/* Partición izquierda (puedes dejarla vacía o decorativa) */}
    <div className="hidden md:block w-1/5 p-8"></div>

    {/* Partición central */}
    <div className="w-full md:w-3/5">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <span className="text-black text-4xl">
            <UserCircleIcon className="w-40 text-[#003049]" />
          </span>
        </div>

        <div className="mt-10 relative flex flex-col rounded-xl bg-[#003049] p-5">
          <form className="w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              {/* Username */}
              <div className="w-full max-w-sm min-w-[200px] relative">
                <label className="block mb-2 text-sm text-white font-bold">Usuario</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  readOnly={!isEditable.username}
                  onChange={handleChange}
                  placeholder="Nombre de usuario"
                  className="w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none"
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
                <label className="block mb-2 text-sm text-white font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly={!isEditable.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none"
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
                <label className="block mb-2 text-sm text-white font-bold">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  readOnly={!isEditable.password}
                  onChange={handleChange}
                  placeholder="contraseña"
                  className="w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none"
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
              className="mt-8 ml-[132px] w-[110px] rounded-md bg-[#FCBF49] font-bold py-2 border border-transparent text-center text-sm text-[#003049] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FCBF49]/85"
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Partición derecha */}
    <div className="w-full md:w-1/5 p-10">
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            className="w-[130px] bg-[#D62828] text-white font-bold py-2 rounded-md text-center text-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#D62828]/85"
            onClick={() => navigate("/")}>
            Eliminar Cuenta
          </button>
        </div>
    </div>
  </div>
</div>

  );
}

export default Profile;
