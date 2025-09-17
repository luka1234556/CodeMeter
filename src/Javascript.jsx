import { useState, useEffect, useRef } from "react";
import { jsQuestions } from "./questions.js";
import SideNav from "./SideNav.jsx"
import Header from "./Header/Header.jsx";
import QuizSection from "./QuizSection.jsx"
import { CiWarning, CiBoxList } from "react-icons/ci";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaFacebookSquare, FaRocket, FaLeaf, FaCog, 
  FaGamepad, FaListAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { GiThink, GiPartyPopper } from "react-icons/gi";
import { useNavigate } from "react-router-dom"
import { LuPlus, LuBrainCircuit, LuBookOpenText } from "react-icons/lu";
import { PiHeartHalfFill, PiGraphFill } from "react-icons/pi";
import { BsPatchQuestionFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io"
import { useTranslation, Trans } from "react-i18next";
import { IoClose, IoPlaySkipForward, IoCaretUpOutline } from "react-icons/io5";
import { FaInstagram, FaThreads, FaTiktok, FaYoutube, FaAngleRight, 
FaAngleLeft, FaAngleDown, FaHashtag } from "react-icons/fa6";
import { TbBrandJavascript } from "react-icons/tb";
import { AiFillFire } from "react-icons/ai";
import { GiDrippingHoney, GiHoneycomb } from "react-icons/gi";

function Javascript() {
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
  const [mastery, setMastery] = useState("");
  const quizFinished = questionIndex + 1 === shuffledQuestions.length && showAnswers;
  const resultRef = useRef(null);
  const [resultPage, setResultPage] = useState(0); // 0 = stats, 1 = missed

  /*const's for level cut */
  const rawLevel = t(`javascript.${id}.level`); // "<easy>easy</easy>"
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
    const shuffled = [...jsQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
    setShuffleQuestions(shuffled);
    document.title = "Javascript"
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
    const savedData = localStorage.getItem("jsProgress"); // ✅ Correct key
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
    localStorage.removeItem("jsProgress");
    setScore(0);
    setQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setShowAnswers(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "jsProgress",
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
        className="font-semibold text-amber-600 mb-2 text-lg w-full 
        flex items-center justify-between"
        >
          {title}
          <span className="md:hidden transition-transform duration-300">
            <LuPlus
              className={`transform transition-transform duration-200 
              ${open ? "rotate-45 text-yellow-500" : ""}`}
            />
          </span>
        </button>

        {(open || window.innerWidth >= 768) && (
          <ul className="flex flex-col gap-2 text-start">
            {items.map((item, i) => (
              <li key={i}>
                <button
                onClick={() => navigate(item.path)}
                className="hover:text-yellow-500 transition-colors 
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
    className="min-h-screen flex flex-col relative from-yellow-500/70 to-amber-400
    bg-gradient-to-b md:from-yellow-500/90 md:to-amber-500/90">
      
      <Header showBackButton={true} theme="javascript" />

      <SideNav
      sections={[
        { id: "jsQuiz", icon: <FaGamepad />, style: "text-yellow-400 bg-gradient-to-br from-yellow-900 to-amber-900/50 hover:to-amber-700 hover:text-yellow-100 border-yellow-500" },
        { id: "jsList", icon: <FaListAlt />, style: "text-yellow-400 bg-gradient-to-br from-yellow-900 to-amber-900/50 hover:to-amber-700 hover:text-yellow-100 border-yellow-500" },
        { id: "jsVideo", icon: <FaYoutube />, style: "text-red-600 bg-gradient-to-br from-yellow-900 to-rose-900/50 hover:to-red-500 hover:text-rose-500 border-yellow-500" },
        { id: "jsGuide", icon: <LuBookOpenText />, style: "text-yellow-400 bg-gradient-to-br from-yellow-900 to-amber-900/50 hover:to-amber-700 hover:text-yellow-100 border-yellow-500" },
      ]}
      />

      <div className="md:block hidden">
        <GiDrippingHoney 
        style={{ 
          color: "#ffea4f",
          position: "absolute", 
          top: "2%", 
          left: "0%", 
          fontSize: "18rem" 
        }} 
        />
        <GiDrippingHoney 
        style={{ 
          color: "#fae234",
          position: "absolute", 
          top: "4%", 
          left: "70%", 
          fontSize: "17rem" 
        }} 
        />
        <GiDrippingHoney 
        style={{ 
          color: "#f5d65b",
          position: "absolute", 
          top: "20%", 
          left: "1%", 
          fontSize: "20rem" 
        }} 
        />
        <GiDrippingHoney 
        style={{ 
          color: "#ffea4f",
          position: "absolute", 
          top: "28%", 
          right: "0%", 
          fontSize: "16rem" 
        }} 
        />
        <GiDrippingHoney 
        style={{ 
          color: "#f5d65b",
          position: "absolute", 
          top: "12%", 
          right: "-3%", 
          fontSize: "14rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#fae234",
          position: "absolute", 
          top: "35%", 
          left: "0%", 
          fontSize: "16rem" 
        }} 
        />
        <GiDrippingHoney 
        style={{ 
          color: "#f5d65b",
          position: "absolute", 
          top: "42%", 
          right: "20%", 
          fontSize: "18rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#ffea4f",
          position: "absolute", 
          top: "50%", 
          left: "1%", 
          fontSize: "20rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#fae234",
          position: "absolute", 
          top: "50%", 
          right: "0%", 
          fontSize: "22rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#ffea4f",
          position: "absolute", 
          top: "60%", 
          left: "33%", 
          fontSize: "18rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#ffea4f",
          position: "absolute", 
          top: "65%", 
          right: "1%", 
          fontSize: "20rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#ffea4f",
          position: "absolute", 
          top: "72%", 
          left: "1%", 
          fontSize: "20rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#f5d65b",
          position: "absolute", 
          top: "78%", 
          right: "1%", 
          fontSize: "20rem" 
        }} />
        <GiDrippingHoney 
        style={{ 
          color: "#fae234",
          position: "absolute", 
          top: "82%", 
          left: "40%", 
          fontSize: "20rem" 
        }} />
      </div>

      <main 
      role="main"
      aria-label="Custom Logic Quiz"
      className="flex flex-col items-center w-full sm:max-w-full max-w-screen-md 
      mx-auto sm:px-6 gap-8 mt-2 mb-10">
        
        <div 
        className="flex items-center flex-col z-1">
          <h1 
          className={`md:text-5xl font-extrabold text-center mt-5 flex items-center 
          gap-1 group text-transparent bg-clip-text bg-gradient-to-tr pb-2 
          md:from-yellow-300 md:to-amber-300 text-[2rem]
          from-yellow-600 to-amber-400`}>
            {t("main.header3")}
            <TbBrandJavascript 
            className="md:text-6xl text-4xl mt-1 md:text-amber-200 text-amber-500" />
          </h1>

          <p 
          className={`text-center text-md mt-5 mb-8 bg-gradient-to-bl 
          max-w-xl w-full py-2 rounded-md shadow-md font-medium border-1
        from-yellow-400 to-amber-500 flex items-center justify-center
        border-amber-700 text-amber-100
            ${i18n.language === "ka" ? "text-[1rem]" : "text-[1.1rem]"}`}>
            {t("main.p3")}
          </p>
        </div>

        <motion.section
        id="jsQuiz"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-10
        backdrop-blur-md border border-yellow-500 rounded-2xl 
        shadow-lg py-4 md:py-10 lg:py-12 md:max-h-[43rem] lg:max-h-[40rem]
        flex flex-col justify-between min-h-[37rem] md:min-h-[40rem]
        bg-gradient-to-b from-yellow-400 to-yellow-600"
        >
          {showExplanation && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b 
            from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm rounded-2xl"
            onClick={() => setShowExplanation(false)}
            >
              <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full md:h-auto md:max-h-[80vh] max-w-4xl
              bg-gradient-to-br from-yellow-500 via-[#ffb300] to-[#ffcc12]
              border-2 border-yellow-400 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col overflow-y-auto"
              >
                {/* Neon Glow Effect */}
                <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400 opacity-20 shadow-[0_0_50px_rgba(255,255,0,0.4)] pointer-events-none"></div>

                {/* Close Button */}
                <IoClose
                  onClick={() => setShowExplanation(false)}
                  className="absolute right-6 top-6 text-3xl text-yellow-100 hover:text-white hover:scale-110 transition-transform cursor-pointer z-20"
                />

                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-100 mb-6 flex items-center justify-center gap-3 border-b border-yellow-300 pb-3">
                  <LuBrainCircuit className="text-3xl md:text-4xl animate-pulse text-yellow-200" />
                  {t("main.explanation")}
                </h2>

                {/* Body */}
                <div
                className={`flex-1 text-yellow-100 font-medium leading-relaxed
                ${i18n.language === "ka" ? "text-[0.9rem] md:text-[1.1rem]" : "text-base md:text-[1.2rem]"}`}
                >
                  <p>{explanation}</p>
                </div>

                {/* Footer / Action */}
                <div className="mt-6 flex justify-center">
                  <button
                  onClick={() => setShowExplanation(false)}
                  className="px-8 py-3 bg-gradient-to-br from-yellow-300 to-yellow-400 
                  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {menu && (
            <div className="fixed inset-0 z-30 bg-gray-950/70 flex justify-center items-center 
            p-2 rounded-2xl">
              <div
              className="relative w-full max-w-4xl bg-gradient-to-t from-yellow-900/80 via-yellow-800 to-amber-900
              border-2 border-yellow-400 text-yellow-100 rounded-2xl shadow-2xl p-2 md:p-6
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
                    className={`font-bold text-yellow-300 text-center mb-6 flex items-center gap-2 justify-center border-b border-yellow-400 pb-4
                    ${i18n.language === "ka" 
                      ? "text-[1.2rem] md:text-[1.5rem]" 
                      : "text-[1.3rem] md:text-[1.8rem]"}`}
                    >
                      <GiPartyPopper className="text-2xl md:text-3xl" />
                      {t("main.challengecomplete")}
                    </h2>

                    <h3
                    className={`font-bold mb-6 flex items-center gap-2 text-yellow-300
                    ${i18n.language === "ka" ? "text-[1rem] md:text-[1.3rem]" : "text-[1.1rem] md:text-[1.4rem]"}`}
                    >
                      <PiGraphFill className="text-2xl md:text-3xl" />
                      {t("main.quizstats")}
                    </h3>

                    <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-2 sm:px-4">
                      <li className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-300">
                        <span className="block text-[0.8rem] md:text-[1rem] text-yellow-100">
                          {t("main.totalquestions")}:
                        </span>
                        <strong className="text-xl">{shuffledQuestions.length}</strong>
                      </li>

                      <li className="bg-green-500/20 p-4 rounded-lg border border-green-400">
                        <span 
                        className="block text-[0.8rem] md:text-[1rem] text-green-100">
                          {t("main.correctanswers")}:
                        </span>

                        <strong className="text-xl">
                          {Object.values(userAnswers).filter((a) => a.isCorrect).length}
                        </strong>
                      </li>

                      <li className="bg-rose-500/20 p-4 rounded-lg border border-rose-400">
                        <span
                          className={`block text-rose-100 ${
                            i18n.language === "ka" 
                            ? "text-[0.8rem] md:text-[0.9rem]" 
                            : "text-[0.9rem] md:text-[1rem]"
                          }`}
                        >
                          {t("main.wronganswers")}:
                        </span>

                        <strong className="text-xl">
                          {Object.values(userAnswers).filter((a) => a.selected && !a.isCorrect).length}
                        </strong>
                      </li>

                      <li className="bg-slate-500/20 p-4 rounded-lg border border-slate-400">
                        <span className="block text-[0.8rem] md:text-[1rem] text-slate-100">
                          {t("main.skipped")}
                        </span>

                        <strong className="text-xl">
                          {Object.values(userAnswers).filter((a) => a.selected === null).length}
                        </strong>
                      </li>

                      <li className="bg-blue-500/20 p-4 rounded-lg border border-blue-400">
                        <span className="block text-[0.8rem] md:text-[1rem] text-blue-100">
                          {t("main.accuracy")}
                        </span>

                        <strong className="text-xl">
                          {(
                            (Object.values(userAnswers).filter((a) => a.isCorrect).length / shuffledQuestions.length) *
                            100
                          ).toFixed(1)}
                          %
                        </strong>
                      </li>

                      <li className="bg-amber-500/20 p-4 rounded-lg border border-amber-400">
                        <span className="block text-[0.8rem] md:text-[1rem] text-amber-100">
                          {t("main.finalscore")}
                        </span>

                        <strong className="text-xl">{score}</strong>
                      </li>
                    </ul>
                  </section>

                  {/* Page 2 - Missed + Mastery */}
                  <section className="min-w-full snap-center shrink-0 p-2 flex flex-col justify-between">
                    <div className="flex flex-col gap-6">
                      <h2
                      className={`font-bold text-yellow-300 text-center mb-2 flex items-center justify-center gap-2 border-b border-yellow-400 pb-4
                      ${i18n.language === "ka" 
                        ? "text-[1rem] md:text-[1.5rem]" 
                        : "text-[1.2rem] md:text-[1.6rem]"}`}
                      >
                        <PiGraphFill className="text-3xl" />
                        {t("main.insightmastery")}
                      </h2>

                      <div>
                        <h4
                        className={`font-semibold text-yellow-200 ${
                          i18n.language === "ka" ? "text-[1.1rem] md:text-[1.3rem]" : "text-[1.3rem] md:text-[1.5rem]"
                        }`}
                        >
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
                                  className="bg-red-500/20 px-3 py-1 rounded-md border border-red-400 text-sm"
                                >
                                  # {id}
                                </span>
                              ))}
                          </ul>
                        ) : (
                          <p className="text-yellow-100 text-sm">{t("main.noincorrectanswers")}</p>
                        )}
                      </div>

                      <div>
                        <h4
                        className={`text-xl font-semibold text-yellow-200 mb-5 ${
                          i18n.language === "ka" ? "text-[1.1rem] md:text-[1.3rem]" : "text-[1.3rem] md:text-[1.5rem]"
                        }`}
                        >
                          {t("main.yourmasterylevel")}
                        </h4>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-[25rem] md:max-w-[46rem] mb-5">
                          {masteryLevels.map((level) => (
                            <div
                            key={level.label}
                            className={`flex items-center gap-2 font-semibold rounded-2xl
                            ${level.color} ${i18n.language === "ka" ? "px-1" : "px-4"}
                            ${level.label === currentMastery?.label
                            ? "opacity-100 ring-[2px] ring-green-200 py-2 rank-shadow"
                            : "opacity-40"}`}
                            >
                              <span className="min-w-[3.5rem] max-w-[3.5rem] md:min-w-[4rem] md:max-w-[4rem]">
                                {level.icon}
                              </span>

                              <span
                              className={`${
                                i18n.language === "ka" ? "text-[0.8rem] md:text-[1rem]" : "text-[1rem] md:text-[1.1rem]"
                              }`}
                              >
                                {level.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

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
                        localStorage.removeItem("jsQuizProgress");

                        const reshuffled = [...jsQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
                        setShuffleQuestions(reshuffled);
                      }}
                      className={`px-5 py-2 bg-yellow-700 text-white rounded-xl hover:bg-yellow-600 
                      transition-all duration-200 hover:scale-105 cursor-pointer
                      ${i18n.language === "ka" 
                        ? "text-[0.9rem] md:text-[1.1rem]" 
                        : "text-[1rem] md:text-[1.2rem]"}`}
                      >
                        {t("main.tryagain")}
                      </button>

                      <button
                      className={`px-5 py-2 bg-amber-700/50 text-yellow-100 rounded-xl hover:bg-amber-500/60 
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
                <div className="fixed bottom-2 left-0 right-0 flex justify-between px-6 mt-4 gap-3">
                  <button
                  onClick={() => scrollToPage(0)}
                  className={`px-6 py-2 rounded-2xl transition-all text-sm hover:scale-105 cursor-pointer ${
                    resultPage === 0 ? "opacity-30 cursor-not-allowed bg-amber-800" : "bg-yellow-700 text-white hover:bg-yellow-600"
                  }`}
                  disabled={resultPage === 0}
                  >
                    <FaAngleLeft />
                  </button>

                  <button
                  onClick={() => scrollToPage(1)}
                  className={`px-6 py-2 rounded-2xl transition-all text-sm hover:scale-105 cursor-pointer ${
                    resultPage === 1 ? "opacity-30 cursor-not-allowed bg-amber-800" : "bg-yellow-700 text-white hover:bg-yellow-600"
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
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4">
              <div
              className="h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300
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

            {/* Questions*/}
            <div
            className="relative
            flex flex-col md:flex-row md:justify-between md:items-start 
            mb-2 gap-2 md:px-2 text-start text-yellow-600 md:py-5 md:mt-2 w-full"
            > 
            
              <div
              className="flex justify-between flex-row-reverse
              md:flex-col"
              > 
                <div 
                className="md:flex items-center md:flex-col md:items-start 
                gap-1 w-full">
                  <div className="flex items-center gap-1 text-amber-700">
                    <GiThink className="text-2xl" />
                    <h1 
                    className="text-[1rem] md:text-2xl font-bold md:max-w-4xl">
                      {t("main.question")} {questionIndex + 1}/{shuffledQuestions.length}:
                    </h1>
                  </div>

                  <p
                  className={`font-medium md:max-w-[52rem] w-auto mt-[12px] md:w-full
                  border-2 border-amber-800 rounded-xl p-2 bg-gradient-to-r from-yellow-600/50 to-amber-500/50
                text-yellow-200 
                  ${i18n.language === "ka" 
                    ? "text-[0.85rem] md:text-[1.4rem]" 
                    : "text-[0.9rem] md:text-[1.4rem]"}`}
                  >
                    {question}
                  </p>
                </div>
              </div>

              {/* Right: Desktop Info Panel (Score + Level unified, JS amber theme) */}
              <div className="hidden md:flex items-center">
                <div
                  className={`flex items-center gap-4 px-5 py-2.5 rounded-2xl border-2 shadow-md 
                  backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                  ${
                  currentDifficulty === "easy"
                    ? "border-green-400 bg-gradient-to-r from-green-600/70 via-emerald-500/70 to-green-700/70 text-green-50"
                    : currentDifficulty === "medium"
                    ? "border-cyan-400 bg-gradient-to-r from-amber-500/70 via-yellow-300/70 to-cyan-400"
                    : "border-rose-400 bg-gradient-to-r from-red-600/70 via-orange-500/70 to-yellow-500/70"
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
                      i18nKey={t(`javascript.${id}.level`)}
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
                          className="text-cyan-100 hover:animate-spin"
                          />
                        ),
                        hard: (
                          <AiFillFire
                          size={22}
                          className="text-yellow-200 hover:scale-125 transition-transform duration-200 hover:text-white"
                          />
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
                  
              {/*Mobile size: score/level/info/id */}

              <div
              className="md:hidden flex items-center justify-between
              bg-gradient-to-r from-yellow-400/50 via-amber-300/50 to-yellow-500/50
              text-white rounded-xl shadow-lg px-4 py-2"
              >
                {/* Left side: Score */}
                <div
                className="flex items-center justify-center px-3 py-1 text-[1.05rem]
                border-2 rounded-full border-yellow-100 bg-yellow-100/30 
                font-mono"
                >
                <p 
                className=" pr-1">
                  {t("score")} 
                </p>
                
                <span 
                className="">
                  {score}
                </span>
              </div>

              {/* Middle: Difficulty Icon */}
              <span className="flex items-center rounded-full">
                <Trans
                i18nKey={t(`javascript.${id}.level`)}
                components={{
                  easy: (
                    <FaLeaf
                      style={{
                        boxShadow: "0px 0px 10px rgb(17, 255, 0)",
                        borderRadius: "20px",
                        backgroundColor: "green",
                      }}
                      size={35}
                      className="text-green-300 px-[5px] border-2 border-green-100"
                    />
                  ),

                  medium: (
                    <FaCog
                    style={{
                      boxShadow: "0px 0px 10px rgb(0, 200, 240)",
                      borderRadius: "20px",
                      backgroundColor: "rgb(0, 150, 300)",
                    }}
                    size={35}
                    className="text-cyan-200 px-[5px] border-2 border-cyan-100"
                    />
                  ),

                  hard: (
                    <AiFillFire
                      style={{
                        boxShadow: "0px 0px 10px rgb(255, 0, 0)",
                        borderRadius: "20px",
                        backgroundColor: "red",
                      }}
                      size={35}
                      className="text-red-200 px-[5px] border-2 border-red-200"
                    />
                  ),
                }}/>
              </span>

                {/* Right side: Controls */}
                <div className="flex items-center gap-2">
                  {/* Explanation button */}
                  <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 
                  transition-all duration-200"
                  >
                    <BsPatchQuestionFill size={24} className="text-yellow-100" />
                  </button>

                  {/* Question ID */}
                  <p
                  className={`font-extrabold text-amber-700 bg-white rounded-full 
                  w-10 h-10 flex items-center justify-center shadow-lg 
                  border-2 border-amber-400 ${id >= 99 ? "px-6" : "px-0"}`}
                  >
                    #{id}
                  </p>
                </div>
              </div>
            </div>

            {/* Options */}
            <ul
            className="grid grid-cols-1 md:grid-cols-2 sm:gap-2 gap-1 
            md:mt-6 md:pb-8"
            >
              {options?.map((label, index) => {
                const isSelected = selectedAnswer === label;
                const isCorrect = label === correct;
                let style =
                "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ";
                
                if (showAnswers) {
                  if (isCorrect) {
                    style += "bg-gradient-to-b from-[#c3ff00] to-[#a6e321] text-green-500 border-green-200";
                  } else if (isSelected) {
                    style += "bg-gradient-to-b from-[#ff6533] to-[#d43500] text-rose-200 border-red-200";
                  } else {
                    style += "bg-white/10 text-yellow-600 border-yellow-500";
                  }
                } else {
                  style += isSelected
                    ? "bg-gradient-to-tl from-[#e8a302] to-[#ffcd38] text-yellow-100 border-yellow-100 scale-102 transition-transform duration-200"
                    : "bg-gradient-to-b from-[#ffbf00] to-[#ffd500] border-yellow-200 hover:border-yellow-600 text-yellow-700 hover:scale-101 transition-all duration-200";
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
                    className={`w-5 h-5 cursor-pointer border-2 border-yellow-500 accent-yellow-500`}
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
          
          {/*Flex col-2 */}
          <div
          className="flex flex-wrap sm:justify-center md:justify-center mt-2
          rounded-2xl border border-amber-400/80 bg-yellow-900/30 backdrop-blur-xl shadow-lg 
          py-2 gap-4"
          >
            {/* Left side: Question ID */}
            <div className="hidden md:flex items-center text-yellow-100 gap-2 font-mono">
              <span
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-amber-700/60 
                border border-amber-400/40 text-2xl"
              >
                <FaHashtag />
                {id}
              </span>
            </div>

            <ul className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {[
                {id: 1,text: `${t("main.buttons.previous")}`, icon: <FaAngleLeft />,
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

                {id: 5, text: `${t("main.buttons.next")}`, icon: <FaAngleRight />, showMode: "icon",
                disabled: !showAnswers || questionIndex + 1 === shuffledQuestions.length,
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
                    className={`hidden md:flex items-center gap-2 px-4 py-3 rounded-xl font-medium
                    transition-all duration-200 cursor-pointer
                     ${i18n.language === "ka" ? "md:text-[1rem] lg:text-[1.2rem]" : "md:text-[1.1rem] lg:text-[1.3rem]"}
                    ${
                      button.disabled
                        ? "bg-amber-800/40 text-amber-400 cursor-not-allowed"
                        : "bg-gradient-to-b active:bg-gradient-to-t from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white shadow-sm hover:shadow-md"
                    }`}
                    >
                      {button.icon} {button.text}
                    </button>
                  );
                }

                return (
                  <button
                  key={button.id}
                  onClick={button.click}
                  disabled={button.disabled}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium
                  transition-all duration-200 cursor-pointer sm:px-2 md:px-6
                  ${i18n.language === "ka" 
                    ? "text-[0.9rem] md:text-[1rem] lg:text-[1.2rem]" 
                    : "text-[1rem] md:text-[1.1rem] lg:text-[1.3rem]"}
                  ${
                    button.disabled
                    ? "bg-amber-800/40 text-amber-900/70 cursor-not-allowed"
                    : "bg-gradient-to-b active:bg-gradient-to-t from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white shadow-sm hover:shadow-md"
                  }`}
                  >
                    {/* Previous / Next (icon-only mobile) */}
                    {button.showMode === "icon" && (
                      <>
                        {button.text === t("main.buttons.previous") ? (
                          <>
                            <span className="text-lg">
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
                            
                            <span className="text-lg">
                              {button.icon}
                            </span>
                          </>
                        )}
                      </>
                    )}

                    {/* Submit / Skip (text-only mobile, full desktop) */}
                    {button.showMode === "text" && (
                      <div className={`
                       ${i18n.language === "ka" 
                        ? "md:text-[1rem] lg:text-[1.2rem]" 
                        : "md:text-[1.1rem] lg:text-[1.3rem] px-2"}`}>
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
        id="jsList"
        className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-10
        backdrop-blur-md border border-yellow-500 rounded-2xl shadow-lg p-6
        my-[1rem] md:my-[5rem] md:min-h-[40rem]
        bg-gradient-to-b from-yellow-400 to-yellow-600"
        >
          <h1
          className={`text-white py-3 px-5 rounded-xl hover:bg-yellow-700 transition
          flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 shadow-lg
          font-bold mb-7 md:mb-10
          ${i18n.language === "ka" 
            ? "text-[1.1rem] md:text-[1.5rem]" 
            : "text-[1.1rem] md:text-[1.7rem]"}`}
          >
            <CiBoxList 
            className={`text-2xl md:text-4xl `} />
            {t("main.sec2js")}
          </h1>

          <ul
          className="grid grid-cols-3 md:grid-cols-4 gap-3 
          mt-5 overflow-y-auto max-h-[29rem] bg-gradient-to-b from-yellow-200 to-yellow-300
          p-2 pr-3 relative"
          >
            {jsQuestions.map((q) => (
              <li
              onClick={() => {
                setQuestions(true);
                setSelectedQuestion(q);
              }}
              className="bg-gradient-to-br from-yellow-500 to-amber-600 
              text-yellow-300 rounded-lg py-[12px] flex items-center gap-2 justify-center 
              hover:scale-105 hover:shadow-md transition-all duration-200 
              cursor-pointer border border-amber-600 hover:border-amber-100 shadow-inner 
              hover:text-yellow-100"
              key={q.id}
              >
                <FaHashtag className="text-base opacity-80 md:text-xl" />
                <span className="font-mono text-xl md:text-3xl">
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
              className="inset-0 bg-gradient-to-b from-black/40 to-black/80 rounded-2xl
              flex flex-col absolute top-0 justify-center items-center
              py-4 px-3"
              >
                <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-t from-yellow-100 to-amber-100 w-[90%] md:w-full 
                max-w-2xl rounded-xl shadow-2xl px-6 py-8 md:px-10 md:py-10 text-amber-300 
                flex flex-col gap-6 border-2 border-yellow-800"
                >
                  <button
                  onClick={() => setQuestions(false)}
                  className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-700 
                  text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
                  >
                    <IoMdClose />
                  </button>

                  <h2 className="text-center text-yellow-100 text-3xl font-semibold 
                  bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl 
                  py-3 flex items-center justify-center gap-1 mx-5
                  border-2 border-yellow-600"
                  >
                    <FaHashtag className="text-2xl mt-[1px]" />
                    {selectedQuestion.id}
                  </h2>

                  <div className="flex items-start gap-3 border-b pb-4">
                    <div className="pt-1">
                      <BsPatchQuestionFill className="text-yellow-400 text-2xl" />
                    </div>
                    <div
                    className={`leading-relaxed font-medium text-amber-500
                    ${i18n.language === "ka" 
                      ? "text-[1rem] sm:text-[1.1rem] md:text-[1.3rem]" 
                      : "text-[1.2rem] sm:text-[1.2rem] md:text-[1.4rem]"}`}
                    >
                      {selectedQuestionText}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div>
                      <HiOutlineLightBulb className="text-yellow-500 text-2xl" />
                    </div>

                    <div
                    className={`text-base leading-relaxed text-yellow-400
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
        id="jsVideo"
        className={`w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-10 
        backdrop-blur-md border border-yellow-500 rounded-2xl shadow-lg 
        py-6 my-[1rem] bg-gradient-to-b from-yellow-400 to-yellow-600`}
        >
          {/* Section Header */}
          <h1
          className={`text-yellow-100 py-3 px-5 rounded-xl hover:bg-yellow-700 transition
          flex items-center shadow-lg bg-gradient-to-r from-yellow-500 to-amber-500
          mb-1 md:mb-2 border-yellow-300 gap-2 font-bold lg:rounded-2xl
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
          border-2 border-yellow-500 shadow-2xl shadow-sky-700/40">
            <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/lfmg-EJ8gm4?start=0"
            title="BroCodes Tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            />
          </div>

          {/* Optional Caption / Credit */}
          <p 
          className="mt-4 text-center text-yellow-700 text-sm md:text-base font-medium">
            <Trans
            i18nKey={"main.videoCreator"}
            components={{
              highlight: <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-red-400 font-semibold"/>
            }}
            />
          </p>
        </section>

        <QuizSection
        theme="js"
        id={id}
        sections={[
          { 
            id: "Javascript", 
            heading: "Javascript Quiz Guide", 
          },
        ]}
        />
      </main>

      <div 
      className="w-full overflow-hidden leading-none -mb-1 relative">
        {/* Sand dune shape */}
        <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-32 rotate-180 z-10"
        >
          <path
          d="M0,30 
          C180,80 320,0 500,40 
          C700,90 900,10 1100,50 
          C1250,80 1440,20 1440,20 
          L1440,0 L0,0 Z"
          fill="#ffb700"
          />
        </svg>
      </div>

      <footer 
      className="w-full bg-gradient-to-b from-[#fcd34d] via-[#fde68a] to-[#fef9c3]
    text-yellow-800 text-sm text-center pt-8 pb-5 relative z-10">
        <svg
        viewBox="0 0 1140 70"
        preserveAspectRatio="none"
        className="w-full h-20 absolute -top-17 left-0 z-10 shadow-inner "
        >
          <path
          d="M0,40 
          C90,60 180,0 270,30 
          C360,60 450,0 540,30 
          C630,60 720,0 810,30 
          C900,60 990,0 1080,30 
          C1170,60 1260,0 1350,30 
          L1440,30 L1540,100 L0,100 Z"
          fill="#fcd34d"  
          />
        </svg>

        <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`text-yellow-600 hover:text-yellow-800 
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
        md:grid-cols-5 gap-5 text-yellow-700 text-sm md:text-base">

          <FooterSection 
            title={t("footer.help")} 
            items={[
              { label: t("footer.howtoplay"), path: "#" }, 
              { label: t("footer.cantStart"), path: "#" }, 
              { label: t("footer.bug"), path: "#" }, 
              { label: t("footer.more"), path: "#" }
            ]}
          />

          <FooterSection 
            title={t("footer.resources")} 
            items={[
              { label: t("footer.docs"), path: "#" }, 
              { label: t("footer.blog"), path: "#" }, 
              { label: t("footer.repo"), path: "#" }, 
              { label: t("footer.community"), path: "#" }
            ]}
          />

          <FooterSection 
            title={t("footer.contact")} 
            items={[
              { label: t("footer.email"), path: "#" }, 
              { label: t("footer.linkedin"), path: "#" }, 
              { label: t("footer.instagram"), path: "#" }, 
              { label: t("footer.feedback"), path: "#" }
            ]}
          />

          <FooterSection 
            title={t("footer.about")} 
            items={[
              { label: t("footer.aboutApp"), path: "#" }, 
              { label: t("footer.purpose"), path: "#" }, 
              { label: t("footer.stack"), path: "#" }, 
              { label: t("footer.changelog"), path: "#" }
            ]}
          />

          <FooterSection 
            title={t("footer.quizzes")} 
            items={[
              { label: t("footer.htmlcss"), path: "/HtmlCss" }, 
              { label: t("footer.js"), path: "/Javascript" }, 
              { label: t("footer.react"), path: "/React" }, 
              { label: t("footer.custom"), path: "/custom" }
            ]}
          />
        </nav>

        <div className="w-full bg-gradient-to-l from-yellow-200
          my-5 flex md:flex-row flex-col gap-5 px-5 md:px-10 py-5 to-amber-300 items-center
          border-t-2 border-b-2 border-yellow-600 justify-evenly">

          <div className="flex gap-5 items-center pb-2">
            <h1 className={`font-semibold hidden md:block
              ${i18n.language === "ka" ? "text-[1.2rem]" : "text-[1.4rem]"}`}>
              {t("footer.follow")}
            </h1>

            <ul className="flex gap-3 text-xl">
              {[
                { id: 1, symbol: <FaFacebookSquare />, text: "text-blue-400", effect: "hover:text-blue-500", link: "https://www.facebook.com/" },
                { id: 2, symbol: <FaInstagram />, text: "text-rose-400", effect: "hover:text-rose-500", link: "https://www.instagram.com/" }, 
                { id: 3, symbol: <FaYoutube />, text: "text-red-500", effect: "hover:text-red-600", link: "https://www.youtube.com/" }, 
                { id: 4, symbol: <FaTiktok />, text: "text-gray-500", effect: "hover:text-gray-300", link: "https://www.tiktok.com/en/" }, 
                { id: 5, symbol: <FaThreads />, text: "text-emerald-400", effect: "hover:text-emerald-500", link: "https://www.threads.com/" }
              ].map((icon) => (
                <a
                  key={icon.id}
                  href={icon.link}
                  target="_blank"
                  className={`hover:scale-120 transition-all duration-200 text-2xl
                    ${icon.effect} bg-yellow-100 p-2 rounded-full flex ${icon.text}
                    items-center gap-1 group`}
                >
                  {icon.symbol}
                </a>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 relative">
            <h1 className="font-semibold text-sm md:text-xl md:block hidden">
              {t("footer.language")}
            </h1>

            <button
              onClick={() => setLanguageBox(!languageBox)}
              className="flex items-center gap-1.5 bg-yellow-300 py-1 
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

              <div>
                <FaAngleDown className={`${languageBox ? "rotate-180 transition-transform duration-200" : ""}`} />
              </div>
            </button>

            {languageBox && (
              <div className="bg-yellow-300 rounded-md w-35 h-20
                absolute bottom-10 flex flex-col px-1.5 justify-evenly">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                  key={code}
                  onClick={() => {
                    i18n.changeLanguage(code);
                    setLanguageBox(false);
                  }}
                  className={`flex items-center justify-start gap-2 cursor-pointer
                hover:bg-yellow-400 p-1 rounded-[5px] transition-all duration-150
                  ${i18n.language === code ? "bg-gradient-to-b from-yellow-400 to-yellow-200" : ""}`}
                  >
                    <img className="w-6" src={lang.image} alt={lang.label} />
                    {lang.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-5 
          text-xs md:text-sm text-center md:text-left">
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-1 cursor-default">
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

export default Javascript;