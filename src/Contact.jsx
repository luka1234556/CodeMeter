import { motion } from "framer-motion";
import Header from "./Header/Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1f48] via-[#20315c] to-[#11192a] text-sky-100">
      
      {/* Header with back button */}
      <Header showBackButton={true} theme="main"/>

      {/* Main Card */}
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto bg-gradient-to-tr from-slate-900/70 to-slate-800/70
      rounded-2xl shadow-xl border border-sky-600/40 p-10 relative backdrop-blur-xl mt-10"
      >
        {/* Floating Label */}
        <div 
        className="absolute -top-4 left-6 bg-gradient-to-r from-sky-700 to-blue-800
      text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md"
        >
          Contact
        </div>

        {/* Heading */}
        <h1 
        className={`font-extrabold mb-6 flex items-center gap-2
        text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500
        ${i18n.language === "ka" ? "text-xl md:text-[1.8rem]" : "text-2xl md:text-4xl "}`}>
          <FaEnvelope className="text-sky-400" />
          {t("contacts.header") || "Get in Touch"}
        </h1>

        <p className={`
        leading-relaxed text-gray-200
        ${i18n.language === "ka" ? "text-sm md:text-[1rem]" : "text-md md:text-[1.1rem]"}`}>
          {t("contacts.subheader") || "We'd love to hear from you! Reach out anytime."}
        </p>

        {/* Contact Info */}
        <div className="mt-6 space-y-4 text-gray-200">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-sky-400" />
            <span>
              +995 574-09-01-06
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-sky-400" />
            <span>
              CodeMeter2025@Gmail.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-sky-400" />
            <span>
              {t("contacts.location")}
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-10 border-t border-sky-500 pt-5">
          <h2 
          className={`font-semibold text-sky-300 mb-4
          ${i18n.language === "ka" ? "text-[0.9rem] md:text-[1.2rem]" : "text-lg md:text-2xl"}`}>
            {t("contacts.formHeader") || "Prefer Writing Instead?"}
          </h2>

          <form className="space-y-4">

            <input
            type="text"
            placeholder={t("contacts.formName") || "Name"}
            className="w-full px-4 py-2 border border-sky-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
            />

            <input
            type="email"
            placeholder={t("contacts.formEmail") || "Email"}
            className="w-full px-4 py-2 border border-sky-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
            />

            <textarea
            rows="4"
            placeholder={t("contacts.formMessage") || "Message"}
            className="w-full px-4 py-2 border border-sky-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button
            type="submit"
            className="bg-sky-600 text-sky-50 px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-200 cursor-pointer active:bg-sky-300"
            >
              {t("contacts.submit") || "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;