export const getLocalizedQuestions = async () => {
  const lang = localStorage.getItem("i18nextLng") || "en";
  const path = lang === "ka" ? "/locales/ka.json" : "/locales/en.json";

  try {
    const res = await fetch(path);
    const data = await res.json();
    console.log("📥 Questions loaded via fetch:", data.customQuestions);
    return data.customQuestions || [];
  } catch (err) {
    console.error("❌ Fetching JSON failed:", err);
    return [];
  }
};