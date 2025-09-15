import { useState, useEffect, useRef } from "react";
import { reactQuestions } from "./questions.js";
import { useTranslation, Trans } from "react-i18next";
import SideNav from "./SideNav.jsx"
import Header from "./Header/Header.jsx";
import QuizSection from "./QuizSection.jsx"
import { CiWarning, CiBoxList } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaFacebookSquare, FaRocket, FaReact, FaLeaf, FaCog,
  FaGamepad, FaListAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { GiThink, GiPartyPopper } from "react-icons/gi";
import { useNavigate } from "react-router-dom"
import { LuPlus, LuBrainCircuit, LuBookOpenText } from "react-icons/lu";
import { PiHeartHalfFill, PiGraphFill } from "react-icons/pi";
import { BsPatchQuestionFill } from "react-icons/bs";
import { IoMdClose} from "react-icons/io"
import { IoClose, IoPlaySkipForward, IoCaretUpOutline } from "react-icons/io5";
import { FaInstagram, FaThreads, FaTiktok, FaYoutube, FaAngleRight, 
FaAngleLeft, FaAngleDown, FaHashtag, } from "react-icons/fa6";
import { AiFillFire } from "react-icons/ai";


function ReactQuiz() {
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

  const rawLevel = t(`react.${id}.level`); // "<easy>easy</easy>"
  const match = rawLevel.match(/<(\w+)>/); // e.g., "<hard>რთული</hard>"
  const currentDifficulty = match ? match[1] : "easy"; // "hard", "medium", or "easy"

  // Map difficulty to Tailwind classes
  const levelColors = {
    easy: "bg-gradient-to-b from-green-500 to-green-600 border-green-100 text-green-100",
    medium: "bg-gradient-to-b from-cyan-300 to-cyan-500 border-cyan-100 text-cyan-100",
    hard: "bg-gradient-to-b from-rose-400 to-red-500 border-rose-100 text-red-200",
  };

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
    { label: `${t("quizLevels.level1")}`, min: 0, 
        color: "bg-gradient-to-b from-[#cd7f32] to-[#b87333] text-orange-200 border-2 border-orange-200", 
        icon: <img src="/level_1.png" alt="Level-1"></img>, 
    },
    { label: `${t("quizLevels.level2")}`, min: 25, 
        color: "bg-gradient-to-br from-[#c0c0c0] to-[#a9a9a9] text-slate-200 border-2 border-slate-100", 
        icon: <img src="/level_2.png" alt="Level-2"></img>, 
    },
    { label: `${t("quizLevels.level3")}`, min: 50, 
        color: "bg-gradient-to-b from-[#e6e8fa] to-[#c0c0c0] text-gray-800 border-2 border-gray-700", 
        icon: <img src="/level_3.png" alt="Level-3"></img>, 
    },
    { label: `${t("quizLevels.level4")}`, min: 65, 
        color: "bg-gradient-to-b from-[#50c878] to-[#2e8b57] text-emerald-300 border-2 border-emerald-100", 
        icon: <img src="/level_4.png" alt="Level-4"></img>, 
    },
    { label: `${t("quizLevels.level5")}`, min: 80, 
        color: "bg-gradient-to-b from-[#ff4f4f] to-[#d40000] text-rose-200 border-2 border-rose-100", 
        icon: <img src="/level_5.png" alt="Level-5"></img>, 
    },
    { label: `${t("quizLevels.level6")}`, min: 90, 
        color: "bg-gradient-to-b from-[#ffd700] to-[#e6c200] text-yellow-900 border-2 border-yellow-100", 
        icon: <img src="/level_6.png" alt="Level-6"></img>, 
    },
  ];
  const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const percentage = (correctCount / shuffledQuestions.length) * 100;
  const currentMastery = masteryLevels.findLast(level => percentage >= level.min);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const shuffled = [...reactQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
    setShuffleQuestions(shuffled);
    document.title = "React"
  }, []);

  useEffect(() => {
    if (userAnswers[questionIndex]) {
      setShowAnswers(true);
      setSelectedAnswer(userAnswers[questionIndex].selected ?? null);
    }
  }, [questionIndex]);

  useEffect(() => {
    const saved = userAnswers[questionIndex];

    if (saved && saved.selected !== null) {
      setSelectedAnswer(saved.selected);
      setShowAnswers(false);
    } else {
      setSelectedAnswer(null);
      setShowAnswers(false);
    }

    setShowExplanation(false);
  }, [questionIndex]);

  useEffect(() => {
    const savedData = localStorage.getItem("reactProgress"); // ✅ Correct key
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
    localStorage.removeItem("reactProgress");
    setScore(0);
    setQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setShowAnswers(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reactProgress",
      JSON.stringify({
        questions: shuffledQuestions,
        answers: userAnswers,
        index: questionIndex,
        score,
      })
    );
  }, [userAnswers, questionIndex, score, shuffledQuestions]);

  useEffect(() => {
    const currentAnswer = userAnswers[questionIndex];

    if (currentAnswer?.selected != null) {
      setShowAnswers(true);
      setSelectedAnswer(currentAnswer.selected);
    } else {
      setShowAnswers(false);
      setSelectedAnswer(null);
    }

    setShowExplanation(false);
  }, [questionIndex, userAnswers]);

  useEffect(() => {
    if(message){
      setTimeout(() => {
        setMessage(!message);
      }, 8000);
    }
  }, [message]);


  function calculateMastery(finalScore) {
    if (finalScore <= 5) return "Beginner level";
    if (finalScore <= 10) return "Intermediate level";
    if (finalScore <= 15) return "Above average level";
    if (finalScore <= 20) return "Strong knowledge";
    if (finalScore >= 23) return "Absolute unit level";
    return "None";
  }

  function handleSubmit() {
    const isCorrect = selectedAnswer === correct;

    if (!selectedAnswer) {
      return setMessage("Choose your answer first.");
    }

    if (userAnswers[questionIndex]?.selected != null) {
      setMessage("You've already answered this question.");
      return;
    }

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
      const finalScore = isCorrect ? score + 1 : score;
      setMastery(calculateMastery(finalScore));
      setMenu(true);
      setMessage(
        `You completed the Logic Challenge with a score of ${finalScore} out of ${shuffledQuestions.length}`
      );
    }
  }

  function FooterSection({ title, items }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate INSIDE the component

    return (
      <div className="border-b-2 pb-3 md:border-none">
        <button
        onClick={() => setOpen(!open)}
        className="font-semibold text-cyan-300 mb-2 text-lg w-full 
        flex items-center justify-between"
        >
          {title}
          <span className="md:hidden transition-transform duration-300">
            <LuPlus
              className={`transform transition-transform duration-200 
              ${open ? "rotate-45 text-cyan-50" : ""}`}
            />
          </span>
        </button>

        {(open || window.innerWidth >= 768) && (
          <ul className="flex flex-col gap-2 text-start">
            {items.map((item, i) => (
              <li key={i}>
                <button
                onClick={() => navigate(item.path)}
                className="hover:text-cyan-300 transition-colors 
                duration-200 text-left cursor-pointer"
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
    <div 
    className="min-h-screen flex flex-col react">

      <Header showBackButton={true} theme="react" />

      <SideNav
      sections={[
        { id: "reactQuiz", icon: <FaGamepad />, style: "text-cyan-600 bg-gradient-to-br from-cyan-900 to-cyan-900/50 hover:to-cyan-700 hover:text-cyan-200" },
        { id: "reactList", icon: <FaListAlt />, style: "text-cyan-600 bg-gradient-to-br from-cyan-900 to-cyan-900/50 hover:to-cyan-700 hover:text-cyan-200" },
        { id: "reactVideo", icon: <FaYoutube />, style: "text-red-500 bg-gradient-to-br from-cyan-900 to-cyan-900/50 hover:to-red-500 hover:border-red-600" },
        { id: "reactGuide", icon: <LuBookOpenText />, style: "text-cyan-600 bg-gradient-to-br from-cyan-900 to-cyan-900/50 hover:to-cyan-700 hover:text-cyan-200" },
      ]}
      />

      <main 
      role="main"
      aria-label="Custom Logic Quiz"
      className="flex flex-col items-center w-full sm:max-w-full max-w-screen-md 
      mx-auto px-1 sm:px-6 gap-8 mt-2 mb-10">
        <div className="flex items-center flex-col">
          <h1 
          className={`md:text-5xl font-extrabold text-center bg-clip-text
          mt-5 flex items-center gap-1 group text-transparent bg-gradient-to-tr
          from-cyan-300 to-cyan-600 pb-3
          ${i18n.language === "ka" ? "text-[1.8rem]" : "text-[2rem]"}`}>            
            {t("main.header4")}
            <FaReact 
            className="spin text-[#00B8CF]" />
          </h1>

          <p 
          className={`text-center text-md mt-5 mb-8 bg-gradient-to-b 
          max-w-xl w-full py-2 rounded-md shadow-md font-medium border-1
        from-[#00B8CF] to-[#448A8D] flex items-center justify-center
          border-cyan-200 text-sky-100 px-5
          ${i18n.language === "ka" ? "text-[1rem]" : "text-[1.3rem]"}`}>
            {t("main.p4")}
          </p>
        </div>

        <motion.section
        id="reactQuiz"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-10 
        bg-gradient-to-br from-[#00B8CF]/20 via-[#448A8D]/20 to-[#013739]/30 
        text-cyan-100 border border-cyan-400 backdrop-blur-md
        rounded-2xl shadow-xl py-4 md:py-10 lg:py-12 z-10 overflow-hidden md:max-h-[43rem] lg:max-h-[40rem]
        flex flex-col justify-between min-h-[37rem] md:min-h-[40rem]"
        >
          <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="hidden md:block absolute top-11 left-0 w-full 
          h-[60px] -translate-y-full z-0 opacity-40"
          >
            <path
            d="M0,70 Q120,100 240,80 Q360,40 480,65 Q600,90 720,50 Q840,10 960,40 Q1080,70 1200,35 Q1320,0 1440,30 L1440,0 L0,0 Z"
            fill="#00B8CF"
          />
          </svg>

          {showExplanation && (
            <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs 
            flex items-center justify-center z-30 overflow-x-hidden"
            onClick={() => setShowExplanation(false)}
            >
              <div
              className="bg-gradient-to-br from-[#007579] via-[#28a3a7] to-[#08b4cb] 
              border-2 border-cyan-300 text-cyan-100 rounded-2xl 
              px-4 sm:px-6 py-6 max-w-2xl w-full relative shadow-2xl
              backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
              >
                {/* Outer glow frame */}
                <span
                className="absolute -inset-5 z-10 rounded-2xl border-2 
                border-cyan-300 shadow-lg pointer-events-none"
                />

                {/* Close button */}
                <IoClose
                onClick={() => setShowExplanation(false)}
                className="absolute right-3 top-3 text-2xl cursor-pointer text-cyan-200 
                hover:text-cyan-100 hover:scale-110 transition-transform"
                />

                {/* Title */}
                <h2
                className="text-2xl font-bold text-cyan-200 mb-4 text-center flex items-center gap-2 
                border-b border-cyan-200 pb-2"
                >
                  <LuBrainCircuit className="text-2xl" />
                  {t("main.explanation")}
                </h2>

                {/* Body text */}
                <p 
                className="text-cyan-100 font-medium leading-relaxed mb-4">
                  {explanation}
                </p>

              </div>
            </div>
          )}
          
          {menu && (
            <div 
            className="fixed inset-0 z-30 bg-black/60 flex justify-center items-center p-2 rounded-2xl">
              <div
              className="relative w-full max-w-4xl bg-gradient-to-t from-cyan-900/80 via-cyan-800 to-cyan-700
              border-2 border-cyan-300 text-cyan-100 rounded-2xl shadow-2xl p-2 md:p-6 
              backdrop-blur-md max-h-[90vh] overflow-y-auto md:px-12"
              >
                {/* Scroll Container */}
                <div
                ref={resultRef}
                className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-container scroll-smooth"
                >
                  {/* Page 1 - Quiz Stats */}
                  <section className="min-w-full snap-center shrink-0 p-4">
                    <h2 className={`font-bold text-cyan-300 text-center mb-6 flex 
                    items-center gap-2 justify-center border-b border-cyan-400 pb-4
                    ${i18n.language === "ka" 
                    ? "text-[1.1rem] md:text-[1.5rem]" 
                    : "text-[1.2rem] md:text-[1.8rem]"}`}>
                      <GiPartyPopper className="text-2xl md:text-3xl"/>
                      {t("main.challengecomplete")}
                    </h2>

                    <h3 
                    className={`font-bold mb-6 flex items-center gap-2 text-cyan-300
                    ${i18n.language === "ka" 
                    ? "text-[0.9rem] md:text-[1.3rem]" 
                    : "text-[1rem] md:text-[1.4rem]"}`}>
                      <PiGraphFill className="text-2xl md:text-3xl" />
                      {t("main.quizstats")}
                    </h3>

                    <ul 
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-4xl mx-auto px-2 sm:px-4">
                      <li className="bg-[#00B8CF]/20 p-4 rounded-lg border border-cyan-300">
                        <span 
                        className="block text-[0.8rem] md:text-[1rem] text-cyan-200">
                          {t("main.totalquestions")}:
                        </span>

                        <strong className="text-xl">
                          {shuffledQuestions.length}
                        </strong>
                      </li>

                      <li className="bg-green-500/20 p-4 rounded-lg border border-green-400">
                        <span className="block text-[0.8rem] md:text-[1rem] text-green-100">
                          {t("main.correctanswers")}:
                        </span>

                        <strong className="text-xl">
                          {Object.values(userAnswers).filter((a) => a.isCorrect).length}
                        </strong>
                      </li>

                      <li className="bg-rose-500/20 p-4 rounded-lg border border-rose-400">
                        <span 
                        className={`block text-rose-100
                        ${i18n.language === "ka" ? "text-[0.8rem] md:text-[0.9rem]" : "text-[0.9rem] md:text-[1rem]"}`}>
                          {t("main.wronganswers")}:
                        </span>

                        <strong className="text-xl">
                          {Object.values(userAnswers).filter((a) => a.selected && !a.isCorrect).length}
                        </strong>
                      </li>

                      <li className="bg-slate-500/20 p-4 rounded-lg border border-slate-400">
                        <span 
                        className="block text-[0.8rem] md:text-[1rem] text-slate-100">
                          {t("main.skipped")}:
                        </span>
                        
                        <strong className="text-xl">
                          {Object.values(userAnswers).filter(a => a.selected === null).length}
                        </strong>
                      </li>

                      <li className="bg-blue-500/20 p-4 rounded-lg border border-blue-400">
                        <span className="block text-[0.8rem] md:text-[1rem] text-blue-100">
                          {t("main.accuracy")}:
                        </span>
                        <strong className="text-xl">
                          {(
                            (Object.values(userAnswers).filter((a) => a.isCorrect).length / shuffledQuestions.length) *
                            100
                          ).toFixed(1)}
                          %
                        </strong>
                      </li>

                      <li className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-400">
                        <span 
                        className="block text-sm text-yellow-100">
                          {t("main.finalscore")}:
                        </span>

                        <strong className="text-xl">
                          {score}
                        </strong>
                      </li>
                    </ul>
                  </section>

                  {/* Page 2 - Missed + Mastery */}
                  <section className="min-w-full snap-center shrink-0 p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-6">

                      {/* Title */}
                      <h2 className={`font-bold text-cyan-300 text-center mb-2 flex items-center justify-center gap-2 border-b border-indigo-600 pb-4
                        ${i18n.language === "ka" 
                        ? "text-[1rem] md:text-[1.5rem]" 
                        : "text-[1.2rem] md:text-[1.6rem]"}`}>
                        <PiGraphFill className="text-3xl" />
                        {t("main.insightmastery")}
                      </h2>

                      {/* Most Missed */}
                      <div>
                        <h4 
                        className={`font-semibold text-cyan-200 mb-2
                        ${i18n.language === "ka" ? "text-[1.1rem] md:text-[1.3rem]" : "text-[1.3rem] md:text-[1.5rem]"}`}>
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
                        <h4 
                        className={`font-semibold text-cyan-200 mb-3
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
                    <div className="mb-6 flex items-center justify-center gap-2">
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

                        const reshuffled = [...reactQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
                        setShuffleQuestions(reshuffled);
                      }}
                      className={`px-5 py-2 bg-cyan-700 text-white rounded-xl
                    hover:bg-cyan-600 transition-all duration-200 hover:scale-105 
                      cursor-pointer ${i18n.language === "ka" 
                        ? "text-[0.9rem] md:text-[1.1rem]" 
                        : "text-[1rem] md:text-[1.2rem]"}`}
                      >
                        {t("main.tryagain")}
                      </button>

                      <button
                      className={`px-5 py-2 bg-cyan-700 text-sky-200 rounded-xl 
                      hover:bg-cyan-800 transition-all duration-200 hover:scale-105 cursor-pointer
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
                <div className="fixed bottom-2 left-0 right-0 flex justify-between px-6 mt-4 gap-3">
                  <button
                  onClick={() => scrollToPage(0)}
                  className={`px-6 py-2 rounded-2xl transition-all text-sm hover:scale-105 cursor-pointer ${
                  resultPage === 0
                    ? "opacity-30 cursor-not-allowed bg-gray-700"
                    : "bg-[#00B8CF] text-white hover:bg-[#6ED8E5]"
                  }`}
                  disabled={resultPage === 0}
                  >
                    <FaAngleLeft />
                  </button>

                  <button
                  onClick={() => scrollToPage(1)}
                  className={`px-6 py-2 rounded-2xl transition-all text-sm hover:scale-105 cursor-pointer ${
                    resultPage === 1
                      ? "opacity-30 cursor-not-allowed bg-gray-700"
                      : "bg-[#00B8CF] text-white hover:bg-[#6ED8E5]"
                  }`}
                  disabled={resultPage === 1}
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
            <div className="w-full h-3 bg-slate-400 rounded-full overflow-hidden
            mb-6">
              <div
              className="h-full bg-gradient-to-l from-[#00e1ff] via-cyan-500 to-cyan-700
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
                md:w-full rounded-md mb-4 absolute flex justify-center items-center 
                gap-2   
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
            gap-2 md:px-2 text-start text-cyan-200 md:py-5 md:mt-2 w-full"
            >
              <div className="flex justify-between flex-row-reverse md:flex-col">
                <div className="md:flex items-center md:flex-col md:items-start gap-1 w-full">
                  <div className="flex items-center gap-1 text-cyan-400">
                    <GiThink className="text-2xl" />
                    <h1 className="text-[1rem] md:text-2xl font-bold md:max-w-4xl">
                      {t("main.question")} {questionIndex + 1}/{shuffledQuestions.length}:
                    </h1>
                  </div>

                  <p
                  className={`font-medium md:max-w-[52rem] w-auto mt-[12px] md:w-full
                  border-2 border-cyan-600 rounded-xl p-2
                  bg-gradient-to-r from-cyan-600/50 via-cyan-700/50 to-cyan-800/50
                  text-cyan-100
                  ${i18n.language === "ka" 
                    ? "text-[0.85rem] md:text-[1.4rem]" 
                    : "text-[0.9rem] md:text-[1.4rem]"}`}
                  >
                    {question}
                  </p>
                </div>
              </div>

              {/* Right: Desktop Info Panel (Score + Level unified, React indigo theme) */}
              <div className="hidden md:flex items-center">
                <div
                className={`flex items-center gap-4 px-5 py-2.5 rounded-2xl border-2 shadow-md 
                backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                ${
                  currentDifficulty === "easy"
                    ? "border-green-400 bg-gradient-to-r from-green-600/70 via-emerald-500/70 to-green-700/70"
                    : currentDifficulty === "medium"
                    ? "border-cyan-400 bg-gradient-to-r from-indigo-500/70 via-cyan-500/70 to-sky-600/70"
                    : "border-rose-400 bg-gradient-to-r from-rose-600/70 via-purple-500/70 to-indigo-700/70"
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
                    i18nKey={t(`react.${id}.level`)}
                    components={{
                      easy: (
                        <FaLeaf
                          size={20}
                          className="text-green-200 hover:animate-bounce"
                        />
                      ),
                      medium: (
                        <FaCog
                          size={20}
                          className="text-cyan-200 hover:animate-spin"
                        />
                      ),
                      hard: (
                        <AiFillFire
                          size={22}
                          className="text-pink-200 hover:scale-125 transition-transform duration-200 hover:text-white"
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
              bg-gradient-to-r from-cyan-500/50 via-cyan-600/50 to-cyan-700/50
              text-white rounded-xl shadow-lg px-4 py-2"
              >
                {/* Left side: Score */}
                <div
                className="flex items-center justify-center px-3 py-1 text-[1.05rem]
                border-2 rounded-full border-cyan-400 bg-cyan-700/40"
                >
                  <p className="font-mono tracking-wide pr-1 text-cyan-300
                  text-[0.9rem]">
                    {t("score")}
                  </p>

                  <span className="font-mono text-cyan-100 text-[1rem]">
                    {score}</span>
                </div>

                {/* Middle: Difficulty Icon */}
                <span className="flex items-center rounded-full">
                  <Trans
                  i18nKey={t(`react.${id}.level`)}
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
                      className="text-rose-200 px-[5px] border-2 border-rose-200"
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
                    <BsPatchQuestionFill size={24} className="text-cyan-200" />
                  </button>

                  {/* Question ID */}
                  <p
                  className={`font-extrabold text-cyan-100 bg-cyan-700 rounded-full 
                  w-10 h-10 flex items-center justify-center shadow-lg border-2 border-cyan-400 ${
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
            className="grid grid-cols-1 md:grid-cols-2 sm:gap-2 gap-1 
            md:pb-8 mt-2"
            >
              {options?.map((label, index) => {
                const isSelected = selectedAnswer === label;
                const isCorrect = label === correct;
                let style =
                  "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ";

                if (showAnswers) {
                  if (isCorrect) {
                    style += "bg-[#27A599] text-cyan-100 border-green-200";
                  } else if (isSelected) {
                    style += "bg-red-500 text-rose-100 border-red-300";
                  } else {
                    style += "bg-cyan-500/5 text-[#00B8CF]/40 border-cyan-800";
                  }
                } else {
                  style += isSelected
                    ? "bg-gradient-to-b from-cyan-700 to-cyan-500 duration-200 transition-all text-white border-sky-200 scale-102 transition-transform duration-200"
                    : "bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 hover:scale-101 transtion-transform duration-200 hover:border-cyan-100 border-cyan-300 text-cyan-100";
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
                          delete updated[questionIndex]; // clear the skip
                        }
                        return updated;
                      });
                    }}
                    name={`question-${questionIndex}`}
                    className="accent-[#00B8CF] w-4 h-4 cursor-pointer"
                    />

                    <h1
                    className={`w-full cursor-pointer font-medium select-none
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
          
          {/*Flex col-2*/}
          <div
          className="flex flex-wrap sm:justify-center md:justify-center gap-2 mt-6
          rounded-2xl border border-cyan-400/80 bg-cyan-900/30 backdrop-blur-xl shadow-lg px-4 py-3"
          >
            {/* Left side: Question ID */}
            <div className="hidden md:flex items-center text-cyan-100 gap-2 font-mono">
              <span
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-cyan-700/60 
                border border-cyan-400/40 text-2xl"
              >
                <FaHashtag />
                {id}
              </span>
            </div>

            <ul className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {[
                {id: 1, text: `${t("main.buttons.previous")}`, icon: <FaAngleLeft />,
                disabled: questionIndex === 0, showMode: "icon",
                  click: () => {
                    if (questionIndex > 0) {
                      setQuestionIndex((prev) => prev - 1);
                      setSelectedAnswer("");
                      setShowExplanation(false);
                      setMessage("");
                    }
                  },
                },

                {id: 2, text: `${t("main.buttons.submit")}`, icon: <FaRocket />,
                disabled: showAnswers || alreadyAnswered, showMode: "text", click: handleSubmit,
                },

                {id: 3, text: `${t("main.buttons.explanation")}`, icon: <CiWarning />,
                showMode: "desktop-only", click: () => setShowExplanation(!showExplanation),
                },

                {id: 4, text: `${t("main.buttons.skip")}`, icon: <IoPlaySkipForward />,
                disabled: questionIndex + 1 === shuffledQuestions.length, showMode: "text",
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

                {id: 5, text: `${t("main.buttons.next")}`, icon: <FaAngleRight />,
                showMode: "icon", disabled: !showAnswers || questionIndex + 1 === shuffledQuestions.length,
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
                if (button.showMode === "desktop-only") {
                  return (
                    <button
                    key={button.id}
                    onClick={button.click}
                    disabled={button.disabled}
                    className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium
                    transition-all duration-200 cursor-pointer
                    ${i18n.language === "ka" ? "md:text-[1rem] lg:text-[1.2rem]" : "md:text-[1.1rem] lg:text-[1.3rem]"}
                    ${button.disabled ? "bg-cyan-800/40 text-cyan-400 cursor-not-allowed"
                    : "bg-gradient-to-b active:bg-gradient-to-t from-[#00B8CF] to-[#0098ac] hover:from-[#0ac6df] hover:to-cyan-400 text-white shadow-sm hover:shadow-md"
                    }`}
                    >
                      {button.icon} 
                      {button.text}
                    </button>
                  );
                }

                return (
                  <button
                  key={button.id}
                  onClick={button.click}
                  disabled={button.disabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium
                  transition-all duration-200 cursor-pointer sm:px-2
                  ${i18n.language === "ka" 
                  ? "text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]" 
                  : "text-[1rem] md:text-[1.1rem] lg:text-[1.3rem]"}
                  ${button.disabled 
                  ? "bg-cyan-800/40 text-cyan-500/70 cursor-not-allowed"
                  : "bg-gradient-to-b active:bg-gradient-to-t from-[#00B8CF] to-[#0098ac] hover:from-[#0ac6df] hover:to-cyan-400 text-white shadow-sm hover:shadow-md"
                  }`}
                  >
                    {/* Previous / Next (icon-only mobile) */}
                    {button.showMode === "icon" && (
                      <>
                        {button.text === t("main.buttons.previous") ? (
                          <>
                            <span>
                              {button.icon}
                            </span>

                            <span className="hidden sm:inline">
                              {button.text}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">
                              {button.text}
                            </span>

                            <span>
                              {button.icon}
                            </span>
                          </>
                        )}
                      </>
                    )}

                    {/* Submit / Skip (text-only mobile, full desktop) */}
                    {button.showMode === "text" && (
                      <div 
                      className={`
                       ${i18n.language === "ka" ? "md:text-[1rem] lg:text-[1.2rem]" : "md:text-[1.1rem] lg:text-[1.3rem]"}`}>
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

          <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="hidden md:block absolute -bottom-3 left-0 w-full 
          h-[50px] z-0 opacity-40"
          >
            <path
            d="M0,70 Q120,100 240,70 Q360,40 480,65 Q600,90 720,50 Q840,10 960,40 Q1080,70 1200,35 Q1320,0 1440,30 L1440,100 L0,100 Z"
            fill="#6ED8E5"
          />
          </svg>
        </motion.section>

        <section 
        id="reactList"
        className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 
        bg-gradient-to-b from-[#00B8CF]/20 via-[#448A8D]/10 to-[#013739]/20 
        backdrop-blur-md border border-cyan-400 rounded-2xl shadow-lg p-6 relative
        my-[1rem] md:my-[5rem] md:min-h-[40rem]"
        >
          <h1
          className={`bg-gradient-to-b from-cyan-800 to-cyan-500 text-white 
          py-3 px-5 rounded-lg hover:brightness-110 transition mb-7 md:mb-10
          flex items-center gap-1 shadow-md md:rounded-2xl font-bold
          ${i18n.language === "ka" 
            ? "text-[1.1rem] md:text-[1.5rem]" 
            : "text-[1.1rem] md:text-[1.6rem]"}`}
          >
            <CiBoxList 
            className={`text-2xl md:text-3xl`} />
            {t("main.sec2react")}
          </h1>

          <ul
          className="grid grid-cols-3 md:grid-cols-4 gap-3 
          text-cyan-900 mt-5 overflow-y-auto max-h-[29rem] 
          p-2 pr-3 relative"
          >
            {reactQuestions.map((q) => (
              <li
              onClick={() => {
                setQuestions(true);
                setSelectedQuestion(q);
              }}
              className="bg-gradient-to-br from-cyan-700 to-[#00B8CF] 
              text-white rounded-lg py-[12px] flex items-center gap-2 justify-center 
              hover:scale-105 hover:shadow-md transition-all duration-200 
              cursor-pointer border border-cyan-300 shadow-inner"
              key={q.id}
              >
                <FaHashtag 
                className="text-base opacity-80 md:text-xl" />
                <span 
                className="font-mono text-xl md:text-3xl">
                  {q.id}
                </span>
              </li>
            ))}
          </ul>

          {questions && selectedQuestion && (() => {
            const selectedKey = `${selectedQuestion.type}.${selectedQuestion.id}`;
            const selectedQuestionText = t(`${selectedKey}.question`) || "Question not found";
            const selectedExplanation = t(`${selectedKey}.explanation`) || "Explanation not available";

            return (
              <div
              onClick={() => setQuestions(false)}
              className="inset-0 bg-gradient-to-b from-black/60 to-black/90 
              rounded-2xl flex flex-col absolute top-0 justify-center items-center 
              z-10 py-4 px-3"
              >
                <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-b from-[#00aebe] to-[#003135] 
                w-[90%] md:w-full max-w-2xl rounded-xl shadow-2xl px-6 py-8 md:px-10 md:py-10 
              text-sky-200 flex flex-col gap-6 border-2 border-cyan-400"
                >
                  <button
                  onClick={() => setQuestions(false)}
                  className="absolute top-4 right-4 text-cyan-200 hover:text-cyan-800 
                  text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
                  >
                    <IoMdClose />
                  </button>

                  <h2 className="text-center text-white text-3xl font-semibold 
                  bg-gradient-to-b from-cyan-700 to-cyan-300 rounded-xl 
                  py-3 flex items-center justify-center gap-1 mx-5
                  border-2 border-cyan-200"
                  >
                    <FaHashtag className="text-2xl mt-[1px]" />
                    {selectedQuestion.id}
                  </h2>

                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="pt-1">
                      <BsPatchQuestionFill className="text-cyan-300 text-2xl" />
                    </div>

                    <div
                    className={`leading-relaxed font-medium text-cyan-200
                    ${i18n.language === "ka" 
                      ? "text-[1rem] sm:text-[1.1rem] md:text-[1.3rem]" 
                      : "text-[1.2rem] sm:text-[1.2rem] md:text-[1.4rem]"}`}
                    >
                      {selectedQuestionText}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div>
                      <HiOutlineLightBulb className="text-yellow-400 text-2xl" />
                    </div>

                    <div
                    className={`text-base leading-relaxed text-cyan-100 
                    ${i18n.language === "ka" 
                      ? "text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]" 
                      : "text-[1rem] sm:text-[1.1rem] md:text-[1.2rem]"}`}
                    >
                      {selectedExplanation}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        <section
        id="reactVideo"
        className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-10 
        bg-white/10 backdrop-blur-md border border-cyan-500 rounded-2xl shadow-lg 
        py-6 my-[1rem]"
        >
          {/* Section Header */}
          <h1
          className={`bg-gradient-to-b text-white py-3 px-5 rounded-lg hover:bg-cyan-700 transition
          flex items-center gap-2 from-cyan-800 to-cyan-500 shadow-lg
          mb-1 md:mb-2 font-bold md:rounded-2xl
          ${i18n.language === "ka" 
            ? "text-[1.1rem] md:text-[1.5rem]" 
            : "text-[1.1rem] md:text-[1.7rem]"}`}
          >
            <FaYoutube className={`text-2xl md:text-4xl text-red-500`} />
            {t("main.videoTutorial")}
          </h1>

          {/* Video Embed Container */}
          <div 
          className="relative h-[20rem] md:h-[30rem] w-full aspect-video rounded-xl overflow-hidden 
          border-dashed border-2 border-cyan-500 shadow-2xl shadow-cyan-700/40"
          >
            <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/CgkZ7MvWUAA?start=0"
            title="React Tutorial by BroCodes"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            />
          </div>

          {/* Optional Caption / Credit */}
          <p 
          className="mt-4 text-center text-cyan-300 text-sm md:text-base font-medium">
            <Trans
            i18nKey={"main.videoCreator"}
            components={{
              highlight: <span className="text-transparent bg-clip-text bg-gradient-to-b from-rose-500 to-rose-300 font-semibold"/>
            }}
            />
          </p>
        </section>

        <QuizSection
        theme="react"
        id={id}
        sections={[
          { 
            id: "react", 
            heading: "Reacts Quiz Guide", 
          },
        ]}
        />
      </main>

      <div className="relative">
        <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-24 rotate-180 z-10"
        >
          <path
            d="
              M0,70
              Q120,100 240,70
              Q360,40 480,65
              Q600,90 720,50
              Q840,10 960,40
              Q1080,70 1200,35
              Q1320,0 1440,30
              L1440,0 
              L0,0 
              Z"
            fill="#00B8CF"
        />
        </svg>
      </div>

      <footer 
      className="w-full bg-gradient-to-b from-[#00B8CF] via-[#228e92] 
      to-[#007d81] text-sky-100 text-sm text-center pt-10 pb-5 
      relative z-10"
      >
        
        {/* Scroll To Top */}
        <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`text-cyan-200 hover:text-white 
        text-lg cursor-pointer hover:scale-110 transition-all 
        duration-200 mt-3 hover:-translate-y-1 text-center 
        ${i18n.language === "ka" ? "text-[15px]" : "text-md"}`}
        >
          <IoCaretUpOutline 
            className={`text-2xl ${i18n.language === "ka" ? "ml-3" : "ml-1"}`} 
          />
          {t("footer.top")}
        </button>

        {/* Footer Sections */}
        <nav 
        className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-1 
        md:grid-cols-5 gap-5 text-sky-100 text-sm md:text-base"
        >
          <FooterSection title={t("footer.help")} items={[
            { label:t("footer.howtoplay"), path:"#"}, 
            { label:t("footer.cantStart"), path:"#"}, 
            { label:t("footer.bug"), path:"#"}, 
            { label:t("footer.more"), path:"#"}
          ]} />
          <FooterSection title={t("footer.resources")} items={[
            { label:t("footer.docs"), path:"#"}, 
            { label:t("footer.blog"), path:"#"}, 
            { label:t("footer.repo"), path:"#"}, 
            { label:t("footer.community"), path:"#"}
          ]} />
          <FooterSection title={t("footer.contact")} items={[
            { label:t("footer.email"), path:"#"}, 
            { label:t("footer.linkedin"), path:"#"}, 
            { label:t("footer.instagram"), path:"#"}, 
            { label:t("footer.feedback"), path:"#"}
          ]} />
          <FooterSection title={t("footer.about")} items={[
            { label:t("footer.aboutApp"), path:"#"}, 
            { label:t("footer.purpose"), path:"#"}, 
            { label:t("footer.stack"), path:"#"}, 
            { label:t("footer.changelog"), path:"#"}
          ]} />
          <FooterSection title={t("footer.quizzes")} items={[
            { label:t("footer.htmlcss"), path:"/HtmlCss"}, 
            { label:t("footer.js"), path:"/Javascript"}, 
            { label:t("footer.react"), path:"/React"}, 
            { label:t("footer.custom"), path:"/custom"}
          ]} />
        </nav>
        
        <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-10 rotate-180 z-10"
        >
          <path
          d="
          M0,70
          Q120,100 240,80
          Q360,40 480,65
          Q600,90 720,50
          Q840,10 960,40
          Q1080,70 1200,35
          Q1320,0 1440,30
          L1440,0 
          L0,0 
          Z"
          fill="#00B8CF"
        />
        </svg>

        {/* Socials + Language Switcher */}
        <div className="w-full bg-gradient-to-b from-[#00B8CF] to-[#6ED8E5]
        flex md:flex-row flex-col gap-5 px-5 md:px-10 py-5
        items-center justify-evenly"
        >
          {/* Social Media Icons */}
          <div className="flex gap-5 items-center">
            <h1 
            className={`font-semibold hidden sm:block
            ${i18n.language === "ka" ? "text-[1.2rem]" : ":text-[1.4rem]"}`}>
              {t("footer.follow")}
            </h1>

            <ul className="flex gap-3 text-xl">
              {[
                { id: 1, symbol: <FaFacebookSquare />, text: "text-blue-400", 
                  effect: "hover:text-blue-300", link: "https://www.facebook.com/" },
                { id: 2, symbol: <FaInstagram />, text: "text-pink-400", 
                  effect: "hover:text-pink-300", link: "https://www.instagram.com/" }, 
                { id: 3, symbol: <FaYoutube />, text: "text-red-500", 
                  effect: "hover:text-red-400", link: "https://www.youtube.com/" }, 
                { id: 4, symbol: <FaTiktok />, text: "text-gray-400", 
                  effect: "hover:text-white", link: "https://www.tiktok.com/en/" }, 
                { id: 5, symbol: <FaThreads />, text: "text-emerald-400", 
                  effect: "hover:text-emerald-300", link: "https://www.threads.com/" }
              ].map((icon) => (
                <a
                key={icon.id}
                href={icon.link}
                target="_blank"
                className={`hover:scale-110 transition-all duration-200 text-2xl
                ${icon.effect} bg-[#A2E6EE] p-2 rounded-full flex ${icon.text}
                items-center gap-1 group`}
                >
                  {icon.symbol}
                </a>
              ))}
            </ul>
          </div>

          {/* Language Switcher */}
          <div 
          className="flex items-center gap-2 relative">
            <h1 
            className="font-semibold text-sm md:text-xl md:block hidden">
              {t("footer.language")}
            </h1>
            <button
            onClick={() => setLanguageBox(!languageBox)}
            className="flex items-center gap-1.5 bg-[#00B8CF] py-1 
            rounded-md cursor-pointer px-4 group"
            >
              <img
                className="md:w-5 w-4"
                src={languages[i18n.language]?.image || "US.png"}
                alt="selected flag"
              />
              <span className="text-lg">
                {languages[i18n.language]?.label || "English"}
              </span>
              <FaAngleDown className={`${languageBox ? "rotate-180 transition-transform duration-200" : ""}`} />
            </button>

            {languageBox && (
              <div className="bg-[#00B8CF] rounded-md w-36 h-20 absolute bottom-10 
                flex flex-col px-1.5 justify-evenly shadow-lg">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    setLanguageBox(false);
                  }}
                  className={`flex items-center justify-start gap-2 cursor-pointer
                hover:bg-[#1E96A4] p-1 rounded-md transition-all duration-150
                  ${i18n.language === code ? "bg-gradient-to-b from-[#24777A] to-[#2ABED1]" : ""}`}
                  >
                    <img className="w-6" src={lang.image} alt={lang.label} />
                    {lang.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-10 z-10"
        >
          <path
          d="
          M0,70
          Q120,100 240,70
          Q360,40 480,65
          Q600,90 720,50
          Q840,10 960,40
          Q1080,70 1200,35
          Q1320,0 1440,30
          L1440,0 
          L0,0 
          Z"
          fill="#6ED8E5"
          />
        </svg>

        {/* Bottom copyright + fact */}
        <div 
        className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-5 
        text-xs md:text-sm text-center md:text-left mt-5">
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-1 cursor-default">
            {t("footer.copyright", { year: new Date().getFullYear() })}
            <PiHeartHalfFill className="text-pink-400 hearth-shrink" />
            {t("footer.rights")}
          </h1>
          <p className="break-words max-w-full">{randomFact}</p>
        </div>
      </footer>
    </div>
  );
}

export default ReactQuiz;
