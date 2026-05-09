"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full bg-white/5 border border-white/10 flex items-center px-1 group transition-all hover:border-[#C9A84C]/50 cursor-pointer"
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{ x: theme === "dark" ? 24 : 0 }}
        className="w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center text-black shadow-lg"
      >
        {theme === "dark" ? <Moon className="w-2.5 h-2.5" /> : <Sun className="w-2.5 h-2.5" />}
      </motion.div>
    </button>
  );
};
