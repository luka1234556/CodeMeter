import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import { useTranslation, Trans } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import { htmlcssQuestions, jsQuestions, reactQuestions, customQuestions } from "./questions.js";
import { FaInstagram, FaThreads, FaTiktok, FaYoutube, FaAngleDown, FaHtml5 } from "react-icons/fa6";
import { TbHexagonNumber1Filled, TbHexagonNumber2, TbHexagonNumber3Filled, TbUserCode,
TbHexagonNumber4, TbHexagonNumber5Filled, TbHexagonNumber6,TbHexagonNumber7Filled, TbWaveSquare,
TbBackground} from "react-icons/tb";
import { FiHelpCircle, FiBookOpen, FiMail, FiInfo, FiClipboard } from 'react-icons/fi';
import { FaCss3Alt, FaReact, FaFacebookSquare, FaTerminal, FaSortDown, FaGithub,
  FaRobot } from "react-icons/fa";
import { IoLogoJavascript, IoClose, IoCaretUpOutline, IoLogoElectron  } from "react-icons/io5";
import { LuPlus, LuBrainCircuit } from "react-icons/lu";
import { PiHeartHalfFill } from "react-icons/pi";
import { TiInfoLargeOutline, TiPlus } from "react-icons/ti";
import { RiJavascriptFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { PiFireSimpleLight } from "react-icons/pi";
import { LiaAtomSolid } from "react-icons/lia";
import { CgBee } from "react-icons/cg";
import { PiStarThin } from "react-icons/pi";
import { CiLinkedin, CiInstagram } from "react-icons/ci";
import { MdTimeline } from "react-icons/md";

function Training() {

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
  const { t, i18n } = useTranslation();
  const [languageBox2, setLanguageBox2] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const facts = t("footerFacts", {returnObjects: true});
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  const randomStars = Array.from({ length: 50 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 0.5}rem`, // 0.5rem to 2rem
    opacity: Math.random() * 0.6 + 0.3, // 0.3 to 0.9
    rotate: `${Math.random() *  360}deg`
  }));

  const [stats, setStats] = useState(false);
  const [categories, setCategories] = useState(false);
  /*--------------------------------------------------*/

  const [infoHTMLCSS, setInfoHTMLCSS] = useState(false);
  const [infoJS, setInfoJS] = useState(false);
  const [infoReact, setInfoReact] = useState(false);
  const [infoRLQ, setInfoRLQ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 30);
  }, [])

  function FooterSection({title, items}){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return(
      <div 
      className="border-b-2 pb-3 md:border-2 md:p-5 bg-gradient-to-b 
      md:hover:scale-101 md:border-blue-300
      md:rounded-2xl md:hover:from-sky-800/40 transition-all duration-300">
        <button
        className="flex justify-between items-center cursor-pointer 
        hover:text-blue-300 transition-colors duration-200
        w-full text-lg pb-2"
        onClick={() => setOpen(!open)}
        >
          {title}
          <span className="md:hidden">
            <LuPlus className={`${open ? "rotate-45" : ""} transition-all
            duration-200`}/>
          </span>

        </button>

        {(open || window.innerWidth >= 768) && (
        <ul 
        className="flex flex-col gap-2 justify-start items-start mt-2
        text-md text-blue-400 mb-5">
          {items.map((item, index) => (
            <li
            className="hover:text-blue-300 cursor-pointer hover:scale-105 transition-all duration-200"
            key={index}
            >
              <button
              className="cursor-pointer flex items-center gap-1"
              onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        )}
      </div>
    )
  }

  return(
    <div 
    className="min-h-screen main text-sky-100">
      
      <Header showBackButton={false} theme="main"/>

      <nav 
      className="fixed md:flex left-0 top-[40%] z-20 hidden">
        <ul className="space-y-2 cursor-pointer">
          {[
            {id:1, icon: <FaHtml5/>, 
            style: "text-orange-400 bg-gradient-to-br from-slate-900 to-sky-900/50 hover:to-sky-800 border-sky-400"},

            {id:2, icon: <RiJavascriptFill/>,
            style: "text-yellow-500 bg-gradient-to-b from-slate-900 to-yellow-900/50 hover:to-yellow-800"},

            {id:3, icon: <FaReact/>,
            style: "text-cyan-500 bg-gradient-to-b from-slate-900 to-cyan-900/50 hover:to-cyan-900"},

            {id:4, icon: <FaTerminal/>,
            style: "text-indigo-500 bg-gradient-to-b from-slate-900 to-indigo-900/50 hover:to-indigo-800"},
          ].map((quiz) => (
            <button
            key={quiz.id}
            onClick={() => {
              const sections = {
                1: document.getElementById("sec1"),
                2: document.getElementById("sec2"),
                3: document.getElementById("sec3"),
                4: document.getElementById("sec4"),
              }
              const target = sections[quiz.id]
              if(sections){
                target.scrollIntoView({behavior:"smooth", block: "end"})
              }
            }}
            className={`p-4 rounded-r-full transition-all duration-200
            ${quiz.style} w-18 -translate-x-6 flex justify-end hover:translate-x-0
            text-2xl border-r border-y cursor-pointer`}
            >
              <h2
              className="cursor-pointer"
              >
                {quiz.icon}
              </h2>
            </button> 
          ))}
        </ul>
      </nav>

      <main 
      className="mb-[5rem] mt-3 overflow-x-hidden space-y-8 md:space-y-12 lg:space-y-24">
        {/*Hero section*/}
        <section
        aria-label="Hero Section: Quiz Introduction"
        className="relative w-full px-8 md:px-20 py-[4rem] border-y-2 border-indigo-700/40
        bg-gradient-to-tr from-gray-900 via-indigo-900 to-indigo-800
        shadow-2xl flex flex-col md:flex-row items-center justify-between"
        >
          
          {/* Left Content */}
          <div
          aria-label="Left Content (text, buttons, stats)" 
          className="flex flex-col gap-6 z-10 min-w-full md:min-w-[43rem] max-w-xl">
            {/* Heading */}
            <div 
            className="flex items-center justify-between gap-1 w-full">
              <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }} 
              className={`font-extrabold pt-1 text-transparent pb-[8px]
              bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500
              ${i18n.language === "ka" ? "text-[1.6rem] md:text-[2.5rem]" : "text-3xl md:text-5xl"}`}>
                {t("training.heroSection.heading")}
              </motion.h1>

              <span className="rounded-full border border-sky-300 p-2">
                <LuBrainCircuit className="text-sky-300 md:text-[5rem] text-[3.5rem] p-1" />
              </span>
            </div>

            {/* Subtitle */}
            <div 
            aria-label="stats and paragrafs"
            className={`text-blue-200 leading-relaxed`}>
              <p 
              className={`
              ${i18n.language === "ka" ? "text-[0.9rem] md:text-lg":"text-md md:text-lg"}`}>
                {t("training.heroSection.paragraf1")}
              </p>

              <span 
              className="text-sky-400 font-extrabold flex gap-2 md:text-[1.2rem]">
                <span className="font-mono text-2xl">&lt;</span>
                <h2 className="text-orange-400">HTML</h2>/
                <h2 className="text-sky-500">CSS</h2>/ 
                <h2 className="text-amber-400">JavaScript</h2>/
                <h2 className="text-cyan-300">React</h2>
                <span className="font-mono text-2xl">/&gt;</span>.
              </span> 

              <p 
              className={`${i18n.language === "ka" ? "text-[0.9rem] md:text-lg":"text-md md:text-lg"}`}>
                {t("training.heroSection.paragraf2")}
              </p>
            </div>

            {/* Buttons */}
            <nav
            aria-label="navigations to down quizes" 
            className="flex items-center gap-4 mt-2">
              {/* Primary button */}
              <button
              aria-label="Scroller to quiz"
              onClick={() => {
                const section = document.getElementById("sec1");
                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "end", // 👈 align to center instead of top
                  });
                }
              }}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 
              text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl 
              transition-all duration-300 flex items-center gap-2 cursor-pointer
              group relative overflow-hidden hover:from-sky-400 md:text-lg text-sm"
              >
                <span 
                className={`relative z-10 
                ${i18n.language === "ka" ? "text-[0.8rem] md:text-[1rem]":"text-md md:text-lg"}`}>
                  {t("training.heroSection.button1")}
                </span>

                <IoIosArrowForward
                className="group-hover:rotate-90 transition-all duration-200 relative z-10"
                />
              </button>

              {/* Secondary button */}
              <button
              aria-label="For more information"
              onClick={() => navigate("/About")}
              className={`px-6 py-4 rounded-xl border border-sky-400 text-sky-300 font-medium 
              bg-transparent hover:bg-sky-500/20 hover:text-white hover:scale-105 
              transition-all duration-300 flex items-center gap-2 cursor-pointer
              md:text-lg text-sm ${i18n.language === "ka" ? "text-[0.8rem] md:text-[1rem]":"text-md md:text-lg"}`}
              >
                {t("training.heroSection.button2")}
              </button>
            </nav>

            {/* Trust Stats */}
            <div 
            aria-label="Stats about this app"
            className="flex gap-8 mt-6 mb-2 ml-2 text-sky-300 font-medium">

              {/* Questions button */}
              <div 
              aria-label="Questions button"
              className="flex flex-col justify-center items-center group relative">
                <button 
                aria-label="Show total number of questions"
                onClick={() => {
                  setCategories(false);
                  setStats(!stats);
                }}
                aria-expanded={stats} // 👈 tells screen readers if it's open
                aria-controls="questions-menu" // 👈 links button with dropdown
                className="flex flex-col items-center cursor-pointer border-2 
                border-dashed border-sky-400 px-4 py-2 rounded-xl bg-slate-900/50
                shadow-md shadow-sky-900/40 hover:bg-sky-400/10 hover:border-sky-300 
                hover:scale-105 transition-all duration-200"
                >
                  <span 
                  className="text-xl font-extrabold text-white 
                  group-hover:text-sky-300 flex items-center gap-1">
                    {`${Math.floor(htmlcssQuestions.length + jsQuestions.length + reactQuestions.length + customQuestions.length)}`}
                    <TiPlus className="mt-1" />
                  </span>

                  <span className="text-sm">
                    {t("training.heroSection.Questions")}
                  </span>
                </button>

                <span 
                className="-translate-y-2 text-2xl text-sky-400 pointer-events-none
                group-hover:scale-110 group-hover:-translate-y-1 
                transition-transform duration-200">
                  <FaSortDown />
                </span>

                {/* Expandable Questions Box */}
                <ul
                className="flex flex-col relative">
                  {stats && (
                    <motion.div 
                    initial={{opacity:0, height:0, scaleY:1.2}}
                    animate={{opacity:1, height:"", scaleY:1}}
                    transition={{duration:0.5, ease:"easeInOut"}} 
                    style={{height: "100%"}}
                    className="flex flex-col gap-1 md:gap-2 py-1 px-1 absolute w-[11rem] md:w-[13rem]
                    bg-gradient-to-b from-sky-400/10 to-sky-600/10 backdrop-blur-sm
                    rounded-xl border-2 border-sky-400 shadow-lg shadow-sky-900/20
                    -left-14"
                    >
                      {[
                        {id: 1, text:`${`${htmlcssQuestions.length} ` + t("training.heroSection.stats.question")}`, icon1:<FaHtml5 className="text-orange-500" />, icon2:<FaCss3Alt className="text-blue-500" /> },
                        {id: 2, text:`${`${jsQuestions.length} ` + t("training.heroSection.stats.question")}`, icon1:<RiJavascriptFill className="text-yellow-500" />},
                        {id: 3, text:`${`${reactQuestions.length} ` + t("training.heroSection.stats.question")}`, icon1:<FaReact className="text-sky-500" />},
                        {id: 4, text:`${`${customQuestions.length} ` + t("training.heroSection.stats.question")}`, icon1:<FaTerminal className="text-gray-300" />},
                      ].map((q, i) => (
                        <motion.li
                        initial={{opacity:0, y:-10}}
                        animate={{opacity:1, y:0}}
                        transition={{delay: i * 0.2, duration: 0.2}}
                        key={q.id}
                        className="flex items-center gap-2 pr-3 rounded-xl px-3
                        py-1 border-2 hover:scale-105 transition-all duration-200
                        from-sky-500/10 bg-gradient-to-r to-sky-100/10">
                          <p 
                          className="flex items-center gap-1 text-[1rem] md:text-[1.2rem]">
                            {q.icon1}
                            {q.icon2} :
                          </p>
                          
                          <span className="text-[0.8rem] md:text-[1rem]">
                            {q.text}
                          </span>
                      </motion.li>
                      ))}
                  </motion.div>
                  )}
                </ul>
              </div>

              {/* Categories button */}
              <div 
              className="flex flex-col justify-center items-center group relative">
                <button 
                aria-label="Show total amount of quiz types"
                onClick={() => {
                  setCategories(!categories);
                  setStats(false);
                }}
                aria-expanded={stats} // 👈 tells screen readers if it's open
                aria-controls="questions-menu" // 👈 links button with dropdown
                className="flex flex-col items-center cursor-pointer border-2 border-dashed 
                border-sky-400 px-4 py-2 rounded-xl bg-slate-900/50 transition-all 
                duration-200 shadow-md shadow-sky-900/40 hover:bg-sky-400/10 
                hover:border-sky-300 hover:scale-105"
                >
                  <span 
                  className="text-xl font-extrabold text-white group-hover:text-sky-300">
                    4
                  </span>

                  <span className="text-sm">
                    {t("training.heroSection.Categories")}
                  </span>
                </button>

                <span 
                className="-translate-y-2 text-2xl text-sky-400 pointer-events-none
                group-hover:scale-125 group-hover:-translate-y-1 
                transition-transform duration-200">
                  <FaSortDown />
                </span>

                <ul
                aria-label="Expandable categories box" 
                className="flex relative">
                  {/* Expandable Categories Box */}
                  {categories && (
                    <motion.div 
                    initial={{opacity:0, height:0, scaleY:1.2}}
                    animate={{opacity:1, height:"", scaleY:1}}
                    transition={{duration:0.5}} 
                    style={{height: "100%"}}
                    className="flex flex-col gap-1 p-1 absolute w-[10rem] md:w-[12rem]
                    bg-gradient-to-r from-sky-500/30 to-sky-900/30 
                    rounded-xl border-2 border-sky-400 shadow-lg shadow-sky-900/20
                    -left-16 top-0"
                    >
                      {[
                      {id: 1, text:`${t("training.heroSection.categories.htmlCss")}`, icon1:<FaHtml5 className="text-orange-500" />, icon2:<FaCss3Alt className="text-blue-500" /> },
                      {id: 2, text:`${t("training.heroSection.categories.javascript")}`, icon1:<RiJavascriptFill className="text-yellow-500" />},
                      {id: 3, text:`${t("training.heroSection.categories.react")}`, icon1:<FaReact className="text-sky-500" />},
                      {id: 4, text:`${t("training.heroSection.categories.custom")}`, icon1:<FaTerminal className="text-gray-300" />},
                      ].map((q, i) => (
                        <motion.li
                        initial={{opacity:0, y:-10}}
                        animate={{opacity:1, y:0}}
                        transition={{delay: i * 0.2, duration: 0.2}}
                        key={q.id}
                        className="flex items-center gap-2 pr-3 rounded-xl px-3
                        py-1 border-2 hover:scale-105 transition-all duration-200
                        from-sky-500/10 bg-gradient-to-r to-sky-100/10">
                          <p 
                          className="flex items-center gap-1 text-[1rem] md:text-[1.2rem]">
                            {q.icon1}
                            {q.icon2} :
                          </p>
                          
                          <span className="text-[0.8rem] md:text-[1rem]">
                            {q.text}
                          </span>
                        </motion.li>
                      ))}
                      
                    </motion.div>
                  )}
                </ul>
              </div>

              {/* Updates stat */}
              <div 
              aria-label="Updates stat"
              className="flex flex-col items-center bg-slate-900/40 px-4 py-2
              h-20 rounded-xl shadow-md shadow-sky-900/40 border border-sky-700/40">
                <span 
                className={`font-extrabold text-white text-center
                ${i18n.language === "ka" ? "text-md" : "text-lg"}`}
                >
                  {t("training.heroSection.Updates.week")}
                </span>

                <span className="text-sm">
                  {t("training.heroSection.Updates.Update")}
                </span>
              </div>
            </div>

          </div>

          {/* Right Illustration Placeholder */}
          <motion.div 
          aria-label="Right illustration image"
          initial={{opacity:0, y:30}}
          animate={{opacity:1, y:0}}
          transition={{duration: 1.5}}
          className="relative flex justify-center items-center z-0">
            <img
            src="/Coding-amico.png" // replace with your own illustration
            alt="Coding Illustration"
            className="hidden lg:block max-w-xl 
            drop-shadow-[0_4px_20px_rgba(56,189,248,0.4)]"
            />

            <img 
            src="/Coding-amico.png" 
            alt="Coding Illustration" 
            className="lg:hidden absolute bottom-1/2 md:-right-[20rem] md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            opacity-20 pointer-events-none min-w-[25rem] max-w-[28rem] 
            md:opacity-30 md:min-w-[35rem]"
            />
          </motion.div>

          {["{ }", "< />", "()"].map((symbol, i) => (
              <motion.span
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 6 + i, delay: i }}
              className="absolute text-indigo-500/40 md:text-6xl text-3xl font-mono"
              style={{ top: `${20 + i * 15}%`, left: `${10 + i * 30}%` }}
              >
                {symbol}
              </motion.span>
            ))}

          {/* Floating Code Elements */}
          <div
          aria-label="Quotes" 
          className="inset-0 z-0 overflow-hidden hidden md:block">
            <p 
            className="md:absolute text-blue-300 text-sm opacity-40 
            md:left-[25rem] bottom-14 block">
              {`{${t("training.heroSection.quotes.quote2")}}`}
            </p>

            <p className="md:absolute text-blue-300 text-sm opacity-40 
            md:left-1/6 top-1/2 block">
             
              {`<${t("training.heroSection.quotes.quote1")}/>`}
            </p>

            <p className="md:absolute text-blue-300 text-sm opacity-40 
            md:right-[5rem] top-10 block">
              {`<${t("training.heroSection.quotes.quote3")} />`}
            </p>
          </div>
        
        </section>
        
        <section 
        id="sec1" 
        className="w-full flex items-start justify-start">
          <div 
          className="py-16 w-full backdrop-blur-lg relative border-r-2
          bg-gradient-to-tr from-[#0f172a] via-[#1e2a48] to-[#111827]
          shadow-xl border-y-2 border-blue-200 md:min-h-[40rem]">

            {/* Badge */}
            <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute top-4 right-4 bg-gradient-to-b from-sky-400 to-sky-800
            text-white font-semibold px-4 py-1 rounded-full text-sm shadow-md border-2 flex items-center gap-1"
            >
              <LuBrainCircuit className="text-xl" />
              {t("training.htmlCss.core")}
            </motion.div>

            {/* Info Modal */}
            <AnimatePresence>
              {infoHTMLCSS && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-sky-950/40 backdrop-blur-sm flex items-center 
                justify-center z-50"
                onClick={() => setInfoHTMLCSS(false)}
                >
                  <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none">
                    {randomStars.map((star, index) => (
                      <div
                      key={index}
                      className="absolute rounded-full bg-gradient-to-br from-sky-300/50 to-sky-900/50"
                      style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        opacity: star.opacity,
                        boxShadow: `0 0 3px rgba(255,255,255,0.8)`,
                      }}
                      />
                    ))}
                  </div>

                  <motion.div
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ ease: "easeInOut" }}
                  className="bg-gradient-to-b from-slate-800/80 to-slate-900/70 border-[1.8px] 
                  border-sky-500 rounded-xl px-3 md:px-6 py-5 max-w-lg relative"
                  onClick={(e) => e.stopPropagation()}
                  >
                    <span 
                    className="absolute -inset-5 z-10 rounded-xl border-2 border-sky-500 shadow-lg 
                    pointer-events-none htmlcss-shadow" />
                    
                    <IoClose
                    onClick={() => setInfoHTMLCSS(false)}
                    className="absolute right-2 top-2 text-xl cursor-pointer hover:scale-110 
                    hover:text-sky-100 text-sky-300 transition-all duration-200"
                    />

                    <h2 
                    className="text-[1.1rem] md:text-xl font-bold text-sky-300 mb-3 text-center 
                    flex items-center gap-1 border-b pb-1 border-cyan-300">
                      <LuBrainCircuit className="text-xl md:text-2xl" /> 
                      {t("training.htmlCss.Info.rules")}
                    </h2>

                    <ul className="space-y-2">
                      {[
                        { id: 1, icon: <TbHexagonNumber1Filled />, text: `${t("training.htmlCss.Info.rule1")}` },
                        { id: 2, icon: <TbHexagonNumber2 />, text: `${t("training.htmlCss.Info.rule2")}`},
                        { id: 3, icon: <TbHexagonNumber3Filled />, text: `${t("training.htmlCss.Info.rule3")}`},
                        { id: 4, icon: <TbHexagonNumber4 />, text: `${t("training.htmlCss.Info.rule4")}` },
                        { id: 5, icon: <TbHexagonNumber5Filled />, text: `${t("training.htmlCss.Info.rule5")}` },
                        { id: 6, icon: <TbHexagonNumber6 />, text: `${t("training.htmlCss.Info.rule6")}` },
                        { id: 7, icon: <TbHexagonNumber7Filled />, text: `${t("training.htmlCss.Info.rule7")}` },
                      ].map((rule, index) => (
                        <motion.li
                        key={rule.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 py-1 text-sky-200"
                        >
                          <p 
                          className={`text-sky-400 sm:text-[1rem] md:text-[1.4rem]`}>
                            {rule.icon}
                          </p>

                          <h2 
                          className={`${i18n.language === "ka"
                          ? "text-xs sm:text-[0.8rem] md:text-[0.9rem]"
                          : "text-sm sm:text-[1rem] md:text-[1.1rem]"
                          }`}>
                            <Trans
                            i18nKey={`training.htmlCss.Info.rule${rule.id}`}  // 👈 dynamic key per rule
                            components={{
                              red: <span className="text-red-500 font-semibold underline" />,
                              green: <span className="text-green-500 font-semibold underline" />
                            }}
                            />
                          </h2>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
              {/* Content */}
              <div 
              className="max-w-7xl mx-auto px-8 md:px-20 flex flex-col items-start 
              gap-10 relative z-10 md:w-full">

                {/* Title */}
                <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-3xl font-extrabold tracking-wide
                z-20 md:text-4xl lg:text-5xl"
                >
                  <span className="text-[#E34F26] drop-shadow-lg">HTML</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-[#1572B6] drop-shadow-lg">CSS</span>
                </motion.div>

                <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
                viewport={{ once: true }}
                className={`text-blue-200 backdrop-blur-sm z-5 border-2 p-3 rounded-sm 
                max-w-[100rem] flex flex-col gap-3 bg-blue-900/10
                ${i18n.language === "ka" 
                ? "text-xs sm:text-sm md:text-md lg:text-[1rem]" 
                : "text-[0.9rem] sm:text-md md:text-lg"}`}
                >
                  {/* First paragraph */}
                  <p className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber1Filled 
                    className="text-cyan-300 flex-shrink-0 mt-0.5 text-lg lg:text-2xl" />
                    <span>
                      <Trans
                      i18nKey="training.htmlCss.p1"
                      components={{
                        highlight: <span className="font-semibold text-sky-300" />,
                        em: <em className="text-sky-500" />
                      }}
                      />
                    </span>
                  </p>

                  {/* Second paragraph */}
                  <p className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber2 
                    className="text-cyan-300 flex-shrink-0 mt-0.5 text-lg lg:text-2xl" />
                    <span>
                      <Trans
                      i18nKey="training.htmlCss.p2"
                      components={{
                      highlight: <span className="font-semibold text-sky-300" />,
                      normal: <span className="text-blue-200" />,
                      strong: <strong className="text-sky-400" />
                      }}
                      />
                    </span>
                  </p>
                </motion.div>

                {/* Floating Icons */}
                <div 
                className="w-full lg:hidden flex justify-center items-center top-[6rem] 
                text-[12rem] sm:text-[14rem] md:text-[18rem] fixed z-0 opacity-40">
                  <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  >
                    <FaHtml5 className="text-[#E34F26] drop-shadow-[0_4px_12px_rgba(227,79,38,0.6)] relative -translate-x-7 -translate-y-6" />
                  </motion.div>

                  <motion.div 
                  animate={{ y: [0, 15, 0] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                  >
                    <FaCss3Alt className="text-[#1572B6] drop-shadow-[0_4px_12px_rgba(21,114,182,0.6)] relative -translate-x-10 translate-y-7" />
                  </motion.div>
                </div>

                {/* Buttons */}
                <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="flex items-center gap-3 z-10 mt-4"
                >
                  <button
                  onClick={() => navigate("/HtmlCss")}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r 
                  from-sky-500 to-sky-600 text-cyan-200 font-semibold shadow-lg 
                  hover:scale-105 hover:shadow-xl transition flex items-center gap-2 cursor-pointer 
                  hover:from-sky-400 hover:text-sky-50"
                  >
                    {t("training.htmlCss.buttons.start")} 
                    <LuBrainCircuit />
                  </button>

                  <button
                  onClick={() => setInfoHTMLCSS(!infoHTMLCSS)}
                  className="relative px-8 py-4 rounded-xl border border-sky-400 text-sky-400 bg-white/5 backdrop-blur-md hover:bg-sky-500/30 hover:text-white hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                  >
                    {t("training.htmlCss.buttons.info")} <TiInfoLargeOutline />

                    {/* Ripple Effect */}
                    <span className="absolute inset-0 rounded-xl border border-sky-400 animate-pulseSlow opacity-0 [animation-delay:1s]" />
                  </button>
                </motion.div>

              </div>

              <div 
              className="w-full hidden lg:flex justify-evenly items-center z-0
              lg:text-[12rem] xl:text-[20rem]">
                <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  <FaHtml5 className="text-[#E34F26] drop-shadow-[0_4px_20px_rgba(227,79,38,0.6)] 
                  relative -translate-x-7 -translate-y-6" />
                </motion.div>

                <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                >
                  <FaCss3Alt 
                  className="text-[#1572B6] drop-shadow-[0_4px_20px_rgba(21,114,182,0.6)] 
                  relative -translate-x-10 translate-y-7" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section 
        id="sec2" 
        className="w-full flex items-end justify-end">
          <div 
          className="py-16 w-full shadow-xl border-y-2 border-amber-500 backdrop-blur-lg relative
          md:min-h-[40rem] flex flex-row-reverse justify-between items-center
          bg-gradient-to-tl from-[#0f172a] via-[#48441e]/50 to-[#111827]">
            
            <div>
              {/* Badge */}
              <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute top-4 left-4 bg-gradient-to-b from-yellow-500 
              to-amber-800 text-amber-200 font-semibold px-4 py-1 rounded-full text-sm 
              shadow-md border-2 flex items-center gap-1"
              >
                {t("training.javascript.intermediate")}
                <IoLogoElectron className="text-xl" />
              </motion.div>

              {/* Info Modal */}
              <AnimatePresence>
                {infoJS && (
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-yellow-900/40 backdrop-blur-sm flex 
                  items-center justify-center z-50"
                  onClick={() => setInfoJS(false)}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {randomStars.map((star, i) => (
                        <CgBee
                        key={i}
                        className="absolute text-indigo-100/30 drop-shadow-lg"
                        style={{
                          top: star.top,
                          left: star.left,
                          fontSize: star.size,
                          opacity: star.opacity,
                          transform: `rotate(${star.rotate})`,
                        }}
                        />
                      ))}
                    </div>

                    <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ ease: "easeInOut" }}
                    className="bg-gradient-to-br border-[1.8px] border-amber-300 rounded-xl 
                    px-3 md:px-6 py-5 max-w-lg relative from-yellow-500 via-yellow-400/80 
                    to-yellow-600"
                    onClick={(e) => e.stopPropagation()}
                    >
                      <span className="absolute -inset-5 z-10 rounded-xl border-2 border-amber-200 shadow-lg pointer-events-none js-shadow" />

                      <IoClose
                      onClick={() => setInfoJS(false)}
                      className="absolute right-2 top-2 text-xl cursor-pointer hover:scale-110 
                      hover:text-yellow-200 text-yellow-100 transition-all duration-200"
                      />

                      <h2 
                      className="text-[1.1rem] md:text-xl font-bold text-yellow-200 mb-3 text-center flex items-center gap-1 border-b pb-1 border-yellow-100">
                        <LuBrainCircuit className="text-xl md:text-2xl" />
                        {t("training.javascript.Info.rules")}
                      </h2>

                      <ul className="space-y-2">
                        {[
                          { id: 1, icon: <TbHexagonNumber1Filled /> },
                          { id: 2, icon: <TbHexagonNumber2 /> },
                          { id: 3, icon: <TbHexagonNumber3Filled /> },
                          { id: 4, icon: <TbHexagonNumber4 /> },
                          { id: 5, icon: <TbHexagonNumber5Filled /> },
                          { id: 6, icon: <TbHexagonNumber6 /> },
                          { id: 7, icon: <TbHexagonNumber7Filled /> },
                        ].map((rule, index) => (
                          <motion.li
                          key={rule.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 py-1 text-amber-100"
                          >
                            {/* Icon sizing matches HTML/CSS modal */}
                            <p 
                            className={`text-yellow-200 sm:text-[1rem] md:text-[1.4rem]`}>
                              {rule.icon}
                            </p>

                            {/* Dynamic text sizing for ka vs en */}
                            <h2
                            className={`${i18n.language === "ka"
                            ? "text-xs sm:text-[0.8rem] md:text-[0.9rem]"
                            : "text-sm sm:text-[1rem] md:text-[1.1rem]"
                            }`}
                            >
                              <Trans
                              i18nKey={`training.javascript.Info.rule${rule.id}`}
                              components={{
                                red: (
                                  <span className="text-red-500 font-semibold underline" />
                                ),
                                green: (
                                  <span className="text-green-500 font-semibold underline" />
                                ),
                              }}
                              />
                            </h2>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <div className="max-w-[85rem] mx-auto px-8 md:px-20 flex flex-col items-end gap-10 relative z-10">
                {/* Title */}
                <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-4xl sm:text-[2rem] md:text-[3rem]
                font-extrabold tracking-wide z-20"
                >
                  <span 
                  className="text-[#F7DF1E] drop-shadow-[0_4px_12px_rgba(247,223,30,0.7)]">
                    {t("training.javascript.heading")}
                  </span>
                </motion.div>

                {/* Description */}
                <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
                viewport={{ once: true }}
                className={`text-yellow-200 border-2 p-3 rounded-sm backdrop-blur-sm z-5
                max-w-[100rem] lg:min-w-[40rem] flex flex-col gap-3 bg-gradient-to-b from-yellow-300/1 to-yellow-500/20 
                ${i18n.language === "ka" 
                ? "text-xs sm:text-sm md:text-md lg:text-[1rem]" 
                : "text-[0.9rem] sm:text-md md:text-[1rem] lg:text-[1.2rem]"}`}
                >
                  {/* First paragraph */}
                  <p className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber1Filled 
                    className="text-yellow-300 text-lg lg:text-2xl flex-shrink-0 mt-0.5" />

                    <span>
                      <Trans
                      i18nKey="training.javascript.p1"
                      components={{
                        highlight: <span className="font-semibold text-amber-300" />,
                        em: <em className="text-yellow-500" />,
                      }}
                      />
                    </span>
                  </p>

                  {/* Second paragraph */}
                  <p className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber2 
                    className="text-yellow-300 text-lg md:text-2xl flex-shrink-0 mt-0.5" />
                    <span>
                      <Trans
                      i18nKey="training.javascript.p2"
                      components={{
                        highlight: <span className="font-semibold text-amber-300" />,
                        normal: <span className="text-yellow-100" />,
                        strong: <strong className="text-yellow-400" />,
                      }}
                      />
                    </span>
                  </p>
                </motion.div>

                {/* Floating Icon */}

                <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full flex justify-center items-center top-1/2 bottom-1/2 fixed z-0
                text-[19rem] sm:text-[21rem] md:text-[23rem] lg:hidden"
                >
                  <RiJavascriptFill 
                  className="text-[#F7DF1E]/30 drop-shadow-[0_4px_16px_rgba(247,223,30,0.6)]" />
                </motion.div>


                {/* Buttons */}
                <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="flex items-center gap-3 z-10 mt-4"
                >
                  <button
                  onClick={() => navigate("/JavaScript")}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 
                font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 
                  flex items-center gap-2 cursor-pointer text-amber-700 hover:text-amber-200
                  hover:from-amber-300"
                  >
                    {t("training.javascript.buttons.start")} <LuBrainCircuit />
                  </button>

                  <button
                  onClick={() => setInfoJS(!infoJS)}
                  className="px-8 py-4 rounded-xl border border-amber-400 text-amber-300 
                  bg-white/5 backdrop-blur-md hover:bg-amber-500/20 hover:text-amber-100 
                  hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                  >
                    {t("training.javascript.buttons.info")} <TiInfoLargeOutline />
                  </button>
                </motion.div>
              </div>
            </div>

            <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-full lg:flex items-center justify-center text-[17rem] 
            opacity-80 z-0 hidden lg:text-[20rem] xl:text-[30rem]"
            >
              <RiJavascriptFill 
              className="text-[#F7DF1E] drop-shadow-[0_4px_16px_rgba(247,223,30,0.6)]" />
            </motion.div>
          </div>
        </section>

        <section
        id="sec3"
        className="w-full flex items-start justify-start"
        >
          <div
          className="py-16 w-full backdrop-blur-lg relative border-r-2
          bg-gradient-to-l from-[#1e3948] to-[#111827]
          shadow-xl border-y-2 border-cyan-500/40 md:min-h-[40rem]
          flex items-center justify-between"
          >
            <div>
              {/* Badge */}
              <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute top-4 right-4 bg-gradient-to-b from-cyan-400 
              to-cyan-800 text-cyan-100 font-semibold px-4 py-1 rounded-full 
              text-sm shadow-md border-2 flex items-center gap-1"
              >
                {t("training.react.advanced")}
                <FaReact className="text-xl" />
              </motion.div>

              {/* Info Modal */}
              <AnimatePresence>
                {infoReact && (
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-sky-950/40 backdrop-blur-sm flex 
                  items-center justify-center z-50"
                  onClick={() => setInfoReact(false)}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {randomStars.map((star, i) => (
                        <LiaAtomSolid
                        key={i}
                        className="absolute text-indigo-100/30 drop-shadow-lg"
                        style={{
                          top: star.top,
                          left: star.left,
                          fontSize: star.size,
                          opacity: star.opacity,
                          transform: `rotate(${star.rotate})`,
                        }}
                        />
                      ))}
                    </div>

                    <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ ease: "easeInOut" }}
                    className="bg-gradient-to-br border-[1.8px] border-cyan-300 
                    rounded-xl px-3 md:px-6 py-5 max-w-lg relative 
                    from-cyan-900 via-cyan-700/70 to-cyan-800"
                    onClick={(e) => e.stopPropagation()}
                    >
                      <span
                      className="absolute -inset-5 z-10 rounded-xl border-2 
                      border-cyan-400 shadow-md pointer-events-none react-shadow"
                      />
                      <IoClose
                      onClick={() => setInfoReact(false)}
                      className="absolute right-2 top-2 text-xl cursor-pointer
                      hover:scale-110 hover:text-cyan-300 text-cyan-400"
                      />

                      {/* Heading matches HTML/CSS + JS version */}
                      <h2
                      className="text-[1.1rem] md:text-xl font-bold text-cyan-300 mb-3 text-center 
                      flex items-center gap-1 border-b pb-1 border-cyan-400"
                      >
                        <LuBrainCircuit className="text-xl md:text-2xl" />
                        {t("training.react.Info.rules")} 
                      </h2>

                      <ul className="space-y-2">
                        {[
                          { id: 1, icon: <TbHexagonNumber1Filled /> },
                          { id: 2, icon: <TbHexagonNumber2 /> },
                          { id: 3, icon: <TbHexagonNumber3Filled /> },
                          { id: 4, icon: <TbHexagonNumber4 /> },
                          { id: 5, icon: <TbHexagonNumber5Filled /> },
                          { id: 6, icon: <TbHexagonNumber6 /> },
                          { id: 7, icon: <TbHexagonNumber7Filled/> }
                        ].map((rule, index) => (
                          <motion.li
                            key={rule.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 py-1 text-cyan-100"
                          >
                            {/* Icon sizing aligned with other modals */}
                            <p className={`text-cyan-200 sm:text-[1rem] md:text-[1.4rem]`}>
                              {rule.icon}
                            </p>

                            {/* Dynamic text sizing based on language */}
                            <h2
                            className={`${i18n.language === "ka"
                            ? "text-xs sm:text-[0.8rem] md:text-[0.9rem]"
                            : "text-sm sm:text-[1rem] md:text-[1.1rem]"
                            }`}
                            >
                              <Trans
                              i18nKey={`training.react.Info.rule${rule.id}`}
                              components={{
                                red: (
                                  <span className="text-red-500 font-semibold underline" />
                                ),
                                green: (
                                  <span className="text-green-500 font-semibold underline" />
                                ),
                              }}
                              />
                            </h2>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <div 
              className="max-w-[85rem] mx-auto px-8 md:px-20 flex flex-col items-start 
              gap-10 relative z-10"
              >
                {/* Title */}
                <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-4xl md:text-5xl font-extrabold tracking-wide"
                >
                  <span 
                  className="text-[#00d5ff] drop-shadow-[0_4px_12px_rgba(0,213,255,0.7)]">
                    {t("training.react.heading")}
                  </span>
                </motion.div>

                <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
                viewport={{ once: true }}
                className={`text-cyan-100 backdrop-blur-sm lg:min-w-[38rem]
                z-5 border-2 p-4 rounded-sm max-w-[100rem] flex flex-col 
                gap-3 bg-gradient-to-b from-cyan-700/10 to-cyan-800/50
                ${i18n.language === "ka" 
                ? "text-xs sm:text-sm md:text-md lg:text-[1rem]" 
                : "text-[0.9rem] sm:text-md md:text-[1rem] lg:text-[1.2rem]"}`}
                >
                {/* First paragraph */}
                  <p className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber1Filled 
                    className="text-cyan-300 text-lg md:text-2xl flex-shrink-0 mt-0.5" />

                    <span>
                      <Trans
                      i18nKey="training.react.p1"
                      components={{
                        highlight: <span className="font-semibold text-cyan-400" />,
                        em: <em className="text-cyan-500" />,
                      }}
                      />
                    </span>
                  </p>

                  {/* First paragraph */}
                  <p 
                  className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber2 
                    className="text-cyan-300 text-lg md:text-2xl flex-shrink-0 mt-0.5" />

                    <span>
                      <Trans
                      i18nKey="training.react.p2"
                      components={{
                        highlight: <span className="font-semibold text-cyan-400" />,
                        em: <em className="text-cyan-500" />,
                      }}
                    />
                    </span>
                  </p>

                </motion.div>

                {/* Icon */}
                <div
                className="w-full flex justify-center items-center text-[18rem] 
                fixed z-0 top-1/2 bottom-1/2  lg:hidden sm:text-[21rem] md:text-[23rem]"
                >
                  <FaReact 
                  className="text-[#00d5ff]/50 animate-spin-slow drop-shadow-[0_4px_16px_rgba(0,213,255,0.6)]" />
                </div>

                {/* Buttons */}
                <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="flex items-center gap-3 z-10 mt-4"
                >
                  <button
                  onClick={() => navigate("/React")}
                  className="px-8 py-4 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-600 
                  text-cyan-200 font-semibold shadow-lg hover:scale-105 hover:shadow-xl 
                  transition flex items-center gap-2 cursor-pointer hover:text-cyan-50 hover:from-cyan-400
                  hover:to-cyan-500"
                  >
                    {t("training.react.buttons.start")} 
                    <LuBrainCircuit />
                  </button>

                  <button
                  onClick={() => setInfoReact(!infoReact)}
                  className="px-8 py-4 rounded-xl border border-cyan-400 text-cyan-300 
                  bg-white/5 backdrop-blur-md hover:bg-cyan-500/20 hover:text-white 
                  hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                  >
                    {t("training.react.buttons.info")}  
                    <TiInfoLargeOutline />
                  </button>
                </motion.div>
              </div>
            </div>

            <div
            className="w-full justify-center items-center text-[20rem] z-0
            hidden lg:flex lg:text-[24rem] xl:text-[28rem]"
            >
              <FaReact 
              className="text-[#00d5ff]/50 animate-spin-slow drop-shadow-[0_4px_16px_rgba(0,213,255,0.6)]" />
            </div>
          </div>
        </section>

        <section 
        id="sec4" 
        className="w-full flex items-start justify-end">
          <div 
          className="py-16 w-full backdrop-blur-lg relative flex-row-reverse flex
          bg-gradient-to-l from-[#111827] via-[#22003ca9] to-[#0f172a]
          shadow-xl border-y-2 border-indigo-500/40 md:min-h-[40rem]
          justify-between items-center">

            <div>
              {/* Floating background symbols */}
              {["{ }", "< />", "()"].map((symbol, i) => (
                <motion.span
                key={i}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 6 + i, delay: i }}
                className="absolute text-indigo-500/40 md:text-6xl text-4xl font-mono"
                style={{ 
                  top: `${20 + i * 15}%`, 
                  left: `${10 + i * 30}%` 
                }}
                >
                  {symbol}
                </motion.span>
              ))}

              {/* Badge */}
              <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute top-4 left-4 bg-gradient-to-b from-[#6e00ec] 
              to-slate-800 text-sky-200 font-semibold px-4 py-1 rounded-full text-sm 
              shadow-md border-2 flex items-center gap-1"
              >
                <Trans i18nKey="training.random.popular" />
                <PiFireSimpleLight className="text-xl" /> 
              </motion.div>

              {/* Info Modal */}
              <AnimatePresence> 
                {infoRLQ && (
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-indigo-950/85 bg-opacity-30 
                  md:backdrop-blur-md backdrop-blur-sm flex items-center justify-center z-50"
                  onClick={() => setInfoRLQ(false)}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {randomStars.map((star, i) => (
                        <PiStarThin 
                        key={i}
                        className="absolute text-indigo-100/30 drop-shadow-lg"
                        style={{
                          top: star.top,
                          left: star.left,
                          fontSize: star.size,
                          opacity: star.opacity,
                          transform: `rotate(${star.rotate})`,
                          rotate: Math.floor(Math.random() * star)
                        }}
                        />
                      ))}
                    </div>

                    <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ ease: "easeInOut" }}
                    className="bg-gradient-to-tl border-[1px] border-indigo-100 rounded-xl 
                    px-3 md:px-4 py-5 max-w-lg text-indigo-700 relative 
                  from-indigo-950 via-indigo-900 to-indigo-950"
                    onClick={(e) => e.stopPropagation()}
                    >
                      <span 
                      className="absolute -inset-5 z-10 rounded-xl border-2 
                      border-indigo-300 random-shadow pointer-events-none" 
                      />

                      <IoClose 
                      onClick={() => setInfoRLQ(false)}
                      className="absolute right-2 top-2 text-xl cursor-pointer
                      hover:scale-110 hover:text-indigo-300 text-indigo-400"
                      />

                      {/* Heading updated to match other modals */}
                      <h2 
                      className={`font-bold text-indigo-300 mb-3 text-center 
                      flex items-center gap-1 border-b pb-1 border-indigo-200
                      ${i18n.language === "ka" ? "text-sm sm:text-[1rem] md:text-[1.1rem]" : "text-md md:text-2xl"}`}
                      >
                        <LuBrainCircuit className="text-2xl md:text-3xl"/> 
                        <Trans i18nKey="training.random.Info.rules" />
                      </h2>

                      <ul className="space-y-2">
                        {[
                          { id: 1, icon: <TbHexagonNumber1Filled /> },
                          { id: 2, icon: <TbHexagonNumber2 /> },
                          { id: 3, icon: <TbHexagonNumber3Filled /> },
                          { id: 4, icon: <TbHexagonNumber4 /> },
                          { id: 5, icon: <TbHexagonNumber5Filled /> },
                          { id: 6, icon: <TbHexagonNumber6 /> },
                          { id: 7, icon: <TbHexagonNumber7Filled/>}
                        ].map((rule, index) => (
                          <motion.li
                          key={rule.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 py-1 text-indigo-100"
                          >
                            {/* Icon sizing unified */}
                            <p 
                            className={`text-indigo-200 text-md sm:text-[1rem] md:text-[1.4rem]`}>
                              {rule.icon}
                            </p>

                            {/* Dynamic font size for KA vs EN */}
                            <h2 
                            className={`${i18n.language === "ka"
                            ? "text-xs sm:text-[0.8rem] md:text-[0.9rem]"
                            : "text-sm sm:text-[1rem] md:text-[1.1rem]"
                            }`}
                            >
                              <Trans
                              i18nKey={`training.random.Info.rule${rule.id}`}
                              components={{
                                red: <span className="text-red-500 font-semibold underline" />,
                                green: <span className="text-green-500 font-semibold underline" />
                              }}
                              />
                            </h2>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <div className="max-w-[85rem] mx-auto px-8 md:px-20 flex flex-col items-end gap-10 relative z-10">

                {/* Title */}
                <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex items-center justify-end gap-3 font-extrabold tracking-wide z-20"
                >
                  <span 
                  className={`text-[#8000ff] drop-shadow-[0_4px_12px_rgba(128,0,255,0.7)]
                  ${i18n.language === "ka" ? "text-[2rem] md:text-[2.5rem]" : "text-[2.5rem] md:text-[3.2rem]"}`}>
                    <Trans 
                    i18nKey="training.random.heading" />
                  </span>
                </motion.div>

                {/* Description */}
                <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
                viewport={{ once: true }}
                className={`text-indigo-200 backdrop-blur-md z-5 border-2 p-4 rounded-md 
                max-w-[100rem] flex flex-col gap-3 bg-indigo-900/20 xl:min-w-[40rem]
                ${i18n.language === "ka" 
                ? "text-xs sm:text-sm md:text-md lg:text-[1rem]" 
                : "text-[0.9rem] sm:text-md md:text-[1rem] lg:text-[1.2rem]"}`}
                >
                  {/* First paragraph */}
                  <p className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber1Filled 
                    className="text-indigo-400 text-lg md:text-2xl flex-shrink-0 mt-0.5" />
                    <span>
                      <Trans
                      i18nKey="training.random.p1"
                      components={{
                        highlight: <span className="font-semibold text-indigo-300" />,
                        em: <em className="text-indigo-400" />
                      }}
                      />
                    </span>
                  </p>

                  {/* Second paragraph */}
                  <p className="leading-relaxed gap-2 flex items-start">
                    <TbHexagonNumber2 
                    className="text-indigo-400 text-lg md:text-2xl flex-shrink-0 mt-0.5" />
                    <span>
                      <Trans
                      i18nKey="training.random.p2"
                      components={{
                        highlight: <span className="font-semibold text-indigo-300" />,
                        strong: <strong className="text-indigo-300" />
                      }}
                      />
                    </span>
                  </p>
                </motion.div>

                {/* Floating Icon */}
                <motion.div 
                animate={{ y: [0, -15, 0] }} 
                className="w-full flex justify-center items-center top-1/2 bottom-1/2 
                fixed z-0 pointer-events-none lg:hidden text-[20rem] sm:text-[22rem] md:text-[24rem]"
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut" 
                }}>
                  <FaTerminal 
                  className="text-[#8000ff]/50 drop-shadow-[0_4px_12px_rgba(128,0,255,0.6)] relative -translate-x-7 -translate-y-6" />
                </motion.div>
                

                {/* Buttons */}
                <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="flex items-center gap-3 z-10 mt-4 justify-end"
                >
                  <button
                  onClick={() => navigate("/Custom")}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-indigo-100 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition flex items-center gap-2 cursor-pointer hover:from-indigo-500"
                  >
                    <Trans i18nKey="training.random.buttons.start" /> 
                    <LuBrainCircuit />
                  </button>

                  <button
                  onClick={() => setInfoRLQ(!infoRLQ)}
                  className="px-8 py-4 rounded-xl border border-indigo-400 text-indigo-200 bg-white/5 backdrop-blur-md hover:bg-indigo-500/30 hover:text-white hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Trans i18nKey="training.random.buttons.info" /> 
                    <TiInfoLargeOutline />
                  </button>
                </motion.div>

              </div>
              
            </div>

            <motion.div 
            animate={{ y: [0, -15, 0] }} 
            className="w-full lg:flex justify-center items-center text-[24rem] 
            z-0 pointer-events-none hidden lg:text-[28rem]"
            transition={{ 
              repeat: Infinity, 
              duration: 6, 
              ease: "easeInOut" 
            }}>
              <FaTerminal 
              className="text-[#8000ff]/50 drop-shadow-[0_4px_12px_rgba(128,0,255,0.6)] relative -translate-x-7 -translate-y-6" />
            </motion.div>

          </div>
        </section>

        {/* Final Section */}
        <section 
        aria-label="About Section"
        className="relative w-full max-w-[90rem] mx-auto my-2 px-4 md:px-12 py-12
        bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]
        rounded-3xl shadow-2xl border border-sky-500/20
        overflow-hidden"
        >
          {/* Background blobs */}
          <div 
          className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/20 rounded-full 
          blur-3xl animate-pulse" />
          <div 
          className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full 
          blur-3xl animate-pulse-slow" />

          {/* Subtle grid pattern */}
          <div 
          className="absolute inset-0
          bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

          {/* Floating code symbols */}
          {["{ }", "< />", "()"].map((symbol, i) => (
            <span
            key={i}
            className="absolute text-sky-400/10 text-7xl font-mono animate-spin-slow"
            style={{ top: `${20 + i * 25}%`, left: `${15 + i * 30}%` }}
            >
              {symbol}
            </span>
          ))}

          {/* Section Title */}
          <div 
          className="text-center relative z-10 mb-14">
            <h2 
            className={`font-extrabold bg-clip-text text-transparent 
            ${i18n.language === "ka" 
            ? "text-[2.3rem] md:text-[2.3rem]" 
            : "text-[2.2rem] md:text-[2.4rem]"}
            bg-gradient-to-r from-sky-300 to-indigo-700 pb-3`}>
              {t("lastSec.heading")}
            </h2>

            <div 
            className="h-1 w-24 mx-auto bg-gradient-to-r from-sky-400 to-indigo-700 
            rounded-full" />

            <p 
            className={`mt-6 text-blue-200/80 max-w-2xl mx-auto
            ${i18n.language === "ka" 
            ? "text-[0.97rem] md:text-[1rem]" 
            : "text-[1.2rem] md:text-[1.1rem]"}`}>
              {t("lastSec.p1")}
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            
            {/* Profile Card */}
            <div className="group relative flex flex-col items-center text-center p-10 rounded-2xl
            bg-gradient-to-br from-slate-800/60 to-sky-900/60 backdrop-blur-xl
            border border-sky-400/20 shadow-xl transition-all duration-500 hover:-translate-y-2 
            hover:shadow-sky-700/50">
              
              <h2 
              className={`absolute top-2 left-4 font-semibold border-2 px-3 rounded-full 
              border-indigo-300 text-sky-300 flex items-center gap-1
              ${i18n.language === "ka" 
              ? "text-[0.8rem] md:text-[0.9rem]" 
              : "text-[0.9rem] md:text-[1rem]"}`}>
                {t("lastSec.creator")}
                <TbUserCode />
              </h2>

              {/* Glow accent dot */}
              <div 
              className="absolute top-4 right-4 w-3 h-3 bg-sky-400 rounded-full 
              shadow-sky-400 shadow-md" />
              
              <img 
              className="w-28 h-28 rounded-full border-4 border-sky-400 shadow-lg mb-6"
              src="/luka.jpg" 
              alt="Creator"
              />

              <h3 
              className={`font-bold text-sky-300
              ${i18n.language === "ka" 
              ? "text-[1.2rem] md:text-[1.4rem]" 
              : "text-[1.5rem] md:text-[1.7rem]"}`}>
                {t("lastSec.creator2")}
              </h3>
              
              <p className="text-blue-200/80 text-sm mt-1">
                {t("lastSec.role")}
              </p>
              
              <span className="text-blue-300/70 text-xs mt-1">{t("lastSec.age")} {new Date().getFullYear() - 2003}</span>

              <div className="flex gap-4 mt-6">
                {[
                  {icon: <CiLinkedin size={26}/>, href:"https://www.linkedin.com/in/luka-kartvelishvili-976475351"},
                  {icon: <FaGithub size={26}/>, href:""},
                  {icon: <CiInstagram size={26}/>, href:"https://www.instagram.com/luka_kartvelishvili2"}
                ].map((link, i) => (
                  <a key={i} href={link.href} target="_blank" 
                    className="p-2 rounded-full bg-sky-400/10 border border-sky-400/20 
                    text-sky-400 hover:bg-sky-400/20 hover:scale-110 transition">
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            
            {/* Roadmap / Future Plans */}
            <div className="relative flex flex-col p-10 rounded-2xl
            bg-gradient-to-br from-slate-800/60 to-indigo-900/60 backdrop-blur-xl
            border border-indigo-400/20 shadow-xl
            transition-all duration-500 hover:-translate-y-2 hover:shadow-indigo-600/40">

              {/* Glow Accent */}
              <div 
              className="absolute top-4 right-4 w-3 h-3 bg-indigo-400 rounded-full 
              shadow-indigo-400 shadow-md"/>

              {/* Title */}
              <h3 
              className={`absolute top-2 left-4 font-semibold border-2 px-3 rounded-full 
              border-indigo-300 text-indigo-300 flex items-center gap-1
              ${i18n.language === "ka" 
              ? "text-[0.8rem] md:text-[0.9rem]" 
              : "text-[0.9rem] md:text-[1rem]"}`}>
                {t("lastSec.box2")}
                <MdTimeline />
              </h3>

              {/* Timeline */}
              <div className="mt-8 relative">
                <div 
                className="absolute left-[5px] top-2 bottom-0 w-0.5 bg-gradient-to-b 
                from-sky-400/40 via-indigo-400/50 to-transparent" 
                />

                <ul 
                className={`ml-10 space-y-8 text-blue-200/90 relative
                ${i18n.language === "ka" 
                ? "text-[0.8rem] md:text-[1rem]" 
                : "text-[0.9rem] md:text-[1rem]"}`}>

                  {[
                    `${t("lastSec.ul.li1")}`,
                    `${t("lastSec.ul.li2")}`,
                    `${t("lastSec.ul.li3")}`,
                    `${t("lastSec.ul.li4")}`,
                    `${t("lastSec.ul.li5")}`
                  ].map((plan, i) => (
                    <li 
                    key={i} 
                    className="relative group">
                      {/* Timeline dot */}
                      <span 
                      className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-indigo-400 
                      ring-6 ring-indigo-400/20 group-hover:scale-110 group-hover:bg-sky-400 transition-transform" 
                      />

                      {/* Text */}
                      <p 
                      className="leading-relaxed group-hover:text-sky-200 transition-colors">
                        {plan}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Help/Resources */}
            <div 
            className="relative flex flex-col items-start p-10 rounded-2xl
            bg-gradient-to-br from-slate-800/60 to-yellow-700/60 backdrop-blur-xl
            border border-sky-400/20 shadow-xl
            transition-all duration-500 hover:-translate-y-2 hover:shadow-sky-700/50">
              
              <div 
              className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full shadow-amber-400 shadow-md"/>
              
              <h3 
              className={`absolute top-2 left-4 font-semibold border-2 px-3 rounded-full 
              border-amber-400 text-yellow-300 flex items-center gap-1
              ${i18n.language === "ka" 
              ? "text-[0.8rem] md:text-[0.9rem]" 
              : "text-[0.9rem] md:text-[1rem]"}`}>
                {t("lastSec.box3")}
                <MdTimeline />
              </h3>

              <nav className="mt-5 space-y-2">
                {[
                  {id: 1, text: `${t("lastSec.box3Nav.heropatterns")}`, hover: "hover:text-purple-500",
                  icon: <TbBackground/>, link: "https://heropatterns.com"},
                  
                  {id: 2, text: `${t("lastSec.box3Nav.React icons")}`, hover: "hover:text-rose-500",
                  icon: <FaReact />, link: "https://react-icons.github.io/react-icons"},

                  {id: 3, text: `${t("lastSec.box3Nav.getwaves.io")}`, hover: "hover:text-blue-500",
                  icon: <TbWaveSquare />, link: "https://getwaves.io"},

                  {id: 4, text: `${t("lastSec.box3Nav.ChatGPT")}`, hover: "hover:text-slate-400",
                  icon: <FaRobot />, link: "https://chatgpt.com"},

                  {id: 5, text: `${t("lastSec.box3Nav.i18n")}`, hover: "hover:text-sky-600",
                  icon: <MdLanguage />},
                ].map((source) => (
                  <ul
                  className="py-1"
                  key={source.id}
                  >
                    <li>
                      <a
                      className={`flex items-center gap-1 ${source.hover} transition-all
                      duration-200 hover:scale-105 font-light
                      ${i18n.language === "ka" 
                      ? "text-[1rem] md:text-[1.1rem] lg:text-[1.2rem]" 
                      : "text-[1.1rem] md:text-[1.2rem] lg:text-[1.3rem]"}`} 
                      href={source.link}
                      target="_blank"
                      >
                        <span
                        className="text-[1.1rem] md:text-[1.5rem]"
                        >
                          {source.icon}
                        </span>

                        {source.text}
                      </a>
                    </li>
                  </ul>
                ))}
              </nav>
                
            </div>
          </div>
        </section>
      </main>

      {/* Animated Gradient SVG */}
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="w-full h-20 md:h-44"
      >
        <defs>
          <linearGradient 
          id="grad-indigo" 
          x1="0" y1="0" 
          x2="1" y2="1">
            <stop 
            offset="0%" 
            stopColor="#1e3a8a">
              <animate
              attributeName="stop-color"
              values="#1e3a8a;#4338ca;#1e3a8a"
              dur="8s"
              repeatCount="indefinite"
              />
            </stop>

            <stop 
            offset="100%" 
            stopColor="#4f46e5">
              <animate
              attributeName="stop-color"
              values="#4f46e5;#6366f1;#4f46e5"
              dur="8s"
              repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Rounded cube-like pattern */}
        <path
        fill="#3965d2"
        d="
        M0,192 Q30,160 60,192   L60,144 
        Q90,112 120,144 L120,192 Q150,160 180,192 L180,160 
        Q210,128 240,160 L240,208 Q270,176 300,208 L300,176 
        Q330,144 360,176 L360,224 Q390,192 420,224 L420,176 
        Q450,144 480,176 L480,224 Q510,192 540,224 L540,160 
        Q570,128 600,160 L600,208 Q630,176 660,208 L660,144 
        Q690,112 720,144 L720,192 Q750,160 780,192 L780,160 
        Q810,128 840,160 L840,208 Q870,176 900,208 L900,176 
        Q930,144 960,176 L960,224 Q990,192 1020,224 L1020,192 
        Q1050,160 1080,192 L1080,240 Q1110,208 1140,240 L1140,176 
        Q1170,144 1200,176 L1200,224 Q1230,192 1260,224 L1260,160 
        Q1290,128 1320,160 L1320,208 Q1350,176 1380,208 L1380,176 
        Q1410,144 1440,176 L1440,320 L0,320 Z
        "
        />

        <path
        fill="#11192a"
        fillOpacity="1"
        d="M0,256 Q40,224 80,256 L80,208 Q120,176 160,208 L160,256 
        Q200,224 240,256 L240,224 Q280,192 320,224 L320,272 
        Q360,240 400,272 L400,240 Q440,208 480,240 L480,288 
        Q520,256 560,288 L560,240 Q600,208 640,240 L640,288 
        Q680,256 720,288 L720,224 Q760,192 800,224 L800,272 
        Q840,240 880,272 L880,208 Q920,176 960,208 L960,256 
        Q1000,224 1040,256 L1040,224 Q1080,192 1120,224 L1120,272 
        Q1160,240 1200,272 L1200,208 Q1240,176 1280,208 L1280,256 
        Q1320,224 1360,256 L1360,224 Q1400,192 1440,224 L1440,320 
        L0,320 Z
        "
        />
      </svg>

      <footer 
      className="w-full text-blue-200 text-sm text-center pb-5
      bg-gradient-to-t from-[#0d1f48] via-[#20315c] to-[#11192a] relative"
      >

        {/* Scroll to Top */}
        <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`text-blue-400 hover:text-blue-200 pt-10 
        text-lg cursor-pointer hover:scale-110 transition-all 
        duration-200 mt-3 hover:-translate-y-1 text-center 
        ${i18n.language === "ka" ? "text-[15px]" : "text-md"}`}
        >
          <IoCaretUpOutline 
          className={`text-2xl ${i18n.language === "ka" ? "ml-3" : "ml-1"}`} />
          {t("footer.top")}
        </button>

        {/* Sections */}
        <nav 
        className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 
        md:grid-cols-5 gap-5 text-blue-200 text-sm md:text-base
        border-2 border-blue-500/40 rounded-xl mt-5 bg-[#1f2937]/70"
        >
          <FooterSection 
          title={t("footer.help")} 
          icon={FiHelpCircle} 
          items={[
            { label:t("footer.howtoplay"), path:"#"}, 
            { label:t("footer.cantStart"), path:"#"}, 
            { label:t("footer.bug"), path:"#"}, 
            { label:t("footer.more"), path:"#"}
          ]}/>

          <FooterSection 
          title={t("footer.resources")}
          icon={FiBookOpen} 
          items={[
            { label:t("footer.docs"), path:"#"}, 
            { label:t("footer.blog"), path:"#"}, 
            { label:t("footer.repo"), path:"#"}, 
            { label:t("footer.community"), path:"#"}
          ]}/>

          <FooterSection 
          title={t("footer.contact")}
          icon={FiMail} 
          items={[
            { label: t("footer.email"), path:"#"}, 
            { label: t("footer.linkedin"), path:"#"}, 
            { label: t("footer.instagram"), path:"#"}, 
            { label: t("footer.feedback"), path:"#"}
          ]}/>

          <FooterSection 
          title={t("footer.about")} 
          icon={FiInfo} 
          items={[
            { label: t("footer.aboutApp"), path:"#"}, 
            { label: t("footer.purpose"), path:"#"}, 
            { label: t("footer.stack"), path:"#"}, 
            { label: t("footer.changelog"), path:"#"}
          ]}/>

          <FooterSection 
          title={t("footer.quiz")} 
          icon={FiClipboard} 
          items={[
            { label: t("footer.htmlcss"), path: "/HtmlCss", icon: <FaHtml5 />}, 
            { label: t("footer.js"), path: "/Javascript", icon: <IoLogoJavascript />}, 
            { label: t("footer.react"), path: "/React", icon: <FaReact/>}, 
            { label: t("footer.custom"), path: "/custom", icon: <FaTerminal/>}
          ]}/>
        </nav>

        {/* Social + Language */}
        <div 
        className="w-full bg-gradient-to-br from-[#0f172a] via-[#111827]
        my-5 flex md:flex-row flex-col gap-5 px-5 md:px-10 py-5 to-[#1e293b] items-center
        border-t-2 border-b-2 border-blue-800 justify-evenly"
        >
          {/* Social Icons */}
          <div className="flex gap-5 items-center justify-center pb-2">
            <h1 className="font-semibold text-xl hidden sm:block">
              {t("footer.social.followUs")}
            </h1>

            <ul className="flex gap-3 text-xl">
              {[
                {id: 1, symbol: <FaFacebookSquare />, text: "text-blue-400", effect: "hover:text-sky-400", link: "https://www.facebook.com/"},
                {id: 2, symbol: <FaInstagram/>, text: "text-pink-400", effect: "hover:text-pink-300", link: "https://www.instagram.com/"}, 
                {id: 3, symbol: <FaYoutube/>, text: "text-red-500", effect: "hover:text-red-400", link: "https://www.youtube.com/"}, 
                {id: 4, symbol: <FaTiktok/>, text: "text-gray-400", effect: "hover:text-gray-300", link: "https://www.tiktok.com/en/"}, 
                {id: 5, symbol: <FaThreads/>, text: "text-blue-300", effect: "hover:text-blue-100", link: "https://www.threads.com/"}
              ].map((icon) => (
                <a
                target="_blank"
                href={icon.link}
                key={icon.id}
                className={`hover:scale-110 transition-all duration-200 text-3xl
                ${icon.effect} bg-[#354863] p-2 rounded-full flex ${icon.text}
                items-center gap-1 group`}
                >
                  {icon.symbol}
                </a>
              ))}
            </ul>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 relative">
            <h1 
            className="font-semibold text-sm md:text-xl md:block hidden pb-2">
              {t("footer.social.language")}
            </h1>
            
            <button
            onClick={() => setLanguageBox2(!languageBox2)}
            className="flex items-center gap-2 bg-[#404f64] py-1 
            rounded-md cursor-pointer px-4 group border border-blue-500/40"
            >
              <img
              className="md:w-5 w-4"
              src={languages[selectedLang]?.image || "US.png"}
              alt="selected flag"
              />

              <span className="text-2xl">
                {languages[selectedLang]?.label || "English"}
              </span>

              <FaAngleDown
              className={`${languageBox2 ? "rotate-180 transition-transform duration-200" : ""}`}
              />
            </button>

            {languageBox2 && (
              <div 
              className="bg-[#253853] rounded-md w-35 h-20
              absolute bottom-10 flex flex-col px-1.5 justify-evenly border border-blue-500/40"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    setSelectedLang(code);
                    setLanguageBox2(false);
                  }}
                  className={`flex items-center justify-start gap-2 cursor-pointer
                  hover:bg-[#5072c1] p-1 rounded-[5px] transition-all duration-150
                  ${selectedLang === code ? "bg-gradient-to-b from-[#294586] to-[#3e557a]" : ""}`}
                  >
                    <img 
                    className="w-6" 
                    src={lang.image} 
                    alt={lang.label} 
                    />
                    
                    {lang.text}
                  </button>
                ))}
              </div>  
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div 
        className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-5 
        text-xs md:text-sm text-center md:text-left text-blue-200/80"
        >
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-1 cursor-default">
            {t("footer.copyright", { year: new Date().getFullYear() })} 
            <PiHeartHalfFill className="text-rose-500 hearth-shrink" /> 
            {t("footer.rights")}
          </h1>
          <p className="break-words max-w-full">
            {randomFact}
          </p>

          <p 
          className="font-light text-blue-300/60 w-full text-end px-2 sm:hidden">
            Version 1.0
          </p>
        </div>

        <p className="font-light text-blue-300/60 w-full text-center px-2 hidden sm:block">
          Version 1.0
        </p>
      </footer>

    </div>
  )
}

export default Training;