import { motion } from "framer-motion";
import Header from "./Header/Header.jsx";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaBook, FaLaptopCode, FaExternalLinkAlt } from "react-icons/fa";

function Resources() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const resourceList = [
    { title: t("resources.title1"), description: t("resources.description1"), link: "https://developer.mozilla.org/" },
    { title: t("resources.title2"), description: t("resources.description2"), link: "https://react.dev/" },
    { title: t("resources.title3"), description: t("resources.description3"), link: "https://javascript.info/" },
    { title: t("resources.title4"), description: t("resources.description4"), link: "https://www.frontendmentor.io/" },
    { title: t("resources.title5"), description: t("resources.description5"), link: "https://css-tricks.com/" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1f48] via-[#20315c] to-[#11192a] text-sky-100">
      
      {/* Header with optional Back button */}
      <Header showBackButton={true} theme="main"/>

      {/* Main content wrapper */}
      <div className="max-w-6xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gradient-to-tr from-slate-900/70 to-slate-800/70 rounded-2xl shadow-xl border border-sky-600/40 p-10 relative backdrop-blur-xl"
        >
          {/* Floating label */}
          <div 
          className="absolute -top-4 left-10 bg-gradient-to-r from-sky-700 to-blue-800
          text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
            {t("resources.res")}
          </div>

          {/* Heading */}
          <h1 
          className={`font-extrabold mb-6 flex items-center gap-2
          text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500
          ${i18n.language === "ka" ? "text-[1.3rem] md:text-[2rem]": "text-2xl md:text-4xl "}`}>
            <FaBook className="text-sky-400" />
            {t("resources.recommended")}
          </h1>

          {/* Description */}
          <p 
          className={`leading-relaxed text-gray-200 mb-8
          ${i18n.language === "ka" ? "text-sm md:text-[1rem]" : "text-md md:text-[1.1rem]"}`}>
            <Trans 
            i18nKey="resources.p"
            components={{
              highlight: <span className="text-sky-400 font-bold "/>
            }}
            />
          </p>

          {/* Resource list */}
          <ul className="space-y-4">
            {resourceList.map((item, idx) => (
              <li 
              key={idx}
              className="border border-sky-600/40 p-4 rounded-md hover:scale-105
              transition-all duraiton-200 group bg-gradient-to-b from-blue-950/90 to-sky-900/50
              hover:from-blue-900/50 hover:to-sky-800">
                <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-start gap-3"
                >
                  <div>
                    <h2 
                    className="text-xl font-semibold text-sky-300 flex items-center 
                    gap-2 group-hover:text-blue-400">
                      <FaLaptopCode className="text-sky-400" />
                      {item.title}
                    </h2>

                    <p className={`text-gray-400 mt-1 text-sm
                    ${i18n.language === "ka" ? "text-[0.9rem]" : "text-sm"}`}>
                      {item.description}
                    </p>
                  </div>
                  <FaExternalLinkAlt className="text-sky-400 mt-1" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Resources;