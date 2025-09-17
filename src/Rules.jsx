import { motion } from "framer-motion";
import Header from "./Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { FaGavel } from "react-icons/fa";
import { TbHexagonNumber1Filled, TbHexagonNumber2, TbHexagonNumber3Filled, TbHexagonNumber4,
TbHexagonNumber5Filled, TbHexagonNumber6, } from "react-icons/tb";

function Rules() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const rules = [
    { icon: <TbHexagonNumber1Filled className="text-green-400 text-2xl" />, 
      title: t("Rules.rule1"), description: t("Rules.desc1") },

    { icon: <TbHexagonNumber2 className="text-green-400 text-2xl" />, 
      title: t("Rules.rule2"), description: t("Rules.desc2") },

    { icon: <TbHexagonNumber3Filled className="text-green-400 text-2xl" />, 
      title: t("Rules.rule3"), description: t("Rules.desc3") },

    { icon: <TbHexagonNumber4 className="text-green-400 text-2xl" />, 
      title: t("Rules.rule4"), description: t("Rules.desc4") },

    { icon: <TbHexagonNumber5Filled className="text-green-400 text-2xl" />, 
      title: t("Rules.rule5"), description: t("Rules.desc5") },

    { icon: <TbHexagonNumber6 className="text-green-400 text-2xl" />, 
      title: t("Rules.rule6"), description: t("Rules.desc6") },
  ];

  return (
    <div 
    className="min-h-screen bg-gradient-to-b from-[#0d1f48] via-[#20315c] 
    to-[#11192a] text-sky-100">
      
      {/* Fixed Header */}
      <Header showBackButton={true} theme="main"/>

      {/* Main content */}
      <div className="max-w-5xl mx-auto mt-10">
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-tr from-slate-900/80 to-slate-800/80 rounded-2xl shadow-2xl border border-sky-600/50 p-10 relative backdrop-blur-xl"
        >
          {/* Floating Label */}
          <div 
          className="absolute -top-4 right-10 bg-gradient-to-r from-green-400 to-cyan-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {t("Rules.rules")}
          </div>

          {/* Heading */}
          <h1 
          className={`font-extrabold mb-6 flex items-center 
          gap-3 text-transparent bg-clip-text bg-gradient-to-r from-green-300 
          to-cyan-400 ${i18n.language === "ka"?  "text-2xl md:text-[2.5rem]": "text-3xl md:text-[3rem]"}`}>
            <FaGavel className="text-green-400" />
            {t("Rules.heading")}
          </h1>

          {/* Subheader */}
          <p 
          className={`mb-8 leading-relaxed text-gray-200 
          ${i18n.language === "ka" ? "text-sm md:text-[1rem]" : "text-md md:text-[1.1rem]"}`}>
            <Trans
            i18nKey={'Rules.p'}
            components={{
              highlight: <span className="font-semibold text-sky-300" />,
              strong: <strong className="italic text-sky-200" />
            }} 
            />
          </p>

          {/* Rules list */}
          <ul className="space-y-5">
            {rules.map((rule, idx) => (
              <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-gradient-to-tr from-slate-900/70 to-slate-800/70 border 
              border-sky-500/30 rounded-xl p-5 shadow-lg flex items-center gap-4
              hover:scale-105 transition-all duration-200 hover:from-slate-800 hover:to-salte-700
              cursor-pointer group"
              >
                <div>
                  {rule.icon}
                </div>

                <div 
                className="border-l-2 border-sky-500 pl-3 text-sky-300 group-hover:text-sky-100">
                  <h2 
                  className={`font-semibold 
                  ${i18n.language === "ka" ? "text-[0.9rem] md:text-[1.3rem]" : "text-[1.1rem] md:text-[1.4rem]"}`}>
                    {rule.title}
                  </h2>

                  <p className={`text-gray-400 mt-1
                  ${i18n.language === "ka" ? "text-[0.7rem] md:text-[1rem]" : "text-[0.9rem] md:text-[1.1rem]"}`}>
                    {rule.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Start Quiz Button */}
          <button
          onClick={() => navigate("/")}
          className="mt-10 bg-gradient-to-r from-green-400 to-cyan-500 text-sky-200 
          font-bold px-8 py-3 rounded-full shadow-xl block mx-auto text-lg hover:brightness-110 
          transition-all duration-200 cursor-pointer hover:scale-105 hover:text-sky-50"
          >
            {t("Rules.start")}
          </button>

          {/* Fun note */}
          <p 
          className="mt-6 text-center text-sm text-rose-300 italic">
            {t("Rules.p2")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Rules;