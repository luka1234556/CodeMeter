import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiGlobeStandThin } from "react-icons/pi";
import { LuMessageSquareText } from "react-icons/lu";
import { IoLibrary } from "react-icons/io5";
import { FaBalanceScale } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { headerThemes } from "./headerThemes"; 

function Header({ showBackButton = true , theme = "main", useGradient = true }) {
  const selectedTheme = headerThemes[theme] || headerThemes.main;

  const colors = {
    primary: selectedTheme.primary,
    bgGradient: selectedTheme.bgGradient,
    border: selectedTheme.border,
    hover: selectedTheme.hover,
    languagetext: selectedTheme.languagetext,
    languageBg: selectedTheme.languageBg,
    pickedLg: selectedTheme.pickedLg,
    burgerBorder: selectedTheme. burgerBorder,
    menuBorder: selectedTheme.menuBorder,
    menuBg: selectedTheme.menuBg,
    menuHover: selectedTheme.menuHover,
    back: selectedTheme.back,
    heading2: selectedTheme.heading2
  };
  const headerBg = useGradient ? `bg-gradient-to-b ${colors.bgGradient}` : colors.bgSolid;
  const location = useLocation();
  const currentPath = location.pathname;

  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [languageBox, setLanguageBox] = useState(false);
  const navigate = useNavigate();

  const languages = {
    ka: { label: "GE", image: "georgia.png", text: "Georgian" },
    en: { label: "US", image: "US.png", text: "United States" },
  };

  // handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: 1, label: t("header.about"), path: "/About", icon: <PiGlobeStandThin /> },
    { id: 2, label: t("header.contact"), path: "/Contact", icon: <LuMessageSquareText /> },
    { id: 3, label: t("header.resources"), path: "/Resources", icon: <IoLibrary /> },
    { id: 4, label: t("header.rules"), path: "/Rules", icon: <FaBalanceScale /> },
  ];

  return (
    <header 
    className={`py-3 sm:py-5 border-b
    ${headerBg} ${colors.border} ${colors.primary}
    sticky top-0 px-3 flex justify-between items-center backdrop-blur-3xl z-20`}>
      {/* Left side */}
      <div className="flex items-center justify-between gap-3">
        {showBackButton && (
          <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-2 cursor-pointer hover:text-white
          hover:scale-105 duration-200 transition-all
          ${colors.primary} ${colors.back}`}
          >
            <IoIosArrowBack size={22} />
            <span className="hidden md:block">
              {t("back")}
            </span>
          </button>    
        )}
        

        {/* Logo/title if not showing back button */}
        {!showBackButton && (
          <div 
          className="flex items-center gap-1">
            <img 
            src="CodeMeter.png" 
            alt="Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain" />

            <h1 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
            from-blue-200 to-sky-500">
              CodeMeter
            </h1>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-end w-full gap-3">
        {isMobile ? (
          <div className="flex items-center justify-between">
            
            <span className={`mr-[2.5rem] font-bold text-2xl text-transparent
            ${colors.heading2} bg-clip-text`}>
              CodeMeter
            </span>
            
            <div className="flex gap-2">
              {/* Language Switcher */}
              <button
              onClick={() => {
                setLanguageBox(!languageBox);
                setBurgerMenu(false);
              }}
              className={`flex items-center gap-2 py-2 px-1
              ${colors.primary}`}
              >
                <img 
                src={languages[i18n.language]?.image || "US.png"} 
                className="w-5" 
                alt="flag" />

                <span 
                className="text-xl">
                  {languages[i18n.language]?.label}
                </span>
              </button>

              {/* Burger */}
              <button
              onClick={() => {
                setLanguageBox(false)
                setBurgerMenu(!burgerMenu);
              }}
              className={`cursor-pointer text-2xl 
              ${burgerMenu ? `${colors.primary} rotate-90 transition-all duration-200` : ""}`}
              >
                <GiHamburgerMenu />
              </button>
            </div>
          </div>
        ) : (
          /* Desktop Navigation */
          <nav 
          className={`flex font-semibold text-lg items-center
          ${i18n.language === "ka" 
          ? "md:text-[0.9rem] gap-1 lg:text-[1.2rem] lg:gap-4" 
          : "md:text-[1rem] gap-3 lg:text-[1.3rem] lg:gap-6"}`}>
            {navItems.map((item, idx) => (
              <ul
              key={item.id} 
              className="flex items-center gap-2">
                <button
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-1 rounded-sm transition-all duration-200
                hover:text-white ${colors.hover} cursor-pointer
                ${currentPath === item.path ? "border-b-4 rounded-xs font-bold text-sky-400/60" : ""}`}
                >
                  {item.icon}

                  <span>
                    {item.label}
                  </span>

                </button>

                {idx !== navItems.length - 1 && 
                  <span className={`h-8 w-[1px] ${colors.border} rounded-full`} />
                }
              </ul>
            ))}

            <button
            onClick={() => setLanguageBox(!languageBox)}
            className={`flex items-center gap-2 py-2 pl-3 border-l-[1px] h-[2rem] 
            cursor-pointer
            ${colors.languagetext}`}
            >
              <img 
              src={languages[i18n.language]?.image || "US.png"} 
              className="w-5" 
              alt="flag" />

              <span 
              className="text-xl">
                {languages[i18n.language]?.label}
              </span>

              <FaAngleUp
              className={`transition-transform duration-200 text-xl 
              ${languageBox ? "rotate-180" : ""}`}
              />
            </button>
            
          </nav>
        )}
      </div>

      {languageBox && (
        <div 
        className={`${colors.languageBg} rounded-md py-2 bg-gradient-to-b
        absolute top-16 right-0 flex flex-col px-1.5 justify-evenly border`}
        >
          {Object.entries(languages).map(([code, lang]) => (
            <button
            key={code}
            onClick={() => {
              i18n.changeLanguage(code);
              setLanguageBox(false);
            }}
            className={`flex items-center justify-start gap-2 cursor-pointer 
            ${colors.hover} p-2 rounded-[5px] transition-all duration-150
            ${i18n.language === code ? `${colors.pickedLg}` : ""}`}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {burgerMenu && (
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[70px] left-0 w-full px-6 z-50"
          >
            <div
            className={`rounded-xl ${colors.menuBorder} ${colors.menuBg}
            backdrop-blur-lg shadow-xl py-6 ${colors.burgerBorder}`}
            >
              <ul className="flex flex-col gap-3 text-lg font-medium">
                {navItems.map((item, i) => (
                  <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${currentPath === item.path ? "font-bold" : ""}`}
                  >
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full py-2 px-4 rounded-sm transition-all duration-300
                      ${colors.menuHover}`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;