"use client";
import React from "react";

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
    <section id="services" className="py-16 bg-white text-gray-700">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-800 p-6 rounded-md text-center shadow-md hover:bg-gray-700 transition-colors">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {service.title}
              </h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
