"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const navItems = [
  "Home",
  "About",
  "Education",
  "Experience",
  "Portfolio",
  "Services",
  "Contact",
];

const logoLetters = ["J", "a", "n", "a", "k"];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.getElementById(item.toLowerCase())
      );
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].toLowerCase());
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <header className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-xl font-bold flex space-x-1 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {logoLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.a>

          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-200 ${
                  activeSection === item.toLowerCase()
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-400"
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="/Biodata.pdf"
              download="Janak_Bahadur_Tharu_CV.pdf"
              className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Download CV
            </a>
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-800 px-4 sm:px-6 pb-6 pt-4 space-y-4 text-center">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="block hover:text-blue-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <a
              href="/Biodata.pdf"
              download="Janak_Bahadur_Tharu_CV.pdf"
              onClick={closeMenu}
              className="inline-block mt-2 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Download CV
            </a>
          </div>
        )}
      </header>

      <section
        id="home"
        className="relative pt-32 md:pt-40 h-screen flex justify-center items-center text-center bg-gray-900 overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="absolute w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
            animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
            transition={{ duration: 18, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
            style={{ top: "30%", left: "60%" }}
            animate={{ x: [0, -80, 80, 0], y: [0, 40, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
            style={{ bottom: "10%", left: "40%" }}
            animate={{ x: [0, 60, -60, 0], y: [0, -30, 30, 0] }}
            transition={{ duration: 22, repeat: Infinity }}
          />
        </motion.div>

        <div className="z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Hello, I&apos;m{" "}
            <span className="text-blue-500">Janak Bahadur Tharu</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6">
            A passionate developer crafting beautiful web experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#portfolio"
              className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 text-white"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-gray-700 rounded-md hover:bg-gray-800 text-white"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
  