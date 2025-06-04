"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AccessibilityContext = createContext()

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 16,
    highContrast: false,
    reduceMotion: false,
    language: "es",
  })

  const updateSettings = (newSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }

      // Apply settings to document
      document.documentElement.style.fontSize = `${updated.fontSize}px`
      document.documentElement.classList.toggle("high-contrast", updated.highContrast)
      document.documentElement.classList.toggle("reduce-motion", updated.reduceMotion)

      // Save to localStorage
      localStorage.setItem("accessibility-settings", JSON.stringify(updated))

      return updated
    })
  }

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(parsed)

        // Apply saved settings
        document.documentElement.style.fontSize = `${parsed.fontSize}px`
        document.documentElement.classList.toggle("high-contrast", parsed.highContrast)
        document.documentElement.classList.toggle("reduce-motion", parsed.reduceMotion)
      } catch (error) {
        console.error("Error loading accessibility settings:", error)
      }
    }
  }, [])


  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings}}>{children}</AccessibilityContext.Provider>
  )
}
