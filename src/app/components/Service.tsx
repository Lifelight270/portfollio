"use client";
import React from "react";
import { motion } from "framer-motion";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Building responsive and high-performance websites.",
    icon: "🌐",
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Creating sleek and functional mobile applications.",
    icon: "📱",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Designing user-friendly and visually stunning interfaces.",
    icon: "🎨",
  },
  {
    id: 4,
    title: "SEO Optimization",
    description: "Improving your website's ranking on search engines.",
    icon: "📈",
  },
];

const Service: React.FC = () => {
  return (
    <section id="services" className="py-16 text-gray-700">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative w-full h-60 [perspective:1000px] "
            >
              <motion.div
                className="relative w-full h-full duration-150 transform-style preserve-3d shadow-lg shadow-blue-700/50"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Face */}
                <div className="absolute w-full h-full bg-gray-800 rounded-lg shadow-md flex flex-col justify-center items-center text-white [backface-visibility:hidden]">
                  <div className="text-5xl mb-2">{service.icon}</div>
                  <h3 className="text-xl font-semibold transition-opacity delay-[0.6s] duration-[450ms] opacity-100 group-hover:opacity-0">
                    {service.title}
                  </h3>
                </div>

                {/* Back Face */}
                <div className="absolute w-full h-full bg-gray-700 rounded-lg shadow-md flex items-center justify-center text-gray-300 px-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <p className="transition-opacity delay-[0.6s] duration-[450ms] opacity-0 group-hover:opacity-100">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
