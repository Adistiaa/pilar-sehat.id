import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function SearchBar({ isFocused, setIsFocused }) {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        clearHighlights();
        setSearchTerm("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsFocused]);

  const highlightMatches = (term) => {
    const content = document.getElementById("content");
    if (!content) return;

    clearHighlights();

    if (!term) {
      setMatches([]);
      setCurrentIndex(0);
      return;
    }

    const walk = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
    const regex = new RegExp(`(${term})`, "gi");
    const found = [];

    while (walk.nextNode()) {
      const node = walk.currentNode;
      if (node.nodeValue.match(regex)) {
        found.push(node);
      }
    }

    const newMatches = [];

    found.forEach((textNode) => {
      const span = document.createElement("span");
      span.innerHTML = textNode.nodeValue.replace(regex, (match) => {
        return `<mark class="bg-[#50b7f7] dark:bg-[#0be084] text-white dark:text-[#010907]">${match}</mark>`;
      });
      textNode.parentNode.replaceChild(span, textNode);

      span.querySelectorAll("mark").forEach((m) => newMatches.push(m));
    });

    setMatches(newMatches);
    setCurrentIndex(0);
  };

  const clearHighlights = () => {
    const content = document.getElementById("content");
    if (!content) return;

    const marks = content.querySelectorAll("mark");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });

    setMatches([]);
    setCurrentIndex(0);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    highlightMatches(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    clearHighlights();
  };

  const goToNext = () => {
    if (matches.length === 0) return;
    const nextIndex = (currentIndex + 1) % matches.length;
    setCurrentIndex(nextIndex);
    scrollToMatch(nextIndex);
  };

  const goToPrev = () => {
    if (matches.length === 0) return;
    const prevIndex = (currentIndex - 1 + matches.length) % matches.length;
    setCurrentIndex(prevIndex);
    scrollToMatch(prevIndex);
  };

  const scrollToMatch = (index) => {
    if (matches[index]) {
      matches[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <motion.div
      className="relative flex items-center rounded-lg bg-gray-100 dark:bg-[#010907]/80 hover:bg-gray-200 dark:hover:bg-[#010907] transition-all px-4 py-2 w-full max-w-md border border-gray-300"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      style={{ height: "40px" }}
    >
      <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search (Ctrl+K)"
        value={searchTerm}
        onChange={handleChange}
        className="bg-transparent outline-none text-sm text-gray-700 dark:text-[#ecfef7] placeholder-gray-500 w-full px-2"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ height: "100%" }}
      />
      {searchTerm && (
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={goToPrev}
            className="p-1 rounded hover:bg-gray-300 dark:hover:bg-[#0be084]/10 transition-colors flex items-center justify-center"
            style={{ width: "24px", height: "24px" }}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-[#0be084]" />
          </button>
          <span className="text-xs text-gray-600 select-none min-w-[40px] text-center">
            {matches.length > 0 ? `${currentIndex + 1}/${matches.length}` : "0/0"}
          </span>
          <button
            onClick={goToNext}
            className="p-1 rounded hover:bg-gray-300 dark:hover:bg-[#0be084]/10 transition-colors flex items-center justify-center"
            style={{ width: "24px", height: "24px" }}
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-[#0be084]" />
          </button>
          <button
            onClick={handleClear}
            className="p-1 rounded hover:bg-gray-300 dark:hover:bg-[#0be084]/10 transition-colors flex items-center justify-center"
            style={{ width: "24px", height: "24px" }}
          >
            <X className="w-4 h-4 text-gray-600 dark:text-[#0be084]" />
          </button>
        </div>
      )}
    </motion.div>
  );
}