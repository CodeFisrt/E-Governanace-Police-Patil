// src/components/LandingPage.jsx
import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">
          E-Governance Portal
        </h1>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#home" className="hover:text-blue-600">
            Home
          </a>
          <a href="#services" className="hover:text-blue-600">
            Services
          </a>
          <a href="#about" className="hover:text-blue-600">
            About
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </nav>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="px-8 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Digital Services for Every Citizen
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            A single platform to access government certificates, applications,
            and essential civic services anytime, anywhere.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50">
              Know More
            </button>
          </div>
        </div>

        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/portal-service-illustration-download-in-svg-png-gif-file-formats--technology-tech-support-customer-pack-business-illustrations-4811836.png"
          alt="Portal"
          className="w-full max-w-lg mx-auto"
        />
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 py-16 bg-gray-50">
        <h3 className="text-3xl font-bold text-center">Our Services</h3>
        <p className="text-center mt-2 text-gray-600">
          Quick access to the most demanded services
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            { title: "Apply Certificates", icon: "📄" },
            { title: "Tax / Bill Payment", icon: "💰" },
            { title: "Track Requests", icon: "📍" },
            { title: "Complaint Registration", icon: "🛠️" },
            { title: "Public Schemes Info", icon: "📢" },
            { title: "Appointment Booking", icon: "📆" },
          ].map((card, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >
              <div className="text-4xl">{card.icon}</div>
              <h4 className="mt-4 text-xl font-semibold">{card.title}</h4>
              <p className="mt-2 text-gray-500 text-sm">
                Fast, secure and transparent service for every citizen.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-8 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/government-process-illustration-download-in-svg-png-gif-file-formats--state-service-platform-technology-pack-urban-landscape-illustrations-6819357.png"
          alt="About"
          className="w-full max-w-lg mx-auto"
        />
        <div>
          <h3 className="text-3xl font-bold">About the Portal</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            This portal is designed to bring government services closer to
            citizens. No need to visit offices physically — request and manage
            everything online with complete transparency and security.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-16 bg-gray-100 text-center">
        <h3 className="text-3xl font-bold">Need Support?</h3>
        <p className="mt-2 text-gray-600">
          We are here to assist you 24/7. Contact us anytime.
        </p>
        <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
          Contact Support
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-blue-600 text-white font-medium">
        © {new Date().getFullYear()} E-Governance Portal · All Rights Reserved
      </footer>
    </div>
  );
}
