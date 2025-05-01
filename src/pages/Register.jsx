import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import imagen1 from "../images/logo.png";
import imagen2 from "../images/imagensign-up.jpg";

function Register() {
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");

  useEffect(() => {
    // Al iniciar, traer países
    const cargarPaises = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/paises");
        const data = await res.json();
        setPaises(data.data); // Asegúrate de que el backend responde con { data: [...] }
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };
    cargarPaises();
  }, []);


  useEffect(() => {
    // Cada vez que cambie el país seleccionado, traer ciudades
    if (paisSeleccionado) {
      const cargarCiudades = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/ciudades/${paisSeleccionado}`);
          const data = await res.json();
          setCiudades(data.data);
        } catch (error) {
          console.error("Error al cargar ciudades:", error);
        }
      };
      cargarCiudades();
    }
  }, [paisSeleccionado]);

  useEffect(() => {
    if (ciudadSeleccionada) {
      const cargarBarrios = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/barrios/${ciudadSeleccionada}`)
          const data = await res.json();
          setBarrios(data.data);
        } catch (error) {
          console.error('Error al cargar Barrios');
        }
      };
      cargarBarrios();

    }
  }, [ciudadSeleccionada]);



  const [step, setStep] = useState(1); // Paso actual del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    rol: 1,
    fechaNacimiento: "",
    pais: "",
    ciudad: "",
    barrio: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      fechaRegistro: new Date().toISOString().slice(0, 19).replace("T", " ")
    };

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario creado correctamente");
        navigate("/");
      } else {
        alert("Error al registrar: " + data.message);
      }
    } catch (error) {
      console.error("Error al conectar con backend:", error);
      alert("Hubo un problema con el servidor");
    }
  };

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
          <img src={imagen1} alt="Logo" className="w-20" />
          <h2 className="text-4xl font-bold mt-2">Sign up to GeoCrimen</h2>

          {/* Indicador de pasos */}
          <div className="flex mt-4 space-x-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`w-4 h-4 rounded-full ${
                  step === n ? "bg-[#2E8B57]" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-black/50 rounded mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-black/50 rounded mt-1"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-black/50 rounded mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-black/50 rounded mt-1"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-black/50 rounded mt-1"
                />
              </div>



              <div>
                <label className="block text-sm font-medium">País</label>
                <select
                  name="pais"
                  value={formData.pais}
                  onChange={(e) => {
                    handleChange(e);
                    setPaisSeleccionado(e.target.value);
                    setFormData(prev => ({ ...prev, ciudad: "", barrio: "" })); // Reiniciar ciudad/barrio
                  }}
                  required
                  className="w-full p-2 border border-black/50 rounded mt-1"
                >
                  <option value="">Seleccione un país</option>
                  {paises.map((pais) => (
                    <option key={pais.Id_pais} value={pais.Id_pais}>{pais.nombre}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 4 && (
            <>
            <div>
                <label className="block text-sm font-medium">Ciudad</label>
                <select
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => {
                    handleChange(e);
                    setCiudadSeleccionada(e.target.value);
                    setFormData(prev => ({ ...prev, barrio: "" })) //Reinicia barrio
                  }}
                  required
                  className="w-full p-2 border border-black/50 rounded mt-1"
                  disabled={!paisSeleccionado}
                >
                  <option value="">Seleccione una ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad.Id_ciudad} value={ciudad.Id_ciudad}>{ciudad.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Barrio</label>
                <select
                  type="text"
                  name="barrio"
                  value={formData.barrio}
                  onChange={handleChange}
                  required
                  disabled={!ciudadSeleccionada}
                  className="w-full p-2 border border-black/50 rounded mt-1"
                >
                  <option value="">Seleccione un barrio</option>
                  {barrios.map((barrio) => (
                    <option key={barrio.Id_barrio} value={barrio.Id_barrio}>{barrio.nombre}</option>
                  ))}
                </select>

              </div>
            </>
          )}


          <div className="flex justify-between items-center mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-200 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              >
                Atrás
              </button>
            )}

            {step < 4 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="ml-auto px-4 py-2 bg-black text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded"
              >
                Siguiente
              </button>
            )}

            {step === 4 && (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-[#2E8B57] text-white rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              >
                Registrarse
              </button>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="mt-10 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link to="/" className="text-blue-600 underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
