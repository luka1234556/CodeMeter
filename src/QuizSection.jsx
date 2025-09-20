import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import { FaChartBar, FaTrophy, FaLeaf, FaCog } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { LuBrainCircuit } from "react-icons/lu";
import { AiFillFire } from "react-icons/ai";
import { GrAchievement } from "react-icons/gr";
import { VscLaw } from "react-icons/vsc";

// Theme styles mapping
const themeStyles = {
  html: {
    id: "htmlGuide",
    heading: "text-sky-50",
    headingBg: "bg-gradient-to-b from-sky-700 to-sky-500",
    text: "text-sky-100",
    border: "border-sky-600",
    bg: "bg-gradient-to-b from-sky-400 to-sky-900",
    bg2: "bg-gradient-to-b from-sky-100 to-sky-300",
    icon: "text-sky-300",
  },
  js: {
    id: "jsGuide",
    heading: "text-yellow-200", 
    headingBg: "bg-gradient-to-r from-yellow-500 to-amber-500", 
    text: "text-amber-100", 
    border: "border-amber-600", 
    bg: "bg-gradient-to-br from-yellow-400 to-amber-500", 
    bg2: "bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700", 
    icon: "text-yellow-100",
    // 🔥 New highlight system
    highlight: "text-orange-600 font-semibold",   // instead of cyan
    accent: "text-red-600 font-semibold",         // for fire/hard levels
  },
  react: {
    id: "reactGuide",
    heading: "text-cyan-50",
    headingBg: "bg-gradient-to-b from-cyan-700 to-cyan-500",
    text: "text-cyan-100",
    border: "border-cyan-500",
    bg: "bg-gradient-to-b from-cyan-700 to-cyan-800",
    bg2: "bg-gradient-to-b from-cyan-800 to-cyan-950",
    icon: "text-cyan-300",
  },
  logic: {
    id: "customGuide",
    heading: "text-indigo-300",
    headingBg: "bg-gradient-to-b from-indigo-900 to-indigo-800",
    text: "text-indigo-300",
    border: "border-indigo-300",
    bg: "bg-gradient-to-b from-indigo-800 to-indigo-950/70",
    bg2: "bg-gradient-to-b from-indigo-900 to-slate-950",
    icon: "text-indigo-200",
  },
};

const QuizSection = ({ theme = "html" }) => {
  const { t, i18n } = useTranslation();
  const { id, heading, headingBg, text, border, bg, bg2, icon, accent, highlight } = themeStyles[theme] || themeStyles.html;

  return (
    <motion.section
    id={id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`relative w-full max-w-6xl mx-auto px-2 lg:px-12
    rounded-3xl shadow-2xl ${bg2} py-8 my-2 md:my-10 border ${border} 
    overflow-hidden`}
    >
      {/* Background accent */}
      <div
      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent 
      rounded-3xl pointer-events-none"
      />

      <main className="relative z-10">
        <div className={`${border}`}>
          {/* Header */}
          <h1
          className={`flex items-center gap-3 ${text} font-extrabold 
          px-4 py-3 mb-4 rounded-2xl shadow-inner border
          bg-gradient-to-r ${headingBg} text-[1.4rem] md:text-[1.8rem] tracking-wide`}
          >
            <span className={`p-2 rounded-full ${bg} ${border}`}>
              <LuBrainCircuit className={`text-2xl ${icon}`} />
            </span>

            <span 
            className={`${heading} 
            ${i18n.language === "ka" ? 
            "text-[1.2rem] md:text-[1.6rem]" 
            : "text-[1.3rem] md:text-[2rem]"}`}>
              {theme === "html" && t("Guide.htmlHeading")}
              {theme === "js" && t("Guide.jsHeading")}
              {theme === "react" && t("Guide.reactHeading")}
              {theme === "logic" && t("Guide.randomHeading")}
            </span>
          </h1>

          <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-2`}
          >
            {/* Leveling System */}
            <div
            className={`flex md:flex-row gap-4 items-center p-5  
            bg-gradient-to-b ${bg} ${text} hover:scale-[1.03] transition-all duration-300
            md:rounded-t-2xl rounded-lg md:pl-1`}
            >
              <span
              className={`flex-shrink-0 p-3 ${bg} ${border} rounded-full
              shadow-md flex items-center justify-center h-full`}
              >
                <GiProgression className={`text-2xl ${icon}`} />
              </span>

              <div className="flex flex-col justify-evenly h-full">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {t("Guide.leveling.levelingSystem")}
                  </h3>

                  <p 
                  className={`${i18n.language === "ka" 
                    ? "text-[0.80rem]" 
                    : "text-[1rem]"}`
                  }>
                    {t("Guide.leveling.p")}
                  </p>
                </div>

                <ul className="mt-2 list-disc space-y-2">
                  {[
                    {
                      id:1, icon: <FaLeaf/>, level: `${t("Guide.leveling.easy")}`,
                      p: `${t("Guide.leveling.easyP")}`, iconText: "text-green-200",
                      iconStyle: "bg-green-600 p-1 rounded-full border-2 border-green-100" },

                    {
                      id:2, icon: <FaCog/>, level: `${t("Guide.leveling.medium")}`,
                      p: `${t("Guide.leveling.mediumP")}`, iconText: "text-cyan-200",
                      iconStyle: "bg-sky-600 p-1 rounded-full border-2 border-cyan-100"},

                    {
                      id:3, icon: <AiFillFire/>, level: `${t("Guide.leveling.hard")}`,
                      p: `${t("Guide.leveling.hardP")}`, iconText: accent || "text-rose-300",
                      iconStyle: "bg-red-600 p-1 rounded-full border-2 border-red-100"}
                  ].map((levels) => (
                    <li
                    className="flex items-center gap-1" 
                    key={levels.id}>
                      <div 
                      className={`text-[0.9rem] md:text-[text-1rem]
                      ${levels.iconStyle}`}>
                        {levels.icon}
                      </div>

                      <div 
                      className={`flex gap-1 items-center 
                      ${i18n.language === "ka" 
                      ? "text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]" 
                      : "text-[0.9rem] md:text-[1rem]"}`}>
                        <span className={`${levels.iconText}`}>
                          {levels.level}
                        </span>

                        <p>
                          {levels.p}
                        </p>
                      </div>
                    </li>
                  ))}

                </ul>
              </div>
            </div>

            {/* Questions */}
            <div
            className={`flex md:flex-row gap-4 items-center p-5  
            bg-gradient-to-b ${bg} ${text} hover:scale-[1.03] transition-all duration-300
            md:rounded-t-2xl rounded-lg md:pl-1`}
            >
              <span
              className={`flex-shrink-0 p-3 ${bg} ${border} rounded-full
              shadow-md flex items-center justify-center h-full`}
              >
                <FaChartBar className={`text-2xl ${icon}`} />
              </span>

              <div className="flex flex-col justify-evenly h-full">
                <div>
                  <h3 className="font-bold text-xl mb-1">
                    {t("Guide.questions.logic")}
                  </h3>
                  
                  <p className={`
                  ${i18n.language === "ka" 
                  ? "text-[0.9rem]" 
                  : "text-[1rem]"}`
                  }>
                    {t("Guide.questions.p")}
                  </p>
                </div>
              
                <p 
                className={`leading-relaxed mb-1
                ${i18n.language === "ka" 
                ? "text-[0.8rem] md:text-[0.9rem]" 
                : "text-[0.9rem] md:text-[1rem]"}`}>
                  <Trans
                  i18nKey="Guide.questions.explanation"
                  components={{
                    highLight: <span className={`${highlight || "text-cyan-400"} font-bold underline`} />,
                  }}
                  />
                </p>
              
              </div>
            </div>

            {/* Stats */}
            <div
            className={`flex md:flex-row gap-4 items-center p-5  
            bg-gradient-to-b ${bg} ${text} hover:scale-[1.03] transition-all duration-300
            md:rounded-t-2xl rounded-lg md:pl-1`}
            >
              <span
              className={`flex-shrink-0 p-3 ${bg} ${border} rounded-full
              shadow-md flex items-center justify-center h-full`}
              >
                <FaTrophy className={`text-2xl text-yellow-300/80`} />
              </span>

              <div className="flex flex-col justify-evenly h-full">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {t("Guide.stats.aboutStats")}
                  </h3>

                  <p
                  className={`${i18n.language === "ka" 
                    ? "text-[0.8rem]" 
                    : "text-[1rem]"}`
                    }>
                    {t("Guide.stats.p")}
                  </p>
                </div>
                
                <p 
                className={`
                ${i18n.language === "ka" 
                ? "text-[0.8rem] md:text-[0.9rem]" 
                : "text-[0.9rem] md:text-[1rem]"}
                `}>
                  <Trans
                    i18nKey="Guide.stats.explanation"
                    components={{
                      radial: <span className={`${highlight || "text-cyan-400"} font-bold`} />,
                      rank1: <span className="text-amber-700 font-bold"/>,
                      rank2: <span className="text-yellow-400 font-bold"/>
                    }}
                  />
                </p>
              </div>
            </div>

            {/* Mastery */}
            <div
            className={`flex md:flex-row gap-4 items-center p-5  
            bg-gradient-to-b ${bg} ${text} hover:scale-[1.03] transition-all duration-300
            md:rounded-t-2xl rounded-lg md:pl-1`}
            >
              <span
              className={`flex-shrink-0 p-3 ${bg} ${border}
              shadow-md flex items-center justify-center h-full rounded-full`}
              >
                <GrAchievement className={`text-2xl text-yellow-300/80`} />
              </span>

              <div className="flex flex-col justify-evenly h-full">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {t("Guide.mastery.masteryLevel")}
                  </h3>

                  <p className={`
                  ${i18n.language === "ka" 
                  ? "text-[0.80rem]" 
                  : "text-[1rem]"}`
                  }>
                    {t("Guide.mastery.p")}
                  </p>
                </div>

                <p className={`leading-relaxed
                ${i18n.language === "ka" 
                ? "text-[0.8rem] md:text-[0.9rem]" 
                : "text-[0.9rem] md:text-[1rem]"}`}>
                  <Trans
                  i18nKey="Guide.mastery.explanation"
                  components={{
                    highLight: (
                      <span className={`${highlight || "text-cyan-400"} font-semibold `} />
                    ),
                    radial: (
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-300 font-bold" />
                    ),
                  }}
                  />
                </p>
              </div>
            </div>

            {/* Rules */}
            <div
            className={`flex md:flex-row gap-4 items-center p-5  
            bg-gradient-to-b ${bg} ${text} hover:scale-[1.03] transition-all duration-300
            md:rounded-t-2xl rounded-lg md:w-[204%]`}
            >
              <span
              className={`flex-shrink-0 p-3 ${bg} ${border} rounded-full
              shadow-md flex items-center justify-center h-full`}
              >
                <VscLaw className={`text-2xl text-purple-200`} />
              </span>

              <div className="flex flex-col gap-2 justify-between">
                <div>
                  <h3 
                  className="font-bold text-lg mb-1">
                    {t("Guide.Rules.rules")}
                  </h3>

                  <p 
                  className={`
                  ${i18n.language === "ka" 
                  ? "text-[0.80rem]" 
                  : "text-[0.9rem]"}  
                  `}>
                    {t("Guide.Rules.p")}
                  </p>
                </div>

                <ul className="pl-3">
                  {[
                    {id:1, exp: `${t("Guide.Rules.explanation1")}`},
                    {id:2, exp: `${t("Guide.Rules.explanation2")}`},
                    {id:3, exp: `${t("Guide.Rules.explanation3")}`},
                    {id:4, exp: `${t("Guide.Rules.explanation4")}`}
                  ].map((rules) => (
                    <li
                    className={`list-disc
                    ${i18n.language === "ka" 
                    ? "text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]" 
                    : "text-[0.9rem] md:text-[1.1rem]"}`} 
                    key={rules.id}>
                      <Trans 
                      i18nKey={`${rules.exp}`}
                      components={{
                        highLight: <span className={`${highlight || "text-cyan-400"} font-semibold`} />,
                      }}
                      /> 
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.section>
  );
};

export default QuizSection;