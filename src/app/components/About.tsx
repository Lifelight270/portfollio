"use client";
import React from "react";
// import Image from "next/image";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start space-y-12 md:space-y-0 md:space-x-16">
        {/* Photo Section with Gradient Border and Tilted Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[320px] h-[400px] group">
            {/* Animated Gradient Border */}
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-75 blur-sm z-0"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />

            {/* Inner Frame with Subtle Shadow */}
            <div className="absolute inset-0 bg-white rounded-xl z-10" />

            {/* Tilted Animated Image */}
            <motion.div
              initial={{ rotate: -6 }}
              whileHover={{
                scale: 1.05,
                rotate: -3,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="w-full h-full rounded-xl overflow-hidden shadow-xl relative z-20"
              style={{
                transformOrigin: "center",
              }}>
              <img
                src="/bio_pic.jpg"
                alt="Your Name"
                className="w-full h-full object-cover"
              />

              {/* Overlay with slight gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </div>

        {/* About Me Text Section */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            {/* Stylish Decorative Element */}

            <h2 className="text-4xl font-bold text-gray-900 mb-6 relative">
              About Me
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>
            <p className="text-gray-700 leading-relaxed text-lg">
              I develop systems that work. With years of experience in software
              engineering and design, I focus on creating user-friendly
              interfaces and efficient backends. My passion lies in solving
              complex problems and delivering impactful digital solutions that
              make a difference.
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              When I'm not coding, I enjoy exploring new technologies, mentoring
              aspiring developers, and contributing to open-source projects.
              Let's create something amazing together!
            </p>

            {/* Added Skills/Interests Section with Badges
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "UI/UX", "Backend"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm rounded-full shadow-sm">
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div> */}

            {/* Call to Action */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPortfolio}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              View My Work
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
