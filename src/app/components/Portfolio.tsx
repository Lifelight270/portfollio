// src/components/Portfolio.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
// import { p } from "framer-motion/client";  

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Room Booking Website",
      src: "roombook.png",
      link: "https://hotel-room-book.vercel.app/",
      description:
        "Seamless hotel booking. Best deals. Anywhere, anytime. Verified stays.",
    },
    {
      title: "Note App",
      src: "Noteapp.png",
      link: "https://note-app-front-eight.vercel.app/",
      description:
        "Capture thoughts instantly. Organize notes. Sync everywhere. Simple, smart, fast",
    },
    {
      title: "Project 3",
      src: "/images/project6.jpg",
      link: "#",
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, cum!`,
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          My Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 12px 1px rgba(100, 149, 255, 0.59)",
                }}
                transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
                className="overflow-hidden rounded-[18px] outline-none bg-gray-200">
                <div className="relative">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-64 object-fill"
                  />
                  <h3
                    className="absolute top-0 left-0 w-full text-center text-white text-lg font-semibold px-4 py-4"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.86))",
                    }}>
                    {project.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mt-2 text-justify">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
