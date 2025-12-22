"use client";

import React from "react";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Room Booking Website",
      src: "/roombook.png",
      link: "https://hotel-room-book.vercel.app/",
      description:
        "Seamless hotel booking. Best deals. Anywhere, anytime. Verified stays.",
    },
    {
      title: "ChatApp",
      src: "/ChatApp.png",
      link: "https://chatapp-p1zd.onrender.com",
      description:
        "Real-time messaging app with a simple UI for seamless, instant communication.",
    },
    {
      title: "Note App",
      src: "/Noteapp.png",
      link: "https://note-app-front-eight.vercel.app/",
      description:
        "Capture thoughts instantly. Organize notes. Sync everywhere. Simple, smart, fast",
    },
    {
      title: "Nepal Police",
      src: "/NepalPolice.png",
      link: "https://lifelight270.github.io/police-nepal/",
      description: "A simple site highlighting Nepal Police services and structure.",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          My Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 0px 12px 2px rgba(100, 149, 255, 0.59)",
                }}
                transition={{ duration: 0.4, ease: easeInOut }}
                className="overflow-hidden rounded-[25px] shadow-custom-blue"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <h3 className="absolute bg-gray-900/80 text-white top-0 left-0 w-full text-center text-lg font-semibold px-4 py-4 transition-all duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="p-4 transition-all duration-300">
                  <p className="text-gray-300 text-sm">{project.description}</p>
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
