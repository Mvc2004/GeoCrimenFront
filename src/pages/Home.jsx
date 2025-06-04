import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

import { ChevronLeftIcon, ChevronRightIcon,CheckIcon,LanguageIcon } from "@heroicons/react/24/outline"
import {
  UserGroupIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid"
import { MapPinIcon, ChartBarIcon } from "@heroicons/react/24/outline"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"

import im1 from "../images/home-carrusel/im1.jpeg"
import im2 from "../images/home-carrusel/im2.jpeg"
import im3 from "../images/home-carrusel/im3.jpeg"
import im4 from "../images/home-carrusel/im4.jpeg"
import im5 from "../images/home-carrusel/im5.jpeg"
import logo from "../images/logo/logo.png"
import i18n from "../i18n"
import { AccessibilityProvider } from './AccessibilityContext';
import AccesibilidadButton from './AccesibilidadButton';


function Home() {

  const [activeIndex, setActiveIndex] = useState(0)
  const { t, i18n } = useTranslation();

  const images = [im1, im2, im3, im4, im5]
  const carouselTexts = [
    "carouselTexts.carouselText1",
    "carouselTexts.carouselText2",
    "carouselTexts.carouselText3",
    "carouselTexts.carouselText4",
    "carouselTexts.carouselText5",

  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 5) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length)

  const features = [
  {
    title: "features.anonymousReports.title",
    description: "features.anonymousReports.description",
    icon: <ShieldCheckIcon className="h-12 w-12 text-white" />,
    color: "#D62828",
  },
  {
    title: "features.heatMap.title",
    description: "features.heatMap.description",
    icon: <MapPinIcon className="h-12 w-12 text-white" />,
    color: "#FCBF49",
  },
  {
    title: "features.stats.title",
    description: "features.stats.description",
    icon: <ChartBarIcon className="h-12 w-12 text-white" />,
    color: "#3a86ff",
  },
  {
    title: "features.dataVerification.title",
    description: "features.dataVerification.description",
    icon: <CheckIcon className="h-12 w-12 text-white" />,
    color: "#008f39",
  },
  {
    title: "features.preciseLocation.title",
    description: "features.preciseLocation.description",
    icon: <MapPinIcon className="h-12 w-12 text-white" />,
    color: "#D62828",
  },
];


  // Información de los niveles de riesgo para el mapa de calor
  const riskLevels = [
  {
    color: "#bf001f",
    levelKey: "riskLevels.0.level",
    descriptionKey: "riskLevels.0.description",
    icon: <ExclamationTriangleIcon className="h-10 w-10 text-white" />,
  },
  {
    color: "#003fff",
    levelKey: "riskLevels.1.level",
    descriptionKey: "riskLevels.1.description",
    icon: <ShieldExclamationIcon className="h-10 w-10 text-white" />,
  },
  {
    color: "#00ffff",
    levelKey: "riskLevels.2.level",
    descriptionKey: "riskLevels.2.description",
    icon: <ShieldCheckIcon className="h-10 w-10 text-white" />,
  },
];

  return (
    <AccessibilityProvider>
      <AccesibilidadButton/>
    <div className="min-h-screen bg-white flex flex-col font-roboto">
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-[#003049] shadow-lg">
        <h1 className="text-xl font-bold flex items-center text-white">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="w-11 mr-2" />
          <span className="text-2xl">GeoCrimen</span>
        </h1>
        
        <div className="flex items-center gap-6">
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex justify-center rounded-full p-2 text-white hover:bg-white/10 transition-colors">
              <LanguageIcon aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 w-[55px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
              <div className="py-0">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => i18n.changeLanguage('es')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-t-md ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                      <svg width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#FBD116" d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z"></path><path fill="#22408C" d="M0 18h36v7H0z"></path><path fill="#CE2028" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-2H0v2z"></path></svg>
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => i18n.changeLanguage('en')}
                      className={`w-full text-left px-4 py-2 text-sm rounded-b-md ${
                        active ? "bg-gray-200" : ""
                      }`}
                    >
                    <svg width="20px" height="20px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#B22334" d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z"></path><path fill="#EEE" d="M.068 27.679c.017.093.036.186.059.277c.026.101.058.198.092.296c.089.259.197.509.333.743L.555 29h34.89l.002-.004a4.22 4.22 0 0 0 .332-.741a3.75 3.75 0 0 0 .152-.576c.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297a3.78 3.78 0 0 0-.092.297zM18 9h18c0-.233-.028-.459-.069-.68a3.606 3.606 0 0 0-.153-.576A4.21 4.21 0 0 0 35.445 7H18v2z"></path><path fill="#3C3B6E" d="M18 5H4a4 4 0 0 0-4 4v10h18V5z"></path><path fill="#FFF" d="M2.001 7.726l.618.449l-.236.725L3 8.452l.618.448l-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449l-.236.725l.617-.448l.618.448l-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L5 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449l-.236.725L7 8.452l.618.448l-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448l-.236-.725l.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 11l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448l-.236-.725l.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 15l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 15l-.235.726z"></path></svg>
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          <Link to="/login"
           className="px-4 py-2 text-white rounded-md font-medium hover:bg-white/10 transition-colors"
           aria-placeholder= {t("Sign In")}>
            {t("Sign In")}
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-white text-[#003049] font-bold rounded-md hover:bg-gray-100 transition-colors shadow-sm"
            aria-placeholder={t("Sign Up")}>
            {t("Sign Up")}
          </Link>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <div className="relative h-[600px] w-full overflow-hidden">
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img src={img || "/placeholder.svg"} className="h-full w-full object-cover" alt={`Slide ${i + 1}`} />
            </div>
          ))}

          <div className="absolute bottom-0 left-0 right-0 z-20 text-center p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {t(carouselTexts[activeIndex])}
            </h2>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-12 w-12 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-12 w-12 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                aria-label={`Ir a diapositiva ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block pb-2 border-b-2 border-[#D62828]">
              <h2 className="text-3xl font-bold">
                <span className="text-[#003049]" aria-placeholder={t("About")}>{t("About")}</span><span className="text-[#D62828]" aria-placeholder={t("Us")}> {t("Us")}</span>
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed font-roboto text-justify" aria-placeholder={t("Text1")}>
              {t("Text1")}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-roboto text-justify">
              {t("Text2")}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-[#003049]/10 animate-pulse"></div>
              <div className="relative bg-[#003049]/5 rounded-full p-8">
                <UserGroupIcon className="w-64 h-64 text-[#003049]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#003049]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">{t("main features")}</h2>

          <div className="grid grid-flow-col gap-8 justify-items-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <div className="h-3" style={{ backgroundColor: feature.color }}></div>
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full" style={{ backgroundColor: feature.color }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#003049] text-center mb-4">{t(feature.title)}</h3>
                  <p className="text-gray-700 text-center">{t(feature.description)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-white text-[#003049] font-bold rounded-md hover:bg-gray-100 transition-colors shadow-md"
            >
              {t("Get Started Now")}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Nueva sección: Niveles de Riesgo en el Mapa de Calor */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#003049] text-center mb-6">{t("heatmap_title")}</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-16">
            {t("heatmap_description")}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {riskLevels.map((level, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
                <div className="absolute inset-0 opacity-90" style={{ backgroundColor: level.color }}></div>
                <div className="relative p-8 flex flex-col items-center text-white z-10 h-full">
                  <div className="mb-4 p-3 rounded-full bg-white/20 backdrop-blur-sm">{level.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">Nivel {t(level.levelKey)}</h3>
                  <div className="w-16 h-1 bg-white mb-4"></div>
                  <p className="text-center text-lg">{t(level.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/heatmap"
              className="inline-flex items-center px-6 py-3 bg-[#003049] text-white font-bold rounded-md hover:bg-[#002135] transition-colors shadow-md"
            >
              {t("heatmap_button")}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#002135] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="w-12 mr-3" />
              <span className="text-2xl font-bold">GeoCrimen</span>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                {t("footer_about")}
              </Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                {t("footer_privacy")}
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                {t("footer_terms")}
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                {t("footer_contact")}
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">{t("footer_rights")}</p>
          </div>
        </div>
      </footer>
    </div>
    </AccessibilityProvider>
  )
}

export default Home
