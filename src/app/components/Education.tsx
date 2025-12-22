"use client"

import React from "react"
import { FaGraduationCap } from "react-icons/fa"
import { motion, useAnimation, easeOut } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface Milestone {
  id: number
  date: string
  title: string
  icon: React.FC<{ className?: string }>
  color: string
  description: string
}

const timelineData: Milestone[] = [
  {
    id: 1,
    date: "2073 B.S",
    title: "SEE",
    icon: FaGraduationCap,
    color: "bg-blue-500",
    description:
      "Achieved national certification in SEE, completing a broad range of academic subjects.",
  },
  {
    id: 2,
    date: "2021",
    title: "Diploma in Computer Engineering",
    icon: FaGraduationCap,
    color: "bg-green-500",
    description:
      "Three-year technical diploma covering programming, networking, and electronics with hands-on project experience.",
  },
  {
    id: 3,
    date: "Pursuing",
    title: "Bachelor in Computer Engineering",
    icon: FaGraduationCap,
    color: "bg-yellow-500",
    description:
      "Currently pursuing studies in software development, data structures, algorithms, and embedded systems.",
  },
]

const Education: React.FC = () => {
  return (
    <section id="education">
      <div className="relative bg-gray-900 text-white py-16 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-20">
          Education
        </h2>
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gray-700 opacity-30 -translate-x-1/2 z-0" />
          {timelineData.map((milestone, index) => (
            <MilestoneItem key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education

const MilestoneItem: React.FC<{ milestone: Milestone; index: number }> = ({
  milestone,
  index,
}) => {
  const controls = useAnimation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  React.useEffect(() => {
    if (inView) controls.start("visible")
  }, [inView, controls])

  const Icon = milestone.icon
  const isLeft = index % 2 === 0

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut }, // ✅ fixed
    },
  }

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "60px",
      transition: { duration: 0.6, ease: easeOut }, // ✅ fixed
    },
  }

  const verticalLineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 0.6, ease: easeOut }, // ✅ fixed
    },
  }

  return (
    <div ref={ref} className="relative z-10 mb-20 flex flex-col md:flex-row items-center w-full">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={verticalLineVariants}
        className="hidden md:block absolute left-1/2 top-0 w-1 bg-gradient-to-b from-transparent to-white transform -translate-x-1/2 z-0 origin-top"
      />

      <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:pr-[100px] md:order-1" : "md:pl-[100px] md:order-2"}`} />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={lineVariants}
        className={`hidden md:block h-1 bg-white absolute top-1/2 z-10 ${isLeft ? "left-1/2" : "right-1/2"} transform -translate-y-1/2`}
      />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={cardVariants}
        className={`w-full md:w-1/2 p-4 sm:p-6 rounded-xl shadow-lg ${milestone.color} text-white z-10 ${
          isLeft ? "md:order-2 md:ml-[60px]" : "md:order-1 md:mr-[60px]"
        }`}
      >
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-3">
            <div className="bg-white p-2 rounded-full shadow">
              <Icon className="text-xl sm:text-2xl text-gray-900" />
            </div>
            <span className="ml-3 text-sm sm:text-base font-semibold">{milestone.date}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold">{milestone.title}</h3>
          <p className="text-sm mt-2 text-white/90">{milestone.description}</p>
        </div>
      </motion.div>
    </div>
  )
}
