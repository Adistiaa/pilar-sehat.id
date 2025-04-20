import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar({ isFocused, setIsFocused }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsFocused]);

  return (
    <motion.div
      className="relative flex items-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all px-3 py-2 w-full max-w-xs md:max-w-sm"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
    >
      <Search className="w-4 h-4 text-gray-500 mr-2" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </motion.div>
  );
}
