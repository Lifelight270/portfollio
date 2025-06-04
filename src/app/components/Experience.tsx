"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
// Import required Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

// Add responsive breakpoints
const breakpoints = {
  320: {
    slidesPerView: 1,
  },
  640: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
};

const Experience: React.FC = () => {
  const experienceData = [
    {
      position: "Frontend Developer",
      // company: "Tech Solutions Inc.",
      // year: "2022 - Present",
      description:
        "Worked on building scalable, user-friendly web applications using React, TypeScript, and Tailwind CSS.",
      skills: ["Next [React]", "TypeScript", "Tailwind CSS"],
    },
    {
      position: "Web Developer",
      // company: "Startup Hub",
      // year: "2021 - 2022",
      description:
        "Assisted in developing responsive websites and maintaining client projects using HTML, CSS, and JavaScript.",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      position: "Mobile App",
      // company: "Creative Studios",
      // year: "2020 - 2021",
      description:
        "Designed and prototyped user-friendly interfaces for mobile and web applications.",
      skills: ["React-Native", "Node.js", "Express"],
    },
    {
      position: "Full Stack Developer",
      // company: "Innovate Corp",
      // year: "2019 - 2020",
      description:
        "Developed backend services and APIs for large-scale enterprise solutions.",
      skills: ["Node.js", "Express", "MongoDB"],
    },
  ];

  // Enable swiper on component mount
  useEffect(() => {
    // Add custom CSS to make the active slide larger
    const style = document.createElement("style");
    style.textContent = `
      .swiper-slide-active .swiper-slide-content {
        transform: scale(0.95);
        opacity: 1;
      }
      .swiper-slide-prev .swiper-slide-content,
      .swiper-slide-next .swiper-slide-content {
        transform: scale(0.85);
        opacity: 0.6;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section
      id="experience"
      className="bg-gradient-to-b from-gray-50 to-white text-gray-900 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Experience</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            My professional journey and roles that have shaped my expertise
          </p>
        </motion.div>

        {/* Swiper Coverflow with Autoplay and Infinite Loop */}
        <div className="max-w-5xl mx-auto">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            initialSlide={1}
            spaceBetween={80}
            breakpoints={breakpoints}
            coverflowEffect={{
              stretch: 0,
              depth: 100,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="mySwiper mySwiper [&_.swiper-button-prev]:hidden [&_.swiper-button-next]:hidden md:[&_.swiper-button-prev]:block md:[&_.swiper-button-next]:block">
            {experienceData.map((item, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide transition-all duration-300">
                <div className="transform scale-100 swiper-slide-content transition-all duration-300">
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl rounded-xl p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="flex items-center mb-3">
                          <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {item.position}
                            </h3>
                            {/* <p className="text-gray-300 font-medium">
                              {item.company}
                            </p> */}
                          </div>
                        </div>
                        {/* <span className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300 mb-3">
                          {item.year}
                        </span> */}
                        <p className="mt-2 text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-4">
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-700 bg-opacity-50 rounded-md text-xs text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Experience;
