import { useState, useEffect } from "react";
import { FaGamepad, FaListAlt, FaYoutube } from "react-icons/fa";

//Custom hook
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  //every time when our key, value updates we get updated info in local
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //This returns an array, just like useState, where:
  //value is the current state
  //setValue is the function to update it, and we're using it in our
  //Training.jsx as useState hook
  //ის იქცევა ზუსტად ისე, როგორც useState, მაგრამ ავტომატური დაჟინებით
  return [value, setValue];
}
