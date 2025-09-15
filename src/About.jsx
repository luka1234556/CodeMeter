import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header/Header";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

function About() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const languages = {
    ka: {
      label: "GE",
      image: "georgia.png",
      text: "Georgian"
    },
    en: {
      label: "US",
      image: "US.png",
      text: "United States"
    }
  };

  return (
    <div 
    className="min-h-screen bg-gradient-to-b from-[#0d1f48] via-[#20315c] to-[#11192a] 
    text-sky-100"
    >
  
      <Header showBackButton={true} theme="main" />

      {/* Main Card */}
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto bg-gradient-to-tr from-slate-900/70 to-slate-800/70
      rounded-2xl shadow-xl border border-sky-600/40 p-10 relative backdrop-blur-xl
      mt-10"
      >
        {/* Floating Label */}
        <div 
        className="absolute -top-4 left-6 bg-gradient-to-r from-sky-700 to-blue-800
        text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md"
        >
          About CodeMeter
        </div>

        {/* Heading */}
        <h1 
        className="text-2xl md:text-4xl font-extrabold mb-6 flex items-center gap-2
        text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500"
        >
          <FaInfoCircle className="text-sky-400" />
          {t("about.header1")}
        </h1>

        <p 
        className={`leading-relaxed text-gray-200
        ${i18n.language === "ka" ? "text-sm md:text-[1rem]" : "text-md md:text-[1.1rem]"}`}>
          <Trans
          i18nKey="about.purpose"
          components={{
            highlight: <span className="font-semibold text-sky-300" />,
            normal: <span className="font-semibold text-cyan-300" />,
            strong: <strong className="italic text-indigo-500" />
          }} 
          />
        </p>

        <div className="my-8 border-t border-sky-500/40" />

        {/* Why We Built This */}
        <h2 className="text-2xl font-bold text-sky-300 mb-3">
          {t("about.header2")}
        </h2>

        <p 
        className={`text-gray-300 mb-6
        ${i18n.language === "ka" ? "text-sm md:text-[1rem]" : "text-md md:text-[1.1rem]"}`}>
          {t("about.reason")}
        </p>

        {/* Vision */}
        <h2 
        className="text-2xl font-bold text-sky-300 mb-3">
          {t("about.header3")}
        </h2>

        <p 
        className={`text-gray-300
        ${i18n.language === "ka" ? "text-sm md:text-[1rem]" : "text-md md:text-[1.1rem]"}`}>
          {t("about.vision")}
        </p>
      </motion.div>
    </div>
  );
}

export default About;