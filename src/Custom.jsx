import { useState, useEffect, useRef } from "react";
import { customQuestions } from "./questions";
import SideNav from "./SideNav.jsx"
import Header from "./Header/Header.jsx";
import QuizSection from "./QuizSection.jsx"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiThink, GiPartyPopper, GiPerspectiveDiceSixFacesRandom  } from "react-icons/gi";
import { CiWarning, CiBoxList } from "react-icons/ci";
import { FaTerminal, FaFacebookSquare, FaRocket, FaLeaf, FaCog,
  FaGamepad, FaListAlt } from "react-icons/fa";
import { FaInstagram, FaThreads, FaTiktok, FaYoutube, FaAngleRight, 
FaAngleLeft, FaAngleDown, FaHashtag } from "react-icons/fa6";
import { PiHeartHalfFill, PiGraphFill } from "react-icons/pi";
import { IoPlaySkipForward, IoCaretUpOutline } from "react-icons/io5";
import { BsPatchQuestionFill } from "react-icons/bs";
import { LuPlus, LuBrainCircuit, LuBookOpenText } from "react-icons/lu";
import { useTranslation, Trans } from "react-i18next";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiHelpCircle, FiBookOpen, FiMail, FiInfo, FiClipboard } from 'react-icons/fi';
import { IoMdClose } from "react-icons/io"
import { AiFillFire } from "react-icons/ai";

function Custom() {
  /*---------------------------------------------- */
  //language changer
  //t("key") is how you access translated text from your JSON files.
  //i18n - You use it to change languages, access current language, or manage settings.
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
  const [languageBox, setLanguageBox] = useState(false);
/*---------------------------------------------- */

  const [shuffledQuestions, setShuffleQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const current = shuffledQuestions[questionIndex] || {};
  const { id } = current;
  const key = `${current.type}.${current.id}`;
  const question = t(`${key}.question`) || "Quesiton not available";
  const options = Array.isArray(t(`${key}.options`, { returnObjects: true }))
  ? t(`${key}.options`, { returnObjects: true })
  : [];
  const correct = t(`${key}.correct`);
  const explanation = t(`${key}.explanation`) || "Explanation not available";
  const [message, setMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [menu, setMenu] = useState(false);
  const [more, setMore] = useState(false);
  const [mastery, setMastery] = useState("");
  const quizFinished = questionIndex + 1 === shuffledQuestions.length && showAnswers;
  const resultRef = useRef(null);
  const [resultPage, setResultPage] = useState(0); // 0 = stats, 1 = missed

  const rawLevel = t(`custom.${id}.level`); // "<easy>easy</easy>"
  const match = rawLevel.match(/<(\w+)>/); // e.g., "<hard>რთული</hard>"
  const currentDifficulty = match ? match[1] : "easy"; // "hard", "medium", or "easy"

  const scrollToPage = (page) => {
    const container = resultRef.current;
    if (container) {
      const scrollX = page * container.offsetWidth;
      container.scrollTo({ left: scrollX, behavior: "smooth" });
      setResultPage(page);
    }
  };
  const navigate = useNavigate();
  const facts = t("footerFacts", {returnObjects: true});
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  const currentAnswer = userAnswers[questionIndex];
  const alreadyAnswered = !!currentAnswer?.selected && showAnswers;
  const [questions, setQuestions] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const masteryLevels = [
    { 
      label: `${t("quizLevels.level1")}`, min: 0, 
      color: "bg-gradient-to-b from-[#cd7f32] to-[#b87333] text-orange-200 border-2 border-orange-200", 
      icon: <img src="level_1.png" alt="Level-1"></img>, 
    },
    { 
      label: `${t("quizLevels.level2")}`, min: 25, 
      color: "bg-gradient-to-br from-[#c0c0c0] to-[#a9a9a9] text-slate-200 border-2 border-slate-100", 
      icon: <img src="level_2.png" alt="Level-2"></img>, 
    },
    { 
      label: `${t("quizLevels.level3")}`, min: 50, 
      color: "bg-gradient-to-b from-[#e6e8fa] to-[#c0c0c0] text-gray-800 border-2 border-gray-700", 
      icon: <img src="level_3.png" alt="Level-3"></img>, 
    },
    { 
      label: `${t("quizLevels.level4")}`, min: 65, 
      color: "bg-gradient-to-b from-[#50c878] to-[#2e8b57] text-emerald-300 border-2 border-emerald-100", 
      icon: <img src="level_4.png" alt="Level-4"></img>, 
    },
    { 
      label: `${t("quizLevels.level5")}`, min: 80, 
      color: "bg-gradient-to-b from-[#ff4f4f] to-[#d40000] text-rose-200 border-2 border-rose-100", 
      icon: <img src="level_5.png" alt="Level-5"></img>, 
    },
    { 
      label: `${t("quizLevels.level6")}`, min: 90, 
      color: "bg-gradient-to-b from-[#ffd700] to-[#e6c200] text-yellow-900 border-2 border-yellow-100", 
      icon: <img src="level_6.png" alt="Level-6"></img>, 
    },
  ];
  const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const percentage = (correctCount / shuffledQuestions.length) * 100;
  const currentMastery = masteryLevels.findLast(level => percentage >= level.min);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const shuffled = [...customQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
    setShuffleQuestions(shuffled);
    document.title = "Custom"
  }, []);

  useEffect(() => {
    const saved = userAnswers[questionIndex];

    if (saved) {
      setSelectedAnswer(saved.selected);
      setShowAnswers(true); // ✅ Always show red/green if answered
    } else {
      setSelectedAnswer(null);
      setShowAnswers(false);
    }

    setShowExplanation(false);
  }, [questionIndex, userAnswers]);
  
  useEffect(() => {
    const savedData = localStorage.getItem("customProgress"); // ✅ Correct key
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (
        parsed.questions &&
        Array.isArray(parsed.questions) &&
        parsed.questions.length > 0
      ) {
        setShuffleQuestions(parsed.questions);
        setUserAnswers(parsed.answers || {});
        setQuestionIndex(parsed.index || 0);
        setScore(parsed.score || 0);
      }
    }
  }, []);

  useEffect(() => {
    // Reset all progress on first load (even on refresh)
    localStorage.removeItem("customProgress");
    setScore(0);
    setQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setShowAnswers(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "customProgress",
      JSON.stringify({
        questions: shuffledQuestions,
        answers: userAnswers,
        index: questionIndex,
        score,
      })
    );
  }, [userAnswers, questionIndex, score, shuffledQuestions]);

  useEffect(() => {
    if(message){
      setTimeout(() => {
        setMessage(!message);
      }, 8000);
    }
  }, [message]);
  
  function handleSubmit() {
    // Don't allow empty answer
    if (!selectedAnswer) {
      return setMessage("Choose your answer first.");
    }

    // Prevent re-submitting an already answered question
    if (userAnswers[questionIndex]?.selected != null) {
      setMessage("You've already answered this question.");
      return;
    }

    const isCorrect = selectedAnswer === correct;

    // Set score only if this is the first submission
    if (isCorrect) {
      setScore(prev => prev + 1);
      setMessage("Good job!");
    } else {
      setMessage("Oops, wrong logic!");
    }

    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: { selected: selectedAnswer, isCorrect },
    }));

    setShowAnswers(true);

    const isLastQuestion = questionIndex + 1 === shuffledQuestions.length;
    if (isLastQuestion) {
      setUserAnswers(prevAnswers => {
        const allAnswered = { ...prevAnswers };
        for (let i = 0; i < shuffledQuestions.length; i++) {
          if (!allAnswered[i]) {
            allAnswered[i] = { selected: null, isCorrect: false };
          }
        }
        return allAnswered;
      });

      const finalScore = isCorrect ? score + 1 : score;
      setMastery(calculateMastery(finalScore));
      setMenu(true);
      setMessage(
        `You completed the Logic Challenge with a score of ${finalScore} out of ${shuffledQuestions.length}`
      );
    }
  }

  function FooterSection({ title, icon: Icon, items }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
      <div 
      className="border-b-2 pb-3 md:border-2 md:p-5 bg-gradient-to-b hover:scale-101
      md:rounded-2xl hover:from-indigo-800/80 transition-all duration-300">
        <button
        onClick={() => setOpen(!open)}
        className="font-semibold text-indigo-400 mb-2 text-lg w-full 
        flex items-center md:justify-start justify-between cursor-pointer hover:text-indigo-300
        transition-colors duration-200"
        >
          <Icon className="md:inline mr-2 text-indigo-400 hidden" />
          {title}
          <span className="md:hidden">
            <LuPlus className={`${open ? "rotate-45 text-indigo-400" : ""} transition-all`} />
          </span>
        </button>

        {(open || window.innerWidth >= 768) && (
          <ul className="flex flex-col gap-2 text-start">
            {items.map((item, i) => (
              <li 
              key={i}>
                <button
                onClick={() => navigate(item.path)}
                className="hover:text-indigo-400 text-indigo-200 cursor-pointer
                text-sm md:text-md"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen custom text-indigo-100`}>

      <Header showBackButton={true} theme="random" />

      <SideNav
      sections={[
        { id: "customQuiz", icon: <FaGamepad />, style: "text-indigo-600 bg-gradient-to-br from-indigo-900 to-slate-900/50 hover:to-indigo-800 hover:text-indigo-300" },
        { id: "customList", icon: <FaListAlt />, style: "text-indigo-600 bg-gradient-to-br from-indigo-900 to-slate-900/50 hover:to-indigo-800 hover:text-indigo-300" },
        { id: "customGuide", icon: <LuBookOpenText />, style: "text-indigo-600 bg-gradient-to-br from-indigo-900 to-slate-900/50 hover:to-indigo-800 hover:text-indigo-300" },
      ]}
      />

      <main 
      role="main"
      aria-label="Custom Logic Quiz"
      className="flex items-center justify-start flex-col gap-10 md:gap-16 lg:gap-20">
        <div className="flex items-center flex-col">
          <h1 
          className={`md:text-5xl font-extrabold text-center 
          mt-5 flex items-center gap-1 group text-transparent bg-clip-text
          bg-gradient-to-r from-indigo-400 to-indigo-600 pb-3
          ${i18n.language === "ka" ? "text-2xl" : "text-3xl"}`}>
            <GiPerspectiveDiceSixFacesRandom 
            className="group-hover:animate-bounce text-indigo-600"/>
            {t("main.header5")}
          </h1>

          <p 
          className={`text-center text-md mt-5 bg-gradient-to-bl 
          max-w-xl w-full py-2 rounded-md shadow-md font-medium border-1
          from-indigo-700 to-slate-600 flex items-center justify-center
          border-indigo-300
          ${i18n.language === "ka" ? "text-[0.8rem] md:text-[1rem]" : "text-[1rem] md:text-[1.3rem]"}`}>
            {t("main.p5")}
            <FaTerminal 
            className="ml-2 inline text-lg text-slate-200" />
          </p>
        </div>

        <motion.section
        id="customQuiz"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-10
        bg-gradient-to-b from-indigo-900/90 via-indigo-950 to-slate-900
        backdrop-blur-md border-2 border-indigo-300 rounded-2xl shadow-2xl
        py-4 md:py-10 lg:py-12 relative md:max-h-[43rem] lg:max-h-[4rem]
        flex flex-col justify-between min-h-[37rem] md:min-h-[40rem]"
        >
          {showExplanation && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center 
            bg-black/30 backdrop-blur-sm rounded-2xl"
            onClick={() => setShowExplanation(false)}
            >
              <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[90%] max-h-[85vh] 
              bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950
              rounded-2xl shadow-2xl ring-1 ring-indigo-200 
              flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-center px-6 py-4 border-b 
                border-[#784fff]">
                  <div className="flex items-center gap-3">
                    <LuBrainCircuit className="text-3xl text-indigo-300" />
                    <h2 className="text-2xl font-bold text-indigo-200">
                      {t("main.explanation")}
                    </h2>
                  </div>
                </div>

                {/* Question ID */}
                <div className="flex justify-center mt-2">
                  <span className="flex items-center gap-1 px-5 py-1 rounded-full 
                  bg-gradient-to-r from-indigo-500/80 to-indigo-600/80 
                  text-xl font-bold text-[#f1ebff] shadow-md">
                    <FaHashtag />
                    {id}
                  </span>
                </div>

                {/* Body */}
                <div 
                className={`flex-1 overflow-y-auto px-3 pt-5 md:px-6 text-[#d3bdff] leading-relaxed 
                ${i18n.language === "ka" 
                ? "text-[1rem] md:text-[1.3rem]" 
                : "text-[1.2rem] md:text-[1.4rem]"}`
                }>
                  {explanation}
                </div>

                <div 
                className="px-6 py-4 border-t border-[#784fff] flex justify-center">
                  <button
                  onClick={() => setShowExplanation(false)}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 
                  text-white font-semibold rounded-xl shadow-lg hover:text-[#d3bdff]
                  hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {menu && (
            <div className="fixed inset-0 z-30 bg-black/70 flex justify-center items-center 
            p-2 rounded-2xl">
              <div
              className="relative w-full max-w-4xl bg-gradient-to-br from-indigo-950 to-indigo-900
              border-2 border-indigo-700 text-indigo-100 rounded-2xl shadow-2xl p-2 md:p-6 
              backdrop-blur-md max-h-[90vh] overflow-y-auto md:px-12"
              >
                {/* Scroll Container */}
                <div
                ref={resultRef}
                className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-container 
                scroll-smooth"
                >
                  {/* Page 1 - Quiz Stats */}
                  <section className="min-w-full snap-center shrink-0 p-4 pb-24">
                    <h2 
                    className={`font-bold text-indigo-300 text-center mb-6 flex items-center 
                    gap-2 justify-center border-b border-indigo-600 pb-4
                    ${i18n.language === "ka" ? "text-[1.2rem] md:text-[1.5rem]" : "text-[1.3rem] md:text-[1.8rem]"}`}>
                      <GiPartyPopper size={26}/>
                      {t("main.challengecomplete")}
                    </h2>

                    <h3 
                    className={`font-bold mb-6 flex items-center gap-2 text-indigo-300
                    ${i18n.language === "ka" ? "text-[1rem] md:text-[1.3rem]" : "text-[1.1rem] md:text-[1.4rem]"}`}>
                      <PiGraphFill className="text-3xl" />
                      {t("main.quizstats")}
                    </h3>

                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-2 sm:px-4">
                      <li 
                      className="bg-indigo-700/30 p-4 rounded-lg border border-indigo-600">
                        <span className="block text-[0.8rem] md:text-[1rem] text-indigo-200">
                          {t("main.totalquestions")}:
                        </span>
                        <strong className="text-lg md:text-xl">
                          {shuffledQuestions.length}
                        </strong>
                      </li>

                      <li className="bg-green-600/30 p-4 rounded-lg border border-green-500">
                        <span 
                        className="block text-[0.8rem] md:text-[1rem] text-green-100">
                          {t("main.correctanswers")}:
                        </span>

                        <strong className="text-lg md:text-xl">
                          {Object.values(userAnswers).filter((a) => a.isCorrect).length}
                        </strong>
                      </li>

                      <li className="bg-rose-600/30 p-4 rounded-lg border border-rose-500">
                        <span 
                        className="block text-[0.8rem] md:text-[1rem] text-rose-100">
                          {t("main.wronganswers")}:
                        </span>

                        <strong className="text-lg md:text-xl">
                            {Object.values(userAnswers).filter((a) => a.selected && !a.isCorrect).length}
                       </strong>
                      </li>

                      <li className="bg-slate-600/30 p-4 rounded-lg border border-slate-500">
                        <span 
                        className="block text-[0.8rem] md:text-[1rem] text-slate-100">
                          {t("main.skipped")}:
                        </span>

                        <strong className="text-lg md:text-xl">
                          {Object.values(userAnswers).filter((a) => a.selected === null).length}
                        </strong>
                      </li>

                      <li className="bg-blue-600/30 p-4 rounded-lg border border-blue-500">
                        <span 
                        className="block text-[0.8rem] md:text-[1rem] text-blue-100">
                          {t("main.accuracy")}:
                        </span>

                        <strong className="text-lg md:text-xl">
                          {((Object.values(userAnswers).filter((a) => a.isCorrect).length / shuffledQuestions.length) * 100).toFixed(1)}%
                        </strong>
                      </li>

                      <li className="bg-yellow-600/30 p-4 rounded-lg border border-yellow-500">
                        <span className="block text-[0.8rem] md:text-[1rem] text-yellow-100">
                          {t("main.finalscore")}
                        </span>
                        <strong className="text-lg md:text-xl">{score}</strong>
                      </li>
                    </ul>
                  </section>

                  {/* Page 2 - Missed + Mastery */}
                  <section className="min-w-full snap-center shrink-0 p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-6">

                      {/* Title */}
                      <h2 className={`font-bold text-indigo-300 text-center mb-2 flex items-center justify-center gap-2 border-b border-indigo-600 pb-4
                        ${i18n.language === "ka" 
                        ? "text-[1rem] md:text-[1.5rem]" 
                        : "text-[1.2rem] md:text-[1.6rem]"}`}>
                        <PiGraphFill className="text-3xl" />
                        {t("main.insightmastery")}
                      </h2>

                      {/* Most Missed */}
                      <div>
                        <h4 className={`font-semibold text-indigo-200 mb-2
                        ${i18n.language === "ka" 
                        ? "text-[1.1rem] md:text-[1.3rem]" 
                        : "text-[1.3rem] md:text-[1.5rem]"}`}>
                          {t("main.mostmissed")}
                        </h4>

                        {Object.values(userAnswers).filter((a) => a.selected && !a.isCorrect).length > 0 ? (
                          <ul className="flex flex-wrap gap-2">
                            {Object.entries(userAnswers)
                              .filter(([_, a]) => a.selected && !a.isCorrect)
                              .slice(0, 5)
                              .map(([id]) => (
                                <span
                                key={`missed-${id}`}
                                className="bg-red-600/30 px-3 py-1 rounded-md border border-red-500 text-sm text-red-100"
                                >
                                  # {id}
                                </span>
                              ))}
                          </ul>
                        ) : (
                          <p className="text-indigo-200 text-sm italic">
                            {t("main.noincorrectanswers")}
                          </p>
                        )}
                      </div>

                      {/* Mastery Levels Grid */}
                      <div>
                        <h4 className={`font-semibold text-indigo-200 mb-3
                          ${i18n.language === "ka" ? "text-[1.1rem] md:text-[1.3rem]" : "text-[1.3rem] md:text-[1.5rem]"}`}>
                          {t("main.yourmasterylevel")}
                        </h4>

                        <div 
                        className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-[25rem] md:max-w-[46rem] mb-5">
                          {masteryLevels.map((level) => (
                            <div
                            key={level.label}
                            className={`flex items-center gap-2 font-semibold rounded-2xl
                            ${level.color} ${i18n.language === "ka" ? "px-1" : "px-4"}
                            ${level.label === currentMastery?.label 
                              ? "opacity-100 ring-[2px] ring-indigo-400 py-2 rank-shadow" 
                              : "opacity-40"}`}
                            >
                              <span className="min-w-[3.5rem] max-w-[3.5rem] md:min-w-[4rem] md:max-w-[4rem]">
                                {level.icon}
                              </span>
                              <span 
                              className={`
                              ${i18n.language === "ka" ? "text-[0.8rem] md:text-[1rem]" : "text-[1rem] md:text-[1.1rem]"}`}>
                                {level.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6 flex items-center justify-center gap-4">
                      <button
                      onClick={() => {
                        setScore(0);
                        setQuestionIndex(0);
                        setUserAnswers({});
                        setMessage(false);
                        setSelectedAnswer(null);
                        setShowAnswers(false);
                        setMenu(false);
                        localStorage.removeItem("customQuizProgress");

                        const reshuffled = [...customQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
                        setShuffleQuestions(reshuffled);
                      }}
                      className={`px-5 py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-600 
                      transition-all duration-200 hover:scale-105 cursor-pointer
                      ${i18n.language === "ka" 
                        ? "text-[0.9rem] md:text-[1.1rem]" 
                        : "text-[1rem] md:text-[1.2rem]"}
                      `}
                      >
                        {t("main.tryagain")}
                      </button>

                      <button
                      className={`px-5 py-2 bg-indigo-900 text-indigo-200 rounded-xl hover:bg-indigo-800 
                      transition-all duration-200 hover:scale-105 cursor-pointer
                      ${i18n.language === "ka" 
                        ? "text-[0.9rem] md:text-[1.1rem]" 
                        : "text-[1rem] md:text-[1.2rem]"}`}
                      onClick={() => navigate("/")}
                      >
                        {t("main.gohome")}
                      </button>
                    </div>
                  </section>
                </div>

                {/* Navigation Buttons */}
                <div className="fixed bottom-2 left-0 right-0 flex justify-between gap-4 px-6 mt-4">
                  <button
                  onClick={() => scrollToPage(0)}
                  disabled={resultPage === 0}
                  className={`px-6 py-2 rounded-2xl transition-all text-sm hover:scale-105 cursor-pointer ${
                    resultPage === 0 ? "opacity-30 cursor-not-allowed bg-gray-700" : "bg-indigo-700 text-white hover:bg-indigo-600"
                  }`}
                  aria-label="Previous Stats Page"
                  >
                    <FaAngleLeft />
                  </button>

                  <button
                  onClick={() => scrollToPage(1)}
                  disabled={resultPage === 1}
                  className={`px-6 py-2 rounded-2xl transition-all text-sm hover:scale-105 cursor-pointer ${
                    resultPage === 1 ? "opacity-30 cursor-not-allowed bg-gray-700" : "bg-indigo-700 text-white hover:bg-indigo-600"
                  }`}
                  aria-label="Next Stats Page"
                  >
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/*Flex col-1 */}
          <div>
            {/* Progress Bar */}
            <div 
            className="w-full h-3 bg-slate-800 rounded-full overflow-hidden 
            mb-6 border border-indigo-700">
              <div
              className="h-full bg-gradient-to-l from-indigo-400 to-indigo-800 via-indigo-600
              transition-all duration-300 rounded-r-full"
              style={{
                width: `${((questionIndex + (showAnswers ? 1 : 0)) / shuffledQuestions.length) * 100}%`,
              }}
              />
            </div>

            {/* Message Alert */}
            {message && (
              <div 
              className="md:block flex items-center justify-center">
                <div
                className={`font-medium animate-pulse border py-2 px-4 md:static
                md:w-full rounded-md absolute flex justify-center items-center    
                ${message === "Good job!"
                ? "text-green-500 border-green-500 bg-green-500/30 border-2"
                : "text-rose-400 bg-rose-500/20 border-pink-500 border-2"
                }`}
                >
                  <CiWarning />
                  {message}
                </div>
              </div>
            )}

            {/* Question Header + Score */}
            <div
            className="relative flex flex-col md:flex-row md:justify-between md:items-start 
            mb-2 gap-2 md:px-2 text-start text-indigo-200 md:py-5 md:mt-2 w-full"
            >
              <div className="flex justify-between flex-row-reverse md:flex-col">
                <div className="md:flex items-center md:flex-col md:items-start gap-1 w-full">
                  <div className="flex items-center gap-1 text-indigo-400">
                    <GiThink className="text-2xl" />
                    <h1 className="text-[1rem] md:text-2xl font-bold md:max-w-4xl">
                      {t("main.question")} {questionIndex + 1}/{shuffledQuestions.length}:
                    </h1>
                  </div>

                  <p
                  className={`font-medium md:max-w-[52rem] w-auto mt-[12px] md:w-full
                  border-2 border-indigo-600 rounded-xl p-2
                  bg-gradient-to-r from-indigo-700/50 via-indigo-800/50 to-indigo-900/50
                  text-indigo-100
                  ${i18n.language === "ka" 
                    ? "text-[0.85rem] md:text-[1.2rem]" 
                    : "text-[0.9rem] md:text-[1.4rem]"}`}
                  >
                    {question}
                  </p>
                </div>
              </div>

              {/* Right: Desktop Info Panel (Score + Level unified, Custom indigo theme) */}
              <div className="hidden md:flex items-center">
                <div
                className={`flex items-center gap-4 px-5 py-2.5 rounded-2xl border-2 shadow-md 
                backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                ${
                  currentDifficulty === "easy"
                    ? "border-green-400 bg-gradient-to-r from-green-600/70 via-emerald-500/70 to-green-700/70"
                    : currentDifficulty === "medium"
                    ? "border-cyan-400 bg-gradient-to-r from-indigo-600/70 via-cyan-500/70 to-sky-600/70"
                    : "border-rose-400 bg-gradient-to-r from-indigo-800/70 via-purple-600/70 to-pink-600/70"
                }`}
                >
                  {/* Score */}
                  <div className="flex items-center gap-2">
                    <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">
                      {t("score")}
                    </span>
                    <span className="text-white text-lg font-bold font-mono drop-shadow-sm">
                      {score}
                    </span>
                  </div>

                  {/* Divider */}
                  <span className="h-6 w-[2px] bg-white/30 rounded-full" />

                  {/* Difficulty Level */}
                  <div className="flex items-center gap-2">
                    <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">
                      {t("level")}
                    </span>
                    <Trans
                      i18nKey={t(`custom.${id}.level`)}
                      components={{
                        easy: (
                          <FaLeaf
                            size={20}
                            className="text-green-300 hover:animate-bounce"
                          />
                        ),
                        medium: (
                          <FaCog
                            size={20}
                            className="text-cyan-300 hover:animate-spin"
                          />
                        ),
                        hard: (
                          <AiFillFire
                            size={22}
                            className="text-yellow-300 hover:scale-125 transition-transform duration-200 hover:text-white"
                          />
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile size: score/level/info/id */}
              <div
              className="md:hidden flex items-center justify-between
              bg-gradient-to-r from-indigo-700/50 via-indigo-800/50 to-indigo-900/50
              text-white rounded-xl shadow-lg px-4 py-2"
              >
                {/* Left side: Score */}
                <div
                className="flex items-center justify-center px-3 py-1 text-[1.05rem]
                border-2 rounded-full border-indigo-500 bg-indigo-800/40"
                >
                  <p className="font-mono tracking-wide pr-1 text-indigo-300">Score:</p>
                  <span className="font-mono text-indigo-100">{score}</span>
                </div>

                {/* Middle: Difficulty Icon */}
                <span className="flex items-center rounded-full">
                  <Trans
                  i18nKey={t(`custom.${id}.level`)}
                  components={{
                    easy: (
                      <FaLeaf
                      style={{ boxShadow: "0px 0px 10px rgb(17, 255, 0)", borderRadius: "20px", backgroundColor: "green" }}
                      size={35}
                      className="text-green-300 px-[5px] border-2 border-green-100"
                      />
                    ),
                    medium: (
                      <FaCog
                      style={{ boxShadow: "0px 0px 10px rgb(0, 200, 240)", borderRadius: "20px", backgroundColor: "rgb(0,150,255)" }}
                      size={35}
                      className="text-cyan-200 px-[5px] border-2 border-cyan-100"
                      />
                    ),
                    hard: (
                      <AiFillFire
                      style={{ boxShadow: "0px 0px 10px rgb(255, 0, 0)", borderRadius: "20px", backgroundColor: "red" }}
                      size={35}
                      className="text-rose-300 px-[5px] border-2 border-rose-200"
                      />
                    ),
                  }}
                  />
                </span>

                {/* Right side: Controls */}
                <div className="flex items-center gap-2">
                  {/* Explanation button */}
                  <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
                  >
                    <BsPatchQuestionFill size={24} className="text-indigo-200" />
                  </button>

                  {/* Question ID */}
                  <p
                  className={`font-extrabold text-indigo-100 bg-indigo-800 rounded-full 
                  w-10 h-10 flex items-center justify-center shadow-lg border-2 border-indigo-500 ${
                    id >= 99 ? "px-6" : "px-0"
                  }`}
                  >
                    #{id}
                  </p>
                </div>
              </div>
            </div>

            {/*questions */}
            <ul 
            className="grid grid-cols-1 md:grid-cols-2 sm:gap-2 gap-1 md:pb-8">
              {options?.map((label, index) => {
                const isSelected = selectedAnswer === label;
                const isCorrect = label === correct;
                let style =
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer select-none ";

                if (showAnswers) {
                  if (isCorrect) {
                    style += "bg-gradient-to-b from-[#00cae0] to-[#089e7b] text-green-50 border-green-300";
                  } else if (isSelected) {
                    style += "bg-gradient-to-b from-[#fa008a] to-[#c4002b] text-rose-100 border-rose-300";
                  } else {
                    style += "bg-white/10 text-white border-indigo-500";
                  }
                } else {
                  style += isSelected
                  ? "bg-gradient-to-b from-indigo-800 to-indigo-900 text-white border-indigo-300 scale-102 transition-transform duration-200"
                  : "bg-slate-900/40 hover:text-indigo-200 text-indigo-400 border-indigo-400 hover:border-indigo-200 hover:scale-[1.01] transition-transform duration-200";
                }

                return (
                  <li
                  key={index}
                  className={style}
                  onClick={() => !showAnswers && setSelectedAnswer(label)}
                  >
                    <input
                    disabled={!!userAnswers[questionIndex]}
                    type="radio"
                    value={label}
                    checked={isSelected}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedAnswer(value);

                      setUserAnswers((prev) => {
                        const updated = { ...prev };
                        if (updated[questionIndex]?.selected === null) {
                          delete updated[questionIndex];
                        }
                        return updated;
                      });
                    }}
                    name={`question-${questionIndex}`}
                    className="accent-indigo-500 w-4 h-4 cursor-pointer"
                    />

                    <h1 
                    className={`w-full cursor-pointer font-medium
                    ${i18n.language === "ka" 
                      ? "text-[13px] md:text-[1.1rem]" 
                      : "text-[14px] md:text-[1.2rem]"}`}
                    >
                      {label}
                    </h1>
                  </li>
                );
              })}
            </ul>
          </div>

          {/*Flex col-2 */}
          <div
          className="flex flex-wrap sm:justify-center md:justify-center mt-6
          rounded-2xl border border-indigo-400/80 bg-indigo-900/30 backdrop-blur-xl 
          shadow-lg py-2 gap-4"
          >
            {/* Left side: Question ID */}
            <div className="hidden md:flex items-center text-indigo-100 gap-2 font-mono">
              <span
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-indigo-700/60 
              border border-indigo-400/40 text-2xl"
              >
                <FaHashtag />
                {id}
              </span>
            </div>

            <ul className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {[
                {
                  id: 1,
                  text: t("main.buttons.previous"),
                  icon: <FaAngleLeft />,
                  disabled: questionIndex === 0,
                  showMode: "icon",
                  click: () => {
                    if (questionIndex > 0) {
                      const prevIndex = questionIndex - 1;

                      setQuestionIndex(prevIndex);

                      // Restore selected answer if it exists
                      const prevAnswer = userAnswers[prevIndex]?.selected || "";
                      setSelectedAnswer(prevAnswer);

                      // Show answers if user already answered this question
                      setShowAnswers(!!userAnswers[prevIndex]);
                    }
                  }
                },
                {
                  id: 2,
                  text: t("main.buttons.submit"),
                  icon: <FaRocket />,
                  disabled: showAnswers || alreadyAnswered,
                  showMode: "text",
                  click: handleSubmit,
                },
                {
                  id: 3,
                  text: t("main.buttons.explanation"),
                  icon: <CiWarning />,
                  showMode: "desktop-only",
                  click: () => setShowExplanation(!showExplanation),
                },
                {
                  id: 4,
                  text: t("main.buttons.skip"),
                  icon: <IoPlaySkipForward />,
                  disabled: questionIndex + 1 === shuffledQuestions.length,
                  showMode: "text",
                  click: () => {
                    if (!userAnswers[questionIndex]) {
                      setUserAnswers((prev) => ({
                        ...prev,
                        [questionIndex]: { selected: null, isCorrect: false },
                      }));
                      setShowAnswers(false);
                    } else {
                      setShowAnswers(true);
                    }
                    if (questionIndex + 1 < shuffledQuestions.length) {
                      setQuestionIndex((prev) => prev + 1);
                      setSelectedAnswer("");
                      setShowAnswers(false);
                      setShowExplanation(false);
                      setMessage("");
                    }
                  },
                },
                {
                  id: 5,
                  text: t("main.buttons.next"),
                  icon: <FaAngleRight />,
                  disabled: !showAnswers || questionIndex + 1 === shuffledQuestions.length,
                  showMode: "icon",
                  click: () => {
                    if (questionIndex + 1 < shuffledQuestions.length) {
                      setQuestionIndex(questionIndex + 1);
                      setSelectedAnswer("");
                      setShowAnswers(false);
                      setShowExplanation(false);
                      setMessage("");
                    }
                  },
                },
              ].map((button) => {
                // Desktop-only (Explanation)
                if (button.showMode === "desktop-only") {
                  return (
                    <button
                    key={button.id}
                    onClick={button.click}
                    disabled={button.disabled}
                    className={`hidden md:flex items-center gap-2 px-4 py-3 rounded-xl font-medium
                    transition-all duration-200 cursor-pointer
                    ${i18n.language === "ka" ? "md:text-[1rem] lg:text-[1.2rem]" : "md:text-[1.1rem] lg:text-[1.3rem]"}
                    ${
                      button.disabled
                      ? "bg-indigo-800/40 text-indigo-400 cursor-not-allowed"
                      : "bg-gradient-to-b active:bg-gradient-to-t from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white shadow-sm hover:shadow-md"
                    }`}
                    >
                      {button.icon} {button.text}
                    </button>
                  );
                }

                // Shared style
                return (
                  <button
                  key={button.id}
                  onClick={button.click}
                  disabled={button.disabled}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium
                  transition-all duration-200 cursor-pointer sm:px-2 md:px-6
                  ${
                    i18n.language === "ka" 
                    ? "text-[0.89rem] md:text-[1rem] lg:text-[1.2rem]" 
                    : "text-[1rem] md:text-[1.1rem] lg:text-[1.3rem]"}
                  ${
                    button.disabled
                    ? "bg-indigo-800/40 text-indigo-400 cursor-not-allowed"
                    : "bg-gradient-to-b active:bg-gradient-to-t from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white shadow-sm hover:shadow-md"
                  }`}
                  >
                    {/* Previous / Next (icon-only mobile) */}
                    {button.showMode === "icon" && (
                      <>
                        {button.text === t("main.buttons.previous") ? (
                          <>
                            <span className="">{button.icon}</span>
                            <span className="hidden sm:inline">{button.text}</span>
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">{button.text}</span>
                            <span className="">{button.icon}</span>
                          </>
                        )}
                      </>
                    )}

                    {/* Submit / Skip (text-only mobile, full desktop) */}
                    {button.showMode === "text" && (
                      <div className={`
                       ${i18n.language === "ka" 
                       ? "md:text-[1rem] lg:text-[1.2rem]" 
                       : "md:text-[1.1rem] lg:text-[1.3rem] px-5"}`}>
                        <span className="sm:hidden">
                          {button.text}
                        </span>

                        <span className="hidden sm:flex items-center gap-2">
                          {button.icon}
                          {button.text}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </ul>
          </div>

        </motion.section>

        <section 
        id="customList"
        className="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-10 rounded-lg
        bg-gradient-to-b from-indigo-900/90 via-indigo-950 to-slate-900
        md:rounded-2xl shadow-2xl p-6 relative overflow-hidden
        my-[1rem] md:min-h-[40rem] border border-indigo-300">

          {/* Optional Animated Gradient Border Glow */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-indigo-600/30" />

          <h1
          className={`text-indigo-300 font-semibold pb-2 md:rounded-2xl border
          bg-gradient-to-l from-indigo-700 to-indigo-950 px-6 py-3 rounded-xl
          flex items-center gap-2 tracking-wide mb-7 md:mb-10
          ${i18n.language === "ka" 
            ? "text-[1.1rem] md:text-[1.7rem]" 
            : "text-[1.1rem] md:text-[1.7rem]"}`}
          >
            <CiBoxList className={`text-2xl md:text-4xl`} />
            {t("main.sec2random")}
          </h1>

          <ul 
          className="grid grid-cols-3 md:grid-cols-4  gap-4 
        text-indigo-100 mt-5 overflow-y-auto max-h-[29rem] 
          p-2 pr-3">
            {customQuestions.map((q) => (
              <li
              onClick={() => {
              setQuestions(true);
              setSelectedQuestion(q);
              }}
              key={q.id}
              className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-800 
              rounded-lg py-[12px] flex items-center gap-2 justify-center
              border border-indigo-600/50 shadow-md shadow-indigo-900/40
              hover:scale-105 hover:shadow-xl hover:shadow-indigo-800/60 
              transition-all duration-200 cursor-pointer group"
              >
                <FaHashtag 
                className="text-indigo-300 text-base md:text-xl opacity-80 
                group-hover:text-indigo-100 transition-colors duration-200" 
                />
                <span 
                className="font-mono text-xl md:text-3xl group-hover:text-white transition-colors">
                  {q.id}
                </span>
              </li>
            ))}
          </ul>

          {/* Question Modal */}
          {questions && selectedQuestion && (() => {
            const selectedKey = `${selectedQuestion.type}.${selectedQuestion.id}`;
            const selectedQuestionText = t(`${selectedKey}.question`) || "Question not found";
            const selectedExplanation = t(`${selectedKey}.explanation`) || "Explanation not available";

            return (
              <div 
              onClick={() => setQuestions(false)}
              className="inset-0 bg-gradient-to-b from-black/60 to-black/90 rounded-2xl
              flex flex-col absolute top-0 justify-center items-center py-4 px-2 z-10"
              >
                <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900
                w-[90%] md:w-full max-w-2xl rounded-xl shadow-2xl px-3 py-8 
                md:px-10 md:py-10 text-indigo-100 flex flex-col gap-6
                border-2 border-indigo-700"
                >
                  {/* Close Button */}
                  <button
                  onClick={() => setQuestions(false)}
                  className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-200 
                  text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
                  >
                    <IoMdClose />
                  </button>

                  {/* Question ID Header */}
                  <h2 className="text-center text-indigo-100 text-3xl font-semibold 
                  bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-xl 
                  py-3 flex items-center justify-center gap-1 mx-5
                  border-2 border-indigo-300">
                    <FaHashtag className="text-2xl mt-[1px]" />
                    {selectedQuestion.id}
                  </h2>

                  {/* Question Text */}
                  <div className="flex items-start gap-3 border-b border-indigo-500 pb-4">
                    <div className="pt-1">
                      <BsPatchQuestionFill className="text-indigo-300 text-2xl" />
                    </div>

                    <div 
                    className={`leading-relaxed font-medium text-indigo-100
                    ${i18n.language === "ka" 
                    ? "text-[1rem] sm:text-[1.1rem] md:text-[1.3rem]" 
                    : "text-[1.2rem] sm:text-[1.2rem] md:text-[1.4rem]"}`}>
                      {selectedQuestionText}
                    </div>
                  </div>

                  {/* Explanation Text */}
                  <div className="flex items-start gap-3">
                    <div>
                      <HiOutlineLightBulb className="text-yellow-400 text-2xl" />
                    </div>

                    <div 
                    className={`text-base leading-relaxed text-indigo-200
                    ${i18n.language === "ka" 
                    ? "text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]" 
                    : "text-[1rem] sm:text-[1.1rem] md:text-[1.2rem]"}`}>
                      {selectedExplanation}
                    </div>
                  </div>
                </div>
              </div>
              );
          })()}
        </section>

        <QuizSection
        theme="logic"
        id={id}
        sections={[
          { 
            id: "logic", 
            heading: "Random Quiz Guide", 
          },
        ]}
        />

      </main>

      {/* Animated Gradient SVG */}
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="w-full h-24 md:h-40 opacity-[90%] mt-10"
      >
        <defs>
          <linearGradient id="grad-indigo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a8a">
              <animate
                attributeName="stop-color"
                values="#1e3a8a;#4338ca;#1e3a8a"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#4f46e5">
              <animate
                attributeName="stop-color"
                values="#4f46e5;#6366f1;#4f46e5"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <path
        fill="url(#grad-indigo)"
        d="M0,192L60,192L60,144L120,144L120,192L180,192L180,160L240,160L240,208L300,208L300,176L360,176L360,224L420,224L420,176L480,176L480,224L540,224L540,160L600,160L600,208L660,208L660,144L720,144L720,192L780,192L780,160L840,160L840,208L900,208L900,176L960,176L960,224L1020,224L1020,192L1080,192L1080,240L1140,240L1140,176L1200,176L1200,224L1260,224L1260,160L1320,160L1320,208L1380,208L1380,176L1440,176L1440,224L1440,320L0,320Z"
        />
        <path
        fill="#321D90"
        fillOpacity="0.9"
        d="M0,256L80,256L80,208L160,208L160,256L240,256L240,224L320,224L320,272L400,272L400,240L480,240L480,288L560,288L560,240L640,240L640,288L720,288L720,224L800,224L800,272L880,272L880,208L960,208L960,256L1040,256L1040,224L1120,224L1120,272L1200,272L1200,208L1280,208L1280,256L1360,256L1360,224L1440,224L1440,272L1440,320L0,320Z"
        />
      </svg>

      <footer 
      className="w-full text-indigo-300 md:pt-[2.5rem]
      text-sm text-center pb-5 bg-gradient-to-b from-[#321D90] 
      via-indigo-950 to-slate-900">
        <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className={`text-indigo-400 hover:text-indigo-200 
        text-lg cursor-pointer hover:scale-110 transition-all 
        duration-200 mt-3 hover:-translate-y-1 text-center 
        ${i18n.language === "ka" ? "text-[15px]" : "text-md"}`}
        >
          <IoCaretUpOutline 
          className={`text-2xl ${i18n.language === "ka" ? "ml-3" : "ml-1"}`} />
          {t("footer.top")}
        </button>

        <nav 
        className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-1 
        md:grid-cols-5 gap-5 text-indigo-700 text-sm md:text-base
        border-2 rounded-xl">

        {/* Help Section */}
          <FooterSection 
          title={t("footer.help")} 
          icon={FiHelpCircle}
          items={[
            { label:t("footer.howtoplay"), path:"#"}, 
            { label:t("footer.cantStart"), path:"#"}, 
            { label:t("footer.bug"), path:"#"}, 
            { label:t("footer.more"), path:"#"}
          ]}
          />

          {/* Resources Section */}
          <FooterSection 
          title={t("footer.resources")} 
          icon={FiBookOpen}
          items={[
            { label:t("footer.docs"), path:"#"}, 
            { label:t("footer.blog"), path:"#"}, 
            { label:t("footer.repo"), path:"#"}, 
            { label:t("footer.community"), path:"#"}
          ]}
          />

          {/* Contact Section */}
          <FooterSection 
          title={t("footer.contact")} 
          icon={FiMail}
          items={[
            { label: t("footer.email"), path:"#"}, 
            { label: t("footer.linkedin"), path:"#"}, 
            { label: t("footer.instagram"), path:"#"}, 
            { label: t("footer.feedback"), path:"#"}
          ]} 
          />

          <FooterSection 
          title={t("footer.about")}
          icon={FiInfo}
          items={[
            { label: t("footer.aboutApp"), path:"#"}, 
            { label: t("footer.purpose"), path:"#"}, 
            { label: t("footer.stack"), path:"#"}, 
            { label: t("footer.changelog"), path:"#"}
          ]} 
          />

          <FooterSection 
          title={t("footer.quizzes")} 
          icon={FiClipboard}
          items={[
            { label: t("footer.htmlcss"), path: "/HtmlCss"}, 
            { label: t("footer.js"), path: "/Javascript"}, 
            { label: t("footer.react"), path: "/React"}, 
            { label: t("footer.custom"), path: "/custom"}
          ]}
          />
        </nav>

        <div className="w-full bg-gradient-to-br from-indigo-950 via-indigo-900
        my-5 flex md:flex-row flex-col gap-5 px-5 md:px-10 py-5 to-slate-800 items-center
        border-t-2 border-b-2 border-indigo-600 justify-evenly">
          <div 
          className="flex gap-5 items-center">
            <h1 
            className={`font-semibold hidden sm:block
            ${i18n.language === "ka" ? "text-[1.2rem]" : "text-[1.4rem]"}`}>
              {t("footer.follow")}
            </h1>

            <ul 
            className="flex gap-3 text-xl">
              {[
              {id: 1, symbol: <FaFacebookSquare />, text: "text-blue-400",
              effect: "hover:text-sky-400", link: "https://www.facebook.com/"},

              {id: 2, symbol: <FaInstagram/>, text: "text-rose-400",
              effect: "hover:text-rose-400", link: "https://www.instagram.com/"}, 

              {id: 3, symbol: <FaYoutube/>, text: "text-red-500",
              effect: "hover:text-red-500", link: "https://www.youtube.com/"}, 

              {id: 4, symbol: <FaTiktok/>, text: "text-gray-500",
              effect: "hover:text-gray-300", link: "https://www.tiktok.com/en/"}, 

              {id: 5, symbol: <FaThreads/>, text: "text-emerald-400",
              effect: "hover:text-gray-100", link: "https://www.threads.com/"}
              ].map((icon) => (
                <a
                target="_blank"
                href={icon.link}
                key={icon.id}
                className={`hover:scale-110 transition-all duration-200 text-3xl
                ${icon.effect} bg-indigo-700 p-2 rounded-full flex ${icon.text}
                items-center gap-1 group transition-all duration-200 overflow-x-hidden`}
                >
                  {icon.symbol}
                </a>
              ) )}
            </ul>
          </div>

          <div 
          className="flex items-center gap-2 relative">
            <h1 
            className="font-semibold text-sm md:text-xl md:block hidden">
              {t("footer.language")}
            </h1>

            <button
            onClick={() => setLanguageBox(!languageBox)}
            className="flex items-center gap-2 bg-indigo-700 py-1 
            rounded-md cursor-pointer px-4 group"
            >
              <img
              className="md:w-5 w-4"
              src={languages[i18n.language]?.image || "US.png"}
              alt="selected flag"
              />

              <span className="text-2xl">
                {languages[i18n.language]?.label}
              </span>

              <div>
                <FaAngleDown
                className={`${languageBox ? "rotate-180 transition-transform duration-200" : ""}`}
                />
              </div>
            </button>

            {languageBox && (
              <div 
              className="bg-indigo-900 rounded-md w-35 h-20 border
              absolute bottom-10 flex flex-col px-1.5 justify-evenly">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                  key={code}
                  onClick={() => {
                  i18n.changeLanguage(code);
                  setLanguageBox(false); // optional: close box on selection
                  }}
                  className={`flex items-center justify-start gap-2 cursor-pointer
                hover:bg-indigo-800 hover:text-indigo-100 p-1 rounded-[5px] transition-all duration-150
                  ${i18n.language === code 
                    ? "bg-indigo-600" 
                    : ""}`}
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

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-5 
        text-xs md:text-sm text-center md:text-left">
          <h1 
          className="flex flex-col md:flex-row items-center justify-center gap-1 cursor-default">
            {t("footer.copyright", { year: new Date().getFullYear() })}
            <PiHeartHalfFill className="text-rose-500 hearth-shrink" /> 
            {t("footer.rights")}
          </h1>

          <p className="break-words max-w-full">
            {randomFact}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Custom;