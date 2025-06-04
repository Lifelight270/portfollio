"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Type definitions
type FormFields = "name" | "email" | "subject" | "message";
type FormData = Record<FormFields, string>;
type ErrorMessages = Record<FormFields, string>;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ErrorMessages>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"SUCCESS" | "FAILED" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: ErrorMessages = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    )
      newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => msg === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("FAILED");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    name: keyof FormData,
    label: string,
    type: "text" | "email" = "text"
  ) => (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        id={name}
        value={formData[name]}
        onChange={handleChange}
        className="peer w-full border-b-2 border-gray-400 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-blue-400 pt-6 pb-2"
        placeholder={label}
        autoComplete="off"
      />
      <motion.label
        htmlFor={name}
        initial={false}
        animate={{
          top: formData[name] !== "" ? "0.25rem" : "1.3rem",
          fontSize: formData[name] !== "" ? "0.75rem" : "1rem",
          color: formData[name] !== "" ? "#60A5FA" : "#9CA3AF",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute left-0 px-1 pointer-events-none transition-all"
      >
        {label}
      </motion.label>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Let&apos;s Start a New Project
        </h2>

        {status === "SUCCESS" && (
          <p className="text-green-500 text-center mb-4">
            ✅ Your message has been sent successfully!
          </p>
        )}
        {status === "FAILED" && (
          <p className="text-red-500 text-center mb-4">
            ❌ Failed to send the message. Please try again.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("name", "Your Name")}
            {renderInput("email", "Your Email", "email")}
          </div>

          {renderInput("subject", "Subject")}

          <div className="relative">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="peer w-full border-b-2 border-gray-400 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-blue-400 pt-6 pb-2 h-32 resize-none"
            />
            <motion.label
              htmlFor="message"
              initial={false}
              animate={{
                top: formData.message !== "" ? "0.25rem" : "1.3rem",
                fontSize: formData.message !== "" ? "0.75rem" : "1rem",
                color: formData.message !== "" ? "#60A5FA" : "#9CA3AF",
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute left-0 px-1 pointer-events-none transition-all"
            >
              Your Message
            </motion.label>

            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-blue-600 rounded-md text-white transition hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
