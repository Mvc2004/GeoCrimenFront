import { useState } from "react";
import { Link } from "react-router-dom";
import imagen1 from "../images/usuario.png";

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
    <div className="min-64-screen bg-[#E0E0E0]">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Partición izquierda */}
        <div className="flex flex-col w-full md:w-1/5 p-8 bg-[#E0E0E0]">
          <div className="grid justify-items-center bg-white"></div>
        </div>

        {/* Partición central */}
        <div className="w-full md:w-3/5 p-8 bg-[#E0E0E0]">
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center">
              <span className="mt-10 text-red-500 text-4xl">
                <img src={imagen1} alt="Logo" className="w-40" />
              </span>
            </div>

            {/* Formulario */}
            <form className="mt-20 w-full max-w-sm">
              {/* Campo Username */}
              <div className="relative mt-5">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  readOnly={!isEditable.username}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 border border-black/50 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => handleEditClick("username")}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4H4v16h16v-7m-3-3l4-4a2.828 2.828 0 00-4-4l-4 4m0 0L7 17l4 4 9-9"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Campo Email */}
              <div className="relative mt-5">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly={!isEditable.email}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 border border-black/50 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => handleEditClick("email")}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4H4v16h16v-7m-3-3l4-4a2.828 2.828 0 00-4-4l-4 4m0 0L7 17l4 4 9-9"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Campo Password */}
              <div className="relative mt-5">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  readOnly={!isEditable.password}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 border border-black/50 rounded mt-0.1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => handleEditClick("password")}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 4H4v16h16v-7m-3-3l4-4a2.828 2.828 0 00-4-4l-4 4m0 0L7 17l4 4 9-9"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Botón Update */}
              <Link to="/">
                <div className="flex flex-col items-center justify-center">
                  <button
                    type="button"
                    className="w-60 mt-20 bg-[#FFFFFF] text-[#2E8B57] py-2 rounded border border-[#2E8B57] hover:bg-[#2E8B57] hover:text-[#FFFFFF]"
                  >
                    Update
                  </button>
                </div>
              </Link>
            </form>
          </div>
        </div>

        {/* Partición derecha */}
        <div className="w-full md:w-1/5 p-8 bg-[#E0E0E0]">
          <Link to="/">
            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                className="w-60 mt-4 bg-[#1A1A1A] text-[#D32F2F] py-2 rounded hover:bg-[#D32F2F] hover:text-[#1A1A1A]"
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
